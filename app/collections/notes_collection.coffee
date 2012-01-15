{Note} = require('models/note_model')

class exports.Notes extends Backbone.Collection

  model: Note

  initialize: ->
    @localStorage = new Store "notes"
