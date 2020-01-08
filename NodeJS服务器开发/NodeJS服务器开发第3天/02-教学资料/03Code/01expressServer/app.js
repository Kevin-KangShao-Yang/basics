const express = require('express');

// 创建服务器程序
let app = express();

// 设置 web 文件夹 里的内容 可以 被浏览器 直接访问
app.use(express.static('./web/'));


// req - 请求报文对象 ，包含了 浏览器发来的数据
// res - 响应报文对象，包含了和准备了 要发送到浏览器的数据
app.get('/showlove', (req, res) => {
  res.send('<h1>讨厌，死鬼~~~get</h1>');
});

// 启动服务器程序，监听一个 端口号
app.listen(3747, (err) => {
  if (err == null) {
    console.log('开启服务器成功：3747');
  } else {
    console.log('开启失败：' + err.message);
  }
})