//node中的this的问题
//this指的是global

console.log(this); //模块化，this被重新改写了

function a(){
    // console.log(this)
}
a();
//执行node，可以通过 node+文件名的形式
// js 是单线程的（主线程是单线程的） 一个进程里只有一个主线程

//Buffer 操作文件，默认是操作的内存，内存的表示方式buffer

//setImmediate clearImmediate 宏任务
//setTimeout clearInterval 宏任务
//setInterval clearInterval 宏任务
//console.log(global)
// process 线程被包含在进程中了，计算机分配资源的一个基本单位
//console.log(global.process)
process.cwd(); //当前的工作目录
console.log(process.cwd()) //code runner：/Volumes/Study/promise
//执行的文件夹
console.log(__dirname)
//文件所在的目录 代表当前文件 的文件名，绝对目录
console.log(__filename)
//当前的环境变量，区分线上 和线下的环境变量，
// console.log(process.env)
//设置环境变量 win: set NODE_ENV= dev
//---------- mac: export NODE_ENV  = 'dev' 
let url = ''
if(process.env.NODE_ENV === 'dev'){
    url = 'localhost:8080'
}else {
    url = 'https://www.imtreetree.cn'
}
console.log(url)
// console.log(process.env.NODE_ENV)


console.log(process.argv)
// yargs commander
let r = process.argv.slice(2).reduce((a,b,index,arr)=>{
    if(b.includes('--')){
        a[b.slice(2)] = arr[index + 1]
    }
    return a;
},{})

console.log(r)

// process.nextTick
console.log(process.nextTick) //微任务的，异步的
process.nextTick(()=>{
    console.log('xxx')
})
console.log('ok')
//主执行栈=>微任务=>专门放定时器=>微任务=>专门放io操作的如fs.readFile=>微任务=>setImmediate(check阶段)
