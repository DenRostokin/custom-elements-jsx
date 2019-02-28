"use strict";

var _index = _interopRequireWildcard(require("../index"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CustomInput =
/*#__PURE__*/
function (_Component) {
  _inherits(CustomInput, _Component);

  function CustomInput() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CustomInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CustomInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.setRef = function (element) {
      return _this.input = element;
    };

    _this.onChangeValue = function (value) {
      _this.props.onChange(value);

      if (_this.input) _this.input.value = value;
    };

    _this.onKeyPress = function (event) {
      var keys = ['Enter']; // exclude special characters

      if (!keys.includes(event.key)) {
        // take previous value and add new character
        var value = event.target.value + event.key;

        _this.onChangeValue(value);
      } // disable updating values implicity


      event.preventDefault();
    };

    _this.onKeyUp = function (event) {
      // react only on specified keys
      var keys = ['Backspace', 'Delete'];

      if (keys.includes(event.key)) {
        _this.onChangeValue(event.target.value);
      }

      _this.props.onKeyUp && _this.props.onKeyUp(event);
    };

    return _this;
  }

  _createClass(CustomInput, [{
    key: "render",
    value: function render() {
      /* eslint-disable-next-line */
      var _this$props = this.props,
          ref = _this$props.ref,
          _this$props$type = _this$props.type,
          type = _this$props$type === void 0 ? 'text' : _this$props$type,
          onChange = _this$props.onChange,
          children = _this$props.children,
          other = _objectWithoutProperties(_this$props, ["ref", "type", "onChange", "children"]);

      return (0, _index.default)("input", _extends({}, other, {
        ref: ref || this.setRef,
        type: type,
        onKeyPress: this.onKeyPress,
        onKeyUp: this.onKeyUp
      }));
    }
  }]);

  return CustomInput;
}(_index.Component);

if (!window.customElements.get('custom-input')) window.customElements.define('custom-input', CustomInput);