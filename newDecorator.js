"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//装饰器
var Circle = function Circle() {
  _classCallCheck(this, Circle);

  _defineProperty(this, "PI", 3.14);
};

var c = new Circle();
c.PI = 3.15;
console.log(c);
