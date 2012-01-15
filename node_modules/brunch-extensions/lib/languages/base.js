(function() {
  var async, fs, path,
    __slice = Array.prototype.slice;

  fs = require('fs');

  path = require('path');

  async = require('async');

  exports.BaseLanguage = (function() {

    BaseLanguage.prototype.queue = async.queue(fs.readFile, 5);

    function BaseLanguage(config) {
      this.config = config;
      null;
    }

    BaseLanguage.prototype.getRootPath = function() {
      var subPathes;
      subPathes = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return path.join.apply(path, [this.config.rootPath].concat(__slice.call(subPathes)));
    };

    BaseLanguage.prototype.getBuildPath = function() {
      var subPathes;
      subPathes = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return path.join.apply(path, [this.config.buildPath].concat(__slice.call(subPathes)));
    };

    BaseLanguage.prototype.readFile = function(file, callback) {
      return this.queue.push(file, function(error, data) {
        return callback(error, data.toString());
      });
    };

    BaseLanguage.prototype.compile = function(file, callback) {
      return this.readFile(file, callback);
    };

    return BaseLanguage;

  })();

}).call(this);
