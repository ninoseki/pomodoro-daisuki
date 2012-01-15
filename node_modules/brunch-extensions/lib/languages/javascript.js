(function() {
  var BaseLanguage,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseLanguage = require('./base').BaseLanguage;

  exports.JavaScriptLanguage = (function(_super) {

    __extends(JavaScriptLanguage, _super);

    function JavaScriptLanguage() {
      JavaScriptLanguage.__super__.constructor.apply(this, arguments);
    }

    return JavaScriptLanguage;

  })(BaseLanguage);

}).call(this);
