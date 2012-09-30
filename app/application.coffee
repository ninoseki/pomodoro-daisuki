# The application bootstrapper.
Application =
  initialize: ->

    Notes = require 'collections/notes'
    Columns = require 'collections/columns'
    States = require 'collections/states'
    Pomodoros = require 'collections/pomodoros'

    HomeView = require 'views/home_view'
    NotesView = require 'views/notes_view'
    NewNoteView = require 'views/new_note_view'
    ColumnsView = require 'views/columns_view'
    NewColumnView = require 'views/new_column_view'
    WorkingView = require 'views/working_view'
    RestingView = require 'views/resting_view'
    StatsView = require 'views/stats_view'
    MainRouter = require 'routers/main_router'

    @router = new MainRouter()

    @states = new States()
    @columns = new Columns()
    @notes = new Notes()
    @pomodoros = new Pomodoros()

    @homeView = new HomeView()
    @notesView = new NotesView()
    @newNoteView = new NewNoteView()
    @columnsView = new ColumnsView()
    @newColumnView = new NewColumnView()
    @workingView = new WorkingView()
    @restingView = new RestingView()
    @statsView = new StatsView()

    @audios = {}
    @audios.alarm = new Audio("audios/alarm.wav")

    @settings = {}
    @settings.date_format = "YYYY-MM-DD"

    @development = true

    # Freeze the object
    Object.freeze? Application

module.exports = Application