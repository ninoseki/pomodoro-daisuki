View = require './view'
application = require 'application'
template = require './templates/new_note'

module.exports = class NewNoteView extends View
  template: template
  id: "new-note"

  events:
    "click .addNote": "create"

  afterRender: ->
    @delegateEvents()

  create: (event) ->
    color = event.currentTarget.className.split(" ")[1]
    application.notes.create color: color