noteTemplate = require('views/templates/note')

View = require './view'
application = require 'application'
template = require './templates/note'

module.exports = class NoteView extends View
  template: template
  className: "note white"

  events:
    "mouseover"     : "mouseover"
    "mouseout"      : "mouseout"
    "focus textarea": "focus"
    "blur textarea" : "blur"
    "keyup textarea": "updateContent"
    "dragstop"      : "updatePosition"
    "resize"        : "updateSize"
    "click .delete" : "clear"

  initialize: ->
    @model.view = @

  afterRender: ->
    @$el.css(
      "-webkit-transform" : "rotate(-#{@model.get('angle')}deg)"
      "-moz-transform"    : "rotate(-#{@model.get('angle')}deg)"
      "width"             : @model.get('w')
      "height"            : @model.get('h')
      "left"              : @model.get('x')
      "top"               : @model.get('y')
      "position"          : "absolute"
    )

    @$el.draggable(
      containment: 'parent'
      distance: 10
      opacity: 0.75
    ).resizable(
      containment: 'parent'
    )

  getRenderData: ->
    {
      note: @model.toJSON()
    }

  mouseout: (event) ->
    @$('.delete').hide()

  mouseover: (event) ->
    @$('.delete').show()

  focus: (event) ->
    if event.currentTarget.value == 'click here to write' then event.currentTarget.value = ''

  blur: (event) ->
    if event.currentTarget.value == '' then event.currentTarget.value = 'click here to write'

  updatePosition: (event, ui) ->
    x = ui.position.left
    y = ui.position.top
    w = @$el.width()
    h = @$el.height()

    @model.save({x: x, y: y, w: w, h: h})

  updateSize: (event, ui) ->
    w = @$el.width()
    h = @$el.height()

    @model.save({w: w, h: h})

  updateContent: (event) ->
    content = event.currentTarget.value
    @model.save content: content

  remove: ->
    @$el.remove()

  clear: ->
    @model.clear()