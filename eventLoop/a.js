module.exports = 'hello'
console.log(this === module.exports)
// this 默认指向module.exports

let t = m = {}
m.a = { name:1 }
console.log(t)