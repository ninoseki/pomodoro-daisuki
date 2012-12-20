Model = require './model'

module.exports = class TimerConfig extends Model
  initialize: ->
    @set 'pomodoroDuration', localStorage.getItem('pomodoroDuration') ? 25
    @set 'shortBreakDuration', localStorage.getItem('shortBreakDuration') ? 5
    @set 'longBreakDuration', localStorage.getItem('longBreakDuration') ? 15

  update: (data) ->
    for key, value of data
      localStorage.setItem(key, value)
      @set key, value