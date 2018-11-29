var Promise  = require('./es5/promise.js')
let fs = require('fs')

function read (url){
    return new Promise((resolve,reject) => {
        fs.readFile(url,'utf8',data => {
            console.log(data)
            resolve(data) 
        }, err=>{
            reject(err)
        })
    })
}


read('./1.txt').then((data)=>{
    console.log(data)
},err=>{
    console.log(err)
})