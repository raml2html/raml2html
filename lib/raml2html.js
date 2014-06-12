#!/usr/bin/env node

'use strict';

var raml = require('raml-parser');
var handlebars = require('handlebars');
var hljs = require('highlight.js');
var marked = require('marked');
var program = require('commander');
var fs = require('fs');

function _parseBaseUri(ramlObj) {
    // I have no clue what kind of variables the RAML spec allows in the baseUri.
    // For now keep it super super simple.
    if (ramlObj.baseUri){
        ramlObj.baseUri = ramlObj.baseUri.replace('{version}', ramlObj.version);
    }
    return ramlObj;
}

function _makeUniqueId(resource) {
    var fullUrl = resource.parentUrl + resource.relativeUri;
    return fullUrl.replace(/\W/g, '_');
}

function _traverse(ramlObj, parentUrl, allUriParameters) {
    var resource;
    for (var index in ramlObj.resources) {
        if (ramlObj.resources.hasOwnProperty(index)) {
            resource = ramlObj.resources[index];
            resource.parentUrl = parentUrl || '';
            resource.uniqueId = _makeUniqueId(resource);
            resource.allUriParameters = [];

            if (allUriParameters) {
                resource.allUriParameters.push.apply(resource.allUriParameters, allUriParameters);
            }

            if (resource.uriParameters) {
                for (var key in resource.uriParameters) {
                    if (resource.uriParameters.hasOwnProperty(key)) {
                        resource.allUriParameters.push(resource.uriParameters[key]);
                    }
                }
            }

            _traverse(resource, resource.parentUrl + resource.relativeUri, resource.allUriParameters);
        }
    }

    return ramlObj;
}

function _markDownHelper(text) {
    if (text && text.length) {
        return new handlebars.SafeString(marked(text));
    } else {
        return '';
    }
}

function _highlightHelper(text) {
    if (text && text.length) {
        return new handlebars.SafeString(hljs.highlightAuto(text).value);
    } else {
        return '';
    }
}

function _lockIconHelper(securedBy) {
    if (securedBy && securedBy.length) {
        var index = securedBy.indexOf(null);
        if (index !== -1) {
            securedBy.splice(index, 1);
        }

        if (securedBy.length) {
            return new handlebars.SafeString(' <span class="glyphicon glyphicon-lock" title="Authentication required"></span>');
        }
    }

    return '';
}

function _compileRamlObj(ramlObj, config, onSuccess) {
    ramlObj = _parseBaseUri(ramlObj);
    ramlObj = _traverse(ramlObj);
    ramlObj.config = config;

    // Register handlebar helpers
    for (var helperName in config.helpers) {
        if (config.helpers.hasOwnProperty(helperName)) {
            handlebars.registerHelper(helperName, config.helpers[helperName]);
        }
    }

    // Register handlebar partials
    for (var partialName in config.partials) {
        if (config.partials.hasOwnProperty(partialName)) {
            handlebars.registerPartial(partialName, config.partials[partialName]);
        }
    }

    // Add unique id's to top level documentation chapters
    for (var idx in ramlObj.documentation) {
        if (ramlObj.documentation.hasOwnProperty(idx)) {
            var docSection = ramlObj.documentation[idx];
            docSection.uniqueId = docSection.title.replace(/\W/g, '-');
        }
    }

    var result = config.template(ramlObj);
    onSuccess(result);
}

function _sourceToRamlObj(source, onSuccess, onError) {
    if (typeof(source) === 'string') {
        if (fs.existsSync(source)) {
            // Parse as file
            raml.loadFile(source).then(onSuccess, onError);
        } else {
            // Parse as string or buffer
            raml.load('' + source).then(onSuccess, onError);
        }
    } else if (source instanceof Buffer) {
        // Parse as buffer
        raml.load('' + source).then(onSuccess, onError);
    } else if (typeof(source) === 'object') {
        // Parse RAML object directly
        process.nextTick(function() {
            onSuccess(source);
        });
    } else {
        onError(new Error('_sourceToRamlObj: You must supply either file, data or obj as source.'));
    }
}

function getConfig(template) {
    if (template === 'markdown') {
        return {
            'template': require('./markdown_template.handlebars'),
            'partials': {
                'resource': require('./markdown_resource.handlebars')
            }
        };
    } else {
        return {
            'template': require('./html_template.handlebars'),
            'helpers': {
                'md': _markDownHelper,
                'highlight': _highlightHelper,
                'lock': _lockIconHelper
            },
            'partials': {
                'resource': require('./html_resource.handlebars')
            }
        };
    }
}

function parseWithConfig(source, config, onSuccess, onError) {
    _sourceToRamlObj(source, function(ramlObj) {
        _compileRamlObj(ramlObj, config, onSuccess);
    }, onError);
}

// Deprecated: use getConfig and parseWithConfig
function parse(source, onSuccess, onError) {
    var config = getConfig('html');
    parseWithConfig(source, config, onSuccess, onError);
}


if (require.main === module) {
    program
        .usage('[options] [RAML input file]')
        .option('-i, --input [input]', 'RAML input file')
        .option('-o, --output [output]', 'HTML output file')
        .option('-t, --template [template]', 'Template file to use (html or markdown)')
        .parse(process.argv);

    var input = program.input;

    if (!input) {
        if (program.args.length !== 1) {
            console.error('Error: You need to specify the RAML input file');
            program.help();
            process.exit(1);
        }

        input = program.args[0];
    }

    var template = program.template || 'html';
    var config = getConfig(template);

    // Start the parsing process
    parseWithConfig(input, config, function(result) {
        if (program.output) {
            fs.writeFileSync(program.output, result);
        } else {
            // Simply output to console
            process.stdout.write(result);
            process.exit(0);
        }
    }, function(error) {
        console.log('Error parsing: ' + error);
        process.exit(1);
    });
}


module.exports.parse = parse; // deprecated
module.exports.getConfig = getConfig;
module.exports.parseWithConfig = parseWithConfig;
