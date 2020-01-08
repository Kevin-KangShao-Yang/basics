const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// 创建 服务器程序
const app = express();
// 暴露 web 静态资源文件夹
app.use(express.static('./web'));
// 注册 cookie 中间件 (为 cookie 生成 添加了 盐值 -- 增加了 cookie签名的复杂度)
app.use(cookieParser('LindaIsADog'));
// 注册 bodyParser 中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 注册路由
app.post('/login', (req, res) => {
  if (req.body.usrname == 'james' && req.body.pwd == '123456') {
    // 验证通过后，通过 响应报文对象 往  浏览器 发送一个 cookie
    // 1.【发送一个 经过 签名的 cookie 到 浏览器！！！！！】
    res.cookie('usrname', req.body.usrname, { signed:true, maxAge: 1000 * 60 * 1 });
    // 发送 消息对象 回浏览器
    res.send({
      code: 200,
      msg: '登录成功~~           ！'
    });
  } else {
    res.send({
      code: 400,
      msg: '用户名或密码错误~~！'
    });
  }
});

// 列表 路由，返回 一些数据给浏览器
// 要求：只有 登录过的 浏览器 才能访问，没登录就跳转到登录页面
app.get('/list', (req, res) => {
  
  // 2.【在 服务器端 获取 浏览器发送来的 签名的 cookie】
  console.log(req.signedCookies); // req.cookies
  
  if (req.signedCookies.usrname == undefined) {
    res.send('<script>alert("您尚未登录~~~");window.location="/login.html";</script>');
  } else {
    console.log(req.signedCookies.usrname);
    res.send('<h1>欢迎光临本店~~~' + req.signedCookies.usrname + '</h1>');
  }
})

app.listen(3747, (err) => {
  if (err == null) {
    console.log('启动成功：3747');
  } else {
    console.log('启动失败：' + err.message);
  }
});
