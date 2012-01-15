(function() {
  var BaseLanguage, eco,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  eco = require('eco');

  BaseLanguage = require('./base').BaseLanguage;

  exports.EcoLanguage = (function(_super) {

    __extends(EcoLanguage, _super);

    function EcoLanguage() {
      EcoLanguage.__super__.constructor.apply(this, arguments);
    }

    EcoLanguage.prototype.compile = function(file, callback) {
      var _this = this;
      return this.readFile(file, function(error, data) {
        if (error != null) return callback(error);
        return callback(null, eco.compile(data));
      });
    };

    return EcoLanguage;

  })(BaseLanguage);

}).call(this);
