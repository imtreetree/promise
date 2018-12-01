//node 的eventLoop
Promise.resolve().then(()=>{
    console.log('then1')
    setTimeout(()=>{
        console.log('time1')
    },0)
})

setTimeout(()=>{
    console.log('time2')
    Promise.resolve().then(()=>{
        console.log('then2')
    })
},0)

//then1 timer2 then2 time1也可能是then1 timer2 time1 then2
//1. 微任务，then1放进去，2. time2宏任务，此时可能time1到时间 了，也可能没到，所以到时间了就会time2, time1依次执行完再切换，到then2的微任务


setTimeout(()=>{
    console.log('setTimeout')
},0)

setImmediate(()=>{
    console.log('setImmediate')
})

let fs = require('fs')
fs.readFile('.gitignore','utf8',function(){
    setTimeout(()=>{
        console.log('timeout')
    },0)
    setImmediate(()=>{
        console.log('setImmediate')
    })
})