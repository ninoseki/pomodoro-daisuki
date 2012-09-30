View = require './view'
application = require 'application'
template = require './templates/timer'

module.exports = class RestingView extends View
  template: template
  el: "#modal"

  events:
    "click #cancel": "resetTimer"

  getRenderData: ->
    {
      title: "Resting"
    }

  afterRender: ->
    $('#hide').hide()
    @$el.modal(backdrop: 'static', show: true)

    this

  startTimer: (seconds) =>
    $('#timer').startTimer(
      seconds: seconds,
      reset: false,
      show_in_title: true,
      buzzer: @buzzer
    )

  buzzer: =>
    # ring alarm
    application.audios.alarm.play()

    # show notification
    notification = webkitNotifications.createNotification(
      'images/tomato_32.png',
      'notification',
      'resting is done!'
    )
    notification.show()

    # hide modal
    @$el.modal('hide')

    application.routers.main.navigate('home', true)

  resetTimer: ->
    $("#timer").clearTimer()

    # hide modal
    @$el.modal('hide')

    application.router.navigate 'home', true