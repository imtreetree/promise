var Promise  = require('./es5/promise.js')
let fs = require('fs')

function read (url){
    return new Promise(function(resolve,reject){
        fs.readFile(url,'utf8',data => {
            console.log(data)
            reject(data) 
        }, reject)
    })
}


read('README.md').then((data)=>{
    console.log(data)
},err=>{
    console.log(err)
})