const webpack = require("webpack");
var path = require("path");

module.exports = [{
	entry: "./source/hyperstyle.js",
	output: {
		filename: "hyperstyle.js",
		library: "Hyperstyle",
		libraryTarget: "umd"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				options: { presets: [["env", { modules: false }]] }
			}
		]
	}
}];


/*
var location = path.join(__dirname, "src");

var files = [
	"hyper-animations", //"property-interpolation",

	"handler-utils",
	"matrix-interpolation",
	"matrix-decomposition",

	"box-handler",
	"color-handler",
	"dimension-handler",
	"font-weight-handler",
	"number-handler",
	"position-handler",
	"shadow-handler",
	"shape-handler",
	"transform-handler",
	"visibility-handler"
]
var entry = files.map( function(file) {
	return path.join(location,file);
});

module.exports = {
	entry: entry,
	output: {
		filename: "hyper-animations.js",
		library: "hyper-animations",
		libraryTarget: "umd"
	},
	resolve: {
		root: path.resolve('./src'),
		extensions: [".js"]
	},
	plugins: [
		new webpack.ProvidePlugin({
			webAnimationsShared: "webAnimationsShared",
			webAnimations1: "webAnimations1",
			webAnimationsNext: "webAnimationsNext",
			webAnimationsTesting: "webAnimationsTesting",
			"WEB_ANIMATIONS_TESTING": "WEB_ANIMATIONS_TESTING"
		})
	]
}
*/
