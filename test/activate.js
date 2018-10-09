

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

describe("ACTIVATE", function() {
	const verbose = false;
	const duration = 0.25;
	describe("4 Activate", function() {
		let element;
		before(function() {
			Hyperstyle.registerAnimatableStyles({ // an inconvenience that will eventually allow tree shaking unused css animation types
				transform: Hyperstyle.transformType,
				left: Hyperstyle.lengthType,
			});
		});
		beforeEach(function() {
			element = document.createElement("div");
			document.body.appendChild(element);
		});
		afterEach(function() {
			element.parentNode.removeChild(element);
		});

		it("1 activate does something", function() {
			if (verbose) console.log("TEST 4 1");

			var oldStyle = element.style;
			Hyperstyle.activateElement(element);
			assert.notEqual(element.style,oldStyle);
		});

		it("2a activate before, set after, style", function() { // calc ?! activate before, set after
			if (verbose) console.log("TEST 4 2a");
			Hyperstyle.activateElement(element);
			element.style.left = "42px";
			Hyperstyle.flushTransaction();
			assert.equal(element.style.left,"42px");
		});
		it("2b activate before, set after, presentation", function() { // calc ?! activate before, set after
			if (verbose) console.log("TEST 4 2b");
			Hyperstyle.activateElement(element);
			element.style.left = "42px";
			Hyperstyle.flushTransaction();
			assert.equal(element.presentation.left,"42px");
		});

		it("3a set before, activate after, style", function() {
			if (verbose) console.log("TEST 4 3a");
			element.style.left = "43px";
			Hyperstyle.activateElement(element);
			Hyperstyle.flushTransaction();
			assert.equal(element.style.left,"43px");
		});
		it("3b set before, activate after, presentation", function() {
			if (verbose) console.log("TEST 4 3b");
			element.style.left = "43px";
			Hyperstyle.activateElement(element);
			Hyperstyle.flushTransaction();
			assert.equal(element.presentation.left,"43px");
		});

		it("4 complicated setElement before, style", function() {
			const controller = {};
			const delegate = {
				animationForKey: function() {

				}
			}
			const setElement = Hyperstyle.activateElement(null,controller,delegate);
			setElement(element);
			if (verbose) console.log("TEST 4 4");
			element.style.left = "44px";
			Hyperstyle.flushTransaction();
			if (verbose) console.log("4.4. failure:",element.style.left); // "0px"
			assert.equal(element.style.left, "44px");
		});

		it("5a complicated setElement after, style", function() {
			const controller = {};
			const delegate = {
				animationForKey: function() {

				}
			}
			const setElement = Hyperstyle.activateElement(null,controller,delegate);
			setElement(element);
			if (verbose) console.log("TEST 4 5a");
			element.style.left = "45px";
			Hyperstyle.flushTransaction();
			assert.equal(element.style.left, "45px");
		});
		it("5b complicated setElement after, presentation", function() {
			const controller = {};
			const delegate = {
				animationForKey: function() {

				}
			}
			const setElement = Hyperstyle.activateElement(null,controller,delegate);
			setElement(element);
			if (verbose) console.log("TEST 4 5b");
			element.style.left = "45px";
			Hyperstyle.flushTransaction();
			assert.equal(controller.presentation.left, "45px");
		});


	});

	describe("4a Activate again", function() {
		let element;
		before(function() {
			Hyperstyle.registerAnimatableStyles({ // an inconvenience that will eventually allow tree shaking unused css animation types
				transform: Hyperstyle.transformType,
				left: Hyperstyle.lengthType,
			});
		});
		beforeEach(function() {
			element = document.createElement("div");
			document.body.appendChild(element);
		});
		afterEach(function() {
			element.parentNode.removeChild(element);
		});

		it("1 activate does something with pre-set style", function() {
			if (verbose) console.log("TEST 4a 1");
			element.style.opacity = 1;
			element.style.zoom = 1;
			element.style.position = "relative";
			element.style.width = "41px";
			var oldStyle = element.style;
			Hyperstyle.activateElement(element);
			assert.notEqual(element.style,oldStyle);
		});

		it("2 activate does something with manual setElement", function() {
			if (verbose) console.log("TEST 4a 2");
			element.style.opacity = 1;
			element.style.zoom = 1;
			element.style.position = "relative";
			element.style.width = "42px";
			var oldStyle = element.style;
			var setElement = Hyperstyle.activateElement(element);
			setElement(element);
			Hyperstyle.flushTransaction();
			assert.notEqual(element.style,oldStyle);
		});


		// it("2 activate before, set after", function() { // calc ?! activate before, set after
		// 	if (verbose) console.log("TEST 4 2");
		// 	var element = document.createElement("div");
		// 	element.id = "element42";
		// 	document.body.appendChild(element);
		//
		// 	Hyperstyle.activateElement(element);
		// 	element.style.left = "42px";
		// 	HyperStyle.flushTransaction();
		// 	assert(element.style.left === "42px");
		//
		// 	var element = document.getElementById("element42");
		// 	element.parentNode.removeChild(element);
		// });
		//
		// it("3 set before, activate after", function() {
		// 	var element = document.createElement("div");
		// 	element.id = "element43";
		// 	document.body.appendChild(element);
		//
		// 	if (verbose) console.log("TEST 4 3");
		// 	element.style.left = "43px";
		// 	Hyperstyle.activateElement(element);
		// 	Hyperstyle.flushTransaction();
		// 	if (verbose) console.log("4.3. failure:",element.style.left); // "0px"
		// 	assert(element.style.left === "43px");
		//
		// 	var element = document.getElementById("element43");
		// 	element.parentNode.removeChild(element);
		// });
		//
		// it("4 complicated setElement before", function() {
		// 	const controller = {};
		// 	const delegate = {
		// 		animationForKey: function() {
		//
		// 		},
		// 		display: function() {
		//
		// 		}
		// 	}
		// 	const setElement = Hyperstyle.activateElement(null,controller,delegate);
		// 	var element = document.createElement("div");
		// 	element.id = "element43";
		// 	document.body.appendChild(element);
		//
		// 	setElement(element);
		// 	if (verbose) console.log("TEST 4 4");
		// 	element.style.left = "44px";
		// 	Hyperstyle.activateElement(element);
		// 	Hyperstyle.flushTransaction();
		// 	if (verbose) console.log("4.3. failure:",element.style.left); // "0px"
		// 	assert(element.style.left === "44px");
		//
		// 	var element = document.getElementById("element44");
		// 	element.parentNode.removeChild(element);
		// });
		//
		// it("4 complicated setElement after", function() {
		// 	const controller = {};
		// 	const delegate = {
		// 		animationForKey: function() {
		//
		// 		},
		// 		display: function() {
		//
		// 		}
		// 	}
		// 	const setElement = Hyperstyle.activateElement(null,controller,delegate);
		// 	var element = document.createElement("div");
		// 	element.id = "element43";
		// 	document.body.appendChild(element);
		//
		// 	setElement(element);
		// 	if (verbose) console.log("TEST 4 4");
		// 	element.style.left = "44px";
		// 	Hyperstyle.activateElement(element,controller,delegate);
		// 	Hyperstyle.flushTransaction();
		// 	if (verbose) console.log("4.3. failure:",element.style.left); // "0px"
		// 	assert(element.style.left === "44px");
		//
		// 	var element = document.getElementById("element44");
		// 	element.parentNode.removeChild(element);
		// });


	});
});
