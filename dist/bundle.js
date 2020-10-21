/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_OptionsCircularSlider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _js_CircularSlider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);


/*
	containter
	color
	minValue
	maxValue
	step
	radius
*/
// defined options

var pcs1 = new _js_OptionsCircularSlider__WEBPACK_IMPORTED_MODULE_0__["OptionsCircularSlider"]("sliders", "#730099", 0, 1000, 100, 120);
var pcs2 = new _js_OptionsCircularSlider__WEBPACK_IMPORTED_MODULE_0__["OptionsCircularSlider"]("sliders", "#4d94ff", 0, 100, 5, 100);
var pcs3 = new _js_OptionsCircularSlider__WEBPACK_IMPORTED_MODULE_0__["OptionsCircularSlider"]("sliders", "#2eb82e", 0, 100, 25, 80);
var pcs4 = new _js_OptionsCircularSlider__WEBPACK_IMPORTED_MODULE_0__["OptionsCircularSlider"]("sliders", "#ffa31a", 0, 300, 50, 60);
var pcs5 = new _js_OptionsCircularSlider__WEBPACK_IMPORTED_MODULE_0__["OptionsCircularSlider"]("sliders", "#e62e00", 0, 10, 1, 40); // Circular sliders defined

var cs1 = new _js_CircularSlider__WEBPACK_IMPORTED_MODULE_1__["CircularSlider"](pcs1, function (value) {
  return updateData("trans-val", value);
});
var cs2 = new _js_CircularSlider__WEBPACK_IMPORTED_MODULE_1__["CircularSlider"](pcs2, function (value) {
  return updateData("food-val", value);
});
var cs3 = new _js_CircularSlider__WEBPACK_IMPORTED_MODULE_1__["CircularSlider"](pcs3, function (value) {
  return updateData("insur-val", value);
});
var cs4 = new _js_CircularSlider__WEBPACK_IMPORTED_MODULE_1__["CircularSlider"](pcs4, function (value) {
  return updateData("enter-val", value);
});
var cs5 = new _js_CircularSlider__WEBPACK_IMPORTED_MODULE_1__["CircularSlider"](pcs5, function (value) {
  return updateData("health-val", value);
}); // Init values of data

cs1.setCurrentStep = 1;
updateData("trans-val", cs1.getValue);
cs2.setCurrentStep = 5;
updateData("food-val", cs2.getValue);
cs3.setCurrentStep = 3;
updateData("insur-val", cs3.getValue);
cs4.setCurrentStep = 1;
updateData("enter-val", cs4.getValue);
cs5.setCurrentStep = 1;
updateData("health-val", cs5.getValue); // Init colors of data

document.getElementById("trans-color").style.background = cs1.getColor;
document.getElementById("food-color").style.background = cs2.getColor;
document.getElementById("insur-color").style.background = cs3.getColor;
document.getElementById("enter-color").style.background = cs4.getColor;
document.getElementById("health-color").style.background = cs5.getColor;

function updateData(id, value) {
  document.getElementById(id).innerHTML = "$".concat(value);
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionsCircularSlider", function() { return OptionsCircularSlider; });
var OptionsCircularSlider = function OptionsCircularSlider(container, color, minValue, maxValue, step, radius) {
  this.container = container;
  this.color = color;
  this.minValue = minValue;
  this.maxValue = maxValue;
  this.step = step;
  this.radius = radius;
};

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CircularSlider", function() { return CircularSlider; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
	containter
	color
	minValue
	maxValue
	step
	radius
*/
var STROKE_WIDTH = 10;
var DOT_SIZE = 8;
var ANIMATED_STEP = 600;
var SVG_URL = "http://www.w3.org/2000/svg";
var CircularSlider = /*#__PURE__*/function () {
  function CircularSlider(options, updateData) {
    _classCallCheck(this, CircularSlider);

    this._checkOptions(options);

    this.options = options;
    this.updateData = updateData;
    this.currentStep = 0;
    this.previousSize = 0;

    this._initSlider();

    this._initHandlers();
  }

  _createClass(CircularSlider, [{
    key: "getColor",
    get: function get() {
      return this.options.color;
    }
  }, {
    key: "getCurrentStep",
    get: function get() {
      return this.currentStep;
    }
  }, {
    key: "getValue",
    get: function get() {
      return this.options.minValue + this.currentStep * this.options.step;
    }
  }, {
    key: "setCurrentStep",
    set: function set(newStep) {
      // check if newStep is valid
      if (isNaN(newStep)) return;
      var value = newStep * this.options.step + this.options.minValue;

      if (value > this.options.maxValue) {
        throw new Error("New step is too big");
      } else if (value < this.options.minValue) {
        throw new Error("New step is too small");
      } // Update step value


      this.currentStep = newStep;

      if (typeof this.updateData === "function") {
        this.updateData(this.getValue);
      }

      this._fillSlider();
    }
  }]);

  return CircularSlider;
}();

CircularSlider.prototype._checkOptions = function (options) {
  var s = new Option().style;
  s.color = options.color;

  if (s.color === "") {
    throw new Error("Passed color is not valid.");
  } else if (options.minValue >= options.maxValue) {
    throw new Error("Min value should be less than max value.");
  } else if (options.step > options.maxValue) {
    throw new Error("Step is too big.");
  } else if (options.step < 1) {
    throw new Error("Step should be a positive integer.");
  }
};

CircularSlider.prototype._initSlider = function () {
  this.d = this.options.radius - STROKE_WIDTH / 2;
  var container = document.getElementById(this.options.container);
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
};

CircularSlider.prototype._createRootSVG = function (container) {
  var elSVG = document.createElementNS(SVG_URL, "svg");
  var width = container.offsetWidth;
  elSVG.setAttributeNS(null, "id", "slidersSVG");
  elSVG.setAttributeNS(null, "width", width);
  elSVG.setAttributeNS(null, "height", width);
  elSVG.setAttributeNS(null, "viewBox", "-200 -200 400 400");
  return elSVG;
};

CircularSlider.prototype._initCircle = function (r, fill) {
  var cs = document.createElementNS(SVG_URL, "circle");
  cs.setAttributeNS(null, "cx", 0);
  cs.setAttributeNS(null, "cy", 0);
  cs.setAttributeNS(null, "r", r);
  cs.setAttributeNS(null, "fill", fill);
  cs.setAttributeNS(null, 'transform', 'rotate(-90)');
  return cs;
};

CircularSlider.prototype._initEmptyTemplateFirst = function () {
  var cs = this._getTemplateCS();

  cs.style.strokeOpacity = "0";
  return cs;
};

CircularSlider.prototype._initEmptyTemplateSecond = function () {
  var cs = this._getTemplateCS();

  cs.style.strokeDasharray = "3, 1";
  return cs;
};

CircularSlider.prototype._getTemplateCS = function () {
  var cs = this._initCircle(this.d, "none");

  cs.style.stroke = "#A9A9A9";
  cs.style.strokeWidth = STROKE_WIDTH + "px";
  return cs;
};

CircularSlider.prototype._initSlideCircle = function () {
  var cs = this._initCircle(DOT_SIZE, "white");

  cs.style.stroke = "	#A8A8A8";
  return cs;
};

CircularSlider.prototype._initFilledCircle = function () {
  this.sliderSize = 2 * Math.PI * (this.options.radius - STROKE_WIDTH / 2);
  var totalSteps = (this.options.maxValue - this.options.minValue) / this.options.step;
  this.stepSize = this.sliderSize / totalSteps;

  var cs = this._initCircle(this.d, "none");

  cs.style.stroke = this.getColor;
  cs.style.strokeWidth = STROKE_WIDTH + "px";
  return cs;
};

CircularSlider.prototype._fillSlider = function () {
  // Fill the slider based on position
  if (this.isDragging) {
    this._colorSlider(this.previousSize, this.sliderSize - this.previousSize);

    return;
  }

  var newSize = this.currentStep * this.stepSize; // Animation step

  this._animatedSlide(this.previousSize, newSize);
};

CircularSlider.prototype._animatedSlide = function (oldSize, newSize) {
  var _this = this;

  this._colorSliderCircle(true);

  var step = this.sliderSize / ANIMATED_STEP;
  var isMore = newSize > oldSize;
  var animation = setInterval(function () {
    oldSize = isMore ? oldSize + step : oldSize - step;

    if (_this._between(oldSize, newSize, 10)) {
      oldSize = newSize;

      _this._colorSliderCircle(false);

      clearInterval(animation);
    }

    _this._colorSlider(oldSize, _this.sliderSize - oldSize);
  }, 2);
};

CircularSlider.prototype._colorSlider = function (fill, rest) {
  this.filledCircle.setAttributeNS(null, 'stroke-dasharray', "".concat(fill, " ").concat(rest));

  this._positionSliderCircle(fill / this.sliderSize);
};

CircularSlider.prototype._positionSliderCircle = function (portion) {
  var radians = 2 * Math.PI * portion;
  var r = this.options.radius - STROKE_WIDTH / 2;
  var x = Math.cos(radians) * r;
  var y = Math.sin(radians) * r;
  this.sliderCircle.setAttributeNS(null, "cx", x);
  this.sliderCircle.setAttributeNS(null, "cy", y);
};

CircularSlider.prototype._initHandlers = function () {
  var _this2 = this;

  var container = document.getElementById(this.options.container); // Pull the slider circle

  container.addEventListener("mousemove", function (e) {
    return _this2._handleMouseMove(e);
  });
  container.addEventListener("mouseup", function (e) {
    return _this2._cancelMouseDrag(e);
  });
  this.sliderCircle.addEventListener("mousedown", function (e) {
    return _this2._handleMouseDown(e);
  }); // click somewhere on slider

  this.emptyTemplateFirst.addEventListener("click", function (e) {
    return _this2._filledCircleClicked(e);
  });
  this.emptyTemplateSecond.addEventListener("click", function (e) {
    return _this2._filledCircleClicked(e);
  });
  this.filledCircle.addEventListener("click", function (e) {
    return _this2._filledCircleClicked(e);
  }); // touch events

  container.addEventListener("touchmove", function (e) {
    return _this2._handleMouseMove(e);
  });
  container.addEventListener("touchend", function (e) {
    return _this2._cancelMouseDrag(e);
  });
  this.sliderCircle.addEventListener("touchstart", function (e) {
    return _this2._handleMouseDown(e);
  });
  this.emptyTemplateFirst.addEventListener("touchend", function (e) {
    return _this2._filledCircleClicked(e);
  });
  this.emptyTemplateSecond.addEventListener("touchend", function (e) {
    return _this2._filledCircleClicked(e);
  });
  this.filledCircle.addEventListener("touchend", function (e) {
    return _this2._filledCircleClicked(e);
  });
};

CircularSlider.prototype._filledCircleClicked = function (e) {
  e.preventDefault();
  this.previousSize = this.getCurrentStep * this.stepSize;

  var local = this._transformToLocal(e);

  var newCoords = this._newCoordinates(local.x, local.y);

  var newX = newCoords.x;
  var newY = newCoords.y;

  this._getNewStep(newX, newY);
};

CircularSlider.prototype._getNewStep = function (x, y) {
  var radians = this._getRadians(x, y);

  if (isNaN(radians)) return;
  var portion = radians / (2 * Math.PI);
  var size = this.sliderSize * portion;
  var newStep = size / this.stepSize;

  if (this.isDragging) {
    newStep = Math.round(newStep);
    this.previousSize = size;
    this.setCurrentStep = newStep;
  } else {
    newStep = newStep > this.currentStep ? Math.ceil(newStep) : Math.floor(newStep);
    this.setCurrentStep = newStep;
  }
};

CircularSlider.prototype._getRadians = function (x, y) {
  var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  var radians = 0;

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
};

CircularSlider.prototype._handleMouseDown = function (e) {
  e.preventDefault();
  this.isDragging = true;

  this._colorSliderCircle(true);
};

CircularSlider.prototype._cancelMouseDrag = function (e) {
  e.preventDefault();

  if (this.isDragging) {
    this.isDragging = false;

    this._colorSliderCircle(false);

    this._getNewStep(this.sliderX, this.sliderY);
  }

  this.isDragging = false;
};

CircularSlider.prototype._handleMouseMove = function (e) {
  console.log("MOVE");
  e.preventDefault();

  if (this.isDragging) {
    var local = this._transformToLocal(e);

    var dist = Math.sqrt(Math.pow(local.x, 2) + Math.pow(local.y, 2));

    if (!this._between(dist, this.options.radius, STROKE_WIDTH * 2)) {
      this._cancelMouseDrag(e);

      return;
    }

    var newCoords = this._newCoordinates(local.x, local.y);

    this.sliderX = newCoords.x;
    this.sliderY = newCoords.y;

    this._getNewStep(this.sliderX, this.sliderY);
  }
};

CircularSlider.prototype._newCoordinates = function (x, y) {
  var halfPI = Math.PI / 2;
  var newX = Math.cos(halfPI) * x - Math.sin(halfPI) * y;
  var newY = Math.sin(halfPI) * x + Math.cos(halfPI) * y;
  return {
    x: newX,
    y: newY
  };
};

CircularSlider.prototype._between = function (value, os, x) {
  var min = os - x;
  var max = os + x;
  return value >= min && value <= max;
};

CircularSlider.prototype._transformToLocal = function (e) {
  var svg = this.rootSVG.createSVGPoint();

  if (e.clientX !== undefined) {
    svg.x = e.clientX;
    svg.y = e.clientY;
  } else {
    svg.x = e.changedTouches[0].clientX;
    svg.y = e.changedTouches[0].clientY;
  }

  return svg.matrixTransform(this.rootSVG.getScreenCTM().inverse());
};

CircularSlider.prototype._colorSliderCircle = function (moving) {
  var color = moving ? this.getColor : "white";
  this.sliderCircle.setAttributeNS(null, "fill", color);
};

/***/ })
/******/ ]);