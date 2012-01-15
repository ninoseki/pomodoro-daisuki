(function() {
  var path,
    __slice = Array.prototype.slice;

  path = require('path');

  exports.BasePlugin = (function() {

    function BasePlugin(config) {
      this.config = config;
      null;
    }

    BasePlugin.prototype.getRootPath = function() {
      var subPathes;
      subPathes = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return path.join.apply(path, [this.config.rootPath].concat(__slice.call(subPathes)));
    };

    BasePlugin.prototype.getBuildPath = function() {
      var subPathes;
      subPathes = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return path.join.apply(path, [this.config.buildPath].concat(__slice.call(subPathes)));
    };

    BasePlugin.prototype.load = function(callback) {
      return callback();
    };

    return BasePlugin;

  })();

}).call(this);
