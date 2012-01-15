less= require 'less'
{BaseLanguage} = require './base'

class exports.LESSLanguage extends BaseLanguage
  compile: (file, callback) ->
    @readFile file, (error, data) ->
      return callback error if error?
      less.render data, (error, css) ->
        callback error, css
