// This file is a heavily modified derivative work of:
// https://github.com/web-animations/web-animations-js-legacy

import { interp, detectFeatures, isDefinedAndNotNull, typeWithKeywords } from "./shared.js";

var features;

// This regular expression is intentionally permissive, so that
// platform-prefixed versions of calc will still be accepted as
// input. While we are restrictive with the transform property
// name, we need to be able to read underlying calc values from
// computedStyle so can"t easily restrict the input here.
var outerCalcRE = /^\s*(-webkit-)?calc\s*\(\s*([^)]*)\)/;
var valueRE = /^\s*(-?[0-9]+(\.[0-9])?[0-9]*)([a-zA-Z%]*)/;
var operatorRE = /^\s*([+-])/;
var autoRE = /^\s*auto/i;

export const lengthType = {
	name: "lengthType",
	toString: function() {
		return this.name;
	},
	toJSON: function() {
		return this.toString();
	},
	zero: function() {
		return {px : 0};
	},
	add: function(base, delta) {
		if (delta === null || delta === undefined) {
			delta = {}; // bug fix / hack. transformType does this too. So should the rest. If element is removed from dom, CompositedPropertyMap can"t applyAnimatedValues when additive. Lack of a transform also has this problem
		}
		if (base === null || base === undefined) {
			base = {}; // bug fix / hack. transformType does this too. So should the rest. If element is removed from dom, CompositedPropertyMap can"t applyAnimatedValues when additive. Lack of a transform also has this problem
		}
		var out = {};
		for (let value in base) {
			out[value] = base[value] + (delta[value] || 0);
		}
		for (let value in delta) {
			if (value in base) {
				continue;
			}
			out[value] = delta[value];
		}
		if (out.px && out.px.length && out.px.substring && out.px.substring(out.px.length-3) === "NaN") {
			throw new Error("hyperstyle length NaN add base:"+JSON.stringify(base)+"; delta:"+JSON.stringify(delta)+";");
		}
		//console.log("hyperstyle length add base:"+JSON.stringify(base)+"; delta:"+JSON.stringify(delta)+"; result:"+JSON.stringify(out)+";");
		return out;
	},
	subtract: function(base,delta) {
		var inverse = this.inverse(delta);
		var result = this.add(base,inverse);
		if (result.px && result.px.substring && result.px.substring(result.px.length-3) === "NaN") {
			throw new Error("hyperstyle length NaN subtract base:"+JSON.stringify(base)+"; delta:"+JSON.stringify(delta)+";");
		}
		return result;
	},
	interpolate: function(from, to, f) {
		var out = {};
		for (let value in from) {
			out[value] = interp(from[value], to[value], f);
		}
		for (let value in to) {
			if (value in out) {
				continue;
			}
			out[value] = interp(0, to[value], f);
		}
		if (out.px && out.px.length && out.px.substring && out.px.substring(out.px.length-3) === "NaN") {
			throw new Error("hyperstyle length NaN interpolate from:"+JSON.stringify(from)+"; to:"+JSON.stringify(to)+"; progress:"+f+";");
		}
		//console.log("hyperstyle length interpolate from:"+JSON.stringify(from)+"; to:"+JSON.stringify(to)+"; progress:"+f+"; result:"+JSON.stringify(out)+";");
		return out;
	},
	output: function(property, value) {
		const result = this.toCssValue(value);
		return result;
	},
	toCssValue: function(value) {
		if (!features) features = detectFeatures(); // !!!
		var s = "";
		var singleValue = true;
		for (let item in value) {
			if (s === "") {
				s = value[item] + item;
			} else if (singleValue) {
				if (value[item] !== 0) { // CALC
					s = features.calcFunction + "(" + s + " + " + value[item] + item + ")";
					singleValue = false;
				}
			} else if (value[item] !== 0) {
				s = s.substring(0, s.length - 1) + " + " + value[item] + item + ")";
			}
		}
		if (s && s.length && s.substring && s.substring(s.length-3) === "NaN") {
			throw new Error("hyperstyle NaN toCssValue:"+JSON.stringify(value)+";");
		}
		return s;
	},
	input: function(property,value) {
		return this.fromCssValue(value);
	},
	fromCssValue: function(value) {
		var result = lengthType.consumeValueFromString(value);
		if (result.px && result.px.length && result.px.substring && result.px.substring(result.px.length-3) === "NaN") {
			throw new Error("hyperstyle NaN fromCssValue:"+JSON.stringify(value)+";");
		}
		if (result) {
			return result.value;
		}
		return undefined;
	},
	consumeValueFromString: function(value) {
		if (!isDefinedAndNotNull(value)) {
			return undefined;
		}
		if (!value.length) return this.zero();
		var autoMatch = autoRE.exec(value);
		if (autoMatch) {
			return {
				value: { auto: true },
				remaining: value.substring(autoMatch[0].length)
			};
		}
		var out = {};
		var calcMatch = outerCalcRE.exec(value);
		if (!calcMatch) {
			var singleValue = valueRE.exec(value);
			if (singleValue && (singleValue.length === 4)) {
				out[singleValue[3]] = Number(singleValue[1]);
				return {
					value: out,
					remaining: value.substring(singleValue[0].length)
				};
			}
			return undefined;
		}
		var remaining = value.substring(calcMatch[0].length);
		var calcInnards = calcMatch[2];
		var firstTime = true;
		while (true) {
			var reversed = false;
			if (firstTime) {
				firstTime = false;
			} else {
				var op = operatorRE.exec(calcInnards);
				if (!op) {
					return undefined;
				}
				if (op[1] === "-") {
					reversed = true;
				}
				calcInnards = calcInnards.substring(op[0].length);
			}
			value = valueRE.exec(calcInnards);
			if (!value) {
				return undefined;
			}
			var valueUnit = value[3];
			var valueNumber = Number(value[1]);
			if (!isDefinedAndNotNull(out[valueUnit])) {
				out[valueUnit] = 0;
			}
			if (reversed) {
				out[valueUnit] -= valueNumber;
			} else {
				out[valueUnit] += valueNumber;
			}
			calcInnards = calcInnards.substring(value[0].length);
			if (/\s*/.exec(calcInnards)[0].length === calcInnards.length) {
				return {
					value: out,
					remaining: remaining
				};
			}
		}
	},
	inverse: function(value) {
		var out = {};
		for (let unit in value) {
			out[unit] = -value[unit];
		}
		return out;
	}
};

export const lengthAutoType = typeWithKeywords(["auto"], lengthType);
