// -------------------------------------
// 1.变量： var 关键字声明-----------------------
// 1.1 特点
//     a.预解析时 会 变量提升
//     b.变量重复声明 会覆盖
//     c.没有块级作用域

// console.log(b);
// var b = 1;

// if(true){
//   var b = 1;
// }

// console.log(b);

// for(var a = 1; a <= 5;a++){
  
// }

// console.log(a); // 6


// 2.变量：let 关键字声明 ------------------------
// 2.1 特点
//     a.无法变量提升
//     b.无法重复声明
//     d.有块级作用域 : if  for while .... 大括号 都会形成  一个 作用域，外部无法 访问 内部声明的 变量！

//a.么有变量提升
// console.log(lover); // lover is not defined
// let lover = 'Linda';

//b.不能重复声明 同名 变量
// let a = 1;
// let a = 2; // 报错：Identifier 'a' has already been declared
// console.log(a);

//c.有 块级作用域
// if(true){
//   let num = 100;
// }

// console.log(num); //  num is not defined

let num;
console.log(num); // undefined

// 3.常量 const ----------------------------------
// 3.1 特点
//     a.常量 一旦赋值 ，不能改变
//     b.常量 必须一创建 就初始化（一创建就赋值）
//     c.常量 不存在 提升
//     d.常量 有 块级作用域
//     e.无法重复声明

// 3.2 常量 应用场景
//    a.保存 整个程序的 核心配置 数据，一般 使用 常量来保存 -- 因为程序 无法修改
//    b.在 nodejs 中  加载 模块时，一般 使用 常量来保存 模块对象

// 3.3 常量命名规范
//    a.所有字母用大写
const MAX_REQUEST = 100;

// const age = 100;
// age = 101; // 常量 一旦赋值，不能改变！
// console.log(age);

// const age; //报错： Missing initializer in const declaration
// console.log(age);

// console.log(age); // 报错： age is not defined
// const age = 1;

// //c.有 块级作用域
// if(true){
//   const num = 100;
// }
// console.log(num); // 报错：   num is not defined

// const num = 1;
// const num = 2; // Identifier 'num' has already been declared