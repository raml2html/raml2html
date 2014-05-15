# RAML to HTML

A simple RAML to HTML documentation generator, written for Node.js.


## Install
```
npm i -g raml2html
```


## Usage
As a command line script:

```
raml2html example.raml > example.html
raml2html -i example.raml -o example.html
```

As a library:

```
var raml2html = require('raml2html');

// Using the default templates:
// source can either be a filename, file contents (string) or parsed RAML object
raml2html.parse(source, onSuccess, onError);

// Using your own templates:
// config should be an object with at least an `template` property
raml2html.parseWithConfig(source, config, onSuccess, onError);
```


## Example output
![Example output](https://raw.github.com/kevinrenskers/raml2html/master/example.png)


## Contribute
raml2html is an open source project and your contribution is very much appreciated.

1. Check for open issues or open a fresh issue to start a discussion around a feature idea or a bug.
2. Fork the repository on Github and make your changes on the develop branch (or branch off of it).
   Please retain the code style that is used in the project.
3. Send a pull request.

A big thank you goes out to everyone who helped with the project, our [contributors](https://github.com/kevinrenskers/raml2html/graphs/contributors)
and everyone who took the time to report issues and give feedback.


## To do
This project is still very much a work in progress, but the output is quite usable already.

* Template options (for example to turn off side bar navigation)
* Finish HTML output, currently there's still some stuff missing (like securedBy and headers)
* Different templates (for example render to Markdown to create awesome README's)


## License
raml2html is available under the MIT license. See the LICENSE file for more info.
