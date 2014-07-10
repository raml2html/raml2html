#!/usr/bin/env node

'use strict';

var raml2obj = require('raml2obj');
var handlebars = require('handlebars');
var hljs = require('highlight.js');
var marked = require('marked');
var program = require('commander');
var fs = require('fs');
var pjson = require('../package.json');

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

function _render(ramlObj, config, onSuccess) {
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

    var result = config.template(ramlObj);
    onSuccess(result);
}

function parseWithConfig(source, config, onSuccess, onError) {
    raml2obj.parse(source, function(ramlObj) {
        ramlObj.config = config;
        ramlObj.config.raml2HtmlVersion = pjson.version;
        _render(ramlObj, config, onSuccess);
    }, onError);
}

function getDefaultConfig() {
    var config = {
        'template': require('./template.handlebars'),
        'helpers': {
            'md': _markDownHelper,
            'highlight': _highlightHelper,
            'lock': _lockIconHelper
        },
        'partials': {
            'resource': require('./resource.handlebars')
        }
    };

    marked.setOptions({
        highlight: _highlightHelper
    });

    return config;
}

function parse(source, onSuccess, onError) {
    parseWithConfig(source, getDefaultConfig(), onSuccess, onError);
}


if (require.main === module) {
    program
        .usage('[options] [RAML input file]')
        .option('-i, --input [input]', 'RAML input file')
        .option('-o, --output [output]', 'HTML output file')
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
module.exports.getDefaultConfig = getDefaultConfig;
