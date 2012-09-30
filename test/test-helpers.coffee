# This file will be automatically required when using `brunch test` command.
chai = require 'chai'
sinonChai = require 'sinon-chai'
chai.use sinonChai

class Helper
  keydown: (keyCode, selector) ->
    e = $.Event "keypress"
    e.keyCode = keyCode
    $(selector).trigger('focus').trigger e

module.exports =
  expect: chai.expect
  sinon: require 'sinon'