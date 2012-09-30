Collection = require './collection'
Pomodoro = require 'models/pomodoro'
application = require 'application'

module.exports = class Pomodoros extends Collection
  model: Pomodoro

  initialize: ->
    @localStorage = new Store "pomodoros"

  clear: ->
    today = moment().format(application.settings.date_format)

    clone_models = _.clone @models
    _.each(clone_models, (pomodoro) ->
      date = moment(parseInt((pomodoro.get('created_at')))).format(format)
      if today > date
        pomodoro.destroy()
    )