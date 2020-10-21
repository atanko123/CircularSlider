/*
	containter
	color
	minValue
	maxValue
	step
	radius
*/
const STROKE_WIDTH = 10;
const DOT_SIZE = 8;
const ANIMATED_STEP = 600;
const SVG_URL = "http://www.w3.org/2000/svg";

class CircularSlider {

	constructor(options, updateData) {
		this._checkOptions(options);
		this.options = options;
		this.updateData = updateData;

		this.currentStep = 0;
		this.previousSize = 0;
		this._initSlider();
		this._initHandlers();
	}

	get getColor() {
		return this.options.color;
	}

	get getCurrentStep() {
		return this.currentStep;
	}

	get getValue() {
		return this.options.minValue + this.currentStep * this.options.step;
	}

	set setCurrentStep(newStep) {
		// check if newStep is valid
		if (isNaN(newStep)) return;
		const value = newStep * this.options.step + this.options.minValue;
		if (value > this.options.maxValue) {
			throw new Error("New step is too big");
		} else if (value < this.options.minValue) {
			throw new Error("New step is too small");
		}

		// Update step value
		this.currentStep = newStep;
		if (typeof this.updateData === "function") {
			this.updateData(this.getValue);
		}
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
    this.emptyTemplateFirst = this._initEmptyTemplateFirst();
    this.emptyTemplateSecond = this._initEmptyTemplateSecond();
    this.filledCircle = this._initFilledCircle();
    this.sliderCircle = this._initSlideCircle();
    this.rootSVG.appendChild(this.emptyTemplateFirst);
    this.rootSVG.appendChild(this.emptyTemplateSecond);
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

CircularSlider.prototype._initEmptyTemplateFirst = function() {
    const cs  = this._getTemplateCS();
    cs.style.strokeOpacity = "0";

    return cs;
}

CircularSlider.prototype._initEmptyTemplateSecond = function() {
    const cs = this._getTemplateCS();
    cs.style.strokeDasharray = "3, 1";

    return cs;
}

CircularSlider.prototype._getTemplateCS = function() {
    const cs = this._initCircle(this.d, "none");
    cs.style.stroke = "#A9A9A9";
    cs.style.strokeWidth = STROKE_WIDTH + "px";

    return cs;
}

CircularSlider.prototype._initSlideCircle = function() {
    const cs = this._initCircle(DOT_SIZE, "white");
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
	// Fill the slider based on position
	if (this.isDragging) {
		this._colorSlider(this.previousSize, this.sliderSize - this.previousSize);
		return;
	}
	const newSize = this.currentStep * this.stepSize;
	// Animation step
	this._animatedSlide(this.previousSize, newSize);
	
}

CircularSlider.prototype._animatedSlide = function(oldSize, newSize) {
	this._colorSliderCircle(true);
	const step = this.sliderSize / ANIMATED_STEP;
	const isMore = newSize > oldSize;
	const animation = setInterval(() => {
		oldSize = isMore ? oldSize + step : oldSize - step;
		if (this._between(oldSize, newSize, 10)) {
			oldSize = newSize;
			this._colorSliderCircle(false);
			clearInterval(animation);
		}
		this._colorSlider(oldSize, this.sliderSize - oldSize);
	 }, 2);
}

CircularSlider.prototype._colorSlider = function(fill, rest) {
	this.filledCircle.setAttributeNS(null, 'stroke-dasharray', `${fill} ${rest}`);
	this._positionSliderCircle(fill / this.sliderSize);
}

CircularSlider.prototype._positionSliderCircle = function(portion) {
	const radians = 2 * Math.PI * portion;
	const r = this.options.radius - STROKE_WIDTH / 2;
	const x =  Math.cos(radians) * r;
	const y =  Math.sin(radians) * r;
	this.sliderCircle.setAttributeNS(null, "cx", x);
	this.sliderCircle.setAttributeNS(null, "cy", y);
}

CircularSlider.prototype._initHandlers = function() {
	const container = document.getElementById(this.options.container);
	// Pull the slider circle
	container.addEventListener("mousemove", e => this._handleMouseMove(e));
	container.addEventListener("mouseup", e => this._cancelMouseDrag(e));
	this.sliderCircle.addEventListener("mousedown", e => this._handleMouseDown(e));

	// click somewhere on slider
	this.emptyTemplateFirst.addEventListener("click", e => this._filledCircleClicked(e));
	this.emptyTemplateSecond.addEventListener("click", e => this._filledCircleClicked(e));
	this.filledCircle.addEventListener("click", e => this._filledCircleClicked(e));
}

CircularSlider.prototype._filledCircleClicked = function(e) {
	e.preventDefault();
	this.previousSize = this.getCurrentStep * this.stepSize;
	const local = this._transformToLocal(e);
	const newCoords = this._newCoordinates(local.x, local.y);
	const newX = newCoords.x;
	const newY = newCoords.y;
	this._getNewStep(newX, newY);
}

CircularSlider.prototype._getNewStep = function(x, y) {
	const radians = this._getRadians(x, y);
	if (isNaN(radians)) return;

	const portion = radians / (2 * Math.PI);
	const size = this.sliderSize * portion;
	let newStep = size / this.stepSize;
	
	if (this.isDragging) {
		newStep = Math.round(newStep);
		this.previousSize = size;
		this.setCurrentStep = newStep;
	} else {
		newStep = newStep > this.currentStep ?
			Math.ceil(newStep) : Math.floor(newStep);
		this.setCurrentStep = newStep;
	}	
}

CircularSlider.prototype._getRadians = function(x, y) {
	const r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
	let radians = 0;
	if (x >= 0 && y >= 0) {
		radians += Math.asin(Math.abs(y) / r);
	} else if (x <= 0 && y >= 0) {
		radians += Math.PI / 2;
		radians += Math.asin(Math.abs(x) / r);
	} else if (x <= 0 && y <= 0) {
		radians += Math.PI;
		radians += Math.asin(Math.abs(y) / r);
	} else {
		radians += Math.PI * (3 / 2);
		radians += Math.asin(Math.abs(x) / r);
	}

	return radians;
}

CircularSlider.prototype._handleMouseDown = function(e) {
	e.preventDefault();
	this.isDragging = true;
	this._colorSliderCircle(true);

}

CircularSlider.prototype._cancelMouseDrag = function(e) {
	e.preventDefault();
	if (this.isDragging) {
		this.isDragging = false;
		this._colorSliderCircle(false);
		this._getNewStep(this.sliderX, this.sliderY);
	}
	this.isDragging = false;
}

CircularSlider.prototype._handleMouseMove = function(e) {
	e.preventDefault();
	if (this.isDragging) {
		const local = this._transformToLocal(e);
		const dist = Math.sqrt(Math.pow(local.x, 2) + Math.pow(local.y, 2));
		if (!this._between(dist, this.options.radius, STROKE_WIDTH * 2)) {
			this._cancelMouseDrag(e);

			return;
		}
		const newCoords = this._newCoordinates(local.x, local.y);
		this.sliderX = newCoords.x;
		this.sliderY = newCoords.y;
		this._getNewStep(this.sliderX, this.sliderY);
	}
}

CircularSlider.prototype._newCoordinates = function(x, y) {
	const halfPI = Math.PI / 2;
	const newX = Math.cos(halfPI) * x - Math.sin(halfPI) * y;
	const newY = Math.sin(halfPI) * x + Math.cos(halfPI) * y;

	return {
		x: newX,
		y: newY
	};
}

CircularSlider.prototype._between = function(value, os, x) {
	const min = os - x;
	const max = os + x;

	return value >= min && value <= max;
}

CircularSlider.prototype._transformToLocal = function(e) {
	const svg = this.rootSVG.createSVGPoint();
    svg.x = e.clientX;
    svg.y = e.clientY;

    return svg.matrixTransform(this.rootSVG.getScreenCTM().inverse());
}

CircularSlider.prototype._colorSliderCircle = function(moving) {
	const color = moving ? this.getColor : "white";
	this.sliderCircle.setAttributeNS(null, "fill", color);
}