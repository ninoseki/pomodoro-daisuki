homeTemplate = require('views/templates/home')

class exports.HomeView extends Backbone.View
  el: '#main'

  render: ->
    @$(@el).html ""

    @$(@el).append app.views.notes.render().el
    @$(@el).append app.views.columns.render().el
    @$(@el).append app.views.new_note.render().el

    $("#actions").append app.views.new_column.render().el

    @
