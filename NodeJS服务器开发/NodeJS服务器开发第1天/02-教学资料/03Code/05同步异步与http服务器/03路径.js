const fs = require('fs');

// 1.问题：在 小黑窗路径 与 要删除文件 的路径 不一致时，会出现删除不掉的情况----------
// 2.原因：nodejs 代码中的 相对路径，是 相对于 小黑窗的执行路径的

// fs.unlink('1.txt', (err) => {
//   if (err == null) {
//     console.log('删除成功~~');
//   } else {
//     console.log('删除失败~~~' + err.message);
//   }
// })
// 

// 2.根本解决方案在于： 获取 被执行的 js 文件的路径----------------------------------
console.log(__dirname); // 2.1 获取 正在 执行的 js 文件所在目录的 绝对路径
console.log(__filename); // 2.2 获取 正在 执行的 js 文件的 绝对路径

// 3.修复问题：__dirname + 目标文件相对路径 -> 目标文件的绝对路径 ---------------------

//3.1 先获取 目标文件的 绝对路径
// F:\01Edu\01深圳\02.3前端\00_JZ课件授课\40期a班\NodeJS\Day01NodeJS与ES6\03Code\05同步异步与http服务器/1.txt
let targetPath = __dirname + '/1.txt';

//3.2 根据 绝对路径 删除 目标文件
fs.unlink(targetPath, (err) => {
  if (err == null) {
    console.log('删除成功~~');
  } else {
    console.log('删除失败~~~' + err.message);
  }
})