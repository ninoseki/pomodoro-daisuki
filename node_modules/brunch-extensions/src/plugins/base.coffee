path = require 'path'

class exports.BasePlugin
  constructor: (@config) ->
    null

  getRootPath: (subPathes...) ->
    path.join @config.rootPath, subPathes...

  getBuildPath: (subPathes...) ->
    path.join @config.buildPath, subPathes...

  load: (callback) ->
    callback()
