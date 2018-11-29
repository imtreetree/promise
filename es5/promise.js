'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * promise lib by es6
 */
var PENDING = 'pending';
var FULLFILLED = 'fulfilled';
var REJECTED = 'rejected';

var Promise = function () {
    function Promise(executor) {
        var _this = this;

        _classCallCheck(this, Promise);

        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallback = [];
        this.onRejectedCallback = [];
        this.deferred = this.defer;

        /**
         * 只有状态是pending时，才能进行状态的转化
         * @param {*} value 
         */
        var resolve = function resolve(value) {
            if (_this.status === PENDING) {
                _this.value = value;
                _this.status = FULLFILLED;
                _this.onResolvedCallback.forEach(function (fn) {
                    fn();
                });
            }
        };

        var reject = function reject(reason) {
            if (_this.status === PENDING) {
                _this.reason = reason;
                _this.status = REJECTED;
                _this.onRejectedCallback.forEach(function (fn) {
                    fn();
                });
            }
        };

        try {
            //如果执行这个executor执行时抛出异常应该走下一个then的失败
            executor(resolve, reject);
        } catch (error) {
            this.reject(error);
        }
    }

    /**
     * 核心方法 处理
     * @param {*} promise2 
     * @param {*} x 
     * @param {*} resolve 
     * @param {*} reject 
     */


    _createClass(Promise, [{
        key: 'resolvePromise',
        value: function resolvePromise(promise2, x, resolve, reject) {
            var _this2 = this;

            if (promise2 === x) {
                return reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'));
            }
            var called = void 0;
            if (x != null && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' || typeof x === 'function') {
                try {
                    var then = x.then;
                    if (typeof then === 'function') {
                        then.call(x, function (y) {
                            if (!called) {
                                called = true;
                            } else {
                                return;
                            }
                            _this2.resolvePromise(x, y, resolve, reject);
                        }, function (r) {
                            if (!called) {
                                called = true;
                            } else {
                                return;
                            }
                            reject(r);
                        });
                    } else {
                        resolve(x);
                    }
                } catch (error) {
                    if (!called) {
                        called = true;
                    } else {
                        return;
                    }
                    reject(error);
                }
            } else {
                resolve(x);
            }
        }

        /**
         * 链接调用
         * @param {*} onFulfilled 
         * @param {*} onRejected 
         */

    }, {
        key: 'then',
        value: function then(onFulfilled, onRejected) {
            var _this3 = this;

            onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (data) {
                return data;
            };
            onRejected = typeof onRejected === 'function' ? onRejected : function (error) {
                throw error;
            };

            var promise2 = void 0;
            promise2 = new Promise(function (resolve, reject) {
                if (_this3.status === FULLFILLED) {
                    setTimeout(function () {
                        try {
                            var x = onFulfilled(_this3.value);
                            _this3.resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                }

                if (_this3.status === REJECTED) {
                    setTimeout(function () {
                        try {
                            var x = onRejected(self.reason);
                            _this3.resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                }

                if (_this3.status === PENDING) {
                    _this3.onResolvedCallback.push(function () {
                        setTimeout(function () {
                            try {
                                var x = onFulfilled(_this3.value);
                                _this3.resolvePromise(promise2, x, resolve, reject);
                            } catch (error) {
                                reject(error);
                            }
                        }, 0);
                    });

                    _this3.onRejectedCallback.push(function () {
                        setTimeout(function () {
                            try {
                                var x = onRejected(self.reason);
                                _this3.resolvePromise(promise2, x, resolve, reject);
                            } catch (error) {
                                reject(error);
                            }
                        }, 0);
                    });
                }
            });

            return promise2;
        }
    }, {
        key: 'catch',
        value: function _catch(onRejected) {
            return this.then(null, onRejected);
        }
    }, {
        key: 'finally',
        value: function _finally(cb) {
            return this.then(function (data) {
                cb();
                return data;
            }, function (err) {
                cb();
                throw err;
            });
        }
    }, {
        key: 'race',
        value: function race(promises) {
            return new Promise(function (resolve, reject) {
                for (var i = 0; i < promises.length; i++) {
                    var promise = promises[i];
                    if (typeof promise.then == 'function') {
                        promise.then(resolve, reject);
                    } else {
                        resolve(promise);
                    }
                }
            });
        }
    }], [{
        key: 'reject',
        value: function reject(reason) {
            return new Promise(function (resolve, reject) {
                reject(reason);
            });
        }
    }, {
        key: 'resolve',
        value: function resolve(value) {
            return new Promise(function (resolve, reject) {
                resolve(value);
            });
        }
    }, {
        key: 'all',
        value: function all(promises) {
            return new Promise(function (resolve, reject) {
                var arr = [];
                var i = 0;
                function processData(index, data) {
                    arr[index] = data;
                    if (++i === promises.length) {
                        resolve(arr);
                    }
                }

                var _loop = function _loop(_i) {
                    var promise = promises[_i];
                    if (typeof promise.then == 'function') {
                        promise.then(function (data) {
                            processData(_i, data);
                        }, reject);
                    } else {
                        processData(_i, promise);
                    }
                };

                for (var _i = 0; _i < promises.length; _i++) {
                    _loop(_i);
                }
            });
        }
    }]);

    return Promise;
}();

Promise.deferred = Promise.defer = function () {
    var dfd = {};
    dfd.promise = new Promise(function (resolve, reject) {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });

    return dfd;
};
module.exports = Promise;
