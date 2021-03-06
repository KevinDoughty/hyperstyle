// This file is a heavily modified derivative work of:
// https://github.com/web-animations/web-animations-js-legacy

import { interp, clamp } from "./shared.js";

export const fontWeightType = {
	name:"fontWeightType",
	toString: function() {
		return this.name;
	},
	toJSON: function() {
		return this.toString();
	},
	inverse: function(value) { // KxDx
		return value * -1;
	},
	add: function(base, delta) { return base + delta; },
	subtract: function(base,delta) { // KxDx
		return this.add(base,this.inverse(delta));
	},
	interpolate: function(from, to, f) {
		return interp(from, to, f);
	},
	output: function(property,value) {
		return this.toCssValue(value);
	},
	toCssValue: function(value) {
		value = Math.round(value / 100) * 100;
		value = clamp(value, 100, 900);
		if (value === 400) {
			return "normal";
		}
		if (value === 700) {
			return "bold";
		}
		return String(value);
	},
	input: function(property,value) {
		return this.fromCssValue(value);
	},
	fromCssValue: function(value) {
		// TODO: support lighter / darker ?
		var out = Number(value);
		if (isNaN(out) || out < 100 || out > 900 || out % 100 !== 0) {
			return undefined;
		}
		return out;
	}
};
