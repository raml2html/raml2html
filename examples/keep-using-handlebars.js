#!/usr/bin/env node

/*
 * An example for if you want to keep using your raml2html v1.x handlebars templates
 */

var raml2html = require('..');
var handlebars = require('handlebars');
var marked = require('marked');
var renderer = new marked.Renderer();
var Q = require('q');
var fs = require('fs');
var pjson = require('../package.json');
var path = require('path');

renderer.table = function(thead, tbody) {
  return '<table class="table"><thead>' + thead + '</thead><tbody>' + tbody + '</tbody></table>';
};

function responseExists(context) {
  return (context.allUriParameters.length || context.queryParameters || context.headers || context.body);
}

function _markDownHelper(text) {
  if (text && text.length) {
    return new handlebars.SafeString(marked(text, { renderer: renderer }));
  }

  return '';
}

function _lockIconHelper(securedBy) {
  if (securedBy && securedBy.length) {
    var index = securedBy.indexOf(null);
    if (index !== -1) {
      securedBy.splice(index, 1);
    }

    if (securedBy.length) {
      return new handlebars.SafeString(' <span class="glyphicon glyphicon-lock" title="Authentication required"></span>');
    }
  }

  return '';
}

function _emptyResourceCheckHelper(options) {
  if (this.methods || (this.description && this.parentUrl)) {
    return options.fn(this);
  }
}

function _emptyRequestCheckHelper(options) {
  if (responseExists(this)) {
    return options.fn(this);
  }
}

function _missingRequestCheckHelper(options) {
  if (!responseExists(this)) {
    return options.fn(this);
  }
}

function _ifTypeIsString(options) {
  if (this.type && this.type === 'string') {
    return options.fn(this);
  }

  return options.inverse(this);
}

var helpers = {
  emptyResourceCheck: _emptyResourceCheckHelper,
  emptyRequestCheckHelper: _emptyRequestCheckHelper,
  missingRequestCheckHelper: _missingRequestCheckHelper,
  md: _markDownHelper,
  lock: _lockIconHelper,
  ifTypeIsString: _ifTypeIsString
};

var partials = {
  resource: fs.readFileSync(path.join(__dirname, 'resource.handlebars'), 'utf8'),
  item: fs.readFileSync(path.join(__dirname, 'item.handlebars'), 'utf8')
};

// Register handlebar helpers
helpers.forEac(function(helperName) {
  handlebars.registerHelper(helperName, helpers[helperName]);
});

// Register handlebar partials
partials.forEach(function(partialName) {
  handlebars.registerPartial(partialName, partials[partialName]);
});

var config = raml2html.getDefaultConfig();

config.processRamlObj = function(ramlObj) {
  var template = fs.readFileSync(path.join(__dirname, 'template.handlebars'), 'utf8');

  ramlObj.config = {
    protocol: 'https:',
    raml2HtmlVersion: pjson.version
  };

  return Q.fcall(function() {
    return handlebars.compile(template)(ramlObj);
  });
};

raml2html.render('example.raml', config).then(function(result) {
  console.log(result);
}, function(error) {
  console.log('error! ', error);
});
