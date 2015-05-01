angular.module('app', ['ui.router', 'ngSanitize']);

angular.module('app').config(function($urlRouterProvider, $stateProvider) {
  'use strict';

  $urlRouterProvider.when('', '/');

  $stateProvider.state('root', {
    abstract: true,
    templateUrl: 'root.html',
    resolve: {
      raml: function() {
        return window.raml;
      }
    },
    controllerAs: 'ctrl',
    controller: function(raml) {
      this.raml = raml;
    }
  });

  $stateProvider.state('root.documentation', {
    url: '/',
    templateUrl: 'documentation.html',
    resolve: {
      documentation: function(raml) {
        return raml.documentation;
      }
    },
    controllerAs: 'ctrl',
    controller: function(documentation) {
      this.documentation = documentation;
    }
  });

  function _findAllResources(list, resource) {
    if (resource.resources) {
      resource.resources.forEach(function(r) {
        var rCopy = angular.copy(r);
        delete rCopy.resources;
        list.push(rCopy);

        _findAllResources(list, r);
      });
    }

    return list;
  }

  $stateProvider.state('root.rootresource', {
    url: '/:rootResourceId',
    templateUrl: 'rootresource.html',
    resolve: {
      rootResource: function(raml, $stateParams) {
        var result = raml.resources.filter(function(resource) {
          return resource.uniqueId === $stateParams.rootResourceId;
        });

        return result.length ? result[0] : false;
      },
      allResources: function(rootResource) {
        return _findAllResources([rootResource], rootResource);
      }
    },
    controllerAs: 'ctrl',
    controller: function(allResources) {
      this.resources = allResources;

      this.sref = function(r) {
        if (r.methods && r.methods.length) {
          console.log(r.methods[0].method);
          return 'root.rootresource.resource.method({resourceId: "' + r.uniqueId + '", method: "' + r.methods[0].method + '"})';
        } else {
          return 'root.rootresource.resource({resourceId: "' + r.uniqueId + '"})';
        }
      }
    }
  });

  $stateProvider.state('root.rootresource.resource', {
    url: '/:resourceId',
    templateUrl: 'resource.html',
    resolve: {
      resource: function(allResources, $stateParams) {
        var result = allResources.filter(function(resource) {
          return resource.uniqueId === $stateParams.resourceId;
        });

        return result.length ? result[0] : false;
      }
    },
    controllerAs: 'ctrl',
    controller: function(resource) {
      this.resource = resource;
    }
  });

  $stateProvider.state('root.rootresource.resource.method', {
    url: '/:method',
    templateUrl: 'method.html',
    resolve: {
      method: function(resource, $stateParams) {
        var result = resource.methods.filter(function(method) {
          return method.method === $stateParams.method;
        });

        return result.length ? result[0] : false;
      }
    },
    controllerAs: 'ctrl',
    controller: function(resource, method) {
      this.resource = resource;
      this.method = method;
    }
  });
});

angular.module('app').directive('markdown', function($sanitize) {
  return {
    restrict: 'AE',
    link: function(scope, element, attrs) {
      if (attrs.markdown) {
        scope.$watch(attrs.markdown, function(newVal) {
          var html = newVal ? $sanitize(marked(newVal)) : '';
          element.html(html);
        });
      } else {
        var html = $sanitize(marked(element.text()));
        element.html(html);
      }
    }
  };
});

angular.module('app').run(function($rootScope) {
  'use strict';

  $rootScope.$on('$stateChangeError', function(error) {
    console.log('$stateChangeError', error);
  });
});
