let obj = {
    age:{}
};
obj.name = 'hehe' //可枚举
/*
Object.defineProperty(obj,'age',{ //属性描述器, 不可枚举 
    value:'18',
    enumerable: true, //非隐藏属性，可以枚举出来这个属性
    //writable:true, //可以被修改
    get(){
        return temp
    },
    set(value){
        console.log('haha')
        temp = value;
    }
}) */


let o = {
    temp:'',
    get address(){ //上面的简写
        return this.temp;
    },
    set address(val){
        this.temp = val
    }
}
o.address = 'beijing'
console.log(o.address)

console.log(obj.age)

//Object.defineProperty不支持数组
