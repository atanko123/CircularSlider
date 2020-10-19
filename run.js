/*
	containter
	color
	minValue
	maxValue
	step
	radius
*/


class Options {
	constructor(containter, color, minValue, maxValue, step, radius) {
		this.containter = containter;
		this.color = color;
		this.minValue = minValue;
		this.maxValue = maxValue; 
		this.step = step;
		this.radius = radius;
	}
}


// init values of data
document.getElementById("trans-val").innerHTML = "$" + 750;
document.getElementById("food-val").innerHTML = "$" + 650;
document.getElementById("insur-val").innerHTML = "$" + 500;
document.getElementById("enter-val").innerHTML = "$" + 800;
document.getElementById("health-val").innerHTML = "$" + 200;

//init colors of data
document.getElementById("trans-color").style.background = "#730099";
document.getElementById("food-color").style.background = "#4d94ff";
document.getElementById("insur-color").style.background = "#2eb82e";
document.getElementById("enter-color").style.background = "#ffa31a";
document.getElementById("health-color").style.background = "#e62e00";