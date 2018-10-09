



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

describe("DELEGATE", function() {

	const ENABLE_DELEGATE_INPUT_OUTPUT = false;
	const verbose = false;
	const duration = 0.25;

	describe("5 Delegate again", function() {

		before(function() {
			Hyperstyle.registerAnimatableStyles({ // an inconvenience that will eventually allow tree shaking unused css animation types
				left: Hyperstyle.lengthType
			});
		});
		beforeEach( function() {
			var element = document.createElement("div");
			element.id = "element";
			document.body.appendChild(element);
		});
		afterEach( function() {
			var element = document.getElementById("element");
			element.parentNode.removeChild(element);
		});
		it("1a animationForKey is called, from delegate", function(done) { // calc ?! activate before, set after
			if (verbose) console.log("TEST 5 1a");
			const delegate = {
				animationForKey: function(property) {
					done();
				}
			};
			Hyperstyle.activateElement(element, null, delegate);
			element.style.left = "511px";
		});
		it("1b animationForKey is called, function alone", function(done) { // calc ?! activate before, set after
			if (verbose) console.log("TEST 5 1b");
			Hyperstyle.activateElement(element, null, function(property) {
				done();
			});
			element.style.left = "512px";
		});
		it("1c animationForKey is called, for unregistered styles (or maybe reconsider)", function(done) { // calc ?! activate before, set after
			if (verbose) console.log("TEST 5 1c");
			// Hyperact does not animate for unregistered properties.
			// Do you want to animate for all style changes?
			// This test says yes all styles should trigger animation for key.
			// but maybe it should not be so.
			Hyperstyle.activateElement(element, null, function(property) {
				done();
			});
			element.style.left = "513px";
		});
		it("1d animationForKey is called, from delegate, manually registered", function(done) { // calc ?! activate before, set after
			if (verbose) console.log("TEST 5 1d");
			const delegate = {
				animationForKey: function(property) {
					done();
				}
			};
			Hyperstyle.activateElement(element, null, delegate);
			element.registerAnimatableProperty("left",Hyperstyle.lengthType);
			element.style.left = "514px";
		});
		it("1e animationForKey is called, from delegate, manually registered, and a controller", function(done) { // calc ?! activate before, set after
			if (verbose) console.log("TEST 5 1e");
			const delegate = {
				animationForKey: function(property) {
					done();
				}
			};
			const controller = {};
			Hyperstyle.activateElement(element, controller, delegate);
			controller.registerAnimatableProperty("left",Hyperstyle.lengthType);
			element.style.left = "515px";
		});
		it("2 activate before, set after", function() { // calc ?! activate before, set after
			if (verbose) console.log("TEST 5 2");
			Hyperstyle.activateElement(element);
			element.style.left = "52px";
			assert.equal(element.style.left,"52px");
		});

		it("3 set before, activate after", function() {
			if (verbose) console.log("TEST 5 3");
			element.style.left = "53px";
			Hyperstyle.activateElement(element);
			assert.equal(element.style.left,"53px");
		});

		it("4a animationForKey not applied before flush", function() {
			if (verbose) console.log("TEST 5 4a");
			Hyperstyle.activateElement(element, null, function(property,value,previous) {
				return {
					property:"left",
					type: Hyperstyle.lengthType,
					from:"541px",
					to:"541px",
					blend:"absolute",
					duration:1.0
				}
			});
			element.style.left = "542px";
			assert.equal(element.presentation.left,"542px");
		});
		it("4b animationForKey applied after flush", function() {
			if (verbose) console.log("TEST 5 4b");
			Hyperstyle.activateElement(element, null, function(property,value,previous) {
				return {
					property:"left",
					type: Hyperstyle.lengthType,
					from:"541px",
					to:"541px",
					blend:"absolute",
					duration:1.0
				}
			});
			element.style.left = "542px";
			Hyperstyle.flushTransaction();
			assert.equal(element.presentation.left,(541+542)+"px");
		});
		it("4c animationForKey not applied before flush, with controller", function() {
			if (verbose) console.log("TEST 5 4c");
			var controller = {
				animationForKey:function(property,value,previous) {
					return {
						property:"left",
						type: Hyperstyle.lengthType,
						from:"541px",
						to:"541px",
						blend:"absolute",
						duration:1.0
					}
				}
			}
			Hyperstyle.activateElement(element, controller, controller);
			element.style.left = "542px";
			assert.equal(controller.presentation.left,"542px");
		});
		it("4d animationForKey applied after flush, with controller", function() {
			if (verbose) console.log("TEST 5 4d");
			var controller = {
				animationForKey:function(property,value,previous) {
					return {
						property:"left",
						type: Hyperstyle.lengthType,
						from:"541px",
						to:"541px",
						blend:"absolute",
						duration:1.0
					}
				}
			}
			Hyperstyle.activateElement(element, controller, controller);
			element.style.left = "542px";
			Hyperstyle.flushTransaction();
			assert.equal(controller.presentation.left,(541+542)+"px");
		});

		it("4e animationForKey applied after flush, with controller", function(done) {
			if (verbose) console.log("TEST 5 4e");
			var controller = {
				animationForKey:function(property,value,previous) {
					return {
						property:"left",
						type: Hyperstyle.lengthType,
						from:"541px",
						to:"541px",
						blend:"absolute",
						duration:1.0
					}
				}
			}
			Hyperstyle.activateElement(element, controller, controller);
			element.style.left = "542px";
			Hyperstyle.flushTransaction();
			var correct = (541 + 542)+"px";
			controller.addAnimation({
				duration:duration/2,
				onend: function() {
					var error = controller.presentation.left === correct ? null : new Error("presentation value is wrong:"+controller.presentation.left+"; should be:"+correct+";");
					done(error);
				}
			})
		});

		it("5 animationForKey property is correct", function(done) { // calc ?! activate before, set after
			if (verbose) console.log("TEST 5 5");
			Hyperstyle.activateElement(element, null, { animationForKey: function(property,value,previous) {
				const error = (property === "left") ? null : new Error("property is not correct");
				done(error);
			} });
			element.style.left = "55px";
		});
		it("6 animationForKey value is correct", function(done) {
			if (verbose) console.log("TEST 5 6");
			Hyperstyle.activateElement(element, null, { animationForKey:function(property,value,previous) {
				const error = (value === "56px") ? null : new Error("value is not correct");
				done(error);
			} });
			element.style.left = "56px";
		});
		it("7 animationForKey previous is correct", function(done) {
			if (verbose) console.log("TEST 5 7");
			element.style.left = "57px";
			Hyperstyle.activateElement(element, null, { animationForKey: function(property,value,previous) {
				const error = (previous === "57px") ? null : new Error("previous is not correct");
				done(error);
			} });
			element.style.left = "579px";
		});
		it("8 animationForKey property is correct, function only", function(done) { // calc ?! activate before, set after
			if (verbose) console.log("TEST 5 5");
			Hyperstyle.activateElement(element, null, function(property,value,previous) {
				const error = (property === "left") ? null : new Error("property is not correct");
				done(error);
			});
			element.style.left = "55px";
		});
		it("9 animationForKey value is correct, function only", function(done) {
			if (verbose) console.log("TEST 5 6");
			Hyperstyle.activateElement(element, null, function(property,value,previous) {
				const error = (value === "56px") ? null : new Error("value is not correct");
				done(error);
			});
			element.style.left = "56px";
		});
		it("10 animationForKey previous is correct, function only", function(done) {
			if (verbose) console.log("TEST 5 7");
			element.style.left = "57px";
			Hyperstyle.activateElement(element, null, function(property,value,previous) {
				const error = (previous === "57px") ? null : new Error("previous is not correct");
				done(error);
			});
			element.style.left = "579px";
		});
	});





});
