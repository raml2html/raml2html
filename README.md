# RAML to HTML

[![Downloads](https://img.shields.io/npm/dm/raml2html.svg)](https://www.npmjs.com/package/raml2html)
[![NPM version](http://img.shields.io/npm/v/raml2html.svg)](https://www.npmjs.org/package/raml2html)
[![js-standard-style](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat)](https://github.com/airbnb/javascript)

A simple RAML to HTML documentation generator, written for Node.js.
Check [raml2md](https://github.com/raml2html/raml2md) for a RAML to Markdown generator.


## Install
```
npm i -g raml2html
```


## Usage

### As a command line script
```
raml2html --help
raml2html example.raml > example.html
raml2html -t examples/custom-template-test/template.nunjucks -i example.raml -o example.html
```

### As a library

#### Using the default templates or your own Nunjucks templates
```
var raml2html = require('raml2html');
var configWithDefaultTemplates = raml2html.getDefaultConfig();
var configWithCustomTemplates = raml2html.getDefaultConfig('my-custom-template.nunjucks', __dirname);

// source can either be a filename, url, file contents (string) or parsed RAML object
raml2html.render(source, configWithDefaultTemplates).then(function(result) {
  // Save the result to a file or do something else with the result
}, function(error) {
  // Output error
});
```

#### Using your own processing function, for when you want to use another template language
```
/**
 * config should be an object with at least an `processRamlObj` property which is a function that receives the raw RAML 
 * object and must return a promise with the result. You can do whatever you want in this function.
 *
 * You can also supply a postProcessHtml function that can for example minify the generated HTML.
 */
raml2html.render(source, config).then(function(result) {
  // Save the result to a file or do something else with the result
}, function(error) {
  // Output error
});
```

See also `example/script.js` for an example of using raml2html as a library.

Please note that if you want to use a different template language, you're probably better off directly using
[raml2obj](https://github.com/raml2html/raml2obj).

### Gulp
You can use the [latest raml2html directly from Gulp](https://gist.github.com/iki/784ddd5ab33c1e1b726b), or use the third party 
[gulp-raml2html plugin](https://www.npmjs.org/package/gulp-raml2html) (which uses an outdated version of raml2html).
 
### Grunt
There's a third party Grunt plugin at https://www.npmjs.org/package/grunt-raml2html.


## Example output
Please see https://rawgit.com/raml2html/raml2html/master/examples/example.html for a live example.


## Before you report a bug
If you get parsing errors, please do not report them to raml2html: it doesn't do the actual RAML parsing.
Review the error and fix your RAML file, or open a new issue at [raml-js-parser](https://github.com/raml-org/raml-js-parser).


## Contributing
raml2html is an open source project and your contribution is very much appreciated.

1. Check for open issues or open a fresh issue to start a discussion around a feature idea or a bug.
2. Fork the repository on Github and make your changes on the **develop** branch (or branch off of it).  
   Please retain the [code style](https://github.com/airbnb/javascript) that is used in the project and `npm run lint` before committing. 
3. Add an example of the new feature to example.raml (if applicable)
4. Send a pull request (with the **develop** branch as the target).

A big thank you goes out to everyone who helped with the project, the [contributors](https://github.com/raml2html/raml2html/graphs/contributors)
and everyone who took the time to report issues and give feedback.


## Changelog
See [changelog.md](https://github.com/raml2html/raml2html/blob/master/changelog.md)


## License
raml2html is available under the MIT license. See the LICENSE file for more info.
