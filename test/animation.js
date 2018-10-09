

const duration = 0.25;

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

describe("ANIMATION", function() {
	const verbose = false;
	const duration = 0.25;
	describe("6 Animation", function() {
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
		it("1a animationForKey is called", function(done) {
			if (verbose) console.log("TEST 6 1a");
			Hyperstyle.activateElement(element, null, function(property) {
				done();
			});
			element.style.left = "61px";
		});
		it("1b animationForKey is called, manually registered", function(done) {
			if (verbose) console.log("TEST 6 1b");
			Hyperstyle.activateElement(element, null, function(property) {
				done();
			});
			element.registerAnimatableProperty("left",Hyperstyle.lengthType);
			element.style.left = "61px";
		});
		it("1c animationForKey is called, manually registered, with a controller", function(done) {
			if (verbose) console.log("TEST 6 1c");
			var controller = {};
			Hyperstyle.activateElement(element, controller, function(property) {
				done();
			});
			controller.registerAnimatableProperty("left", Hyperstyle.lengthType);
			element.style.left = "61px";
		});
		it("1d animationForKey is called with a controller", function(done) {
			if (verbose) console.log("TEST 6 1d");
			document.body.appendChild(element);
			const controller = {
				animationForKey: function(property) {
					done();
				}
			};
			Hyperstyle.activateElement(element, controller, controller);
			element.style.left = "61px";
		});
		it("1e animationForKey is called with a controller", function(done) {
			if (verbose) console.log("TEST 6 1e");
			const controller = {
				animationForKey: function(property) {
					return {
						from:"661px",
						to:"661px",
						blend:"absolute",
						duration:duration
					}
				}
			};
			Hyperstyle.activateElement(element, controller, controller);
			element.style.left = "61px";
			const result = (61 + 661)+"px";
			controller.addAnimation({
				duration:duration/2,
				onend: function() {
					const error = controller.presentation.left === result ? null : new Error("presentation value is wrong:"+controller.presentation.left+"; should be:"+result+";");
					done(error);
				}
			});
		});

		it("2a register first, activate before, set after, style", function() {
			if (verbose) console.log("TEST 6 2a");
			Hyperstyle.activateElement(element);
			element.style.left = "62px";
			Hyperstyle.flushTransaction();
			assert.equal(element.style.left, "62px");
		});
		it("2b register first, activate before, set after, presentation", function() {
			if (verbose) console.log("TEST 6 2b");
			Hyperstyle.activateElement(element);
			element.style.left = "62px";
			Hyperstyle.flushTransaction();
			assert.equal(element.presentation.left, "62px");
		});

		it("3a register first, set before, activate after, style", function() {
			if (verbose) console.log("TEST 6 3a");
			document.body.appendChild(element);
			element.style.left = "63px";
			Hyperstyle.activateElement(element);
			Hyperstyle.flushTransaction();
			assert.equal(element.style.left, "63px");
		});
		it("3b register first, set before, activate after, presentation", function() {
			if (verbose) console.log("TEST 6 3b");
			document.body.appendChild(element);
			element.style.left = "63px";
			Hyperstyle.activateElement(element);
			Hyperstyle.flushTransaction();
			assert.equal(element.presentation.left, "63px");
		});

		it("4a animationForKey applied", function() {
			if (verbose) console.log("TEST 6 4a");
			Hyperstyle.activateElement(element, null, function(property) {
				return {
					property:"left",
					type: Hyperstyle.lengthType,
					from:"641px",
					to:"641px",
					blend:"absolute",
					duration:1.0
				}
			});
			element.style.left = "64px";
			Hyperstyle.flushTransaction();
			assert.equal(element.presentation.left, (64 + 641)+"px");
		});
		it("4b animationForKey applied with controller", function() {
			if (verbose) console.log("TEST 6 4b");
			const controller = {
				animationForKey: function(property) {
					return {
						property:"left",
						type: Hyperstyle.lengthType,
						from:"641px",
						to:"641px",
						blend:"absolute",
						duration:1.0
					}
				}
			}
			Hyperstyle.activateElement(element, controller, controller);
			element.style.left = "64px";
			Hyperstyle.flushTransaction();
			assert.equal(controller.presentation.left, (64 + 641)+"px");
		});

		it("5 explicit", function() {
			if (verbose) console.log("TEST 6 5");
			Hyperstyle.activateElement(element);
			element.style.left = "65px";
			element.addAnimation({
				property:"left",
				type: Hyperstyle.lengthType,
				from:"651px",
				to:"651px",
				blend:"absolute",
				duration:1.0
			});
			Hyperstyle.flushTransaction();
			assert.equal(element.presentation.left, (65 + 651)+"px");
		});
		it("6 explicit with controller", function() {
			if (verbose) console.log("TEST 6 6");
			const controller = {};
			Hyperstyle.activateElement(element,controller,controller);
			element.style.left = "66px";
			controller.addAnimation({
				property:"left",
				type: Hyperstyle.lengthType,
				from:"661px",
				to:"661px",
				blend:"absolute",
				duration:1.0
			});
			Hyperstyle.flushTransaction();
			assert.equal(controller.presentation.left, (66 + 661)+"px");
		});
		it("7 explicit with controller", function() {
			if (verbose) console.log("TEST 6 7");
			const controller = {};
			Hyperstyle.activateElement(element,controller,controller);
			element.style.left = "66px";
			controller.addAnimation({
				property:"left",
				type: Hyperstyle.lengthType,
				from:"661px",
				to:"661px",
				blend:"absolute",
				duration:1.0
			});
			Hyperstyle.flushTransaction();
			assert.equal(controller.presentation.left, (66 + 661)+"px");
		});

		it("10 explicit and animationForKey", function() {
			if (verbose) console.log("TEST 6 10");
			Hyperstyle.activateElement(element, null, function(property) {
				return {
					property:"left",
					type: Hyperstyle.lengthType,
					from:"661px",
					to:"661px",
					blend:"absolute",
					duration:1.0
				}
			});
			element.style.left = "67px";
			element.addAnimation({
				property:"left",
				type: Hyperstyle.lengthType,
				from:"662px",
				to:"662px",
				blend:"absolute",
				duration:1.0
			});
			Hyperstyle.flushTransaction();
			assert.equal(element.presentation.left,(67 + 671 + 672)+"px");
		});
	});
});
