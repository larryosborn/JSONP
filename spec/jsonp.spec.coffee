describe 'JSONP: Openweathermap.org API request', ->

    it 'should create a remote request to an API', (done) ->

        value = 'fail'

        JSONP
            url: 'http://localhost:6767/profile'
            data: q: 'London,UK'
            success: (data) ->
                if typeof data is 'object'
                    value = 'success'
                    expect(value).to.equal('success')
                done()
            error: (data) ->
                expect(value).to.equal('success')
                done()


describe 'JSONP: Forced failure', ->

    it 'should force a failure of a remote request', (done) ->

        value = 'fail'

        JSONP
            url: 'http://j3lk5f0dl3m0f3lt0fdlem30gugmtu5p5mgmdu34lflfm30fulddu93ldfu3ldfg2ufogk234-fu23nf3/'
            data: q: 'London,UK'
            success: (data) ->
                expect(value).to.equal('success')
                done()
            error: (data) ->
                value = 'success'
                expect(value).to.equal('success')
                done()

describe 'JSONP: Missing url parameter', ->

    it 'should fail because of missing url parameter', (done) ->

        flag = false
        value = 'fail'

        try
            JSONP()
        catch e
            if e.message is 'MissingUrl'
                flag = true
                value = 'success'
            else
                flag = true
                throw e

        expect(value).to.equal('success')
        done()

describe 'JSONP: beforeSend computedUrl', ->

    it 'execute beforeSend and have a computedUrl', (done) ->

        value = 'fail'

        JSONP
            url: 'http://localhost:6767/profile'
            data: q: 'London,UK'
            beforeSend: ({}, settings) ->
                expect(settings.computedUrl).to.equal('http://localhost:6767/profile?q=London%2CUK')
            complete: ->
                done()

describe 'JSONP: Cancel', ->

    it 'should cancel the request', (done) ->

        call = JSONP
            url: 'http://localhost:6767/profile'
            data: q: 'London,UK'
            callbackFunc: 'jsonpTest'
            complete: ->
                expect(false).to.equal(true) # force fail
        call.abort()
        window.jsonpTest()
        expect(true).to.equal(true)
        done()

