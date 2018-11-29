//构建函数，模拟类，实例都是通过new产生的

//实例上的属性，类上的属性（静态属性），
function Animal(name){
    this.name = name;

    
}
Animal.prototype.info = { time :'100'}
function Cat(name){
    Animal.call(this,name)
}

//继承，就是继承实例上的属性，继承公共属性，全都要
let cat = new Cat('小花花')
let an = new Animal()
Cat.prototype.a = 1
console.log(cat.name)
Cat.prototype.__proto__ = Animal.prototype; //老的写法
// Object.setPrototypeOf(Cat.prototype, Animal.prototype) //es6的写法
console.log(cat.info)
// console.log(an.a)
console.log(cat.a)

Object.create() //es5

function create(parentPrototype){

}

