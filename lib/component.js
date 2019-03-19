"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("./index");

var _utils = require("./utils");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

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
    var _this;

    _classCallCheck(this, Component);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Component).call(this));
    _this.state = {};
    _this.update = _this.update.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setState = _this.setState.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Component, [{
    key: "_removeContent",
    value: function _removeContent() {
      this.innerHTML = '';
    }
  }, {
    key: "_addContent",
    value: function _addContent(content) {
      this._removeContent();

      if (content) {
        var children = Array.isArray(content) ? (0, _index.createFragmentWithChildren)(content) : content;
        this.appendChild(children);
      }
    }
  }, {
    key: "_cloneEventHandlers",
    value: function _cloneEventHandlers(newChild, existChild) {
      var regexp = /^(on[a-z]+)$/i;

      for (var key in newChild) {
        if (regexp.test(key)) existChild[key] = newChild[key];
      }
    }
  }, {
    key: "_cloneAttributes",
    value: function _cloneAttributes(newChild, existChild) {
      if (newChild.hasAttributes()) {
        _toConsumableArray(newChild.attributes).forEach(function (_ref) {
          var name = _ref.name,
              value = _ref.value;

          // don't change value attribute
          if (name === 'value') {
            existChild.value = newChild.value;
          } else {
            var attr = existChild.getAttribute(name);
            if (attr !== value) (0, _utils.setAttribute)(existChild, name, value);
          }
        });
      }
    }
  }, {
    key: "_mergeNodes",
    value: function _mergeNodes(newChild, existChild, parentNode) {
      if ((0, _utils.areSameNodes)(newChild, existChild)) {
        // add attributes
        this._cloneAttributes(newChild, existChild); // add props to custom element


        if ((0, _utils.isCustomElement)(existChild)) {
          // add props
          existChild.props = newChild.props; // exec update function

          return existChild.update();
        } // add event handlers


        this._cloneEventHandlers(newChild, existChild); // update children


        return this._updateContent(newChild.childNodes, existChild.childNodes, existChild);
      }

      if (existChild && newChild) {
        return parentNode.replaceChild(newChild, existChild);
      }

      if (newChild) return parentNode.appendChild(newChild);
    }
  }, {
    key: "_updateContent",
    value: function _updateContent(newContent) {
      var _this2 = this;

      var existChildren = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.childNodes;
      var parentNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
      // existChildren is always collection of HTMLElements
      // newContent can be ether colection of HTMLElements, or HTMLElement,
      // or DocumentFragment, or Array, or (null | undefined | false)
      // newContent is null | undefined | false
      if (!newContent) return this._removeContent(); // newContent is array

      if (Array.isArray(newContent)) return this._updateContent((0, _index.createFragmentWithChildren)(newContent).childNodes, existChildren, parentNode); // newContent is DocumentFragment

      if (newContent.nodeType === 11) return this._updateContent(newContent.childNodes, existChildren, parentNode); // newContent is collection

      if (typeof newContent[Symbol.iterator] === 'function') {
        if (newContent.length) {
          return _toConsumableArray(newContent).forEach(function (newChild, index) {
            var existChild = existChildren[index];
            return _this2._mergeNodes(newChild, existChild, parentNode);
          });
        }

        return parentNode.innerHTML = '';
      } // newContent is HTMLElement


      this._mergeNodes(newContent, existChildren[0], parentNode); // for (let i = 1; i < existChildren.length; i++) {
      //     parentNode.removeChild(existChildren[i])
      // }

    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      this.componentDidCreate();

      this._addContent(this.render());

      this.componentDidMount();
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this._removeContent();

      this.componentWillUnmount();
    }
  }, {
    key: "update",
    value: function update() {
      // debugger
      this._updateContent(this.render());

      this.componentDidUpdate();
    }
  }, {
    key: "componentDidCreate",
    value: function componentDidCreate() {}
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
    key: "setState",
    value: function setState(newState) {
      if (typeof newState === 'function') {
        this.state = newState(this.state);
      } else {
        this.state = newState;
      }

      this.update();
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return Component;
}(_wrapNativeSuper(HTMLElement));

var _default = Component;
exports.default = _default;