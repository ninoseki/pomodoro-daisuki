View = require './view'
template = require './templates/column'

module.exports = class ColumnView extends View
  template: template
  className: "column"

  events:
    "dblclick h2"           : "edit"
    "blur input"            : "update"
    "click .column-destroy" : "clear"

  initialize: ->
    @model.bind 'change', @render
    @model.view = this

  getRenderData: ->
    {
      column: @model.toJSON()
    }

  edit: ->
    @$el.addClass "editing"
    $('.title-input').focus()

  update: =>
    title = if @$('.title-input').val() == '' then "new" else @$('.title-input').val()
    @model.save title: title
    @$el.removeClass "editing"

  remove: ->
    @$el.remove()

  clear: ->
    @model.clear()