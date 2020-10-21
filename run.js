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
const pcs1 = new OptionsCircularSlider("sliders", "#730099", 0, 1000, 100, 160); 
const pcs2 = new OptionsCircularSlider("sliders", "#4d94ff", 0, 100, 5, 130);
const pcs3 = new OptionsCircularSlider("sliders", "#2eb82e", 0, 100, 25, 100);
const pcs4 = new OptionsCircularSlider("sliders", "#ffa31a", 0, 300, 50, 70);
const pcs5 = new OptionsCircularSlider("sliders", "#e62e00", 0, 10, 1, 40);

// Circular sliders defined
const cs1 = new CircularSlider(pcs1, value => updateData("trans-val", value));
const cs2 = new CircularSlider(pcs2, value => updateData("food-val", value));
const cs3 = new CircularSlider(pcs3, value => updateData("insur-val", value));
const cs4 = new CircularSlider(pcs4, value => updateData("enter-val", value));
const cs5 = new CircularSlider(pcs5, value => updateData("health-val", value));


// Init values of data
cs1.setCurrentStep = 1;
updateData("trans-val", cs1.getValue);
cs2.setCurrentStep = 5;
updateData("food-val", cs2.getValue);
cs3.setCurrentStep = 3;
updateData("insur-val", cs3.getValue);
cs4.setCurrentStep = 1;
updateData("enter-val", cs4.getValue);
cs5.setCurrentStep = 1;
updateData("health-val", cs5.getValue);

// Init colors of data
document.getElementById("trans-color").style.background = cs1.getColor;
document.getElementById("food-color").style.background = cs2.getColor;
document.getElementById("insur-color").style.background = cs3.getColor;
document.getElementById("enter-color").style.background = cs4.getColor;
document.getElementById("health-color").style.background = cs5.getColor;

function updateData(id, value) {
	document.getElementById(id).innerHTML = `$${value}`;
}

