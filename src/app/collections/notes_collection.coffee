Note = require('models/note_model').Note

class exports.Notes extends Backbone.Collection

    model: Note

    initialize: ->
        @localStorage = new Store "notes"
