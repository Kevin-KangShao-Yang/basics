const http = require('http');

//1.创建 http 服务器对象 
//   1.1 添加一个 回调函数
//       执行时机：每当 有浏览器 请求 这个服务器时，就会 自动调用这个回调函数
//   1.2 两个参数
//     req： 请求报文对象，包含了 浏览器 发给 服务器的 整个 请求报文数据
//     res： 响应报文对象，可以用来 准备 和 发送 要 给 浏览器的 响应报文数据！
const app = http.createServer((req, res) => {
  console.log('讨厌，又有浏览器来请求吃饭了~~~~');
  res.setHeader('Content-Type', 'text/html;charset=utf8');
  res.end('你怎么又来啦~~~');
});

//2.“启动”服务器，并设置 服务器端口号
//   2.1 设置 端口号
//   2.2 设置 启动回调函数，执行时机：不论启动成功与否，都会调用
app.listen(3747,(err) => {
  if (err == null) {
    console.log('服务器启动成功~~！');
  } else {
    console.log('服务器启动失败：' + err.message);
  }
})