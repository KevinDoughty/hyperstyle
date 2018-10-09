
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

describe("TRANSFORM", function() {
	const verbose = false;
	const duration = 0.25;
	describe("1 Implicit", function() {
		it("0a animationForKey not called here because it's not activated", function() {
			const element = document.createElement("div");
			document.body.appendChild(element);
			let count = 0;
			const controller = {
				animationForKey: function(key,value) {
					count++;
					return duration;
				}
			};
			element.style.transform = "translate3d(1px, 1px, 1px)";
			Hyperstyle.flushTransaction();
			const expected = 0;
			assert.equal(count,expected);
			element.parentNode.removeChild(element);

		});
		it("0b animationForKey not called here because nothing is set after activating", function() {
			const element = document.createElement("div");
			document.body.appendChild(element);
			let count = 0;
			const controller = {
				animationForKey: function(key,value) {
					count++;
					return duration;
				}
			};
			element.style.transform = "translate3d(1px, 1px, 1px)";
			Hyperstyle.activateElement(element,controller,controller);
			Hyperstyle.flushTransaction();
			const expected = 0;
			assert.equal(count,expected); // expected 1 to equal 0
			element.parentNode.removeChild(element);

		});
		it("0c animationForKey called once", function() {
			const element = document.createElement("div");
			document.body.appendChild(element);
			let count = 0;
			const controller = {
				animationForKey: function(key,value) {
					count++;
					return duration;
				}
			}
			element.style.transform = "translate3d(1px, 1px, 1px)";
			Hyperstyle.activateElement(element,controller,controller); // animationForKey is being called on activate
			element.style.transform = "translate3d(1px, 2px, 3px)";
			Hyperstyle.flushTransaction();
			const expected = 1;
			assert.equal(count,expected); // expected 2 to equal 1
			element.parentNode.removeChild(element);

		});
		it("1a uninitialized", function() {
			const element = document.createElement("div");
			document.body.appendChild(element);
			if (verbose) console.log("TEST 7 1");
			var controller = {
				animationForKey: function() {
					return duration;
				}
			}
			Hyperstyle.activateElement(element,controller,controller);
			element.style.transform = "translate3d(1px, 2px, 3px)";
			Hyperstyle.flushTransaction();
			const model = controller.model.transform;
			let expected = "translate3d(1px, 2px, 3px)";
			if (model.indexOf(" ") === -1) expected = "translate3d(1px,2px,3px)"; // depends on formatting, expect model and presentation formatting to be equal
			const actual = controller.presentation.transform;
			assert.equal(expected,actual);
			element.parentNode.removeChild(element);
			// expected 'translate3d(1px, 2px, 3px)' to equal 'translate3d(0px, 0px, 0px)'

		});
		it("1b initialized first", function() {
			const element = document.createElement("div");
			document.body.appendChild(element);
			const controller = {
				animationForKey: function() {
					return duration;
				}
			}
			element.style.transform = "translate3d(1px, 1px, 1px)";
			Hyperstyle.activateElement(element,controller,controller);
			element.style.transform = "translate3d(1px, 2px, 3px)";
			Hyperstyle.flushTransaction();
			const model = controller.model.transform;
			let result = "translate3d(2px, 3px, 4px)";
			if (model.indexOf(" ") === -1) result = "translate3d(2px,3px,4px)"; // depends on formatting, expect model and presentation formatting to be equal
			assert.equal(controller.presentation.transform,result);
			element.parentNode.removeChild(element);
			// expected 'translate3d(0px, 0px, 0px)' to equal 'translate3d(2px, 3px, 4px)'

		});
		it("2 second animation, using presentation, initialized", function(done) {
			const element = document.createElement("div");
			document.body.appendChild(element);
			const controller = {
				animationForKey: function(key, value, previous, presentation) {
					return {
						duration: duration,
						from: value,
						to: value,
						blend:"absolute"
					};
				}
			};
			element.style.transform = "translate3d(1px, 1px, 1px)";
			Hyperstyle.activateElement(element,controller,controller);
			element.style.transform = "translate3d(1px, 2px, 3px)";
			controller.addAnimation({
				duration: duration/2,
				onend: function() {
					const model = controller.model.transform;
					const actual = controller.presentation.transform;
					let expected = "translate3d(2px, 4px, 6px)";
					if (model.indexOf(" ") === -1) expected = "translate3d(2px,4px,6px)"; // depends on formatting, expect model and presentation formatting to be equal
					const error = actual === expected ? null : new Error("presentation value is wrong:"+actual+"; should be:"+expected+";");
					element.parentNode.removeChild(element);
					done(error);
				}
			});
			// presentation value is wrong:translate3d(3px, 5px, 7px); should be:translate3d(2px, 4px, 6px);

		});

	});

	describe("2 Explicit", function() {

		it("1 second animation, presentation, initialized", function(done) {
			const element = document.createElement("div");
			document.body.appendChild(element);
			const controller = {};
			element.style.transform = "translate3d(1px, 1px, 1px)";
			Hyperstyle.activateElement(element,controller,controller);
			const value = "translate3d(1px, 2px, 3px)";
			controller.addAnimation({
				property:"transform",
				duration: duration,
				from: value,
				to: value,
				blend:"absolute"
			});
			controller.addAnimation({
				duration:duration/2,
				onend: function() {
					const model = controller.model.transform;
					let expected = "translate3d(2px, 3px, 4px)";
					if (model.indexOf(" ") === -1) expected = "translate3d(2px,3px,4px)"; // depends on formatting, expect model and presentation formatting to be equal
					const actual = controller.presentation.transform;
					const error = actual === expected ? null : new Error("presentation value is wrong:"+actual+"; should be:"+expected+";");
					element.parentNode.removeChild(element);
					done(error);
				}
			});
			// presentation value is wrong:translate3d(1px, 1px, 1px); should be:translate3d(2px, 3px, 4px);

		});

		it("2 second animation, presentation, set after, uninitialized", function(done) {
			const element = document.createElement("div");
			document.body.appendChild(element);
			var controller = {};
			Hyperstyle.activateElement(element,controller,controller);
			element.style.transform = "translate3d(1px, 1px, 1px)";
			const value = "translate3d(1px, 2px, 3px)";
			controller.addAnimation({
				property:"transform",
				duration: duration,
				from: value,
				to: value,
				blend:"absolute"
			});
			controller.addAnimation({
				duration:duration/2,
				onend: function() {
					const model = controller.model.transform;
					let expected = "translate3d(2px, 3px, 4px)";
					if (model.indexOf(" ") === -1) expected = "translate3d(2px,3px,4px)"; // depends on formatting, expect model and presentation formatting to be equal
					const actual = controller.presentation.transform;
					const error = actual === expected ? null : new Error("presentation value is wrong:"+actual+"; should be:"+expected+";");
					element.parentNode.removeChild(element);
					done(error);
				}
			});
			// presentation value is wrong:translate3d(1px, 1px, 1px); should be:translate3d(2px, 3px, 4px);

		});
	});

	describe("3 Rocketship", function() { // how is this supposed to work again? It worked before, was that an error and failing now is correct behavior?
		it("works with activated element", function(done) {
			const one = document.createElement("div");
			document.body.appendChild(one);
			one.style.transform = "rotate(90deg)";
			Hyperstyle.activateElement(one);
			const two = document.createElement("div");
			document.body.appendChild(two);
			two.style.transform = "rotate(90deg)";
			Hyperstyle.activateElement(two);
			const animation = {
				property:"transform",
				duration:duration*2,
				from: "rotate(180deg)",
				to: "rotate(0deg)",
				fillMode:"backwards" // so it applies even if it hasn't started
			};
			one.addAnimation(animation,"test");
			two.addAnimation(animation);
			one.addAnimation({
				duration:duration/2,
				onend: function() {
					const copy = one.animationNamed("test");
					one.style.transform = "rotate(270deg)";
					copy.startTime = copy.startTime + duration*2;
					one.addAnimation(copy);
					one.addAnimation({
						duration:duration/2,
						onend: function() {
							const first = one.presentation.transform;
							const second = two.presentation.transform;
							const error = first === second ? null : new Error("timing fail, these are not the same, first:"+first+"; second:"+second+";");
							one.parentNode.removeChild(one);
							two.parentNode.removeChild(two);
							done(error);
						}
					})
				}
			});

		});
		it("works with activated controller", function(done) {
			const one = document.createElement("div");
			const ONE = {};
			document.body.appendChild(one);
			one.style.transform = "rotate(90deg)";
			Hyperstyle.activateElement(one,ONE,ONE);
			const two = document.createElement("div");
			const TWO = {};
			document.body.appendChild(two);
			two.style.transform = "rotate(90deg)";
			Hyperstyle.activateElement(two,TWO,TWO);
			const animation = {
				property:"transform",
				duration:duration*2,
				from: "rotate(180deg)",
				to: "rotate(0deg)",
				fillMode:"backwards" // so it applies even if it hasn't started
			};
			ONE.addAnimation(animation,"test");
			TWO.addAnimation(animation);
			ONE.addAnimation({
				duration:duration/2,
				onend: function() {
					const copy = ONE.animationNamed("test");
					one.style.transform = "rotate(270deg)";
					copy.startTime = copy.startTime + duration*2;
					ONE.addAnimation(copy);
					ONE.addAnimation({
						duration:duration/2,
						onend: function() {
							const first = ONE.presentation.transform;
							const second = TWO.presentation.transform;
							const error = first === second ? null : new Error("timing fail, these are not the same, first:"+first+"; second:"+second+";");
							one.parentNode.removeChild(one);
							two.parentNode.removeChild(two);
							done(error);
						}
					})
				}
			})

		});
	});
});
