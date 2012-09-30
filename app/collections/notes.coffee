Collection = require './collection'
Note = require 'models/note'

module.exports = class Notes extends Collection

  model: Note

  initialize: ->
    @localStorage = new Store "notes"
