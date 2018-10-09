import { isDefined } from "./shared.js";

export const nonNumericType = {
	name:"nonNumericType",
	toString: function() {
		return this.name;
	},
	toJSON: function() {
		return this.toString();
	},
	zero: function() {
		return "";
	},
	inverse: function(value) {
		return value;
	},
	add: function(base, delta) {
		return base; // required for the default unregistered type, perhaps should be different from non-numeric, call it undefinedType
		//return isDefined(delta) ? delta : base;
	},
	subtract: function(base,delta) { // same as add? or return base?
		return base; // Sure why not // Maybe this is why default unregistered type needs to return base in the implementation of function add
		//return this.add(base,this.inverse(delta));
	},
	interpolate: function(from, to, f) {
		return f < 0.5 ? from : to;
	},
	output: function(property,value) {
		return value;
	},
	input: function(property,value) {
		return value;
	}
};
