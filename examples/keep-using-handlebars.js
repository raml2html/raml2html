#!/usr/bin/env node

'use strict';

/*
 * An example for if you want to keep using your raml2html v1.x handlebars templates
 */

const raml2html = require('..');
const handlebars = require('handlebars');
const marked = require('marked');
const renderer = new marked.Renderer();
const fs = require('fs');
const pjson = require('../package.json');
const path = require('path');

renderer.table = function (thead, tbody) {
  return `<table class="table"><thead>${thead}</thead><tbody>${tbody}</tbody></table>`;
};

function responseExists(context) {
  return (context.allUriParameters.length || context.queryParameters || context.headers || context.body);
}

function _markDownHelper(text) {
  if (text && text.length) {
    return new handlebars.SafeString(marked(text, { renderer }));
  }

  return '';
}

function _lockIconHelper(securedBy) {
  if (securedBy && securedBy.length) {
    const index = securedBy.indexOf(null);
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
  return false;
}

function _emptyRequestCheckHelper(options) {
  if (responseExists(this)) {
    return options.fn(this);
  }
  return false;
}

function _missingRequestCheckHelper(options) {
  if (!responseExists(this)) {
    return options.fn(this);
  }
  return false;
}

function _ifTypeIsString(options) {
  if (this.type && this.type === 'string') {
    return options.fn(this);
  }

  return options.inverse(this);
}

const helpers = {
  emptyResourceCheck: _emptyResourceCheckHelper,
  emptyRequestCheckHelper: _emptyRequestCheckHelper,
  missingRequestCheckHelper: _missingRequestCheckHelper,
  md: _markDownHelper,
  lock: _lockIconHelper,
  ifTypeIsString: _ifTypeIsString,
};

const partials = {
  resource: fs.readFileSync(path.join(__dirname, 'resource.handlebars'), 'utf8'),
  item: fs.readFileSync(path.join(__dirname, 'item.handlebars'), 'utf8'),
};

// Register handlebar helpers
helpers.forEach((helperName) => {
  handlebars.registerHelper(helperName, helpers[helperName]);
});

// Register handlebar partials
partials.forEach((partialName) => {
  handlebars.registerPartial(partialName, partials[partialName]);
});

const config = raml2html.getDefaultConfig();

config.processRamlObj = function (ramlObj) {
  const template = fs.readFileSync(path.join(__dirname, 'template.handlebars'), 'utf8');

  ramlObj.config = {
    protocol: 'https:',
    raml2HtmlVersion: pjson.version,
  };

  return new Promise((resolve) => {
    resolve(handlebars.compile(template)(ramlObj));
  });
};

raml2html.render('example.raml', config).then((result) => {
  console.log(result);
}, (error) => {
  console.log('error! ', error);
});
