#!/usr/bin/env node

/*
 Example of using raml2html as a script.
 Run this as `node script.js`
 */

var raml2html = require('..');
var path = require('path');
var ramlFile = path.join(__dirname, 'example.raml');

/**
 * Using the default templates
 *
 * raml2html.render() needs a config object with at least a `processRamlObj` property.
 * Instead of creating this config object ourselves, we can just ask for raml2html.getDefaultConfig():
 */
var config1 = raml2html.getDefaultConfig();

raml2html.render(ramlFile, config1).then(function(result) {
  console.log('1: ', result.length);
}, function(error) {
  console.log('error! ', error);
});

/**
 * Using your own templates using the default processRamlObj function
 */
var config2 = raml2html.getDefaultConfig('./custom-template-test/template.nunjucks', __dirname);

raml2html.render(ramlFile, config2).then(function(result) {
  console.log('2: ', result.trim().length);
}, function(error) {
  console.log('error! ', error);
});

/**
 * If you want to customize everything, just create the config object yourself from scratch.
 *
 * The important thing is to have a processRamlObj property: a function that takes a raw RAML object and returns
 * a promise with the finished output
 */
var config3 = {
  processRamlObj: function() {
    var Q = require('q');
    return Q.fcall(function() {
      return '<h1>\n\n\n<!--This is a test-->Hi!</h1>';
    });
  },

  postProcessHtml: config1.postProcessHtml
};

raml2html.render(ramlFile, config3).then(function(result) {
  console.log('3: ', result.length);
}, function(error) {
  console.log('error! ', error);
});

/**
 * You can also customize the postProcessHtml function
 */
var config4 = {
  processRamlObj: function() {
    var Q = require('q');
    return Q.fcall(function() {
      return '<h1>Hi!</h1>';
    });
  },

  postProcessHtml: function() {
    var Q = require('q');
    return Q.fcall(function() {
      return 'ABC';
    });
  }
};

raml2html.render(ramlFile, config4).then(function(result) {
  console.log('4: ', result.length);
}, function(error) {
  console.log('error! ', error);
});

/*
 * Testing if it works with no config at all
 */
raml2html.render(ramlFile, {}).then(function(result) {
  console.log('5: ', Object.keys(result).length);
}, function(error) {
  console.log('error! ', error);
});
