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
        _classCallCheck(this, Promise);

        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallback = [];
        this.onRejectedCallback = [];
        this.deferred = this.defer;
        try {
            //如果执行这个executor执行时抛出异常应该走下一个then的失败
            executor(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
    }

    /**
     * 只有状态是pending时，才能进行状态的转化
     * @param {*} value 
     */


    _createClass(Promise, [{
        key: 'resolve',
        value: function resolve(value) {
            if (this.status === PENDING) {
                this.value = value;
                this.status = FULLFILLED;
                this.onResolvedCallback.forEach(function (fn) {
                    fn();
                });
            }
        }
    }, {
        key: 'reject',
        value: function reject(reason) {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;
                this.onRejectedCallback.forEach(function (fn) {
                    fn();
                });
            }
        }
        /**
         * 核心方法 处理
         * @param {*} promise2 
         * @param {*} x 
         * @param {*} resolve 
         * @param {*} reject 
         */

    }, {
        key: 'resolvePromise',
        value: function resolvePromise(promise2, x, resolve, reject) {
            var _this = this;

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
                            _this.resolvePromise(x, y, resolve, reject);
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
            var _this2 = this;

            onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (data) {
                return data;
            };
            onRejected = typeof onRejected === 'function' ? onRejected : function (error) {
                throw error;
            };

            var promise2 = void 0;
            promise2 = new Promise(function (resolve, reject) {
                if (_this2.status === FULLFILLED) {
                    setTimeout(function () {
                        try {
                            var x = onFulfilled(_this2.value);
                            _this2.resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                }

                if (_this2.status === REJECTED) {
                    setTimeout(function () {
                        try {
                            var x = onRejected(self.reason);
                            _this2.resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                }

                if (_this2.status === PENDING) {
                    _this2.onResolvedCallback.push(function () {
                        setTimeout(function () {
                            try {
                                var x = onFulfilled(_this2.value);
                                _this2.resolvePromise(promise2, x, resolve, reject);
                            } catch (error) {
                                reject(error);
                            }
                        }, 0);
                    });

                    _this2.onRejectedCallback.push(function () {
                        setTimeout(function () {
                            try {
                                var x = onRejected(self.reason);
                                _this2.resolvePromise(promise2, x, resolve, reject);
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
        key: 'defer',
        value: function defer() {
            var dfd = {};
            dfd.promise = new Promise(function (resolve, reject) {
                dfd.resolve = resolve;
                dfd.reject = reject;
            });

            return dfd;
        }
    }]);

    return Promise;
}();
