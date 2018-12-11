let fs = require('fs')
// 用webpack 打包之前
// 如果目录下有东西，我要读取目录下的文件 ，将目录打印出来，
// fs.readdirSync (只能读取 儿子辈的 )
// fs.statSync() 判断文件是否存在 会返回 一个状态对象

fs.rmdirSync('a')
//删除的过程 就是先删除儿子，再删除自己
// readdirSync, statSync(isFile) unlinkSync rmdirSync

// 先序 深度  同步
function removeDirSync(p){
    let statObj = fs.statSync(p);
    if(statObj.isDirectory()){
        //todo...
        let dirs = fs.readdirSync(p);
        //拿到 儿子后删除儿子
        dirs.forEach(dir =>{ //循环儿子路径 拼上父亲路径  如果是文件夹就要递归删除
            let currentPath = path.join(p, dir);
            removeDirSync(currentPath)

        })

        //儿子删除后 删除自己
        fs.rmdirSync(p)
    }else{
        fs.unlinkSync(p) //
    }
}


function removeDir(p, callback){
    fs.stat(p, function(err, statObj){
        if(statObj.isDirectory()){
            //当前是目录
            fs.readdir(p, function(err,dirs){
               
                dirs.map(dir => path.join(p, dir));
                let index = 0
                function next(){
                    if(dirs.length == 0) return fs.rmdir(p, callback)
                    removeDir(dirs[index], ()=> next(index + 1))
                }
                next(index)
            })
        }else {
            fs.unlink(p, callback)
        }
    })
}