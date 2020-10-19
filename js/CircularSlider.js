/*
	containter
	color
	minValue
	maxValue
	step
	radius
*/

const CircularSlider = function(options) {
	this._checkOptions(options);
	this.options = options;
	
	this.currentStep = 0;
}

CircularSlider.prototype.updateCurrentStep = function(newStep) {
	const value = newStep * this.options.step;
	if (value > this.options.maxValue) {
		 throw new Error("New step is too big");
	} else if (value < this.options.minValue) {
		throw new Error("New step is too small");
	}
	this.currentStep = newStep;
}

CircularSlider.prototype.getFormatedValue = function(newStep) {
	if (newStep !== this.currentStep) {
		this.updateCurrentStep(newStep);
	}
	return "$" + (this.currentStep * this.options.step);
}

CircularSlider.prototype.getColor = function() {
	return this.options.color;
}


CircularSlider.prototype._checkOptions = function(options) {
	const s = new Option().style;
  	s.color = options.color;
  	console.log(options.step);
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