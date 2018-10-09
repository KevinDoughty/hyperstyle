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

import { mergeWrappedNestedRepeated } from './hyper-linked.js';
import { mergeDimensions } from './hyper-linked.js';
import { consumeRepeated } from './hyper-linked.js';
import { ignore } from './hyper-linked.js';
import { consumeList } from './hyper-linked.js';
import { consumeToken } from './hyper-linked.js';
import { consumeLengthOrPercent } from './hyper-linked.js';

function consumeLengthPercentOrAuto(string) {
  return consumeLengthOrPercent(string) || consumeToken(/^auto/, string);
}
export function parseBox(string) {
  var result = consumeList([ignore(consumeToken.bind(null, /^rect/)), ignore(consumeToken.bind(null, /^\(/)), consumeRepeated.bind(null, consumeLengthPercentOrAuto, /^,/), ignore(consumeToken.bind(null, /^\)/))], string);
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
      var merged = mergeDimensions(result, result);
      return merged[2](merged[0]);
    }];
  }
  return mergeDimensions(left, right);
}

function wrap(result) {
  return 'rect(' + result + ')';
}

export var mergeBoxes = mergeWrappedNestedRepeated.bind(null, wrap, mergeComponent, ', ');
export var boxhandler = [[parseBox, mergeBoxes, ['clip']]];