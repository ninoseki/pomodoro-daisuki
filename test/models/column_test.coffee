Column = require 'models/column'

describe 'Column Model', ->

  beforeEach ->
    @column = new Column()

  it 'should set defaults', ->
    (expect @column.get('title')).to.equal 'new'

  it 'should be clear', ->
    view =
      remove: ->
        true

    @column.view = view
    @column.clear()