columnTemplate = require('./templates/column')

class exports.ColumnView extends Backbone.View
  className: "column"

  events:
    "dblclick h2"           : "edit"
    "blur input"            : "update"
    "click .column-destroy" : "clear"

  initialize: ->
    @model.bind('change', @render)
    @model.view = @

  render: =>
    $(@el).html columnTemplate(column: @model.toJSON())
    @

  edit: ->
    $(@el).addClass "editing"
    $('.title-input').focus()

  update: =>
    title = if @$('.title-input').val() == '' then "new" else @$('.title-input').val()
    @model.save title: title
    $(@el).removeClass "editing"

  remove: ->
    $(@el).remove()

  clear: ->
    @model.clear()