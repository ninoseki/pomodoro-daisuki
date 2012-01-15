{Column} = require('models/column_model')

class exports.Columns extends Backbone.Collection

  model: Column

  initialize: ->
    @localStorage = new Store "columns"
