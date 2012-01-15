async = require 'async'
mkdirp = require 'mkdirp'
path = require 'path'
{BasePlugin} = require './base'
helpers = require '../helpers'


class exports.AssetsPlugin extends BasePlugin
  load: (callback) ->
    from = path.resolve @getRootPath 'app', 'assets'
    to = path.resolve @getBuildPath ''
    helpers.walkTreeAndCopyFiles from, to, callback
