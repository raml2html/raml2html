/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/raml2html.js TAP raml2html with validation json errors > json output 1`] = `
Api contains errors.

[
  {
    "code": "INHERITING_UNKNOWN_TYPE",
    "message": "Inheriting from unknown type",
    "path": "traits/offset.raml",
    "range": {
      "start": {
        "line": 3,
        "column": 2,
        "position": 37
      },
      "end": {
        "line": 3,
        "column": 8,
        "position": 43
      }
    },
    "isWarning": false,
    "trace": [
      {
        "code": "ERROR_IN_INCLUDED_FILE",
        "message": "Error in the included file: Inheriting from unknown type",
        "path": "api.raml",
        "range": {
          "start": {
            "line": 5,
            "column": 2,
            "position": 35
          },
          "end": {
            "line": 5,
            "column": 8,
            "position": 41
          }
        },
        "isWarning": false
      }
    ]
  },
  {
    "code": "UNRECOGNIZED_ELEMENT",
    "message": "Unrecognized resource type: 'collection'.",
    "path": "api.raml",
    "range": {
      "start": {
        "line": 8,
        "column": 2,
        "position": 82
      },
      "end": {
        "line": 8,
        "column": 6,
        "position": 86
      }
    },
    "isWarning": false
  },
  {
    "code": "REQUIRED_PROPERTY_MISSING",
    "message": "Required property 'foobar' is missing",
    "path": "api.raml",
    "range": {
      "start": {
        "line": 21,
        "column": 12,
        "position": 290
      },
      "end": {
        "line": 21,
        "column": 19,
        "position": 297
      }
    },
    "isWarning": false
  },
  {
    "code": "UNKNOWN_PROPERTY",
    "message": "Unknown property: 'baz'",
    "path": "api.raml",
    "range": {
      "start": {
        "line": 22,
        "column": 14,
        "position": 313
      },
      "end": {
        "line": 22,
        "column": 17,
        "position": 316
      }
    },
    "isWarning": true
  },
  {
    "code": "INHERITING_UNKNOWN_TYPE",
    "message": "Inheriting from unknown type",
    "path": "traits/offset.raml",
    "range": {
      "start": {
        "line": 3,
        "column": 2,
        "position": 37
      },
      "end": {
        "line": 3,
        "column": 8,
        "position": 43
      }
    },
    "isWarning": false,
    "trace": [
      {
        "code": "INHERITING_UNKNOWN_TYPE",
        "message": "Inheriting from unknown type",
        "path": "api.raml",
        "range": {
          "start": {
            "line": 11,
            "column": 2,
            "position": 108
          },
          "end": {
            "line": 11,
            "column": 5,
            "position": 111
          }
        },
        "isWarning": false
      }
    ]
  }
]

`

exports[`test/raml2html.js TAP raml2html with validation json errors suppress warnings > without warnings json output 1`] = `
Api contains errors.

[
  {
    "code": "INHERITING_UNKNOWN_TYPE",
    "message": "Inheriting from unknown type",
    "path": "traits/offset.raml",
    "range": {
      "start": {
        "line": 3,
        "column": 2,
        "position": 37
      },
      "end": {
        "line": 3,
        "column": 8,
        "position": 43
      }
    },
    "isWarning": false,
    "trace": [
      {
        "code": "ERROR_IN_INCLUDED_FILE",
        "message": "Error in the included file: Inheriting from unknown type",
        "path": "api.raml",
        "range": {
          "start": {
            "line": 5,
            "column": 2,
            "position": 35
          },
          "end": {
            "line": 5,
            "column": 8,
            "position": 41
          }
        },
        "isWarning": false
      }
    ]
  },
  {
    "code": "UNRECOGNIZED_ELEMENT",
    "message": "Unrecognized resource type: 'collection'.",
    "path": "api.raml",
    "range": {
      "start": {
        "line": 8,
        "column": 2,
        "position": 82
      },
      "end": {
        "line": 8,
        "column": 6,
        "position": 86
      }
    },
    "isWarning": false
  },
  {
    "code": "REQUIRED_PROPERTY_MISSING",
    "message": "Required property 'foobar' is missing",
    "path": "api.raml",
    "range": {
      "start": {
        "line": 21,
        "column": 12,
        "position": 290
      },
      "end": {
        "line": 21,
        "column": 19,
        "position": 297
      }
    },
    "isWarning": false
  },
  {
    "code": "INHERITING_UNKNOWN_TYPE",
    "message": "Inheriting from unknown type",
    "path": "traits/offset.raml",
    "range": {
      "start": {
        "line": 3,
        "column": 2,
        "position": 37
      },
      "end": {
        "line": 3,
        "column": 8,
        "position": 43
      }
    },
    "isWarning": false,
    "trace": [
      {
        "code": "INHERITING_UNKNOWN_TYPE",
        "message": "Inheriting from unknown type",
        "path": "api.raml",
        "range": {
          "start": {
            "line": 11,
            "column": 2,
            "position": 108
          },
          "end": {
            "line": 11,
            "column": 5,
            "position": 111
          }
        },
        "isWarning": false
      }
    ]
  }
]

`

exports[`test/raml2html.js TAP raml2html with validation pretty print > pretty printed output 1`] = `
[41mApi contains errors.[49m

[31m[/test/fixtures/traits/offset.raml:3:2] INHERITING_UNKNOWN_TYPE: Inheriting from unknown type[39m
[31m[/test/fixtures/api.raml:8:2] UNRECOGNIZED_ELEMENT: Unrecognized resource type: 'collection'.[39m
[31m[/test/fixtures/api.raml:21:12] REQUIRED_PROPERTY_MISSING: Required property 'foobar' is missing[39m
[33m[/test/fixtures/api.raml:22:14] UNKNOWN_PROPERTY: Unknown property: 'baz'[39m
[31m[/test/fixtures/traits/offset.raml:3:2] INHERITING_UNKNOWN_TYPE: Inheriting from unknown type[39m

`

exports[`test/raml2html.js TAP raml2html with validation pretty print without warnings > pretty printed output 1`] = `
[41mApi contains errors.[49m

[31m[/test/fixtures/traits/offset.raml:3:2] INHERITING_UNKNOWN_TYPE: Inheriting from unknown type[39m
[31m[/test/fixtures/api.raml:8:2] UNRECOGNIZED_ELEMENT: Unrecognized resource type: 'collection'.[39m
[31m[/test/fixtures/api.raml:21:12] REQUIRED_PROPERTY_MISSING: Required property 'foobar' is missing[39m
[31m[/test/fixtures/traits/offset.raml:3:2] INHERITING_UNKNOWN_TYPE: Inheriting from unknown type[39m

`
