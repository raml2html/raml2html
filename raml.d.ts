// TODO: http://raml.org/spec.html#named-parameters-with-multiple-types
//       how is this surface on the parser?

// TODO: this is where we left off in the spec doc:
//       http://raml.org/spec.html#resource-types-and-traits


/**
 *
 */ 
declare type MarkdownString = string

/**
 * One of HTTP, HTTPS
 */
declare type Protocol = string

/**
 * One of the following YAML media types:
 * - text/yaml
 * - text/x-yaml
 * - application/yaml
 * - application/x-yaml
 * 
 * Any type from the list of IANA MIME Media Types, http://www.iana.org/assignments/media-types
 * A custom type that conforms to the regular expression, "application\/[A-Za-z.-0-1]*+?(json|xml)"
 * 
 */
declare type MediaType = string



declare type SchemaDefinition = string

/**
 * Regular expressions MUST follow the regular expression specification from ECMA 262/Perl 5.
 */
declare type RegexPattern = string

/**
 * A valid HTTP method name in lowercase ( "put", "get", ... )
 */
declare type HTTPMethodName = string



/**
 * One of:
 * 
 * - OAuth 1.0
 * - OAuth 2.0
 * - Basic Authentication
 * - Digest Authentication
 * - x-{other}
 * 
 * @see http://raml.org/spec.html#type-1
 */
declare type SecuritySchemeType = string



interface Api {

    // TODO: what do we do with required types?
    //       is the JS parser failing when such properties are missing?
    /**
     *
     * (Required) The title property is a short plain text description of the RESTful API.
     * The title property's value SHOULD be suitable for use as a title for the contained user documentation.
     *
     * @see http://raml.org/spec.html#api-title
     */
    title:                   string

    /**
     * (Optional) If the RAML API definition is targeted to a specific API version, the API definition MUST contain a version property. The version property is OPTIONAL and should not be used if:
     *
     * The API itself is not versioned.
     * The API definition does not change between versions. The API architect can decide whether a change to user documentation elements, but no change to the API's resources, constitutes a version change.
     * The API architect MAY use any versioning scheme so long as version numbers retain the same format. For example, "v3", "v3.0", and "V3" are all allowed, but are not considered to be equal.
     */
    version?:                string

    /**
     *
     * @see http://raml.org/spec.html#base-uri-and-baseuriparameters
     */
    baseUri?:                string

    /**
     * @see http://raml.org/spec.html#base-uri-and-baseuriparameters
     */
    baseUriParameters?:      NamedParameterMap

    /**
     * (Optional) A RESTful API can be reached HTTP, HTTPS, or both.
     * The protocols property MAY be used to specify the protocols that an API supports.
     * If the protocols property is not specified, the protocol specified at the baseUri property is used.
     * The protocols property MUST be an array of strings, of values "HTTP" and/or "HTTPS".
     *
     * @see http://raml.org/spec.html#protocols
     */
    protocols?:              Protocol[]

    /**
     * (Optional) The media types returned by API responses, and expected from API requests that accept a body,
     * MAY be defaulted by specifying the mediaType property.
     * This property is specified at the root level of the API definition.
     * The property's value MAY be a single string with a valid media type
     *
     * @see http://raml.org/spec.html#default-media-type
     */
    mediaType?:              MediaType

    /**
     * (Optional) To better achieve consistency and simplicity,
     * the API definition SHOULD include an OPTIONAL schemas property in the root section.
     * The schemas property specifies collections of schemas that could be used anywhere in the API definition.
     * The value of the schemas property is an array of maps; in each map, the keys are the schema name,
     * and the values are schema definitions.
     *
     * @see http://raml.org/spec.html#schemas
     */
    schemas?:                {[ schemaName: string ]: SchemaDefinition }[]

    // TODO: verify on JS parser output
    /**
     *
     * (Optional) In addition to the reserved URI parameters described in the baseUri property section,
     * a Level 1 Template URI can feature custom URI parameters, which are useful in a variety of scenarios.
     * For example, let's look at the following API provider that parameterizes the base URI with customer
     * information such as the company name.
     *
     * @see http://raml.org/spec.html#uri-parameters
     */
    uriParameters?:          NamedParameterMap

    /**
     * (Optional) The API definition can include a variety of documents that serve as a user guides
     * and reference documentation for the API. Such documents can clarify how the API works
     * or provide business context.
     *
     * @see http://raml.org/spec.html#user-documentation
     */
    documentation?:          DocumentationItem[]

    /**
     * @see http://raml.org/spec.html#resources-and-nested-resources
     */
    resources?:              Resource[]

    /**
     *
     * @see http://raml.org/spec.html#resource-types-and-traits
     */
    resourceTypes?:          {[ resourceTypeName: string ]: ResourceType }[]

    securitySchemes?:        {[ securitySchemeName: string ]: SecurityScheme }[]

    traits?:                 {[ traitName: string ]: Trait }[]

    securedBy?:              string[]
}

interface Resource {


    relativeUri:             string
    relativeUriPathSegments: string[]// required?

    /**
     * The displayName attribute provides a friendly name to the resource and can be used by documentation generation tools.
     * The displayName key is OPTIONAL.
     *
     * If the displayName attribute is not defined for a resource,
     * documentation tools SHOULD refer to the resource by its property key (i.e. its relative URI, e.g., "/jobs"),
     * which acts as the resource's name.
     *
     * @see http://raml.org/spec.html#display-name
     */
    displayName?:            string

    /**
     * Each resource, whether top-level or nested, MAY contain a description property that briefly describes the resource.
     * It is RECOMMENDED that all the API definition's resources includes the description property.
     *
     * @see http://raml.org/spec.html#description-1
     */
    description?:            MarkdownString
    
    is?:                     string | Trait

    /**
     *
     * In a RESTful API, methods are operations that are performed on a resource.
     * A method MUST be one of the HTTP methods defined
     * in the HTTP version 1.1 specification [RFC2616] and its extension, RFC5789 [RFC5789].
     *
     * @see http://raml.org/spec.html#methods
     */
    methods?:                Method[]
    
    type?:                   string | ResourceType

    /**
     * @see http://raml.org/spec.html#template-uris-and-uri-parameters
     */
    uriParameters?:          NamedParameterMap

    /**
     *
     * A resource or a method can override a base URI template's values.
     * This is useful to restrict or change the default or parameter selection in the base URI.
     * The baseUriParameters property MAY be used to override any or all parameters
     * defined at the root level baseUriParameters property,
     * as well as base URI parameters not specified at the root level.
     *
     * @see http://raml.org/spec.html#base-uri-parameters
     */
    baseUriParameters?:      NamedParameterMap
    
    resources?:              Resource[]
    
    securedBy?:              string
}

/**
 *
 * In a RESTful API, methods are operations that are performed on a resource.
 * A method MUST be one of the HTTP methods defined in the HTTP version 1.1 specification [RFC2616]
 * and its extension, RFC5789 [RFC5789].
 *
 * @see http://raml.org/spec.html#methods
 */
interface Method {
    /**
     * The HTTP verb corresponding to this method
     */
    method:                 HTTPMethodName

    /**
     *
     * Each declared method MAY contain a description attribute that briefly describes
     * what the method does to the resource.
     * It is RECOMMENDED that all API definition methods include the description property.
     *
     * The value of the description property MAY be formatted using Markdown [MARKDOWN].
     *
     * @see http://raml.org/spec.html#description-2
     */
    description?:           MarkdownString

    /**
     * A method can override an API's protocols value for that single method by setting a different value for the fields.
     *
     * @see http://raml.org/spec.html#protocols-1
     */
    protocols?:             Protocol[]

    /**
     *
     * An API's resources MAY be filtered (to return a subset of results)
     * or altered (such as transforming a response body from JSON to XML format)
     * by the use of query strings.
     *
     * If the resource or its method supports a query string, the query string
     * MUST be defined by the queryParameters property.
     *
     * @see http://raml.org/spec.html#query-strings
     */
    queryParameters?:       NamedParameterMap

    /**
     *
     * Resource methods MAY have one or more responses.
     * Responses MAY be described using the description property, and MAY include example attributes or schema properties.
     *
     * @see http://raml.org/spec.html#responses
     */
    responses?:             Responses
    securedBy?:             string

    /**
     *
     * Some method verbs expect the resource to be sent as a request body.
     * For example, to create a resource, the request must include the details of the resource to create.
     *
     * Resources CAN have alternate representations.
     * For example, an API might support both JSON and XML representations.
     *
     * If the API's media type is either application/x-www-form-urlencoded or multipart/form-data,
     * the formParameters property MUST specify the name-value pairs that the API is expecting.
     *
     * @see http://raml.org/spec.html#body
     */
    body?:                   Bodies

    /**
     *
     * An API's methods MAY support or require non-standard HTTP headers.
     * In the API definition, specify the non-standard HTTP headers by using the headers property.
     *
     * @see http://raml.org/spec.html#headers
     */
    headers?:                NamedParameterMap
}

interface ResourceType {
    description?:            string
    uriParameters?:          NamedParameterMap

    // TODO
    "get?"?:                 Method
    "post?"?:                Method
    "put?"?:                 Method
    "delete?"?:              Method
}


/**
 * Each document MUST contain title and content attributes,
 * both of which are REQUIRED.
 * Documentation-generators MUST process the content field as if it was defined using Markdown [MARKDOWN].
 *
 * @see http://raml.org/spec.html#user-documentation
 */
interface DocumentationItem {
    title:                   string
    content:                 MarkdownString
}

/**
 *
 * Resource methods MAY have one or more responses.
 *
 * @see http://raml.org/spec.html#responses
 */
interface Response {
    /**
     * Responses MAY contain a description property that further clarifies why the response was emitted.
     * Response descriptions are particularly useful for describing error conditions.
     */
    description?:            MarkdownString

    /**
     * An API's methods may support custom header values in responses.
     * The custom, non-standard HTTP headers MUST be specified by the headers property.
     *
     * @see http://raml.org/spec.html#headers-1
     */
    headers?:                NamedParameterMap
    body?:                   Bodies
}

/**
 * @see http://raml.org/spec.html#security
 */
interface SecurityScheme {
    type?:            SecuritySchemeType
    description?:     MarkdownString
    settings?:        { [ settingName: string ]: string }
    describedBy?:     SecuritySchemeDescription
}

interface SecuritySchemeDescription {
    uriParameters?:   NamedParameterMap
    headers?:         NamedParameterMap
    responses?:       Responses
}

// TODO
interface Trait {
    description?:     MarkdownString
}

interface Bodies {
    "application/x-www-form-urlencoded"?: WebFormBodyPayload;
    "multipart/form-data"?:               WebFormBodyPayload;
    [ mediaType: string ]:                BodyPayload
}

interface BodyPayload {
    /**
     * The structure of a request or response body MAY be further specified by the schema property under the appropriate media type.
     *
     * All parsers of RAML MUST be able to interpret JSON Schema [JSON_SCHEMA] and XML Schema [XML_SCHEMA].
     *
     * Alternatively, the value of the schema field MAY be the name of a schema specified in the
     * root-level schemas property
     *
     * @see http://raml.org/spec.html#schema
     */
    schema?:          string | SchemaDefinition

    /**
     * @see http://raml.org/spec.html#example-4
     */
    example?:         string
}
/**
 * @see: http://raml.org/spec.html#web-forms
 */
interface WebFormBodyPayload {

    formParameters:  NamedParameterMap

    /**
     * @see http://raml.org/spec.html#example-4
     */
    example?:        string
}


interface Responses { [ statusCode: string ]: Response } // [statusCode:string]:  Response | Null


interface NamedParameterMap { [ parameterName: string ]: NamedParameter | NamedParameter[] }

/**
 * @see http://raml.org/spec.html#named-parameters
 */
interface BasicNamedParameter {

    /**
     * (Optional) The description attribute describes the intended use or meaning of the parameter.
     * This value MAY be formatted using Markdown [MARKDOWN].
     *
     * @see http://raml.org/spec.html#description
     */
    description?:     MarkdownString

    /**
     * (Optional) The displayName attribute specifies the parameter's display name.
     * It is a friendly name used only for display or documentation purposes.
     * If displayName is not specified, it defaults to the property's key (the name of the property itself).
     *
     * @see http://raml.org/spec.html#displayname
     */
    displayName?:     string

    /**
     * (Optional, applicable only for parameters of type string)
     * The enum attribute provides an enumeration of the parameter's valid values.
     * This MUST be an array.
     *
     * If the enum attribute is defined, API clients and servers MUST verify
     * that a parameter's value matches a value in the enum array.
     *
     * If there is no matching value, the clients and servers MUST treat this as an error.
     *
     * @see http://raml.org/spec.html#enum
     */
    'enum'?:          any[]

    // TODO: types should be a string enum. They are not supported by Typescript at the moment
    /**
     * (Optional) The type attribute specifies the primitive type of the parameter's resolved value.
     * API clients MUST return/throw an error if the parameter's resolved value does not match the specified type.
     * If type is not specified, it defaults to string.
     *
     * @see http://raml.org/spec.html#type
     */
    type?:            string

    // TODO: verify on JS parser output
    /**
     * (Optional) The example attribute shows an example value for the property.
     * This can be used, e.g., by documentation generators to generate sample values for the property.
     *
     * @see http://raml.org/spec.html#example
     */
    example?:         any // or string?

    // TODO: verify on JS parser output
    /**
     * (Optional) The repeat attribute specifies that the parameter can be repeated.
     * If the parameter can be used multiple times, the repeat parameter value MUST be set to 'true'.
     * Otherwise, the default value is 'false' and the parameter may not be repeated.
     *
     * @see http://raml.org/spec.html#repeat
     */
    repeat?:          boolean

    // TODO: verify on JS parser output
    /**
     * (Optional except as otherwise noted)
     * The required attribute specifies whether the parameter and its value MUST be present in the API definition.
     * It must be either 'true' if the value MUST be present or 'false' otherwise.
     * In general, parameters are optional unless the required attribute is included and its value set to 'true'.
     * For a URI parameter, the required attribute MAY be omitted, but its default value is 'true'.
     *
     * @see http://raml.org/spec.html#required
     */
    required?:        boolean

    // TODO: verify on JS parser output
    /**
     * (Optional)
     * The default attribute specifies the default value to use for the property if the property is omitted
     * or its value is not specified.
     * This SHOULD NOT be interpreted as a requirement for the client to send the default attribute's value
     * if there is no other value to send. Instead, the default attribute's value is the value the server uses
     * if the client does not send a value.
     */
    'default'?:       any

}


interface NumericNamedParameter extends BasicNamedParameter {
    // TODO: verify on JS parser output
    /**
     * (Optional, applicable only for parameters of type number or integer)
     * The minimum attribute specifies the parameter's minimum value.
     *
     * @see http://raml.org/spec.html#minimum
     */
    minimum?:         number

    // TODO: verify on JS parser output
    /**
     * (Optional, applicable only for parameters of type number or integer)
     * The maximum attribute specifies the parameter's maximum value.
     *
     * @see http://raml.org/spec.html#maximum
     */
    maximum?:         number
}

interface StringNamedParameter extends BasicNamedParameter {

    // TODO: verify on JS parser output
    /**
     * (Optional, applicable only for parameters of type string)
     *
     * The pattern attribute is a regular expression that a parameter of type string MUST match.
     * The pattern MAY be enclosed in double quotes for readability and clarity.
     * ( in the JS parser. are the quotes preserved? )
     *
     * @see http://raml.org/spec.html#pattern
     */
    pattern?:         RegexPattern


    // TODO: verify on JS parser output
    /**
     * (Optional, applicable only for parameters of type string)
     * The minLength attribute specifies the parameter value's minimum number of characters.
     *
     * @see http://raml.org/spec.html#minlength
     */
    minLength?:       number

    // TODO: verify on JS parser output
    /**
     * (Optional, applicable only for parameters of type string)
     * The maxLength attribute specifies the parameter value's maximum number of characters.
     *
     * @see http://raml.org/spec.html#maxlength
     */
    maxLength?:       number

}

declare type NamedParameter = BasicNamedParameter | NumericNamedParameter | StringNamedParameter

