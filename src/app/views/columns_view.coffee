ColumnView = require('views/column_view').ColumnView
columnsTemplate = require('templates/columns')

class exports.ColumnsView extends Backbone.View
    id: "columns"

    initialize: ->
        app.collections.columns.bind 'add', @addOne
        app.collections.columns.bind 'reset', @addAll
        app.collections.columns.bind 'remove', @reindex
        
    render: ->
        $(@el).html columnsTemplate()
        @

    adjustSize: ->
        width = $('body').width()
        length = app.collections.columns.length
        column_width = width / length

        $('.column').each (index) ->
            $(@).width(column_width)
            $(@).css('left', index * column_width)

    reindex: =>
        app.collections.columns.each (column, index) ->
            column.save index: index

        @adjustSize()

    addOne: (column) =>
        view = new ColumnView model: column
        $(@el).append view.render().el

        @adjustSize()

    addAll: =>
        app.collections.columns.each @addOne