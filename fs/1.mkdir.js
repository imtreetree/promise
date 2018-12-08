let fs = require('fs')
//fs.mkdirSync   /    fs.mkdir
// fs.mkdirSync('./a/b'); // mkdir 会帮你转义
// fs.exists (废弃了) =>fs.accessSync();
//目录的创建只能一层层的创建 
//查看目录
function mkdirp(url){
    let arr = url.split('/');
    for(let i=0; i< arr.length; i++){
        let currentDir = arr.slice(0, i+1).join('/');
        try{
            fs.accessSync(currentDir)
        }catch(e){
            fs.mkdirSync(currentDir)
        }
        fs.mkdirSync(currentDir)

    }
}

//mkdirp('b/e/q')
//异步的
function mkdirp2(url, cb){
    let arr = url.split('/')
    let index =0
    function next(){
        if(index === arr.length) return cb();

        let currentDir = arr.slice(0, index +1).join('/')
        fs.access(currentDir, function(err){
            if(err){
                fs.mkdir(currentDir, function(){
                    next();
                })
            }else {
                next();
            }
        })
    }
}

mkdirp2('b/e/q',function(){
    console.log('创建成功')
})