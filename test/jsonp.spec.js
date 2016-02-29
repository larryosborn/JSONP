describe('JSONP: Openweathermap.org API request', function() {
  return it('should create a remote request to an API', function(done) {
    var value;
    value = 'fail';
    return JSONP({
      url: 'http://localhost:6767/profile',
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
    var e, error, flag, value;
    flag = false;
    value = 'fail';
    try {
      JSONP();
    } catch (error) {
      e = error;
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
      url: 'http://localhost:6767/profile',
      data: {
        q: 'London,UK'
      },
      beforeSend: function(arg, settings) {
        arg;
        return expect(settings.computedUrl).to.equal('http://localhost:6767/profile?q=London%2CUK');
      },
      complete: function() {
        return done();
      }
    });
  });
});

describe('JSONP: Cancel', function() {
  return it('should cancel the request', function(done) {
    var call;
    call = JSONP({
      url: 'http://localhost:6767/profile',
      data: {
        q: 'London,UK'
      },
      callbackFunc: 'jsonpTest',
      complete: function() {
        return expect(false).to.equal(true);
      }
    });
    call.abort();
    window.jsonpTest();
    expect(true).to.equal(true);
    return done();
  });
});
