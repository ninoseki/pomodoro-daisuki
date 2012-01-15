(function() {
  var BaseLanguage, less,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  less = require('less');

  BaseLanguage = require('./base').BaseLanguage;

  exports.LESSLanguage = (function(_super) {

    __extends(LESSLanguage, _super);

    function LESSLanguage() {
      LESSLanguage.__super__.constructor.apply(this, arguments);
    }

    LESSLanguage.prototype.compile = function(file, callback) {
      return this.readFile(file, function(error, data) {
        if (error != null) return callback(error);
        return less.render(data, function(error, css) {
          return callback(error, css);
        });
      });
    };

    return LESSLanguage;

  })(BaseLanguage);

}).call(this);
