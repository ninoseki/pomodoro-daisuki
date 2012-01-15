jade = require 'jade'
{BaseLanguage} = require './base'

class exports.JadeLanguage extends BaseLanguage
  compile: (file, callback) ->
    @readFile file, (error, data) ->
      return callback error if error?
      try
        content = jade.compile data, compileDebug: no, client: yes
        callback null, "module.exports = #{content};"
      catch error
        callback error
