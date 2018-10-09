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

import * as hyper from "./web-animations-processed/hyper-linked.js";

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

export const dimensionType = function(property) {
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
