gulp = require 'gulp'
coffee = require 'gulp-coffee'
coffeelint = require 'gulp-coffeelint'
notify = require 'gulp-notify'
mochaPhantomJS = require 'gulp-mocha-phantomjs'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'
jsonServer = require 'json-server'

handleErrors = ->
    args = Array.prototype.slice.call(arguments)
    notify.onError(title: 'Compile Error', message: '<%= error.message %>').apply(this, args)
    this.emit 'end'

gulp.task 'default', ['build']

gulp.task 'coffee', ->
    gulp.src './src/jsonp.coffee'
        .pipe coffeelint()
        .pipe coffeelint.reporter()
        .pipe coffee().on('error', handleErrors)
        .pipe gulp.dest('lib')

gulp.task 'build', ['coffee'], ->
    gulp.src './lib/jsonp.js'
        .pipe uglify()
        .pipe rename(extname: '.min.js')
        .pipe gulp.dest('lib')


gulp.task 'test', ['build'], ->
    express = jsonServer.create()
    router = jsonServer.router { profile: name: 'foobar', color: 'red', mood: 'happy' }
    express.use router
    server = express.listen 6767

    gulp.src './spec/**/*.coffee'
        .pipe coffeelint()
        .pipe coffeelint.reporter()
        .pipe coffee(bare: true).on('error', handleErrors)
        .pipe gulp.dest('test')
    stream = gulp.src './test/index.html'
        .pipe mochaPhantomJS()

    stream.on 'end', -> server.close()
    stream.on 'error', -> server.close()

