'use strict';

var raml2obj = require('raml2obj');
var pjson = require('./package.json');
var Q = require('q');
var Stream = require('stream');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

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
 * Render a stream of RAML files, for use in Gulp

 * @param {Object} config
 * @returns a stream with the rendered results
 */
function renderStream(config) {
  var stream = new Stream.Transform({objectMode: true});

  stream._transform = function(file, encoding, cb) {
    if (file.isStream()) {
      return cb(new PluginError('raml2html', 'Streams are not supported!'));
    }

    render(file.contents, config).then(function(result) {
      file.contents = new Buffer(result);
      file.path = gutil.replaceExtension(file.path, '.html');
      cb(null, file);
    }, function(error) {
      cb(new gutil.PluginError('raml2html', error));
    });
  };

  return stream;
}

/**
 * @param {String} [mainTemplate] - The filename of the main template, leave empty to use default templates
 * @returns {{processRamlObj: Function}}
 */
function getDefaultConfig(mainTemplate) {
  if (!mainTemplate) {
    // When using the default templates, using raml2html's lib folder as the templates path
    mainTemplate = 'lib/index.html';
  }

  return {
    processRamlObj: function(ramlObj) {
      var Q = require('q');
      return Q.fcall(function() {
        return JSON.stringify(ramlObj);
      });
    }
  };
}

module.exports.getDefaultConfig = getDefaultConfig;
module.exports.render = render;
module.exports.renderStream = renderStream;
