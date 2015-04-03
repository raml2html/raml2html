#!/usr/bin/env node

'use strict';

process.chdir(__dirname);
var raml2html = require('../lib/raml2html');


/**
 * Using the default templates
 *
 * raml2html.render() needs a config object with at least a `processRamlObj` property.
 * Instead of creating this config object ourselves, we can just ask for raml2html.getDefaultConfig():
 */
var config1 = raml2html.getDefaultConfig();

raml2html.render('example.raml', config1).then(function(result) {
  console.log('1: ', result.length);
}, function(error) {
  console.log('error! ', error);
});


/**
 * Using your own templates using the default processRamlObj function
 */
var config2 = raml2html.getDefaultConfig('template.nunjucks', '../lib/');

raml2html.render('example.raml', config2).then(function(result) {
  console.log('2: ', result.length);
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
  processRamlObj: function(ramlObj) {
    var Q = require('q');
    return Q.fcall(function() {
      return JSON.stringify(ramlObj);
    });
  }
};

raml2html.render('example.raml', config3).then(function(result) {
  console.log('3: ', result.length);
}, function(error) {
  console.log('error! ', error);
});
