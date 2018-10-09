import { activate } from "hyperact";
import { prepareDocument, HyperCSSStyleDeclaration } from "./element.js";
//import { beginTransaction, commitTransaction, currentTransaction, disableAnimation } from "hyperact";
import { disableAnimation } from "hyperact";
//const TRANSACTION_DURATION_ALONE_IS_ENOUGH = true;
import { nonNumericType } from "./nonNumeric.js";

const verbose = true;

const usedPropertyTypes = {};

export function typeOfProperty(property) {
	return usedPropertyTypes[property] || nonNumericType;
}

export function registerAnimatableStyles(dict) {
	Object.assign(usedPropertyTypes,dict);
	//prepareDocument(dict,HyperStyleDeclaration);
	prepareDocument(dict,HyperCSSStyleDeclaration);
}

function isFunction(w) {
	return w && {}.toString.call(w) === "[object Function]";
}


export class HyperStyleDelegate {
	constructor(style,controller,delegate) { // this should probably not be public
		this.original = style;
		this.controller = controller || {};
		this.delegate = delegate;
		this.previousLayer = {};
		this.target = null; // assigned in setElement
	}
	animationForKey(key,prettyValue,prettyPrevious,prettyPresentation,target) { // sometimesUglySometimesPrettyPrevious // prettyPrevious needs to be uglyPrevious. This is a Pyon problem
		//if (verbose)
		if (prettyPrevious === null || typeof prettyPrevious === "undefined") prettyPrevious = prettyValue;
		if (prettyPresentation === null || typeof prettyPresentation === "undefined") prettyPresentation = prettyValue;
		let description; // initially undefined
		if (this.delegate && isFunction(this.delegate)) {
			description = this.delegate.call(this.controller,key,prettyValue,prettyPrevious,prettyPresentation,this.target);
			//console.log("$ $ $ $ $ $ $ hyperStyleDelegate function animationForKey:%s; value:%s; previous:%s; presentation:%s;",key,prettyValue,prettyPrevious,prettyPresentation);
			//if (verbose) console.log("Hyperstyle core function animationForKey:",JSON.stringify(description));
		} else if (this.delegate && isFunction(this.delegate.animationForKey)) {
			description = this.delegate.animationForKey.call(this.delegate,key,prettyValue,prettyPrevious,prettyPresentation,this.target);
			//console.log("$ $ $ $ $ $ $ hyperStyleDelegate delegate animationForKey:%s; value:%s; previous:%s; presentation:%s;",key,prettyValue,prettyPrevious,prettyPresentation);
			//if (verbose) console.log("Hyperstyle core delegate animationForKey:",JSON.stringify(description));
		// } else {
		// 	console.log("$ $ $ $ $ $ $ hyperStyleDelegate none animationForKey:%s; value:%s; previous:%s; presentation:%s;",key,prettyValue,prettyPrevious,prettyPresentation);
		// 	//if (verbose) console.log("Hyperstyle core delegate animationForKey not called");
		}
		return description;
	}
	typeOfProperty(property) {
		//console.log("* HyperStyleDelegate typeOfProperty:",property);
		if (this.delegate && isFunction(this.delegate.typeOfProperty)) {
			const result = this.delegate.typeOfProperty.call(this.delegate,property); // Not very useful.
			//console.log("* HyperStyleDelegate typeOfProperty delegate's result:",JSON.stringify(Object.keys(result)));
			return result;
		}
		const result = typeOfProperty(property);
		//console.log("* HyperStyleDelegate typeOfProperty result:",JSON.stringify(Object.keys(result)));
		return result;
	}
	//convertedKey(prettyKey,delegate.keyOutput,delegate)
	// export function convertedKey(property,funky,self) { // DELEGATE_DOUBLE_WHAMMY
	// 	if (isFunction(funky)) return funky.call(self,property);
	// 	return property;
	// }

	// prefixing does not belong in hyperstyle at all.

	keyOutput(property) {
		if (this.delegate && isFunction(this.delegate.keyInput)) return this.delegate.keyOutput.call(this.delegate,property);
		return property;
	}
	keyInput(property) {
		if (this.delegate && isFunction(this.delegate.keyOutput)) return this.delegate.keyInput.call(this.delegate,property);
		return property;
	}

	input(property, value) { // This did not fix the bug // this is redundant and shouldn't be necessary. Type should handle it directly, I'm probably not registering type correctly.
		const type = this.typeOfProperty(property);
		if (type && isFunction(type.input)) return type.input(property,value);
		//console.log("????? hyperstyle input property:%s; value:%s; result:%s;",property, value, result);
		return value;
	}
	output(property, value) { // This did not fix the bug // this is redundant and shouldn't be necessary. Type should handle it directly, I'm probably not registering type correctly.
		const type = this.typeOfProperty(property);
		if (type && isFunction(type.output)) return type.output(property,value);
		//console.log("????? hyperstyle input property:%s; value:%s; result:%s;",property, value, result);
		return value;
	}
	display(presentation) {
		//const presentation = this.controller.presentation; // TODO: this should be provided
		const presentationKeys = Object.keys(presentation);
		//console.log("HyperStyleDelegate display:",presentation);
		presentationKeys.forEach( function(key, index) {
			const value = presentation[key];
			//const value = presentation[presentation[key]];
			this.original[key] = value; // HyperStyleDeclaration is meant to be mutated.
			//this.original[key] = index; // HyperStyleDeclaration is meant to be mutated.
			//this.original[index] = value;
		}.bind(this));

		// TEMPORARILY DISABLED !!! nullify properties... but it doesn't seem to be necessary for some reason.
		// const previousKeys = Object.keys(this.previousLayer);
		// previousKeys.forEach( function(key) { // Must nullify properties that are no longer animated, if not on presentation.
		// 	if (presentationKeys.indexOf(key) === -1) { // FIXME: Sort & walk keys? Not too bad if animating few properties.
		// 		this.original[key] = "";
		// 	}
		// }.bind(this));
		// this.previousLayer = presentation;
	}





}

// _updateIndices: function() {
//   while (this._length < this._surrogateElement.style.length) {
// 	Object.defineProperty(this, this._length, {
// 	  configurable: true,
// 	  enumerable: false,
// 	  get: (function(index) {
// 		return function() {
// 		  return this._surrogateElement.style[index];
// 		};
// 	  })(this._length)
// 	});
// 	this._length++;
//   }
//   while (this._length > this._surrogateElement.style.length) {
// 	this._length--;
// 	Object.defineProperty(this, this._length, {
// 	  configurable: true,
// 	  enumerable: false,
// 	  value: undefined
// 	});
//   }
// }
export function activateElement(element, controller, delegate, layer={}) { // compare to activate(controller, delegate, layerInstance)
	//if (typeof window === "undefined") return;
	if ((typeof delegate === "undefined" || delegate === null) && (typeof controller === "undefined" || controller === null)) {
		controller = element;
		delegate = element;
	}
	else if ( (typeof controller !== "undefined" && controller !== null) && (typeof delegate === "undefined" || delegate === null) && controller !== element) delegate = controller; // controller but no delegate
	else if ((typeof controller === "undefined" || controller === null) && (typeof delegate !== "undefined" || delegate !== null)) controller = element; // should really be the HyperStyleDeclaration, not the element itself, but delegate might be a function

	if (typeof delegate === "undefined" || delegate === null) throw new Error("where's the delegate?");
	if (typeof delegate === "undefined" || delegate === null) delegate = {};

	let original = (element ? element.style : null);
	const actualDelegate = delegate && isFunction(delegate) ? { animationForKey:delegate } : delegate;
	const hyperStyleDelegate = new HyperStyleDelegate(original,controller,actualDelegate);
	//const layer = {}; // no element yet so original style is not preserved
	//const descriptions = Object.keys(usedPropertyTypes).map( function(key) {
	//const descriptions = Object.keys(usedPropertyTypes).filter(isAllowablePrettyKey).reduce( function(accumulator, current) {
	const descriptions = Object.keys(usedPropertyTypes).reduce( function(accumulator, current) {
		accumulator[current] = usedPropertyTypes[current];
		return accumulator;
	}, {});
	// console.log("## ## ## ## ## hyperstyle activate styleDelegate:",hyperStyleDelegate);
	// console.log("## ## ## ## ## hyperstyle activate styleDelegate.animationForKey:",isFunction(hyperStyleDelegate.animationForKey));
	// console.log("## ## ## ## ## hyperstyle activate actualDelegate:",actualDelegate);
	// console.log("## ## ## ## ## hyperstyle activate actualDelegate.animationForKey:",isFunction(actualDelegate.animationForKey));

	//if (verbose) console.log("activateElement DESCRIPTIONS:",JSON.stringify(descriptions));
	activate(controller, hyperStyleDelegate, layer, descriptions); // controller can be undefined only if element is not

	// for (let property in usedPropertyTypes) {
	// 	controller.registerAnimatableProperty(property,{ type: usedPropertyTypes[property] });
	// }
	// for (let property in usedPropertyTypes) {
	// 	controller.registerAnimatableProperty(property, null);
	// }

	controller.setElement = function(what) {
		//if (verbose) console.log("##### hyperstyle core setElement:",what);

		if (hyperStyleDelegate.target) return; // you can only assign element once, either as argument or with this function
		hyperStyleDelegate.target = what;
		original = hyperStyleDelegate.target.style;
		hyperStyleDelegate.original = original;
		const temp = {};

		//beginTransaction();
		//currentTransaction().disableAnimation = true;
		//disableAnimation();

		// for (let property in usedPropertyTypes) {
		// 	controller.registerAnimatableProperty(property,{ type: usedPropertyTypes[property] });
		// }
		//if (verbose) console.log("### hyperstyle core setElement style keys:",Object.keys(original));
		//if (verbose) console.log("### hyperstyle core setElement style object:",JSON.stringify(original));

		Object.keys(original).forEach( key => { // these are not properties, they are indices of properties.
		//Object.getOwnPropertyNames(original).forEach( key => {
			const property = original[key];
			const actual = original[property];
			//const property = original[original[key]];
			//if (verbose) console.log("===>> STYLE key",key);
			//if (verbose) console.log("=====>> STYLE property",property);
			//if (verbose) console.log("========>> STYLE actual",actual);
			//temp[property] = actual;
			if (actual === "transform") throw new Error("setElement !!!!! "+JSON.stringify(Object.keys(original)));

			if (typeof property !== "undefined" && property !== null) {// && property.length !== 0) { // most properties on original style object should be an empty string
				//if (verbose) console.log("++========>> STYLE not number",Number.isNaN(parseFloat(property)));
				if (Number.isNaN(parseFloat(property))) { // 2018 experimental, no more property indices
					//if (verbose) console.log("++========>> STYLE set",property,actual);
					//temp[key] = property; // don't want to do this
					temp[property] = actual; // will be converted to ugly values by hyperact
					//temp[property] = original[original[property]]; // will be converted to ugly values by hyperact
					//layer[property] = original[property];
					//controller.registerAnimatableProperty(property,{ type: usedPropertyTypes[property] });
					//if (actual === "transform") throw new Error("setElement !!!!! "+JSON.stringify(Object.keys(original)));
				}
			}
		});
		//if (verbose) console.log("### hyperstyle core setElement set layer:",JSON.stringify(temp));
		for (let property in usedPropertyTypes) {
			controller.registerAnimatableProperty(property,{ type: usedPropertyTypes[property] });
		}
		controller.layer = temp;

		//if (verbose) console.log("### hyperstyle core setElement !!!");



		//if (verbose) console.log("activateElement SET ELEMENT:",JSON.stringify(temp));
		//console.log("THESE ARE THE ORIGINAL VALUES:",JSON.stringify(temp));
		//controller.layer = temp; // this should convert to ugly values behind the scenes but animationForKey is still passing ugly value as previous argument
		//console.log("THESE ARE ACCESSORS, NOT UGLY VALUES:",JSON.stringify(controller.layer));
		//if (verbose) console.log("activateElement THESE SHOULD BE PRETTY VALUES:",JSON.stringify(controller.model));




		//commitTransaction();

		try {
			const hyperStyleDeclaration = new HyperCSSStyleDeclaration(what, controller, layer);
			//console.log("***** Hyperstyle core defineProperty style");
			Object.defineProperty(hyperStyleDelegate.target, "style", {
				get: function() {
					//console.log("*** Hyperstyle core get style");
					return hyperStyleDeclaration;
				},
				configurable: true,
				enumerable: true
			});
		} catch (error) {
			//patchInlineStyleForAnimation(target.style);
			console.warn("not animatable by any craft known to Pyon");
		}
	};

	if (element) controller.setElement(element);
	if (element) return function() {};
	else return controller.setElement;
}
