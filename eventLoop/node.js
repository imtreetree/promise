//node 优势 单线程-异步
// java 多线程，同步的
// eventLoop 事件循环
var i=1
setTimeout(()=>{
    i = i++
    setTimeout(()=>{
        i = i++
        console.log('2hah')
    },0) //写0也未必是0，会默认是4
    console.log('0')
},0)
setTimeout(()=>{
    i = i++
    console.log('1')
},0)

setTimeout(()=>{
    i = i++
    console.log('3')
},0)
//会把栈中的代码全部执行后，取出 队列中的第一个执行，执行完后，再去取第二个
setTimeout(()=>{ //宏任务
    // console.log('settimeout')
})
Promise.resolve().then(()=>{ //微任务
    // console.log('then1')
})
Promise.resolve().then(()=>{
   // console.log('then2')
})
//浏览器的eventLoop会将微任务全部执行完，再执行宏任务

Promise.resolve().then(()=>{
    console.log('then1')
    setTimeout(()=>{ //宏任务
        console.log('time1')
    })
})
setTimeout(()=>{ //宏任务
    console.log('time2')
    Promise.resolve().then(()=>{
        console.log('then2')
       
    })
})
//then1 time 2 then2 time1
//浏览器的机制就是先执行栈中的微任务和宏任务的回调会分开存放，
// 栈中执行完毕 会执行所有的微任务
//取出在队列中的第一个宏任务，执行后会在清空微任务，依次循环执行
// 宏任务macroTast有哪些 ？ setTimeout ,setImmediate只有IE, MessageChannel做异步的
//微任务microTast有哪些 ？ then, MutationObserver是H5的特性

//vue 中的nextTick怎么实现的