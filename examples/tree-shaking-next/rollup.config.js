// rollup index.js --output bundle.js
import babel from "rollup-plugin-babel";

export default {
	entry: "index.js",
	dest: "bundle.js",
	format: "es",
	sourceMap: "inline",
	plugins: [
		babel({
			exclude: "node_modules/**",
		}),
	],
};