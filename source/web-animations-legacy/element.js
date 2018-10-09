// The following is a heavily modified version of:
// https://github.com/web-animations/web-animations-js/blob/dev/src/apply-preserving-inline-style.js


// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//		 You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//		 See the License for the specific language governing permissions and
// limitations under the License.

const verbose = false;

const styleAttributes = {
	cssText: 1,
	length: 1,
	parentRule: 1
};

const styleMethods = {
	getPropertyCSSValue: 1,
	getPropertyPriority: 1,
	getPropertyValue: 1,
	item: 1,
	removeProperty: 1,
	setProperty: 1
};

function configureProperty(object, property, descriptor) {
	descriptor.enumerable = true;
	descriptor.configurable = true;
	Object.defineProperty(object, property, descriptor);
}

export class HyperCSSStyleDeclaration { // 2018 experimental, simplified
	constructor(element, controller, layer) {
		Object.defineProperty(this, "hyperStyleLayer", { // will collide with css properties
			get: function() {
				return layer;
			},
			enumerable: false,
			configurable: false
		});
		Object.defineProperty(this, "hyperStyleIndices", { // will collide with css properties
			value:{},
			enumerable: false,
			configurable: false
		});
		Object.defineProperty(this, "hyperStyleLength", { // will collide with css properties
			value:{},
			enumerable: false,
			configurable: false
		});
	}
	hyperStyleUpdate() {
		console.log("hyperStyleUpdate _surrogateElement ???");
		// const model = controller.model;
		// const length = Object.keys(model).length;
		// while (this.hyperStyleLength < length) {
		// 	Object.defineProperty(this, this.hyperStyleLength, {
		// 		configurable: true,
		// 		enumerable: false,
		// 		get: (function(index) {
		// 		return function() {
		// 			return this._surrogateElement.style[index];
		// 		};
		// 		})(this.hyperStyleLength)
		// 	});
		// 	this.hyperStyleLength++;
		// }
		// while (this.hyperStyleLength > length) {
		// 	this.hyperStyleLength--;
		// 	Object.defineProperty(this, this.hyperStyleLength, {
		// 		configurable: true,
		// 		enumerable: false,
		// 		value: undefined
		// 	});
		// }
	}
}

export function prepareDocument(source) {
	if (typeof document !== "undefined") {
		// Wrap the style.cssProperty getters and setters.
		for (let property in document.documentElement.style) {
			if (property in styleAttributes || property in styleMethods) {
				continue;
			}
			(function(property) {
				configureProperty(HyperCSSStyleDeclaration.prototype, property, {
					get: function() {
						if (Number.isNaN(parseFloat(property))) {
							if (verbose) console.log("*** get property:%s; value:%s;",property,this.hyperStyleLayer[property]);
							return this.hyperStyleLayer[property]; // This is not an ugly value, it is acutally pretty.
						} else {
							console.log("$$$ get index",property);
							return this.hyperStyleIndices[property];
						}
					},
					set: function(value) {
						if (Number.isNaN(parseFloat(property))) {
							if (verbose) console.log("*** set property:%s; value:%s;",property,value);
							this.hyperStyleLayer[property] = value; // This will produce animations from and to the ugly values, not CSS values.
						} else {
							console.log("$$$ set index:",property);
							console.log("$$$ set value:",value);
							this.hyperStyleIndices[property] = value;
						}
					}
				});
			})(property);
		}
	}
}

// export function ensureTargetCSSInitialized(target, delegate, oldStyle) {
//		 //if (target.style._pyonInitialized) return; // PyonReact
//		 if (target && target.style._pyonInitialized) return; // PyonReact
//
// //		 try {
//			 var animatedStyle = new PyonStyleDeclaration(target, delegate, oldStyle);
//			 if (!target) return animatedStyle;
//			 Object.defineProperty(target, 'style', configureDescriptor({
//				 get: function() {
//					 return animatedStyle;
//				 }
//			 }));
// //		 } catch (error) {
// //			 patchInlineStyleForAnimation(target.style);
// //			 console.log("ensure error !!!!!");
// //		 }
//		 target.style._pyonInitialized = true; // PyonReact // formerly _webAnimationsStyleInitialized
//	 }
