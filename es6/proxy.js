let obj = {
    name:'hehe'
}
let obj2 =['hedai']
let proxy = new Proxy(obj2,{ //代理的属性 13种
    set(target, key, value){
        console.log('update')
        return Reflect.set(target, key, value)
    },
    get(target, key){ //可以使用reflect
        console.log('get')
       // return target[key]; //low low 
       return Reflect.get(target,key)
    }
});

// console.log(proxy.name) 对象

proxy.push('1') //数组 
console.log(obj2)