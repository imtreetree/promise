// fs.open打开文件 fs.read 读取 fs.write 写入
//读一点，写一点，节约内存
//默认fs 是从3开始的，前三个被占用了
let fs = require('fs')
//0o666可读可写
fs.open('./1.txt', 'r', 0o666, function(err,fd){
    fs.read(fd, buffer, 0, 3, 1, function(err, bytesRead){
        //bytesRead 真正读取的个数
        console.log(buffer)
        fs.close(fd, function(){
            console.log('文件关闭了')
        })
    })
} )


let buffer = Buffer.from('珠峰')
//offset buffer 的偏移量
//length 写入的buffer的个数
//position 文件的位置 
//fs.write(fd, buffer[, offset[,...]])
//模拟新的拷贝方法
//需要用5个字节搞定拷贝操作
function copy(source, target){

}