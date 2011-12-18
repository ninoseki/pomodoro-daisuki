window.app = {}
app.routers = {}
app.models = {}
app.collections = {}
app.views = {}
app.development = true

Notes = require('collections/notes_collection').Notes
Columns = require('collections/columns_collection').Columns
States = require('collections/states_collection').States
Pomodoros = require('collections/pomodoros_collection').Pomodoros

HomeView = require('views/home_view').HomeView
NotesView = require('views/notes_view').NotesView
NewNoteView = require('views/new_note_view').NewNoteView
ColumnsView = require('views/columns_view').ColumnsView
NewColumnView = require('views/new_column_view').NewColumnView
WorkingView = require('views/working_view').WorkingView
RestingView = require('views/resting_view').RestingView
StatsView = require('views/stats_view').StatsView

MainRouter = require('routers/main_router').MainRouter


# app bootstrapping on document ready
$(document).ready ->
    app.initialize = ->
        app.routers.main = new MainRouter()

        app.collections.notes = new Notes()
        app.collections.columns = new Columns()
        app.collections.states = new States()
        app.collections.pomodoros = new Pomodoros()

        app.views.home = new HomeView()
        app.views.notes = new NotesView()
        app.views.new_note = new NewNoteView()
        app.views.columns = new ColumnsView()
        app.views.new_column = new NewColumnView()
        app.views.working = new WorkingView()
        app.views.resting = new RestingView()
        app.views.stats = new StatsView()

        # fetch data from localStorage
        app.collections.states.fetch()
        currentStateName = app.collections.states.getCurrentStateName()

        # go to current-state
        currentStateName = if currentStateName == undefined then 'home' else currentStateName
        app.routers.main.navigate currentStateName, true if Backbone.history.getFragment() is ''
        
    app.initialize()
    Backbone.history.start()
