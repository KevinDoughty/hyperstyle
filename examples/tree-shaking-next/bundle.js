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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hyper_animations_mjs__ = __webpack_require__(1);

// console.log("this is not going to work because variables appear in the wrong order");
var dimension = Object(__WEBPACK_IMPORTED_MODULE_0__hyper_animations_mjs__["a" /* dimensionType */])();
console.log("dimension type:", dimension);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return dimensionType; });
// Copyright 2014 Google Inc. All rights reserved.

function mergeComponent(left, right) {
  if (left == 'auto' || right == 'auto') {
    return [true, false, function (t) {
      var result = t ? left : right;
      if (result == 'auto') {
        return 'auto';
      }
      // FIXME: There's probably a better way to turn a dimension back into a string.
      var merged = mergeDimensions$$1(result, result);
      return merged[2](merged[0]);
    }];
  }
  return mergeDimensions$$1(left, right);
}

function wrap(result) {
  return 'rect(' + result + ')';
}

var mergeBoxes$$1 = mergeWrappedNestedRepeated.bind(null, wrap, mergeComponent, ', ');

// Copyright 2014 Google Inc. All rights reserved.

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

function mergeColors$$1(left, right) {
  return [left, right, function (x) {
    function clamp(v) {
      return Math.max(0, Math.min(255, v));
    }
    if (x[3]) {
      for (var i = 0; i < 3; i++) {
        x[i] = Math.round(clamp(x[i] / x[3]));
      }
    }
    x[3] = numberToString(clamp(0, 1, x[3]));
    return 'rgba(' + x.join(',') + ')';
  }];
}
var consumeColor$$1 = consumeParenthesised.bind(null, parseColor);

// Copyright 2014 Google Inc. All rights reserved.

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
  return mergeDimensions$$1(left, right, true);
}

function mergeDimensions$$1(left, right, nonNegative) {
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
      return numberToString(value) + units[i];
    }).join(' + ');
    return values.length > 1 ? 'calc(' + result + ')' : result;
  }];
}

var lengthUnits = 'px|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc';
var parseLength$$1 = parseDimension.bind(null, new RegExp(lengthUnits, 'g'));
var parseLengthOrPercent$$1 = parseDimension.bind(null, new RegExp(lengthUnits + '|%', 'g'));
var parseAngle$$1 = parseDimension.bind(null, /deg|rad|grad|turn/g);
var consumeLengthOrPercent$$1 = consumeParenthesised.bind(null, parseLengthOrPercent$$1);

var consumeLength = consumeParenthesised.bind(null, parseLength$$1);
var consumeSizePair = consumeRepeated.bind(undefined, consumeLength, /^/);
var consumeSizePairList$$1 = consumeRepeated.bind(undefined, consumeSizePair, /^,/);

var mergeNonNegativeSizePair$$1 = mergeNestedRepeated.bind(undefined, mergeDimensionsNonNegative, ' ');

var mergeNonNegativeSizePairList = mergeNestedRepeated.bind(undefined, mergeNonNegativeSizePair$$1, ',');

// Copyright 2014 Google Inc. All rights reserved.

// Copyright 2014 Google Inc. All rights reserved.

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
var mergeNestedRepeated = mergeWrappedNestedRepeated.bind(null, null);

// Copyright 2014 Google Inc. All rights reserved.

// Copyright 2014 Google Inc. All rights reserved.

// Copyright 2014 Google Inc. All rights reserved.
function numberToString(x) {
  return x.toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

// Copyright 2014 Google Inc. All rights reserved.

function negateDimension(dimension) {
  var result = {};
  for (var k in dimension) {
    result[k] = -dimension[k];
  }
  return result;
}

function consumeOffset(string) {
  return consumeToken(/^(left|center|right|top|bottom)\b/i, string) || consumeLengthOrPercent$$1(string);
}

var offsetMap = {
  left: { '%': 0 },
  center: { '%': 50 },
  right: { '%': 100 },
  top: { '%': 0 },
  bottom: { '%': 100 }
};

function parseOrigin(slots, string) {
  var result = consumeRepeated(consumeOffset, /^/, string);
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

var mergeOffsetList$$1 = mergeNestedRepeated.bind(null, mergeDimensions$$1, ' ');
function consumePosition$$1(string) {
  var result = consumeRepeated(consumeOffset, /^/, string);
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
  var result = consumeRepeated(consumePosition$$1, /^,/, string);
  if (result && result[1] == '') {
    return result[0];
  }
}

var mergePositionList = mergeNestedRepeated.bind(null, mergeOffsetList$$1, ', ');
var positionhandler$$1 = [[parseOrigin.bind(null, 3), mergeOffsetList$$1, ['transform-origin']], [parseOrigin.bind(null, 2), mergeOffsetList$$1, ['perspective-origin']], [parsePositionList, mergePositionList, ['background-position', 'object-position']]];

// Copyright 2014 Google Inc. All rights reserved.

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
    var mergedDimensions = mergeDimensions$$1(left.lengths[i], right.lengths[i], i == 2);
    matchingLeft[0].push(mergedDimensions[0]);
    matchingRight[0].push(mergedDimensions[1]);
    lengthReconstitution.push(mergedDimensions[2]);
  }
  if (left.color && right.color) {
    var mergedColor = mergeColors$$1(left.color, right.color);
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
  return mergeNestedRepeated(nestedMerge, separator, leftCopy, rightCopy);
}

var mergeShadowList = mergeNestedRepeatedShadow.bind(null, mergeShadow, ', ');

// Copyright 2014 Google Inc. All rights reserved.

var consumeLengthOrPercent$1 = consumeParenthesised.bind(null, parseLengthOrPercent$$1);
var consumeLengthOrPercentPair = consumeRepeated.bind(undefined, consumeLengthOrPercent$1, /^/);

var mergeSizePair = mergeNestedRepeated.bind(undefined, mergeDimensions$$1, ' ');
var mergeSizePairList = mergeNestedRepeated.bind(undefined, mergeSizePair, ',');

// Copyright 2014 Google Inc. All rights reserved.

// Copyright 2014 Google Inc. All rights reserved.

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



const dimensionTypes = {};
dimensionhandler.dimensionhandler.forEach( function(handlers,index) {
	handlers.forEach( function(handler) {
		dimensionTypes[handler] = index;
	});
});

const dimensionType = function(property) {
	const number = dimensionTypes[property];
	const handlerArray = dimensionhandler.dimensionhandler[number]; // parser, merger, properties

// 	parse:hyper.dimensionhandler
// 	merge:
// 	properties:
	return {
		parser: handlerArray[0],
		merger: handlerArray[1],
		properties: handlerArray[2],
		zero: function(value) {
			return 0;
		},
		add: function(a,b) {
			return 0;
		},
		subtract: function(a,b) {
			return 0;
		},
		interpolate: function(from, to, progress) {
			return to;
		},
		output: function(value) {
			return value;
		},
		input: function(value) {
			const result = handlerArray[0](value);
			console.log("%s input:%s; result:%s;",property,value,result);
			return result;
		}
	}
};

//dimensionType("left").input("asdf");




/***/ })
/******/ ]);