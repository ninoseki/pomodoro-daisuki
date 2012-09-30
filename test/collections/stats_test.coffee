States = require 'collections/states'

describe 'State collection', ->
  beforeEach ->
    @states = new States()

  afterEach ->
    localStorage.clear()

  it 'should check for initialized localstorage', ->
    expect(typeof @states.localStorage).to.equal 'object'

  it 'should return current state', ->
    state = @states.getCurrentState()
    (expect @states.length).to.equal 1

  it 'should not create multi-states', ->
    state = @states.getCurrentState()
    state = @states.getCurrentState()
    (expect @states.length).to.equal 1

  it 'should set state-name', ->
    name = 'hoge'
    @states.setCurrentStateName name

    (expect @states.models[0].get('name')).to.equal name

  it 'should set current-state-name', ->
    name = 'hoge'
    @states.setCurrentStateName name

    (expect @states.getCurrentStateName()).to.equal name