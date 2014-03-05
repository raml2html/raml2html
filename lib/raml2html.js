#!/usr/bin/env node

var raml = require('raml-parser');
var handlebars = require('handlebars');
var fs = require('fs');
var util = require('util');
var template = require('./template.handlebars');
var resourceTemplate = require('./resource.handlebars');

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
        //console.log(util.inspect(ramlObj, false, null));
        //process.exit(0);

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

var args = process.argv.slice(2);

if (args.length !== 1) {
    console.error('You need to specify exactly one argument!');
    process.exit(1);
}

// Start the parsing process
parse(args[0]);
