// let a = require('./a');
let path = require('path')
let fs  = require('fs')
let vm = require('vm')


let r = req('./a.json')
let n = req('./a.js')
console.log(n)




//手写一个

function Module(id ){
    this.id = id
    this.exports = {}

}

Module.wrap = function(script){
    return `(function (exports, require, module, __filename, __dirname){
        ${script}
    })`
}
Module._extensions = {
    '.js'(module){
        var content = fs.readFileSync(module.id, 'utf8');
        let fnStr = Module.wrap(content);
        let fn = vm.runInThisContent(fnStr)
        fn.call(module.exports, module.exports, req, module)
    },
    '.json'(module){
        let content = fs.readFileSync(module.id, 'utf8');
       module.exports = JSON.parse(content)
    },
    '.node'(module){

    }
}
function req(p){
    let realPath = path.resolve(__dirname,p);// 把相对路径 转化成绝对路径
    let module =  new Module(realPath); // {id:'xxx/a.json', exports:{}}
    let extName = path.extname(module.id)
    console.log(extName)
    console.info(Module._extensions)
    Module._extensions[extName](module);

    return module.exports
}

//实现一个模块化 后缀查找  先找js再找json 再找node(练习断点调试)
//缓存 fs.accessSync
let r1 = req('./a')
console.log(r1)