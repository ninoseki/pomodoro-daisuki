statsTemplate = require('templates/stats')

class exports.StatsView extends Backbone.View
  el: "#modal"

  events:
    "click .close": "close"

  render: ->
    @$(@el).html statsTemplate(title: "stats", count: app.collections.pomodoros.length)
    @$(@el).modal(backdrop: 'static', show: true)
    @

  close: =>
    # hide modal
    @$(@el).modal('hide')

    app.routers.main.navigate('home', true)