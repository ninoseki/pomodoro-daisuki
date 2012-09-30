View = require './view'
application = require 'application'
template = require './templates/stats'

module.exports = class StatsView extends View
  template: template
  el: "#modal"
  id: "stats"

  events:
    "click .close": "close"

  getRenderData: ->
    {
      title: "Weekly Stats",
      count: 0
    }

  afterRender: ->
    @showStatsGraph()
    @$el.modal(backdrop: 'static', show: true)

    this

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
      date = moment().day(i).format(application.settings.date_format)
      pomodoros = application.pomodoros.filter (pomodoro) ->
        return date == moment(parseInt(pomodoro.get('created_at'))).format(application.settings.date_format)
      stats[date] = pomodoros.length
    stats

  close: =>
    # hide modal
    @$el.modal('hide')

    application.router.navigate 'home', true