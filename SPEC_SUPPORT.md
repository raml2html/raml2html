# Current RAML 1.0 Support

The current RAML 1.0 support is experimental. Although the templates are working perfectly fine, the missing feature of RAML 1.0 is the new type system. At the moment the following gets rendered using the type system:

| Type Declaration | Rendered |
|:----------------:|:---------|
| Inline Types | Rendered |
| Type References | Only the name, eg: `PasswordProtectedAccount` |
| Union Types | Only the names, eg: `Dog | Cat` |
| Multiple Inheritance | Only the names, eg: `[ Dog, Cat ]` |

Please find an example here: `examples/raml1.0/example.raml`. Also, the nunjucks template contains the following template code to render types for method bodies (request/response):

```
{% if b.type and not b.schema %}
  <p><strong>Type</strong>:</p>
  {% if b.properties %}
    <ul>
      {% for key, item in b.properties %}
        {% include "./item.nunjucks" %}
      {% endfor %}
    </ul>
  {% else %}
    <pre><code>{{ b.type | escape }}</code></pre>
  {% endif %}
{% endif %}
```

Any contribution that allows raml2html to render types completely is very welcome.
