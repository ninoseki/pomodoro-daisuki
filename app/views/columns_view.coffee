View = require './view'
ColumnView = require './column_view'
application = require 'application'
template = require './templates/columns'

module.exports = class ColumnsView extends View
  template: template
  id: "columns"

  initialize: ->
    application.columns.bind 'add', @addOne
    application.columns.bind 'reset', @addAll
    application.columns.bind 'remove', @reindex

  adjustSize: ->
    width = $('body').width()
    length = application.columns.length
    column_width = width / length

    $('.column').each (index) ->
      $(@).width column_width
      $(@).css 'left', index * column_width

  reindex: =>
    application.columns.each (column, index) ->
      column.save index: index

    @adjustSize()

  addOne: (column) =>
    view = new ColumnView model: column
    @$el.append view.render().el

    @adjustSize()

  addAll: =>
    application.columns.each @addOne