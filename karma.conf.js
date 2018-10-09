// In one terminal window,
// $ yarn run dev
// webpack must --watch in package.json scripts.dev
// (note that webpack --watch will not rebuild the rollup es build, so running dev won't work for examples which use the .mjs file)
// In a second terminal window,
// $ yarn run test
// This way editing files will result in tests running in the browser.
// http://localhost:9876



var webpackConfig = require("./webpack.config.js");
webpackConfig.entry = {};


module.exports = function(config) {

	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: "",

		// frameworks to use // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ["mocha", "chai-sinon"],

		// list of files / patterns to load in the browser // must be transpiled
		files: [
			{pattern: "dist/hyperstyle.js", included: true, served: true},
			{pattern: "test/*.js", included: true, served: true}
		],

		preprocessors: {
			// a bit confusing that hyperact testing does the transpilation, but I don't here.
			"test/*.js": ["babel"]
		},

		babelPreprocessor: { // there is no .babelrc ?
			options: {
				"presets": [
					[ "env", { "modules" : false } ]
				],
				"plugins": ["transform-es2015-modules-umd"]
			}
		},

		webpack: webpackConfig,

		// test results reporter to use // possible values: "dots", "progress" // available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ["mocha"],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// start these browsers // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: [],

		// Continuous Integration mode // if true, Karma captures browsers, runs the tests and exits
		singleRun: true,//false,

		// Concurrency level // how many browser should be started simultaneous
		concurrency: Infinity
	})
}
