0.21.0 - June 12, 2014
- Split all the raml parsing logic into its own raml2obj project

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
- Bugfix: Handle resource urls with periods (#15)

0.14.0 - May 6, 2014
- Better schema handling (#12)

0.13.0 - April 24, 2014
- Added syntax highlighting (#8)

0.12.0 - April 14, 2014
- Added UTF-8 meta tag (#7)

0.11.0 - April 9, 2014
- Render the description of query params with Markdown

0.10.0 - April 8, 2014
- New parseWithConfig method allowing you to override the templates (#5)

0.9.0 - April 8, 2014
- Allow raml2html to be used pragmatically from another module

0.8.2 - April 7, 2014
- Showing all uri parameters, also those from parents

0.8.1 - April 7, 2014
- Code cleanup, added allUriParameters property to every resource

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
