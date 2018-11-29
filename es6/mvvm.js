
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

let obj = {
    age:{}
};
observer(obj)
obj.age.age = 'he'
console.log(obj)

for(let key in obj){
    console.log(obj[key])
}

//Object.defineProperty不支持数组

//proxy+ reflect兼容性不好