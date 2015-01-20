/*
    Example of using raml2html as a script
 */

var raml2html = require('../lib/raml2html');
var config = raml2html.getDefaultConfig();

raml2html.render('example.raml', config, function(result) {
    console.log(result);
}, function(error) {
    console.log('error! ', error);
});
