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

import { mergeNonNegativeSizePair } from './hyper-linked.js';
import { mergeOffsetList } from './hyper-linked.js';
import { mergeList } from './hyper-linked.js';
import { consumeSizePairList } from './hyper-linked.js';
import { optional } from './hyper-linked.js';
import { consumePosition } from './hyper-linked.js';
import { ignore } from './hyper-linked.js';
import { consumeList } from './hyper-linked.js';
import { consumeToken } from './hyper-linked.js';
import { mergeDimensions } from './hyper-linked.js';
import { mergeNestedRepeated } from './hyper-linked.js';
import { consumeRepeated } from './hyper-linked.js';
import { parseLengthOrPercent } from './hyper-linked.js';
import { consumeParenthesised } from './hyper-linked.js';


var consumeLengthOrPercent = consumeParenthesised.bind(null, parseLengthOrPercent);
var consumeLengthOrPercentPair = consumeRepeated.bind(undefined, consumeLengthOrPercent, /^/);

var mergeSizePair = mergeNestedRepeated.bind(undefined, mergeDimensions, ' ');
var mergeSizePairList = mergeNestedRepeated.bind(undefined, mergeSizePair, ',');

function parseShape(input) {
  var circle = consumeToken(/^circle/, input);
  if (circle && circle[0]) {
    return ['circle'].concat(consumeList([ignore(consumeToken.bind(undefined, /^\(/)), consumeLengthOrPercent, ignore(consumeToken.bind(undefined, /^at/)), consumePosition, ignore(consumeToken.bind(undefined, /^\)/))], circle[1]));
  }
  var ellipse = consumeToken(/^ellipse/, input);
  if (ellipse && ellipse[0]) {
    return ['ellipse'].concat(consumeList([ignore(consumeToken.bind(undefined, /^\(/)), consumeLengthOrPercentPair, ignore(consumeToken.bind(undefined, /^at/)), consumePosition, ignore(consumeToken.bind(undefined, /^\)/))], ellipse[1]));
  }
  var polygon = consumeToken(/^polygon/, input);
  if (polygon && polygon[0]) {
    return ['polygon'].concat(consumeList([ignore(consumeToken.bind(undefined, /^\(/)), optional(consumeToken.bind(undefined, /^nonzero\s*,|^evenodd\s*,/), 'nonzero,'), consumeSizePairList, ignore(consumeToken.bind(undefined, /^\)/))], polygon[1]));
  }
}

function mergeShapes(left, right) {
  if (left[0] !== right[0]) return;
  if (left[0] == 'circle') {
    return mergeList(left.slice(1), right.slice(1), ['circle(', mergeDimensions, ' at ', mergeOffsetList, ')']);
  }
  if (left[0] == 'ellipse') {
    return mergeList(left.slice(1), right.slice(1), ['ellipse(', mergeNonNegativeSizePair, ' at ', mergeOffsetList, ')']);
  }
  if (left[0] == 'polygon' && left[1] == right[1]) {
    return mergeList(left.slice(2), right.slice(2), ['polygon(', left[1], mergeSizePairList, ')']);
  }
}

export var shapehandler = [[parseShape, mergeShapes, ['shape-outside']]];