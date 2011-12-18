State = require('models/state_model').State

class exports.States extends Backbone.Collection

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