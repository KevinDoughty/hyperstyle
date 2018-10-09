import babel from "rollup-plugin-babel";
import { eslint } from "rollup-plugin-eslint";
import resolve from "rollup-plugin-node-resolve"; // this should allow hyperact to be merged into this library // https://github.com/rollup/rollup/wiki/Troubleshooting#treating-module-as-external-dependency

// This does not update in dev mode because webpack is set to watch, not this.

function debug(options) {
	var plugin = {};
	plugin.name = "debug";
	plugin.transform = function(code) {
		if (options && options.debug) console.log("%s%s",options.debug,JSON.stringify(code));
		else console.log("DEBUG:%s;",JSON.stringify(code));
		if (options && options.sourceMap) console.log("sourceMap:%s;",options.sourceMap);
		if (options && options.inSourceMap) console.log("inSourceMap:%s;",options.inSourceMap);
		if (options && options.outSourceMap) console.log("outSourceMap:%s;",options.outSourceMap);

		return code;
	}
	return plugin;
}


export default {
	input: "source/hyperstyle.js",
// 	external: [
// //		"hyperact" // hyperact would have to be added to projects as a dependency this way
// 	],
	plugins: [
		eslint(), // redundant with pkg.scripts.test
		resolve(),
		babel({
			exclude: "node_modules/**",
			babelrc: false,
			presets: [["env", { "modules": false }]],
			plugins: ["external-helpers"] // as per https://github.com/rollup/rollup-plugin-babel
		})//,
		//debug({debug:"DEBUG:"})
	],
	output: {
		file: "module/hyperstyle.js",
		format: "es"
	}
};
