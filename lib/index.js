"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Component", {
  enumerable: true,
  get: function get() {
    return _component.default;
  }
});
exports.default = exports.createFragmentWithChildren = void 0;

var utils = _interopRequireWildcard(require("./utils"));

var _component = _interopRequireDefault(require("./component"));

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var addAttributes = function addAttributes(element) {
  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var props = Object.entries(attrs || {});
  props.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        propName = _ref2[0],
        propValue = _ref2[1];

    if (utils.isCustomElement(element)) {
      // In "catch" prop is stored props that must be added as attributes
      // or event handlers
      var propsCatch = [];
      if (Array.isArray(attrs.catch)) propsCatch = attrs.catch;
      if (typeof attrs.catch === 'string') propsCatch = [attrs.catch];
      if (propName === 'catch') return;

      if (!propsCatch.includes(propName)) {
        return element.props = _objectSpread({}, element.props, _defineProperty({}, propName, propValue));
      }
    }

    if (propName === 'className') return element.setAttribute('class', propValue);
    if (propName === 'style') return element.style.cssText = utils.objectToStyleString(propValue);
    if (propName === 'ref' && typeof propValue === 'function') return propValue(element, attrs);
    if (propName === 'dangerouslySetInnerHTML') return element.innerHTML = propValue.__html; // if attr value is a function then add it as element property

    if (typeof propValue === 'function') {
      var eventName = propName.toLowerCase();
      var regexp = /^(on[a-z]+)$/i;

      if (regexp.test(eventName)) {
        element[eventName] = propValue;
      }

      return;
    } // if attr is a string then add it as attribute


    if (typeof propValue === 'string') return utils.setAttribute(element, propName, propValue);
  });
  return element;
};

var fillFragmentByChildren = function fillFragmentByChildren(fragment, props, child, index) {
  if (child) {
    if (child instanceof Array) {
      return child.forEach(fillFragmentByChildren.bind(_this, fragment, props));
    }

    if (typeof child === 'string' || typeof child === 'number') {
      var textnode = document.createTextNode(child);
      textnode.__DOMPosition__ = index;
      return fragment.appendChild(textnode);
    }

    if (utils.isCustomElement(child)) child.props = _objectSpread({}, child.props, props);
    child.__DOMPosition__ = index;
    fragment.appendChild(child);
  }
};

var createFragmentWithChildren = function createFragmentWithChildren(children) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fragment = document.createDocumentFragment(); // fill fragment by children

  children.forEach(fillFragmentByChildren.bind(_this, fragment, props));
  return fragment;
};

exports.createFragmentWithChildren = createFragmentWithChildren;

var jsx = function jsx(tagName, attrs) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  // <custom-fragment> element
  if (tagName === 'custom-fragment') {
    return createFragmentWithChildren(children);
  } // create main element


  var element = utils.isSVG(tagName) ? document.createElementNS('http://www.w3.org/2000/svg', tagName) : document.createElement(tagName); // create children fragment and append it to the main element

  if (utils.isCustomElement(element)) {
    element.props = {
      children: children
    };
  } else {
    var fragment = createFragmentWithChildren(children);
    element.appendChild(fragment);
  } // add attributes to the main element.
  // if we have custom element, then attributes will be added like props
  // if we haven`t than as simple attributes


  return addAttributes(element, attrs);
};

var _default = jsx;
exports.default = _default;