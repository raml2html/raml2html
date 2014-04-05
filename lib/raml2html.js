#!/usr/bin/env node

var raml = require('raml-parser');
var handlebars = require('handlebars');
var marked = require('marked');
var template = require('./template.handlebars');
var resourceTemplate = require('./resource.handlebars');
var traverse = require('traverse');

function parseBaseUri(ramlObj) {
    // I have no clue what kind of variables the RAML spec allows in the baseUri.
    // For now keep it super super simple.
    if (ramlObj.baseUri){
        ramlObj.baseUri = ramlObj.baseUri.replace('{version}', ramlObj.version);
    }
    return ramlObj;
}

function makeUniqueId(resource) {
    var fullUrl = resource.parentUrl + resource.relativeUri;
    return slugify(fullUrl);
}

function slugify(str) {
    return str.replace(/[\{\}\/}]/g, '_');
}

function addParentUrls(ramlObj, parentUrl, rootId) {
    var resource, index;
    for (index in ramlObj.resources) {
        resource = ramlObj.resources[index];
        resource.parentUrl = parentUrl;
        resource.uniqueId = makeUniqueId(resource);

        if (!rootId.length) {
            resource.rootId = slugify(resource.relativeUri);
        } else {
            resource.rootId = rootId;
        }

        addParentUrls(resource, resource.parentUrl + resource.relativeUri, resource.rootId);
    }

    return ramlObj;
}

function parse(source) {
    raml.loadFile(source).then(function(ramlObj) {
        ramlObj = parseBaseUri(ramlObj);
        ramlObj = addParentUrls(ramlObj, '', '');

        handlebars.registerHelper('md', function(text) {
            if (text && text.length) {
                return new handlebars.SafeString(marked(text));
            } else {
                return '';
            }
        });

        handlebars.registerHelper('getparams', function(parent, relative, options) {
            var uriParameters = getUriParameters(ramlObj, parent + relative);

            var ret = '';
            for(var i=0, j=uriParameters.length; i<j; i++) {
                ret = ret + options.fn(uriParameters[i]);
            }
            return ret;
        });

        handlebars.registerPartial('resource', resourceTemplate);
        var result = template(ramlObj);

        // For now simply output to console
        process.stdout.write(result);
        process.exit(0);
    }, function(error) {
        console.log('Error parsing: ' + error);
        process.exit(1);
    });
}

var getUriParameters = function (raml, path) {

    var uriStack = [];
    var names = []; //avoid duplicate uriParameters

    var addStack = function (params) {

        var key = Object.keys(params)[0];
        if (names.indexOf(key) === -1 ) {
            names.push(key);
            uriStack.unshift(params[key]);
        }
    };

    traverse(raml).forEach(function(x) {

        var findUriParams = function(node) {

            if(node.node.uriParameters) {
                addStack(node.node.uriParameters);
            }
            if(node.node[0] && node.node[0].uriParameters) {
                addStack(node.node[0].uriParameters);
            }

            if (node.parent) {
                findUriParams(node.parent);
            }
        };

        if ((x.parentUrl + x.relativeUri) === path) {
            findUriParams(this.parent);
        }
    });

    return uriStack;
}

var args = process.argv.slice(2);

if (args.length !== 1) {
    console.error('You need to specify exactly one argument!');
    process.exit(1);
}

// Start the parsing process
parse(args[0]);
