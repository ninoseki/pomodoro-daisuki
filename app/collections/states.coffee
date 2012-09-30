Collection = require './collection'
State = require 'models/state'

module.exports = class States extends Collection
  model: State

  initialize: ->
    @localStorage = new Store "state"

  getCurrentState: ->
    first = @first()
    if first == undefined
        first = @create()
    first

  getCurrentStateName: ->
    currentState = @getCurrentState()
    currentState.get('name')

  setCurrentStateName: (name) ->
    currentState = @getCurrentState()
    currentState.save name: name