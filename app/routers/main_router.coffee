class exports.MainRouter extends Backbone.Router
  routes :
    "home"                : "home"
    "working"             : "working"
    "resting/:rest_type"  : "resting"
    "stats"               : "stats"
    "small_timer"         : "small_timer"

  home: ->
    app.views.home.render()
    app.collections.notes.fetch()
    app.collections.columns.fetch()

    app.collections.states.setCurrentStateName('home')


  working: ->
    app.views.working.render()
    duration = localStorage["pomodoro-duration"]
    if ! duration then duration = 25
    app.views.working.startTimer(duration * 60)
    app.collections.states.setCurrentStateName('working')

  resting: (rest_type) ->
    app.views.resting.render()
    duration = localStorage[rest_type + "-duration"]
    if ! duration
        if rest_type == "short" then duration=5
        if rest_type == "long" then duration=15
    app.views.resting.startTimer(duration * 60)

    app.collections.states.setCurrentStateName('resting/' + seconds)

  stats: ->
    app.collections.pomodoros.fetch()
    app.views.stats.render()
    
  small_timer: ->
     $("#modal").modal("show")
     app.routers.main.navigate('home', true)
