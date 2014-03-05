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

var source = process.argv[2];

raml.loadFile(source).then(function(ramlObj) {
	ramlObj = addParentUrls(ramlObj, '');
	
	handlebars.registerPartial('resource', resourceTemplate);
	var result = template(ramlObj);
    
    // For now simply output to console
	console.log(result);
}, function(error) {
    console.log('Error parsing: ' + error);
});
