/*
	containter
	color
	minValue
	maxValue
	step
	radius
*/
const STROKE_WIDTH = 15;
const SVG_URL = "http://www.w3.org/2000/svg";

class CircularSlider {

	constructor(options) {
		this._checkOptions(options);
		this.options = options;

		this.currentStep = 0;
		this._initSlider();
	}

	get getColor() {
		return this.options.color;
	}

	get getCurrentStep() {
		return this.currentStep;
	}

	// $value
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

CircularSlider.prototype._initSlider = function() {
	this.d = this.options.radius - (STROKE_WIDTH / 2);
    const container = document.getElementById(this.options.container);
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
    const elSVG = document.createElementNS(SVG_URL, "svg");
    const width = container.offsetWidth;

    elSVG.setAttributeNS(null, "id", "slidersSVG");
   	elSVG.setAttributeNS(null, "width", width);
    elSVG.setAttributeNS(null, "height", width);
    elSVG.setAttributeNS(null, "viewBox", "-200 -200 400 400");

    return elSVG;
}

CircularSlider.prototype._initCircle = function(r, fill) {
	const cs = document.createElementNS(SVG_URL, "circle");
	cs.setAttributeNS(null, "cx", 0);
	cs.setAttributeNS(null, "cy", 0);
	cs.setAttributeNS(null, "r", r);
	cs.setAttributeNS(null, "fill", fill);
	cs.setAttributeNS(null, 'transform', 'rotate(-90)');

	return cs;
}

CircularSlider.prototype._initEmptyTemplate = function() {
    const cs = this._initCircle(this.d, "none");
    cs.style.stroke = "#C8C8C8";
    cs.style.strokeWidth = STROKE_WIDTH + "px";
    cs.style.strokeDasharray = "4, 1.5";

    return cs;
}

CircularSlider.prototype._initSlideCircle = function() {
    const cs = this._initCircle(10, "white");
    cs.style.stroke = "	#A8A8A8";

    return cs;
}

CircularSlider.prototype._initFilledCircle = function() {
	this.sliderSize = 2 * Math.PI * (this.options.radius - STROKE_WIDTH / 2);
	const totalSteps =  (this.options.maxValue - this.options.minValue) / this.options.step;
	this.stepSize = this.sliderSize / totalSteps;

    const cs = this._initCircle(this.d, "none");
    cs.style.stroke = this.getColor;
    cs.style.strokeWidth = STROKE_WIDTH + "px";

    return cs;
}

CircularSlider.prototype._fillSlider = function() {
	const fill = this.currentStep * this.stepSize;
	const empty = this.sliderSize - fill;
	this.filledCircle.setAttributeNS(null, 'stroke-dasharray', `${fill} ${empty}`);
	// Change position of white dot based on filled circle
	this._positionSliderCircle(fill / this.sliderSize);
}

CircularSlider.prototype._positionSliderCircle = function(portion) {
	const radians = 2 * Math.PI * portion; // 2PI radians = 360 degrees
	const x =  Math.cos(radians) * (this.options.radius - STROKE_WIDTH / 2);
	const y =  Math.sin(radians) * (this.options.radius - STROKE_WIDTH / 2);
	this.sliderCircle.setAttributeNS(null, "cx", x);
	this.sliderCircle.setAttributeNS(null, "cy", y);
}