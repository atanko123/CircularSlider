/*
	containter
	color
	minValue
	maxValue
	step
	radius
*/

// defined options
const pcs1 = new OptionsCircularSlider("sliders", "#730099", 0, 10, 1, 200);
const pcs2 = new OptionsCircularSlider("sliders", "#4d94ff", 0, 100, 1, null);
const pcs3 = new OptionsCircularSlider("sliders", "#2eb82e", 0, 500, 50, null);
const pcs4 = new OptionsCircularSlider("sliders", "#ffa31a", 0, 300, 10, null);
const pcs5 = new OptionsCircularSlider("sliders", "#e62e00", 0, 1000, 500, null);

// Circular sliders defined
const cs1 = new CircularSlider(pcs1);
const cs2 = new CircularSlider(pcs2);
const cs3 = new CircularSlider(pcs3);
const cs4 = new CircularSlider(pcs4);
const cs5 = new CircularSlider(pcs5);


// Init values of data
document.getElementById("trans-val").innerHTML = cs1.getFormatedValue(2);
document.getElementById("food-val").innerHTML = cs2.getFormatedValue(33);
document.getElementById("insur-val").innerHTML = cs3.getFormatedValue(4);
document.getElementById("enter-val").innerHTML = cs4.getFormatedValue(0);
document.getElementById("health-val").innerHTML = cs5.getFormatedValue(1);

// Init colors of data
document.getElementById("trans-color").style.background = cs1.getColor();
document.getElementById("food-color").style.background = cs2.getColor();
document.getElementById("insur-color").style.background = cs3.getColor();
document.getElementById("enter-color").style.background = cs4.getColor();
document.getElementById("health-color").style.background = cs5.getColor();