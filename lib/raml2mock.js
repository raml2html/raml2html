#!/usr/bin/env node

"use strict;"

var raml2html = require('./raml2html.js');
var handlebars = require('handlebars');

function jsonHelper(obj) {
  if (obj) {
    return new handlebars.SafeString(JSON.stringify(obj));
  } else {
    return '';
  }
}

function ifEqualsHelper(v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
}

function parse(source, onSuccess, onError) {
    var template = require('./server-template.handlebars');
    var resourceTemplate = require('./server-resource.handlebars');

    var config = {
         'template': template,
         'helpers': {
             'md': raml2html.markDownHelper,
             'highlight': raml2html.highlightHelper,
             'json': jsonHelper,
             'ifEquals': ifEqualsHelper
         },
         'partials': {
             'resource': resourceTemplate
         }
     };

    raml2html.parseWithConfig(source, config, onSuccess, onError);
}

if (require.main === module) {
    var argv = require('optimist')
                .usage('Usage: $0 --raml [raml file]')
                .demand(['raml'])
                .argv;

    parse(argv.raml, function(result) {
        process.stdout.write(result);
        process.exit(0);
    }, function(error) {
        console.log('Error parsing: ' + error);
        process.exit(1);
    });
}

module.exports.parse = parse;

module.exports.jsonHelper = jsonHelper;
module.exports.ifEqualsHelper = ifEqualsHelper;
