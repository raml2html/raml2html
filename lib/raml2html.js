#!/usr/bin/env node

var raml = require('raml-parser');
var handlebars = require('handlebars');
var hljs = require('highlight.js');
var marked = require('marked');
var program = require('commander');
var fs = require('fs');

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
    return fullUrl.replace(/\W/g, '_');
}

function traverse(ramlObj, parentUrl, allUriParameters) {
    var resource, index;
    for (index in ramlObj.resources) {
        resource = ramlObj.resources[index];
        resource.parentUrl = parentUrl || '';
        resource.uniqueId = makeUniqueId(resource);
        resource.allUriParameters = [];

        if (allUriParameters) {
            resource.allUriParameters.push.apply(resource.allUriParameters, allUriParameters);
        }

        if (resource.uriParameters) {
            var key;
            for (key in resource.uriParameters) {
                resource.allUriParameters.push(resource.uriParameters[key]);
            }
        }

        traverse(resource, resource.parentUrl + resource.relativeUri, resource.allUriParameters);
    }

    return ramlObj;
}

function markDownHelper(text) {
    if (text && text.length) {
        return new handlebars.SafeString(marked(text));
    } else {
        return '';
    }
}

function highlightHelper(text) {
    if (text && text.length) {
        return new handlebars.SafeString(hljs.highlightAuto(text).value);
    } else {
        return '';
    }
}

function lockIconHelper(securedBy) {
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

function defaultValueHelper(val, defaultValue) {
    if (val == '' || !val) {
        return defaultValue;
    } else {
        return val;
    }
}

function compileRamlObj(ramlObj, config, onSuccess) {
    ramlObj = parseBaseUri(ramlObj);
    ramlObj = traverse(ramlObj);

    // Register handlebar helpers
    for (var helperName in config.helpers) {
        handlebars.registerHelper(helperName, config.helpers[helperName]);
    }

    // Register handlebar partials
    for (var partialName in config.partials) {
        handlebars.registerPartial(partialName, config.partials[partialName]);
    }

    var result = config.template(ramlObj);
    onSuccess(result);
}

function sourceToRamlObj(source, onSuccess, onError) {
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
        onError(new Error('sourceToRamlObj: You must supply either file, data or obj as source.'));
    }
}

function parseWithConfig(source, config, onSuccess, onError) {
    sourceToRamlObj(source, function(ramlObj) {
        compileRamlObj(ramlObj, config, onSuccess);
    }, onError);
}

function parse(source, onSuccess, onError) {
    var template = require('./template.handlebars');
    var resourceTemplate = require('./resource.handlebars');

    var config = {
        'template': template,
        'helpers': {
            'md': markDownHelper,
            'highlight': highlightHelper,
            'lock': lockIconHelper,
            'default': defaultValueHelper
        },
        'partials': {
            'resource': resourceTemplate
        }
    };

    parseWithConfig(source, config, onSuccess, onError);
}


if (require.main === module) {
    program
        .usage('[options] [RAML input file]')
        .option('-i, --input [input]', 'RAML input file')
        .option('-o, --output [output]', 'HTML output file')
        //.option('-t, --template [template]', 'Template file to use') // for the future :)
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

    // Start the parsing process
    parse(input, function(result) {
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


module.exports.parse = parse;
module.exports.parseWithConfig = parseWithConfig;
