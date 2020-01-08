const express = require('express');
const bodyParser = require('body-parser'); // 将 请求 报文体的 urlencode 格式的数据 装入 req.body 属性中，方便访问

// 创建服务器程序
let app = express();

// 注册 body-parser 中间件
//    当 浏览器 发送请求 到服务器来，服务器 会 先 调用 中间件
//    body-parser的中间件会 自动 将 请求报文体 里的数据 封装到 req.body 属性中
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// bodyParser.urlencoded({ extended: false }) 会 返回一个 中间件函数 （req,res,next）=>{ ... }

// req - 请求报文对象 ，包含了 浏览器发来的数据
// res - 响应报文对象，包含了和准备了 要发送到浏览器的数据
app.get('/showlove', (req, res) => {
  console.log(req.originalUrl);
  console.log(req.host);
  console.log(req.ip); // 获取 到 浏览器 所在 电脑的 ip -- 浏览器和服务器是通过 socket 基于 tcp协议通信，所以 会 获取 对方的 ip 地址
  console.log(req.method);
  console.log(req.query); // { name: 'Linda', age: '27' } 封装了 url 参数
  res.send('<h1>讨厌，死鬼~~~get</h1>');
});

// 一旦访问 本路由，服务器端 会 强制要求 浏览器 去访问  /showlove 路由
app.get('/hate.html',(req,res)=>{
  console.log('强制浏览器 反问 showlove 路由');
  // 服务器端 向 浏览器 发送 302 重定向 码，同时 发送 location状态行 告诉浏览器要冲低昂想 到 哪个页面
  // res.redirect('/showlove');

  // 补充：使用 status 可以 设置 响应报文中的 状态码 ， append 可以 添加状态行 ， send 可以 发送响应报文体 数据
  res.status(302).append('location','/showlove').send('去另一个页面吧，人生 不是 只有快乐 才幸福~~~~');
  // res.append('location','/showlove');
  // res.send('去另一个页面吧，人生 不是 只有快乐 才幸福~~~~');
});

// 注册路由 ，通过 post 方式 获取 浏览器 提交过来的 用户名 和 密码
app.post('/reg',function (req,res) {
  console.log(req.body);
  console.log(req.body.txtName);
  console.log(req.body.txtPwd);

  res.send('注册成功啦~~亲~~~一起去南沙曾母暗礁 度蜜月吧~~~~');
})

// 启动服务器程序，监听一个 端口号
app.listen(3747, (err) => {
  if (err == null) {
    console.log('开启服务器成功：3747');
  } else {
    console.log('开启失败：' + err.message);
  }
})