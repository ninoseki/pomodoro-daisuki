timerTemplate = require('views/templates/timer')

class exports.WorkingView extends Backbone.View
  el: "#modal"

  events:
    "click #cancel": "resetTimer"
    "click #hide": "hideTimer"

  render: ->
    @$(@el).html timerTemplate(title: "Working")
    $('#hide').show()
    @$(@el).modal(backdrop: 'static', show: true)
    @

  startTimer: (seconds) =>
    $('#timer').startTimer(
      seconds: seconds,
      reset: false,
      show_in_title: true,
      buzzer: @buzzer
    )
    $('#small_timer').startTimer(
      seconds: seconds,
      reset: false,
    )

  buzzer: =>
    # hide modal
    $("#small_timer_container").hide()
    @$(@el).modal('hide')
    app.routers.main.navigate('home', true)

    # add pomodoro
    app.collections.pomodoros.create(created_at: new Date().getTime())

    # ring alarm
    app.audios.alarm.play()

    # show notification
    notification = webkitNotifications.createNotification(
      'images/tomato_32.png',
      'notification',
      'pomodoro is done!'
    )
    notification.show()


  hideTimer: ->
    @$(@el).modal('hide')
    $("#small_timer_container").show()

  resetTimer: ->
    $("#timer").clearTimer()
    $("#small_timer").clearTimer()
    # hide modal
    @$(@el).modal('hide')
    $("#small_timer_container").hide()

    app.routers.main.navigate('home', true)