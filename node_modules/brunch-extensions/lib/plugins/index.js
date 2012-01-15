(function() {
  var AssetsPlugin, BasePlugin;

  AssetsPlugin = require('./assets').AssetsPlugin;

  BasePlugin = require('./base').BasePlugin;

  module.exports = {
    AssetsPlugin: AssetsPlugin,
    BasePlugin: BasePlugin
  };

}).call(this);
