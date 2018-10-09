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

export function numberToString(x) {
  return x.toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
}
export function clamp(min, max, x) {
  return Math.min(max, Math.max(min, x));
}
export function parseNumber(string) {
  if (/^\s*[-+]?(\d*\.)?\d+\s*$/.test(string)) return Number(string);
}
export function mergeNumbers(left, right) {
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

export function parseNumberList(string) {
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

export var numberhandler = [[parseNumberList, mergeNumberLists, ['stroke-dasharray']], [parseNumber, clampedMergeNumbers(0, Infinity), ['border-image-width', 'line-height']], [parseNumber, clampedMergeNumbers(0, 1), ['opacity', 'shape-image-threshold']], [parseNumber, mergeFlex, ['flex-grow', 'flex-shrink']], [parseNumber, mergePositiveIntegers, ['orphans', 'widows']], [parseNumber, round, ['z-index']]];