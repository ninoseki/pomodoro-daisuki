Column = require 'models/column'
ColumnView = require 'views/column_view'

class ColumnViewTest extends ColumnView
  renderTimes: 0

  render: ->
    super
    @renderTimes += 1

describe 'ColumnView', ->
  beforeEach ->
    @model = new Column()
    @view = new ColumnView({@model})

  it 'should addClass when editing', ->
    @view.edit()
    (expect @view.$el.hasClass('editing')).to.be.ok

