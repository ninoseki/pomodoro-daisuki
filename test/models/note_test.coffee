Note = require 'models/note'

describe 'Note Model', ->

  beforeEach ->
    @note = new Note()

  it 'should set defaults', ->
    (expect @note.get('content')).to.equal 'click here to write'
    (expect @note.get('w')).to.equal 100
    (expect @note.get('h')).to.equal 80
    (expect @note.get('x')).to.equal 40
    (expect @note.get('y')).to.equal 40


  it 'should be clear', ->
    view =
      remove: ->
        true

    @note.view = view
    @note.clear()