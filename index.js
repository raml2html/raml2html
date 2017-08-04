'use strict';

const raml2obj = require('raml2obj');
const pjson = require('./package.json');
const nunjucks = require('nunjucks');
const markdown = require('nunjucks-markdown');
const marked = require('marked');
const Minimize = require('minimize');
const path = require('path');
const fs = require('fs');

/**
 * Render the source RAML object using the config's processOutput function
 *
 * The config object should contain at least the following property:
 * processRamlObj: function that takes the raw RAML object and returns a promise with the rendered HTML
 *
 * @param {(String|Object)} source - The source RAML file. Can be a filename, url, or an already-parsed RAML object.
 * @param {Object} config
 * @param {Object} options
 * @param {Function} config.processRamlObj
 * @returns a promise
 */
function render(source, config, options) {
  config = config || {};
  config.raml2HtmlVersion = pjson.version;

  // Check if option is old boolean `validation` to keep backward compatibility
  if (typeof options === 'boolean') {
    options = {
      validate: options,
    };
  }

  if (options === undefined) {
    options = {
      validate: false,
    };
  }

  return raml2obj.parse(source, options.validate).then(ramlObj => {
    ramlObj.config = config;

    if (config.processRamlObj) {
      return config.processRamlObj(ramlObj, config, options).then(html => {
        if (config.postProcessHtml) {
          return config.postProcessHtml(html, config, options);
        }
        return html;
      });
    }

    return ramlObj;
  });
}

/**
 * @param {String} [mainTemplate] - The filename of the main template, leave empty to use default templates
 * @returns {{processRamlObj: Function, postProcessHtml: Function}}
 */
function getConfigForTemplate(mainTemplate) {
  const templatesPath = path.dirname(fs.realpathSync(mainTemplate));
  const templateFile = path.basename(fs.realpathSync(mainTemplate));

  return {
    processRamlObj(ramlObj, config, options) {
      const renderer = new marked.Renderer();
      renderer.table = function(thead, tbody) {
        // Render Bootstrap style tables
        return `<table class="table"><thead>${thead}</thead><tbody>${tbody}</tbody></table>`;
      };

      // Setup the Nunjucks environment with the markdown parser
      const env = nunjucks.configure(templatesPath, { autoescape: false });

      if (config.setupNunjucks) {
        config.setupNunjucks(env);
      }

      markdown.register(env, md => marked(md, { renderer }));

      ramlObj.isStandardType = function(type) {
        if (typeof type === 'object') {
          return false;
        }
        return type && type.indexOf('{') === -1 && type.indexOf('<') === -1;
      };

      // Render the main template using the raml object and fix the double quotes
      let html = env.render(templateFile, ramlObj);
      html = html.replace(/&quot;/g, '"');

      // Return the promise with the html
      return new Promise(resolve => {
        resolve(html);
      });
    },

    postProcessHtml(html, config, options) {
      if (options.pretty) {
        return html;
      } else {
        // Minimize the generated html and return the promise with the result
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
      }
    },
  };
}

/**
 * @param {String} [theme] - The name of a raml2html template, leave empty if you want to use the mainTemplate option
 * @param {Object} [programArguments] - An object containing all program aruments
 * @returns {{processRamlObj: Function, postProcessHtml: Function}}
 */
function getConfigForTheme(theme, programArguments) {
  if (!theme) {
    theme = 'raml2html-default-theme';
  }

  try {
    // See if the theme supplies its own config object (or function that creates this object), and return it
    const config = require(theme);

    // If it's a function then call it with the program arguments
    if (typeof config === 'function') {
      return config(programArguments);
    }

    // Otherwise we assume it's a config object (default behavior)
    return config;
  } catch (err) {
    // Nope, forward to getConfigForTemplate
    const templatesPath = path.dirname(
      require.resolve(`${theme}/package.json`)
    );
    return getConfigForTemplate(path.join(templatesPath, 'index.nunjucks'));
  }
}

module.exports = {
  getConfigForTemplate,
  getConfigForTheme,
  render,
};

if (require.main === module) {
  console.error(
    "This script is meant to be used as a library. You probably want to run bin/raml2html if you're looking for a CLI."
  );
  process.exit(1);
}
