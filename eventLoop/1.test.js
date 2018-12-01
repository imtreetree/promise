async function a(){

    console.log('async1');

    await b();

    console.log('async1 finish');

}

setTimeout(function(){

    console.log('setTimeout');

},0)
console.log('script start');

a();

async function b(){

    console.log('async 2');

}

new Promise((resolve,reject)=>{

    console.log('promise1');

    resolve();

}).then(()=>{

    console.log('promise2');

})
console.log('script end');