let school = { name: 'hehe', age: 9, a:null, d:new Date(), reg:/reg/,fn: function(){}}

function deepClone(obj){
    if(obj == null ) // null == undefined 双等号是相等的
    return  obj

    if(obj instanceof Date) return new Date(obj);
    if(obj instanceof RegExp) return new RegExp(obj);
    if(typeof obj !='object') return obj

   let newObj = new obj.constructor
   for(let key in obj){
       newObj[key] = deepClone(obj[key])  // 递归
   }

   return newObj
   

}
let d = deepClone(school)
console.log(d)