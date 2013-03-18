asyncTest('JSONP: Twitter search', 1, function() {
    JSONP({ 
        url: 'http://search.twitter.com/search.json',
        data: { q: 'lol' },
        success: function(data) {
            if (typeof data === 'object') {
                ok(true);
            }
            start();
        }
    });
});

asyncTest('JSONP: Forced failure', 1, function() {
    JSONP({ 
        url: 'http://j3lk5f0dl3m0f3lt0fdlem30gugmtu5p5mgmdu34lflfm30fulddu93ldfu3ldfg2ufogk234-fu23nf3/',
        data: { q: 'lol' },
        error: function(data) {
            ok(true);
            start();
        }
    });
});

asyncTest('JSONP: Missing url parameter', 1, function() {
    try {
        JSONP({});
    }
    catch(e) {
        if (e.message === 'MissingUrl') {
            ok(true);
            start();
        }
        else {
            throw(e);
        }
    }
});
