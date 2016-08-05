'use strict';

const raml2obj = require('raml2obj');
const pjson = require('./package.json');
const yaml = require('js-yaml');

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
      const env = nunjucks.configure(templatesPath, { watch: false });
      markdown.register(env, (md) => marked(md, { renderer }));

      // Add extra function for finding a security scheme by name
      ramlObj.securitySchemeWithName = function (name) {
        for (var index = 0; index < ramlObj.securitySchemes.length; ++index) {
          if (ramlObj.securitySchemes[index][name]) {
            return ramlObj.securitySchemes[index][name];
          }
        }
      };

      /**
       * Get the root type of a type.
       * This is one of the types:
       * Object: 'Object'
       * Scalars: 'string', 'number', 'integer', 'boolean', 'date', 'file', 'scalar'
       */
      ramlObj.getRootType = function (type) {
        // in 0.8 the type node was not an array, that changed in 1.0
        if( typeof type.type === 'string' ) {
          type.type = [ type.type ];
        }

        if (type.type.length > 1) {
          // Multiple inheritence is only supported for object types.
          return 'object';
        }

        if(ramlObj.types) {
          var parent = type.type[0];
          for (var index = 0; index < ramlObj.types.length; ++index) {
            if (typeof ramlObj.types[index][parent] !== 'undefined') {
              return ramlObj.getRootType(ramlObj.types[index][parent]);
            }
          }
        }

        return type.type[0];
      };

      /**
       * Check if a type has a parent to inherit from.
       *
       * @param {string[]} [type] - The type name.
       * @return {boolean} - false if the type name is a build-in scalar type, true otherwise.
       */
      ramlObj.isChildType = function (type) {
        var buildinTypes = ['string', 'number', 'integer', 'boolean', 'date', 'file', 'scalar'];
        for (var i = 0; i < type.length; i++) {
          if (buildinTypes.indexOf(type[i]) < 0) {
            return true;
          }
        }
        return false;
      };

      // Add extra function for finding a type by name
      var typeWithName = function (name) {
        var nameStr = String(name);
        if (nameStr.endsWith('[]')) {
          name = nameStr.slice(0, -2);
        }
        if(ramlObj.types) {
          for (var index = 0; index < ramlObj.types.length; ++index) {
            if (typeof ramlObj.types[index][name] !== 'undefined') {
              return ramlObj.types[index][name];
            }
          }
        }
      };

      /**
       * Add extra function for finding the properties of a type recursively.
       *
       * @param {Object} [type] - The type object with all it's properties.
       * @param {String} [rootType] - Optional, type that will overwrite the type of the returned object.
       * @returns {{ properties: {}, ...}} A type representation with all its properties.
       */
      ramlObj.propertiesOfType = function (type, rootType) {
        var properties = JSON.parse(JSON.stringify(type));
        properties.properties = {};

        for (var property in type.properties) {
          if (type.properties.hasOwnProperty(property)) {
            properties.properties[property] = type.properties[property];
          }
        }

        var availableProperties = [
          'pattern', 'minLength', 'maxLength', 'minimum', 'maximum',
          'format', 'multipleOf', 'fileTypes',
        ];

        for (var i = 0; i < availableProperties.length; ++i) {
          if (typeof type[availableProperties[i]] !== 'undefined') {
            properties[availableProperties[i]] = type[availableProperties[i]];
          }
        }

        for (var index = 0; index < type.type.length; ++index) {
          var parent = typeWithName(type.type[index]);
          if (typeof parent !== 'undefined') {
            var parentProperties = ramlObj.propertiesOfType(parent);
            for (var parentProperty in parentProperties.properties) {
              if (parentProperties.properties.hasOwnProperty(parentProperty)) {
                properties.properties[parentProperty] = parentProperties.properties[parentProperty];
              }
            }

            for (var index2 = 0; index2 < availableProperties.length; ++index2) {
              if (typeof parentProperties[availableProperties[index2]] !== 'undefined') {
                if (typeof properties[availableProperties[index2]] === 'undefined') {
                  properties[availableProperties[index2]] = parentProperties[availableProperties[index2]];
                }
              }
            }
          }
        }

        if (typeof rootType !== 'undefined') {
          properties.type = rootType;
        }

        return properties;
      };

      ramlObj.isArray = function (value) {
        return Array.isArray(value);
      };

      ramlObj.stringify = function (value, mediaType) {
        if (typeof value === 'object') {
          switch (mediaType) {
            case 'application/json':
              return JSON.stringify(value, null, 2);
            case 'application/x-yaml':
            default:
              return yaml.dump(value);
          }
        }

        return value;
      };

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
