timerTemplate = require('templates/timer')

class exports.RestingView extends Backbone.View
  el: "#modal"

  events:
    "click #cancel": "resetTimer"

  render: ->
    @$(@el).html timerTemplate(title: "resting")
    @$(@el).modal(backdrop: 'static', show: true)

    @

  startTimer: (seconds) =>
      $('#timer').startTimer(
        seconds: seconds,
        reset: false,
        show_in_title: true,
        buzzer: @buzzer
      )

  buzzer: =>
    # ring alarm
    app.audios.alarm.play()

    # show notification
    notification = webkitNotifications.createNotification(
      'build/web/img/tomato_32.png',
      'notification',
      'resting is done!'
    )
    notification.show()

    # hide modal
    @$(@el).modal('hide')

    app.routers.main.navigate('home', true)

  resetTimer: ->
    $("#timer").clearTimer()

    # hide modal
    @$(@el).modal('hide')

    app.routers.main.navigate('home', true)