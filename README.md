JSONP
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