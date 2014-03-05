#!/usr/bin/env node

var raml = require('raml-parser');
var handlebars = require('handlebars');
var fs = require('fs');
var util = require('util');
var template = require('./template.handlebars');
var resourceTemplate = require('./resource.handlebars');

function addParentUrls(ramlObj, parentUrl) {
	var resource, index;
	for (index in ramlObj.resources) {
		resource = ramlObj.resources[index];
		resource.parentUrl = parentUrl;
		addParentUrls(resource, resource.parentUrl + resource.relativeUri);
	}

	return ramlObj;
}

function parse(source) {
    raml.loadFile(source).then(function(ramlObj) {
        ramlObj = addParentUrls(ramlObj, '');

        handlebars.registerPartial('resource', resourceTemplate);
        var result = template(ramlObj);

        // For now simply output to console
        process.stdout.write(result);
        process.exit(0);
    }, function(error) {
        console.log('Error parsing: ' + error);
        process.exit(1);
    });
}

var args = process.argv.slice(2);

if (args.length !== 1) {
    console.error('You need to specify exactly one argument!');
    process.exit(1);
}

// Start the parsing process
parse(args[0]);
