let loverName = 'Liinda';

// nodejs 中的 导出：就是将 一个 js 文件中 写好的内容 输出给 另一个js文件 中 使用！

//1.使用 module.exports 导出---------------
//1.1 直接 导出 数据
// module.exports = loverName;

//1.2 导出 对象 （对象中可以保存 很多数据）
// module.exports = {
//   // loverName:loverName
//   loverName,
//   loverAge: 27,
//   loverGender: false,
//   nickName:'小黑群'
// };

// //2.使用 exports 导出 ------------------
//  exports 本身就是一个 空对象，nodejs 要求 必须 通过.语法操作，不能直接赋值
//          如果 直接 赋值，数据无法 添加到 exports 上，还是一个 空对象 {}

// 2.1 不可以直接 通过 exports 导出数据
// exports = loverName; // 此时 导出不了，在其它页面引入时，获取的 是 {}

// 2.2 必须 通过 对象.语法 动态为 exports 添加属性并赋值
exports.lover = loverName;

//3.module.exports 和 exports 本质上 都是同一个对象，用来 输出给 其它js页面
console.log(module.exports === exports); // true

// console.log(module.exports.prototype); // undefined

