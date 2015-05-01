var raml = {
  "title": "Example", "version": "1", "baseUri": "http://example.com/1", "documentation": [{
    "title": "Welcome",
    "content": "Welcome to the Example Documentation. The Example API allows you\nto do stuff. See also [example.com](https://www.example.com).\n\n```javascript\nvar raml2html = require('raml2html');\n\n// Using the default templates:\n// source can either be a filename, file contents (string) or parsed RAML object\nraml2html.parse(source, onSuccess, onError);\n\n// Using your own templates:\n// - config should be an object with at least an `template` property\n// - config can also include `helpers` and `partials`\n// - the config object will be accessible from your handlebars templates\nraml2html.parseWithConfig(source, config, onSuccess, onError);\n```\n",
    "uniqueId": "Welcome"
  }, {
    "title": "Chapter two", "content": "More content here. Including **bold** text!", "uniqueId": "Chapter-two"
  },
    {
      "title": "Welcome",
      "content": "Welcome to the Example Documentation. The Example API allows you\nto do stuff. See also [example.com](https://www.example.com).\n\n```javascript\nvar raml2html = require('raml2html');\n\n// Using the default templates:\n// source can either be a filename, file contents (string) or parsed RAML object\nraml2html.parse(source, onSuccess, onError);\n\n// Using your own templates:\n// - config should be an object with at least an `template` property\n// - config can also include `helpers` and `partials`\n// - the config object will be accessible from your handlebars templates\nraml2html.parseWithConfig(source, config, onSuccess, onError);\n```\n",
      "uniqueId": "Welcome"
    }, {
      "title": "Chapter two", "content": "More content here. Including **bold** text!", "uniqueId": "Chapter-two"
    },
    {
      "title": "Welcome",
      "content": "Welcome to the Example Documentation. The Example API allows you\nto do stuff. See also [example.com](https://www.example.com).\n\n```javascript\nvar raml2html = require('raml2html');\n\n// Using the default templates:\n// source can either be a filename, file contents (string) or parsed RAML object\nraml2html.parse(source, onSuccess, onError);\n\n// Using your own templates:\n// - config should be an object with at least an `template` property\n// - config can also include `helpers` and `partials`\n// - the config object will be accessible from your handlebars templates\nraml2html.parseWithConfig(source, config, onSuccess, onError);\n```\n",
      "uniqueId": "Welcome"
    }, {
      "title": "Chapter two", "content": "More content here. Including **bold** text!", "uniqueId": "Chapter-two"
    },
    {
      "title": "Welcome",
      "content": "Welcome to the Example Documentation. The Example API allows you\nto do stuff. See also [example.com](https://www.example.com).\n\n```javascript\nvar raml2html = require('raml2html');\n\n// Using the default templates:\n// source can either be a filename, file contents (string) or parsed RAML object\nraml2html.parse(source, onSuccess, onError);\n\n// Using your own templates:\n// - config should be an object with at least an `template` property\n// - config can also include `helpers` and `partials`\n// - the config object will be accessible from your handlebars templates\nraml2html.parseWithConfig(source, config, onSuccess, onError);\n```\n",
      "uniqueId": "Welcome"
    }, {
      "title": "Chapter two", "content": "More content here. Including **bold** text!", "uniqueId": "Chapter-two"
    },
    {
      "title": "Welcome",
      "content": "Welcome to the Example Documentation. The Example API allows you\nto do stuff. See also [example.com](https://www.example.com).\n\n```javascript\nvar raml2html = require('raml2html');\n\n// Using the default templates:\n// source can either be a filename, file contents (string) or parsed RAML object\nraml2html.parse(source, onSuccess, onError);\n\n// Using your own templates:\n// - config should be an object with at least an `template` property\n// - config can also include `helpers` and `partials`\n// - the config object will be accessible from your handlebars templates\nraml2html.parseWithConfig(source, config, onSuccess, onError);\n```\n",
      "uniqueId": "Welcome"
    }, {
      "title": "Chapter two", "content": "More content here. Including **bold** text!", "uniqueId": "Chapter-two"
    }], "securitySchemes": [{
    "oauth_1_0": {
      "description": "OAuth 1.0 continues to be supported for all API requests, but OAuth 2.0 is now preferred.",
      "type": "OAuth 1.0",
      "settings": {
        "requestTokenUri": "https://api.dropbox.com/1/oauth/request_token",
        "authorizationUri": "https://www.dropbox.com/1/oauth/authorize",
        "tokenCredentialsUri": "https://api.dropbox.com/1/oauth/access_token"
      }
    }
  }], "traits": [{
    "paged": {
      "queryParameters": {
        "page_size": {
          "description": "The number of items per page", "type": "number", "default": 20, "displayName": "page_size"
        }, "page": {"description": "The page to return", "type": "number", "default": 0, "displayName": "page"}
      }
    }
  }], "protocols": ["HTTP"], "resources": [{
    "displayName": "ACCOUNTS",
    "description": "This is the top level description for /account.\n* One\n* Two\n* Three\n",
    "relativeUri": "/account",
    "methods": [{
      "description": "Creates a new account. Some **bold** text here. More text. Need to fill the line, so make it longer still. Hooray!\nLine two\n\nParagraph two\n",
      "body": {"application/json": {"example": "{\n  \"email\": \"john@example.com\",\n  \"password\": \"super_secret\",\n  \"name\": \"John Doe\"\n}\n"}},
      "responses": {"200": {"description": "Account was created and user is now logged in"}},
      "protocols": ["HTTP"],
      "method": "post",
      "allUriParameters": []
    }],
    "resources": [{
      "relativeUri": "/find",
      "methods": [{
        "description": "find an account", "queryParameters": {
          "name": {
            "description": "name on account",
            "required": true,
            "example": "Naruto Uzumaki",
            "displayName": "name",
            "type": "string"
          },
          "gender": {"enum": ["male", "female"], "required": true, "displayName": "gender", "type": "string"},
          "number": {"type": "integer", "default": 42, "displayName": "number"}
        }, "method": "get", "allUriParameters": []
      }],
      "relativeUriPathSegments": ["find"],
      "parentUrl": "/account",
      "uniqueId": "account_find",
      "allUriParameters": []
    }, {
      "uriParameters": {
        "id": {
          "type": "string",
          "description": "account identifier",
          "minLength": 1,
          "maxLength": 10,
          "displayName": "id",
          "required": true
        }
      },
      "relativeUri": "/{id}",
      "methods": [{
        "headers": {
          "Authorization": {
            "type": "string",
            "description": "Basic authentication header",
            "example": "Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==\n",
            "displayName": "Authorization"
          }
        }, "method": "get", "allUriParameters": [{
          "type": "string",
          "description": "account identifier",
          "minLength": 1,
          "maxLength": 10,
          "displayName": "id",
          "required": true
        }]
      }, {
        "description": "Update the account", "body": {
          "application/x-www-form-urlencoded": {
            "formParameters": {
              "name": {
                "description": "name on account", "type": "string", "example": "Naruto Uzumaki", "displayName": "name"
              }, "gender": {"enum": ["male", "female"], "displayName": "gender", "type": "string"}
            }
          }
        }, "method": "put", "allUriParameters": [{
          "type": "string",
          "description": "account identifier",
          "minLength": 1,
          "maxLength": 10,
          "displayName": "id",
          "required": true
        }]
      }, {
        "description": "Delete the account", "method": "delete", "allUriParameters": [{
          "type": "string",
          "description": "account identifier",
          "minLength": 1,
          "maxLength": 10,
          "displayName": "id",
          "required": true
        }]
      }],
      "relativeUriPathSegments": ["{id}"],
      "parentUrl": "/account",
      "uniqueId": "account__id_",
      "allUriParameters": [{
        "type": "string",
        "description": "account identifier",
        "minLength": 1,
        "maxLength": 10,
        "displayName": "id",
        "required": true
      }]
    }, {
      "relativeUri": "/login",
      "methods": [{
        "description": "Login with email and password",
        "body": {"application/json": {"example": "{\n  \"email\": \"john@example.com\",\n  \"password\": \"super_secret\"\n}\n"}},
        "responses": {
          "200": {
            "description": "Login was correct", "body": {"text/xml": {"example": "<test>This is a test</test>\n"}}
          }, "400": {"description": "Login was incorrect, please try again"}, "401": {
            "description": "Not authorized", "headers": {
              "WWW-Authenticate": {
                "type": "string",
                "description": "user was not authorized",
                "example": "WWW-Authenticate: Basic realm=\"raml2html\"\n",
                "displayName": "WWW-Authenticate"
              }
            }
          }
        },
        "method": "post",
        "allUriParameters": []
      }],
      "relativeUriPathSegments": ["login"],
      "parentUrl": "/account",
      "uniqueId": "account_login",
      "allUriParameters": []
    }, {
      "relativeUri": "/forgot",
      "methods": [{
        "description": "Sends an email to the user with a link to set a new password", "responses": {
          "200": {
            "description": "Test", "body": {"text/xml": {"example": "<test>This is a test</test>\n"}}
          }
        }, "method": "post", "allUriParameters": []
      }],
      "relativeUriPathSegments": ["forgot"],
      "parentUrl": "/account",
      "uniqueId": "account_forgot",
      "allUriParameters": []
    }, {
      "relativeUri": "/session",
      "methods": [{
        "description": "Gets the sessions", "method": "get", "allUriParameters": []
      }, {"description": "Deletes the session, logging out the user", "method": "delete", "allUriParameters": []}],
      "relativeUriPathSegments": ["session"],
      "parentUrl": "/account",
      "uniqueId": "account_session",
      "allUriParameters": []
    }],
    "relativeUriPathSegments": ["account"],
    "parentUrl": "",
    "uniqueId": "account",
    "allUriParameters": []
  }, {
    "displayName": "Forecasts",
    "description": "The very top resource - displays OK",
    "relativeUri": "/forecasts",
    "resources": [{
      "description": "Overview endpoint to assemble and access forecast data in various timely resolutions - THIS IS NOT DISPLAYED ANYWHERE WITH RAML2HTML :/",
      "uriParameters": {
        "geoposition": {
          "description": "A geoposition aquired by calling /geoposition/search - displays OK",
          "type": "string",
          "displayName": "geoposition",
          "required": true
        }
      },
      "relativeUri": "/{geoposition}",
      "methods": [{
        "description": "Provides an overview of the available data - display OK",
        "method": "get",
        "allUriParameters": [{
          "description": "A geoposition aquired by calling /geoposition/search - displays OK",
          "type": "string",
          "displayName": "geoposition",
          "required": true
        }]
      }],
      "relativeUriPathSegments": ["{geoposition}"],
      "parentUrl": "/forecasts",
      "uniqueId": "forecasts__geoposition_",
      "allUriParameters": [{
        "description": "A geoposition aquired by calling /geoposition/search - displays OK",
        "type": "string",
        "displayName": "geoposition",
        "required": true
      }]
    }, {
      "description": "No methods here, but it does have a description",
      "relativeUri": "/test",
      "relativeUriPathSegments": ["test"],
      "parentUrl": "/forecasts",
      "uniqueId": "forecasts_test",
      "allUriParameters": []
    }],
    "relativeUriPathSegments": ["forecasts"],
    "parentUrl": "",
    "uniqueId": "forecasts",
    "allUriParameters": []
  }, {
    "description": "This is the top level description for /conversations.",
    "securedBy": ["oauth_1_0"],
    "relativeUri": "/conversations",
    "methods": [{
      "description": "Get a list of conversation for the current user",
      "protocols": ["HTTP"],
      "method": "get",
      "securedBy": ["oauth_1_0"],
      "allUriParameters": []
    }, {
      "description": "Create a new conversions. The currently logged in user doesn't need to be supplied in the members list, it's implied.",
      "body": {"application/json": {"example": "{\n  \"content\": \"My message!\",\n  \"members\": [1, 2, 3]\n}\n"}},
      "responses": {
        "200": {"description": "A conversation with these members already existed, the message was added to that one"},
        "201": {"description": "The conversation was created and the message added to it"}
      },
      "protocols": ["HTTP"],
      "method": "post",
      "securedBy": ["oauth_1_0"],
      "allUriParameters": []
    }],
    "resources": [{
      "relativeUri": "/{convId}",
      "methods": [{
        "description": "Get a single conversation including its messages",
        "method": "get",
        "allUriParameters": [{"type": "string", "required": true, "displayName": "convId"}]
      }, {
        "description": "Update a conversation (change members)",
        "method": "put",
        "allUriParameters": [{"type": "string", "required": true, "displayName": "convId"}]
      }],
      "resources": [{
        "relativeUri": "/messages",
        "methods": [{
          "queryParameters": {
            "page_size": {
              "description": "The number of items per page", "type": "number", "default": 20, "displayName": "page_size"
            }, "page": {"description": "The page to return", "type": "number", "default": 0, "displayName": "page"}
          },
          "is": ["paged"],
          "description": "Get the messages for the conversation",
          "method": "get",
          "allUriParameters": [{"type": "string", "required": true, "displayName": "convId"}]
        }, {
          "description": "Add a new message to a conversation",
          "method": "post",
          "allUriParameters": [{"type": "string", "required": true, "displayName": "convId"}]
        }],
        "resources": [{
          "relativeUri": "/{messageId}",
          "methods": [{
            "description": "Update the message",
            "method": "put",
            "allUriParameters": [{"type": "string", "required": true, "displayName": "convId"}, {
              "type": "string", "required": true, "displayName": "messageId"
            }]
          }, {
            "description": "Delete the message",
            "method": "delete",
            "allUriParameters": [{"type": "string", "required": true, "displayName": "convId"}, {
              "type": "string", "required": true, "displayName": "messageId"
            }]
          }],
          "relativeUriPathSegments": ["{messageId}"],
          "uriParameters": {"messageId": {"type": "string", "required": true, "displayName": "messageId"}},
          "parentUrl": "/conversations/{convId}/messages",
          "uniqueId": "conversations__convId__messages__messageId_",
          "allUriParameters": [{"type": "string", "required": true, "displayName": "convId"}, {
            "type": "string", "required": true, "displayName": "messageId"
          }]
        }],
        "relativeUriPathSegments": ["messages"],
        "parentUrl": "/conversations/{convId}",
        "uniqueId": "conversations__convId__messages",
        "allUriParameters": [{"type": "string", "required": true, "displayName": "convId"}]
      }],
      "relativeUriPathSegments": ["{convId}"],
      "uriParameters": {"convId": {"type": "string", "required": true, "displayName": "convId"}},
      "parentUrl": "/conversations",
      "uniqueId": "conversations__convId_",
      "allUriParameters": [{"type": "string", "required": true, "displayName": "convId"}]
    }],
    "relativeUriPathSegments": ["conversations"],
    "parentUrl": "",
    "uniqueId": "conversations",
    "allUriParameters": []
  }, {
    "relativeUri": "/users", "methods": [{
      "queryParameters": {
        "page_size": {
          "description": "The number of items per page", "type": "number", "default": 20, "displayName": "page_size"
        },
        "page": {"description": "The page to return", "type": "number", "default": 0, "displayName": "page"},
        "from": {
          "description": "Limit results to those created after from.",
          "example": "2014-12-31T00:00:00.000Z",
          "type": "string",
          "required": false,
          "pattern": "^[a-zA-Z].+$",
          "displayName": "from"
        }
      },
      "is": ["paged"],
      "description": "Get a list of all users",
      "protocols": ["HTTP"],
      "method": "get",
      "allUriParameters": []
    }, {
      "description": "Creates a new user",
      "body": {"application/json": {"example": "{\n  \"email\": \"john@example.com\",\n  \"name\": \"John Doe\",\n}\n"}},
      "protocols": ["HTTP"],
      "method": "post",
      "allUriParameters": []
    }], "resources": [{
      "relativeUri": "/{userId}",
      "methods": [{
        "description": "Get the details of a user including a list of groups he belongs to",
        "method": "get",
        "allUriParameters": [{"type": "string", "required": true, "displayName": "userId"}]
      }, {
        "description": "Update a user",
        "method": "put",
        "allUriParameters": [{"type": "string", "required": true, "displayName": "userId"}]
      }, {
        "description": "Deletes a user",
        "method": "delete",
        "allUriParameters": [{"type": "string", "required": true, "displayName": "userId"}]
      }],
      "relativeUriPathSegments": ["{userId}"],
      "uriParameters": {"userId": {"type": "string", "required": true, "displayName": "userId"}},
      "parentUrl": "/users",
      "uniqueId": "users__userId_",
      "allUriParameters": [{"type": "string", "required": true, "displayName": "userId"}]
    }], "relativeUriPathSegments": ["users"], "parentUrl": "", "uniqueId": "users", "allUriParameters": []
  }, {
    "relativeUri": "/groups", "methods": [{
      "description": "Get a list of all the groups", "protocols": ["HTTP"], "method": "get", "allUriParameters": []
    }, {
      "description": "Create a new group",
      "body": {"application/json": {"example": "{\n  \"name\": \"Cool people\",\n  \"members\": [1, 2, 3]\n}\n"}},
      "protocols": ["HTTP"],
      "method": "post",
      "allUriParameters": []
    }], "resources": [{
      "relativeUri": "/{groupId}",
      "methods": [{
        "description": "Get the details of a group, including the member list",
        "method": "get",
        "allUriParameters": [{"type": "string", "required": true, "displayName": "groupId"}]
      }, {
        "description": "Update the group, **optionally** supplying the new list of members (overwrites current list)",
        "body": {"application/json": {"example": "{\n  \"name\": \"Cool people\",\n  \"members\": [1, 2, 3]\n}\n"}},
        "method": "put",
        "allUriParameters": [{"type": "string", "required": true, "displayName": "groupId"}]
      }, {
        "description": "Removes the group",
        "method": "delete",
        "allUriParameters": [{"type": "string", "required": true, "displayName": "groupId"}]
      }],
      "resources": [{
        "relativeUri": "/users",
        "methods": [{
          "description": "Adds a user to a group",
          "body": {"application/json": {"example": "{\n  \"user_id\": 4,\n}\n"}},
          "method": "post",
          "allUriParameters": [{"type": "string", "required": true, "displayName": "groupId"}]
        }],
        "resources": [{
          "relativeUri": "/{userId}",
          "methods": [{
            "description": "Removes a user from a group",
            "method": "delete",
            "allUriParameters": [{"type": "string", "required": true, "displayName": "groupId"}, {
              "type": "string", "required": true, "displayName": "userId"
            }]
          }],
          "relativeUriPathSegments": ["{userId}"],
          "uriParameters": {"userId": {"type": "string", "required": true, "displayName": "userId"}},
          "parentUrl": "/groups/{groupId}/users",
          "uniqueId": "groups__groupId__users__userId_",
          "allUriParameters": [{"type": "string", "required": true, "displayName": "groupId"}, {
            "type": "string", "required": true, "displayName": "userId"
          }]
        }],
        "relativeUriPathSegments": ["users"],
        "parentUrl": "/groups/{groupId}",
        "uniqueId": "groups__groupId__users",
        "allUriParameters": [{"type": "string", "required": true, "displayName": "groupId"}]
      }],
      "relativeUriPathSegments": ["{groupId}"],
      "uriParameters": {"groupId": {"type": "string", "required": true, "displayName": "groupId"}},
      "parentUrl": "/groups",
      "uniqueId": "groups__groupId_",
      "allUriParameters": [{"type": "string", "required": true, "displayName": "groupId"}]
    }], "relativeUriPathSegments": ["groups"], "parentUrl": "", "uniqueId": "groups", "allUriParameters": []
  }], "baseUriParameters": {
    "version": {
      "type": "string", "required": true, "displayName": "version", "enum": ["1"]
    }
  }, "config": {
    "raml2HtmlVersion": "2.0.0"
  }
}
