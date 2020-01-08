/* <script src='./fs.js'></script> */

//1.导入 内置模块 fs( FileSystem 读写硬盘)
//  require 方法 就是 帮我们 到  Nodejs 的安装目录中 查找 对应的 模块，并 加载到 当前程序中来
//  使用 常量 来保存 导入 的 模块的对象
//  常量名字 ：用 模块名字
const fs = require('fs');

//2.调用 fs 模块的 删除 文件 和 文件夹 方法
//2.1 使用 异步 删除方式 删除  -------------------------------------------------
//                                        删除操作结束后，不管删除成功与否，都会 调用 回调函数！
//                                         如果删除失败，会 为 回调函数 传入 错误对象
//                                                成功，会 为 回调函数 传入  null
// fs.unlink('./1.js', (err) => {
//   if (err == null) {
//     console.log('删除文件成功啦~~~');
//   } else {
//     console.log('删除文件失败：' + err.message);
//   }
// })


//ajax ,  setTimeout/setInterver(func,2000)

//2.2 使用 同步删除 方式 删除文件 ------------------------------------------------
// try {
//   fs.unlinkSync('./1.js');
//   console.log('已成功删除 ./1.js');
// } catch (err) {
//   console.log('删除文件失败：' + err.message); // no such file or director
// }


//2.3 使用 文件 读取 功能 --------------------------------------------------------
// readFile 参数：
//           第1个参数  path: 要读取的 文件 路径
//           第2个参数  指定字符集
//           第3个参数  回调函数，读取操作结束后，会自动执行，并传入 两个 实参
//                     err 错误消息对象
//                     data 如果读取成功，那么 就是 文件的内容
// fs.readFile('./2.txt','utf-8',(err,data)=>{
//   // 判断 读取过程中 是否 出现了 问题(异常)
//   // 如果 err 为空，说明 读取成功
//   //        不为空，则      失败
//   if(err == null){
//     console.log('读取内容：' + data);
//   }else{
//     console.log('失败：' + err.message);
//   }
// })


// 2.4.使用 同步方式 读取文件
try {
  let data = fs.readFileSync('./3.txt', 'utf-8');
  console.log(data);
} catch (error) {
  console.log('失败：' + error.message); // no such file or directory, open './3.txt'
}
