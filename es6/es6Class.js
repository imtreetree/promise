//es6 中的class

class Animal{

    constructor(val){
        this.name = val;
    }

    eat(){
        console.log('eat')
    }
}
let an = new Animal()
an.eat()
an.__proto__.eat() //与上面一样，就是原型上的方法
function fn(){
    _check(this,fn)
}
function _check(inst, constructor){
    if(!inst instanceof constructor){
        throw new TypeError("Class constructor Fn cannot be invoked without 'new'123")
    }
}
fn()