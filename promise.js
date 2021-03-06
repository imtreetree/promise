/**
 * promise lib by es6
 */
const PENDING = 'pending';
const FULLFILLED = 'fulfilled';
const REJECTED = 'rejected';

class Promise {

    constructor(executor) {
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
        let resolve = (value)=> {
            if (this.status === PENDING) {
                this.value = value;
                this.status = FULLFILLED;
                this.onResolvedCallback.forEach(fn => {
                    fn();
                });
            }
        }

       let  reject = (reason) => {
            if(this.status === PENDING){
                this.reason = reason;
                this.status = REJECTED;
                this.onRejectedCallback.forEach(fn =>{
                    fn();
                })
            }
        }

        try {
            //如果执行这个executor执行时抛出异常应该走下一个then的失败
            executor(resolve, reject)

        } catch (error) {
            this.reject(error)
        }
    }


    /**
     * 核心方法 处理
     * @param {*} promise2 
     * @param {*} x 
     * @param {*} resolve 
     * @param {*} reject 
     */
    resolvePromise(promise2, x, resolve, reject){
        if(promise2 === x){
            return reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
        }
        let called;
        if((x != null && typeof x === 'object') || typeof x === 'function'){
            try {
                let then = x.then
                if(typeof then === 'function'){
                    then.call(x, y=>{
                        if(!called){ called = true } else { return; }
                        this.resolvePromise(x, y, resolve, reject)
                    }, r => {
                        if(!called){ called = true; } else { return; }
                        reject(r)
                    })
                }else {
                    resolve(x)
                }
            } catch (error) {
                if(!called) { called = true;} else { return; }
                reject(error)
            }
        }else {
            resolve(x)
        }
    }

    /**
     * 链接调用
     * @param {*} onFulfilled 
     * @param {*} onRejected 
     */
    then(onFulfilled, onRejected){
        onFulfilled = typeof onFulfilled === 'function'? onFulfilled: data => { return data }
        onRejected = typeof onRejected === 'function'? onRejected: error => { throw error }
        
        let promise2;
        promise2 = new Promise((resolve, reject) =>{
            if(this.status === FULLFILLED){
                setTimeout(()=>{
                    try {
                        let x = onFulfilled(this.value)
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            }

            if(this.status === REJECTED){
                setTimeout(()=>{
                    try {
                        let x = onRejected(self.reason);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                },0)
            }

            if(this.status === PENDING){
                this.onResolvedCallback.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x = onFulfilled(this.value)
                            this.resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                })

                this.onRejectedCallback.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x = onRejected(self.reason)
                            this.resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                            
                        }
                    }, 0)
                })
            }
        })

        return promise2
    }

    catch(onRejected){
        return this.then(null, onRejected)
    }

    finally(cb){
        return this.then(data=>{
            cb();
            return data;

        },err=>{
            cb();
            throw err;
        })
    }

    static reject(reason) {
        return new Promise((resolve, reject) =>{
          reject(reason);
        })
      }
    static resolve(value) {
    return new Promise((resolve, reject) =>{
        resolve(value);
    })
    }

    static all(promises){
        return new Promise((resolve, reject)=>{
            let arr =[]
            let i=0
           function processData(index, data){
             arr[index] = data;
             if(++i === promises.length){
                 resolve(arr)
             }
            }
            for(let i = 0;i<promises.length ;i++){
                let promise = promises[i]
                if(typeof promise.then == 'function'){
                    promise.then(data=>{
                        processData(i, data)
                    }, reject)
                }else{
                    processData(i, promise)
                }
            }
        })
    }

    race(promises){
        return new Promise((resolve, reject)=>{
            for(let i=0;i<promises.length; i++){
                let promise = promises[i];
                if(typeof promise.then == 'function'){
                    promise.then(resolve, reject)
                } else{
                    resolve(promise)
                }
            }
        })
    }
}
Promise.deferred = Promise.defer = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })

    return dfd
}
module.exports = Promise

