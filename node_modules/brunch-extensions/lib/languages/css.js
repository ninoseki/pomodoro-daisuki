(function() {
  var BaseLanguage,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseLanguage = require('./base').BaseLanguage;

  exports.CSSLanguage = (function(_super) {

    __extends(CSSLanguage, _super);

    function CSSLanguage() {
      CSSLanguage.__super__.constructor.apply(this, arguments);
    }

    return CSSLanguage;

  })(BaseLanguage);

}).call(this);
