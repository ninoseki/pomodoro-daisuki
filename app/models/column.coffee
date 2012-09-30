Model = require './model'

module.exports = class Column extends Model
  defaults:
    title: "new"

  clear: ->
    @view.remove()
    @destroy()