Pomodoro = require('models/pomodoro_model').Pomodoro

class exports.Pomodoros extends Backbone.Collection

    model: Pomodoro

    initialize: ->
        @localStorage = new Store "pomodoros"

    clear: ->
        format = 'yyyy-MM-dd'
        today = new Date().toString format

        clone_models = _.clone @models
        _.each(clone_models, (pomodoro) ->
            date = new Date(pomodoro.get 'created_at').toString format
            if today > date
                pomodoro.destroy()
        )