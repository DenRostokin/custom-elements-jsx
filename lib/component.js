"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Component =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(Component, _HTMLElement);

  function Component() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Component);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Component)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {};
    _this._childrenState = {};

    _this.update = function () {
      if (_this.children.length) {
        var newChild = _this.render();

        _this._setStateFromPrevChildrenForNew(newChild);

        _this.replaceChild(newChild, _this.children[0]);

        _this.componentDidUpdate();
      }
    };

    _this.setState = function (newState) {
      _this.state = _objectSpread({}, newState);

      _this.update();
    };

    return _this;
  }

  _createClass(Component, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.appendChild(this.render());
      this.componentDidMount();
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this.componentWillUnmount();
    }
  }, {
    key: "_getNestedStatesFrom",
    value: function _getNestedStatesFrom(children) {
      var _this2 = this;

      return Array.prototype.reduce.call(children, function (acc, child) {
        var state = _objectSpread({}, acc);

        if ((0, _utils.isCustomElement)(child)) {
          state[child.props.key || child.tagName] = child.state;
        }

        if (child.children.length) {
          var childrenState = _this2._getNestedStatesFrom(child.children);

          state = _objectSpread({}, state, childrenState);
        }

        return state;
      }, {});
    } // mutate children collection

  }, {
    key: "_setChildrenState",
    value: function _setChildrenState(children) {
      var _this3 = this;

      Array.prototype.forEach.call(children, function (child) {
        if ((0, _utils.isCustomElement)(child)) {
          child.state = _this3.childrenState[child.props.key || child.tagName] || {};
        }

        if (child.children.length) {
          _this3._setChildrenState(child.children);
        }
      });
    }
  }, {
    key: "_setStateFromPrevChildrenForNew",
    value: function _setStateFromPrevChildrenForNew(child) {
      this.childrenState = this._getNestedStatesFrom(this.children);

      this._setChildrenState([child]);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "render",
    value: function render() {
      return document.createElement('div');
    }
  }, {
    key: "childrenState",
    get: function get() {
      return this._childrenState;
    },
    set: function set(state) {
      this._childrenState = _objectSpread({}, this._childrenState, state);
    }
  }]);

  return Component;
}(_wrapNativeSuper(HTMLElement));

var _default = Component;
exports.default = _default;