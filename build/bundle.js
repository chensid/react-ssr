/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar has = Object.prototype.hasOwnProperty\n  , prefix = '~';\n\n/**\n * Constructor to create a storage for our `EE` objects.\n * An `Events` instance is a plain object whose properties are event names.\n *\n * @constructor\n * @private\n */\nfunction Events() {}\n\n//\n// We try to not inherit from `Object.prototype`. In some engines creating an\n// instance in this way is faster than calling `Object.create(null)` directly.\n// If `Object.create(null)` is not supported we prefix the event names with a\n// character to make sure that the built-in object properties are not\n// overridden or used as an attack vector.\n//\nif (Object.create) {\n  Events.prototype = Object.create(null);\n\n  //\n  // This hack is needed because the `__proto__` property is still inherited in\n  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.\n  //\n  if (!new Events().__proto__) prefix = false;\n}\n\n/**\n * Representation of a single event listener.\n *\n * @param {Function} fn The listener function.\n * @param {*} context The context to invoke the listener with.\n * @param {Boolean} [once=false] Specify if the listener is a one-time listener.\n * @constructor\n * @private\n */\nfunction EE(fn, context, once) {\n  this.fn = fn;\n  this.context = context;\n  this.once = once || false;\n}\n\n/**\n * Add a listener for a given event.\n *\n * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} context The context to invoke the listener with.\n * @param {Boolean} once Specify if the listener is a one-time listener.\n * @returns {EventEmitter}\n * @private\n */\nfunction addListener(emitter, event, fn, context, once) {\n  if (typeof fn !== 'function') {\n    throw new TypeError('The listener must be a function');\n  }\n\n  var listener = new EE(fn, context || emitter, once)\n    , evt = prefix ? prefix + event : event;\n\n  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;\n  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);\n  else emitter._events[evt] = [emitter._events[evt], listener];\n\n  return emitter;\n}\n\n/**\n * Clear event by name.\n *\n * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.\n * @param {(String|Symbol)} evt The Event name.\n * @private\n */\nfunction clearEvent(emitter, evt) {\n  if (--emitter._eventsCount === 0) emitter._events = new Events();\n  else delete emitter._events[evt];\n}\n\n/**\n * Minimal `EventEmitter` interface that is molded against the Node.js\n * `EventEmitter` interface.\n *\n * @constructor\n * @public\n */\nfunction EventEmitter() {\n  this._events = new Events();\n  this._eventsCount = 0;\n}\n\n/**\n * Return an array listing the events for which the emitter has registered\n * listeners.\n *\n * @returns {Array}\n * @public\n */\nEventEmitter.prototype.eventNames = function eventNames() {\n  var names = []\n    , events\n    , name;\n\n  if (this._eventsCount === 0) return names;\n\n  for (name in (events = this._events)) {\n    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);\n  }\n\n  if (Object.getOwnPropertySymbols) {\n    return names.concat(Object.getOwnPropertySymbols(events));\n  }\n\n  return names;\n};\n\n/**\n * Return the listeners registered for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Array} The registered listeners.\n * @public\n */\nEventEmitter.prototype.listeners = function listeners(event) {\n  var evt = prefix ? prefix + event : event\n    , handlers = this._events[evt];\n\n  if (!handlers) return [];\n  if (handlers.fn) return [handlers.fn];\n\n  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {\n    ee[i] = handlers[i].fn;\n  }\n\n  return ee;\n};\n\n/**\n * Return the number of listeners listening to a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Number} The number of listeners.\n * @public\n */\nEventEmitter.prototype.listenerCount = function listenerCount(event) {\n  var evt = prefix ? prefix + event : event\n    , listeners = this._events[evt];\n\n  if (!listeners) return 0;\n  if (listeners.fn) return 1;\n  return listeners.length;\n};\n\n/**\n * Calls each of the listeners registered for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Boolean} `true` if the event had listeners, else `false`.\n * @public\n */\nEventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {\n  var evt = prefix ? prefix + event : event;\n\n  if (!this._events[evt]) return false;\n\n  var listeners = this._events[evt]\n    , len = arguments.length\n    , args\n    , i;\n\n  if (listeners.fn) {\n    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);\n\n    switch (len) {\n      case 1: return listeners.fn.call(listeners.context), true;\n      case 2: return listeners.fn.call(listeners.context, a1), true;\n      case 3: return listeners.fn.call(listeners.context, a1, a2), true;\n      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;\n      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;\n      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;\n    }\n\n    for (i = 1, args = new Array(len -1); i < len; i++) {\n      args[i - 1] = arguments[i];\n    }\n\n    listeners.fn.apply(listeners.context, args);\n  } else {\n    var length = listeners.length\n      , j;\n\n    for (i = 0; i < length; i++) {\n      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);\n\n      switch (len) {\n        case 1: listeners[i].fn.call(listeners[i].context); break;\n        case 2: listeners[i].fn.call(listeners[i].context, a1); break;\n        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;\n        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;\n        default:\n          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {\n            args[j - 1] = arguments[j];\n          }\n\n          listeners[i].fn.apply(listeners[i].context, args);\n      }\n    }\n  }\n\n  return true;\n};\n\n/**\n * Add a listener for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} [context=this] The context to invoke the listener with.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.on = function on(event, fn, context) {\n  return addListener(this, event, fn, context, false);\n};\n\n/**\n * Add a one-time listener for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} [context=this] The context to invoke the listener with.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.once = function once(event, fn, context) {\n  return addListener(this, event, fn, context, true);\n};\n\n/**\n * Remove the listeners of a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn Only remove the listeners that match this function.\n * @param {*} context Only remove the listeners that have this context.\n * @param {Boolean} once Only remove one-time listeners.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {\n  var evt = prefix ? prefix + event : event;\n\n  if (!this._events[evt]) return this;\n  if (!fn) {\n    clearEvent(this, evt);\n    return this;\n  }\n\n  var listeners = this._events[evt];\n\n  if (listeners.fn) {\n    if (\n      listeners.fn === fn &&\n      (!once || listeners.once) &&\n      (!context || listeners.context === context)\n    ) {\n      clearEvent(this, evt);\n    }\n  } else {\n    for (var i = 0, events = [], length = listeners.length; i < length; i++) {\n      if (\n        listeners[i].fn !== fn ||\n        (once && !listeners[i].once) ||\n        (context && listeners[i].context !== context)\n      ) {\n        events.push(listeners[i]);\n      }\n    }\n\n    //\n    // Reset the array, or remove it completely if we have no more listeners.\n    //\n    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;\n    else clearEvent(this, evt);\n  }\n\n  return this;\n};\n\n/**\n * Remove all listeners, or those of the specified event.\n *\n * @param {(String|Symbol)} [event] The event name.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {\n  var evt;\n\n  if (event) {\n    evt = prefix ? prefix + event : event;\n    if (this._events[evt]) clearEvent(this, evt);\n  } else {\n    this._events = new Events();\n    this._eventsCount = 0;\n  }\n\n  return this;\n};\n\n//\n// Alias methods names because people roll like that.\n//\nEventEmitter.prototype.off = EventEmitter.prototype.removeListener;\nEventEmitter.prototype.addListener = EventEmitter.prototype.on;\n\n//\n// Expose the prefix.\n//\nEventEmitter.prefixed = prefix;\n\n//\n// Allow `EventEmitter` to be imported as module namespace.\n//\nEventEmitter.EventEmitter = EventEmitter;\n\n//\n// Expose the module.\n//\nif (true) {\n  module.exports = EventEmitter;\n}\n\n\n//# sourceURL=webpack:///./node_modules/eventemitter3/index.js?");

/***/ }),

/***/ "./node_modules/http-proxy-middleware/dist/config-factory.js":
/*!*******************************************************************!*\
  !*** ./node_modules/http-proxy-middleware/dist/config-factory.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst _ = __webpack_require__(/*! lodash */ \"lodash\");\nconst url = __webpack_require__(/*! url */ \"url\");\nconst errors_1 = __webpack_require__(/*! ./errors */ \"./node_modules/http-proxy-middleware/dist/errors.js\");\nconst logger_1 = __webpack_require__(/*! ./logger */ \"./node_modules/http-proxy-middleware/dist/logger.js\");\nconst logger = logger_1.getInstance();\nfunction createConfig(context, opts) {\n    // structure of config object to be returned\n    const config = {\n        context: undefined,\n        options: {}\n    };\n    // app.use('/api', proxy({target:'http://localhost:9000'}));\n    if (isContextless(context, opts)) {\n        config.context = '/';\n        config.options = _.assign(config.options, context);\n        // app.use('/api', proxy('http://localhost:9000'));\n        // app.use(proxy('http://localhost:9000/api'));\n    }\n    else if (isStringShortHand(context)) {\n        const oUrl = url.parse(context);\n        const target = [oUrl.protocol, '//', oUrl.host].join('');\n        config.context = oUrl.pathname || '/';\n        config.options = _.assign(config.options, { target }, opts);\n        if (oUrl.protocol === 'ws:' || oUrl.protocol === 'wss:') {\n            config.options.ws = true;\n        }\n        // app.use('/api', proxy({target:'http://localhost:9000'}));\n    }\n    else {\n        config.context = context;\n        config.options = _.assign(config.options, opts);\n    }\n    configureLogger(config.options);\n    if (!config.options.target) {\n        throw new Error(errors_1.ERRORS.ERR_CONFIG_FACTORY_TARGET_MISSING);\n    }\n    return config;\n}\nexports.createConfig = createConfig;\n/**\n * Checks if a String only target/config is provided.\n * This can be just the host or with the optional path.\n *\n * @example\n *      app.use('/api', proxy('http://localhost:9000'));\n *      app.use(proxy('http://localhost:9000/api'));\n *\n * @param  {String}  context [description]\n * @return {Boolean}         [description]\n */\nfunction isStringShortHand(context) {\n    if (_.isString(context)) {\n        return !!url.parse(context).host;\n    }\n}\n/**\n * Checks if a Object only config is provided, without a context.\n * In this case the all paths will be proxied.\n *\n * @example\n *     app.use('/api', proxy({target:'http://localhost:9000'}));\n *\n * @param  {Object}  context [description]\n * @param  {*}       opts    [description]\n * @return {Boolean}         [description]\n */\nfunction isContextless(context, opts) {\n    return _.isPlainObject(context) && _.isEmpty(opts);\n}\nfunction configureLogger(options) {\n    if (options.logLevel) {\n        logger.setLevel(options.logLevel);\n    }\n    if (options.logProvider) {\n        logger.setProvider(options.logProvider);\n    }\n}\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy-middleware/dist/config-factory.js?");

/***/ }),

/***/ "./node_modules/http-proxy-middleware/dist/context-matcher.js":
/*!********************************************************************!*\
  !*** ./node_modules/http-proxy-middleware/dist/context-matcher.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst isGlob = __webpack_require__(/*! is-glob */ \"is-glob\");\nconst _ = __webpack_require__(/*! lodash */ \"lodash\");\nconst micromatch = __webpack_require__(/*! micromatch */ \"micromatch\");\nconst url = __webpack_require__(/*! url */ \"url\");\nconst errors_1 = __webpack_require__(/*! ./errors */ \"./node_modules/http-proxy-middleware/dist/errors.js\");\nfunction match(context, uri, req) {\n    // single path\n    if (isStringPath(context)) {\n        return matchSingleStringPath(context, uri);\n    }\n    // single glob path\n    if (isGlobPath(context)) {\n        return matchSingleGlobPath(context, uri);\n    }\n    // multi path\n    if (Array.isArray(context)) {\n        if (context.every(isStringPath)) {\n            return matchMultiPath(context, uri);\n        }\n        if (context.every(isGlobPath)) {\n            return matchMultiGlobPath(context, uri);\n        }\n        throw new Error(errors_1.ERRORS.ERR_CONTEXT_MATCHER_INVALID_ARRAY);\n    }\n    // custom matching\n    if (_.isFunction(context)) {\n        const pathname = getUrlPathName(uri);\n        return context(pathname, req);\n    }\n    throw new Error(errors_1.ERRORS.ERR_CONTEXT_MATCHER_GENERIC);\n}\nexports.match = match;\n/**\n * @param  {String} context '/api'\n * @param  {String} uri     'http://example.org/api/b/c/d.html'\n * @return {Boolean}\n */\nfunction matchSingleStringPath(context, uri) {\n    const pathname = getUrlPathName(uri);\n    return pathname.indexOf(context) === 0;\n}\nfunction matchSingleGlobPath(pattern, uri) {\n    const pathname = getUrlPathName(uri);\n    const matches = micromatch([pathname], pattern);\n    return matches && matches.length > 0;\n}\nfunction matchMultiGlobPath(patternList, uri) {\n    return matchSingleGlobPath(patternList, uri);\n}\n/**\n * @param  {String} contextList ['/api', '/ajax']\n * @param  {String} uri     'http://example.org/api/b/c/d.html'\n * @return {Boolean}\n */\nfunction matchMultiPath(contextList, uri) {\n    let isMultiPath = false;\n    for (const context of contextList) {\n        if (matchSingleStringPath(context, uri)) {\n            isMultiPath = true;\n            break;\n        }\n    }\n    return isMultiPath;\n}\n/**\n * Parses URI and returns RFC 3986 path\n *\n * @param  {String} uri from req.url\n * @return {String}     RFC 3986 path\n */\nfunction getUrlPathName(uri) {\n    return uri && url.parse(uri).pathname;\n}\nfunction isStringPath(context) {\n    return _.isString(context) && !isGlob(context);\n}\nfunction isGlobPath(context) {\n    return isGlob(context);\n}\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy-middleware/dist/context-matcher.js?");

/***/ }),

/***/ "./node_modules/http-proxy-middleware/dist/errors.js":
/*!***********************************************************!*\
  !*** ./node_modules/http-proxy-middleware/dist/errors.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar ERRORS;\n(function (ERRORS) {\n    ERRORS[\"ERR_CONFIG_FACTORY_TARGET_MISSING\"] = \"[HPM] Missing \\\"target\\\" option. Example: {target: \\\"http://www.example.org\\\"}\";\n    ERRORS[\"ERR_CONTEXT_MATCHER_GENERIC\"] = \"[HPM] Invalid context. Expecting something like: \\\"/api\\\" or [\\\"/api\\\", \\\"/ajax\\\"]\";\n    ERRORS[\"ERR_CONTEXT_MATCHER_INVALID_ARRAY\"] = \"[HPM] Invalid context. Expecting something like: [\\\"/api\\\", \\\"/ajax\\\"] or [\\\"/api/**\\\", \\\"!**.html\\\"]\";\n    ERRORS[\"ERR_PATH_REWRITER_CONFIG\"] = \"[HPM] Invalid pathRewrite config. Expecting object with pathRewrite config or a rewrite function\";\n})(ERRORS = exports.ERRORS || (exports.ERRORS = {}));\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy-middleware/dist/errors.js?");

/***/ }),

/***/ "./node_modules/http-proxy-middleware/dist/handlers.js":
/*!*************************************************************!*\
  !*** ./node_modules/http-proxy-middleware/dist/handlers.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst _ = __webpack_require__(/*! lodash */ \"lodash\");\nconst logger_1 = __webpack_require__(/*! ./logger */ \"./node_modules/http-proxy-middleware/dist/logger.js\");\nconst logger = logger_1.getInstance();\nfunction init(proxy, option) {\n    const handlers = getHandlers(option);\n    for (const eventName of Object.keys(handlers)) {\n        proxy.on(eventName, handlers[eventName]);\n    }\n    logger.debug('[HPM] Subscribed to http-proxy events:', Object.keys(handlers));\n}\nexports.init = init;\nfunction getHandlers(options) {\n    // https://github.com/nodejitsu/node-http-proxy#listening-for-proxy-events\n    const proxyEvents = [\n        'error',\n        'proxyReq',\n        'proxyReqWs',\n        'proxyRes',\n        'open',\n        'close'\n    ];\n    const handlers = {};\n    for (const event of proxyEvents) {\n        // all handlers for the http-proxy events are prefixed with 'on'.\n        // loop through options and try to find these handlers\n        // and add them to the handlers object for subscription in init().\n        const eventName = _.camelCase('on ' + event);\n        const fnHandler = _.get(options, eventName);\n        if (_.isFunction(fnHandler)) {\n            handlers[event] = fnHandler;\n        }\n    }\n    // add default error handler in absence of error handler\n    if (!_.isFunction(handlers.error)) {\n        handlers.error = defaultErrorHandler;\n    }\n    // add default close handler in absence of close handler\n    if (!_.isFunction(handlers.close)) {\n        handlers.close = logClose;\n    }\n    return handlers;\n}\nexports.getHandlers = getHandlers;\nfunction defaultErrorHandler(err, req, res) {\n    const host = req.headers && req.headers.host;\n    const code = err.code;\n    if (res.writeHead && !res.headersSent) {\n        if (/HPE_INVALID/.test(code)) {\n            res.writeHead(502);\n        }\n        else {\n            switch (code) {\n                case 'ECONNRESET':\n                case 'ENOTFOUND':\n                case 'ECONNREFUSED':\n                    res.writeHead(504);\n                    break;\n                default:\n                    res.writeHead(500);\n            }\n        }\n    }\n    res.end('Error occured while trying to proxy to: ' + host + req.url);\n}\nfunction logClose(req, socket, head) {\n    // view disconnected websocket connections\n    logger.info('[HPM] Client disconnected');\n}\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy-middleware/dist/handlers.js?");

/***/ }),

/***/ "./node_modules/http-proxy-middleware/dist/http-proxy-middleware.js":
/*!**************************************************************************!*\
  !*** ./node_modules/http-proxy-middleware/dist/http-proxy-middleware.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst httpProxy = __webpack_require__(/*! http-proxy */ \"./node_modules/http-proxy/index.js\");\nconst _ = __webpack_require__(/*! lodash */ \"lodash\");\nconst config_factory_1 = __webpack_require__(/*! ./config-factory */ \"./node_modules/http-proxy-middleware/dist/config-factory.js\");\nconst contextMatcher = __webpack_require__(/*! ./context-matcher */ \"./node_modules/http-proxy-middleware/dist/context-matcher.js\");\nconst handlers = __webpack_require__(/*! ./handlers */ \"./node_modules/http-proxy-middleware/dist/handlers.js\");\nconst logger_1 = __webpack_require__(/*! ./logger */ \"./node_modules/http-proxy-middleware/dist/logger.js\");\nconst PathRewriter = __webpack_require__(/*! ./path-rewriter */ \"./node_modules/http-proxy-middleware/dist/path-rewriter.js\");\nconst Router = __webpack_require__(/*! ./router */ \"./node_modules/http-proxy-middleware/dist/router.js\");\nclass HttpProxyMiddleware {\n    constructor(context, opts) {\n        this.logger = logger_1.getInstance();\n        this.wsInternalSubscribed = false;\n        // https://github.com/Microsoft/TypeScript/wiki/'this'-in-TypeScript#red-flags-for-this\n        this.middleware = (req, res, next) => __awaiter(this, void 0, void 0, function* () {\n            if (this.shouldProxy(this.config.context, req)) {\n                const activeProxyOptions = this.prepareProxyRequest(req);\n                this.proxy.web(req, res, activeProxyOptions);\n            }\n            else {\n                next();\n            }\n            if (this.proxyOptions.ws === true) {\n                // use initial request to access the server object to subscribe to http upgrade event\n                this.catchUpgradeRequest(req.connection.server);\n            }\n        });\n        this.catchUpgradeRequest = server => {\n            if (!this.wsInternalSubscribed) {\n                server.on('upgrade', this.handleUpgrade);\n                // prevent duplicate upgrade handling;\n                // in case external upgrade is also configured\n                this.wsInternalSubscribed = true;\n            }\n        };\n        this.handleUpgrade = (req, socket, head) => {\n            if (this.shouldProxy(this.config.context, req)) {\n                const activeProxyOptions = this.prepareProxyRequest(req);\n                this.proxy.ws(req, socket, head, activeProxyOptions);\n                this.logger.info('[HPM] Upgrading to WebSocket');\n            }\n        };\n        /**\n         * Determine whether request should be proxied.\n         *\n         * @private\n         * @param  {String} context [description]\n         * @param  {Object} req     [description]\n         * @return {Boolean}\n         */\n        this.shouldProxy = (context, req) => {\n            const path = req.originalUrl || req.url;\n            return contextMatcher.match(context, path, req);\n        };\n        /**\n         * Apply option.router and option.pathRewrite\n         * Order matters:\n         *    Router uses original path for routing;\n         *    NOT the modified path, after it has been rewritten by pathRewrite\n         * @param {Object} req\n         * @return {Object} proxy options\n         */\n        this.prepareProxyRequest = req => {\n            // https://github.com/chimurai/http-proxy-middleware/issues/17\n            // https://github.com/chimurai/http-proxy-middleware/issues/94\n            req.url = req.originalUrl || req.url;\n            // store uri before it gets rewritten for logging\n            const originalPath = req.url;\n            const newProxyOptions = _.assign({}, this.proxyOptions);\n            // Apply in order:\n            // 1. option.router\n            // 2. option.pathRewrite\n            this.applyRouter(req, newProxyOptions);\n            this.applyPathRewrite(req, this.pathRewriter);\n            // debug logging for both http(s) and websockets\n            if (this.proxyOptions.logLevel === 'debug') {\n                const arrow = logger_1.getArrow(originalPath, req.url, this.proxyOptions.target, newProxyOptions.target);\n                this.logger.debug('[HPM] %s %s %s %s', req.method, originalPath, arrow, newProxyOptions.target);\n            }\n            return newProxyOptions;\n        };\n        // Modify option.target when router present.\n        this.applyRouter = (req, options) => {\n            let newTarget;\n            if (options.router) {\n                newTarget = Router.getTarget(req, options);\n                if (newTarget) {\n                    this.logger.debug('[HPM] Router new target: %s -> \"%s\"', options.target, newTarget);\n                    options.target = newTarget;\n                }\n            }\n        };\n        // rewrite path\n        this.applyPathRewrite = (req, pathRewriter) => {\n            if (pathRewriter) {\n                const path = pathRewriter(req.url, req);\n                if (typeof path === 'string') {\n                    req.url = path;\n                }\n                else {\n                    this.logger.info('[HPM] pathRewrite: No rewritten path found. (%s)', req.url);\n                }\n            }\n        };\n        this.logError = (err, req, res) => {\n            const hostname = (req.headers && req.headers.host) || (req.hostname || req.host); // (websocket) || (node0.10 || node 4/5)\n            const target = this.proxyOptions.target.host || this.proxyOptions.target;\n            const errorMessage = '[HPM] Error occurred while trying to proxy request %s from %s to %s (%s) (%s)';\n            const errReference = 'https://nodejs.org/api/errors.html#errors_common_system_errors'; // link to Node Common Systems Errors page\n            this.logger.error(errorMessage, req.url, hostname, target, err.code || err, errReference);\n        };\n        this.config = config_factory_1.createConfig(context, opts);\n        this.proxyOptions = this.config.options;\n        // create proxy\n        this.proxy = httpProxy.createProxyServer({});\n        this.logger.info(`[HPM] Proxy created: ${this.config.context}  -> ${this.proxyOptions.target}`);\n        this.pathRewriter = PathRewriter.createPathRewriter(this.proxyOptions.pathRewrite); // returns undefined when \"pathRewrite\" is not provided\n        // attach handler to http-proxy events\n        handlers.init(this.proxy, this.proxyOptions);\n        // log errors for debug purpose\n        this.proxy.on('error', this.logError);\n        // https://github.com/chimurai/http-proxy-middleware/issues/19\n        // expose function to upgrade externally\n        this.middleware.upgrade = (req, socket, head) => {\n            if (!this.wsInternalSubscribed) {\n                this.handleUpgrade(req, socket, head);\n            }\n        };\n    }\n}\nexports.HttpProxyMiddleware = HttpProxyMiddleware;\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy-middleware/dist/http-proxy-middleware.js?");

/***/ }),

/***/ "./node_modules/http-proxy-middleware/dist/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/http-proxy-middleware/dist/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst http_proxy_middleware_1 = __webpack_require__(/*! ./http-proxy-middleware */ \"./node_modules/http-proxy-middleware/dist/http-proxy-middleware.js\");\nfunction proxy(context, opts) {\n    const { middleware } = new http_proxy_middleware_1.HttpProxyMiddleware(context, opts);\n    return middleware;\n}\nmodule.exports = proxy;\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy-middleware/dist/index.js?");

/***/ }),

/***/ "./node_modules/http-proxy-middleware/dist/logger.js":
/*!***********************************************************!*\
  !*** ./node_modules/http-proxy-middleware/dist/logger.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst _ = __webpack_require__(/*! lodash */ \"lodash\");\nconst util = __webpack_require__(/*! util */ \"util\");\nlet loggerInstance;\nconst defaultProvider = {\n    // tslint:disable: no-console\n    log: console.log,\n    debug: console.log,\n    info: console.info,\n    warn: console.warn,\n    error: console.error\n};\n// log level 'weight'\nvar LEVELS;\n(function (LEVELS) {\n    LEVELS[LEVELS[\"debug\"] = 10] = \"debug\";\n    LEVELS[LEVELS[\"info\"] = 20] = \"info\";\n    LEVELS[LEVELS[\"warn\"] = 30] = \"warn\";\n    LEVELS[LEVELS[\"error\"] = 50] = \"error\";\n    LEVELS[LEVELS[\"silent\"] = 80] = \"silent\";\n})(LEVELS || (LEVELS = {}));\nfunction getInstance() {\n    if (!loggerInstance) {\n        loggerInstance = new Logger();\n    }\n    return loggerInstance;\n}\nexports.getInstance = getInstance;\nclass Logger {\n    constructor() {\n        this.setLevel('info');\n        this.setProvider(() => defaultProvider);\n    }\n    // log will log messages, regardless of logLevels\n    log() {\n        this.provider.log(this._interpolate.apply(null, arguments));\n    }\n    debug() {\n        if (this._showLevel('debug')) {\n            this.provider.debug(this._interpolate.apply(null, arguments));\n        }\n    }\n    info() {\n        if (this._showLevel('info')) {\n            this.provider.info(this._interpolate.apply(null, arguments));\n        }\n    }\n    warn() {\n        if (this._showLevel('warn')) {\n            this.provider.warn(this._interpolate.apply(null, arguments));\n        }\n    }\n    error() {\n        if (this._showLevel('error')) {\n            this.provider.error(this._interpolate.apply(null, arguments));\n        }\n    }\n    setLevel(v) {\n        if (this.isValidLevel(v)) {\n            this.logLevel = v;\n        }\n    }\n    setProvider(fn) {\n        if (fn && this.isValidProvider(fn)) {\n            this.provider = fn(defaultProvider);\n        }\n    }\n    isValidProvider(fnProvider) {\n        const result = true;\n        if (fnProvider && !_.isFunction(fnProvider)) {\n            throw new Error('[HPM] Log provider config error. Expecting a function.');\n        }\n        return result;\n    }\n    isValidLevel(levelName) {\n        const validLevels = Object.keys(LEVELS);\n        const isValid = validLevels.includes(levelName);\n        if (!isValid) {\n            throw new Error('[HPM] Log level error. Invalid logLevel.');\n        }\n        return isValid;\n    }\n    /**\n     * Decide to log or not to log, based on the log levels 'weight'\n     * @param  {String}  showLevel [debug, info, warn, error, silent]\n     * @return {Boolean}\n     */\n    _showLevel(showLevel) {\n        let result = false;\n        const currentLogLevel = LEVELS[this.logLevel];\n        if (currentLogLevel && currentLogLevel <= LEVELS[showLevel]) {\n            result = true;\n        }\n        return result;\n    }\n    // make sure logged messages and its data are return interpolated\n    // make it possible for additional log data, such date/time or custom prefix.\n    _interpolate() {\n        const fn = _.spread(util.format);\n        const result = fn(_.slice(arguments));\n        return result;\n    }\n}\n/**\n * -> normal proxy\n * => router\n * ~> pathRewrite\n * ≈> router + pathRewrite\n *\n * @param  {String} originalPath\n * @param  {String} newPath\n * @param  {String} originalTarget\n * @param  {String} newTarget\n * @return {String}\n */\nfunction getArrow(originalPath, newPath, originalTarget, newTarget) {\n    const arrow = ['>'];\n    const isNewTarget = originalTarget !== newTarget; // router\n    const isNewPath = originalPath !== newPath; // pathRewrite\n    if (isNewPath && !isNewTarget) {\n        arrow.unshift('~');\n    }\n    else if (!isNewPath && isNewTarget) {\n        arrow.unshift('=');\n    }\n    else if (isNewPath && isNewTarget) {\n        arrow.unshift('≈');\n    }\n    else {\n        arrow.unshift('-');\n    }\n    return arrow.join('');\n}\nexports.getArrow = getArrow;\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy-middleware/dist/logger.js?");

/***/ }),

/***/ "./node_modules/http-proxy-middleware/dist/path-rewriter.js":
/*!******************************************************************!*\
  !*** ./node_modules/http-proxy-middleware/dist/path-rewriter.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst _ = __webpack_require__(/*! lodash */ \"lodash\");\nconst errors_1 = __webpack_require__(/*! ./errors */ \"./node_modules/http-proxy-middleware/dist/errors.js\");\nconst logger_1 = __webpack_require__(/*! ./logger */ \"./node_modules/http-proxy-middleware/dist/logger.js\");\nconst logger = logger_1.getInstance();\n/**\n * Create rewrite function, to cache parsed rewrite rules.\n *\n * @param {Object} rewriteConfig\n * @return {Function} Function to rewrite paths; This function should accept `path` (request.url) as parameter\n */\nfunction createPathRewriter(rewriteConfig) {\n    let rulesCache;\n    if (!isValidRewriteConfig(rewriteConfig)) {\n        return;\n    }\n    if (_.isFunction(rewriteConfig)) {\n        const customRewriteFn = rewriteConfig;\n        return customRewriteFn;\n    }\n    else {\n        rulesCache = parsePathRewriteRules(rewriteConfig);\n        return rewritePath;\n    }\n    function rewritePath(path) {\n        let result = path;\n        _.forEach(rulesCache, rule => {\n            if (rule.regex.test(path)) {\n                result = result.replace(rule.regex, rule.value);\n                logger.debug('[HPM] Rewriting path from \"%s\" to \"%s\"', path, result);\n                return false;\n            }\n        });\n        return result;\n    }\n}\nexports.createPathRewriter = createPathRewriter;\nfunction isValidRewriteConfig(rewriteConfig) {\n    if (_.isFunction(rewriteConfig)) {\n        return true;\n    }\n    else if (!_.isEmpty(rewriteConfig) && _.isPlainObject(rewriteConfig)) {\n        return true;\n    }\n    else if (_.isUndefined(rewriteConfig) ||\n        _.isNull(rewriteConfig) ||\n        _.isEqual(rewriteConfig, {})) {\n        return false;\n    }\n    else {\n        throw new Error(errors_1.ERRORS.ERR_PATH_REWRITER_CONFIG);\n    }\n}\nfunction parsePathRewriteRules(rewriteConfig) {\n    const rules = [];\n    if (_.isPlainObject(rewriteConfig)) {\n        _.forIn(rewriteConfig, (value, key) => {\n            rules.push({\n                regex: new RegExp(key),\n                value: rewriteConfig[key]\n            });\n            logger.info('[HPM] Proxy rewrite rule created: \"%s\" ~> \"%s\"', key, rewriteConfig[key]);\n        });\n    }\n    return rules;\n}\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy-middleware/dist/path-rewriter.js?");

/***/ }),

/***/ "./node_modules/http-proxy-middleware/dist/router.js":
/*!***********************************************************!*\
  !*** ./node_modules/http-proxy-middleware/dist/router.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst _ = __webpack_require__(/*! lodash */ \"lodash\");\nconst logger_1 = __webpack_require__(/*! ./logger */ \"./node_modules/http-proxy-middleware/dist/logger.js\");\nconst logger = logger_1.getInstance();\nfunction getTarget(req, config) {\n    let newTarget;\n    const router = config.router;\n    if (_.isPlainObject(router)) {\n        newTarget = getTargetFromProxyTable(req, router);\n    }\n    else if (_.isFunction(router)) {\n        newTarget = router(req);\n    }\n    return newTarget;\n}\nexports.getTarget = getTarget;\nfunction getTargetFromProxyTable(req, table) {\n    let result;\n    const host = req.headers.host;\n    const path = req.url;\n    const hostAndPath = host + path;\n    _.forIn(table, (value, key) => {\n        if (containsPath(key)) {\n            if (hostAndPath.indexOf(key) > -1) {\n                // match 'localhost:3000/api'\n                result = table[key];\n                logger.debug('[HPM] Router table match: \"%s\"', key);\n                return false;\n            }\n        }\n        else {\n            if (key === host) {\n                // match 'localhost:3000'\n                result = table[key];\n                logger.debug('[HPM] Router table match: \"%s\"', host);\n                return false;\n            }\n        }\n    });\n    return result;\n}\nfunction containsPath(v) {\n    return v.indexOf('/') > -1;\n}\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy-middleware/dist/router.js?");

/***/ }),

/***/ "./node_modules/http-proxy/index.js":
/*!******************************************!*\
  !*** ./node_modules/http-proxy/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*!\n * Caron dimonio, con occhi di bragia\n * loro accennando, tutte le raccoglie;\n * batte col remo qualunque s’adagia \n *\n * Charon the demon, with the eyes of glede,\n * Beckoning to them, collects them all together,\n * Beats with his oar whoever lags behind\n *          \n *          Dante - The Divine Comedy (Canto III)\n */\n\nmodule.exports = __webpack_require__(/*! ./lib/http-proxy */ \"./node_modules/http-proxy/lib/http-proxy.js\");\n\n//# sourceURL=webpack:///./node_modules/http-proxy/index.js?");

/***/ }),

/***/ "./node_modules/http-proxy/lib/http-proxy.js":
/*!***************************************************!*\
  !*** ./node_modules/http-proxy/lib/http-proxy.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval(" // Use explicit /index.js to help browserify negociation in require '/lib/http-proxy' (!)\nvar ProxyServer = __webpack_require__(/*! ./http-proxy/index.js */ \"./node_modules/http-proxy/lib/http-proxy/index.js\").Server;\n\n\n/**\n * Creates the proxy server.\n *\n * Examples:\n *\n *    httpProxy.createProxyServer({ .. }, 8000)\n *    // => '{ web: [Function], ws: [Function] ... }'\n *\n * @param {Object} Options Config object passed to the proxy\n *\n * @return {Object} Proxy Proxy object with handlers for `ws` and `web` requests\n *\n * @api public\n */\n\n\nfunction createProxyServer(options) {\n  /*\n   *  `options` is needed and it must have the following layout:\n   *\n   *  {\n   *    target : <url string to be parsed with the url module>\n   *    forward: <url string to be parsed with the url module>\n   *    agent  : <object to be passed to http(s).request>\n   *    ssl    : <object to be passed to https.createServer()>\n   *    ws     : <true/false, if you want to proxy websockets>\n   *    xfwd   : <true/false, adds x-forward headers>\n   *    secure : <true/false, verify SSL certificate>\n   *    toProxy: <true/false, explicitly specify if we are proxying to another proxy>\n   *    prependPath: <true/false, Default: true - specify whether you want to prepend the target's path to the proxy path>\n   *    ignorePath: <true/false, Default: false - specify whether you want to ignore the proxy path of the incoming request>\n   *    localAddress : <Local interface string to bind for outgoing connections>\n   *    changeOrigin: <true/false, Default: false - changes the origin of the host header to the target URL>\n   *    preserveHeaderKeyCase: <true/false, Default: false - specify whether you want to keep letter case of response header key >\n   *    auth   : Basic authentication i.e. 'user:password' to compute an Authorization header.\n   *    hostRewrite: rewrites the location hostname on (201/301/302/307/308) redirects, Default: null.\n   *    autoRewrite: rewrites the location host/port on (201/301/302/307/308) redirects based on requested host/port. Default: false.\n   *    protocolRewrite: rewrites the location protocol on (201/301/302/307/308) redirects to 'http' or 'https'. Default: null.\n   *  }\n   *\n   *  NOTE: `options.ws` and `options.ssl` are optional.\n   *    `options.target and `options.forward` cannot be\n   *    both missing\n   *  }\n   */\n\n  return new ProxyServer(options);\n}\n\n\nProxyServer.createProxyServer = createProxyServer;\nProxyServer.createServer      = createProxyServer;\nProxyServer.createProxy       = createProxyServer;\n\n\n\n\n/**\n * Export the proxy \"Server\" as the main export.\n */\nmodule.exports = ProxyServer;\n\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy/lib/http-proxy.js?");

/***/ }),

/***/ "./node_modules/http-proxy/lib/http-proxy/common.js":
/*!**********************************************************!*\
  !*** ./node_modules/http-proxy/lib/http-proxy/common.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var common   = exports,\n    url      = __webpack_require__(/*! url */ \"url\"),\n    extend   = __webpack_require__(/*! util */ \"util\")._extend,\n    required = __webpack_require__(/*! requires-port */ \"./node_modules/requires-port/index.js\");\n\nvar upgradeHeader = /(^|,)\\s*upgrade\\s*($|,)/i,\n    isSSL = /^https|wss/;\n\n/**\n * Simple Regex for testing if protocol is https\n */\ncommon.isSSL = isSSL;\n/**\n * Copies the right headers from `options` and `req` to\n * `outgoing` which is then used to fire the proxied\n * request.\n *\n * Examples:\n *\n *    common.setupOutgoing(outgoing, options, req)\n *    // => { host: ..., hostname: ...}\n *\n * @param {Object} Outgoing Base object to be filled with required properties\n * @param {Object} Options Config object passed to the proxy\n * @param {ClientRequest} Req Request Object\n * @param {String} Forward String to select forward or target\n * \n * @return {Object} Outgoing Object with all required properties set\n *\n * @api private\n */\n\ncommon.setupOutgoing = function(outgoing, options, req, forward) {\n  outgoing.port = options[forward || 'target'].port ||\n                  (isSSL.test(options[forward || 'target'].protocol) ? 443 : 80);\n\n  ['host', 'hostname', 'socketPath', 'pfx', 'key',\n    'passphrase', 'cert', 'ca', 'ciphers', 'secureProtocol'].forEach(\n    function(e) { outgoing[e] = options[forward || 'target'][e]; }\n  );\n\n  outgoing.method = options.method || req.method;\n  outgoing.headers = extend({}, req.headers);\n\n  if (options.headers){\n    extend(outgoing.headers, options.headers);\n  }\n\n  if (options.auth) {\n    outgoing.auth = options.auth;\n  }\n  \n  if (options.ca) {\n      outgoing.ca = options.ca;\n  }\n\n  if (isSSL.test(options[forward || 'target'].protocol)) {\n    outgoing.rejectUnauthorized = (typeof options.secure === \"undefined\") ? true : options.secure;\n  }\n\n\n  outgoing.agent = options.agent || false;\n  outgoing.localAddress = options.localAddress;\n\n  //\n  // Remark: If we are false and not upgrading, set the connection: close. This is the right thing to do\n  // as node core doesn't handle this COMPLETELY properly yet.\n  //\n  if (!outgoing.agent) {\n    outgoing.headers = outgoing.headers || {};\n    if (typeof outgoing.headers.connection !== 'string'\n        || !upgradeHeader.test(outgoing.headers.connection)\n       ) { outgoing.headers.connection = 'close'; }\n  }\n\n\n  // the final path is target path + relative path requested by user:\n  var target = options[forward || 'target'];\n  var targetPath = target && options.prependPath !== false\n    ? (target.path || '')\n    : '';\n\n  //\n  // Remark: Can we somehow not use url.parse as a perf optimization?\n  //\n  var outgoingPath = !options.toProxy\n    ? (url.parse(req.url).path || '')\n    : req.url;\n\n  //\n  // Remark: ignorePath will just straight up ignore whatever the request's\n  // path is. This can be labeled as FOOT-GUN material if you do not know what\n  // you are doing and are using conflicting options.\n  //\n  outgoingPath = !options.ignorePath ? outgoingPath : '';\n\n  outgoing.path = common.urlJoin(targetPath, outgoingPath);\n\n  if (options.changeOrigin) {\n    outgoing.headers.host =\n      required(outgoing.port, options[forward || 'target'].protocol) && !hasPort(outgoing.host)\n        ? outgoing.host + ':' + outgoing.port\n        : outgoing.host;\n  }\n  return outgoing;\n};\n\n/**\n * Set the proper configuration for sockets,\n * set no delay and set keep alive, also set\n * the timeout to 0.\n *\n * Examples:\n *\n *    common.setupSocket(socket)\n *    // => Socket\n *\n * @param {Socket} Socket instance to setup\n * \n * @return {Socket} Return the configured socket.\n *\n * @api private\n */\n\ncommon.setupSocket = function(socket) {\n  socket.setTimeout(0);\n  socket.setNoDelay(true);\n\n  socket.setKeepAlive(true, 0);\n\n  return socket;\n};\n\n/**\n * Get the port number from the host. Or guess it based on the connection type.\n *\n * @param {Request} req Incoming HTTP request.\n *\n * @return {String} The port number.\n *\n * @api private\n */\ncommon.getPort = function(req) {\n  var res = req.headers.host ? req.headers.host.match(/:(\\d+)/) : '';\n\n  return res ?\n    res[1] :\n    common.hasEncryptedConnection(req) ? '443' : '80';\n};\n\n/**\n * Check if the request has an encrypted connection.\n *\n * @param {Request} req Incoming HTTP request.\n *\n * @return {Boolean} Whether the connection is encrypted or not.\n *\n * @api private\n */\ncommon.hasEncryptedConnection = function(req) {\n  return Boolean(req.connection.encrypted || req.connection.pair);\n};\n\n/**\n * OS-agnostic join (doesn't break on URLs like path.join does on Windows)>\n *\n * @return {String} The generated path.\n *\n * @api private\n */\n\ncommon.urlJoin = function() {\n    //\n    // We do not want to mess with the query string. All we want to touch is the path.\n    //\n  var args = Array.prototype.slice.call(arguments),\n      lastIndex = args.length - 1,\n      last = args[lastIndex],\n      lastSegs = last.split('?'),\n      retSegs;\n\n  args[lastIndex] = lastSegs.shift();\n\n  //\n  // Join all strings, but remove empty strings so we don't get extra slashes from\n  // joining e.g. ['', 'am']\n  //\n  retSegs = [\n    args.filter(Boolean).join('/')\n        .replace(/\\/+/g, '/')\n        .replace('http:/', 'http://')\n        .replace('https:/', 'https://')\n  ];\n\n  // Only join the query string if it exists so we don't have trailing a '?'\n  // on every request\n\n  // Handle case where there could be multiple ? in the URL.\n  retSegs.push.apply(retSegs, lastSegs);\n\n  return retSegs.join('?')\n};\n\n/**\n * Rewrites or removes the domain of a cookie header\n *\n * @param {String|Array} Header\n * @param {Object} Config, mapping of domain to rewritten domain.\n *                 '*' key to match any domain, null value to remove the domain.\n *\n * @api private\n */\ncommon.rewriteCookieProperty = function rewriteCookieProperty(header, config, property) {\n  if (Array.isArray(header)) {\n    return header.map(function (headerElement) {\n      return rewriteCookieProperty(headerElement, config, property);\n    });\n  }\n  return header.replace(new RegExp(\"(;\\\\s*\" + property + \"=)([^;]+)\", 'i'), function(match, prefix, previousValue) {\n    var newValue;\n    if (previousValue in config) {\n      newValue = config[previousValue];\n    } else if ('*' in config) {\n      newValue = config['*'];\n    } else {\n      //no match, return previous value\n      return match;\n    }\n    if (newValue) {\n      //replace value\n      return prefix + newValue;\n    } else {\n      //remove value\n      return '';\n    }\n  });\n};\n\n/**\n * Check the host and see if it potentially has a port in it (keep it simple)\n *\n * @returns {Boolean} Whether we have one or not\n *\n * @api private\n */\nfunction hasPort(host) {\n  return !!~host.indexOf(':');\n};\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy/lib/http-proxy/common.js?");

/***/ }),

/***/ "./node_modules/http-proxy/lib/http-proxy/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/http-proxy/lib/http-proxy/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var httpProxy = module.exports,\n    extend    = __webpack_require__(/*! util */ \"util\")._extend,\n    parse_url = __webpack_require__(/*! url */ \"url\").parse,\n    EE3       = __webpack_require__(/*! eventemitter3 */ \"./node_modules/eventemitter3/index.js\"),\n    http      = __webpack_require__(/*! http */ \"http\"),\n    https     = __webpack_require__(/*! https */ \"https\"),\n    web       = __webpack_require__(/*! ./passes/web-incoming */ \"./node_modules/http-proxy/lib/http-proxy/passes/web-incoming.js\"),\n    ws        = __webpack_require__(/*! ./passes/ws-incoming */ \"./node_modules/http-proxy/lib/http-proxy/passes/ws-incoming.js\");\n\nhttpProxy.Server = ProxyServer;\n\n/**\n * Returns a function that creates the loader for\n * either `ws` or `web`'s  passes.\n *\n * Examples:\n *\n *    httpProxy.createRightProxy('ws')\n *    // => [Function]\n *\n * @param {String} Type Either 'ws' or 'web'\n * \n * @return {Function} Loader Function that when called returns an iterator for the right passes\n *\n * @api private\n */\n\nfunction createRightProxy(type) {\n\n  return function(options) {\n    return function(req, res /*, [head], [opts] */) {\n      var passes = (type === 'ws') ? this.wsPasses : this.webPasses,\n          args = [].slice.call(arguments),\n          cntr = args.length - 1,\n          head, cbl;\n\n      /* optional args parse begin */\n      if(typeof args[cntr] === 'function') {\n        cbl = args[cntr];\n\n        cntr--;\n      }\n\n      var requestOptions = options;\n      if(\n        !(args[cntr] instanceof Buffer) &&\n        args[cntr] !== res\n      ) {\n        //Copy global options\n        requestOptions = extend({}, options);\n        //Overwrite with request options\n        extend(requestOptions, args[cntr]);\n\n        cntr--;\n      }\n\n      if(args[cntr] instanceof Buffer) {\n        head = args[cntr];\n      }\n\n      /* optional args parse end */\n\n      ['target', 'forward'].forEach(function(e) {\n        if (typeof requestOptions[e] === 'string')\n          requestOptions[e] = parse_url(requestOptions[e]);\n      });\n\n      if (!requestOptions.target && !requestOptions.forward) {\n        return this.emit('error', new Error('Must provide a proper URL as target'));\n      }\n\n      for(var i=0; i < passes.length; i++) {\n        /**\n         * Call of passes functions\n         * pass(req, res, options, head)\n         *\n         * In WebSockets case the `res` variable\n         * refer to the connection socket\n         * pass(req, socket, options, head)\n         */\n        if(passes[i](req, res, requestOptions, head, this, cbl)) { // passes can return a truthy value to halt the loop\n          break;\n        }\n      }\n    };\n  };\n}\nhttpProxy.createRightProxy = createRightProxy;\n\nfunction ProxyServer(options) {\n  EE3.call(this);\n\n  options = options || {};\n  options.prependPath = options.prependPath === false ? false : true;\n\n  this.web = this.proxyRequest           = createRightProxy('web')(options);\n  this.ws  = this.proxyWebsocketRequest  = createRightProxy('ws')(options);\n  this.options = options;\n\n  this.webPasses = Object.keys(web).map(function(pass) {\n    return web[pass];\n  });\n\n  this.wsPasses = Object.keys(ws).map(function(pass) {\n    return ws[pass];\n  });\n\n  this.on('error', this.onError, this);\n\n}\n\n__webpack_require__(/*! util */ \"util\").inherits(ProxyServer, EE3);\n\nProxyServer.prototype.onError = function (err) {\n  //\n  // Remark: Replicate node core behavior using EE3\n  // so we force people to handle their own errors\n  //\n  if(this.listeners('error').length === 1) {\n    throw err;\n  }\n};\n\nProxyServer.prototype.listen = function(port, hostname) {\n  var self    = this,\n      closure = function(req, res) { self.web(req, res); };\n\n  this._server  = this.options.ssl ?\n    https.createServer(this.options.ssl, closure) :\n    http.createServer(closure);\n\n  if(this.options.ws) {\n    this._server.on('upgrade', function(req, socket, head) { self.ws(req, socket, head); });\n  }\n\n  this._server.listen(port, hostname);\n\n  return this;\n};\n\nProxyServer.prototype.close = function(callback) {\n  var self = this;\n  if (this._server) {\n    this._server.close(done);\n  }\n\n  // Wrap callback to nullify server after all open connections are closed.\n  function done() {\n    self._server = null;\n    if (callback) {\n      callback.apply(null, arguments);\n    }\n  };\n};\n\nProxyServer.prototype.before = function(type, passName, callback) {\n  if (type !== 'ws' && type !== 'web') {\n    throw new Error('type must be `web` or `ws`');\n  }\n  var passes = (type === 'ws') ? this.wsPasses : this.webPasses,\n      i = false;\n\n  passes.forEach(function(v, idx) {\n    if(v.name === passName) i = idx;\n  })\n\n  if(i === false) throw new Error('No such pass');\n\n  passes.splice(i, 0, callback);\n};\nProxyServer.prototype.after = function(type, passName, callback) {\n  if (type !== 'ws' && type !== 'web') {\n    throw new Error('type must be `web` or `ws`');\n  }\n  var passes = (type === 'ws') ? this.wsPasses : this.webPasses,\n      i = false;\n\n  passes.forEach(function(v, idx) {\n    if(v.name === passName) i = idx;\n  })\n\n  if(i === false) throw new Error('No such pass');\n\n  passes.splice(i++, 0, callback);\n};\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy/lib/http-proxy/index.js?");

/***/ }),

/***/ "./node_modules/http-proxy/lib/http-proxy/passes/web-incoming.js":
/*!***********************************************************************!*\
  !*** ./node_modules/http-proxy/lib/http-proxy/passes/web-incoming.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var httpNative   = __webpack_require__(/*! http */ \"http\"),\n    httpsNative  = __webpack_require__(/*! https */ \"https\"),\n    web_o  = __webpack_require__(/*! ./web-outgoing */ \"./node_modules/http-proxy/lib/http-proxy/passes/web-outgoing.js\"),\n    common = __webpack_require__(/*! ../common */ \"./node_modules/http-proxy/lib/http-proxy/common.js\"),\n    followRedirects = __webpack_require__(/*! follow-redirects */ \"follow-redirects\");\n\nweb_o = Object.keys(web_o).map(function(pass) {\n  return web_o[pass];\n});\n\nvar nativeAgents = { http: httpNative, https: httpsNative };\n\n/*!\n * Array of passes.\n *\n * A `pass` is just a function that is executed on `req, res, options`\n * so that you can easily add new checks while still keeping the base\n * flexible.\n */\n\n\nmodule.exports = {\n\n  /**\n   * Sets `content-length` to '0' if request is of DELETE type.\n   *\n   * @param {ClientRequest} Req Request object\n   * @param {IncomingMessage} Res Response object\n   * @param {Object} Options Config object passed to the proxy\n   *\n   * @api private\n   */\n\n  deleteLength: function deleteLength(req, res, options) {\n    if((req.method === 'DELETE' || req.method === 'OPTIONS')\n       && !req.headers['content-length']) {\n      req.headers['content-length'] = '0';\n      delete req.headers['transfer-encoding'];\n    }\n  },\n\n  /**\n   * Sets timeout in request socket if it was specified in options.\n   *\n   * @param {ClientRequest} Req Request object\n   * @param {IncomingMessage} Res Response object\n   * @param {Object} Options Config object passed to the proxy\n   *\n   * @api private\n   */\n\n  timeout: function timeout(req, res, options) {\n    if(options.timeout) {\n      req.socket.setTimeout(options.timeout);\n    }\n  },\n\n  /**\n   * Sets `x-forwarded-*` headers if specified in config.\n   *\n   * @param {ClientRequest} Req Request object\n   * @param {IncomingMessage} Res Response object\n   * @param {Object} Options Config object passed to the proxy\n   *\n   * @api private\n   */\n\n  XHeaders: function XHeaders(req, res, options) {\n    if(!options.xfwd) return;\n\n    var encrypted = req.isSpdy || common.hasEncryptedConnection(req);\n    var values = {\n      for  : req.connection.remoteAddress || req.socket.remoteAddress,\n      port : common.getPort(req),\n      proto: encrypted ? 'https' : 'http'\n    };\n\n    ['for', 'port', 'proto'].forEach(function(header) {\n      req.headers['x-forwarded-' + header] =\n        (req.headers['x-forwarded-' + header] || '') +\n        (req.headers['x-forwarded-' + header] ? ',' : '') +\n        values[header];\n    });\n\n    req.headers['x-forwarded-host'] = req.headers['x-forwarded-host'] || req.headers['host'] || '';\n  },\n\n  /**\n   * Does the actual proxying. If `forward` is enabled fires up\n   * a ForwardStream, same happens for ProxyStream. The request\n   * just dies otherwise.\n   *\n   * @param {ClientRequest} Req Request object\n   * @param {IncomingMessage} Res Response object\n   * @param {Object} Options Config object passed to the proxy\n   *\n   * @api private\n   */\n\n  stream: function stream(req, res, options, _, server, clb) {\n\n    // And we begin!\n    server.emit('start', req, res, options.target || options.forward);\n\n    var agents = options.followRedirects ? followRedirects : nativeAgents;\n    var http = agents.http;\n    var https = agents.https;\n\n    if(options.forward) {\n      // If forward enable, so just pipe the request\n      var forwardReq = (options.forward.protocol === 'https:' ? https : http).request(\n        common.setupOutgoing(options.ssl || {}, options, req, 'forward')\n      );\n\n      // error handler (e.g. ECONNRESET, ECONNREFUSED)\n      // Handle errors on incoming request as well as it makes sense to\n      var forwardError = createErrorHandler(forwardReq, options.forward);\n      req.on('error', forwardError);\n      forwardReq.on('error', forwardError);\n\n      (options.buffer || req).pipe(forwardReq);\n      if(!options.target) { return res.end(); }\n    }\n\n    // Request initalization\n    var proxyReq = (options.target.protocol === 'https:' ? https : http).request(\n      common.setupOutgoing(options.ssl || {}, options, req)\n    );\n\n    // Enable developers to modify the proxyReq before headers are sent\n    proxyReq.on('socket', function(socket) {\n      if(server) { server.emit('proxyReq', proxyReq, req, res, options); }\n    });\n\n    // allow outgoing socket to timeout so that we could\n    // show an error page at the initial request\n    if(options.proxyTimeout) {\n      proxyReq.setTimeout(options.proxyTimeout, function() {\n         proxyReq.abort();\n      });\n    }\n\n    // Ensure we abort proxy if request is aborted\n    req.on('aborted', function () {\n      proxyReq.abort();\n    });\n\n    // handle errors in proxy and incoming request, just like for forward proxy\n    var proxyError = createErrorHandler(proxyReq, options.target);\n    req.on('error', proxyError);\n    proxyReq.on('error', proxyError);\n\n    function createErrorHandler(proxyReq, url) {\n      return function proxyError(err) {\n        if (req.socket.destroyed && err.code === 'ECONNRESET') {\n          server.emit('econnreset', err, req, res, url);\n          return proxyReq.abort();\n        }\n\n        if (clb) {\n          clb(err, req, res, url);\n        } else {\n          server.emit('error', err, req, res, url);\n        }\n      }\n    }\n\n    (options.buffer || req).pipe(proxyReq);\n\n    proxyReq.on('response', function(proxyRes) {\n      if(server) { server.emit('proxyRes', proxyRes, req, res); }\n\n      if(!res.headersSent && !options.selfHandleResponse) {\n        for(var i=0; i < web_o.length; i++) {\n          if(web_o[i](req, res, proxyRes, options)) { break; }\n        }\n      }\n\n      if (!res.finished) {\n        // Allow us to listen when the proxy has completed\n        proxyRes.on('end', function () {\n          if (server) server.emit('end', req, res, proxyRes);\n        });\n        // We pipe to the response unless its expected to be handled by the user\n        if (!options.selfHandleResponse) proxyRes.pipe(res);\n      } else {\n        if (server) server.emit('end', req, res, proxyRes);\n      }\n    });\n  }\n\n};\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy/lib/http-proxy/passes/web-incoming.js?");

/***/ }),

/***/ "./node_modules/http-proxy/lib/http-proxy/passes/web-outgoing.js":
/*!***********************************************************************!*\
  !*** ./node_modules/http-proxy/lib/http-proxy/passes/web-outgoing.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var url    = __webpack_require__(/*! url */ \"url\"),\n    common = __webpack_require__(/*! ../common */ \"./node_modules/http-proxy/lib/http-proxy/common.js\");\n\n\nvar redirectRegex = /^201|30(1|2|7|8)$/;\n\n/*!\n * Array of passes.\n *\n * A `pass` is just a function that is executed on `req, res, options`\n * so that you can easily add new checks while still keeping the base\n * flexible.\n */\n\nmodule.exports = { // <--\n\n  /**\n   * If is a HTTP 1.0 request, remove chunk headers\n   *\n   * @param {ClientRequest} Req Request object\n   * @param {IncomingMessage} Res Response object\n   * @param {proxyResponse} Res Response object from the proxy request\n   *\n   * @api private\n   */\n  removeChunked: function removeChunked(req, res, proxyRes) {\n    if (req.httpVersion === '1.0') {\n      delete proxyRes.headers['transfer-encoding'];\n    }\n  },\n\n  /**\n   * If is a HTTP 1.0 request, set the correct connection header\n   * or if connection header not present, then use `keep-alive`\n   *\n   * @param {ClientRequest} Req Request object\n   * @param {IncomingMessage} Res Response object\n   * @param {proxyResponse} Res Response object from the proxy request\n   *\n   * @api private\n   */\n  setConnection: function setConnection(req, res, proxyRes) {\n    if (req.httpVersion === '1.0') {\n      proxyRes.headers.connection = req.headers.connection || 'close';\n    } else if (req.httpVersion !== '2.0' && !proxyRes.headers.connection) {\n      proxyRes.headers.connection = req.headers.connection || 'keep-alive';\n    }\n  },\n\n  setRedirectHostRewrite: function setRedirectHostRewrite(req, res, proxyRes, options) {\n    if ((options.hostRewrite || options.autoRewrite || options.protocolRewrite)\n        && proxyRes.headers['location']\n        && redirectRegex.test(proxyRes.statusCode)) {\n      var target = url.parse(options.target);\n      var u = url.parse(proxyRes.headers['location']);\n\n      // make sure the redirected host matches the target host before rewriting\n      if (target.host != u.host) {\n        return;\n      }\n\n      if (options.hostRewrite) {\n        u.host = options.hostRewrite;\n      } else if (options.autoRewrite) {\n        u.host = req.headers['host'];\n      }\n      if (options.protocolRewrite) {\n        u.protocol = options.protocolRewrite;\n      }\n\n      proxyRes.headers['location'] = u.format();\n    }\n  },\n  /**\n   * Copy headers from proxyResponse to response\n   * set each header in response object.\n   *\n   * @param {ClientRequest} Req Request object\n   * @param {IncomingMessage} Res Response object\n   * @param {proxyResponse} Res Response object from the proxy request\n   * @param {Object} Options options.cookieDomainRewrite: Config to rewrite cookie domain\n   *\n   * @api private\n   */\n  writeHeaders: function writeHeaders(req, res, proxyRes, options) {\n    var rewriteCookieDomainConfig = options.cookieDomainRewrite,\n        rewriteCookiePathConfig = options.cookiePathRewrite,\n        preserveHeaderKeyCase = options.preserveHeaderKeyCase,\n        rawHeaderKeyMap,\n        setHeader = function(key, header) {\n          if (header == undefined) return;\n          if (rewriteCookieDomainConfig && key.toLowerCase() === 'set-cookie') {\n            header = common.rewriteCookieProperty(header, rewriteCookieDomainConfig, 'domain');\n          }\n          if (rewriteCookiePathConfig && key.toLowerCase() === 'set-cookie') {\n            header = common.rewriteCookieProperty(header, rewriteCookiePathConfig, 'path');\n          }\n          res.setHeader(String(key).trim(), header);\n        };\n\n    if (typeof rewriteCookieDomainConfig === 'string') { //also test for ''\n      rewriteCookieDomainConfig = { '*': rewriteCookieDomainConfig };\n    }\n\n    if (typeof rewriteCookiePathConfig === 'string') { //also test for ''\n      rewriteCookiePathConfig = { '*': rewriteCookiePathConfig };\n    }\n\n    // message.rawHeaders is added in: v0.11.6\n    // https://nodejs.org/api/http.html#http_message_rawheaders\n    if (preserveHeaderKeyCase && proxyRes.rawHeaders != undefined) {\n      rawHeaderKeyMap = {};\n      for (var i = 0; i < proxyRes.rawHeaders.length; i += 2) {\n        var key = proxyRes.rawHeaders[i];\n        rawHeaderKeyMap[key.toLowerCase()] = key;\n      }\n    }\n\n    Object.keys(proxyRes.headers).forEach(function(key) {\n      var header = proxyRes.headers[key];\n      if (preserveHeaderKeyCase && rawHeaderKeyMap) {\n        key = rawHeaderKeyMap[key] || key;\n      }\n      setHeader(key, header);\n    });\n  },\n\n  /**\n   * Set the statusCode from the proxyResponse\n   *\n   * @param {ClientRequest} Req Request object\n   * @param {IncomingMessage} Res Response object\n   * @param {proxyResponse} Res Response object from the proxy request\n   *\n   * @api private\n   */\n  writeStatusCode: function writeStatusCode(req, res, proxyRes) {\n    // From Node.js docs: response.writeHead(statusCode[, statusMessage][, headers])\n    if(proxyRes.statusMessage) {\n      res.statusCode = proxyRes.statusCode;\n      res.statusMessage = proxyRes.statusMessage;\n    } else {\n      res.statusCode = proxyRes.statusCode;\n    }\n  }\n\n};\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy/lib/http-proxy/passes/web-outgoing.js?");

/***/ }),

/***/ "./node_modules/http-proxy/lib/http-proxy/passes/ws-incoming.js":
/*!**********************************************************************!*\
  !*** ./node_modules/http-proxy/lib/http-proxy/passes/ws-incoming.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var http   = __webpack_require__(/*! http */ \"http\"),\n    https  = __webpack_require__(/*! https */ \"https\"),\n    common = __webpack_require__(/*! ../common */ \"./node_modules/http-proxy/lib/http-proxy/common.js\");\n\n/*!\n * Array of passes.\n *\n * A `pass` is just a function that is executed on `req, socket, options`\n * so that you can easily add new checks while still keeping the base\n * flexible.\n */\n\n/*\n * Websockets Passes\n *\n */\n\n\nmodule.exports = {\n  /**\n   * WebSocket requests must have the `GET` method and\n   * the `upgrade:websocket` header\n   *\n   * @param {ClientRequest} Req Request object\n   * @param {Socket} Websocket\n   *\n   * @api private\n   */\n\n  checkMethodAndHeader : function checkMethodAndHeader(req, socket) {\n    if (req.method !== 'GET' || !req.headers.upgrade) {\n      socket.destroy();\n      return true;\n    }\n\n    if (req.headers.upgrade.toLowerCase() !== 'websocket') {\n      socket.destroy();\n      return true;\n    }\n  },\n\n  /**\n   * Sets `x-forwarded-*` headers if specified in config.\n   *\n   * @param {ClientRequest} Req Request object\n   * @param {Socket} Websocket\n   * @param {Object} Options Config object passed to the proxy\n   *\n   * @api private\n   */\n\n  XHeaders : function XHeaders(req, socket, options) {\n    if(!options.xfwd) return;\n\n    var values = {\n      for  : req.connection.remoteAddress || req.socket.remoteAddress,\n      port : common.getPort(req),\n      proto: common.hasEncryptedConnection(req) ? 'wss' : 'ws'\n    };\n\n    ['for', 'port', 'proto'].forEach(function(header) {\n      req.headers['x-forwarded-' + header] =\n        (req.headers['x-forwarded-' + header] || '') +\n        (req.headers['x-forwarded-' + header] ? ',' : '') +\n        values[header];\n    });\n  },\n\n  /**\n   * Does the actual proxying. Make the request and upgrade it\n   * send the Switching Protocols request and pipe the sockets.\n   *\n   * @param {ClientRequest} Req Request object\n   * @param {Socket} Websocket\n   * @param {Object} Options Config object passed to the proxy\n   *\n   * @api private\n   */\n  stream : function stream(req, socket, options, head, server, clb) {\n\n    var createHttpHeader = function(line, headers) {\n      return Object.keys(headers).reduce(function (head, key) {\n        var value = headers[key];\n\n        if (!Array.isArray(value)) {\n          head.push(key + ': ' + value);\n          return head;\n        }\n\n        for (var i = 0; i < value.length; i++) {\n          head.push(key + ': ' + value[i]);\n        }\n        return head;\n      }, [line])\n      .join('\\r\\n') + '\\r\\n\\r\\n';\n    }\n\n    common.setupSocket(socket);\n\n    if (head && head.length) socket.unshift(head);\n\n\n    var proxyReq = (common.isSSL.test(options.target.protocol) ? https : http).request(\n      common.setupOutgoing(options.ssl || {}, options, req)\n    );\n\n    // Enable developers to modify the proxyReq before headers are sent\n    if (server) { server.emit('proxyReqWs', proxyReq, req, socket, options, head); }\n\n    // Error Handler\n    proxyReq.on('error', onOutgoingError);\n    proxyReq.on('response', function (res) {\n      // if upgrade event isn't going to happen, close the socket\n      if (!res.upgrade) {\n        socket.write(createHttpHeader('HTTP/' + res.httpVersion + ' ' + res.statusCode + ' ' + res.statusMessage, res.headers));\n        res.pipe(socket);\n      }\n    });\n\n    proxyReq.on('upgrade', function(proxyRes, proxySocket, proxyHead) {\n      proxySocket.on('error', onOutgoingError);\n\n      // Allow us to listen when the websocket has completed\n      proxySocket.on('end', function () {\n        server.emit('close', proxyRes, proxySocket, proxyHead);\n      });\n\n      // The pipe below will end proxySocket if socket closes cleanly, but not\n      // if it errors (eg, vanishes from the net and starts returning\n      // EHOSTUNREACH). We need to do that explicitly.\n      socket.on('error', function () {\n        proxySocket.end();\n      });\n\n      common.setupSocket(proxySocket);\n\n      if (proxyHead && proxyHead.length) proxySocket.unshift(proxyHead);\n\n      //\n      // Remark: Handle writing the headers to the socket when switching protocols\n      // Also handles when a header is an array\n      //\n      socket.write(createHttpHeader('HTTP/1.1 101 Switching Protocols', proxyRes.headers));\n\n      proxySocket.pipe(socket).pipe(proxySocket);\n\n      server.emit('open', proxySocket);\n      server.emit('proxySocket', proxySocket);  //DEPRECATED.\n    });\n\n    return proxyReq.end(); // XXX: CHECK IF THIS IS THIS CORRECT\n\n    function onOutgoingError(err) {\n      if (clb) {\n        clb(err, req, socket);\n      } else {\n        server.emit('error', err, req, socket);\n      }\n      socket.end();\n    }\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/http-proxy/lib/http-proxy/passes/ws-incoming.js?");

/***/ }),

/***/ "./node_modules/requires-port/index.js":
/*!*********************************************!*\
  !*** ./node_modules/requires-port/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Check if we're required to add a port number.\n *\n * @see https://url.spec.whatwg.org/#default-port\n * @param {Number|String} port Port number we need to check\n * @param {String} protocol Protocol we need to check against.\n * @returns {Boolean} Is it a default port for the given protocol\n * @api private\n */\nmodule.exports = function required(port, protocol) {\n  protocol = protocol.split(':')[0];\n  port = +port;\n\n  if (!port) return false;\n\n  switch (protocol) {\n    case 'http':\n    case 'ws':\n    return port !== 80;\n\n    case 'https':\n    case 'wss':\n    return port !== 443;\n\n    case 'ftp':\n    return port !== 21;\n\n    case 'gopher':\n    return port !== 70;\n\n    case 'file':\n    return false;\n  }\n\n  return port !== 0;\n};\n\n\n//# sourceURL=webpack:///./node_modules/requires-port/index.js?");

/***/ }),

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var http_proxy_middleware__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! http-proxy-middleware */ \"./node_modules/http-proxy-middleware/dist/index.js\");\n/* harmony import */ var http_proxy_middleware__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(http_proxy_middleware__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _src_store_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../src/store/store */ \"./src/store/store.js\");\n/* harmony import */ var _src_App__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../src/App */ \"./src/App.js\");\n/* harmony import */ var _src_component_Header__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../src/component/Header */ \"./src/component/Header.js\");\n// 这里的node代码，会用babel处理\n\n\n\n\n\n\n\n\n\nvar store = Object(_src_store_store__WEBPACK_IMPORTED_MODULE_6__[\"getServerStore\"])();\nvar app = express__WEBPACK_IMPORTED_MODULE_2___default()();\napp.use(express__WEBPACK_IMPORTED_MODULE_2___default.a[\"static\"](\"public\")); // 客户端来的api开头的请求\n\napp.use(\"api\", http_proxy_middleware__WEBPACK_IMPORTED_MODULE_5___default()({\n  target: \"http://localhost:9090\",\n  changeOrigin: true\n}));\napp.get(\"*\", function (req, res) {\n  // 获取根据路由渲染的组件，并且拿到loadData方法，获取数据\n  // if(req.url.startsWith('/api/')) {\n  //   // 不渲染页面，使用axios转发\n  // }\n  // 存储网络请求\n  var promises = [];\n  _src_App__WEBPACK_IMPORTED_MODULE_7__[\"default\"].some(function (route) {\n    var match = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"matchPath\"])(req.path, route);\n\n    if (match) {\n      var loadData = route.component.loadData;\n\n      if (loadData) {\n        // 规避报错，可以追加日志\n        var promise = new Promise(function (resolve, reject) {\n          loadData(store).then(resolve)[\"catch\"](resolve);\n        });\n        promises.push(promise); // promises.push(loadData(store));\n      }\n    }\n  }); // 等待所有网络请求结束再渲染\n\n  Promise.all(promises).then(function () {\n    // 把react组件。解析成html\n    var content = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_1__[\"renderToString\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_4__[\"Provider\"], {\n      store: store\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"StaticRouter\"], {\n      location: req.url\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_src_component_Header__WEBPACK_IMPORTED_MODULE_8__[\"default\"], null), _src_App__WEBPACK_IMPORTED_MODULE_7__[\"default\"].map(function (route) {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"Route\"], route);\n    }))));\n    res.send(\"\\n          <html>\\n              <head>\\n                  <meta charset=\\\"utf-8\\\" />\\n                  <title>react ssr</title>\\n              </head>\\n              <body>\\n                  <div id=\\\"root\\\">\".concat(content, \"</div>\\n                  <script>\\n                    window.__context = \").concat(JSON.stringify(store.getState()), \"\\n                  </script>\\n                  <script src=\\\"bundle.js\\\"></script>\\n              </body>\\n          </html>\\n      \"));\n  })[\"catch\"](function (err) {\n    res.send(\"出错了\");\n  });\n});\napp.listen(9093, function () {\n  console.log(\"端口9093监听完毕\");\n});\n\n//# sourceURL=webpack:///./server/index.js?");

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _container_Index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./container/Index */ \"./src/container/Index.js\");\n/* harmony import */ var _container_About__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./container/About */ \"./src/container/About.js\");\n/* harmony import */ var _container_User__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./container/User */ \"./src/container/User.js\");\n\n\n\n\n // export default (\n//     <div>\n//         <Route path=\"/\" exact component={Index}></Route>\n//         <Route path=\"/about\" exact component={About}></Route>\n//     </div>\n// )\n// 改造成js的配置，才能获取组件\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ([{\n  path: '/',\n  component: _container_Index__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  // loadData: Index.loadData\n  // exact: true,\n  key: 'index'\n}, {\n  path: '/about',\n  component: _container_About__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  exact: true,\n  key: 'about'\n}, {\n  path: '/user',\n  component: _container_User__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n  exact: true,\n  key: 'user'\n}]);\n\n//# sourceURL=webpack:///./src/App.js?");

/***/ }),

/***/ "./src/component/Header.js":
/*!*********************************!*\
  !*** ./src/component/Header.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n    to: \"/\"\n  }, \"\\u9996\\u9875\"), \" |\", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n    to: \"/about\"\n  }, \"\\u5173\\u4E8E\"));\n});\n\n//# sourceURL=webpack:///./src/component/Header.js?");

/***/ }),

/***/ "./src/container/About.js":
/*!********************************!*\
  !*** ./src/container/About.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction About(props) {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", null, \"\\u5173\\u4E8E\\u9875\\u9762\"));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (About);\n\n//# sourceURL=webpack:///./src/container/About.js?");

/***/ }),

/***/ "./src/container/Index.js":
/*!********************************!*\
  !*** ./src/container/Index.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _store_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/index */ \"./src/store/index.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === \"[object Arguments]\")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\nfunction Index(props) {\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(1),\n      _useState2 = _slicedToArray(_useState, 2),\n      count = _useState2[0],\n      setCount = _useState2[1];\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(function () {\n    // 异步数据首页显示\n    if (!props.list.length) {\n      props.getIndexList();\n    }\n  }, []);\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", null, \"hello \", props.title, \"! \", count), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    onClick: function onClick() {\n      return setCount(count + 1);\n    }\n  }, \"\\u7D2F\\u52A0\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"hr\", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", null, props.list.map(function (item) {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n      key: item.id\n    }, item.name);\n  })));\n}\n\nIndex.loadData = function (store) {\n  return store.dispatch(Object(_store_index__WEBPACK_IMPORTED_MODULE_2__[\"getIndexList\"])());\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(function (state) {\n  return {\n    list: state.index.list\n  };\n}, {\n  getIndexList: _store_index__WEBPACK_IMPORTED_MODULE_2__[\"getIndexList\"]\n})(Index));\n\n//# sourceURL=webpack:///./src/container/Index.js?");

/***/ }),

/***/ "./src/container/User.js":
/*!*******************************!*\
  !*** ./src/container/User.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _store_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/user */ \"./src/store/user.js\");\n\n\n\n\nfunction User(props) {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", null, \"\\u4F60\\u597D\", props.userinfo.name, \",\", props.userinfo.best));\n}\n\nUser.loadData = function (store) {\n  return store.dispatch(Object(_store_user__WEBPACK_IMPORTED_MODULE_2__[\"getUserInfo\"])());\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(function (state) {\n  return {\n    userinfo: state.user.userinfo\n  };\n})(User));\n\n//# sourceURL=webpack:///./src/container/User.js?");

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! exports provided: getIndexList, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getIndexList\", function() { return getIndexList; });\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n// 首页的逻辑\n// import axios from \"axios\";\nvar GET_LIST = \"INDEX/GET_LIST\"; // actionCreator\n\nvar changeList = function changeList(list) {\n  return {\n    type: GET_LIST,\n    list: list\n  };\n};\n\nvar getIndexList = function getIndexList(server) {\n  return function (dispatch, getState, $axios) {\n    return $axios.get(\"/api/course/list\").then(function (res) {\n      var list = res.data.list;\n      dispatch(changeList(list));\n    });\n  };\n};\nvar defaultState = {\n  list: []\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case GET_LIST:\n      var newState = _objectSpread({}, state, {\n        list: action.list\n      });\n\n      return newState;\n\n    default:\n      return state;\n  }\n});\n\n//# sourceURL=webpack:///./src/store/index.js?");

/***/ }),

/***/ "./src/store/store.js":
/*!****************************!*\
  !*** ./src/store/store.js ***!
  \****************************/
/*! exports provided: getServerStore, getClientStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getServerStore\", function() { return getServerStore; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getClientStore\", function() { return getClientStore; });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-thunk */ \"redux-thunk\");\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index */ \"./src/store/index.js\");\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user */ \"./src/store/user.js\");\n// 存储的入口\n\n\n\n\n\nvar reducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"combineReducers\"])({\n  index: _index__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  user: _user__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n});\nvar serverAxios = axios__WEBPACK_IMPORTED_MODULE_2___default.a.create({\n  baseURL: \"http://localhost:9090/\"\n});\nvar clientAxios = axios__WEBPACK_IMPORTED_MODULE_2___default.a.create({\n  baseURL: \"/\"\n}); // 创建store\n// const store = createStore(reducer, applyMiddleware(thunk));\n// export default store\n\nvar getServerStore = function getServerStore() {\n  // 服务端用的\n  // 通过server的dispatch来获取和充实\n  return Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(reducer, Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"applyMiddleware\"])(redux_thunk__WEBPACK_IMPORTED_MODULE_1___default.a.withExtraArgument(serverAxios)));\n};\nvar getClientStore = function getClientStore() {\n  // 通过window.__context来获取数据\n  var defaultState = window.__context ? window.__context : {};\n  return Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(reducer, defaultState, Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"applyMiddleware\"])(redux_thunk__WEBPACK_IMPORTED_MODULE_1___default.a.withExtraArgument(clientAxios)));\n};\n\n//# sourceURL=webpack:///./src/store/store.js?");

/***/ }),

/***/ "./src/store/user.js":
/*!***************************!*\
  !*** ./src/store/user.js ***!
  \***************************/
/*! exports provided: getUserInfo, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getUserInfo\", function() { return getUserInfo; });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n// 首页的逻辑\n\nvar GET_LIST = 'INDEX/USER_INFO'; // actionCreator\n\nvar changeUserInfo = function changeUserInfo(data) {\n  return {\n    type: GET_LIST,\n    data: data\n  };\n};\n\nvar getUserInfo = function getUserInfo(server) {\n  return function (dispatch, getState, axiosInstance) {\n    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('http://localhost:9090/api/user/info').then(function (res) {\n      var data = res.data.data;\n      dispatch(changeUserInfo(data));\n    });\n  };\n};\nvar defaultState = {\n  userinfo: {}\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case GET_LIST:\n      var newState = _objectSpread({}, state, {\n        userinfo: action.data\n      });\n\n      return newState;\n\n    default:\n      return state;\n  }\n});\n\n//# sourceURL=webpack:///./src/store/user.js?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "follow-redirects":
/*!***********************************!*\
  !*** external "follow-redirects" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"follow-redirects\");\n\n//# sourceURL=webpack:///external_%22follow-redirects%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"https\");\n\n//# sourceURL=webpack:///external_%22https%22?");

/***/ }),

/***/ "is-glob":
/*!**************************!*\
  !*** external "is-glob" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"is-glob\");\n\n//# sourceURL=webpack:///external_%22is-glob%22?");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash\");\n\n//# sourceURL=webpack:///external_%22lodash%22?");

/***/ }),

/***/ "micromatch":
/*!*****************************!*\
  !*** external "micromatch" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"micromatch\");\n\n//# sourceURL=webpack:///external_%22micromatch%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-redux\");\n\n//# sourceURL=webpack:///external_%22react-redux%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux\");\n\n//# sourceURL=webpack:///external_%22redux%22?");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux-thunk\");\n\n//# sourceURL=webpack:///external_%22redux-thunk%22?");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"url\");\n\n//# sourceURL=webpack:///external_%22url%22?");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"util\");\n\n//# sourceURL=webpack:///external_%22util%22?");

/***/ })

/******/ });