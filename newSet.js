"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// set 数组里可以放重复的项 set不能放重复的
var arr = [1, 2, 3, 4, 1, 2, 3];
var s = new Set(arr);
console.log(s); //npx babel es6/3.set\&map.js -o newSet.js --watch

s.add(5); // console.log(s)
// console.log(s.entries())
// console.log(s.keys())

var arr2 = [1, 2, 3, 5];
console.log(Object.keys(arr2));
console.log(Object.values(arr2));
var obj = {
  name: 'hehe',
  age: 9
};
console.log(Object.values(obj)); //迭代方法

s.forEach(function (item) {// console.log(item)
}); //有迭代器属性 的都可以 使用for of 来迭代

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = s[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var value = _step.value;
  } // console.log(value)
  //看两个数组的并集

} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return != null) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

var arr3 = [1, 2, 3];
var arr4 = [3, 4, 5];
var s1 = new Set(arr3.concat(arr4));
console.log(_toConsumableArray(s1)); //交集， 1.先去重复，2.filter如果返回 是true,留下 ，否则删除

var s3 = new Set(arr3);
var s4 = new Set(arr4);

var arr5 = _toConsumableArray(s3).filter(function (item) {
  // return s4.has(item) //改成非 !s4.has(item)就是差集
  return !s4.has(item);
});

console.log('---');
console.log(arr5); //差集 看上面的注释

var map = new Map([['node', '---']]);
map.set('js', 'xxx');
console.log(map); //和set 一样,不能放重复的
