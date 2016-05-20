createElement = (tag) -> window.document.createElement tag
encode = window.encodeURIComponent
random = Math.random

JSONP = (options = {}) ->

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

        callbackName = options.callbackName or 'callback'
        callbackFunc = options.callbackFunc or 'jsonp_' + randomString 15
        callback = params.data[callbackName] = callbackFunc

        window[callback] = (data) ->
            window[callback] = null
            params.success data, params
            params.complete data, params

        script = createElement 'script'
        script.src = computedUrl params
        script.async = true

        script.onerror = (evt) ->
            params.error { url: script.src, event: evt }
            params.complete { url: script.src, event: evt }, params

        script.onload = script.onreadystatechange = ->
            return if done or @readyState not in ['loaded', 'complete']
            done = true
            if script
                script.onload = script.onreadystatechange = null
                script.parentNode?.removeChild script
                script = null
        head = window.document.getElementsByTagName('head')[0] or window.document.documentElement
        # (see jQuery bugs #2709 and #4378)
        head.insertBefore script, head.firstChild

    abort: ->
        window[callback] = -> window[callback] = null
        done = true
        if script?.parentNode
            script.onload = script.onreadystatechange = null
            script.parentNode.removeChild script
            script = null

noop = -> undefined

computedUrl = (params) ->
    url = params.url
    url += if params.url.indexOf('?') < 0 then '?' else '&'
    url += objectToURI params.data
    return url

randomString = (length) ->
    str = ''
    str += random().toString(36).slice(2, 3) while str.length < length
    return str

objectToURI = (obj) ->
    data = (encode(key) + '=' + encode value for key, value of obj)
    return data.join '&'

if define?.amd then define -> JSONP
else if module?.exports then module.exports = JSONP
else @JSONP = JSONP
