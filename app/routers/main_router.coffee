application = require 'application'
TimerConfig = require '../models/timer_config'

module.exports = class MainRouter extends Backbone.Router
  routes :
    "home"                : "home"
    "working"             : "working"
    "resting/:rest_type"  : "resting"
    "stats"               : "stats"
    "small-timer"         : "smallTimer"

  initialize: ->
    @timerConfig = new TimerConfig()

  home: (type) ->
    application.homeView.render()
    application.notes.fetch()
    application.columns.fetch()

    if type != 'onWorking'
      application.states.setCurrentStateName('home')

  working: ->
    application.workingView.render()
    duration = @timerConfig.get 'pomodoroDuration'

    application.workingView.startTimer(if application.development == true then 10 else duration * 60)
    application.states.setCurrentStateName('working')

  resting: (restType) ->
    application.restingView.render()
    duration = @timerConfig.get restType + 'BreakDuration'
    application.restingView.startTimer(if application.development == true then 10 else duration * 60)

    application.states.setCurrentStateName('resting/' + rest_type)

  stats: ->
    application.pomodoros.fetch()
    application.statsView.render()
    
  smallTimer: ->
     $("#modal").modal("show")

     application.router.navigate 'home/onWorking', true
