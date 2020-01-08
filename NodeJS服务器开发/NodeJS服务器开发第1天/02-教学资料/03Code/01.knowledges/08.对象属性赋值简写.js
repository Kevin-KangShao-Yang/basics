// -------------------------------------
// 属性赋值简写 ： 
//             将变量 设置给 对象的属性时，可以自动 将 同名的变量 值 赋给 对象的 同名属性
//             对象中的 方法 可以省略 funciton

//思考：将 以下变量值 封装到 一个 拥有同名属性的 对象中
let name = '妲己'
let gender = '女'
let skill = '傻笑'

//方式一：老方式 --------------------------------------------------------------
//       创建对象属性的同时 逐个 将 上面的 同名变量 设置给 属性，麻~~烦~~~！
let hero1 = {
  name:name,
  gender:gender,
  skill:skill
};

console.log(hero1); // { name: '妲己', gender: '女', skill: '傻笑' }

//方式二：属性赋值简写语法 ----------------------------------------------------
//       会自动 在 当前作用域下 去找 与对象属性 同名的变量，并把值 自动设置给 这些同名属性
let hero2 = {
  name,
  gender,
  skill
};

console.log(hero2); // { name: '妲己', gender: '女', skill: '傻笑' }

// 补充： 在 es6 中，对象中 添加 函数方法，可以 不需要写 function 关键字啦 -------
let her3 = {
  name,
  gender,
  skill,
  // sayHi :function () {
  //   console.log('123123');
  // }
  sayHi(){
    console.log('123123');
  }
};