// -------------------------------------
// 展开运算符 ...
//           完成 对象 与 数组 的 自动展开
let gf = {
  name: '小太白',
  gender: false,
  age: 28
};

let gfTD = {
  name: '小白',
  skin: '白，非常白~~~白的很自然',
  finger: '倩倩琢玉手'
};

// 1.对象 展开
//        将对象 中的 成员 自动 添加到 另个对象中
//   注意： 如果 展开的 多个 对象中 有同名的属性，那么 后面添加展开的 对象 中的属性 值 会覆盖 前面 对象的同名属性值
let gf3 = {
  hobby: '吃喝玩乐游世界',
  ...gf,
  ...gfTD,

  // name: '小黑'
};

console.log(gf3);
/*
{
  hobby: '吃喝玩乐游世界',
  name: '小白',
  gender: false,
  age: 28,
  skin: '白，非常白~~~白的很自然',
  finger: '倩倩琢玉手'
}
*/

