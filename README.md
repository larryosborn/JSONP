JSONP [![Build Status](https://travis-ci.org/larryosborn/JSONP.png)](https://travis-ci.org/larryosborn/JSONP)
=====

A slim JSONP request library for Javascript.

Usage
=====

```javascript
JSONP({
    url: 'http://api.example.com/sample.js',
    data: { foo: 'bar' },
    success: function(data) { console.log(data); }
});
```
This example will generate:
```html
<script src="http://api.example.com/sample.js?foo=bar&callback=jsonp_a1b2c3d4e5f6g7h" async="true"></script>
```

Options
=======

 * url: (string) (required) URL for the JSONP resource.
 * data: (object) (optional) Object used to generate GET query parameters for the JSONP resource.
 * success: (function) (optional) Callback function executed upon a successful request.
 * error: (function) (optional) Callback function executed for a failed request.
 * callbackName: (string) (optional) Name of callback function name. Default is 'callback'.
