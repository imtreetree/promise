// let ,const
//声明变量 变量提升及 预解释 
console.log(a)
 var a = 1;
var a = 2;
// console.log(window.a)

//let 
// console.log(b); //b is not defined
// let b = 1;
let b = 2; // Identifier 'b' has already been declared
// 通过let 生成的不会污染全局变量
// console.log(window.b)

{
    var c = 2
}
console.log(c)
let d = 8
{
   // console.log(d); // d is not defined 暂存死区
    let d = 3
}
console.log(d)

// console.log(fn1) // undefined
{
    function fn1(){ // ===> var fn1 = function(){ } 会编译成这种，所以上面打印会undefined

    }
}

for(let i = 0; i< 10;i++){ // let 有作用域 0，1，2，3，4...,如果是var .
    setTimeout(()=>{
       // console.log(i)
    }, 0)
}

//可以把所有的变量变成 var ,不可改的用const
//...可以叫扩展、展开运算符 ，剩余运算符函数 
//剩余运算符号，只能放最后一项。Rest parameter must be last formal parameter
function sum (...args){
    let arr = [1, 2]
    console.log(...args)
    return [...arr,...args]

}


console.log(sum (1,2,3,4,5))
//合并两个对象
let school = { name: 'hehe', age: 9, a:null, d:new Date(), reg:/reg/,fn: function(){}}
let address = { address: 'Beijing'}
//只能展开一层，超过一层就不行了，需要不停的展开拷贝
let obj = {...school, ...address, age: 23} // 浅拷贝，age会覆盖原来的地址
console.log(obj)
//缺陷：深拷贝，拷贝的不是引用地址
//     浅拷贝，
let abc = [1];
let arr = [abc,2,3,4 ]
let newArr = arr

// 要把一个对象生成一个一样的，还不能有引用关系
let newSchool = JSON.parse(JSON.stringify(school)) //但是会忽略 掉 对象中的函数，以及reg等等
console.log(newSchool)