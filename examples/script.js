/*
    Example of using raml2html as a script.
 */

var raml2html = require('../lib/raml2html');


// raml2html.render() needs a config object with at least a `template` property (a string or handlebars template object).
// Instead of creating this config object ourselves, we can just ask for raml2html.getDefaultConfig():
var config1 = raml2html.getDefaultConfig();

raml2html.render('example.raml', config1, function(result) {
    console.log('1: ', result.length);
}, function(error) {
    console.log('error! ', error);
});


// If you want to use your own templates that follow the same structure, helpers and partials,
// you could do something like this:
var config2 = raml2html.getDefaultConfig(false, require('../lib/template.handlebars'));

raml2html.render('example.raml', config2, function(result) {
    console.log('2: ', result.length);
}, function(error) {
    console.log('error! ', error);
});


// If you want to customize everything, just create the config object yourself from scratch.
// Check raml2html.getDefaultConfig for the possible properties (https, helpers, partials, processOutput).
// The template property should be a string containing the template or a Handlebars template object.
var config3 = {
    template: '<h1>Hello!</h1>'
};

raml2html.render('example.raml', config3, function(result) {
    console.log('3: ', result.length);
}, function(error) {
    console.log('error! ', error);
});
