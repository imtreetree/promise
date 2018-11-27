//解构赋值 有声明和赋值两个作用
let obj = { name:'hehe', age:9 }
let { name:n , address='beijing'} = obj
console.log(n)
console.log() //原来的就没有用了
console.log(address);//undefined,有默认值 的会直接输出 

let arr = [ 1,2,3,{ name: 'hehe'} ]
let [,,,{name}] = arr
console.log(name)

let { length } = [1,2,3]
console.log(length)

//class