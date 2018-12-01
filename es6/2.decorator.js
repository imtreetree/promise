//装饰器:可以装饰类中的属性和方法 和类

@flag
class Circle{
   @readOnly PI = 3.14;
   @readOnly a = 1;
   @log('----hehe---')
   say(){
       console.log('你好')
   }

}

function readOnly(CProt, key, descriptor){
    console.log(CProt,key,descriptor)
    descriptor.writable = false;
}
function log(log){
    return function (CProt, key, descriptor){
        let old = descriptor.value;
        descriptor.value = function(){
            console.log(log)
            old()
        }
    }
}

function flag(target){
    console.log(target)
    target.a = 1;
}

let c = new Circle;
// c.PI = 3.15
console.log(c.say())


// npx babel es6/2.decorator.js -o newDecorator.js
// npm i @babel/plugin-proposal-decorators