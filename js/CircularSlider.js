/*
	containter
	color
	minValue
	maxValue
	step
	radius
*/
const STROKE_WIDTH = 15;
const DOT_SIZE = 10;
const SVG_URL = "http://www.w3.org/2000/svg";

class CircularSlider {

	constructor(options, updateData) {
		this._checkOptions(options);
		this.options = options;
		this.updateData = updateData;

		this.previousStep = 0;
		this.currentStep = 0;
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
		if (newStep === this.currentStep || isNaN(newStep)) return;
		const value = newStep * this.options.step + this.options.minValue;
		if (value > this.options.maxValue) {
			throw new Error("New step is too big");
		} else if (value < this.options.minValue) {
			throw new Error("New step is too small");
		}

		// Update step value
		this.previousStep = this.currentStep;
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
    cs.style.stroke = "#C8C8C8";
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

CircularSlider.prototype._fillSlider = function(fill) {
	if (!isNaN(fill)) {
		this._colorSlider(fill, this.sliderSize - fill);
		return;
	}
	let oldFill = this.previousStep * this.stepSize;
	const newFill = this.currentStep * this.stepSize;
	const step = this.sliderSize / 500;
	const isMore = newFill > oldFill;
	this._colorSliderCircle(true);
	const animation = setInterval(() => {
		oldFill = isMore ? oldFill + step : oldFill - step;
		if (this.between(oldFill, newFill, 10)) {
			oldFill = newFill;
			this._colorSliderCircle(false);
			clearInterval(animation);
		}
		this._colorSlider(oldFill, this.sliderSize - oldFill);
	 }, 5);
	
}

CircularSlider.prototype._colorSlider = function(color, rest) {
	this.filledCircle.setAttributeNS(null, 'stroke-dasharray', `${color} ${rest}`);
	this._positionSliderCircle(color / this.sliderSize);
}

CircularSlider.prototype._positionSliderCircle = function(portion) {
	const radians = 2 * Math.PI * portion; // 2PI radians = 360 degrees
	const r = this.options.radius - STROKE_WIDTH / 2;
	const x =   Math.cos(radians) * r;
	const y  =   Math.sin(radians) * r;
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
	const svgPoint = this.rootSVG.createSVGPoint();
	const localCoords = this._transformToLocal(svgPoint, e);
	const x = localCoords.x;
	const y = localCoords.y;
	const newX = Math.cos(Math.PI / 2) * x - Math.sin(Math.PI / 2) * y;
	const newY = Math.sin(Math.PI / 2) * x + Math.cos(Math.PI / 2) * y;
	this._getNewStep(newX, newY);
}

CircularSlider.prototype._getNewStep = function(x, y) {
	const r = this.options.radius;
	let radians = 0;
	if (x >= 0 && y >= 0) {
		radians += Math.asin(Math.abs(y) / r);
	} else if (x <= 0 && y >= 0) {
		radians += Math.PI / 2
		radians += Math.asin(Math.abs(x) / r);
	} else if (x <= 0 && y <= 0) {
		radians += Math.PI
		radians += Math.asin(Math.abs(y) / r);
	} else {
		radians += Math.PI * (3 / 2);
		radians += Math.asin(Math.abs(x) / r);
	}
	if (isNaN(radians)) return;

	const portion = radians / (2 * Math.PI);
	const fillSize = this.sliderSize * portion;
	let newStep = fillSize / this.stepSize;
	newStep = newStep > this.currentStep ? Math.ceil(newStep) : Math.floor(newStep);
	if (!this.isDragging) {
		this.setCurrentStep = newStep;
		// Callback for data legend
		if (typeof this.updateData === "function") {
			this.updateData(this.getValue);
		}
	} else {
		this.currentStep = newStep;
		this._fillSlider(fillSize);
	}	
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
		const svgPoint = this.rootSVG.createSVGPoint();
		const localCoords = this._transformToLocal(svgPoint, e);
		const x = localCoords.x;
		const y = localCoords.y;
		const dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
		if (!this.between(dist, this.options.radius, STROKE_WIDTH * 2)) {
			this._cancelMouseDrag(e);
			return;
		}
		this.sliderX = Math.cos(Math.PI / 2) * x - Math.sin(Math.PI / 2) * y;
		this.sliderY = Math.sin(Math.PI / 2) * x + Math.cos(Math.PI / 2) * y;
		this._getNewStep(this.sliderX, this.sliderY);
	}
}

CircularSlider.prototype.between = function(value, os, x) {
	const min = os - x;
	const max = os + x;
	return value >= min && value <= max;
}

CircularSlider.prototype._transformToLocal = function(svg, e) {
    svg.x = e.clientX;
    svg.y = e.clientY;
    return svg.matrixTransform(this.rootSVG.getScreenCTM().inverse());
}

CircularSlider.prototype._colorSliderCircle = function(moving) {
	const color = moving ? this.getColor : "white";
	this.sliderCircle.setAttributeNS(null, "fill", color);
}