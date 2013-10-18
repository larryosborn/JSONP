describe('JSONP: Openweathermap.org API request', function() {

    var value, flag;

    it('should create a remote request to an API', function() {

        runs(function() {
            flag = false;
            value = 'fail';

            JSONP({
                url: 'http://api.openweathermap.org/data/2.5/weather',
                data: { q: 'London,UK' },
                success: function(data) {
                    if (typeof data === 'object') {
                        flag = true;
                        value = 'success';
                    }
                },
                error: function(data) {
                    flag = true;
                }
            });
        });

        waitsFor(function() {
            return flag;
        }, 'timeout after 5 seconds', 5000);

        runs(function() {
            expect(value).toEqual('success');
        });

    });

});

describe('JSONP: Forced failure', function() {

    var value, flag;

    it('should force a failure of a remote request', function() {

        runs(function() {
            flag = false;
            value = 'fail';

            JSONP({
                url: 'http://j3lk5f0dl3m0f3lt0fdlem30gugmtu5p5mgmdu34lflfm30fulddu93ldfu3ldfg2ufogk234-fu23nf3/',
                data: { q: 'London,UK' },
                success: function(data) {
                    if (typeof data === 'object') {
                        flag = true;
                    }
                },
                error: function(data) {
                    flag = true;
                    value = 'success';
                }
            });
        });

        waitsFor(function() {
            return flag;
        }, 'timeout after 5 seconds', 5000);

        runs(function() {
            expect(value).toEqual('success');
        });

    });

});

describe('JSONP: Missing url parameter', function() {

    var value, flag;

    it('should fail because of missing url parameter', function() {

        runs(function() {
            flag = false;
            value = 'fail';

            try {
                JSONP({});
            }
            catch(e) {
                if (e.message === 'MissingUrl') {
                    flag = true;
                    value = 'success';
                }
                else {
                    flag = true;
                    throw(e);
                }
            }
        });

        waitsFor(function() {
            return flag;
        }, 'timeout after 5 seconds', 5000);

        runs(function() {
            expect(value).toEqual('success');
        });

    });

});
