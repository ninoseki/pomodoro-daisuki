View = require './view'
TimerConfig = require '../models/timer_config'
template = require './templates/options'

module.exports = class OptionsView extends View
  template: template
  el: "#options-modal"

  events:
    "click #update": "update"

  initialize: ->
    @timerConfig = new TimerConfig()

  getRenderData: ->
    @timerConfig.toJSON()

  update: ->
    data =
      pomodoroDuration    : $('#inputPomodoroDuration').val()
      shortBreakDuration  : $('#inputShortBreakDuration').val()
      longBreakDuration   : $('#inputLongBreakDuration').val()

    @timerConfig.update data
