statsTemplate = require('./templates/stats')

class exports.StatsView extends Backbone.View
  el: "#modal"

  id: "stats"

  events:
    "click .close": "close"

  render: ->
    @$(@el).html statsTemplate(title: "Weekly Stats", count: 0)
    @showStatsGraph()
    @$(@el).modal(backdrop: 'static', show: true)
    @

  showStatsGraph: ->
    stats = @getWeeklyStats()

    chart = new Highcharts.Chart
      chart:
        renderTo: "stats-graph"
        defaultSeriesType: "column"
        height: 400
        width: 560
      title:
        text: ""
      xAxis:
        categories: (key for key of stats)
        labels:
          formatter: ->
            return @value.substr(5) #  => "MM-DD"
      yAxis:
        title: ""
      series:
        [{
          name: "number of pomodoros"
          data: (value for key, value of stats)
        }]

  getWeeklyStats: ->
    stats = {}
    for i in [0..6]
      date = moment().day(i).format(app.settings.date_format)
      pomodoros = app.collections.pomodoros.filter (pomodoro) ->
        return date == moment(parseInt(pomodoro.get('created_at'))).format(app.settings.date_format)
      stats[date] = pomodoros.length
    stats

  close: =>
    # hide modal
    @$(@el).modal('hide')

    app.routers.main.navigate('home', true)