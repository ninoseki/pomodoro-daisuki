View = require './view'
application = require 'application'
NoteView = require './note_view'
template = require './templates/notes'

module.exports = class NotesView extends View
  template: template
  id: "notes"

  initialize: ->
    application.notes.bind 'add', @addOne
    application.notes.bind 'reset', @addAll

  addOne: (note) =>
    view = new NoteView model: note
    @$el.append view.render().el

  addAll: =>
    application.notes.each @addOne
