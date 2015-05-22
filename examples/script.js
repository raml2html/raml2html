#!/usr/bin/env node

'use strict';

var raml2html = require('..');

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
      return '<h1>\n\n\n<!--This is a test-->Hi!</h1>';
    });
  },

  postProcessHtml: config1.postProcessHtml
};

raml2html.render('example.raml', config3).then(function(result) {
  console.log('3: ', result.length);
}, function(error) {
  console.log('error! ', error);
});

/**
 * You can also customize the postProcessHtml function
 */
var config4 = {
  processRamlObj: function(ramlObj) {
    var Q = require('q');
    return Q.fcall(function() {
      return '<h1>Hi!</h1>';
    });
  },

  postProcessHtml: function(html) {
    var Q = require('q');
    return Q.fcall(function() {
      return 'ABC';
    });
  }
};

raml2html.render('example.raml', config4).then(function(result) {
  console.log('4: ', result.length);
}, function(error) {
  console.log('error! ', error);
});

/*
 * Testing if it works with no config at all
 */
raml2html.render('example.raml', {}).then(function(result) {
  console.log('5: ', Object.keys(result).length);
}, function(error) {
  console.log('error! ', error);
});
