(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('core-js/modules/es7.promise.finally'), require('core-js/modules/es6.function.bind'), require('core-js/modules/es6.date.now'), require('core-js/modules/es6.promise'), require('core-js/modules/es6.array.map'), require('core-js/modules/es6.array.index-of'), require('core-js/modules/es7.symbol.async-iterator'), require('core-js/modules/es6.symbol'), require('core-js/modules/web.dom.iterable')) :
  typeof define === 'function' && define.amd ? define(['exports', 'core-js/modules/es7.promise.finally', 'core-js/modules/es6.function.bind', 'core-js/modules/es6.date.now', 'core-js/modules/es6.promise', 'core-js/modules/es6.array.map', 'core-js/modules/es6.array.index-of', 'core-js/modules/es7.symbol.async-iterator', 'core-js/modules/es6.symbol', 'core-js/modules/web.dom.iterable'], factory) :
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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
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

      _classCallCheck(this, Observer);

      this._fn = fn;
    }

    _createClass(Observer, [{
      key: "next",
      value: function next() {
        return this._fn.apply(this, arguments);
      }
    }]);

    return Observer;
  }();

  var AbstractScheduler = function AbstractScheduler() {
    var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    _classCallCheck(this, AbstractScheduler);

    _defineProperty(this, "$$delay", void 0);

    this.$$delay = delay;
  };

  var Scheduler =
  /*#__PURE__*/
  function (_AbstractScheduler) {
    _inherits(Scheduler, _AbstractScheduler);

    function Scheduler() {
      var _this;

      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var pauser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Observable();

      _classCallCheck(this, Scheduler);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Scheduler).call(this, delay));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "$$pause", void 0);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "$$pauser", void 0);

      _this.$$pause = false;
      _this.$$pauser = pauser;
      return _this;
    }

    _createClass(Scheduler, [{
      key: "schedule",
      value: function schedule() {
        var _this2 = this;

        return new Promise(function (resolve) {
          setTimeout(function () {
            _this2.isRunning() ? resolve() : _this2.$$pauser.subscribe(function (pause) {
              _this2.$$pause = pause;

              if (_this2.isRunning()) {
                resolve();
              }
            });
          }, _this2.$$delay);
        });
      }
    }, {
      key: "isRunning",
      value: function isRunning() {
        return !this.$$pause;
      }
    }]);

    return Scheduler;
  }(AbstractScheduler);

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

      this.$$id = Symbol(name);
      this.$$task = task;
      this.$$scheduler = scheduler;
      this.$$name = name;
      this.$$thenObservers = new Observable();
      this.$$catchObservers = new Observable();
      this.$$finallyObservers = new Observable();
      this.$$observable = new Observable();
      var boundVertexFn = this.$$next.bind(this);
      boundVertexFn.boundVertex = this;
      this.$$observer = new Observer(boundVertexFn);
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

        var msg = new Message(this.$$id);

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
              msg.sign(_this.$$id);

              _this.$$thenObservers.notify(out, msg);
            }).catch(function (err) {
              msg.sign(_this.$$id);

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

  var Debounce =
  /*#__PURE__*/
  function (_AbstractScheduler) {
    _inherits(Debounce, _AbstractScheduler);

    function Debounce() {
      var _this;

      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      _classCallCheck(this, Debounce);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Debounce).call(this, delay));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "$$timerId", void 0);

      _this.$$timerId = null;
      return _this;
    }

    _createClass(Debounce, [{
      key: "schedule",
      value: function schedule() {
        var _this2 = this;

        return new Promise(function (resolve) {
          if (_this2.$$timerId) {
            clearTimeout(_this2.$$timerId);
          }

          _this2.$$timerId = setTimeout(function () {
            _this2.$$timerId = null;
            resolve();
          }, _this2.$$delay);
        });
      }
    }]);

    return Debounce;
  }(AbstractScheduler);

  var Throttle =
  /*#__PURE__*/
  function (_AbstractScheduler) {
    _inherits(Throttle, _AbstractScheduler);

    function Throttle() {
      var _this;

      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      _classCallCheck(this, Throttle);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Throttle).call(this, delay));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "$$timerId", void 0);

      _this.$$timerId = null;
      return _this;
    }

    _createClass(Throttle, [{
      key: "schedule",
      value: function schedule() {
        var _this2 = this;

        return new Promise(function (resolve, reject) {
          if (_this2.$$timerId) {
            reject();
          } else {
            _this2.$$timerId = setTimeout(function () {
              _this2.$$timerId = null;
            }, _this2.$$delay);
            resolve();
          }
        });
      }
    }]);

    return Throttle;
  }(AbstractScheduler);

  var CompositeVertex =
  /*#__PURE__*/
  function () {
    function CompositeVertex() {
      _classCallCheck(this, CompositeVertex);
    }

    _createClass(CompositeVertex, [{
      key: "to",
      value: function to(vertex) {
        return this.output.to(vertex);
      }
    }, {
      key: "err",
      value: function err(vertex) {
        return this.output.err(vertex);
      }
    }, {
      key: "final",
      value: function final(vertex) {
        return this.output.final(vertex);
      }
    }, {
      key: "subscribe",
      value: function subscribe(fn) {
        return this.output.subscribe(fn);
      }
    }, {
      key: "trigger",
      value: function trigger() {
        var _this$input;

        return (_this$input = this.input).trigger.apply(_this$input, arguments);
      }
    }, {
      key: "input",
      value: function input(vertex) {
        this.input = vertex;
      }
    }, {
      key: "output",
      value: function output(vertex) {
        this.output = vertex;
      }
    }, {
      key: "$observer",
      value: function $observer() {
        return this.input.$observer();
      }
    }]);

    return CompositeVertex;
  }();

  function dfs(vertex) {
    var visited = [];
    visit(vertex.$$observer);
    return visited;

    function visit(obs) {
      var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var edge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'origin';
      var boundVertex = obs._fn.boundVertex;
      visited.push({
        vertex: boundVertex,
        edge: edge,
        depth: d
      });
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = boundVertex.$$thenObservers.observers().iterable()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var obr = _step.value;

          if (visited.map(function (x) {
            return x.vertex;
          }).indexOf(obr._fn.boundVertex) === -1) {
            visit(obr, d + 1, 'to');
          }
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

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = boundVertex.$$catchObservers.observers().iterable()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _obr = _step2.value;

          if (visited.map(function (x) {
            return x.vertex;
          }).indexOf(_obr._fn.boundVertex) === -1) {
            visit(_obr, d + 1, 'err');
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = boundVertex.$$finallyObservers.observers().iterable()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _obr2 = _step3.value;

          if (visited.map(function (x) {
            return x.vertex;
          }).indexOf(_obr2._fn.boundVertex) === -1) {
            visit(_obr2, d + 1, 'final');
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  } // TODO: use template method

  function dfsGraph(vertex) {
    var visited = [];
    var elements = [];
    visit(vertex.$$observer);
    return elements;

    function visit(obs) {
      var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var edge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'origin';
      var boundVertex = obs._fn.boundVertex;
      visited.push({
        vertex: boundVertex,
        edge: edge,
        depth: d
      });
      elements.push({
        data: {
          id: boundVertex.$$name
        }
      });
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = boundVertex.$$thenObservers.observers().iterable()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var obr = _step4.value;

          if (visited.map(function (x) {
            return x.vertex;
          }).indexOf(obr._fn.boundVertex) === -1) {
            visit(obr, d + 1, 'to');
          }

          elements.push({
            data: {
              id: obs._fn.boundVertex.$$name + obr._fn.boundVertex.$$name,
              source: obs._fn.boundVertex.$$name,
              target: obr._fn.boundVertex.$$name
            }
          });
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = boundVertex.$$catchObservers.observers().iterable()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _obr3 = _step5.value;

          if (visited.map(function (x) {
            return x.vertex;
          }).indexOf(_obr3._fn.boundVertex) === -1) {
            visit(_obr3, d + 1, 'err');
          }

          elements.push({
            data: {
              id: obs._fn.boundVertex.$$name + _obr3._fn.boundVertex.$$name,
              source: obs._fn.boundVertex.$$name,
              target: _obr3._fn.boundVertex.$$name
            },
            style: {
              'line-color': '#d90000',
              'target-arrow-color': '#d90000'
            }
          });
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = boundVertex.$$finallyObservers.observers().iterable()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _obr4 = _step6.value;

          if (visited.map(function (x) {
            return x.vertex;
          }).indexOf(_obr4._fn.boundVertex) === -1) {
            visit(_obr4, d + 1, 'final');
          }

          elements.push({
            data: {
              id: obs._fn.boundVertex.$$name + _obr4._fn.boundVertex.$$name,
              source: obs._fn.boundVertex.$$name,
              target: _obr4._fn.boundVertex.$$name
            }
          });
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    }
  }

  /* REactive GRAph FluX ReGraFX */
  var Search = {
    dfs: dfs,
    dfsGraph: dfsGraph
  };

  exports.Vertex = Vertex;
  exports.Task = Task;
  exports.Scheduler = Scheduler;
  exports.Debounce = Debounce;
  exports.Throttle = Throttle;
  exports.Message = Message;
  exports.Observable = Observable;
  exports.Observer = Observer;
  exports.CompositeVertex = CompositeVertex;
  exports.Search = Search;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=regrafx.js.map
