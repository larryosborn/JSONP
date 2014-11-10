describe('JSONP: Openweathermap.org API request', function() {
  return it('should create a remote request to an API', function(done) {
    var value;
    value = 'fail';
    return JSONP({
      url: 'http://api.openweathermap.org/data/2.5/weather',
      data: {
        q: 'London,UK'
      },
      success: function(data) {
        if (typeof data === 'object') {
          value = 'success';
          expect(value).to.equal('success');
        }
        return done();
      },
      error: function(data) {
        expect(value).to.equal('success');
        return done();
      }
    });
  });
});

describe('JSONP: Forced failure', function() {
  return it('should force a failure of a remote request', function(done) {
    var value;
    value = 'fail';
    return JSONP({
      url: 'http://j3lk5f0dl3m0f3lt0fdlem30gugmtu5p5mgmdu34lflfm30fulddu93ldfu3ldfg2ufogk234-fu23nf3/',
      data: {
        q: 'London,UK'
      },
      success: function(data) {
        expect(value).to.equal('success');
        return done();
      },
      error: function(data) {
        value = 'success';
        expect(value).to.equal('success');
        return done();
      }
    });
  });
});

describe('JSONP: Missing url parameter', function() {
  return it('should fail because of missing url parameter', function(done) {
    var e, flag, value;
    flag = false;
    value = 'fail';
    try {
      JSONP();
    } catch (_error) {
      e = _error;
      if (e.message === 'MissingUrl') {
        flag = true;
        value = 'success';
      } else {
        flag = true;
        throw e;
      }
    }
    expect(value).to.equal('success');
    return done();
  });
});

describe('JSONP: beforeSend computedUrl', function() {
  return it('execute beforeSend and have a computedUrl', function(done) {
    var value;
    value = 'fail';
    return JSONP({
      url: 'http://api.openweathermap.org/data/2.5/weather',
      data: {
        q: 'London,UK'
      },
      beforeSend: function(_arg, settings) {
        _arg;
        return expect(settings.computedUrl).to.equal('http://api.openweathermap.org/data/2.5/weather?q=London%2CUK');
      },
      complete: function() {
        return done();
      }
    });
  });
});
