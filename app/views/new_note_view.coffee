newNoteTemplate = require('views/templates/new_note')

class exports.NewNoteView extends Backbone.View
  id: "new-note"

  events:
    "click .addNote": "create"

  render: ->
    @$(@el).html newNoteTemplate()
    @delegateEvents()
    @

  create: (event) ->
    color = event.currentTarget.className.split(" ")[1]
    app.collections.notes.create color: color