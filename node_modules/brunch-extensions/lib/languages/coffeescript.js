(function() {
  var BaseLanguage, coffeescript,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  coffeescript = require('coffee-script');

  BaseLanguage = require('./base').BaseLanguage;

  exports.CoffeeScriptLanguage = (function(_super) {

    __extends(CoffeeScriptLanguage, _super);

    function CoffeeScriptLanguage() {
      CoffeeScriptLanguage.__super__.constructor.apply(this, arguments);
    }

    CoffeeScriptLanguage.prototype.compile = function(file, callback) {
      return this.readFile(file, function(error, data) {
        if (error != null) return callback(error);
        try {
          return callback(null, coffeescript.compile(data));
        } catch (error) {
          return callback(error);
        }
      });
    };

    return CoffeeScriptLanguage;

  })(BaseLanguage);

}).call(this);
