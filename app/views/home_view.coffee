View = require './view'
application = require 'application'
template = require './templates/home'

module.exports = class HomeView extends View
  template: template
  el: '#main'

  afterRender: ->
    for viewName in ['notes', 'columns', 'newNote']
      @$el.append application["#{viewName}View"].render().el

    $("#actions").append application.newColumnView.render().el