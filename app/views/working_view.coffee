View = require './view'
application = require 'application'
template = require './templates/timer'

module.exports = class WorkingView extends View
  template: template
  el: "#timer-modal"

  events:
    "click #cancel": "resetTimer"
    "click #hide": "hideTimer"

  getRenderData: ->
    {
      title: "Working"
    }

  afterRender: ->
    @$el.find('#hide').show()
    @$el.modal(backdrop: 'static', show: true)

    this

  startTimer: (seconds) =>
    $('#timer').startTimer(
      seconds: seconds,
      reset: false,
      show_in_title: true,
      buzzer: @buzzer
    )
    $('#small-timer').startTimer(
      seconds: seconds,
      reset: false,
    )

  buzzer: =>
    # hide modal
    $("#small-timer-container").hide()
    @$el.modal('hide')

    # add pomodoro
    application.pomodoros.create created_at: new Date().getTime()
    # ring alarm
    application.audios.alarm.play()
    # show notification
    notification = webkitNotifications.createNotification(
      'images/tomato_32.png',
      'notification',
      'pomodoro is done!'
    )
    notification.show()

    application.router.navigate 'home', true

  hideTimer: ->
    @$el.modal('hide')
    $("#small-timer-container").show()

  resetTimer: ->
    $("#timer").clearTimer()
    $("#small-timer").clearTimer()
    # hide modal
    @$el.modal('hide')
    $("#small-timer-container").hide()

    application.router.navigate 'home', true