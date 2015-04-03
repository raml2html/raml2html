#!/usr/bin/env node

'use strict';

var raml2obj = require('raml2obj');
var program = require('commander');
var fs = require('fs');
var pjson = require('../package.json');
var Q = require('q');

/**
 * Render the source RAML object using the config's processOutput function
 *
 * The config object should contain at least the following property:
 * processRamlObj: function that takes the raw RAML object and returns a promise with the rendered HTML
 *
 * @param {(String|Object)} source - The source RAML file. Can be a filename, url, contents of the RAML file,
 * or an already-parsed RAML object.
 * @param {Object} config
 * @param {Function} config.processRamlObj
 * @returns a promise
 */
function render(source, config) {
  config = config || {};
  config.raml2HtmlVersion = pjson.version;

  return raml2obj.parse(source).then(function(ramlObj) {
    ramlObj.config = config;

    if (config.processRamlObj) {
      return config.processRamlObj(ramlObj);
    }

    return Q.fcall(function() {
      return ramlObj;
    });
  });
}

/**
 * @param {String} [mainTemplate] - The filename of the main template, leave empty to use default templates
 * @param {String} [templatesPath] - Optional, by default it uses the current working directory
 * @returns {{processRamlObj: Function}}
 */
function getDefaultConfig(mainTemplate, templatesPath) {
  if (!mainTemplate) {
    // When using the default templates, using raml2html's lib folder as the templates path
    mainTemplate = 'template.nunjucks';
    templatesPath = __dirname;
  }

  return {
    processRamlObj: function(ramlObj) {
      var nunjucks = require('nunjucks');
      var markdown = require('nunjucks-markdown');
      var marked = require('marked');
      var renderer = new marked.Renderer();
      renderer.table = function(thead, tbody) {
        // Render Bootstrap style tables
        return '<table class="table"><thead>' + thead + '</thead><tbody>' + tbody + '</tbody></table>';
      };

      // Setup the Nunjucks environment with the markdown parser
      var env = nunjucks.configure(templatesPath, {watch: false});
      markdown.register(env, marked);

      // Render the main template using the raml object and fix the double quotes
      var html = nunjucks.render(mainTemplate, ramlObj);
      html = html.replace(/&quot;/g, '"');

      // Minimize the generated html and return the promise with the result
      var Minimize = require('minimize');
      var minimize = new Minimize({quotes: true});

      var deferred = Q.defer();

      minimize.parse(html, function(error, result) {
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

  // Start the rendering process
  render(input, getDefaultConfig(program.template)).then(function(result) {
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
