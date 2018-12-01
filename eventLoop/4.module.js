//模块化 前端 requireJs AMD(先定义，后使用) seajs CMD （用的时候在加载）
//为什么要有模块 把代码维护到一个对象中
//防止 变量 污染全局 防止 代码重名
//闭包实现 一个不销毁的作用域
let obj = {
   
}

// commonJs : require    ==> node中常用 的
// ---- 规定1. 一个文件 就是一个模块 
// ----    2. 如何导入别人的模块 require
// ----    3. 模块的导出 module.exports
// webpack也是用了commonjs规范的思想

// esModule es6: import
// umd 统一了。
// node 里面有三种模块 require(‘fs'); 内置模块，核心模块
//                   require('bluebird') 下载 第三方模块
//                   requrie('./promise.js') 文件模块

let r = require('./a') //文件模块，可以省略.js,.json,(.node) 可以直接拿到结果，所以是同步的
console.log(r)


let fs = require('fs')
let path = require('path')
// 用join或resolve都能拼出来一个绝对路径
//更建议有/就用join, 没有就用resolve
//因为 加/在resolve中代表去根目录 
console.log(path.join(__dirname, 'a.js', '/'))
console.log(path.resolve(__dirname, 'a.js'))
console.log(path.resolve(__dirname, 'a.js', '/'))

let content =  fs.readFileSync(path.resolve(__dirname,'a.js'),'utf-8');
console.log(content)

// 怎么让字符串执行，eval new Function
let name = 'hehe'
eval('console.log(name)') //非沙箱的环境，会去寻找当前作用域的值 

let str = 'var a = 1; return a'
let fn = new Function('x','y', str)
console.log(fn(1,2))

let vm = require('vm')
vm.runInThisContext(str)