createElement = (tag) -> window.document.createElement tag
encode = window.encodeURIComponent
random = Math.random

JSONP = (options) ->

    options = if options then options else {}
    params =
        data: options.data or {}
        error: options.error or noop
        success: options.success or noop
        beforeSend: options.beforeSend or noop
        complete: options.complete or noop
        url: options.url or ''

    params.computedUrl = computedUrl params

    throw new Error('MissingUrl') if params.url.length is 0

    done = false

    if params.beforeSend({}, params) isnt false

        callback = params.data[options.callbackName or 'callback'] = 'jsonp_' + randomString 15

        window[callback] = (data) ->
            params.success data, params
            params.complete data, params
            try
                delete window[callback]
            catch
                window[callback] = undefined
                return undefined

        script = createElement 'script'
        script.src = computedUrl params
        script.async = true

        script.onerror = (evt) ->
            params.error { url: script.src, event: evt }
            params.complete { url: script.src, event: evt }, params

        script.onload = script.onreadystatechange = ->
            if not done and (not this.readyState or this.readyState is 'loaded' or this.readyState is 'complete')
                done = true
                script.onload = script.onreadystatechange = null
                script.parentNode.removeChild script if script and script.parentNode
                script = null
        head = head or window.document.getElementsByTagName('head')[0] or window.document.documentElement
        # (see jQuery bugs #2709 and #4378)
        head.insertBefore script, head.firstChild

noop = -> undefined

computedUrl = (params) ->
    url = params.url
    url += if params.url.indexOf('?') < 0 then '?' else '&'
    url += objectToURI params.data
    return url

randomString = (length) ->
    str = ''
    str += random().toString(36)[2] while str.length < length
    return str

objectToURI = (obj) ->
    data = []
    data.push encode(key) + '=' + encode value for key, value of obj
    return data.join '&'

if define? and define.amd then define -> JSONP
else if module? and module.exports then module.exports = JSONP
else this.JSONP = JSONP
