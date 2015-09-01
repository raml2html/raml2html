var raml2obj = require('raml2obj');
var pjson = require('./package.json');
var Q = require('q');

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

  return raml2obj.parse(source).then(function(ramlObj) {
    ramlObj.config = config;

    if (config.processRamlObj) {
      return config.processRamlObj(ramlObj).then(function(html) {
        if (config.postProcessHtml) {
          return config.postProcessHtml(html);
        }

        return html;
      });
    }

    return ramlObj;
  });
}

function _traverse(ramlObj) {
    for (var index in ramlObj.resources) {
  	  if (ramlObj.resources.hasOwnProperty(index)) {
  	      var resource = ramlObj.resources[index];
	      // indicate if the resource was marked as vision
  	      if (resource.is) {
  	    	  for (var iskey in resource.is) {
  	    		  if (resource.is[iskey].hasOwnProperty("VISION")) {
  	    			  resource.vision = true;
  	    		  }
  	    	  }
  	      }
  	      if (resource.methods) {
  	    	// mark methods as vision
  	        for (var methodkey in resource.methods) {
  	  	      if (resource.methods[methodkey].is) {
  	  	    	  for (var iskey in resource.methods[methodkey].is) {
  	  	    		  if (resource.methods[methodkey].is[iskey].hasOwnProperty("VISION")) {
  	  	    			  resource.methods[methodkey].vision = true;
  	  	    		  }
  	  	    	  }
  	  	      }
  	        }

  	    	// mark resource as vision if all methods are vision AND resource was not marked as vision
  	        if (!resource.vision) {
  	        	resource.vision = true; // set resource.vision to true
	  	        for (var methodkey in resource.methods) {
	  	        	if (!resource.methods[methodkey].vision){
	  	    		  resource.vision = false; // set resource.vision to false if we find at least one method, which is not vision
	  	        	}
	  	        }
  	        }
  	      }
  	      _traverse(resource);
  	  }
    }
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
    processRamlObj: function(ramlObj) {
      var nunjucks = require('nunjucks');
      var markdown = require('nunjucks-markdown');
      var marked = require('marked');
      var renderer = new marked.Renderer();
      renderer.table = function(thead, tbody) {
        // Render Bootstrap style tables
        return '<table class="table"><thead>' + thead + '</thead><tbody>' + tbody + '</tbody></table>';
      };

      // Setup the Nunjucks environment with the markdown parser
      var env = nunjucks.configure(templatesPath, {watch: false});
      markdown.register(env, function(md) {
        return marked(md, {renderer: renderer});
      });

      // Add extra function for finding a security scheme by name
      ramlObj.securitySchemeWithName = function(name) {
        return ramlObj.securitySchemes[0][name];
      };

      _traverse(ramlObj);
      
      // Render the main template using the raml object and fix the double quotes
      var html = env.render(mainTemplate, ramlObj);
      html = html.replace(/&quot;/g, '"');

      // Return the promise with the html
      return Q.fcall(function() {
        return html;
      });
    },

    postProcessHtml: function(html) {
      // Minimize the generated html and return the promise with the result
      var Minimize = require('minimize');
      var minimize = new Minimize({quotes: true});

      var deferred = Q.defer();

      minimize.parse(html, function(error, result) {
        if (error) {
          deferred.reject(new Error(error));
        } else {
          deferred.resolve(result);
        }
      });

      return deferred.promise;
    }
  };
}

module.exports = {
  getDefaultConfig: getDefaultConfig,
  render: render
};

if (require.main === module) {
  console.log('This script is meant to be used as a library. You probably want to run bin/raml2html if you\'re looking for a CLI.');
  process.exit(1);
}
