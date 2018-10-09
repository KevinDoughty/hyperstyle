import { activateElement, currentTransaction, transformType, lengthType, registerAnimatableStyles } from "hyperstyle";
import { beginTransaction, commitTransaction, disableAnimation } from "hyperstyle";

// TODO: fix horrendous memory leak


// FIXME: This does not work, styles do not work, if type is not registered.


console.log("you need a controller so you can access the presentation layer and get presentation.x value");

registerAnimatableStyles({ // an inconvenience that will eventually allow tree shaking unused css animation types
	transform: transformType,
	left: lengthType, // This should not be necessary but otherwise animationForKey won't get called
	width: lengthType
});

let originalWidth = 300;
const insertBefore = false;
let toggled = false;

function windowResize(e) {
	layout();
}

function buttonClick(duration) {
	console.log("duration:",duration);
	toggled = !toggled;
	const transaction = currentTransaction();
	transaction.duration = duration;
	layout();
}

function animationForKey(key,value,previous,presentation,target) {
	if (typeof previous === "undefined" || previous === null || previous === "") previous = value;
	console.log("copying animationForKey:%s; value:%s; previous:%s;",key,value,previous);
	if (key === "width") {
		console.log("do not animate width");
		return null;
	}
	if (key === "transform") {
		console.log("do not animate transform");
		return null;
	}
	if (key === "left") return { // using transaction duration
		property:"transform",
		type: transformType,
		from:"translate3d("+previous+", 0px, 0px)",
		to:"translate3d("+value+", 0px, 0px)",

	}
	//if (key === "left") return true;
}
function removePx(from) {
	return Number(parseFloat(from.substring(0,from.indexOf("px"))));
}
function layout() {
	const divs = document.querySelectorAll("div");
	const length = divs.length;
	console.log("layout divs:%s; toggled:%s;",length,toggled);
	if (toggled) {
		let loc = document.body.offsetWidth;
		let i = length;
		while (i--) {
			const div = divs[i];
			//const width = div.offsetWidth;
			const width = removePx(div.style.width);
			loc -= width;
			div.style.left = loc + "px";
			console.log("layout div:%s; left:%s; width:%s;",div,loc,width);
		}
	} else {
		let loc = 0;
		for (let i=0; i<length; i++) {
			const div = divs[i];
			//const width = div.offsetWidth;
			const width = removePx(div.style.width);
			div.style.left = loc + "px";
			console.log("layout div:%s; left:%s; width:%s;",div,loc,width);
			loc += width;
		}
	}
}

// function layoutDiv(div, newX, duration) {
// 	//let oldX = div.offsetLeft;
// 	let oldX = div.offsetLeft;
// 	if (oldX === null || oldX === undefined) oldX = 0;
// 	if (oldX != newX) {
// 		div.style.left = newX + "px";
// // 		positionDiv(div, newX);
// // 		$(theDiv).hypermatic({
// // 			type:'left',
// // 			unit:'px',
// // 			duration:duration,
// // 			values:[oldX,newX]
// // 		});
// 	}
// }

// function positionDiv(what, where) {
// 	what.style.left = where + "px";
// // 	$(what).hypermatic({
// // 		type:'left',
// // 		unit:'px',
// // 		fill:true,
// // 		nu:[where]
// // 	});
// // 	what.offsetLeft = where;
// }


function mergeDivs() {
	const divs = document.querySelectorAll("div");
	if (insertBefore) {
		let i = divs.length;
		while (i-- > 1) {
			removeDiv(divs[i]);
		}
		divs[0].style.width = originalWidth + "px";
	} else {
		let i = divs.length-1;
		divs[i].style.left = divs[0].offsetLeft + "px";
// 		positionDiv(divs[i], divs[0].offsetLeft);
		divs[i].style.width = originalWidth + "px";
		while (i--) {
			removeDiv(divs[i]);
		}
	}
}

function removeDiv(div) {
	div.removeEventListener("mousedown", divClick);
	div.parentNode.removeChild(div);
}

function randomColor() {
	return "hsl(" + (Math.random()*360) + ","+(Math.random()*100)+"%,"+(15 + (Math.random()*70))+"%)";
}

function copyFromTo(oldElement,newElement,property) {
	const oldAnimations = oldElement.animations;
	const length = oldAnimations.length
	for (let i=0; i<length; i++) {
		const oldAnimation = oldAnimations[i];
		newElement.addAnimation(oldAnimation);
		console.log("copyFromTo oldAnimation:%s;",JSON.stringify(oldAnimation));
// 		const oldFrames = oldAnimation.effect.getFrames();
// 		const oldFirst = oldFrames[0];
// 		if (!oldAnimation.parent) { // don't want to copy underlying value animations, which are contained in a group.
// 			var oldLast = oldFrames[oldFrames.length-1];
// 			//console.log('%s; first:%s; last:%s;',i,JSON.stringify(oldFirst),JSON.stringify(oldLast));
// 			var newEffect = oldAnimation.effect.clone();
// 			var oldTiming = oldAnimation.specified._dict; // !!!
// 			if (oldTiming === null || oldTiming === undefined) console.log('oldAnimation.specified._dict has changed');
// 			if (oldAnimation.player === null || oldAnimation.player === undefined) console.log('oldAnimation._player has changed');
// 			var newTiming = JSON.parse(JSON.stringify(oldTiming));
// 			//newTiming.delay = ((oldAnimation._player.startTime + oldTiming.delay) - document.timeline.currentTime); // !!!
// 			newTiming.delay = ((oldAnimation.player.startTime + oldTiming.delay) - document.timeline.currentTime); // !!!
// 			newElement.animate(newEffect,newTiming);
// 		}
	}
}

function splitDiv(div, x) {
	//console.log('splitDiv:%s;',theDiv);
	disableAnimation();
	// const transaction = beginTransaction();
	// transaction.disableAnimation = true;
	// const presentationXpx = div.presentation.left;
	// const index = presentationXpx.indexOf("px");
	// const presentationXstring = presentationXpx.substring(0,index);
	// const presentationX = parseFloat(presentationXstring);
	//console.log("... split. x:%s; offsetLeft:%s; presentation px:%s; string:%s; x:%s;",x,removePx(div.presentation.left),presentationXpx,presentationXstring,presentationX);
	const presentationX = removePx(div.presentation.left);
	console.log("... split. x:%s; presentation:%s;",x,presentationX);
	if (insertBefore) { // false
		const newDivWidth = (x - presentationX);
		const offsetWidth = removePx(div.model.width);
		const originalDivWidth = offsetWidth - newDivWidth;
		console.log("split. offsetWidth:%s; original width:%s; new width:%s;",offsetWidth, originalDivWidth, newDivWidth);
		if (originalDivWidth && newDivWidth) {
			const offsetLeft = removePx(div.style.left);
			const oldModelX = offsetLeft;
			div.style.width = originalDivWidth + "px";
			div.style.backgroundColor = randomColor(); // debug
			//console.log("split. offsetWidth:%s; original width:%s; new width:%s;",offsetWidth, originalDivWidth, newDivWidth);
			//positionDiv(div, oldModelX + newDivWidth);
			div.style.left = oldModelX + newDivWidth + "px";
			const newDiv = createDiv(oldModelX, newDivWidth);
			insertDivBefore(newDiv, div);
			copyFromTo(div, newDiv, "left");
		}
	} else {
		const modelWidth = removePx(div.model.width);
		const originalDivWidth = (x - presentationX);
		const newDivWidth = modelWidth - originalDivWidth;
		console.log("split. offsetWidth:%s; original width:%s; new width:%s;",offsetWidth, originalDivWidth, newDivWidth);
		if (originalDivWidth && newDivWidth) {
			const offsetLeft = removePx(div.style.left);
			const oldModelX = offsetLeft;
			div.style.width = originalDivWidth + "px";
			div.style.backgroundColor = randomColor(); // debug
			//console.log("split. offsetWidth:%s; original width:%s; new width:%s;",offsetWidth, originalDivWidth, newDivWidth);
			const newDiv = createDiv(oldModelX + originalDivWidth, newDivWidth);
			insertDivAfter(newDiv, div);
			copyFromTo(div, newDiv, "left");
		}
	}
	//commitTransaction();
}

function createDiv(loc, width) {
	const div = document.createElement("div");
	//activateElement(div, null, animationForKey); // Order matters here, but shouldn't. Must come before according to tests
	div.style.width = width + "px";
	div.style.backgroundColor = randomColor();
	//positionDiv(div, loc);
	div.style.left = loc + "px";
	div.style.transform = "translate3d(0px, 0px, 0px)"; // shouldn't have to do this

	div.addEventListener("mousedown", divClick);
	activateElement(div, div, animationForKey); // (element, controller, delegate) // Order matters here, but shouldn't. Must come before according to tests
	console.log("create loc:%s; width:%s;",loc,width);
	return div;
}

function insertDivBefore(div, before) {
	if (before === null || before === undefined) before = document.body.firstChild;
	document.body.insertBefore(div, before);
}

function insertDivAfter(div, after) {
	after.parentNode.insertBefore(div, after.nextSibling);
}

function divClick(e) {
	splitDiv(this, e.x);
}

function appendButton(text, duration) {
	const button = document.createElement("input");
	button.type = "button";
	button.value = text;
	if (duration) button.onclick = function() {
		console.log("click");
		buttonClick(duration);
	}
	else button.onclick = mergeDivs;
	document.body.appendChild(button);
}

appendButton("very slow",32);
appendButton("slow",16);
appendButton("medium",8);
appendButton("fast",4);
appendButton("very fast",2);
appendButton("merge");

insertDivBefore(createDiv(0, originalWidth), document.body.firstChild);
window.addEventListener("resize", windowResize);
