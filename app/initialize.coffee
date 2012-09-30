application = require 'application'

$ ->
  application.initialize()
  Backbone.history.start()
  # fetch data from localStorage
  application.states.fetch()
  currentStateName = application.states.getCurrentStateName()
  # go to current-state
  currentStateName = if currentStateName == undefined then 'home' else currentStateName
  application.router.navigate currentStateName, true if Backbone.history.getFragment() is ''
