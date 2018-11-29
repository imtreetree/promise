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

function observer(o){
    if(typeof o !== 'object'){
        return o;
    }
    for(let key in o){
        defineReactive(o, key, o[key]);
    }
}

function defineReactive(obj, key, value){
    observer(value) //监控只要是对象，就要不停的去监控
    Object.defineProperty(obj, key ,{
        get(){
            return value;
        },
        set(val){
            if(val !== value){
                update()
                value = val;
            }
        }
    })
}
observer(obj)
obj.age.age = 'he'
console.log(obj)

for(let key in obj){
    console.log(obj[key])
}
console.log(obj.age)

//Object.defineProperty不支持数组
