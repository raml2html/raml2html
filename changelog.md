6.4.1 - August 4, 2017
- Fixed a bug where if no options were given at all to the render function you'd get an error

6.4.0 - July 16, 2017
- Added a new --pretty command line option to turn off html minification

6.3.0 - April 25, 2017
- Added a new --validate command line option to turn on validation, which is now off by default (#345)

6.2.0 - April 21, 2017
- Fixed template path handling (#343)

6.1.1 - April 14, 2017
- Updated third party dependencies

6.1.0 - March 24, 2017
- Updated raml2obj dependency, also made it less strict

6.0.0 - March 17, 2017
- Updated from raml2obj 4.1.0 to 5.1.0, which has backwards incompatible changes to securedBy
  (among other bug fixes)
- Updated to raml2html-default-theme 2.0.0 to deal with these securedBy changes

5.1.0 - March 9, 2017
- All program arguments can now be passed on to themes, so themes can support their
  own config options
- Switched from using ESLint for code formatting to Prettier. We still use ESLint,
  Prettier is run as a plugin through it. ESLint still checks for bugs.

5.0.0 - February 14, 2017
- Added support for themes:
  - the command line interface now takes an optional `--theme` parameter
  - we ship two officially supported themes: raml2html-default-theme and raml2html-markdown-theme
  - themes can overwrite the entire rendering process, allowing themes to use different templating engines
    or output formats (Markdown, PDF, etc)
  - the `getDefaultConfig` function has been split into `getConfigForTemplate` and `getConfigForTheme`,
    use `getConfigForTheme` without any parameters to get the old behaviour of `getDefaultConfig`

4.1.1 - February 6, 2017
- Improved error reporting (#316)

4.1.0 - January 28, 2017
- Render more information about examples (name, description) (#313)
- Render more security scheme data (#310)
- Updated raml2obj, which
  - Updated raml-js-parser-2 dependancy
  - Fixed types' parent overriding behaviour

4.0.6 - January 23, 2017
- Fixed template render error (#305)

4.0.5 - January 9, 2017
- Fix array examples (#302)

4.0.4 - December 27, 2016
- Put properties before example for item (#299)
- Fix template variable reference that prevented type properties from rendering (#300)

4.0.3 - December 12, 2016
- Render item examples (#293)

4.0.2 - December 8, 2016
- Improve error output (#289)

4.0.1 - December 8, 2016
- Documentation fixes

4.0.0 - December 1, 2016
- We're releasing 4.0.0 with RAML 1 support. Please keep in mind that we no longer support RAML 0.8 files. For other changes please check the beta's below.

4.0.0-beta18 - November 30, 2016
- Updated raml2obj

4.0.0-beta17 - November 23, 2016
- Improved rendering of nested properties (#274)

4.0.0-beta16 - November 22, 2016
- Improved rendering of inherited array properties (#277)

4.0.0-beta15 - November 21, 2016
- Updated raml2obj
- Fixed rendering of type array of primitives (like string[])

4.0.0-beta14 - November 3, 2016
- Fixed template render error (#272)

4.0.0-beta13 - November 2, 2016
- Updated raml2obj to 4.0.0-beta13, fixing type expansion in uriParameters (#271)

4.0.0-beta12 - November 1, 2016
- Improved array type support (#265)

4.0.0-beta11 - November 1, 2016
- Updated raml2obj to 4.0.0-beta11, solving problems with JSON datatypes

4.0.0-beta10 - October 31, 2016
- Updated raml2obj to 4.0.0-beta10

4.0.0-beta9 - October 19, 2016
- Deal with object datatypes

4.0.0-beta8 - October 14, 2016
- Updated raml2obj to 4.0.0-beta9, which deals with type inheritance

4.0.0-beta7 - October 5, 2016
- Rendering types

4.0.0-beta6 - October 4, 2016
- Using raml2obj 4.0.0-beta7

4.0.0-beta5 - September 30, 2016
- Fixed files list in package.json

4.0.0-beta4 - September 29, 2016
- Using raml2obj 4.0.0-beta6 which expands types and always gives consistent examples arrays
- Rendering baseUriParameters
- Rendering `properties` instead of `formParameters`
- Rendering multiple `examples`
- Improved rendering of single item enums
- Very basic initial rendering of annotations on methods
- Removed rendering of `types` for now

4.0.0-beta3 - September 27, 2016
- Allow Nunjucks config via a `config.setupNunjucks` function (#261)
- Fixed securedBy usage in the templates
- Added a full featured RAML 1.0 example file (world-music-api.raml)
- Fixed examples/script.js

4.0.0-beta2 - September 26, 2016
- Using raml2obj 4.0.0-beta3
- Fixed templates to use the changed output from raml2obj
- Added a new basic example RAML file
- Removed a bunch of old examples

3.0.1 - September 16, 2016
- Fixed a problem where the output would be truncated after 65536 characters (#259)

4.0.0-beta1 - August 10, 2016
- Using raml2obj 4.0.0-beta1, which adds support for RAML 1.0
  (even though raml2html's template doesn't support that yet)

3.0.0 - August 10, 2016
- Released without further changes

3.0.0-beta2 - August 8, 2016
- Updated to raml2obj 3.0.0-beta2
- Fixed rendering of the github.raml example file (#249)

3.0.0-beta1 - August 7, 2016
- Updated code to use ES6 syntax
- Updated all dependencies
- Breaking change: Node 4 or higher is now required
- Breaking change: nunjucks-markdown 2.0.0 is a bit fuzzy with whitespace, please check
  https://github.com/raml2html/raml2html/pull/231 for help with updating your custom templates.

2.5.0 - August 4, 2016
- Updated highlight.js to 9.3.0
- Added support for securedBy scopes
- Added syntax highlighting within modals
- Improved item display of values false and 0
- Improved multiple security schemes handling
- Horizontally scroll overflowing code snippets

2.4.0 - March 12, 2016
- Downgraded Nunjucks back to 1.3.0 due to peer conflicts with nunjucks-markdown
  (which can't be upgraded because the newest version is broken)

2.3.0 - February 23, 2016
- Updated all 3rd party dependancies
- Fix default tab selection
- Improved security schema rendering
- Expand $ref properties by using raml-json-expander

2.2.0 - January 20, 2016
- Now writing parse errors to STDERR

2.1.2 - November 13, 2015
- Better fix for #152 (#157)

2.1.1 - November 5, 2015
- Fix JS error in Chrome when opening the html file from the local file system and then closing a modal (#152)

2.1.0 - August 25, 2015
- Update third party dependencies and ESLint rules
- Nunjucks 1.3.0 makes working with relative template includes a lot easier, use like this:
  {% include "./resource.nunjucks" %}
- Fixed bug where multiple instances of raml2html would share the Nunjucks config,
  even if one of them needed to use a different templatePath
- Removed the templatePath option from the CLI since relative templates now work as expected
- Render description for securityScheme
- Fixed table formatting

2.0.2 - June 23, 2015
- Fixed rendering of XML/HTML examples and schemes by properly escaping these variables (#140)

2.0.1 - May 27, 2015
- Fixed rendering of header

2.0.0 - May 22, 2015
- Using a promise based API, please see README for updated usage example
- Using Nunjucks by default, instead of Handlebars
- Made it a lot easier to completely customize the entire rendering process, allowing you for example to use not only
  custom templates but even a different template engine
- Got rid of the -s / https option, all external sources are simply always loaded via https
- Got rid of the -r and -m template options, as the resource- and item templates are now simply loaded from within
  the main template

1.6.0 - March 24, 2015
- Use hash tags for opening modals (#131)

1.5.0 - March 11, 2015
- Made the side menu a fixed height (#110)
- Added a background color for PATCH (#117)
- Response tab is set to active when request tab isn't shown (#120)
- Added additional information in query parameter (#121)

1.4.0 - January 30, 2015
- If an example's type is explicitly set to 'string' then don't syntax highlight it

1.3.1 - January 28, 2015
- Fixed the id's of the tabs (#108)

1.3.0 - January 21, 2015
- Now rendering default values for parameters (#100) and securedBy (#10)

1.2.0 - January 20, 2015
- Greatly simplified the loading of (custom) templates and the default behaviour of `getDefaultConfig`.
  Sadly loading remote template files is no longer possible from the command line, but you can always create a simple
  wrapper script if you need this functionality. Please let me know if this is a feature you absolutely need.

1.1.1 - January 20, 2015
- Fixed default behaviour of calling `getDefaultConfig` with no arguments,
  which should always use the default templates

1.1.0 - January 14, 2015
- Now using raml-parser's FileReader which makes it a lot easier to load custom templates
  in other folders or even as remote urls (#96)

1.0.6 - January 14, 2015
- Bugfix: use passed in template parameter when checking paths (#98)

1.0.5 - December 3, 2014
- Configured the html minifier to keep the quotes around html attributes (#93)

1.0.4 - September 25, 2014
- Updated readme and raml2obj version

1.0.3 - September 12, 2014
- Fixed method :hover effect, which was broken after #63

1.0.2 - September 12, 2014
- Improved detection of empty resources

1.0.1 - September 10, 2014
- Solved problem with indentation of code examples (#66)
- Added `--version` command line option (#75)

1.0.0 - September 10, 2014
- **Finalized API, replaced `parse`/`parseWithConfig` with a single `render` method**
- Added a way for users to specify their own output processing via a `processOutput` function in the config object

0.32.0 - September 9, 2014
- Support for custom templates via command line parameters (#72)

0.31.2 - September 6, 2014
- Support enums for headers and URI parameters (#59)
- Rendering URI parameter examples (#57)
- Greatly simplified `resource.handlebars` by moving all the common code into a separate partial

0.31.1 - August 21, 2014
- Fixed HTML validity (#61)
- Fixed rendering of links within Markdown content (#63)

0.31.0 - August 21, 2014
- Improved rendering of tables within Markdown content

0.30.0 - July 16, 2014
- Adding `-s` command line parameter to use https links in the generated html file (it uses http by default)
- Deprecated the `parse` function, use `parseWithConfig` instead (in combination with the `getDefaultConfig` function)
- Bugfix: fixed html escaping for XML/HTML content (#53)

0.29.0 - July 16, 2014
- Moved code highlighting to the client to generate smaller HTML output
- Use a HTML minifier to generate MUCH smaller output
- Don't html-escape string in `<pre><code>` blocks
- The GitHub example used to be 3.2 MB, after these changes it's down to 1.2 MB

0.28.0 - July 14, 2014
- Render descriptions for nested resources
- Made the method badges clickable directly from the collapsed panel

0.27.0 - July 10, 2014
- Added a new public function `getDefaultConfig`

0.26.0 - July 10, 2014
- Render required and description of URI Parameters
- Made the output of URI params, form params, request body and response body consistent with each other

0.25.0 - July 9, 2014
- Added code highlighting to the Markdown parser

0.24.0 - July 7, 2014
- Added header examples

0.23.2 - July 7, 2014
- Fixed escape key not closing the modal

0.23.1 - June 29, 2014
- Fixed Markdown output for long sentences
- Added GitHub API example

0.23.0 - June 29, 2014
- Parse method descriptions in the main view with Markdown as well

0.22.1 - June 21, 2014
- Fixed error handling

0.22.0 - June 21, 2014
- Added headers to request and response information

0.21.0 - June 12, 2014
- Split all the raml parsing logic into its own [raml2obj project](https://github.com/kevinrenskers/raml2obj)

0.20.0 - June 4, 2014
- Fixed html output
- Added anchors to top level documentation chapters

0.19.0 - May 28, 2014
- External resources automatically switch between http and https links
- Attach the config object to the RAML object so it's accessible in your handlebars templates

0.18.0 - May 25, 2014
- Render the displayName property of resources
- Render formParameters

0.17.1 - May 14, 2014
- Bugfix: properly replace all non-word characters in resource with underscores (#20)

0.17.0 - May 14, 2014
- Support for command line arguments

0.16.0 - May 13, 2014
- Support loading source from file, string or buffer (#9)

0.15.1 - May 12, 2014
- Bugfix: hide padlock for unsecured methods when the default is secured (#16)

0.15.0 - May 12, 2014
- Show padlock for secured methods (#14)
- Bugfix: handle resource urls with periods (#15)

0.14.0 - May 6, 2014
- Better schema handling (#12)

0.13.0 - April 24, 2014
- Added syntax highlighting (#8)

0.12.0 - April 14, 2014
- Added UTF-8 meta tag (#7)

0.11.0 - April 9, 2014
- Render the description of query params with Markdown

0.10.0 - April 8, 2014
- New `parseWithConfig` method allowing you to override the templates (#5)

0.9.0 - April 8, 2014
- Allow raml2html to be used from another module

0.8.2 - April 7, 2014
- Showing all uri parameters, also those from parents

0.8.1 - April 7, 2014
- Code cleanup, added `allUriParameters` property to every resource

0.8.0 - April 5, 2014
- Improved rendering of query params: show required, enum and example

0.7.0 - March 28, 2014
- Render resource descriptions
- Render all descriptions as Markdown

0.6.0 - March 27, 2014
- Render the top level documentation as Markdown

0.5.0 - March 27, 2014
- Added navigation sidebar

0.4.0 - March 7, 2014
- Showing request and response per method

0.3.0 - March 6, 2014
- Cleaner color scheme

0.2.0 - March 5, 2014
- Improved HTML output

0.1.0 - March 5, 2014
- Initial release
