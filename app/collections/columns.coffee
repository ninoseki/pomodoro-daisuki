Collection = require './collection'
Column = require 'models/column'

module.exports = class Columns extends Collection

  model: Column

  initialize: ->
    @localStorage = new Store "columns"
