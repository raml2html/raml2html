# raml2html

[![Downloads](https://img.shields.io/npm/dm/raml2html.svg)](https://www.npmjs.com/package/raml2html)
[![NPM version](http://img.shields.io/npm/v/raml2html.svg)](https://www.npmjs.org/package/raml2html)
[![Prettier](https://img.shields.io/badge/code%20style-prettier-blue.svg?style=flat)](https://github.com/prettier/prettier)

A simple RAML to HTML documentation generator, written for Node.js, with theme support.

### RAML version support
raml2html 4 and higher only support RAML 1.0 files. Please stick with raml2html 3.x for RAML 0.8 support.

### Support future development
If you'd like to support sustainable open source development, and make it possible for me to
consistently spend some time on raml2html, please [support me on Patreon](https://www.patreon.com/kevinrenskers).
Or better yet, become a contributor!


## Install
```
npm i -g raml2html
```


## Themes
raml2html ships with a default theme, but you can install more from NPM. For example, to render
RAML to Markdown, you can install the raml2html-markdown-theme theme:

```
npm i -g raml2html-markdown-theme
```

Search NPM for the "raml2html-theme" keyword (or use [this link](https://www.npmjs.com/browse/keyword/raml2html-theme))
to find more themes.

## Usage

### As a command line script
```
raml2html --help
raml2html example.raml > example.html
raml2html --theme raml2html-markdown-theme example.raml > example.html
raml2html --template my-custom-template.nunjucks -i example.raml -o example.html
```

### As a library

#### Using the default theme, different themes, or your own Nunjucks templates
```javascript
const raml2html = require('raml2html');
const configWithDefaultTheme = raml2html.getConfigForTheme();
const configForDifferentTheme = raml2html.getConfigForTheme('raml2html-markdown-theme');
const configWithCustomTemplate = raml2html.getConfigForTemplate('~/path/to/my-custom-template.nunjucks');

// source can either be a filename, url, or parsed RAML object
raml2html.render(source, configWithDefaultTheme).then(function(result) {
  // Save the result to a file or do something else with the result
}, function(error) {
  // Output error
});
```

#### Using your own processing function, for full control over the whole rendering process
```javascript
/**
 * config should be an object with at least an `processRamlObj` property which is a function that receives the raw RAML
 * object and must return a promise with the result. You can do whatever you want in this function.
 *
 * You can also supply a postProcessHtml function that can for example minify the generated HTML.
 *
 * You can also add a setupNunjucks function that takes the env as its only parameter.
 */
raml2html.render(source, config).then(function(result) {
  // Save the result to a file or do something else with the result
}, function(error) {
  // Output error
});
```

See also `example/script.js` for multiple examples of using raml2html as a library.

### Gulp
You can use the [raml2html directly from Gulp](https://gist.github.com/iki/784ddd5ab33c1e1b726b).


## Example output
Please see the following links for live examples:
- https://rawgit.com/raml2html/default-theme/master/examples/helloworld.html
- https://rawgit.com/raml2html/default-theme/master/examples/world-music-api.html


## Before you report a bug
If you get parsing errors, please do not report them to raml2html: it doesn't do the actual RAML parsing.
Review the error and fix your RAML file, or open a new issue at [raml-js-parser-2](https://github.com/raml-org/raml-js-parser-2).


## Contributing
raml2html is an open source project and your contribution is very much appreciated.

1. Check for open issues or open a fresh issue to start a discussion around a feature idea or a bug.
2. Fork the repository on Github and make your changes on the **develop** branch (or branch off of it).
   Run `npm run lint` before committing to check for common problems and auto format all code.
3. Add an example of the new feature to example.raml (if applicable)
4. Send a pull request (with the **develop** branch as the target).

If your pull request is merged feel free to ask for push access. We want to get more maintainers! If you do
have push access, please still work on feature branches and create pull requests, which then get reviewed.
You can also review other people's pull requests and be involved in that way.

A big thank you goes out to everyone who helped with the project, the [contributors](https://github.com/raml2html/raml2html/graphs/contributors)
and everyone who took the time to report issues and give feedback.

### Local setup
To get the best environment to work on raml2html and the default theme, follow these steps.

1. Checkout raml2html-default-theme's develop branch; `npm link`.
2. Checkout raml2html's develop branch; first `npm link raml2html-default-theme` and then `npm link`.

Now both projects are installed globally, but using the local development versions of both.
From the theme repo's example folder you can run the `render-all-examples` script without problem.


## Supporters
If you'd like to financially support raml2html and be listed right here as a supporter, please
[support me on Patreon](https://www.patreon.com/kevinrenskers).


## Changelog
See [changelog.md](https://github.com/raml2html/raml2html/blob/master/changelog.md)


## License
raml2html is available under the MIT license. See the LICENSE file for more info.
