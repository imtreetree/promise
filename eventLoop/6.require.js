console.log('xxx')

//模块的查找
console.log(module.paths) //第三方路径 查找 

let file = require('./bluebird/index')

//11版本，先找文件再找文件夹
//8 版本，先找文件夹再找文件 

//安装包， 全局安装 -g 只能在命令行中使用
//本地安装  --save  代码中使用 ； 开发依赖 -D|--save-dev ,项目 -S|--save| 无

//全局 nrm http-server
//npm root -g 当前全局的默认安装目录
//像node 
//安装之前 ， 包的名字不能和文件夹相同 