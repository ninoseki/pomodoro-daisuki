TimerConfig = require 'models/timer_config'

describe 'TimerConfig Model', ->

  beforeEach ->
    localStorage.clear()
    @timerConfig = new TimerConfig()

  it 'should set defaults', ->
    (expect @timerConfig.get('pomodoroDuration')).to.equal 25
    (expect @timerConfig.get('shortBreakDuration')).to.equal 5
    (expect @timerConfig.get('longBreakDuration')).to.equal 15

  it 'should update', ->
    data =
      pomodoroDuration    : 100
      shortBreakDuration  : 110
      longBreakDuration   : 120

    @timerConfig.update data

    (expect @timerConfig.get('pomodoroDuration')).to.equal 100
    (expect @timerConfig.get('shortBreakDuration')).to.equal 110
    (expect @timerConfig.get('longBreakDuration')).to.equal 120





