/*
	containter
	color
	minValue
	maxValue
	step
	radius
*/
const STROKE_WIDTH = 15;

class CircularSlider {

	constructor(options) {
		this._checkOptions(options);
		this.options = options;

		this.currentStep = 0;
		this._initCircularSliders();
	}

	get getColor() {
		return this.options.color;
	}

	get getFormatedValue() {
		return "$" + (this.options.minValue + this.currentStep * this.options.step);
	}

	set setCurrentStep(newStep) {
		if (newStep === this.currentStep) return;

		const value = newStep * this.options.step + this.options.minValue;
		if (value > this.options.maxValue) {
			throw new Error("New step is too big");
		} else if (value < this.options.minValue) {
			throw new Error("New step is too small");
		}
		this.currentStep = newStep;
		this._fillSlider();
	}
}

CircularSlider.prototype._checkOptions = function(options) {
	const s = new Option().style;
  	s.color = options.color;
  	if (s.color === "") {
  		throw new Error("Passed color is not valid.");
  	}
  	else if (options.minValue >= options.maxValue) {
  		throw new Error("Min value should be less than max value.");
  	}
  	else if (options.step > options.maxValue) {
  		throw new Error("Step is too big.");
  	}
  	else if (options.step < 1) {
  		throw new Error("Step should be a positive integer.");
  	}
}

CircularSlider.prototype._initCircularSliders = function() {
    this.d = this.options.radius - (STROKE_WIDTH / 2);
    console.log("d", this.d);
    this._initSlider();
}

CircularSlider.prototype._initSlider = function() {
    const container = document.getElementById(this.options.container);
    // create root svg only when the first slider is added to the container.
    this.rootSVG = document.getElementById("slidersSVG");
    if (this.rootSVG === null) {
        this.rootSVG = this._createRootSVG(container);
        container.appendChild(this.rootSVG);
    }
    this.filledCircle = this._initFilledCircle();
    this.sliderCircle = this._initSlideCircle();
    this.rootSVG.appendChild(this._initEmptyTemplate());
    this.rootSVG.appendChild(this.filledCircle);
    this.rootSVG.appendChild(this.sliderCircle);
}

CircularSlider.prototype._createRootSVG = function(container) {
    const elSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const width = container.offsetWidth;

    elSVG.setAttributeNS(null, "id", "slidersSVG");
   	elSVG.setAttributeNS(null, "width", width);
    elSVG.setAttributeNS(null, "height", width);
    elSVG.setAttributeNS(null, "viewBox", "-200 -200 400 400");

    //console.log("_createRootSVG", elSVG);
    return elSVG;
}

CircularSlider.prototype._initEmptyTemplate = function() {
    const cs = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    cs.setAttributeNS(null, "fill", "none")
    cs.setAttributeNS(null, "cx", 0);
    cs.setAttributeNS(null, "cy", 0);
    cs.setAttributeNS(null, "r", this.d);
    cs.style.stroke = "#C8C8C8";
    cs.style.strokeWidth = STROKE_WIDTH + "px";
    cs.setAttributeNS(null, 'transform', 'rotate(-90)');
    cs.style.strokeDasharray = "4, 1.5";

    //console.log("_initEmptyTemplate:", cs);
    return cs;
}

CircularSlider.prototype._initSlideCircle = function() {
    const cs = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    cs.setAttributeNS(null, "fill", "white");
    cs.setAttributeNS(null, "cx", this.options.radius - STROKE_WIDTH / 2);
    cs.setAttributeNS(null, "cy", 0);
    cs.setAttributeNS(null, "r", 10);
    cs.style.stroke = "	#A8A8A8";
    cs.setAttributeNS(null, 'transform', 'rotate(-90)');

    //console.log("_initEmptyTemplate:", cs);
    return cs;
}

CircularSlider.prototype._initFilledCircle = function() {
	this.sliderSize = 2 * Math.PI * (this.options.radius - STROKE_WIDTH / 2);
	const totalSteps =  (this.options.maxValue - this.options.minValue) / this.options.step;
	this.stepSize = this.sliderSize / totalSteps;
    const cs = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    cs.setAttributeNS(null, "fill", "none")
    cs.setAttributeNS(null, "cx", 0);
    cs.setAttributeNS(null, "cy", 0);
    cs.setAttributeNS(null, "r", this.d);
    cs.style.stroke = this.getColor;
    cs.style.strokeWidth = STROKE_WIDTH + "px";
    cs.setAttributeNS(null, 'transform', 'rotate(-90)');
    cs.setAttributeNS(null, 'stroke-dasharray', `${this.sliderSize} ${this.sliderSize}`);
    cs.setAttributeNS(null, 'stroke-dashoffset', `${this.sliderSize}`);

    //console.log("_initFilledCircle:", cs);
    return cs;
}

CircularSlider.prototype._fillSlider = function() {
	const fill = this.currentStep * this.stepSize;
	const empty = this.sliderSize - fill;
	this.filledCircle.setAttributeNS(null, 'stroke-dasharray', `${fill} ${empty}`);
}