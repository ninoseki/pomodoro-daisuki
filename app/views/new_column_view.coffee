View = require './view'
template = require './templates/new_column'
application = require 'application'

module.exports = class NewColumnView extends View
  template: template
  id: "new-column"

  events:
    "click #add-column": "create"

  create: ->
    application.columns.create index: application.columns.length