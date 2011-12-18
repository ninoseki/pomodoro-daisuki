newNoteTemplate = require('templates/new_note')

class exports.NewNoteView extends Backbone.View
    id: "new-note"
    
    events:
        "click .addNote": "create"

    render: ->
        @$(@el).html newNoteTemplate()
        @

    create: (event) ->
        color = event.currentTarget.className.split(" ")[1]
        app.collections.notes.create color: color