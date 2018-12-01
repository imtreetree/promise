// set 数组里可以放重复的项 set不能放重复的

let arr = [1, 2, 3, 4, 1, 2, 3]
let s = new Set(arr)
console.log(s)
//npx babel es6/3.set\&map.js -o newSet.js --watch
s.add(5)
// console.log(s)
// console.log(s.entries())
// console.log(s.keys())
let arr2 = [1, 2, 3, 5]
console.log(Object.keys(arr2))
console.log(Object.values(arr2))
let obj = { name: 'hehe', age: 9 }
console.log(Object.values(obj))

//迭代方法
s.forEach(item => {
    // console.log(item)
})
//有迭代器属性 的都可以 使用for of 来迭代
for (let value of s) {
    // console.log(value)
}

//看两个数组的并集
let arr3 = [1, 2, 3]
let arr4 = [3, 4, 5]
let s1 = new Set([...arr3, ...arr4])
console.log([...s1])

//交集， 1.先去重复，2.filter如果返回 是true,留下 ，否则删除
let s3 = new Set(arr3)
let s4 = new Set(arr4)

let arr5 = [...s3].filter(item => {
    // return s4.has(item) //改成非 !s4.has(item)就是差集
    return !s4.has(item)
})
console.log('---')
console.log(arr5)

//差集 看上面的注释

let map = new Map([['node', '---']])
map.set('js', 'xxx')
console.log(map)
//和set 一样,不能放重复的
