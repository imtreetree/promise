let bluebird = require('bluebird')
let fs = require('fs')
// bluebird.promisifyAll(fs)
let read = bluebird.promisify(fs.readFile)
read('package.json','utf8').then(data =>{
   // console.log(data)
})

// async , await
// 1. 解决异步的缺陷 2.回调地狱 3.同步异步的结果 4. try/catch
async function readResult(url){
    let r1 = await read(url, 'utf8');
    let r2 = await read(r1, 'utf8');
    return r2
}
// async返回的也是一个Promise
readResult('./1.txt').then(data =>{
   // console.log(data)
})

//Promise All
function readAll(params){
    read1();
    read2();
}

async function read1(){
    let r = await read('1.txt','utf8')
    console.log(r)
}

async function read2(){
    let r = await read('2.txt','utf8')
    console.log(r)
}

 // readAll();

async function fn(){
    let t = await Promise.all([read('1.txt','utf8'),read('2.txt','utf8')])
    console.log(t)
}

fn();

// await 后面可以跟任何，如果1，会被自动 包裹 成 Promise.resolve(1)

async function fn(){
    await 1;
    await 2;
}