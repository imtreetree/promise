//装饰器:可以装饰类中的属性和方法

class Circle{
    PI = 3.14

}
let c = new Circle;
Object.defineProperty(c,'')
c.PI = 3.15
console.log(c)

// npx babel es6/2.decorator.js -o newDecorator.js
