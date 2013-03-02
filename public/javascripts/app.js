(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle) {
    for (var key in bundle) {
      if (has(bundle, key)) {
        modules[key] = bundle[key];
      }
    }
  }

  globals.require = require;
  globals.require.define = define;
  globals.require.brunch = true;
})();

window.require.define({"application": function(exports, require, module) {
  var Application;

  Application = {
    initialize: function() {
      var Columns, ColumnsView, HomeView, MainRouter, NewColumnView, NewNoteView, Notes, NotesView, Pomodoros, RestingView, States, StatsView, WorkingView;
      Notes = require('collections/notes');
      Columns = require('collections/columns');
      States = require('collections/states');
      Pomodoros = require('collections/pomodoros');
      HomeView = require('views/home_view');
      NotesView = require('views/notes_view');
      NewNoteView = require('views/new_note_view');
      ColumnsView = require('views/columns_view');
      NewColumnView = require('views/new_column_view');
      WorkingView = require('views/working_view');
      RestingView = require('views/resting_view');
      StatsView = require('views/stats_view');
      MainRouter = require('routers/main_router');
      this.router = new MainRouter();
      this.states = new States();
      this.columns = new Columns();
      this.notes = new Notes();
      this.pomodoros = new Pomodoros();
      this.homeView = new HomeView();
      this.notesView = new NotesView();
      this.newNoteView = new NewNoteView();
      this.columnsView = new ColumnsView();
      this.newColumnView = new NewColumnView();
      this.workingView = new WorkingView();
      this.restingView = new RestingView();
      this.statsView = new StatsView();
      this.audios = {};
      this.audios.alarm = new Audio("audios/alarm.wav");
      this.settings = {};
      this.settings.date_format = "YYYY-MM-DD";
      this.development = false;
      return typeof Object.freeze === "function" ? Object.freeze(Application) : void 0;
    }
  };

  module.exports = Application;
  
}});

window.require.define({"collections/collection": function(exports, require, module) {
  var Collection,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    return Collection;

  })(Backbone.Collection);
  
}});

window.require.define({"collections/columns": function(exports, require, module) {
  var Collection, Column, Columns,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('./collection');

  Column = require('models/column');

  module.exports = Columns = (function(_super) {

    __extends(Columns, _super);

    function Columns() {
      return Columns.__super__.constructor.apply(this, arguments);
    }

    Columns.prototype.model = Column;

    Columns.prototype.initialize = function() {
      return this.localStorage = new Store("columns");
    };

    return Columns;

  })(Collection);
  
}});

window.require.define({"collections/notes": function(exports, require, module) {
  var Collection, Note, Notes,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('./collection');

  Note = require('models/note');

  module.exports = Notes = (function(_super) {

    __extends(Notes, _super);

    function Notes() {
      return Notes.__super__.constructor.apply(this, arguments);
    }

    Notes.prototype.model = Note;

    Notes.prototype.initialize = function() {
      return this.localStorage = new Store("notes");
    };

    return Notes;

  })(Collection);
  
}});

window.require.define({"collections/pomodoros": function(exports, require, module) {
  var Collection, Pomodoro, Pomodoros, application,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('./collection');

  Pomodoro = require('models/pomodoro');

  application = require('application');

  module.exports = Pomodoros = (function(_super) {

    __extends(Pomodoros, _super);

    function Pomodoros() {
      return Pomodoros.__super__.constructor.apply(this, arguments);
    }

    Pomodoros.prototype.model = Pomodoro;

    Pomodoros.prototype.initialize = function() {
      return this.localStorage = new Store("pomodoros");
    };

    Pomodoros.prototype.clear = function() {
      var clone_models, today;
      today = moment().format(application.settings.date_format);
      clone_models = _.clone(this.models);
      return _.each(clone_models, function(pomodoro) {
        var date;
        date = moment(parseInt(pomodoro.get('created_at'))).format(format);
        if (today > date) {
          return pomodoro.destroy();
        }
      });
    };

    return Pomodoros;

  })(Collection);
  
}});

window.require.define({"collections/states": function(exports, require, module) {
  var Collection, State, States,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('./collection');

  State = require('models/state');

  module.exports = States = (function(_super) {

    __extends(States, _super);

    function States() {
      return States.__super__.constructor.apply(this, arguments);
    }

    States.prototype.model = State;

    States.prototype.initialize = function() {
      return this.localStorage = new Store("state");
    };

    States.prototype.getCurrentState = function() {
      var first;
      first = this.first();
      if (first === void 0) {
        first = this.create();
      }
      return first;
    };

    States.prototype.getCurrentStateName = function() {
      var currentState;
      currentState = this.getCurrentState();
      return currentState.get('name');
    };

    States.prototype.setCurrentStateName = function(name) {
      var currentState;
      currentState = this.getCurrentState();
      return currentState.save({
        name: name
      });
    };

    return States;

  })(Collection);
  
}});

window.require.define({"initialize": function(exports, require, module) {
  var application;

  application = require('application');

  $(function() {
    var currentStateName;
    application.initialize();
    Backbone.history.start();
    application.states.fetch();
    currentStateName = application.states.getCurrentStateName();
    currentStateName = currentStateName === void 0 ? 'home' : currentStateName;
    if (Backbone.history.getFragment() === '') {
      return application.router.navigate(currentStateName, true);
    }
  });
  
}});

window.require.define({"models/column": function(exports, require, module) {
  var Column, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('./model');

  module.exports = Column = (function(_super) {

    __extends(Column, _super);

    function Column() {
      return Column.__super__.constructor.apply(this, arguments);
    }

    Column.prototype.defaults = {
      title: "new"
    };

    Column.prototype.clear = function() {
      this.view.remove();
      return this.destroy();
    };

    return Column;

  })(Model);
  
}});

window.require.define({"models/model": function(exports, require, module) {
  var Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      return Model.__super__.constructor.apply(this, arguments);
    }

    return Model;

  })(Backbone.Model);
  
}});

window.require.define({"models/note": function(exports, require, module) {
  var Model, Note,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('./model');

  module.exports = Note = (function(_super) {

    __extends(Note, _super);

    function Note() {
      return Note.__super__.constructor.apply(this, arguments);
    }

    Note.prototype.defaults = {
      content: 'click here to write',
      w: 100,
      h: 80,
      x: 40,
      y: 40
    };

    Note.prototype.clear = function() {
      this.destroy();
      return this.view.remove();
    };

    return Note;

  })(Model);
  
}});

window.require.define({"models/pomodoro": function(exports, require, module) {
  var Model, Pomodoro,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('./model');

  module.exports = Pomodoro = (function(_super) {

    __extends(Pomodoro, _super);

    function Pomodoro() {
      return Pomodoro.__super__.constructor.apply(this, arguments);
    }

    return Pomodoro;

  })(Model);
  
}});

window.require.define({"models/state": function(exports, require, module) {
  var Model, State,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('./model');

  module.exports = State = (function(_super) {

    __extends(State, _super);

    function State() {
      return State.__super__.constructor.apply(this, arguments);
    }

    return State;

  })(Model);
  
}});

window.require.define({"models/timer_config": function(exports, require, module) {
  var Model, TimerConfig,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('./model');

  module.exports = TimerConfig = (function(_super) {

    __extends(TimerConfig, _super);

    function TimerConfig() {
      return TimerConfig.__super__.constructor.apply(this, arguments);
    }

    TimerConfig.prototype.initialize = function() {
      var _ref, _ref1, _ref2;
      this.set('pomodoroDuration', (_ref = localStorage.getItem('pomodoroDuration')) != null ? _ref : 25);
      this.set('shortBreakDuration', (_ref1 = localStorage.getItem('shortBreakDuration')) != null ? _ref1 : 5);
      return this.set('longBreakDuration', (_ref2 = localStorage.getItem('longBreakDuration')) != null ? _ref2 : 15);
    };

    TimerConfig.prototype.update = function(data) {
      var key, value, _results;
      _results = [];
      for (key in data) {
        value = data[key];
        localStorage.setItem(key, value);
        _results.push(this.set(key, value));
      }
      return _results;
    };

    return TimerConfig;

  })(Model);
  
}});

window.require.define({"routers/main_router": function(exports, require, module) {
  var MainRouter, TimerConfig, application,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  application = require('application');

  TimerConfig = require('../models/timer_config');

  module.exports = MainRouter = (function(_super) {

    __extends(MainRouter, _super);

    function MainRouter() {
      return MainRouter.__super__.constructor.apply(this, arguments);
    }

    MainRouter.prototype.routes = {
      "home": "home",
      "home/:type": "home",
      "working": "working",
      "resting/:restType": "resting",
      "stats": "stats",
      "small-timer": "smallTimer"
    };

    MainRouter.prototype.initialize = function() {
      return this.timerConfig = new TimerConfig();
    };

    MainRouter.prototype.home = function(type) {
      application.homeView.render();
      application.notes.fetch();
      application.columns.fetch();
      if (type !== 'onWorking') {
        return application.states.setCurrentStateName('home');
      }
    };

    MainRouter.prototype.working = function() {
      var duration;
      application.workingView.render();
      duration = this.timerConfig.get('pomodoroDuration');
      application.workingView.startTimer(application.development === true ? 10 : duration * 60);
      return application.states.setCurrentStateName('working');
    };

    MainRouter.prototype.resting = function(restType) {
      var duration;
      application.restingView.render();
      duration = this.timerConfig.get(restType + 'BreakDuration');
      application.restingView.startTimer(application.development === true ? 10 : duration * 60);
      return application.states.setCurrentStateName('resting/' + restType);
    };

    MainRouter.prototype.stats = function() {
      application.pomodoros.fetch();
      return application.statsView.render();
    };

    MainRouter.prototype.smallTimer = function() {
      $("#timer-modal").modal("show");
      return application.router.navigate('home/onWorking', true);
    };

    return MainRouter;

  })(Backbone.Router);
  
}});

window.require.define({"views/column_view": function(exports, require, module) {
  var ColumnView, View, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('./view');

  template = require('./templates/column');

  module.exports = ColumnView = (function(_super) {

    __extends(ColumnView, _super);

    function ColumnView() {
      this.update = __bind(this.update, this);
      return ColumnView.__super__.constructor.apply(this, arguments);
    }

    ColumnView.prototype.template = template;

    ColumnView.prototype.className = "column";

    ColumnView.prototype.events = {
      "dblclick h2": "edit",
      "blur input": "update",
      "click .column-destroy": "clear"
    };

    ColumnView.prototype.initialize = function() {
      this.model.bind('change', this.render);
      return this.model.view = this;
    };

    ColumnView.prototype.getRenderData = function() {
      return {
        column: this.model.toJSON()
      };
    };

    ColumnView.prototype.edit = function() {
      this.$el.addClass("editing");
      return $('.title-input').focus();
    };

    ColumnView.prototype.update = function() {
      var title;
      title = this.$('.title-input').val() === '' ? "new" : this.$('.title-input').val();
      this.model.save({
        title: title
      });
      return this.$el.removeClass("editing");
    };

    ColumnView.prototype.remove = function() {
      return this.$el.remove();
    };

    ColumnView.prototype.clear = function() {
      return this.model.clear();
    };

    return ColumnView;

  })(View);
  
}});

window.require.define({"views/columns_view": function(exports, require, module) {
  var ColumnView, ColumnsView, View, application, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('./view');

  ColumnView = require('./column_view');

  application = require('application');

  template = require('./templates/columns');

  module.exports = ColumnsView = (function(_super) {

    __extends(ColumnsView, _super);

    function ColumnsView() {
      this.addAll = __bind(this.addAll, this);

      this.addOne = __bind(this.addOne, this);

      this.reindex = __bind(this.reindex, this);
      return ColumnsView.__super__.constructor.apply(this, arguments);
    }

    ColumnsView.prototype.template = template;

    ColumnsView.prototype.id = "columns";

    ColumnsView.prototype.initialize = function() {
      application.columns.bind('add', this.addOne);
      application.columns.bind('reset', this.addAll);
      return application.columns.bind('remove', this.reindex);
    };

    ColumnsView.prototype.adjustSize = function() {
      var column_width, length, width;
      width = $('body').width();
      length = application.columns.length;
      column_width = width / length;
      return $('.column').each(function(index) {
        $(this).width(column_width);
        return $(this).css('left', index * column_width);
      });
    };

    ColumnsView.prototype.reindex = function() {
      application.columns.each(function(column, index) {
        return column.save({
          index: index
        });
      });
      return this.adjustSize();
    };

    ColumnsView.prototype.addOne = function(column) {
      var view;
      view = new ColumnView({
        model: column
      });
      this.$el.append(view.render().el);
      return this.adjustSize();
    };

    ColumnsView.prototype.addAll = function() {
      return application.columns.each(this.addOne);
    };

    return ColumnsView;

  })(View);
  
}});

window.require.define({"views/home_view": function(exports, require, module) {
  var HomeView, View, application, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('./view');

  application = require('application');

  template = require('./templates/home');

  module.exports = HomeView = (function(_super) {

    __extends(HomeView, _super);

    function HomeView() {
      return HomeView.__super__.constructor.apply(this, arguments);
    }

    HomeView.prototype.template = template;

    HomeView.prototype.el = '#main';

    HomeView.prototype.afterRender = function() {
      var viewName, _i, _len, _ref;
      _ref = ['notes', 'columns', 'newNote'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        viewName = _ref[_i];
        this.$el.append(application["" + viewName + "View"].render().el);
      }
      return $("#actions").append(application.newColumnView.render().el);
    };

    return HomeView;

  })(View);
  
}});

window.require.define({"views/new_column_view": function(exports, require, module) {
  var NewColumnView, View, application, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('./view');

  template = require('./templates/new_column');

  application = require('application');

  module.exports = NewColumnView = (function(_super) {

    __extends(NewColumnView, _super);

    function NewColumnView() {
      return NewColumnView.__super__.constructor.apply(this, arguments);
    }

    NewColumnView.prototype.template = template;

    NewColumnView.prototype.id = "new-column";

    NewColumnView.prototype.events = {
      "click #add-column": "create"
    };

    NewColumnView.prototype.create = function() {
      return application.columns.create({
        index: application.columns.length
      });
    };

    return NewColumnView;

  })(View);
  
}});

window.require.define({"views/new_note_view": function(exports, require, module) {
  var NewNoteView, View, application, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('./view');

  application = require('application');

  template = require('./templates/new_note');

  module.exports = NewNoteView = (function(_super) {

    __extends(NewNoteView, _super);

    function NewNoteView() {
      return NewNoteView.__super__.constructor.apply(this, arguments);
    }

    NewNoteView.prototype.template = template;

    NewNoteView.prototype.id = "new-note";

    NewNoteView.prototype.events = {
      "click .addNote": "create"
    };

    NewNoteView.prototype.afterRender = function() {
      return this.delegateEvents();
    };

    NewNoteView.prototype.create = function(event) {
      var color;
      color = event.currentTarget.className.split(" ")[1];
      return application.notes.create({
        color: color
      });
    };

    return NewNoteView;

  })(View);
  
}});

window.require.define({"views/note_view": function(exports, require, module) {
  var NoteView, View, application, noteTemplate, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  noteTemplate = require('views/templates/note');

  View = require('./view');

  application = require('application');

  template = require('./templates/note');

  module.exports = NoteView = (function(_super) {

    __extends(NoteView, _super);

    function NoteView() {
      return NoteView.__super__.constructor.apply(this, arguments);
    }

    NoteView.prototype.template = template;

    NoteView.prototype.className = "note white";

    NoteView.prototype.events = {
      "mouseover": "mouseover",
      "mouseout": "mouseout",
      "focus textarea": "focus",
      "blur textarea": "blur",
      "keyup textarea": "updateContent",
      "dragstop": "updatePosition",
      "resize": "updateSize",
      "click .delete": "clear"
    };

    NoteView.prototype.initialize = function() {
      return this.model.view = this;
    };

    NoteView.prototype.afterRender = function() {
      this.$el.css({
        "-webkit-transform": "rotate(-" + (this.model.get('angle')) + "deg)",
        "-moz-transform": "rotate(-" + (this.model.get('angle')) + "deg)",
        "width": this.model.get('w'),
        "height": this.model.get('h'),
        "left": this.model.get('x'),
        "top": this.model.get('y'),
        "position": "absolute"
      });
      return this.$el.draggable({
        containment: 'parent',
        distance: 10,
        opacity: 0.75
      }).resizable({
        containment: 'parent'
      });
    };

    NoteView.prototype.getRenderData = function() {
      return {
        note: this.model.toJSON()
      };
    };

    NoteView.prototype.mouseout = function(event) {
      return this.$('.delete').hide();
    };

    NoteView.prototype.mouseover = function(event) {
      return this.$('.delete').show();
    };

    NoteView.prototype.focus = function(event) {
      if (event.currentTarget.value === 'click here to write') {
        return event.currentTarget.value = '';
      }
    };

    NoteView.prototype.blur = function(event) {
      if (event.currentTarget.value === '') {
        return event.currentTarget.value = 'click here to write';
      }
    };

    NoteView.prototype.updatePosition = function(event, ui) {
      var h, w, x, y;
      x = ui.position.left;
      y = ui.position.top;
      w = this.$el.width();
      h = this.$el.height();
      return this.model.save({
        x: x,
        y: y,
        w: w,
        h: h
      });
    };

    NoteView.prototype.updateSize = function(event, ui) {
      var h, w;
      w = this.$el.width();
      h = this.$el.height();
      return this.model.save({
        w: w,
        h: h
      });
    };

    NoteView.prototype.updateContent = function(event) {
      var content;
      content = event.currentTarget.value;
      return this.model.save({
        content: content
      });
    };

    NoteView.prototype.remove = function() {
      return this.$el.remove();
    };

    NoteView.prototype.clear = function() {
      return this.model.clear();
    };

    return NoteView;

  })(View);
  
}});

window.require.define({"views/notes_view": function(exports, require, module) {
  var NoteView, NotesView, View, application, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('./view');

  application = require('application');

  NoteView = require('./note_view');

  template = require('./templates/notes');

  module.exports = NotesView = (function(_super) {

    __extends(NotesView, _super);

    function NotesView() {
      this.addAll = __bind(this.addAll, this);

      this.addOne = __bind(this.addOne, this);
      return NotesView.__super__.constructor.apply(this, arguments);
    }

    NotesView.prototype.template = template;

    NotesView.prototype.id = "notes";

    NotesView.prototype.initialize = function() {
      application.notes.bind('add', this.addOne);
      return application.notes.bind('reset', this.addAll);
    };

    NotesView.prototype.addOne = function(note) {
      var view;
      view = new NoteView({
        model: note
      });
      return this.$el.append(view.render().el);
    };

    NotesView.prototype.addAll = function() {
      return application.notes.each(this.addOne);
    };

    return NotesView;

  })(View);
  
}});

window.require.define({"views/options_view": function(exports, require, module) {
  var OptionsView, TimerConfig, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('./view');

  TimerConfig = require('../models/timer_config');

  template = require('./templates/options');

  module.exports = OptionsView = (function(_super) {

    __extends(OptionsView, _super);

    function OptionsView() {
      return OptionsView.__super__.constructor.apply(this, arguments);
    }

    OptionsView.prototype.template = template;

    OptionsView.prototype.el = "#options-modal";

    OptionsView.prototype.events = {
      "click #update": "update"
    };

    OptionsView.prototype.initialize = function() {
      return this.timerConfig = new TimerConfig();
    };

    OptionsView.prototype.getRenderData = function() {
      return this.timerConfig.toJSON();
    };

    OptionsView.prototype.update = function() {
      var data;
      data = {
        pomodoroDuration: $('#inputPomodoroDuration').val(),
        shortBreakDuration: $('#inputShortBreakDuration').val(),
        longBreakDuration: $('#inputLongBreakDuration').val()
      };
      return this.timerConfig.update(data);
    };

    return OptionsView;

  })(View);
  
}});

window.require.define({"views/resting_view": function(exports, require, module) {
  var RestingView, View, application, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('./view');

  application = require('application');

  template = require('./templates/timer');

  module.exports = RestingView = (function(_super) {

    __extends(RestingView, _super);

    function RestingView() {
      this.buzzer = __bind(this.buzzer, this);

      this.startTimer = __bind(this.startTimer, this);
      return RestingView.__super__.constructor.apply(this, arguments);
    }

    RestingView.prototype.template = template;

    RestingView.prototype.el = "#timer-modal";

    RestingView.prototype.events = {
      "click #cancel": "resetTimer"
    };

    RestingView.prototype.getRenderData = function() {
      return {
        title: "Resting"
      };
    };

    RestingView.prototype.afterRender = function() {
      $('#hide').hide();
      this.$el.modal({
        backdrop: 'static',
        show: true
      });
      return this;
    };

    RestingView.prototype.startTimer = function(seconds) {
      return $('#timer').startTimer({
        seconds: seconds,
        reset: false,
        show_in_title: true,
        buzzer: this.buzzer
      });
    };

    RestingView.prototype.buzzer = function() {
      var notification;
      application.audios.alarm.play();
      notification = webkitNotifications.createNotification('images/tomato_32.png', 'notification', 'resting is done!');
      notification.show();
      this.$el.modal('hide');
      return application.router.navigate('home', true);
    };

    RestingView.prototype.resetTimer = function() {
      $("#timer").clearTimer();
      this.$el.modal('hide');
      return application.router.navigate('home', true);
    };

    return RestingView;

  })(View);
  
}});

window.require.define({"views/stats_view": function(exports, require, module) {
  var StatsView, View, application, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('./view');

  application = require('application');

  template = require('./templates/stats');

  module.exports = StatsView = (function(_super) {

    __extends(StatsView, _super);

    function StatsView() {
      this.close = __bind(this.close, this);
      return StatsView.__super__.constructor.apply(this, arguments);
    }

    StatsView.prototype.template = template;

    StatsView.prototype.el = "#stats-modal";

    StatsView.prototype.id = "stats";

    StatsView.prototype.events = {
      "click .close": "close"
    };

    StatsView.prototype.getRenderData = function() {
      return {
        title: "Weekly Stats",
        count: 0
      };
    };

    StatsView.prototype.afterRender = function() {
      this.$el.modal({
        backdrop: 'static',
        show: true
      });
      this.showStatsGraph();
      return this;
    };

    StatsView.prototype.showStatsGraph = function() {
      var chart, key, stats, value;
      stats = this.getWeeklyStats();
      return chart = new Highcharts.Chart({
        chart: {
          renderTo: "stats-graph",
          defaultSeriesType: "column",
          height: 400,
          width: 560
        },
        title: {
          text: ""
        },
        xAxis: {
          categories: (function() {
            var _results;
            _results = [];
            for (key in stats) {
              _results.push(key);
            }
            return _results;
          })(),
          labels: {
            formatter: function() {
              return this.value.substr(5);
            }
          }
        },
        yAxis: {
          title: ""
        },
        series: [
          {
            name: "number of pomodoros",
            data: (function() {
              var _results;
              _results = [];
              for (key in stats) {
                value = stats[key];
                _results.push(value);
              }
              return _results;
            })()
          }
        ]
      });
    };

    StatsView.prototype.getWeeklyStats = function() {
      var date, i, pomodoros, stats, _i;
      stats = {};
      for (i = _i = 0; _i <= 6; i = ++_i) {
        date = moment().day(i).format(application.settings.date_format);
        pomodoros = application.pomodoros.filter(function(pomodoro) {
          return date === moment(parseInt(pomodoro.get('created_at'))).format(application.settings.date_format);
        });
        stats[date] = pomodoros.length;
      }
      return stats;
    };

    StatsView.prototype.close = function() {
      var currentStateName;
      this.$el.modal('hide');
      currentStateName = application.states.getCurrentStateName();
      if (currentStateName === "working") {
        return application.router.navigate('home/onWorking', true);
      } else {
        return application.router.navigate('home', true);
      }
    };

    return StatsView;

  })(View);
  
}});

window.require.define({"views/templates/column": function(exports, require, module) {
  module.exports = function (__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
      
        __out.push('<div class="display">\n    <h2>');
      
        __out.push(__sanitize(this.column.title));
      
        __out.push('<span class="column-destroy"></span></h2>\n</div>\n<div class="edit">\n    <input class="title-input" type="text" value="');
      
        __out.push(__sanitize(this.column.title));
      
        __out.push('">\n</div>\n\n');
      
        if (this.column.index > 0) {
          __out.push('\n    <div class="border-right"/>\n');
        }
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
}});

window.require.define({"views/templates/columns": function(exports, require, module) {
  module.exports = function (__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
      
      
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
}});

window.require.define({"views/templates/home": function(exports, require, module) {
  module.exports = function (__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
      
      
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
}});

window.require.define({"views/templates/new_column": function(exports, require, module) {
  module.exports = function (__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
      
        __out.push('<a href="#">\n    <button id="add-column" class="btn">Add column</button>\n</a>\n\n\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
}});

window.require.define({"views/templates/new_note": function(exports, require, module) {
  module.exports = function (__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
      
        __out.push('<a class=\'addNote postit\' href=\'#\'></a>\n<a class=\'addNote purple\' href=\'#\'></a>\n<a class=\'addNote green\' href=\'#\'></a>\n<a class=\'addNote orange\' href=\'#\'></a>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
}});

window.require.define({"views/templates/note": function(exports, require, module) {
  module.exports = function (__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
      
        __out.push('<div class="note-header">\n    <div class="ribbon ');
      
        __out.push(__sanitize(this.note.color));
      
        __out.push('"/>\n    <div class="delete">x</div>\n</div>\n<textarea class="textedit">');
      
        __out.push(__sanitize(this.note.content));
      
        __out.push('</textarea>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
}});

window.require.define({"views/templates/notes": function(exports, require, module) {
  module.exports = function (__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
      
      
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
}});

window.require.define({"views/templates/options": function(exports, require, module) {
  module.exports = function (__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
      
        __out.push('<div class="modal-header">\n    <h3>Options</h3>\n</div>\n<div class="modal-body">\n    <form class="form-horizontal">\n        <div class="control-group">\n            <label class="control-label" for="inputPomodoroDuration">Duration of a pomodoro</label>\n            <div class="controls input-append">\n                <input class="input-small" type="number" id="inputPomodoroDuration" value="');
      
        __out.push(__sanitize(this.pomodoroDuration));
      
        __out.push('"><span class="add-on">minutes</span>\n            </div>\n        </div>\n        <div class="control-group">\n            <label class="control-label" for="inputDurationShortBreak">Duration of a short break</label>\n            <div class="controls input-append">\n                <input class="input-small" type="number" id="inputShortBreakDuration" value="');
      
        __out.push(__sanitize(this.shortBreakDuration));
      
        __out.push('"><span class="add-on">minutes</span>\n            </div>\n        </div>\n        <div class="control-group">\n            <label class="control-label" for="inputDurationLongBreak">Duration of a long break</label>\n            <div class="controls input-append">\n                <input class="input-small" type="number" id="inputLongBreakDuration" value="');
      
        __out.push(__sanitize(this.longBreakDuration));
      
        __out.push('"><span class="add-on">minutes</span>\n            </div>\n        </div>\n    </form>\n</div>\n<div class="modal-footer">\n    <a href="#" id="update" class="btn btn-primary">Save changes</a>\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
}});

window.require.define({"views/templates/stats": function(exports, require, module) {
  module.exports = function (__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
      
        __out.push('<div class="modal-header">\n    <a href="#" class="close">&times;</a>\n    <h3>');
      
        __out.push(__sanitize(this.title));
      
        __out.push('</h3>\n</div>\n\n<div id="stats-graph"></div>\n\n\n\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
}});

window.require.define({"views/templates/timer": function(exports, require, module) {
  module.exports = function (__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
      
        __out.push('<div class="modal-header">\n  <h3>');
      
        __out.push(__sanitize(this.title));
      
        __out.push('</h3>\n</div>\n\n<div class="modal-body">\n    <div id="timer"></div>\n</div>\n<div class="modal-footer">\n    <button id="cancel" class="btn btn-info">cancel</button>\n    <button id="hide" class="btn btn-success">hide</button>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
}});

window.require.define({"views/view": function(exports, require, module) {
  var View,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = View = (function(_super) {

    __extends(View, _super);

    function View() {
      this.render = __bind(this.render, this);
      return View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.template = function() {};

    View.prototype.getRenderData = function() {};

    View.prototype.render = function() {
      console.debug("Rendering " + this.constructor.name);
      this.$el.html(this.template(this.getRenderData()));
      this.afterRender();
      return this;
    };

    View.prototype.afterRender = function() {};

    return View;

  })(Backbone.View);
  
}});

window.require.define({"views/working_view": function(exports, require, module) {
  var View, WorkingView, application, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('./view');

  application = require('application');

  template = require('./templates/timer');

  module.exports = WorkingView = (function(_super) {

    __extends(WorkingView, _super);

    function WorkingView() {
      this.buzzer = __bind(this.buzzer, this);

      this.startTimer = __bind(this.startTimer, this);
      return WorkingView.__super__.constructor.apply(this, arguments);
    }

    WorkingView.prototype.template = template;

    WorkingView.prototype.el = "#timer-modal";

    WorkingView.prototype.events = {
      "click #cancel": "resetTimer",
      "click #hide": "hideTimer"
    };

    WorkingView.prototype.getRenderData = function() {
      return {
        title: "Working"
      };
    };

    WorkingView.prototype.afterRender = function() {
      this.$el.find('#hide').show();
      this.$el.modal({
        backdrop: 'static',
        show: true
      });
      return this;
    };

    WorkingView.prototype.startTimer = function(seconds) {
      $('#timer').startTimer({
        seconds: seconds,
        reset: false,
        show_in_title: true,
        buzzer: this.buzzer
      });
      return $('#small-timer').startTimer({
        seconds: seconds,
        reset: false
      });
    };

    WorkingView.prototype.buzzer = function() {
      var notification;
      $("#small-timer-container").hide();
      this.$el.modal('hide');
      application.pomodoros.create({
        created_at: new Date().getTime()
      });
      application.audios.alarm.play();
      notification = webkitNotifications.createNotification('images/tomato_32.png', 'notification', 'pomodoro is done!');
      notification.show();
      return application.router.navigate('home', true);
    };

    WorkingView.prototype.hideTimer = function() {
      this.$el.modal('hide');
      return $("#small-timer-container").show();
    };

    WorkingView.prototype.resetTimer = function() {
      $("#timer").clearTimer();
      $("#small-timer").clearTimer();
      this.$el.modal('hide');
      $("#small-timer-container").hide();
      return application.router.navigate('home', true);
    };

    return WorkingView;

  })(View);
  
}});

