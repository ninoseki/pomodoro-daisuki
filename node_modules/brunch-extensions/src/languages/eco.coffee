eco = require 'eco'
{BaseLanguage} = require './base'

class exports.EcoLanguage extends BaseLanguage
  compile: (file, callback) ->
    @readFile file, (error, data) =>
      return callback error if error?
      callback null, eco.compile data
