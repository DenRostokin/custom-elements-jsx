"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAttribute = exports.objectToStyleString = exports.isCustomElement = exports.isSVG = exports.areSameTagNames = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var areSameTagNames = function areSameTagNames() {
  var el1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var el2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return el1.tagName && el2.tagName && el1.tagName === el2.tagName;
};

exports.areSameTagNames = areSameTagNames;

var isSVG = function isSVG(tagName) {
  var SVGTags = ['path', 'svg', 'use', 'g'];
  return SVGTags.includes(tagName.toLowerCase());
};

exports.isSVG = isSVG;

var isCustomElement = function isCustomElement(element) {
  return element.tagName.includes('-');
};

exports.isCustomElement = isCustomElement;

var camelCaseToDash = function camelCaseToDash(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

var objectToStyleString = function objectToStyleString() {
  var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.entries(styles).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        propName = _ref2[0],
        propValue = _ref2[1];

    return "".concat(camelCaseToDash(propName), ": ").concat(propValue);
  }).join(';');
};

exports.objectToStyleString = objectToStyleString;

var setAttribute = function setAttribute(element, name, value) {
  if (name === 'xlinkHref') return element.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', value);
  return element.setAttribute(name, value);
};

exports.setAttribute = setAttribute;