# RAML to HTML

A simple RAML to HTML parser written for Node.js.


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


## To do
This project is still very much a work in progress, but the output is quite useable already.

* Template options (for example to turn off side bar navigation)
* Finish HTML output, currently there's still some stuff missing (like securedBy and headers)
* Different templates (for example render to Markdown to create awesome README's)


## Example output
![Example output](https://raw.github.com/kevinrenskers/raml2html/master/example.png)


## License
raml2html is available under the MIT license. See the LICENSE file for more info.
