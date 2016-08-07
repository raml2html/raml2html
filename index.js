'use strict';

const raml2obj = require('raml2obj');
const pjson = require('./package.json');

/**
 * Render the source RAML object using the config's processOutput function
 *
 * The config object should contain at least the following property:
 * processRamlObj: function that takes the raw RAML object and returns a promise with the rendered HTML
 *
 * @param {(String|Object)} source - The source RAML file. Can be a filename, url, contents of the RAML file,
 * or an already-parsed RAML object.
 * @param {Object} config
 * @param {Function} config.processRamlObj
 * @returns a promise
 */
function render(source, config) {
  config = config || {};
  config.raml2HtmlVersion = pjson.version;

  return raml2obj.parse(source).then((ramlObj) => {
    ramlObj.config = config;

    if (config.processRamlObj) {
      return config.processRamlObj(ramlObj).then((html) => {
        if (config.postProcessHtml) {
          return config.postProcessHtml(html);
        }
        return html;
      });
    }

    return ramlObj;
  });
}

/**
 * @param {String} [mainTemplate] - The filename of the main template, leave empty to use default templates
 * @param {String} [templatesPath] - Optional, by default it uses the current working directory
 * @returns {{processRamlObj: Function, postProcessHtml: Function}}
 */
function getDefaultConfig(mainTemplate, templatesPath) {
  if (!mainTemplate) {
    mainTemplate = './lib/template.nunjucks';

    // When using the default template, make sure that Nunjucks isn't
    // using the working directory since that might be anything
    templatesPath = __dirname;
  }

  return {
    processRamlObj(ramlObj) {
      const nunjucks = require('nunjucks');
      const markdown = require('nunjucks-markdown');
      const marked = require('marked');
      const ramljsonexpander = require('raml-jsonschema-expander');
      const renderer = new marked.Renderer();
      renderer.table = function (thead, tbody) {
        // Render Bootstrap style tables
        return `<table class="table"><thead>${thead}</thead><tbody>${tbody}</tbody></table>`;
      };

      // Setup the Nunjucks environment with the markdown parser
      const env = nunjucks.configure(templatesPath, { autoescape: false });
      markdown.register(env, (md) => marked(md, { renderer }));

      // Parse securedBy and use scopes if they are defined
      ramlObj.renderSecuredBy = function (securedBy) {
        let out = '';
        if (typeof securedBy === 'object') {
          Object.keys(securedBy).forEach((key) => {
            out += `<b>${key}</b>`;

            if (securedBy[key].scopes.length) {
              out += ' with scopes:<ul>';

              securedBy[key].scopes.forEach((scope) => {
                out += `<li>${scope}</li>`;
              });

              out += '</ul>';
            }
          });
        } else {
          out = `<b>${securedBy}</b>`;
        }
        return out;
      };

      // Find and replace the $ref parameters.
      ramlObj = ramljsonexpander.expandJsonSchemas(ramlObj);

      // Render the main template using the raml object and fix the double quotes
      let html = env.render(mainTemplate, ramlObj);
      html = html.replace(/&quot;/g, '"');

      // Return the promise with the html
      return new Promise((resolve) => {
        resolve(html);
      });
    },

    postProcessHtml(html) {
      // Minimize the generated html and return the promise with the result
      const Minimize = require('minimize');
      const minimize = new Minimize({ quotes: true });

      return new Promise((resolve, reject) => {
        minimize.parse(html, (error, result) => {
          if (error) {
            reject(new Error(error));
          } else {
            resolve(result);
          }
        });
      });
    },
  };
}

module.exports = {
  getDefaultConfig,
  render,
};

if (require.main === module) {
  console.log('This script is meant to be used as a library. You probably want to run bin/raml2html if you\'re looking for a CLI.');
  process.exit(1);
}
