application = require 'application'

module.exports = class MainRouter extends Backbone.Router
  routes :
    "home"                : "home"
    "working"             : "working"
    "resting/:rest_type"  : "resting"
    "stats"               : "stats"
    "small_timer"         : "small_timer"

  home: ->
    application.homeView.render()
    application.notes.fetch()
    application.columns.fetch()

    application.states.setCurrentStateName('home')


  working: ->
    application.workingView.render()
    duration = localStorage["pomodoro-duration"]
    if ! duration then duration = 25

    application.workingView.startTimer(if application.development == true then 10 else duration * 60)
    application.states.setCurrentStateName('working')

  resting: (rest_type) ->
    application.restingView.render()
    duration = localStorage[rest_type + "-duration"]
    if ! duration
        if rest_type == "short" then duration = 5
        if rest_type == "long" then duration = 15
    application.restingView.startTimer(if application.development == true then 10 else duration * 60)

    application.states.setCurrentStateName('resting/' + rest_type)

  stats: ->
    application.pomodoros.fetch()
    application.statsView.render()
    
  small_timer: ->
     $("#modal").modal("show")
     application.router.navigate 'home', true
