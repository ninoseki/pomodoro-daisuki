{BrunchApplication} = require 'helpers'
{Notes} = require 'collections/notes_collection'
{Columns} = require 'collections/columns_collection'
{States} = require 'collections/states_collection'
{Pomodoros} = require 'collections/pomodoros_collection'
{HomeView} = require 'views/home_view'
{NotesView} = require 'views/notes_view'
{NewNoteView} = require 'views/new_note_view'
{ColumnsView} = require 'views/columns_view'
{NewColumnView} = require 'views/new_column_view'
{WorkingView} = require 'views/working_view'
{RestingView} = require 'views/resting_view'
{StatsView} = require 'views/stats_view'
{MainRouter} = require 'routers/main_router'


class exports.Application extends BrunchApplication
  # This callback would be executed on document ready event.
  initialize: ->
    @routers.main = new MainRouter()

    @collections.notes = new Notes()
    @collections.columns = new Columns()
    @collections.states = new States()
    @collections.pomodoros = new Pomodoros()

    @views.home = new HomeView()
    @views.notes = new NotesView()
    @views.new_note = new NewNoteView()
    @views.columns = new ColumnsView()
    @views.new_column = new NewColumnView()
    @views.working = new WorkingView()
    @views.resting = new RestingView()
    @views.stats = new StatsView()

    @audios = {}
    @audios.alarm = new Audio("audios/alarm.wav")

    @settings = {}
    @settings.date_format = "YYYY-MM-DD"

    @development = true

    Backbone.history.start()

    # fetch data from localStorage
    @collections.states.fetch()
    currentStateName = app.collections.states.getCurrentStateName()

    # go to current-state
    currentStateName = if currentStateName == undefined then 'home' else currentStateName
    @routers.main.navigate currentStateName, true if Backbone.history.getFragment() is ''


window.app = new exports.Application
