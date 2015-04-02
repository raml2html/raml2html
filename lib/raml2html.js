#!/usr/bin/env node

'use strict';

var raml2obj = require('raml2obj');
var program = require('commander');
var fs = require('fs');
var pjson = require('../package.json');
var nunjucks = require('nunjucks');
var Q = require('q');

var markdown = require('nunjucks-markdown');
var marked = require('marked');
var renderer = new marked.Renderer();
renderer.table = function(thead, tbody) {
  // Render Bootstrap tables
  return '<table class="table"><thead>' + thead + '</thead><tbody>' + tbody + '</tbody></table>';
};

/*
 The config object can contain the following keys and values:
 template: url to the main template (required)
 templatesPath: a folder containing the templates (optional, by default it's relative to your working directory)
 https: boolean (optional)
 processOutput: function that takes data, return a promise (optional)
 */
function render(source, config) {
  config = config || {};
  config.protocol = config.https ? 'https:' : 'http:';
  config.raml2HtmlVersion = pjson.version;

  var env = nunjucks.configure(config.templatesPath, {watch: false});
  markdown.register(env, marked);

  return raml2obj.parse(source).then(function(ramlObj) {
    ramlObj.config = config;

    return Q.fcall(function() {
      var result = nunjucks.render(config.template, ramlObj);
      if (config.processOutput) {
        return config.processOutput(result);
      }

      return result;
    });
  });
}

function getDefaultConfig(https, mainTemplate) {
  var templatesPath = null;

  if (!mainTemplate) {
    mainTemplate = 'template.nunjucks';
    templatesPath = __dirname;
  }

  return {
    https: https,
    template: mainTemplate,
    templatesPath: templatesPath,
    processOutput: function(data) {
      data = data.replace(/&quot;/g, '"');

      var Minimize = require('minimize');
      var minimize = new Minimize({quotes: true});

      var deferred = Q.defer();

      minimize.parse(data, function(error, result) {
        if (error) {
          deferred.reject(new Error(error));
        } else {
          deferred.resolve(result);
        }
      });

      return deferred.promise;
    }
  };
}

if (require.main === module) {
  program
    .version(pjson.version)
    .usage('[options] [RAML input file]')
    .option('-i, --input [input]', 'RAML input file')
    .option('-s, --https', 'Use https links in the generated output')
    .option('-o, --output [output]', 'HTML output file')
    .option('-t, --template [template]', 'Path to custom template.nunjucks file')
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

  var https = program.https ? true : false;

  // Start the rendering process
  render(input, getDefaultConfig(https, program.template)).then(function(result) {
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

module.exports.getDefaultConfig = getDefaultConfig;
module.exports.render = render;
