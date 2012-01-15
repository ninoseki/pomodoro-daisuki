fs = require 'fs'
path = require 'path'
async = require 'async'

class exports.BaseLanguage
  queue: async.queue fs.readFile, 5

  constructor: (@config) ->
    null

  getRootPath: (subPathes...) ->
    path.join @config.rootPath, subPathes...

  getBuildPath: (subPathes...) ->
    path.join @config.buildPath, subPathes...

  readFile: (file, callback) ->
    @queue.push file, (error, data) ->
      callback error, data.toString()

  compile: (file, callback) ->
    @readFile file, callback
