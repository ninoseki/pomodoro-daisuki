NoteView = require('views/note_view').NoteView
notesTemplate = require('templates/notes')

class exports.NotesView extends Backbone.View
    id: "notes"
    
    initialize: ->
        app.collections.notes.bind 'add', @addOne
        app.collections.notes.bind 'reset', @addAll

    render: ->
        $(@el).html notesTemplate()
        @

    addOne: (note) =>
        view = new NoteView model: note
        $(@el).append view.render().el

    addAll: =>
        app.collections.notes.each @addOne
