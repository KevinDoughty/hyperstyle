

function isString(w) {
	return w && (typeof w === "string" || w instanceof String);
}
function isObject(w) {
	return w && typeof w === "object";
}
function isArray(w) {
	return Array.isArray(w); // close enough
}

// TODO: add test: all styles should animate regardless if registered or not. See copying example.

Hyperstyle.registerAnimatableStyles({ // an inconvenience that will eventually allow tree shaking unused css animation types
	transform: Hyperstyle.transformType,
	left: Hyperstyle.lengthType,
});

describe("CORE", function() {
	const verbose = false;
	const duration = 0.25;
	describe("1 Configuration", function() {
		it("1 testing", function() {
			if (verbose) console.log("TEST 1 1");
			assert(true);
		});
		it("2 hyperstyle exists", function() {
			if (verbose) console.log("TEST 1 2");
			assert(typeof Hyperstyle !== "undefined" && Hyperstyle !== null);
		});
		it("3 hyperstyle has functions and is not an empty object", function() { // webpack conf had a multi-main entry for some reason that broke the UMD build.
			if (verbose) console.log("TES 1 3");
			assert(Object.keys(Hyperstyle).length > 0);
		});
	});


	describe("2 DOM", function() {
		before(function() {
			Hyperstyle.registerAnimatableStyles({ // an inconvenience that will eventually allow tree shaking unused css animation types
				transform: Hyperstyle.transformType,
				left: Hyperstyle.lengthType,
			});
		});

		it("1 append", function() {
			if (verbose) console.log("TEST 2 1");
			var element = document.createElement("div");
			element.id = "element21";
			document.body.appendChild(element);
			assert(element !== null && typeof element !== "undefined");
			var element = document.getElementById("element21");
			element.parentNode.removeChild(element);
		});

		it("2 remove", function() {
			if (verbose) console.log("TEST 2 2");
			var element = document.createElement("div");
			element.id = "element22";
			document.body.appendChild(element);
			var elements = document.querySelectorAll("div");
			assert.equal(elements.length,1);
			var element = document.getElementById("element22");
			element.parentNode.removeChild(element);
		});

	});



});
