// find findIndex
// forEach map reduce some every

//reduce 收敛 reduceRight
let r = [1, 2, 3, 4, 5].reduce((prev, next, currentIndex, arr) => {
    return prev + next
})
let r2 = [{ price: 1, count: 2 }, { price: 5, count: 3 }, { price: 6, count: 7 }].reduce((prev, next, currentIndex, arr) => {
    // return prev.price* prev.count + next.price* next.count ////2个可以，但是多个就不可以
    return prev + next.price * next.count
}, 0)
let r3 = [{ price: 1, count: 2 }, { price: 5, count: 3 }, { price: 6, count: 7 }].reduceRight((prev, next, currentIndex, arr) => {
    // return prev.price* prev.count + next.price* next.count ////2个可以，但是多个就不可以
    return prev + next.price * next.count
}, 0)
console.log(r3)

//把结果聚合起来
//compose组合 
function sum(a, b) {
    return a + b
}
function toUpper(str) {
    return str.toUpperCase()
}
function add(str) {
    return 'he' + str
}

let str = add(toUpper(sum('a', 'b')))
console.log(str)


let compose = (...fns) => (...args) => { //二阶函数
    let fn = fns.pop() //取出最后一个函数sum
    let r = fn(...args) //把sum的执行结果存储
    console.log(r)
    return fns.reduceRight((prev, next) => next(prev), r) //把sum的执行结果当作reduce的第一项也就是prev,然后作为下一项函数的参数next(prev)
}
let fn = compose(add, toUpper, sum) //先传给sum,再把结果传给中间的，再传到 最前面

let compose2 = (...fns) => { //redux源码中的
    //正向的reduce 最终的收敛结果需要是一个函数
    return fns.reduce((prev, next) => (...args) => {
        return prev(next(...args))
    })
}
let fn2 = compose2(add, toUpper, sum) //先传给sum,再把结果传给中间的，再传到 最前面
console.log(fn('a', 'b'))
console.log(fn2('a', 'b'))


Array.prototype.reduce = function (callback, prev) {
    for (let i = 0; i < this.length; i++) {
        if (prev != null) {
            prev = callback(prev, this[i], i, this)
        } else {
            prev = callback(this[i], this[i + 1], i, this);
            i++;//如果没有prev,内部会迭代两次，所以迭代后i++
        }
    }
    return prev
}
let su = [1, 2, 3].reduce((a, b) => (a + b))
console.log(su)


//map 映射 
let mp = [1, 2, 3].map((item) => `<li>
${item * 2}
/li>`)
console.log(mp)