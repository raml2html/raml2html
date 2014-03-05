# RAML to HTML

A simple RAML to HTML parser written for Node.js.

To install the required dependancies run `npm install` first.

## Usage
```
node raml2html.js example.raml > example.html
```

## To do
This project is in a very early stage, with plenty left to do:

* Finish HTML output, currently there a lot missing (request, response, headers, etc)
* Better error checking, especially concerting argument parsing
* Make this into a proper command line script
* Publish to NPM

## Example output
![Example output](example.png)

## License
raml2html is available under the MIT license. See the LICENSE file for more info.