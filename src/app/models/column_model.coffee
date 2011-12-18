class exports.Column extends Backbone.Model
    defaults:
        title: "new"
        
    clear: ->
        @view.remove()
        @destroy()