(function() {
  var async, fs, path, util;

  async = require('async');

  fs = require('fs');

  path = require('path');

  util = require('util');

  exports.copyFile = function(source, destination, callback) {
    var read, write;
    read = fs.createReadStream(source);
    write = fs.createWriteStream(destination);
    return util.pump(read, write, function() {
      return typeof callback === "function" ? callback() : void 0;
    });
  };

  exports.walkTreeAndCopyFiles = function(source, destination, callback) {
    return fs.readdir(source, function(error, files) {
      if (error) return callback(error);
      return async.forEach(files, function(file, next) {
        var destPath, sourcePath;
        if (file.match(/^\./)) return next();
        sourcePath = path.join(source, file);
        destPath = path.join(destination, file);
        return fs.stat(sourcePath, function(error, stats) {
          if (!error && stats.isDirectory()) {
            return fs.mkdir(destPath, 0755, function() {
              return exports.walkTreeAndCopyFiles(sourcePath, destPath, function(error, destPath) {
                if (destPath) {
                  return callback(error, destPath);
                } else {
                  return next();
                }
              });
            });
          } else {
            return exports.copyFile(sourcePath, destPath, function() {
              callback(error, destPath);
              return next();
            });
          }
        });
      }, callback);
    });
  };

}).call(this);
