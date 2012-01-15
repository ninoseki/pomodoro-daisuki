class exports.Note extends Backbone.Model
    defaults:
        content : 'click here to write'
        w: 100
        h: 80
        x: 40
        y: 40

    clear: ->
        @destroy()
        @view.remove()