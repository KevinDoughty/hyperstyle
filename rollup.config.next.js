import babel from "rollup-plugin-babel";
//import eslint from "rollup-plugin-eslint";
import resolve from "rollup-plugin-node-resolve"; // Allow hyperact to be merged into this library // https://github.com/rollup/rollup/wiki/Troubleshooting#treating-module-as-external-dependency


// This does not update in dev mode because webpack is set to watch, not this.

// function debug(options) {
// 	var plugin = {};
// 	plugin.name = "debug";
// 	plugin.transform = function(code) {
// 		if (options && options.debug) console.log("%s%s",options.debug,JSON.stringify(code));
// 		else console.log("DEBUG:%s;",JSON.stringify(code));
// 		if (options && options.sourceMap) console.log("sourceMap:%s;",options.sourceMap);
// 		if (options && options.inSourceMap) console.log("inSourceMap:%s;",options.inSourceMap);
// 		if (options && options.outSourceMap) console.log("outSourceMap:%s;",options.outSourceMap);
//
// 		return code;
// 	}
// 	return plugin;
// }

var plugins = [
	////eslint(), // redundant with pkg.scripts.test
	resolve({}),
	babel({
		exclude: ["node_modules/**", "source/web-animations-legacy", "source/web-animations-next", "source/hyper-animations.js", "source/hyperstyle.js"],
		babelrc: false,
		//plugins: ["../babel-plugin-hyper-shuffle.js"], // .babelrc is required for pkg.scripts.test, override here // https://github.com/rollup/rollup-plugin-babel/issues/14#issuecomment-157445431
		presets: ["es2015-rollup"] // .babelrc is required for pkg.scripts.test, override here // https://github.com/rollup/rollup-plugin-babel/issues/14#issuecomment-157445431
	})
	,resolve({}) // this should allow hyperact to be merged into this library // https://github.com/rollup/rollup/wiki/Troubleshooting#treating-module-as-external-dependency

	// resolve(),
	// babel-plugin-hyper-shuffle
	// resolve()
];



export default {
	input: "source/hyper-animations.js",
	plugins: plugins,
	output: {
		file: "hyper-animations.mjs",
		format: "es"
	}
};
