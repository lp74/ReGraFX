(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('core-js/modules/es6.array.iterator'), require('core-js/modules/es6.object.keys'), require('core-js/modules/es7.promise.finally'), require('core-js/modules/web.dom.iterable'), require('core-js/modules/es6.array.map'), require('core-js/modules/es6.function.bind'), require('core-js/modules/es6.date.now'), require('core-js/modules/es7.symbol.async-iterator'), require('core-js/modules/es6.symbol'), require('core-js/modules/es6.promise')) :
  typeof define === 'function' && define.amd ? define(['exports', 'core-js/modules/es6.array.iterator', 'core-js/modules/es6.object.keys', 'core-js/modules/es7.promise.finally', 'core-js/modules/web.dom.iterable', 'core-js/modules/es6.array.map', 'core-js/modules/es6.function.bind', 'core-js/modules/es6.date.now', 'core-js/modules/es7.symbol.async-iterator', 'core-js/modules/es6.symbol', 'core-js/modules/es6.promise'], factory) :
  (factory((global.RGFX = {})));
}(this, (function (exports) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Subscription = function Subscription(obj) {
    _classCallCheck(this, Subscription);

    this.id = Symbol();
    this.unsubscribe = obj.unsubscribe.bind(obj, this.id);
  };

  var Subscribers =
  /*#__PURE__*/
  function () {
    function Subscribers() {
      _classCallCheck(this, Subscribers);

      this._subscribers = {};
    }

    _createClass(Subscribers, [{
      key: "subscribe",
      value: function subscribe(obj) {
        var subscription = new Subscription(this);
        this._subscribers[subscription.id] = obj;
        return subscription;
      }
    }, {
      key: "unsubscribe",
      value: function unsubscribe(id) {
        delete this._subscribers[id];
      }
    }, {
      key: "size",
      value: function size() {
        return this.ids().length;
      }
    }, {
      key: "ids",
      value: function ids() {
        return Object.getOwnPropertySymbols(this._subscribers);
      }
    }, {
      key: "get",
      value: function get(id) {
        return this._subscribers[id];
      }
    }, {
      key: "set",
      value: function set(obj) {
        this._subscribers[id] = obj;
      }
    }, {
      key: "iterable",
      value: function iterable() {
        var _this = this;

        return Object.getOwnPropertySymbols(this._subscribers).map(function (s) {
          return _this._subscribers[s];
        });
      }
    }]);

    return Subscribers;
  }();

  var Observable =
  /*#__PURE__*/
  function () {
    function Observable() {
      var subscribers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Subscribers();

      _classCallCheck(this, Observable);

      this.$$observers = subscribers;
    }

    _createClass(Observable, [{
      key: "subscribe",
      value: function subscribe(observer) {
        return this.observers().subscribe(observer);
      }
    }, {
      key: "observers",
      value: function observers() {
        return this.$$observers;
      }
    }, {
      key: "unsubscribe",
      value: function unsubscribe(id) {
        this.observers().unsubscribe(id);
      }
    }, {
      key: "notify",
      value: function notify() {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.observers().iterable()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var observer = _step.value;
            observer.next.apply(observer, arguments);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }]);

    return Observable;
  }();

  var Observer =
  /*#__PURE__*/
  function () {
    function Observer() {
      var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
        return undefined;
      };
      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Linked Observer';

      _classCallCheck(this, Observer);

      this._fn = fn;
      this._name = name;
    }

    _createClass(Observer, [{
      key: "next",
      value: function next() {
        return this._fn.apply(this, arguments);
      }
    }]);

    return Observer;
  }();

  var Scheduler =
  /*#__PURE__*/
  function () {
    function Scheduler() {
      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var pauser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Observable();

      _classCallCheck(this, Scheduler);

      this._delay = delay;
      this._pause = 0;
      this._pauser = pauser;
    }

    _createClass(Scheduler, [{
      key: "schedule",
      value: function schedule() {
        var _this = this;

        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            _this.isRunning() ? resolve() : _this._pauser.subscribe(function (x) {
              _this._pause = x;

              if (_this.isRunning()) {
                resolve();
              }
            });
          }, _this._delay);
        });
      }
    }, {
      key: "isRunning",
      value: function isRunning() {
        return !this._pause;
      }
    }]);

    return Scheduler;
  }();

  var Token =
  /*#__PURE__*/
  function () {
    function Token() {
      _classCallCheck(this, Token);

      this.$$symbol = Symbol();
      this.$$date = Date.now();
      this.$$cancelled = false;
    }

    _createClass(Token, [{
      key: "cancel",
      value: function cancel() {
        this.$$cancelled = true;
      }
    }]);

    return Token;
  }();

  var Message =
  /*#__PURE__*/
  function () {
    function Message(origin) {
      _classCallCheck(this, Message);

      this.$$origin = origin;
      this.$$date = Date.now();
      this.$$token = new Token();
      this.$$subject = null;
      this.$$signatures = [];
    }

    _createClass(Message, [{
      key: "subject",
      value: function subject(_subject) {
        this.$$subject = _subject;
        return this;
      }
    }, {
      key: "sign",
      value: function sign(signature) {
        this.$$signatures.push(signature);
        return this;
      }
    }, {
      key: "token",
      value: function token() {
        return this.$$token;
      }
    }]);

    return Message;
  }();
  Message.$$name = 'ReGraFX.Message';

  function isFunction(value) {
    return typeof value === 'function' || false;
  }
  function isPromise(p) {
    return p && isFunction(p.then);
  }

  var Task =
  /*#__PURE__*/
  function () {
    function Task() {
      var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
        return null;
      };

      _classCallCheck(this, Task);

      this._fn = fn;
    }

    _createClass(Task, [{
      key: "execute",
      value: function execute() {
        try {
          var res = this._fn.apply(this, arguments);

          return isPromise(res) ? res : Promise.resolve(res);
        } catch (err) {
          return Promise.reject(err);
        }
      }
    }]);

    return Task;
  }();

  var Vertex =
  /*#__PURE__*/
  function () {
    function Vertex() {
      var task = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Task();
      var scheduler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Scheduler();
      var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Vertex';

      _classCallCheck(this, Vertex);

      this.$$task = task;
      this.$$scheduler = scheduler;
      this.$$name = name;
      this.$$thenObservers = new Observable();
      this.$$catchObservers = new Observable();
      this.$$finallyObservers = new Observable();
      this.$$observable = new Observable();
      this.$$observer = new Observer(this.$$next.bind(this), this.$$name);
    }

    _createClass(Vertex, [{
      key: "$observer",
      value: function $observer() {
        return this.$$observer;
      }
    }, {
      key: "to",
      value: function to(vertex) {
        this.$$thenObservers.subscribe(vertex.$observer());
        return this;
      }
    }, {
      key: "err",
      value: function err(vertex) {
        this.$$catchObservers.subscribe(vertex.$observer());
        return this;
      }
    }, {
      key: "final",
      value: function final(vertex) {
        this.$$finallyObservers.subscribe(vertex.$observer());
        return this;
      }
    }, {
      key: "subscribe",
      value: function subscribe(fn) {
        this.$$observable.subscribe(new Observer(fn));
      }
    }, {
      key: "trigger",
      value: function trigger() {
        var _this$$$observer;

        var msg = new Message();

        for (var _len = arguments.length, input = new Array(_len), _key = 0; _key < _len; _key++) {
          input[_key] = arguments[_key];
        }

        input.push(msg);

        (_this$$$observer = this.$$observer).next.apply(_this$$$observer, input);

        return msg;
      }
    }, {
      key: "$$next",
      value: function $$next() {
        var _this = this;

        for (var _len2 = arguments.length, input = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          input[_key2] = arguments[_key2];
        }

        var msg = input[input.length - 1];

        if (!msg.token().$$cancelled) {
          this.$$scheduler.schedule().then(function () {
            var _this$$$task;

            var promise = (_this$$$task = _this.$$task).execute.apply(_this$$$task, input);

            promise.then(function (out) {
              msg.sign(_this.$$name);

              _this.$$thenObservers.notify(out, msg);
            }).catch(function (err) {
              msg.sign(_this.$$name);

              _this.$$catchObservers.notify(err, msg);
            }).finally(function () {
              _this.$$finallyObservers.notify(null, msg);
            });

            _this.$$observable.notify(promise);
          });
        }
      }
    }]);

    return Vertex;
  }();

  var Graph =
  /*#__PURE__*/
  function () {
    function Graph() {
      _classCallCheck(this, Graph);

      this.$$vertices = {};
    }

    _createClass(Graph, [{
      key: "addVertex",
      value: function addVertex(id) {
        var task = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Task();
        var scheduler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Scheduler();

        if (this.$$vertices[id]) {
          throw new Error('Duplicated vertex entry');
        }

        this.$$vertices[id] = new Vertex(task, scheduler, id);
        return this.$$vertices[id];
      }
    }, {
      key: "order",
      value: function order() {
        return Object.keys(this.$$vertices).length + Object.getOwnPropertySymbols(this.$$vertices).length;
      }
    }, {
      key: "vertex",
      value: function vertex(id) {
        return this.$$vertices[id];
      }
    }]);

    return Graph;
  }();

  /* REactive GRAph FluX ReGraFX.js */

  exports.Graph = Graph;
  exports.Vertex = Vertex;
  exports.Task = Task;
  exports.Scheduler = Scheduler;
  exports.Message = Message;
  exports.Observable = Observable;
  exports.Observer = Observer;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=regrafx.js.map
