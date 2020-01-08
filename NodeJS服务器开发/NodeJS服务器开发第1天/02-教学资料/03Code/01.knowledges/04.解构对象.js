// -------------------------------------
// 1.解构：
//      一种 方便快速获取对象 和 数组中的值 方式

let hero = {
  name: '孙悟空',
  skill: '隐身',
  voice: '老孙来也~~~~'
};

// 需求：想把 hero对象 中的 属性 依次取出 放入  同名变量
// 一、老语法实现方式：
// let name = hero.name;
// let skill = hero.skill;
// let voice = hero.voice;

// console.log(name,skill,voice);

// 二、使用 对象 解构 语法 let {变量名，变量名 }  = 对象；
// let { name, skill, voice } = hero;
// console.log(name, skill, voice); // 孙悟空 隐身 老孙来也~~~~

//三、特殊情况
// a. 变量数 多过 对象 里的属性
// let { name, skill, voice, money } = hero;
// console.log(name, skill, voice , money); // 孙悟空 隐身 老孙来也~~~~ undefined

// b.变量少于对象属性
let { name, skill } = hero;
console.log(name, skill); // 孙悟空 隐身
