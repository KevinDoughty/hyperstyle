(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["hyper-animations"] = factory();
	else
		root["hyper-animations"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dimensionType", function() { return dimensionType; });
/* harmony import */ var _web_animations_processed_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/**
 * Copyright 2016 Kevin Doughty. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *		 http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import * as boxhandler from '../src/box-handler.js';
// import * as colorhandler from '../src/color-handler.js';
// import * as dimensionhandler from 'dimension-handler';
// import * as fontweighthandler from '../src/font-weight-handler.js';
// import * as numberhandler from '../src/number-handler.js';
// import * as positionhandler from '../src/position-handler.js';
// import * as shadowhandler from '../src/shadow-handler.js';
// import * as shapehandler from '../src/shape-handler.js';
// import * as transformhandler from '../src/transform-handler.js';
// import * as visibilityhandler from '../src/visibility-handler.js';



// export const boxType = {
// 	parse:boxhandler.boxhandler[0][0],
// 	merge:boxhandler.boxhandler[0][1],
// 	properties:boxhandler.boxhandler[0][2]
// }


/*
var dimensionhandler = [[parseSizePairList, mergeNonNegativeSizePairList, ['background-size']],
[parseLengthOrPercent, mergeDimensionsNonNegative, ['border-bottom-width', 'border-image-width', 'border-left-width', 'border-right-width', 'border-top-width', 'flex-basis', 'font-size', 'height', 'line-height', 'max-height', 'max-width', 'outline-width', 'width']],
[parseLengthOrPercent, mergeDimensions, ['border-bottom-left-radius', 'border-bottom-right-radius', 'border-top-left-radius', 'border-top-right-radius', 'bottom', 'left', 'letter-spacing', 'margin-bottom', 'margin-left', 'margin-right', 'margin-top', 'min-height', 'min-width', 'outline-offset', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'perspective', 'right', 'shape-margin', 'text-indent', 'top', 'vertical-align', 'word-spacing']]];
*/

var dimensionTypes = {};
dimensionhandler.dimensionhandler.forEach(function (handlers, index) {
	handlers.forEach(function (handler) {
		dimensionTypes[handler] = index;
	});
});

var dimensionType = function dimensionType(property) {
	var number = dimensionTypes[property];
	var handlerArray = dimensionhandler.dimensionhandler[number]; // parser, merger, properties

	// 	parse:hyper.dimensionhandler
	// 	merge:
	// 	properties:
	return {
		parser: handlerArray[0],
		merger: handlerArray[1],
		properties: handlerArray[2],
		zero: function zero(value) {
			return 0;
		},
		add: function add(a, b) {
			return 0;
		},
		subtract: function subtract(a, b) {
			return 0;
		},
		interpolate: function interpolate(from, to, progress) {
			return to;
		},
		output: function output(value) {
			return value;
		},
		input: function input(value) {
			var result = handlerArray[0](value);
			console.log("%s input:%s; result:%s;", property, value, result);
			return result;
		}
	};
};

//dimensionType("left").input("asdf");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _box_handler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseBox", function() { return _box_handler_js__WEBPACK_IMPORTED_MODULE_0__["parseBox"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeBoxes", function() { return _box_handler_js__WEBPACK_IMPORTED_MODULE_0__["mergeBoxes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "boxhandler", function() { return _box_handler_js__WEBPACK_IMPORTED_MODULE_0__["boxhandler"]; });

/* harmony import */ var _color_handler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeColors", function() { return _color_handler_js__WEBPACK_IMPORTED_MODULE_1__["mergeColors"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "consumeColor", function() { return _color_handler_js__WEBPACK_IMPORTED_MODULE_1__["consumeColor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "colorhandler", function() { return _color_handler_js__WEBPACK_IMPORTED_MODULE_1__["colorhandler"]; });

/* harmony import */ var _dimension_handler_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeDimensions", function() { return _dimension_handler_js__WEBPACK_IMPORTED_MODULE_2__["mergeDimensions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseLength", function() { return _dimension_handler_js__WEBPACK_IMPORTED_MODULE_2__["parseLength"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseLengthOrPercent", function() { return _dimension_handler_js__WEBPACK_IMPORTED_MODULE_2__["parseLengthOrPercent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseAngle", function() { return _dimension_handler_js__WEBPACK_IMPORTED_MODULE_2__["parseAngle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "consumeLengthOrPercent", function() { return _dimension_handler_js__WEBPACK_IMPORTED_MODULE_2__["consumeLengthOrPercent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "consumeSizePairList", function() { return _dimension_handler_js__WEBPACK_IMPORTED_MODULE_2__["consumeSizePairList"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeNonNegativeSizePair", function() { return _dimension_handler_js__WEBPACK_IMPORTED_MODULE_2__["mergeNonNegativeSizePair"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dimensionhandler", function() { return _dimension_handler_js__WEBPACK_IMPORTED_MODULE_2__["dimensionhandler"]; });

/* harmony import */ var _font_weight_handler_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fontweighthandler", function() { return _font_weight_handler_js__WEBPACK_IMPORTED_MODULE_3__["fontweighthandler"]; });

/* harmony import */ var _handler_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "consumeToken", function() { return _handler_utils_js__WEBPACK_IMPORTED_MODULE_4__["consumeToken"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "consumeTrimmed", function() { return _handler_utils_js__WEBPACK_IMPORTED_MODULE_4__["consumeTrimmed"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "consumeRepeated", function() { return _handler_utils_js__WEBPACK_IMPORTED_MODULE_4__["consumeRepeated"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "consumeParenthesised", function() { return _handler_utils_js__WEBPACK_IMPORTED_MODULE_4__["consumeParenthesised"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ignore", function() { return _handler_utils_js__WEBPACK_IMPORTED_MODULE_4__["ignore"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "optional", function() { return _handler_utils_js__WEBPACK_IMPORTED_MODULE_4__["optional"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "consumeList", function() { return _handler_utils_js__WEBPACK_IMPORTED_MODULE_4__["consumeList"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeWrappedNestedRepeated", function() { return _handler_utils_js__WEBPACK_IMPORTED_MODULE_4__["mergeWrappedNestedRepeated"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeList", function() { return _handler_utils_js__WEBPACK_IMPORTED_MODULE_4__["mergeList"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeNestedRepeated", function() { return _handler_utils_js__WEBPACK_IMPORTED_MODULE_4__["mergeNestedRepeated"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "handlerutils", function() { return _handler_utils_js__WEBPACK_IMPORTED_MODULE_4__["handlerutils"]; });

/* harmony import */ var _matrix_decomposition_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decomposeMatrix", function() { return _matrix_decomposition_js__WEBPACK_IMPORTED_MODULE_5__["decomposeMatrix"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return _matrix_decomposition_js__WEBPACK_IMPORTED_MODULE_5__["dot"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transformListToMatrix", function() { return _matrix_decomposition_js__WEBPACK_IMPORTED_MODULE_5__["transformListToMatrix"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "makeMatrixDecomposition", function() { return _matrix_decomposition_js__WEBPACK_IMPORTED_MODULE_5__["makeMatrixDecomposition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "matrixdecomposition", function() { return _matrix_decomposition_js__WEBPACK_IMPORTED_MODULE_5__["matrixdecomposition"]; });

/* harmony import */ var _matrix_interpolation_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "composeMatrix", function() { return _matrix_interpolation_js__WEBPACK_IMPORTED_MODULE_6__["composeMatrix"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "quat", function() { return _matrix_interpolation_js__WEBPACK_IMPORTED_MODULE_6__["quat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "matrixinterpolation", function() { return _matrix_interpolation_js__WEBPACK_IMPORTED_MODULE_6__["matrixinterpolation"]; });

/* harmony import */ var _number_handler_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "numberToString", function() { return _number_handler_js__WEBPACK_IMPORTED_MODULE_7__["numberToString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return _number_handler_js__WEBPACK_IMPORTED_MODULE_7__["clamp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseNumber", function() { return _number_handler_js__WEBPACK_IMPORTED_MODULE_7__["parseNumber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeNumbers", function() { return _number_handler_js__WEBPACK_IMPORTED_MODULE_7__["mergeNumbers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseNumberList", function() { return _number_handler_js__WEBPACK_IMPORTED_MODULE_7__["parseNumberList"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "numberhandler", function() { return _number_handler_js__WEBPACK_IMPORTED_MODULE_7__["numberhandler"]; });

/* harmony import */ var _position_handler_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(10);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeOffsetList", function() { return _position_handler_js__WEBPACK_IMPORTED_MODULE_8__["mergeOffsetList"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "consumePosition", function() { return _position_handler_js__WEBPACK_IMPORTED_MODULE_8__["consumePosition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "positionhandler", function() { return _position_handler_js__WEBPACK_IMPORTED_MODULE_8__["positionhandler"]; });

/* harmony import */ var _shadow_handler_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(11);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shadowhandler", function() { return _shadow_handler_js__WEBPACK_IMPORTED_MODULE_9__["shadowhandler"]; });

/* harmony import */ var _shape_handler_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(12);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shapehandler", function() { return _shape_handler_js__WEBPACK_IMPORTED_MODULE_10__["shapehandler"]; });

/* harmony import */ var _transform_handler_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(13);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transformToSvgMatrix", function() { return _transform_handler_js__WEBPACK_IMPORTED_MODULE_11__["transformToSvgMatrix"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transformhandler", function() { return _transform_handler_js__WEBPACK_IMPORTED_MODULE_11__["transformhandler"]; });

/* harmony import */ var _visibility_handler_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(14);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "visibilityhandler", function() { return _visibility_handler_js__WEBPACK_IMPORTED_MODULE_12__["visibilityhandler"]; });
























/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseBox", function() { return parseBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeBoxes", function() { return mergeBoxes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boxhandler", function() { return boxhandler; });
/* harmony import */ var _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
// limitations under the License.



function consumeLengthPercentOrAuto(string) {
  return Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeLengthOrPercent"])(string) || Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeToken"])(/^auto/, string);
}
function parseBox(string) {
  var result = Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeList"])([Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["ignore"])(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeToken"].bind(null, /^rect/)), Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["ignore"])(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeToken"].bind(null, /^\(/)), _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeRepeated"].bind(null, consumeLengthPercentOrAuto, /^,/), Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["ignore"])(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeToken"].bind(null, /^\)/))], string);
  if (result && result[0].length == 4) {
    return result[0];
  }
}

function mergeComponent(left, right) {
  if (left == 'auto' || right == 'auto') {
    return [true, false, function (t) {
      var result = t ? left : right;
      if (result == 'auto') {
        return 'auto';
      }
      // FIXME: There's probably a better way to turn a dimension back into a string.
      var merged = Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["mergeDimensions"])(result, result);
      return merged[2](merged[0]);
    }];
  }
  return Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["mergeDimensions"])(left, right);
}

function wrap(result) {
  return 'rect(' + result + ')';
}

var mergeBoxes = _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["mergeWrappedNestedRepeated"].bind(null, wrap, mergeComponent, ', ');
var boxhandler = [[parseBox, mergeBoxes, ['clip']]];

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeColors", function() { return mergeColors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "consumeColor", function() { return consumeColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colorhandler", function() { return colorhandler; });
/* harmony import */ var _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
// limitations under the License.



var canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
canvas.width = canvas.height = 1;
var context = canvas.getContext('2d');

function parseColor(string) {
  string = string.trim();
  // The context ignores invalid colors
  context.fillStyle = '#000';
  context.fillStyle = string;
  var contextSerializedFillStyle = context.fillStyle;
  context.fillStyle = '#fff';
  context.fillStyle = string;
  if (contextSerializedFillStyle != context.fillStyle) return;
  context.fillRect(0, 0, 1, 1);
  var pixelColor = context.getImageData(0, 0, 1, 1).data;
  context.clearRect(0, 0, 1, 1);
  var alpha = pixelColor[3] / 255;
  return [pixelColor[0] * alpha, pixelColor[1] * alpha, pixelColor[2] * alpha, alpha];
}

function mergeColors(left, right) {
  return [left, right, function (x) {
    function clamp(v) {
      return Math.max(0, Math.min(255, v));
    }
    if (x[3]) {
      for (var i = 0; i < 3; i++) {
        x[i] = Math.round(clamp(x[i] / x[3]));
      }
    }
    x[3] = Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["numberToString"])(clamp(0, 1, x[3]));
    return 'rgba(' + x.join(',') + ')';
  }];
}
var consumeColor = _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeParenthesised"].bind(null, parseColor);

if (false) {}

var colorhandler = [[parseColor, mergeColors, ['background-color', 'border-bottom-color', 'border-left-color', 'border-right-color', 'border-top-color', 'color', 'fill', 'flood-color', 'lighting-color', 'outline-color', 'stop-color', 'stroke', 'text-decoration-color']]];

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeDimensions", function() { return mergeDimensions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseLength", function() { return parseLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseLengthOrPercent", function() { return parseLengthOrPercent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseAngle", function() { return parseAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "consumeLengthOrPercent", function() { return consumeLengthOrPercent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "consumeSizePairList", function() { return consumeSizePairList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeNonNegativeSizePair", function() { return mergeNonNegativeSizePair; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dimensionhandler", function() { return dimensionhandler; });
/* harmony import */ var _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
// limitations under the License.



// Evaluates a calc expression.
// https://drafts.csswg.org/css-values-3/#calc-notation
function calculate(expression) {
  // In calc expressions, white space is required on both sides of the
  // + and - operators. https://drafts.csswg.org/css-values-3/#calc-notation
  // Thus any + or - immediately adjacent to . or 0..9 is part of the number,
  // e.g. -1.23e+45
  // This regular expression matches ( ) * / + - and numbers.
  var tokenRegularExpression = /([\+\-\w\.]+|[\(\)\*\/])/g;
  var currentToken;
  function consume() {
    var matchResult = tokenRegularExpression.exec(expression);
    if (matchResult) currentToken = matchResult[0];else currentToken = undefined;
  }
  consume(); // Read the initial token.

  function calcNumber() {
    // https://drafts.csswg.org/css-values-3/#number-value
    var result = Number(currentToken);
    consume();
    return result;
  }

  function calcValue() {
    // <calc-value> = <number> | <dimension> | <percentage> | ( <calc-sum> )
    if (currentToken !== '(') return calcNumber();
    consume();
    var result = calcSum();
    if (currentToken !== ')') return NaN;
    consume();
    return result;
  }

  function calcProduct() {
    // <calc-product> = <calc-value> [ '*' <calc-value> | '/' <calc-number-value> ]*
    var left = calcValue();
    while (currentToken === '*' || currentToken === '/') {
      var operator = currentToken;
      consume();
      var right = calcValue();
      if (operator === '*') left *= right;else left /= right;
    }
    return left;
  }

  function calcSum() {
    // <calc-sum> = <calc-product> [ [ '+' | '-' ] <calc-product> ]*
    var left = calcProduct();
    while (currentToken === '+' || currentToken === '-') {
      var operator = currentToken;
      consume();
      var right = calcProduct();
      if (operator === '+') left += right;else left -= right;
    }
    return left;
  }

  // <calc()> = calc( <calc-sum> )
  return calcSum();
}

function parseDimension(unitRegExp, string) {
  string = string.trim().toLowerCase();

  if (string == '0' && 'px'.search(unitRegExp) >= 0) return { px: 0 };

  // If we have parenthesis, we're a calc and need to start with 'calc'.
  if (!/^[^(]*$|^calc/.test(string)) return;
  string = string.replace(/calc\(/g, '(');

  // We tag units by prefixing them with 'U' (note that we are already
  // lowercase) to prevent problems with types which are substrings of
  // each other (although prefixes may be problematic!)
  var matchedUnits = {};
  string = string.replace(unitRegExp, function (match) {
    matchedUnits[match] = null;
    return 'U' + match;
  });
  var taggedUnitRegExp = 'U(' + unitRegExp.source + ')';

  // Validating input is simply applying as many reductions as we can.
  var typeCheck = string.replace(/[-+]?(\d*\.)?\d+([Ee][-+]?\d+)?/g, 'N').replace(new RegExp('N' + taggedUnitRegExp, 'g'), 'D').replace(/\s[+-]\s/g, 'O').replace(/\s/g, '');
  var reductions = [/N\*(D)/g, /(N|D)[*/]N/g, /(N|D)O\1/g, /\((N|D)\)/g];
  var i = 0;
  while (i < reductions.length) {
    if (reductions[i].test(typeCheck)) {
      typeCheck = typeCheck.replace(reductions[i], '$1');
      i = 0;
    } else {
      i++;
    }
  }
  if (typeCheck != 'D') return;

  for (var unit in matchedUnits) {
    var result = calculate(string.replace(new RegExp('U' + unit, 'g'), '').replace(new RegExp(taggedUnitRegExp, 'g'), '*0'));
    if (!isFinite(result)) return;
    matchedUnits[unit] = result;
  }
  return matchedUnits;
}

function mergeDimensionsNonNegative(left, right) {
  return mergeDimensions(left, right, true);
}

function mergeDimensions(left, right, nonNegative) {
  var units = [],
      unit;
  for (unit in left) {
    units.push(unit);
  }for (unit in right) {
    if (units.indexOf(unit) < 0) units.push(unit);
  }

  left = units.map(function (unit) {
    return left[unit] || 0;
  });
  right = units.map(function (unit) {
    return right[unit] || 0;
  });
  return [left, right, function (values) {
    var result = values.map(function (value, i) {
      if (values.length == 1 && nonNegative) {
        value = Math.max(value, 0);
      }
      // Scientific notation (e.g. 1e2) is not yet widely supported by browser vendors.
      return Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["numberToString"])(value) + units[i];
    }).join(' + ');
    return values.length > 1 ? 'calc(' + result + ')' : result;
  }];
}

var lengthUnits = 'px|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc';
var parseLength = parseDimension.bind(null, new RegExp(lengthUnits, 'g'));
var parseLengthOrPercent = parseDimension.bind(null, new RegExp(lengthUnits + '|%', 'g'));
var parseAngle = parseDimension.bind(null, /deg|rad|grad|turn/g);
var consumeLengthOrPercent = _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeParenthesised"].bind(null, parseLengthOrPercent);

var consumeLength = _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeParenthesised"].bind(null, parseLength);
var consumeSizePair = _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeRepeated"].bind(undefined, consumeLength, /^/);
var consumeSizePairList = _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeRepeated"].bind(undefined, consumeSizePair, /^,/);

var parseSizePairList = function parseSizePairList(input) {
  var result = consumeSizePairList(input);
  if (result && result[1] == '') {
    return result[0];
  }
};

var mergeNonNegativeSizePair = _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["mergeNestedRepeated"].bind(undefined, mergeDimensionsNonNegative, ' ');

var mergeNonNegativeSizePairList = _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["mergeNestedRepeated"].bind(undefined, mergeNonNegativeSizePair, ',');
var dimensionhandler = [[parseSizePairList, mergeNonNegativeSizePairList, ['background-size']], [parseLengthOrPercent, mergeDimensionsNonNegative, ['border-bottom-width', 'border-image-width', 'border-left-width', 'border-right-width', 'border-top-width', 'flex-basis', 'font-size', 'height', 'line-height', 'max-height', 'max-width', 'outline-width', 'width']], [parseLengthOrPercent, mergeDimensions, ['border-bottom-left-radius', 'border-bottom-right-radius', 'border-top-left-radius', 'border-top-right-radius', 'bottom', 'left', 'letter-spacing', 'margin-bottom', 'margin-left', 'margin-right', 'margin-top', 'min-height', 'min-width', 'outline-offset', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'perspective', 'right', 'shape-margin', 'stroke-dashoffset', 'text-indent', 'top', 'vertical-align', 'word-spacing']]];

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fontweighthandler", function() { return fontweighthandler; });
/* harmony import */ var _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
// limitations under the License.



function parse(string) {
  var out = Number(string);
  if (isNaN(out) || out < 100 || out > 900 || out % 100 !== 0) {
    return;
  }
  return out;
}

function toCss(value) {
  value = Math.round(value / 100) * 100;
  value = Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["clamp"])(100, 900, value);
  if (value === 400) {
    return 'normal';
  }
  if (value === 700) {
    return 'bold';
  }
  return String(value);
}

function merge(left, right) {
  return [left, right, toCss];
}

var fontweighthandler = [[parse, merge, ['font-weight']]];

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "consumeToken", function() { return consumeToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "consumeTrimmed", function() { return consumeTrimmed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "consumeRepeated", function() { return consumeRepeated; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "consumeParenthesised", function() { return consumeParenthesised; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ignore", function() { return ignore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "optional", function() { return optional; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "consumeList", function() { return consumeList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeWrappedNestedRepeated", function() { return mergeWrappedNestedRepeated; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeList", function() { return mergeList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeNestedRepeated", function() { return mergeNestedRepeated; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handlerutils", function() { return handlerutils; });
/* harmony import */ var _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
// limitations under the License.



// consume* functions return a 2 value array of [parsed-data, '' or not-yet consumed input]

// Regex should be anchored with /^
function consumeToken(regex, string) {
  var result = regex.exec(string);
  if (result) {
    result = regex.ignoreCase ? result[0].toLowerCase() : result[0];
    return [result, string.substr(result.length)];
  }
}
function consumeTrimmed(consumer, string) {
  string = string.replace(/^\s*/, '');
  var result = consumer(string);
  if (result) {
    return [result[0], result[1].replace(/^\s*/, '')];
  }
}
function consumeRepeated(consumer, separator, string) {
  consumer = consumeTrimmed.bind(null, consumer);
  var list = [];
  while (true) {
    var result = consumer(string);
    if (!result) {
      return [list, string];
    }
    list.push(result[0]);
    string = result[1];
    result = consumeToken(separator, string);
    if (!result || result[1] == '') {
      return [list, string];
    }
    string = result[1];
  }
}

// Consumes a token or expression with balanced parentheses

function consumeParenthesised(parser, string) {
  var nesting = 0;
  for (var n = 0; n < string.length; n++) {
    if (/\s|,/.test(string[n]) && nesting == 0) {
      break;
    } else if (string[n] == '(') {
      nesting++;
    } else if (string[n] == ')') {
      nesting--;
      if (nesting == 0) n++;
      if (nesting <= 0) break;
    }
  }
  var parsed = parser(string.substr(0, n));
  return parsed == undefined ? undefined : [parsed, string.substr(n)];
}

function lcm(a, b) {
  var c = a;
  var d = b;
  while (c && d) {
    c > d ? c %= d : d %= c;
  }c = a * b / (c + d);
  return c;
}

function ignore(value) {
  return function (input) {
    var result = value(input);
    if (result) result[0] = undefined;
    return result;
  };
}
function optional(value, defaultValue) {
  return function (input) {
    var result = value(input);
    if (result) return result;
    return [defaultValue, input];
  };
}
function consumeList(list, input) {
  var output = [];
  for (var i = 0; i < list.length; i++) {
    var result = consumeTrimmed(list[i], input);
    if (!result || result[0] == '') return;
    if (result[0] !== undefined) output.push(result[0]);
    input = result[1];
  }
  if (input == '') {
    return output;
  }
}
function mergeWrappedNestedRepeated(wrap, nestedMerge, separator, left, right) {
  var matchingLeft = [];
  var matchingRight = [];
  var reconsititution = [];
  var length = lcm(left.length, right.length);
  for (var i = 0; i < length; i++) {
    var thing = nestedMerge(left[i % left.length], right[i % right.length]);
    if (!thing) {
      return;
    }
    matchingLeft.push(thing[0]);
    matchingRight.push(thing[1]);
    reconsititution.push(thing[2]);
  }
  return [matchingLeft, matchingRight, function (positions) {
    var result = positions.map(function (position, i) {
      return reconsititution[i](position);
    }).join(separator);
    return wrap ? wrap(result) : result;
  }];
}
function mergeList(left, right, list) {
  var lefts = [];
  var rights = [];
  var functions = [];
  var j = 0;
  for (var i = 0; i < list.length; i++) {
    if (typeof list[i] == 'function') {
      var result = list[i](left[j], right[j++]);
      lefts.push(result[0]);
      rights.push(result[1]);
      functions.push(result[2]);
    } else {
      (function (pos) {
        lefts.push(false);
        rights.push(false);
        functions.push(function () {
          return list[pos];
        });
      })(i);
    }
  }
  return [lefts, rights, function (results) {
    var result = '';
    for (var i = 0; i < results.length; i++) {
      result += functions[i](results[i]);
    }
    return result;
  }];
}
var mergeNestedRepeated = mergeWrappedNestedRepeated.bind(null, null);
var handlerutils = [];

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decomposeMatrix", function() { return decomposeMatrix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformListToMatrix", function() { return transformListToMatrix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeMatrixDecomposition", function() { return makeMatrixDecomposition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matrixdecomposition", function() { return matrixdecomposition; });
/* harmony import */ var _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
// limitations under the License.


var decomposeMatrix = function () {
  function determinant(m) {
    return m[0][0] * m[1][1] * m[2][2] + m[1][0] * m[2][1] * m[0][2] + m[2][0] * m[0][1] * m[1][2] - m[0][2] * m[1][1] * m[2][0] - m[1][2] * m[2][1] * m[0][0] - m[2][2] * m[0][1] * m[1][0];
  }

  // from Wikipedia:
  //
  // [A B]^-1 = [A^-1 + A^-1B(D - CA^-1B)^-1CA^-1     -A^-1B(D - CA^-1B)^-1]
  // [C D]      [-(D - CA^-1B)^-1CA^-1                (D - CA^-1B)^-1      ]
  //
  // Therefore
  //
  // [A [0]]^-1 = [A^-1       [0]]
  // [C  1 ]      [ -CA^-1     1 ]
  function inverse(m) {
    var iDet = 1 / determinant(m);
    var a = m[0][0],
        b = m[0][1],
        c = m[0][2];
    var d = m[1][0],
        e = m[1][1],
        f = m[1][2];
    var g = m[2][0],
        h = m[2][1],
        k = m[2][2];
    var Ainv = [[(e * k - f * h) * iDet, (c * h - b * k) * iDet, (b * f - c * e) * iDet, 0], [(f * g - d * k) * iDet, (a * k - c * g) * iDet, (c * d - a * f) * iDet, 0], [(d * h - e * g) * iDet, (g * b - a * h) * iDet, (a * e - b * d) * iDet, 0]];
    var lastRow = [];
    for (var i = 0; i < 3; i++) {
      var val = 0;
      for (var j = 0; j < 3; j++) {
        val += m[3][j] * Ainv[j][i];
      }
      lastRow.push(val);
    }
    lastRow.push(1);
    Ainv.push(lastRow);
    return Ainv;
  }

  function transposeMatrix4(m) {
    return [[m[0][0], m[1][0], m[2][0], m[3][0]], [m[0][1], m[1][1], m[2][1], m[3][1]], [m[0][2], m[1][2], m[2][2], m[3][2]], [m[0][3], m[1][3], m[2][3], m[3][3]]];
  }

  function multVecMatrix(v, m) {
    var result = [];
    for (var i = 0; i < 4; i++) {
      var val = 0;
      for (var j = 0; j < 4; j++) {
        val += v[j] * m[j][i];
      }
      result.push(val);
    }
    return result;
  }

  function normalize(v) {
    var len = length(v);
    return [v[0] / len, v[1] / len, v[2] / len];
  }

  function length(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  }

  function combine(v1, v2, v1s, v2s) {
    return [v1s * v1[0] + v2s * v2[0], v1s * v1[1] + v2s * v2[1], v1s * v1[2] + v2s * v2[2]];
  }

  function cross(v1, v2) {
    return [v1[1] * v2[2] - v1[2] * v2[1], v1[2] * v2[0] - v1[0] * v2[2], v1[0] * v2[1] - v1[1] * v2[0]];
  }

  function decomposeMatrix(matrix) {
    var m3d = [matrix.slice(0, 4), matrix.slice(4, 8), matrix.slice(8, 12), matrix.slice(12, 16)];

    // skip normalization step as m3d[3][3] should always be 1
    if (m3d[3][3] !== 1) {
      return null;
    }

    var perspectiveMatrix = [];
    for (var i = 0; i < 4; i++) {
      perspectiveMatrix.push(m3d[i].slice());
    }

    for (var i = 0; i < 3; i++) {
      perspectiveMatrix[i][3] = 0;
    }

    if (determinant(perspectiveMatrix) === 0) {
      return null;
    }

    var rhs = [];

    var perspective;
    if (m3d[0][3] || m3d[1][3] || m3d[2][3]) {
      rhs.push(m3d[0][3]);
      rhs.push(m3d[1][3]);
      rhs.push(m3d[2][3]);
      rhs.push(m3d[3][3]);

      var inversePerspectiveMatrix = inverse(perspectiveMatrix);
      var transposedInversePerspectiveMatrix = transposeMatrix4(inversePerspectiveMatrix);
      perspective = multVecMatrix(rhs, transposedInversePerspectiveMatrix);
    } else {
      perspective = [0, 0, 0, 1];
    }

    var translate = m3d[3].slice(0, 3);

    var row = [];
    row.push(m3d[0].slice(0, 3));
    var scale = [];
    scale.push(length(row[0]));
    row[0] = normalize(row[0]);

    var skew = [];
    row.push(m3d[1].slice(0, 3));
    skew.push(dot(row[0], row[1]));
    row[1] = combine(row[1], row[0], 1.0, -skew[0]);

    scale.push(length(row[1]));
    row[1] = normalize(row[1]);
    skew[0] /= scale[1];

    row.push(m3d[2].slice(0, 3));
    skew.push(dot(row[0], row[2]));
    row[2] = combine(row[2], row[0], 1.0, -skew[1]);
    skew.push(dot(row[1], row[2]));
    row[2] = combine(row[2], row[1], 1.0, -skew[2]);

    scale.push(length(row[2]));
    row[2] = normalize(row[2]);
    skew[1] /= scale[2];
    skew[2] /= scale[2];

    var pdum3 = cross(row[1], row[2]);
    if (dot(row[0], pdum3) < 0) {
      for (var i = 0; i < 3; i++) {
        scale[i] *= -1;
        row[i][0] *= -1;
        row[i][1] *= -1;
        row[i][2] *= -1;
      }
    }

    var t = row[0][0] + row[1][1] + row[2][2] + 1;
    var s;
    var quaternion;

    if (t > 1e-4) {
      s = 0.5 / Math.sqrt(t);
      quaternion = [(row[2][1] - row[1][2]) * s, (row[0][2] - row[2][0]) * s, (row[1][0] - row[0][1]) * s, 0.25 / s];
    } else if (row[0][0] > row[1][1] && row[0][0] > row[2][2]) {
      s = Math.sqrt(1 + row[0][0] - row[1][1] - row[2][2]) * 2.0;
      quaternion = [0.25 * s, (row[0][1] + row[1][0]) / s, (row[0][2] + row[2][0]) / s, (row[2][1] - row[1][2]) / s];
    } else if (row[1][1] > row[2][2]) {
      s = Math.sqrt(1.0 + row[1][1] - row[0][0] - row[2][2]) * 2.0;
      quaternion = [(row[0][1] + row[1][0]) / s, 0.25 * s, (row[1][2] + row[2][1]) / s, (row[0][2] - row[2][0]) / s];
    } else {
      s = Math.sqrt(1.0 + row[2][2] - row[0][0] - row[1][1]) * 2.0;
      quaternion = [(row[0][2] + row[2][0]) / s, (row[1][2] + row[2][1]) / s, 0.25 * s, (row[1][0] - row[0][1]) / s];
    }

    return [translate, scale, skew, quaternion, perspective];
  }
  return decomposeMatrix;
}();
function dot(v1, v2) {
  var result = 0;
  for (var i = 0; i < v1.length; i++) {
    result += v1[i] * v2[i];
  }
  return result;
}

function multiplyMatrices(a, b) {
  return [a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3], a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3], a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3], a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3], a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7], a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7], a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7], a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7], a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11], a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11], a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11], a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11], a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15], a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15], a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15], a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15]];
}

function toRadians(arg) {
  var rads = arg.rad || 0;
  var degs = arg.deg || 0;
  var grads = arg.grad || 0;
  var turns = arg.turn || 0;
  var angle = (degs / 360 + grads / 400 + turns) * (2 * Math.PI) + rads;
  return angle;
}

function convertItemToMatrix(item) {
  switch (item.t) {
    case 'rotatex':
      var angle = toRadians(item.d[0]);
      return [1, 0, 0, 0, 0, Math.cos(angle), Math.sin(angle), 0, 0, -Math.sin(angle), Math.cos(angle), 0, 0, 0, 0, 1];
    case 'rotatey':
      var angle = toRadians(item.d[0]);
      return [Math.cos(angle), 0, -Math.sin(angle), 0, 0, 1, 0, 0, Math.sin(angle), 0, Math.cos(angle), 0, 0, 0, 0, 1];
    case 'rotate':
    case 'rotatez':
      var angle = toRadians(item.d[0]);
      return [Math.cos(angle), Math.sin(angle), 0, 0, -Math.sin(angle), Math.cos(angle), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    case 'rotate3d':
      var x = item.d[0];
      var y = item.d[1];
      var z = item.d[2];
      var angle = toRadians(item.d[3]);

      var sqrLength = x * x + y * y + z * z;
      if (sqrLength === 0) {
        x = 1;
        y = 0;
        z = 0;
      } else if (sqrLength !== 1) {
        var length = Math.sqrt(sqrLength);
        x /= length;
        y /= length;
        z /= length;
      }

      var s = Math.sin(angle / 2);
      var sc = s * Math.cos(angle / 2);
      var sq = s * s;
      return [1 - 2 * (y * y + z * z) * sq, 2 * (x * y * sq + z * sc), 2 * (x * z * sq - y * sc), 0, 2 * (x * y * sq - z * sc), 1 - 2 * (x * x + z * z) * sq, 2 * (y * z * sq + x * sc), 0, 2 * (x * z * sq + y * sc), 2 * (y * z * sq - x * sc), 1 - 2 * (x * x + y * y) * sq, 0, 0, 0, 0, 1];
    case 'scale':
      return [item.d[0], 0, 0, 0, 0, item.d[1], 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    case 'scalex':
      return [item.d[0], 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    case 'scaley':
      return [1, 0, 0, 0, 0, item.d[0], 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    case 'scalez':
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, item.d[0], 0, 0, 0, 0, 1];
    case 'scale3d':
      return [item.d[0], 0, 0, 0, 0, item.d[1], 0, 0, 0, 0, item.d[2], 0, 0, 0, 0, 1];
    case 'skew':
      var xAngle = toRadians(item.d[0]);
      var yAngle = toRadians(item.d[1]);
      return [1, Math.tan(yAngle), 0, 0, Math.tan(xAngle), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    case 'skewx':
      var angle = toRadians(item.d[0]);
      return [1, 0, 0, 0, Math.tan(angle), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    case 'skewy':
      var angle = toRadians(item.d[0]);
      return [1, Math.tan(angle), 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    case 'translate':
      var x = item.d[0].px || 0;
      var y = item.d[1].px || 0;
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, 0, 1];
    case 'translatex':
      var x = item.d[0].px || 0;
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, 0, 0, 1];
    case 'translatey':
      var y = item.d[0].px || 0;
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, y, 0, 1];
    case 'translatez':
      var z = item.d[0].px || 0;
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, z, 1];
    case 'translate3d':
      var x = item.d[0].px || 0;
      var y = item.d[1].px || 0;
      var z = item.d[2].px || 0;
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];
    case 'perspective':
      var p = item.d[0].px ? -1 / item.d[0].px : 0;
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, p, 0, 0, 0, 1];
    case 'matrix':
      return [item.d[0], item.d[1], 0, 0, item.d[2], item.d[3], 0, 0, 0, 0, 1, 0, item.d[4], item.d[5], 0, 1];
    case 'matrix3d':
      return item.d;
    default:
      false && console.assert(false, 'Transform item type ' + item.t + ' conversion to matrix not yet implemented.');
  }
}

var transformListToMatrix = convertToMatrix;
function convertToMatrix(transformList) {
  if (transformList.length === 0) {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  }
  return transformList.map(convertItemToMatrix).reduce(multiplyMatrices);
}

function makeMatrixDecomposition(transformList) {
  return [decomposeMatrix(convertToMatrix(transformList))];
}
var matrixdecomposition = [];

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "composeMatrix", function() { return composeMatrix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quat", function() { return quat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matrixinterpolation", function() { return matrixinterpolation; });
/* harmony import */ var _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
// limitations under the License.


var composeMatrix = function () {
  function multiply(a, b) {
    var result = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        for (var k = 0; k < 4; k++) {
          result[i][j] += b[i][k] * a[k][j];
        }
      }
    }
    return result;
  }

  function is2D(m) {
    return m[0][2] == 0 && m[0][3] == 0 && m[1][2] == 0 && m[1][3] == 0 && m[2][0] == 0 && m[2][1] == 0 && m[2][2] == 1 && m[2][3] == 0 && m[3][2] == 0 && m[3][3] == 1;
  }

  function composeMatrix(translate, scale, skew, quat, perspective) {
    var matrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];

    for (var i = 0; i < 4; i++) {
      matrix[i][3] = perspective[i];
    }

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        matrix[3][i] += translate[j] * matrix[j][i];
      }
    }

    var x = quat[0],
        y = quat[1],
        z = quat[2],
        w = quat[3];

    var rotMatrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];

    rotMatrix[0][0] = 1 - 2 * (y * y + z * z);
    rotMatrix[0][1] = 2 * (x * y - z * w);
    rotMatrix[0][2] = 2 * (x * z + y * w);
    rotMatrix[1][0] = 2 * (x * y + z * w);
    rotMatrix[1][1] = 1 - 2 * (x * x + z * z);
    rotMatrix[1][2] = 2 * (y * z - x * w);
    rotMatrix[2][0] = 2 * (x * z - y * w);
    rotMatrix[2][1] = 2 * (y * z + x * w);
    rotMatrix[2][2] = 1 - 2 * (x * x + y * y);

    matrix = multiply(matrix, rotMatrix);

    var temp = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    if (skew[2]) {
      temp[2][1] = skew[2];
      matrix = multiply(matrix, temp);
    }

    if (skew[1]) {
      temp[2][1] = 0;
      temp[2][0] = skew[0];
      matrix = multiply(matrix, temp);
    }

    if (skew[0]) {
      temp[2][0] = 0;
      temp[1][0] = skew[0];
      matrix = multiply(matrix, temp);
    }

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        matrix[i][j] *= scale[i];
      }
    }

    if (is2D(matrix)) {
      return [matrix[0][0], matrix[0][1], matrix[1][0], matrix[1][1], matrix[3][0], matrix[3][1]];
    }
    return matrix[0].concat(matrix[1], matrix[2], matrix[3]);
  }
  return composeMatrix;
}();

function clamp(x, min, max) {
  return Math.max(Math.min(x, max), min);
};

function quat(fromQ, toQ, f) {
  var product = Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["dot"])(fromQ, toQ);
  product = clamp(product, -1.0, 1.0);

  var quat = [];
  if (product === 1.0) {
    quat = fromQ;
  } else {
    var theta = Math.acos(product);
    var w = Math.sin(f * theta) * 1 / Math.sqrt(1 - product * product);

    for (var i = 0; i < 4; i++) {
      quat.push(fromQ[i] * (Math.cos(f * theta) - product * w) + toQ[i] * w);
    }
  }
  return quat;
}
var matrixinterpolation = [];

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numberToString", function() { return numberToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseNumber", function() { return parseNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeNumbers", function() { return mergeNumbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseNumberList", function() { return parseNumberList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numberhandler", function() { return numberhandler; });
/* harmony import */ var _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
// limitations under the License.


function numberToString(x) {
  return x.toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
}
function clamp(min, max, x) {
  return Math.min(max, Math.max(min, x));
}
function parseNumber(string) {
  if (/^\s*[-+]?(\d*\.)?\d+\s*$/.test(string)) return Number(string);
}
function mergeNumbers(left, right) {
  return [left, right, numberToString];
}

// FIXME: This should probably go in it's own handler.

function mergeFlex(left, right) {
  if (left == 0) return;
  return clampedMergeNumbers(0, Infinity)(left, right);
}

function mergePositiveIntegers(left, right) {
  return [left, right, function (x) {
    return Math.round(clamp(1, Infinity, x));
  }];
}

function clampedMergeNumbers(min, max) {
  return function (left, right) {
    return [left, right, function (x) {
      return numberToString(clamp(min, max, x));
    }];
  };
}

function parseNumberList(string) {
  var items = string.trim().split(/\s*[\s,]\s*/);
  if (items.length === 0) {
    return;
  }
  var result = [];
  for (var i = 0; i < items.length; i++) {
    var number = parseNumber(items[i]);
    if (number === undefined) {
      return;
    }
    result.push(number);
  }
  return result;
}

function mergeNumberLists(left, right) {
  if (left.length != right.length) {
    return;
  }
  return [left, right, function (numberList) {
    return numberList.map(numberToString).join(' ');
  }];
}

function round(left, right) {
  return [left, right, Math.round];
}

var numberhandler = [[parseNumberList, mergeNumberLists, ['stroke-dasharray']], [parseNumber, clampedMergeNumbers(0, Infinity), ['border-image-width', 'line-height']], [parseNumber, clampedMergeNumbers(0, 1), ['opacity', 'shape-image-threshold']], [parseNumber, mergeFlex, ['flex-grow', 'flex-shrink']], [parseNumber, mergePositiveIntegers, ['orphans', 'widows']], [parseNumber, round, ['z-index']]];

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeOffsetList", function() { return mergeOffsetList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "consumePosition", function() { return consumePosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "positionhandler", function() { return positionhandler; });
/* harmony import */ var _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
// limitations under the License.



function negateDimension(dimension) {
  var result = {};
  for (var k in dimension) {
    result[k] = -dimension[k];
  }
  return result;
}

function consumeOffset(string) {
  return Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeToken"])(/^(left|center|right|top|bottom)\b/i, string) || Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeLengthOrPercent"])(string);
}

var offsetMap = {
  left: { '%': 0 },
  center: { '%': 50 },
  right: { '%': 100 },
  top: { '%': 0 },
  bottom: { '%': 100 }
};

function parseOrigin(slots, string) {
  var result = Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeRepeated"])(consumeOffset, /^/, string);
  if (!result || result[1] != '') return;
  var tokens = result[0];
  tokens[0] = tokens[0] || 'center';
  tokens[1] = tokens[1] || 'center';
  if (slots == 3) {
    tokens[2] = tokens[2] || { px: 0 };
  }
  if (tokens.length != slots) {
    return;
  }
  // Reorder so that the horizontal axis comes first.
  if (/top|bottom/.test(tokens[0]) || /left|right/.test(tokens[1])) {
    var tmp = tokens[0];
    tokens[0] = tokens[1];
    tokens[1] = tmp;
  }
  // Invalid if not horizontal then vertical.
  if (!/left|right|center|Object/.test(tokens[0])) return;
  if (!/top|bottom|center|Object/.test(tokens[1])) return;
  return tokens.map(function (position) {
    return (typeof position === 'undefined' ? 'undefined' : _typeof(position)) == 'object' ? position : offsetMap[position];
  });
}

var mergeOffsetList = _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["mergeNestedRepeated"].bind(null, _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["mergeDimensions"], ' ');
function consumePosition(string) {
  var result = Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeRepeated"])(consumeOffset, /^/, string);
  if (!result) {
    return;
  }

  var tokens = result[0];
  var out = [{ '%': 50 }, { '%': 50 }];
  var pos = 0;
  var bottomOrRight = false;

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (typeof token == 'string') {
      bottomOrRight = /bottom|right/.test(token);
      pos = { left: 0, right: 0, center: pos, top: 1, bottom: 1 }[token];
      out[pos] = offsetMap[token];
      if (token == 'center') {
        // Center doesn't accept a length offset.
        pos++;
      }
    } else {
      if (bottomOrRight) {
        // If bottom or right we need to subtract the length from 100%
        token = negateDimension(token);
        token['%'] = (token['%'] || 0) + 100;
      }
      out[pos] = token;
      pos++;
      bottomOrRight = false;
    }
  }
  return [out, result[1]];
}

function parsePositionList(string) {
  var result = Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeRepeated"])(consumePosition, /^,/, string);
  if (result && result[1] == '') {
    return result[0];
  }
}

var mergePositionList = _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["mergeNestedRepeated"].bind(null, mergeOffsetList, ', ');
var positionhandler = [[parseOrigin.bind(null, 3), mergeOffsetList, ['transform-origin']], [parseOrigin.bind(null, 2), mergeOffsetList, ['perspective-origin']], [parsePositionList, mergePositionList, ['background-position', 'object-position']]];

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shadowhandler", function() { return shadowhandler; });
/* harmony import */ var _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
// limitations under the License.



function consumeShadow(string) {
  var shadow = {
    inset: false,
    lengths: [],
    color: null
  };
  function consumePart(string) {
    var result = Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeToken"])(/^inset/i, string);
    if (result) {
      shadow.inset = true;
      return result;
    }
    var result = Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeLengthOrPercent"])(string);
    if (result) {
      shadow.lengths.push(result[0]);
      return result;
    }
    var result = Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeColor"])(string);
    if (result) {
      shadow.color = result[0];
      return result;
    }
  }
  var result = Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeRepeated"])(consumePart, /^/, string);
  if (result && result[0].length) {
    return [shadow, result[1]];
  }
}

function parseShadowList(string) {
  var result = Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeRepeated"])(consumeShadow, /^,/, string);
  if (result && result[1] == '') {
    return result[0];
  }
}

function mergeShadow(left, right) {
  while (left.lengths.length < Math.max(left.lengths.length, right.lengths.length)) {
    left.lengths.push({ px: 0 });
  }while (right.lengths.length < Math.max(left.lengths.length, right.lengths.length)) {
    right.lengths.push({ px: 0 });
  }if (left.inset != right.inset || !!left.color != !!right.color) {
    return;
  }
  var lengthReconstitution = [];
  var colorReconstitution;
  var matchingLeft = [[], 0];
  var matchingRight = [[], 0];
  for (var i = 0; i < left.lengths.length; i++) {
    var mergedDimensions = Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["mergeDimensions"])(left.lengths[i], right.lengths[i], i == 2);
    matchingLeft[0].push(mergedDimensions[0]);
    matchingRight[0].push(mergedDimensions[1]);
    lengthReconstitution.push(mergedDimensions[2]);
  }
  if (left.color && right.color) {
    var mergedColor = Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["mergeColors"])(left.color, right.color);
    matchingLeft[1] = mergedColor[0];
    matchingRight[1] = mergedColor[1];
    colorReconstitution = mergedColor[2];
  }
  return [matchingLeft, matchingRight, function (value) {
    var result = left.inset ? 'inset ' : ' ';
    for (var i = 0; i < lengthReconstitution.length; i++) {
      result += lengthReconstitution[i](value[0][i]) + ' ';
    }
    if (colorReconstitution) {
      result += colorReconstitution(value[1]);
    }
    return result;
  }];
}

function mergeNestedRepeatedShadow(nestedMerge, separator, left, right) {
  var leftCopy = [];
  var rightCopy = [];
  function defaultShadow(inset) {
    return { inset: inset, color: [0, 0, 0, 0], lengths: [{ px: 0 }, { px: 0 }, { px: 0 }, { px: 0 }] };
  }
  for (var i = 0; i < left.length || i < right.length; i++) {
    var l = left[i] || defaultShadow(right[i].inset);
    var r = right[i] || defaultShadow(left[i].inset);
    leftCopy.push(l);
    rightCopy.push(r);
  }
  return Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["mergeNestedRepeated"])(nestedMerge, separator, leftCopy, rightCopy);
}

var mergeShadowList = mergeNestedRepeatedShadow.bind(null, mergeShadow, ', ');
var shadowhandler = [[parseShadowList, mergeShadowList, ['box-shadow', 'text-shadow']]];

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shapehandler", function() { return shapehandler; });
/* harmony import */ var _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
// limitations under the License.



var consumeLengthOrPercent = _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeParenthesised"].bind(null, _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["parseLengthOrPercent"]);
var consumeLengthOrPercentPair = _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeRepeated"].bind(undefined, consumeLengthOrPercent, /^/);

var mergeSizePair = _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["mergeNestedRepeated"].bind(undefined, _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["mergeDimensions"], ' ');
var mergeSizePairList = _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["mergeNestedRepeated"].bind(undefined, mergeSizePair, ',');

function parseShape(input) {
  var circle = Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeToken"])(/^circle/, input);
  if (circle && circle[0]) {
    return ['circle'].concat(Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeList"])([Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["ignore"])(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeToken"].bind(undefined, /^\(/)), consumeLengthOrPercent, Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["ignore"])(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeToken"].bind(undefined, /^at/)), _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumePosition"], Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["ignore"])(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeToken"].bind(undefined, /^\)/))], circle[1]));
  }
  var ellipse = Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeToken"])(/^ellipse/, input);
  if (ellipse && ellipse[0]) {
    return ['ellipse'].concat(Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeList"])([Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["ignore"])(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeToken"].bind(undefined, /^\(/)), consumeLengthOrPercentPair, Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["ignore"])(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeToken"].bind(undefined, /^at/)), _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumePosition"], Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["ignore"])(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeToken"].bind(undefined, /^\)/))], ellipse[1]));
  }
  var polygon = Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeToken"])(/^polygon/, input);
  if (polygon && polygon[0]) {
    return ['polygon'].concat(Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeList"])([Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["ignore"])(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeToken"].bind(undefined, /^\(/)), Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["optional"])(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeToken"].bind(undefined, /^nonzero\s*,|^evenodd\s*,/), 'nonzero,'), _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeSizePairList"], Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["ignore"])(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["consumeToken"].bind(undefined, /^\)/))], polygon[1]));
  }
}

function mergeShapes(left, right) {
  if (left[0] !== right[0]) return;
  if (left[0] == 'circle') {
    return Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["mergeList"])(left.slice(1), right.slice(1), ['circle(', _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["mergeDimensions"], ' at ', _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["mergeOffsetList"], ')']);
  }
  if (left[0] == 'ellipse') {
    return Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["mergeList"])(left.slice(1), right.slice(1), ['ellipse(', _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["mergeNonNegativeSizePair"], ' at ', _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["mergeOffsetList"], ')']);
  }
  if (left[0] == 'polygon' && left[1] == right[1]) {
    return Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["mergeList"])(left.slice(2), right.slice(2), ['polygon(', left[1], mergeSizePairList, ')']);
  }
}

var shapehandler = [[parseShape, mergeShapes, ['shape-outside']]];

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformToSvgMatrix", function() { return transformToSvgMatrix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformhandler", function() { return transformhandler; });
/* harmony import */ var _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
// limitations under the License.



// This returns a function for converting transform functions to equivalent
// primitive functions, which will take an array of values from the
// derivative type and fill in the blanks (underscores) with them.
var _ = null;
function cast(pattern) {
  return function (contents) {
    var i = 0;
    return pattern.map(function (x) {
      return x === _ ? contents[i++] : x;
    });
  };
}

function id(x) {
  return x;
}

var Opx = { px: 0 };
var Odeg = { deg: 0 };

// type: [argTypes, convertTo3D, convertTo2D]
// In the argument types string, lowercase characters represent optional arguments
var transformFunctions = {
  matrix: ['NNNNNN', [_, _, 0, 0, _, _, 0, 0, 0, 0, 1, 0, _, _, 0, 1], id],
  matrix3d: ['NNNNNNNNNNNNNNNN', id],
  rotate: ['A'],
  rotatex: ['A'],
  rotatey: ['A'],
  rotatez: ['A'],
  rotate3d: ['NNNA'],
  perspective: ['L'],
  scale: ['Nn', cast([_, _, 1]), id],
  scalex: ['N', cast([_, 1, 1]), cast([_, 1])],
  scaley: ['N', cast([1, _, 1]), cast([1, _])],
  scalez: ['N', cast([1, 1, _])],
  scale3d: ['NNN', id],
  skew: ['Aa', null, id],
  skewx: ['A', null, cast([_, Odeg])],
  skewy: ['A', null, cast([Odeg, _])],
  translate: ['Tt', cast([_, _, Opx]), id],
  translatex: ['T', cast([_, Opx, Opx]), cast([_, Opx])],
  translatey: ['T', cast([Opx, _, Opx]), cast([Opx, _])],
  translatez: ['L', cast([Opx, Opx, _])],
  translate3d: ['TTL', id]
};

function parseTransform(string) {
  string = string.toLowerCase().trim();
  if (string == 'none') return [];
  // FIXME: Using a RegExp means calcs won't work here
  var transformRegExp = /\s*(\w+)\(([^)]*)\)/g;
  var result = [];
  var match;
  var prevLastIndex = 0;
  while (match = transformRegExp.exec(string)) {
    if (match.index != prevLastIndex) return;
    prevLastIndex = match.index + match[0].length;
    var functionName = match[1];
    var functionData = transformFunctions[functionName];
    if (!functionData) return;
    var args = match[2].split(',');
    var argTypes = functionData[0];
    if (argTypes.length < args.length) return;

    var parsedArgs = [];
    for (var i = 0; i < argTypes.length; i++) {
      var arg = args[i];
      var type = argTypes[i];
      var parsedArg;
      if (!arg) parsedArg = { a: Odeg,
        n: parsedArgs[0],
        t: Opx }[type];else parsedArg = { A: function A(s) {
          return s.trim() == '0' ? Odeg : Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["parseAngle"])(s);
        },
        N: _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["parseNumber"],
        T: _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["parseLengthOrPercent"],
        L: _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["parseLength"] }[type.toUpperCase()](arg);
      if (parsedArg === undefined) return;
      parsedArgs.push(parsedArg);
    }
    result.push({ t: functionName, d: parsedArgs });

    if (transformRegExp.lastIndex == string.length) return result;
  }
};

function numberToLongString(x) {
  return x.toFixed(6).replace('.000000', '');
}

function mergeMatrices(left, right) {
  if (left.decompositionPair !== right) {
    left.decompositionPair = right;
    var leftArgs = Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["makeMatrixDecomposition"])(left);
  }
  if (right.decompositionPair !== left) {
    right.decompositionPair = left;
    var rightArgs = Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["makeMatrixDecomposition"])(right);
  }
  if (leftArgs[0] == null || rightArgs[0] == null) return [[false], [true], function (x) {
    return x ? right[0].d : left[0].d;
  }];
  leftArgs[0].push(0);
  rightArgs[0].push(1);
  return [leftArgs, rightArgs, function (list) {
    var quat = quat(leftArgs[0][3], rightArgs[0][3], list[5]);
    var mat = Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["composeMatrix"])(list[0], list[1], list[2], quat, list[4]);
    var stringifiedArgs = mat.map(numberToLongString).join(',');
    return stringifiedArgs;
  }];
}

function typeTo2D(type) {
  return type.replace(/[xy]/, '');
}

function typeTo3D(type) {
  return type.replace(/(x|y|z|3d)?$/, '3d');
}

function mergeTransforms(left, right) {
  var matrixModulesLoaded = _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["makeMatrixDecomposition"] && true;

  var flipResults = false;
  if (!left.length || !right.length) {
    if (!left.length) {
      flipResults = true;
      left = right;
      right = [];
    }
    for (var i = 0; i < left.length; i++) {
      var type = left[i].t;
      var args = left[i].d;
      var defaultValue = type.substr(0, 5) == 'scale' ? 1 : 0;
      right.push({ t: type, d: args.map(function (arg) {
          if (typeof arg == 'number') return defaultValue;
          var result = {};
          for (var unit in arg) {
            result[unit] = defaultValue;
          }return result;
        }) });
    }
  }

  var isMatrixOrPerspective = function isMatrixOrPerspective(lt, rt) {
    return lt == 'perspective' && rt == 'perspective' || (lt == 'matrix' || lt == 'matrix3d') && (rt == 'matrix' || rt == 'matrix3d');
  };
  var leftResult = [];
  var rightResult = [];
  var types = [];

  if (left.length != right.length) {
    if (!matrixModulesLoaded) return;
    var merged = mergeMatrices(left, right);
    leftResult = [merged[0]];
    rightResult = [merged[1]];
    types = [['matrix', [merged[2]]]];
  } else {
    for (var i = 0; i < left.length; i++) {
      var leftType = left[i].t;
      var rightType = right[i].t;
      var leftArgs = left[i].d;
      var rightArgs = right[i].d;

      var leftFunctionData = transformFunctions[leftType];
      var rightFunctionData = transformFunctions[rightType];

      var type;
      if (isMatrixOrPerspective(leftType, rightType)) {
        if (!matrixModulesLoaded) return;
        var merged = mergeMatrices([left[i]], [right[i]]);
        leftResult.push(merged[0]);
        rightResult.push(merged[1]);
        types.push(['matrix', [merged[2]]]);
        continue;
      } else if (leftType == rightType) {
        type = leftType;
      } else if (leftFunctionData[2] && rightFunctionData[2] && typeTo2D(leftType) == typeTo2D(rightType)) {
        type = typeTo2D(leftType);
        leftArgs = leftFunctionData[2](leftArgs);
        rightArgs = rightFunctionData[2](rightArgs);
      } else if (leftFunctionData[1] && rightFunctionData[1] && typeTo3D(leftType) == typeTo3D(rightType)) {
        type = typeTo3D(leftType);
        leftArgs = leftFunctionData[1](leftArgs);
        rightArgs = rightFunctionData[1](rightArgs);
      } else {
        if (!matrixModulesLoaded) return;
        var merged = mergeMatrices(left, right);
        leftResult = [merged[0]];
        rightResult = [merged[1]];
        types = [['matrix', [merged[2]]]];
        break;
      }

      var leftArgsCopy = [];
      var rightArgsCopy = [];
      var stringConversions = [];
      for (var j = 0; j < leftArgs.length; j++) {
        var merge = typeof leftArgs[j] == 'number' ? _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["mergeNumbers"] : _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["mergeDimensions"];
        var merged = merge(leftArgs[j], rightArgs[j]);
        leftArgsCopy[j] = merged[0];
        rightArgsCopy[j] = merged[1];
        stringConversions.push(merged[2]);
      }
      leftResult.push(leftArgsCopy);
      rightResult.push(rightArgsCopy);
      types.push([type, stringConversions]);
    }
  }

  if (flipResults) {
    var tmp = leftResult;
    leftResult = rightResult;
    rightResult = tmp;
  }

  return [leftResult, rightResult, function (list) {
    return list.map(function (args, i) {
      var stringifiedArgs = args.map(function (arg, j) {
        return types[i][1][j](arg);
      }).join(',');
      if (types[i][0] == 'matrix' && stringifiedArgs.split(',').length == 16) types[i][0] = 'matrix3d';
      return types[i][0] + '(' + stringifiedArgs + ')';
    }).join(' ');
  }];
}

var transformToSvgMatrix = function transformToSvgMatrix(string) {
  // matrix(<a> <b> <c> <d> <e> <f>)
  var mat = Object(_hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__["transformListToMatrix"])(parseTransform(string));
  return 'matrix(' + numberToLongString(mat[0]) + ' ' + // <a>
  numberToLongString(mat[1]) + ' ' + // <b>
  numberToLongString(mat[4]) + ' ' + // <c>
  numberToLongString(mat[5]) + ' ' + // <d>
  numberToLongString(mat[12]) + ' ' + // <e>
  numberToLongString(mat[13]) + // <f>
  ')';
};

if (false) {}

var transformhandler = [[parseTransform, mergeTransforms, ['transform']]];

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "visibilityhandler", function() { return visibilityhandler; });
/* harmony import */ var _hyper_linked_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
// limitations under the License.



function merge(left, right) {
  if (left != 'visible' && right != 'visible') return;
  return [0, 1, function (x) {
    if (x <= 0) return left;
    if (x >= 1) return right;
    return 'visible';
  }];
}

var visibilityhandler = [[String, merge, ['visibility']]];

/***/ })
/******/ ]);
});