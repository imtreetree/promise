class Parent {
    // static a = 'hello'
    constructor(age){
        this.age = age;
    }

    drink(){
        console.log('drink')
    }
}


class Child extends Parent{
    constructor(val){
        super(val)
    }
}

let ch1 = new Child(5)
console.log(ch1.a)
let drink = ch1.drink; //不能把原型上的方法拿出来调用 ，否则this无指向
drink()
// npx babel es6/1.class.js -o newClass.js 执行当前npm 包中的babel
