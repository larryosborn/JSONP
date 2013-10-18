createElement = (tag) -> window.document.createElement tag
encode = window.encodeURIComponent
random = Math.random

JSONP = (options) ->

    options = if options then options else {}
    params =
        data: options.data or {},
        error: options.error or noop,
        success: options.success or noop,
        url: options.url or ''

    throw new Error('MissingUrl') if params.url.length is 0

    done = false

    callback = params.data[options.callback_name or 'callback'] = 'jsonp_' + random_string 15

    window[callback] = (data) ->
        params.success data
        delete window[callback]

    script = createElement 'script'
    script.src = params.url
    script.src += if params.url.indexOf '?' is -1 then '?' else '&'
    script.src += object_to_uri params.data
    script.async = true

    script.onerror = (evt) ->
        params.error { url: script.src, event: evt }

    script.onload = script.onreadystatechange = ->
        if not done and (not this.readyState or this.readyState is 'loaded' or this.readyState is 'complete')
            done = true
            script.onload = script.onreadystatechange = null
            script.parentNode.removeChild script if script and script.parentNode

    head = head or window.document.getElementsByTagName('head')[0]
    head.appendChild script

noop = -> undefined

random_string = (length) ->
    str = ''
    str += random().toString(36)[2] while str.length < length
    return str

object_to_uri = (obj) ->
    data = []
    data.push encode(key) + '=' + encode value for key, value of obj
    return data.join '&'

if module? and module.exports then module.exports = JSONP
else if module? and module.exports then module.exports = JSONP
else this.JSONP = JSONP
