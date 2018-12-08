(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.RGFX = {})));
}(this, (function (exports) { 'use strict';

  var $iterators = require('./es6.array.iterator');
  var getKeys = require('./_object-keys');
  var redefine = require('./_redefine');
  var global = require('./_global');
  var hide = require('./_hide');
  var Iterators = require('./_iterators');
  var wks = require('./_wks');
  var ITERATOR = wks('iterator');
  var TO_STRING_TAG = wks('toStringTag');
  var ArrayValues = Iterators.Array;

  var DOMIterables = {
    CSSRuleList: true, // TODO: Not spec compliant, should be false.
    CSSStyleDeclaration: false,
    CSSValueList: false,
    ClientRectList: false,
    DOMRectList: false,
    DOMStringList: false,
    DOMTokenList: true,
    DataTransferItemList: false,
    FileList: false,
    HTMLAllCollection: false,
    HTMLCollection: false,
    HTMLFormElement: false,
    HTMLSelectElement: false,
    MediaList: true, // TODO: Not spec compliant, should be false.
    MimeTypeArray: false,
    NamedNodeMap: false,
    NodeList: true,
    PaintRequestList: false,
    Plugin: false,
    PluginArray: false,
    SVGLengthList: false,
    SVGNumberList: false,
    SVGPathSegList: false,
    SVGPointList: false,
    SVGStringList: false,
    SVGTransformList: false,
    SourceBufferList: false,
    StyleSheetList: true, // TODO: Not spec compliant, should be false.
    TextTrackCueList: false,
    TextTrackList: false,
    TouchList: false
  };

  for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
    var NAME = collections[i];
    var explicit = DOMIterables[NAME];
    var Collection = global[NAME];
    var proto = Collection && Collection.prototype;
    var key;
    if (proto) {
      if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
      if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
      Iterators[NAME] = ArrayValues;
      if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
    }
  }

  var addToUnscopables = require('./_add-to-unscopables');
  var step = require('./_iter-step');
  var Iterators$1 = require('./_iterators');
  var toIObject = require('./_to-iobject');

  // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
    this._t = toIObject(iterated); // target
    this._i = 0;                   // next index
    this._k = kind;                // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var kind = this._k;
    var index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
      return step(1);
    }
    if (kind == 'keys') return step(0, index);
    if (kind == 'values') return step(0, O[index]);
    return step(0, [index, O[index]]);
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  Iterators$1.Arguments = Iterators$1.Array;

  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');

  // 19.1.2.14 Object.keys(O)
  var toObject = require('./_to-object');
  var $keys = require('./_object-keys');

  require('./_object-sap')('keys', function () {
    return function keys(it) {
      return $keys(toObject(it));
    };
  });

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

  // https://github.com/tc39/proposal-promise-finally
  var $export = require('./_export');
  var core = require('./_core');
  var global$1 = require('./_global');
  var speciesConstructor = require('./_species-constructor');
  var promiseResolve = require('./_promise-resolve');

  $export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
    var C = speciesConstructor(this, core.Promise || global$1.Promise);
    var isFunction = typeof onFinally == 'function';
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  } });

  // 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
  var $export$1 = require('./_export');

  $export$1($export$1.P, 'Function', { bind: require('./_bind') });

  require('./_wks-define')('asyncIterator');

  // ECMAScript 6 symbols shim
  var global$2 = require('./_global');
  var has = require('./_has');
  var DESCRIPTORS = require('./_descriptors');
  var $export$2 = require('./_export');
  var redefine$1 = require('./_redefine');
  var META = require('./_meta').KEY;
  var $fails = require('./_fails');
  var shared = require('./_shared');
  var setToStringTag = require('./_set-to-string-tag');
  var uid = require('./_uid');
  var wks$1 = require('./_wks');
  var wksExt = require('./_wks-ext');
  var wksDefine = require('./_wks-define');
  var enumKeys = require('./_enum-keys');
  var isArray = require('./_is-array');
  var anObject = require('./_an-object');
  var isObject = require('./_is-object');
  var toIObject$1 = require('./_to-iobject');
  var toPrimitive = require('./_to-primitive');
  var createDesc = require('./_property-desc');
  var _create = require('./_object-create');
  var gOPNExt = require('./_object-gopn-ext');
  var $GOPD = require('./_object-gopd');
  var $DP = require('./_object-dp');
  var $keys$1 = require('./_object-keys');
  var gOPD = $GOPD.f;
  var dP = $DP.f;
  var gOPN = gOPNExt.f;
  var $Symbol = global$2.Symbol;
  var $JSON = global$2.JSON;
  var _stringify = $JSON && $JSON.stringify;
  var PROTOTYPE = 'prototype';
  var HIDDEN = wks$1('_hidden');
  var TO_PRIMITIVE = wks$1('toPrimitive');
  var isEnum = {}.propertyIsEnumerable;
  var SymbolRegistry = shared('symbol-registry');
  var AllSymbols = shared('symbols');
  var OPSymbols = shared('op-symbols');
  var ObjectProto = Object[PROTOTYPE];
  var USE_NATIVE = typeof $Symbol == 'function';
  var QObject = global$2.QObject;
  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDesc = DESCRIPTORS && $fails(function () {
    return _create(dP({}, 'a', {
      get: function () { return dP(this, 'a', { value: 7 }).a; }
    })).a != 7;
  }) ? function (it, key, D) {
    var protoDesc = gOPD(ObjectProto, key);
    if (protoDesc) delete ObjectProto[key];
    dP(it, key, D);
    if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
  } : dP;

  var wrap = function (tag) {
    var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
    sym._k = tag;
    return sym;
  };

  var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    return it instanceof $Symbol;
  };

  var $defineProperty = function defineProperty(it, key, D) {
    if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
    anObject(it);
    key = toPrimitive(key, true);
    anObject(D);
    if (has(AllSymbols, key)) {
      if (!D.enumerable) {
        if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
        D = _create(D, { enumerable: createDesc(0, false) });
      } return setSymbolDesc(it, key, D);
    } return dP(it, key, D);
  };
  var $defineProperties = function defineProperties(it, P) {
    anObject(it);
    var keys = enumKeys(P = toIObject$1(P));
    var i = 0;
    var l = keys.length;
    var key;
    while (l > i) $defineProperty(it, key = keys[i++], P[key]);
    return it;
  };
  var $create = function create(it, P) {
    return P === undefined ? _create(it) : $defineProperties(_create(it), P);
  };
  var $propertyIsEnumerable = function propertyIsEnumerable(key) {
    var E = isEnum.call(this, key = toPrimitive(key, true));
    if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
    return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
  };
  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
    it = toIObject$1(it);
    key = toPrimitive(key, true);
    if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
    var D = gOPD(it, key);
    if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
    return D;
  };
  var $getOwnPropertyNames = function getOwnPropertyNames(it) {
    var names = gOPN(toIObject$1(it));
    var result = [];
    var i = 0;
    var key;
    while (names.length > i) {
      if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
    } return result;
  };
  var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
    var IS_OP = it === ObjectProto;
    var names = gOPN(IS_OP ? OPSymbols : toIObject$1(it));
    var result = [];
    var i = 0;
    var key;
    while (names.length > i) {
      if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
    } return result;
  };

  // 19.4.1.1 Symbol([description])
  if (!USE_NATIVE) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
      var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
      var $set = function (value) {
        if (this === ObjectProto) $set.call(OPSymbols, value);
        if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, createDesc(1, value));
      };
      if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
      return wrap(tag);
    };
    redefine$1($Symbol[PROTOTYPE], 'toString', function toString() {
      return this._k;
    });

    $GOPD.f = $getOwnPropertyDescriptor;
    $DP.f = $defineProperty;
    require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
    require('./_object-pie').f = $propertyIsEnumerable;
    require('./_object-gops').f = $getOwnPropertySymbols;

    if (DESCRIPTORS && !require('./_library')) {
      redefine$1(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
    }

    wksExt.f = function (name) {
      return wrap(wks$1(name));
    };
  }

  $export$2($export$2.G + $export$2.W + $export$2.F * !USE_NATIVE, { Symbol: $Symbol });

  for (var es6Symbols = (
    // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
    'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
  ).split(','), j = 0; es6Symbols.length > j;)wks$1(es6Symbols[j++]);

  for (var wellKnownSymbols = $keys$1(wks$1.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

  $export$2($export$2.S + $export$2.F * !USE_NATIVE, 'Symbol', {
    // 19.4.2.1 Symbol.for(key)
    'for': function (key) {
      return has(SymbolRegistry, key += '')
        ? SymbolRegistry[key]
        : SymbolRegistry[key] = $Symbol(key);
    },
    // 19.4.2.5 Symbol.keyFor(sym)
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
      for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
    },
    useSetter: function () { setter = true; },
    useSimple: function () { setter = false; }
  });

  $export$2($export$2.S + $export$2.F * !USE_NATIVE, 'Object', {
    // 19.1.2.2 Object.create(O [, Properties])
    create: $create,
    // 19.1.2.4 Object.defineProperty(O, P, Attributes)
    defineProperty: $defineProperty,
    // 19.1.2.3 Object.defineProperties(O, Properties)
    defineProperties: $defineProperties,
    // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    // 19.1.2.7 Object.getOwnPropertyNames(O)
    getOwnPropertyNames: $getOwnPropertyNames,
    // 19.1.2.8 Object.getOwnPropertySymbols(O)
    getOwnPropertySymbols: $getOwnPropertySymbols
  });

  // 24.3.2 JSON.stringify(value [, replacer [, space]])
  $JSON && $export$2($export$2.S + $export$2.F * (!USE_NATIVE || $fails(function () {
    var S = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    // WebKit converts symbol values to JSON as null
    // V8 throws on boxed symbols
    return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
  })), 'JSON', {
    stringify: function stringify(it) {
      var args = [it];
      var i = 1;
      var replacer, $replacer;
      while (arguments.length > i) args.push(arguments[i++]);
      $replacer = replacer = args[1];
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return _stringify.apply($JSON, args);
    }
  });

  // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
  $Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
  // 19.4.3.5 Symbol.prototype[@@toStringTag]
  setToStringTag($Symbol, 'Symbol');
  // 20.2.1.9 Math[@@toStringTag]
  setToStringTag(Math, 'Math', true);
  // 24.3.3 JSON[@@toStringTag]
  setToStringTag(global$2.JSON, 'JSON', true);

  var $export$3 = require('./_export');
  var $map = require('./_array-methods')(1);

  $export$3($export$3.P + $export$3.F * !require('./_strict-method')([].map, true), 'Array', {
    // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments[1]);
    }
  });

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

  class AbstractScheduler {
      constructor(delay = 0) {
          this.$$delay = delay;
      }
  }

  class Scheduler extends AbstractScheduler {
      constructor(delay = 0, pauser = new Observable()) {
          super(delay);
          this.$$pause = false;
          this.$$pauser = pauser;
      }
      schedule() {
          return new Promise(resolve => {
              setTimeout(() => {
                  this.isRunning()
                      ? resolve()
                      : this.$$pauser.subscribe((pause) => {
                          this.$$pause = pause;
                          if (this.isRunning()) {
                              resolve();
                          }
                      });
              }, this.$$delay);
          });
      }
      isRunning() {
          return !this.$$pause;
      }
  }

  // 20.3.3.1 / 15.9.4.4 Date.now()
  var $export$4 = require('./_export');

  $export$4($export$4.S, 'Date', { now: function () { return new Date().getTime(); } });

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

  var LIBRARY = require('./_library');
  var global$3 = require('./_global');
  var ctx = require('./_ctx');
  var classof = require('./_classof');
  var $export$5 = require('./_export');
  var isObject$1 = require('./_is-object');
  var aFunction = require('./_a-function');
  var anInstance = require('./_an-instance');
  var forOf = require('./_for-of');
  var speciesConstructor$1 = require('./_species-constructor');
  var task = require('./_task').set;
  var microtask = require('./_microtask')();
  var newPromiseCapabilityModule = require('./_new-promise-capability');
  var perform = require('./_perform');
  var userAgent = require('./_user-agent');
  var promiseResolve$1 = require('./_promise-resolve');
  var PROMISE = 'Promise';
  var TypeError$1 = global$3.TypeError;
  var process = global$3.process;
  var versions = process && process.versions;
  var v8 = versions && versions.v8 || '';
  var $Promise = global$3[PROMISE];
  var isNode = classof(process) == 'process';
  var empty = function () { /* empty */ };
  var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
  var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

  var USE_NATIVE$1 = !!function () {
    try {
      // correct subclassing with @@species support
      var promise = $Promise.resolve(1);
      var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
        exec(empty, empty);
      };
      // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
      return (isNode || typeof PromiseRejectionEvent == 'function')
        && promise.then(empty) instanceof FakePromise
        // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
        // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
        // we can't detect it synchronously, so just check versions
        && v8.indexOf('6.6') !== 0
        && userAgent.indexOf('Chrome/66') === -1;
    } catch (e) { /* empty */ }
  }();

  // helpers
  var isThenable = function (it) {
    var then;
    return isObject$1(it) && typeof (then = it.then) == 'function' ? then : false;
  };
  var notify = function (promise, isReject) {
    if (promise._n) return;
    promise._n = true;
    var chain = promise._c;
    microtask(function () {
      var value = promise._v;
      var ok = promise._s == 1;
      var i = 0;
      var run = function (reaction) {
        var handler = ok ? reaction.ok : reaction.fail;
        var resolve = reaction.resolve;
        var reject = reaction.reject;
        var domain = reaction.domain;
        var result, then, exited;
        try {
          if (handler) {
            if (!ok) {
              if (promise._h == 2) onHandleUnhandled(promise);
              promise._h = 1;
            }
            if (handler === true) result = value;
            else {
              if (domain) domain.enter();
              result = handler(value); // may throw
              if (domain) {
                domain.exit();
                exited = true;
              }
            }
            if (result === reaction.promise) {
              reject(TypeError$1('Promise-chain cycle'));
            } else if (then = isThenable(result)) {
              then.call(result, resolve, reject);
            } else resolve(result);
          } else reject(value);
        } catch (e) {
          if (domain && !exited) domain.exit();
          reject(e);
        }
      };
      while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
      promise._c = [];
      promise._n = false;
      if (isReject && !promise._h) onUnhandled(promise);
    });
  };
  var onUnhandled = function (promise) {
    task.call(global$3, function () {
      var value = promise._v;
      var unhandled = isUnhandled(promise);
      var result, handler, console;
      if (unhandled) {
        result = perform(function () {
          if (isNode) {
            process.emit('unhandledRejection', value, promise);
          } else if (handler = global$3.onunhandledrejection) {
            handler({ promise: promise, reason: value });
          } else if ((console = global$3.console) && console.error) {
            console.error('Unhandled promise rejection', value);
          }
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        promise._h = isNode || isUnhandled(promise) ? 2 : 1;
      } promise._a = undefined;
      if (unhandled && result.e) throw result.v;
    });
  };
  var isUnhandled = function (promise) {
    return promise._h !== 1 && (promise._a || promise._c).length === 0;
  };
  var onHandleUnhandled = function (promise) {
    task.call(global$3, function () {
      var handler;
      if (isNode) {
        process.emit('rejectionHandled', promise);
      } else if (handler = global$3.onrejectionhandled) {
        handler({ promise: promise, reason: promise._v });
      }
    });
  };
  var $reject = function (value) {
    var promise = this;
    if (promise._d) return;
    promise._d = true;
    promise = promise._w || promise; // unwrap
    promise._v = value;
    promise._s = 2;
    if (!promise._a) promise._a = promise._c.slice();
    notify(promise, true);
  };
  var $resolve = function (value) {
    var promise = this;
    var then;
    if (promise._d) return;
    promise._d = true;
    promise = promise._w || promise; // unwrap
    try {
      if (promise === value) throw TypeError$1("Promise can't be resolved itself");
      if (then = isThenable(value)) {
        microtask(function () {
          var wrapper = { _w: promise, _d: false }; // wrap
          try {
            then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
          } catch (e) {
            $reject.call(wrapper, e);
          }
        });
      } else {
        promise._v = value;
        promise._s = 1;
        notify(promise, false);
      }
    } catch (e) {
      $reject.call({ _w: promise, _d: false }, e); // wrap
    }
  };

  // constructor polyfill
  if (!USE_NATIVE$1) {
    // 25.4.3.1 Promise(executor)
    $Promise = function Promise(executor) {
      anInstance(this, $Promise, PROMISE, '_h');
      aFunction(executor);
      Internal.call(this);
      try {
        executor(ctx($resolve, this, 1), ctx($reject, this, 1));
      } catch (err) {
        $reject.call(this, err);
      }
    };
    // eslint-disable-next-line no-unused-vars
    Internal = function Promise(executor) {
      this._c = [];             // <- awaiting reactions
      this._a = undefined;      // <- checked in isUnhandled reactions
      this._s = 0;              // <- state
      this._d = false;          // <- done
      this._v = undefined;      // <- value
      this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
      this._n = false;          // <- notify
    };
    Internal.prototype = require('./_redefine-all')($Promise.prototype, {
      // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
      then: function then(onFulfilled, onRejected) {
        var reaction = newPromiseCapability(speciesConstructor$1(this, $Promise));
        reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
        reaction.fail = typeof onRejected == 'function' && onRejected;
        reaction.domain = isNode ? process.domain : undefined;
        this._c.push(reaction);
        if (this._a) this._a.push(reaction);
        if (this._s) notify(this, false);
        return reaction.promise;
      },
      // 25.4.5.1 Promise.prototype.catch(onRejected)
      'catch': function (onRejected) {
        return this.then(undefined, onRejected);
      }
    });
    OwnPromiseCapability = function () {
      var promise = new Internal();
      this.promise = promise;
      this.resolve = ctx($resolve, promise, 1);
      this.reject = ctx($reject, promise, 1);
    };
    newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
      return C === $Promise || C === Wrapper
        ? new OwnPromiseCapability(C)
        : newGenericPromiseCapability(C);
    };
  }

  $export$5($export$5.G + $export$5.W + $export$5.F * !USE_NATIVE$1, { Promise: $Promise });
  require('./_set-to-string-tag')($Promise, PROMISE);
  require('./_set-species')(PROMISE);
  Wrapper = require('./_core')[PROMISE];

  // statics
  $export$5($export$5.S + $export$5.F * !USE_NATIVE$1, PROMISE, {
    // 25.4.4.5 Promise.reject(r)
    reject: function reject(r) {
      var capability = newPromiseCapability(this);
      var $$reject = capability.reject;
      $$reject(r);
      return capability.promise;
    }
  });
  $export$5($export$5.S + $export$5.F * (LIBRARY || !USE_NATIVE$1), PROMISE, {
    // 25.4.4.6 Promise.resolve(x)
    resolve: function resolve(x) {
      return promiseResolve$1(LIBRARY && this === Wrapper ? $Promise : this, x);
    }
  });
  $export$5($export$5.S + $export$5.F * !(USE_NATIVE$1 && require('./_iter-detect')(function (iter) {
    $Promise.all(iter)['catch'](empty);
  })), PROMISE, {
    // 25.4.4.1 Promise.all(iterable)
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform(function () {
        var values = [];
        var index = 0;
        var remaining = 1;
        forOf(iterable, false, function (promise) {
          var $index = index++;
          var alreadyCalled = false;
          values.push(undefined);
          remaining++;
          C.resolve(promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[$index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.e) reject(result.v);
      return capability.promise;
    },
    // 25.4.4.4 Promise.race(iterable)
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var reject = capability.reject;
      var result = perform(function () {
        forOf(iterable, false, function (promise) {
          C.resolve(promise).then(capability.resolve, reject);
        });
      });
      if (result.e) reject(result.v);
      return capability.promise;
    }
  });

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
      var boundVertexFn = this.$$next.bind(this);
      boundVertexFn.boundVertex = this;
      this.$$observer = new Observer(boundVertexFn, this.$$name);
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

  class Debounce extends AbstractScheduler {
      constructor(delay = 0) {
          super(delay);
          this.$$timerId = null;
      }
      schedule() {
          return new Promise(resolve => {
              if (this.$$timerId) {
                  clearTimeout(this.$$timerId);
              }
              this.$$timerId = setTimeout(() => {
                  this.$$timerId = null;
                  resolve();
              }, this.$$delay);
          });
      }
  }

  class Throttle extends AbstractScheduler {
      constructor(delay = 0) {
          super(delay);
          this.$$timerId = null;
      }
      schedule() {
          return new Promise((resolve, reject) => {
              if (this.$$timerId) {
                  reject();
              }
              else {
                  this.$$timerId = setTimeout(() => {
                      this.$$timerId = null;
                  }, this.$$delay);
                  resolve();
              }
          });
      }
  }

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

  var $export$6 = require('./_export');
  var $indexOf = require('./_array-includes')(false);
  var $native = [].indexOf;
  var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

  $export$6($export$6.P + $export$6.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
    // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
    indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
      return NEGATIVE_ZERO
        // convert -0 to +0
        ? $native.apply(this, arguments) || 0
        : $indexOf(this, searchElement, arguments[1]);
    }
  });

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

  var regrafx = /*#__PURE__*/Object.freeze({
    Graph: Graph,
    Vertex: Vertex,
    Task: Task,
    Scheduler: Scheduler,
    Debounce: Debounce,
    Throttle: Throttle,
    Message: Message,
    Observable: Observable,
    Observer: Observer,
    CompositeVertex: CompositeVertex,
    Search: Search
  });

  /* REactive GRAph FluX ReGraFX.js */

  exports.RGFX = regrafx;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=regrafx.rgfx.js.map
