newColumnTemplate = require('templates/new_column')

class exports.NewColumnView extends Backbone.View
    id: "new-column"

    events:
        "click #add-column": "create"

    render: ->
        $(@el).html newColumnTemplate()
        @

    create: ->
        app.collections.columns.create index: app.collections.columns.length