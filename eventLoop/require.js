//实现一个模块化 后缀查找  先找js再找json 再找node(练习断点调试)
let path = require('path')
let fs  = require('fs')
let vm = require('vm')

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
Module._cache = Object.create(null)
Module._extensions = {
    '.js'(module){
        var content = fs.readFileSync(module.id, 'utf8');
        let fnStr = Module.wrap(content);
        let fn = vm.runInThisContext(fnStr)
        fn.call(module.exports, module.exports, req, module)
    },
    '.json'(module){
        let content = fs.readFileSync(module.id, 'utf8');
       module.exports = JSON.parse(content)
    },
    '.node'(module){
        console.log('node')
    }
}

Module._resolveFilename = function(req){
   
    let readPath = path.resolve(__dirname,req);
    if(!path.extname(readPath)){
        let exts = Object.keys(Module._extensions); 
        for(let i=0;i<exts.length;i++){
            let cur = exts[i];
            if(fs.existsSync(req+cur)){ 
                return req+cur
            }else{
                console.log("no found");
            }
        }
    }
    return readPath;
}

function req(p){
    let readPath = path.resolve(__dirname,p);//把相对路径转为绝对路径
   // console.info(Module)
    let filtName = Module._resolveFilename(readPath);
    let cachedModule = Module._cache[filtName];
    if(cachedModule) return cachedModule.exports;
    let module = new Module(filtName);
    let extName = path.extname(module.id);
    Module._extensions[extName](module);

    return module.exports
}


//缓存 fs.accessSync
let r1 = req('./a')
console.log(r1)