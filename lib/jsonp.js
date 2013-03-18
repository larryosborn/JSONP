(function(window, undefined){

"use strict";

var createElement = function(tag) { return window.document.createElement(tag); },
    encode = window.encodeURIComponent,
    random = Math.random,
    head;


function JSONP(options) {

    options = typeof options === 'object' ? options : {};

    var params = { 
            data: options.data || {},
            error: options.error || noop,
            success: options.success || noop,
            url: options.url || ''
        },
        script = createElement('script'),
        done = false,
        callback_name = options.callback_name || 'callback',
        callback = params.data[callback_name] = 'jsonp_' + random_string(15);

    if (params.url.length === 0) {
        throw new Error('MissingUrl');
    }

    window[callback] = function(data) {
        params.success(data);
        delete window[callback];
    };

    script.src = params.url + (params.url.indexOf('?') === -1 ? '?' : '&') + object_to_uri(params.data);
    script.async = true;

    script.onerror = function(evt) {
        params.error({ url: script.src, event: evt });
    };
    
    script.onload = script.onreadystatechange = function() {
        if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
            done = true;
            script.onload = script.onreadystatechange = null;
            if (script && script.parentNode) {
                script.parentNode.removeChild(script);
            }
        }
    };

    head = head || window.document.getElementsByTagName('head')[0];
    head.appendChild(script);
}

function noop(){}

function random_string(length) {
    var str = '';
    while (str.length < length) { 
        str += random().toString(36)[2];
    }
    return str;
}

function object_to_uri(obj) {
    var data = [];
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            data.push(encode(i) + '=' + encode(obj[i]));
        }
    }
    return data.join('&');
}

if (typeof define !== 'undefined' && define.amd) { define(function() { return JSONP; }); }
else if (typeof module !== 'undefined' && module.exports) { module.exports = JSONP; }
else { window.JSONP = JSONP; }

})(window);
