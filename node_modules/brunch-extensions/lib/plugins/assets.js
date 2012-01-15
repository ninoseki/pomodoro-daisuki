(function() {
  var BasePlugin, async, helpers, mkdirp, path,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  async = require('async');

  mkdirp = require('mkdirp');

  path = require('path');

  BasePlugin = require('./base').BasePlugin;

  helpers = require('../helpers');

  exports.AssetsPlugin = (function(_super) {

    __extends(AssetsPlugin, _super);

    function AssetsPlugin() {
      AssetsPlugin.__super__.constructor.apply(this, arguments);
    }

    AssetsPlugin.prototype.load = function(callback) {
      var from, to;
      from = path.resolve(this.getRootPath('app', 'assets'));
      to = path.resolve(this.getBuildPath(''));
      return helpers.walkTreeAndCopyFiles(from, to, callback);
    };

    return AssetsPlugin;

  })(BasePlugin);

}).call(this);
