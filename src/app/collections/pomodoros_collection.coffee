Pomodoro = require('models/pomodoro_model').Pomodoro

class exports.Pomodoros extends Backbone.Collection

  model: Pomodoro

  initialize: ->
    @localStorage = new Store "pomodoros"

  clear: ->
    today = moment().format(app.settings.date_format)

    clone_models = _.clone @models
    _.each(clone_models, (pomodoro) ->
      date = moment(parseInt((pomodoro.get('created_at')))).format(format)
      if today > date
        pomodoro.destroy()
    )