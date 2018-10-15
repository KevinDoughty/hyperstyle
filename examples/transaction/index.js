import { activate, activateElement, HyperScale, transformType, lengthType, currentTransaction, registerAnimatableStyles } from "hyperstyle";
import { disableAnimation } from "hyperstyle";

registerAnimatableStyles({ // An inconvenience that will eventually allow tree shaking unused css animation types. Used by number seven only.
	transform: transformType,
	left:lengthType,
	top:lengthType
});

function elastic(progress,omega,zeta) {
	const beta = Math.sqrt(1.0 - zeta * zeta);
	const value = 1.0 / beta * Math.exp(-zeta * omega * progress) * Math.sin(beta * omega * progress + Math.atan(beta / zeta));
	return 1-value;
};

function easing(progress) {
	progress = 1 - Math.cos( progress * Math.PI / 2 );
	return elastic(progress, 15, 0.6);
}


const negativeOne = {
	element: document.getElementById("negativeOne"),
	transform: "translate3d(0px, 0px, 0px)",
	display: function() {
		this.element.style.transform = this.transform;
	}
}
const zero = {
	element: document.getElementById("zero"),
	x: 0,
	y: 0,
	display: function() {
		this.element.style.transform = "translate3d("+this.x+"px,"+this.y+"px,0px)";
	}
}


class One {
	constructor(name) {
		if (!document.getElementById(name)) return;
		this.element = document.getElementById(name);
		this.element.innerHTML = name;
		this.x = 0;
		this.y = 0;
		activate(this);
	}
	display() {
		this.element.style.left = this.x + "px";
		this.element.style.top = this.y + "px";
	}
}


class Two {
	constructor(name) {
		if (!document.getElementById(name)) return;
		this.element = document.getElementById(name);
		this.element.innerHTML = name;
		this.x = 0;
		this.y = 0;
		activate(this);
	}
	display() {
		this.element.style.transform = "translate3d("+this.x+"px,"+this.y+"px,0px)";
	}
}


class Three { // FASTER_RENDER_LAYER approved
	constructor(name) {
		if (!document.getElementById(name)) return;
		this.x = 0;
		this.y = 0;
		this.transform = "translate3d(0px,0px,0px)";
		activate(this);
		this.registerAnimatableProperty("transform",transformType); // The new sad workaround
		this.element = document.getElementById(name); // setting this after activate is a bug fix for presentation layer that does not happen with two...
		this.element.innerHTML = name;
	}
	animationForKey(key,value,previous) {
		if (key === "x") return {
			property:"transform",
			//type:transformType, // The new not-so-sad workaround
			from:"translate3d("+previous+"px,0px,0px)",
			to:"translate3d("+value+"px,0px,0px)"
		}
		if (key === "y") return {
			property:"transform",
			//type:transformType, // The new not-so-sad workaround
			from:"translate3d(0px,"+previous+"px,0px)",
			to:"translate3d(0px,"+value+"px,0px)"
		}
	}
	display() {
		this.element.style.left = this.x + "px";
		this.element.style.top = this.y + "px";
		this.element.style.transform = this.transform; // animating a different key in response to a change in another is not going to allow sub-pixel antialiasing if I have to implement display like this
	}
}


// class Four { // same as Five except full animation is registered.
// 	constructor(name) {
// 		if (!document.getElementById(name)) return;
// 		activate(this);
// 		this.transform = "translate3d(0px,0px,0px)";
// 		this.registerAnimatableProperty("transform", { type:transformType }); // Default type is number. Registering transformType allows using css property value strings instead of maintaining a property value and manually creating those strings
// 		this.element = document.getElementById(name); // setting this after activate is a bug fix for presentation layer that does not happen with two...
// 		this.element.innerHTML = name;
// 	}
// 	display() {
// 		this.element.style.transform = this.transform;
// 	}
// }

// class Five { // same as four except only a type is registered
// 	constructor(name) {
// 		if (!document.getElementById(name)) return;
// 		activate(this);
// 		this.transform = "translate3d(0px,0px,0px)";
// 		this.registerAnimatableProperty("transform", transformType); // Default type is number. Registering transformType allows using css property value strings instead of maintaining a property value and manually creating those strings
// 		this.element = document.getElementById(name); // setting this after activate is a bug fix for presentation layer that does not happen with two...
// 		this.element.innerHTML = name;
// 	}
// 	display() {
// 		this.element.style.transform = this.transform;
// 	}
// }

class Six {
	constructor(name) {
		if (!document.getElementById(name)) return;
		this.transform = "translate3d(0px,0px,0px)";
		activate(this);
		this.registerAnimatableProperty("transform", transformType); // Default type is number. Registering transformType allows using css property value strings instead of maintaining a property value and manually creating those strings
		this.element = document.getElementById(name); // setting this after activate is a bug fix for presentation layer that does not happen with two...
		this.element.innerHTML = name;
	}
	display() {
		this.element.style.transform = this.transform;
	}
}

class Seven { // same as Six except initial value set later
	constructor(name) {
		if (!document.getElementById(name)) return;
		activate(this);
		this.transform = "translate3d(0px,0px,0px)";
		this.registerAnimatableProperty("transform", transformType); // Default type is number. Registering transformType allows using css property value strings instead of maintaining a property value and manually creating those strings
		this.element = document.getElementById(name); // setting this after activate is a bug fix for presentation layer that does not happen with two...
		this.element.innerHTML = name;
	}
	display() {
		this.element.style.transform = this.transform;
	}
}


class Eight {
	constructor(name) {
		if (!document.getElementById(name)) return;
		activate(this);
		this.registerAnimatableProperty("transform", transformType);
		this.transform = "translate3d(0px,0px,0px)";
		this.element = document.getElementById(name); // setting this after activate is a bug fix for presentation layer that does not happen with two...
		this.element.innerHTML = name;
	}
	animationForKey() {
		return null;
	}
	display() {
		this.element.style.transform = this.transform;
	}
}


// class Eight { // hope this is the right order... // a duplicate
// 	constructor(name) {
// 		if (!document.getElementById(name)) return;
// 		activate(this);
// 		this.registerAnimatableProperty("transform");
// 		this.transform = "translate3d(0px,0px,0px)";
// 		this.element = document.getElementById(name); // setting this after activate is a bug fix for presentation layer that does not happen with two...
// 		this.element.innerHTML = name;
// 	}
// 	// animationForKey() {
// 	// 	return 0;
// 	// }
// 	display() {
// 		this.element.style.transform = this.transform;
// 	}
// }

///////////////////
// ACTIVATE ELEMENT

// TypeError: eight.style is undefined
class Ten { // element.style
	constructor(name) {
		if (!document.getElementById(name)) return;
		//this.registerAnimatableProperty("transform", transformType); // Default type is number. Registering transformType allows using css property value strings instead of maintaining a property value and manually creating those strings
		this.element = document.getElementById(name);
		this.element.innerHTML = name;
		//this.transform = "translate3d(0px,0px,0px)";
		activateElement(this.element, this);
	//	this.registerAnimatableProperty("transform", transformType);

	}
	// display() {
	// 	this.element.style.transform = this.transform;
	// }
}
// class Eleven { // element.style
// 	constructor(name) {
// 		if (!document.getElementById(name)) return;
// 		//this.registerAnimatableProperty("transform", transformType); // Default type is number. Registering transformType allows using css property value strings instead of maintaining a property value and manually creating those strings
// 		this.element = document.getElementById(name); // setting this after activate is a bug fix for presentation layer that does not happen with two...
// 		this.element.innerHTML = name;
// 		activateElement(this.element);
// 		//this.transform = "translate3d(0px,0px,0px)";
// 		//this.registerAnimatableProperty("transform", transformType);
//
// 	}
// 	// display() {
// 	// 	this.element.style.transform = this.transform;
// 	// }
// }
// class Twelve { // element.style
// 	constructor(name) {
// 		if (!document.getElementById(name)) return;
// 		//this.registerAnimatableProperty("transform", transformType); // Default type is number. Registering transformType allows using css property value strings instead of maintaining a property value and manually creating those strings
// 		this.element = document.getElementById(name); // setting this after activate is a bug fix for presentation layer that does not happen with two...
// 		this.element.innerHTML = name;
// 		activateElement(this.element);
// 		//this.registerAnimatableProperty("transform", transformType);
// 		//this.transform = "translate3d(0px,0px,0px)";
// 	}
// 	// display() {
// 	// 	this.element.style.transform = this.transform;
// 	// }
// }

class Fourteen { // fourteen doesn't animate initially... should it ever animate?
	constructor(name) {
		if (!document.getElementById(name)) return;
		this.element = document.getElementById(name);
		this.element.innerHTML = name;
		activateElement(this.element, this, this);
		//this.registerAnimatableProperty("transform", transformType);
		this.registerAnimatableProperty("transform", { type:transformType, duration:0 });
		this.element.style.transform = "translate3d(0px,0px,0px)";
	}
	animationForKey(key) {
		if (key === "transform") return true;
	}
}
class Fifteen {
	constructor(name) {
		if (!document.getElementById(name)) return;
		this.element = document.getElementById(name);
		this.element.innerHTML = name;
		activateElement(this.element);
		this.element.registerAnimatableProperty("transform", transformType);
		this.element.style.transform = "translate3d(0px,0px,0px)";
	}
}




if (document.getElementById("negativeOne")) {
	negativeOne.element.innerHTML = "negativeOne";
	activate(negativeOne);
	negativeOne.registerAnimatableProperty("transform", transformType);
}
if (document.getElementById("zero")) {
	zero.element.innerHTML = "zero";
	activate(zero);
}
const one = new One("one");
const two = new Two("two");
const three = new Three("three");
//const four = new Four("four");
//const five = new Five("five");
const six = new Six("six");
const seven = new Six("seven");

const eight = new Eight("eight");
const thirteen = new Eight("thirteen");  // instanceof Eight. Difference is in keydown


const nine = document.getElementById("nine"); // activateElement
nine.innerHTML = "nine";
activateElement(nine);
nine.style.transform = "translate3d(0px, 0px, 0px)"; // unfortunate bugfix

const ten = new Ten("ten"); // activateElement
ten.element.style.transform = "translate3d(0px, 0px, 0px)"; // unfortunate bugfix
// const eleven = new Eleven("eleven");
// const twelve = new Twelve("twelve");

const fourteen = new Fourteen("fourteen"); // activateElement
const fifteen = new Fifteen("fifteen"); // activateElement


const sixteen = document.getElementById("sixteen"); // activateElement
sixteen.innerHTML = "sixteen";
//sixteen.style.transform = "translate3d(0px, 0px, 0px)"; // even more unfortunate failed bugfix
const sixteenDelegate = {
	animationForKey: function(key, value, previous) {
		if (key === "left") return {
			property: "transform",
			from: "translate3d("+ previous +", 0px, 0px)",
			to: "translate3d("+ value +", 0px, 0px)"
		}
		if (key === "top") return {
			property: "transform",
			from: "translate3d(0px, "+ previous + ", 0px)",
			to: "translate3d(0px, "+ value + ", 0px)"
		}
	}
}
activateElement(sixteen, sixteen, sixteenDelegate);


const seventeen = document.getElementById("seventeen"); // activateElement
seventeen.innerHTML = "seventeen";
const seventeenDelegate = {
	animationForKey: function(key, value, previous) {
		if (key === "left") return {
			property: "transform",
			from: "translate3d("+ previous +", 0px, 0px)",
			to: "translate3d("+ value +", 0px, 0px)"
		}
		if (key === "top") return {
			property: "transform",
			from: "translate3d(0px, "+ previous + ", 0px)",
			to: "translate3d(0px, "+ value + ", 0px)"
		}
	}
}
activateElement(seventeen, seventeen, seventeenDelegate);


const eighteenWrapper = document.getElementById("eighteenWrapper");
const eighteen = document.getElementById("eighteen"); // activateElement
eighteen.innerHTML = "eighteen";
activateElement(eighteen);
let eighteenTo = "translate3d(0px, 0px, 0px)";

document.addEventListener("keydown", e => {
	const keyCode = e.keyCode;
	if (keyCode > 47 && keyCode < 58) {
		const duration = keyCode - 48;
		const transaction = currentTransaction();
		transaction.duration = duration;
		transaction.easing = easing;

		const width = document.body.offsetWidth - 50;
		const height = document.body.offsetHeight - 50;


		negativeOne.transform = "translate3d("+ (Math.random()*width) +"px, "+ (Math.random()*height) + "px, 0px)";

		zero.x = Math.random() * width;
		zero.y = Math.random() * height;

		one.x = Math.random() * width;
		one.y = Math.random() * height;

		two.x = Math.random() * width;
		two.y = Math.random() * height;

		three.x = Math.random() * width;
		three.y = Math.random() * height;

		//four.transform = "translate3d("+ (Math.random()*width) +"px,"+ (Math.random()*height) + "px,0px)";
		//five.transform = "translate3d("+ (Math.random()*width) +"px,"+ (Math.random()*height) + "px,0px)";
		six.transform = "translate3d("+ (Math.random()*width) +"px,"+ (Math.random()*height) + "px,0px)";
		seven.transform = "translate3d("+ (Math.random()*width) +"px,"+ (Math.random()*height) + "px,0px)";

		const eightNext = "translate3d("+ (Math.random()*width) +"px,"+ (Math.random()*height) + "px,0px)";
		eight.addAnimation({
			property:"transform",
			type:transformType,
			from:eight.transform,
			to:eightNext
		});
		eight.transform = eightNext;

		const thirteenNext = "translate3d("+ (Math.random()*width) +"px,"+ (Math.random()*height) + "px,0px)";
		const thirteenPrevious = thirteen.transform;
		thirteen.transform = thirteenNext;
		thirteen.addAnimation({
			property:"transform",
			type:transformType,
			from:thirteenPrevious,
			to:thirteenNext
		});

		nine.style.transform = "translate3d("+ (Math.random()*width) +"px,"+ (Math.random()*height) + "px,0px)";

		ten.element.style.transform = "translate3d("+ (Math.random()*width) +"px,"+ (Math.random()*height) + "px,0px)";
		// if (document.getElementById("eleven")) eleven.element.style.transform = "translate3d("+ (Math.random()*width) +"px,"+ (Math.random()*height) + "px,0px)";
		// if (document.getElementById("twelve")) twelve.element.style.transform = "translate3d("+ (Math.random()*width) +"px,"+ (Math.random()*height) + "px,0px)";

		fourteen.element.style.transform = "translate3d("+ (Math.random()*width) +"px, "+ (Math.random()*height) + "px, 0px)";

		sixteen.style.left = (Math.random() * width) + "px";
		sixteen.style.top = (Math.random() * height) + "px";


		disableAnimation();


		const fifteenFrom = fifteen.element.style.transform;
		const fifteenTo = "translate3d("+ (Math.random()*width) +"px, "+ (Math.random()*height) + "px, 0px)";
		fifteen.element.style.transform = fifteenTo;
		fifteen.element.addAnimation({
			property:"transform",
			type:transformType,
			from:fifteenFrom,
			to:fifteenTo
		});


		const seventeenLeftFrom = seventeen.style.left;
		const seventeenLeftTo = (Math.random() * width) + "px";
		const seventeenTopFrom = seventeen.style.top;
		const seventeenTopTo = (Math.random() * height) + "px";
		seventeen.style.left = seventeenLeftTo;
		seventeen.style.top = seventeenTopTo;
		seventeen.addAnimation({
			property:"transform",
			type:transformType,
			from:"translate3d("+ seventeenLeftFrom +", "+ seventeenTopFrom + ", 0px)",
			to:"translate3d("+ seventeenLeftTo +", "+ seventeenTopTo + ", 0px)"
		});


		const eighteenFrom = eighteenTo;
		const eighteenLeft = (Math.random()*width) + "px";
		const eighteenTop = (Math.random()*height) + "px";
		eighteenTo = "translate3d("+ eighteenLeft +", " + eighteenTop + ", 0px)";
		eighteenWrapper.style.left = eighteenLeft;
		eighteenWrapper.style.top = eighteenTop;
		eighteen.addAnimation({
			property:"transform",
			type:transformType,
			from:eighteenFrom,
			to:eighteenTo
		});

	}
});
