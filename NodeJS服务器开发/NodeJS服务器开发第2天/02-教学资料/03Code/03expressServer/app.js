const express = require('express');

// 创建服务器程序
let app = express();

// 1.使用 express 中间件 设置 公开的 静态资源文件夹 ------------------------
//  a.一旦 公开 某个 文件夹，那么 有浏览器 发送 了不认识的 请求过来，express 就会到 这个文件夹里去找
//             如果找不到，就 返回404
//             如果找到了，就自动读取 文件内容，并发回到浏览器
app.use(express.static('./web/'));


// 2.注册 路由 （就是 浏览器 可以请求的 路径(url) ） ------------------------
//   路由 = 请求方式 + url
// 2.1 注册 get 路由 /showlove
app.get('/showlove', (req, res) => {
  res.send('讨厌，死鬼~~~get');
});

// 2.1 注册 get 路由 /showlove
app.post('/showlove', (req, res) => {
  res.send('讨厌，死鬼~~~post');
});

// 2.2 注册 get 路由 /home/showlove
app.get('/home/showlove', (req, res) => {
  res.send('讨厌，讨厌 , 死鬼~~~');
});

app.listen(3747, (err) => {
  if (err == null) {
    console.log('开启服务器成功：3747');
  } else {
    console.log('开启失败：' + err.message);
  }
})