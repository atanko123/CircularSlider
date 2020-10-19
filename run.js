/*
	containter
	color
	minValue
	maxValue
	step
	radius
*/

const sliders = document.getElementById("sliders");
console.log("sliders", sliders.offsetWidth);

// defined options
const pcs1 = new OptionsCircularSlider("sliders", "#730099", 0, 1000, 500, 160);
const pcs2 = new OptionsCircularSlider("sliders", "#4d94ff", 0, 100, 1, 130);
const pcs3 = new OptionsCircularSlider("sliders", "#2eb82e", 0, 100, 25, 100);
const pcs4 = new OptionsCircularSlider("sliders", "#ffa31a", 0, 300, 10, 70);
const pcs5 = new OptionsCircularSlider("sliders", "#e62e00", 0, 1000, 500, 40);

// Circular sliders defined
const cs1 = new CircularSlider(pcs1);
const cs2 = new CircularSlider(pcs2);
const cs3 = new CircularSlider(pcs3);
const cs4 = new CircularSlider(pcs4);
const cs5 = new CircularSlider(pcs5);

//console.log(cs1);


// Init values of data
cs1.setCurrentStep = 1;
document.getElementById("trans-val").innerHTML = cs1.getFormatedValue;
cs2.setCurrentStep = 33;
document.getElementById("food-val").innerHTML = cs2.getFormatedValue;
cs3.setCurrentStep = 3;
document.getElementById("insur-val").innerHTML = cs3.getFormatedValue;
cs4.setCurrentStep = 1;
document.getElementById("enter-val").innerHTML = cs4.getFormatedValue;
cs5.setCurrentStep = 1;
document.getElementById("health-val").innerHTML = cs5.getFormatedValue;

// Init colors of data
document.getElementById("trans-color").style.background = cs1.getColor;
document.getElementById("food-color").style.background = cs2.getColor;
document.getElementById("insur-color").style.background = cs3.getColor;
document.getElementById("enter-color").style.background = cs4.getColor;
document.getElementById("health-color").style.background = cs5.getColor;