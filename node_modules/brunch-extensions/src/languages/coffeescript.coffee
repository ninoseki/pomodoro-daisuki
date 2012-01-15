coffeescript = require 'coffee-script'
{BaseLanguage} = require './base'

class exports.CoffeeScriptLanguage extends BaseLanguage
  compile: (file, callback) ->
    @readFile file, (error, data) ->
      return callback error if error?
      try
        callback null, coffeescript.compile data
      catch error
        callback error
