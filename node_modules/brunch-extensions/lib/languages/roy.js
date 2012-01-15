(function() {
  var BaseLanguage, roy,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  roy = require('roy');

  BaseLanguage = require('./base').BaseLanguage;

  exports.RoyLanguage = (function(_super) {

    __extends(RoyLanguage, _super);

    function RoyLanguage() {
      RoyLanguage.__super__.constructor.apply(this, arguments);
    }

    RoyLanguage.prototype.compile = function(file, callback) {
      return this.readFile(file, function(error, data) {
        if (error != null) callback(error);
        try {
          return callback(null, (roy.compile(data)).output);
        } catch (error) {
          return callback(error);
        }
      });
    };

    return RoyLanguage;

  })(BaseLanguage);

}).call(this);
