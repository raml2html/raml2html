# RAML to HTML

A simple RAML to HTML documentation generator, written for Node.js.
Check [raml2md](https://github.com/kevinrenskers/raml2md) for a RAML to Markdown generator.


## Install
```
npm i -g raml2html
```


## Usage

### As a command line script

```
raml2html --help
raml2html example.raml > example.html
raml2html -i example.raml -o example.html
raml2html -s -i example.raml -o example.html
```

Using your own templates:

```
raml2html -t custom-template.handlebars -r custom-resource.handlebars -m custom-item.handlebars -i example.raml -o example.html
```

### As a library

```
var raml2html = require('raml2html');

// Using the default templates:
// source can either be a filename, url, file contents (string) or parsed RAML object
var config = raml2html.getDefaultConfig(https); // https is a boolean, true means https links will be used instead of http
raml2html.render(source, config, onSuccess, onError);

// Using your own templates:
// - config should be an object with at least an `template` property
// - config can also include `helpers` and `partials`
// - config can also include a function `processOutput` which will receive the raw rendered HTML, onSuccess and onError callbacks
// - the config object will be accessible from your handlebars templates
raml2html.render(source, config, onSuccess, onError);
```

### Gulp
There's a Gulp plugin at https://www.npmjs.org/package/gulp-raml2html.

### Grunt
There's a Grunt plugin at https://www.npmjs.org/package/grunt-raml2html.


## Example output
![Example output](https://raw.github.com/kevinrenskers/raml2html/master/examples/example.png)


## Before you report a bug
If you get parsing errors, please do not report them to raml2html: it doesn't do the actual RAML parsing.
Review the error and fix your RAML file, or open a new issue at [raml-js-parser](https://github.com/raml-org/raml-js-parser).


## Contributing
raml2html is an open source project and your contribution is very much appreciated.

1. Check for open issues or open a fresh issue to start a discussion around a feature idea or a bug.
2. Fork the repository on Github and make your changes on the **develop** branch (or branch off of it).
   Please retain the code style that is used in the project.
3. Add an example of the new feature to example.raml (if applicable)
4. Send a pull request (with the **develop** branch as the target).

A big thank you goes out to everyone who helped with the project, the [contributors](https://github.com/kevinrenskers/raml2html/graphs/contributors)
and everyone who took the time to report issues and give feedback.


## Changelog
See [changelog.md](https://github.com/kevinrenskers/raml2html/blob/master/changelog.md)


## To do
This project is still a work in progress, but the output is very usable already (and is in fact used by multiple
companies including Google). Still left to do, in no particular order:

* Template options (for example to turn off side bar navigation)
* Finish HTML output, currently there's still some stuff missing (like securedBy)


## License
raml2html is available under the MIT license. See the LICENSE file for more info.
