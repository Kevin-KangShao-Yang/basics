// -------------------------------------
// 解构实际应用
function showLove1(toName, fromName) {
  console.log(toName + '，我喜欢你哦~~~' + fromName);
}
// showLove1('Linda','James');

// 方式一：声明2个变量，但 传值不方便
// let tName = 'Lidna';
// let fName = 'James';
// showLove1(tName,fName); // Lidna，我喜欢你哦~~~James

// 方式二：声明函数 接收对象，但 调用时，不知道 对象中到底要传什么数据
// function showLove2(obj) {
//   console.log(obj.toName + '，我喜欢你哦~~~' + obj.fromName);
// }

// let o = {
//   toName:'Linda',
//   fromName:'James'
// };

// showLove2(o);


// 方式三： 把传入的对象 解构 结构 为 三个变量 name，skill,age -- 未来 很多 第三方组件 中的方法 都是 用 解构来 定义形参的！
function showLove3({ toName, fromName }) {
  console.log(toName + '，我喜欢你哦~~~' + fromName);
}

let o = {
  toName: 'Linda',
  fromName: 'James'
};

showLove3(o); // Linda，我喜欢你哦~~~James


//总结：
//1. 使用 对象 传参，会 极大的 简化  调用 函数时 的 传参过程
//2. 扩展：在定义函数时，假设有3个形参，3个形参 可以传  也 可以 不传！！

// toPage(1, 7, 200); // 1 7 200
// toPage(2); // 2 7 200

// toPage(8,180);

// function toPage(pageIndex = 1, pageSize = 7, totalRow = 200) {
//   console.log(pageIndex, pageSize, totalRow);
// }


let obj = { pageSize: 9 };
toPage2(obj);

function toPage2({ pageIndex = 1, pageSize = 7, totalRow = 200 }) {
  console.log(pageIndex, pageSize, totalRow);
}

