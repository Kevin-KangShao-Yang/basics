//1.导入 express
const express = require('express');
const bodyParser = require('body-parser');
//1.1 导入 session 模块
const cookieSession = require('cookie-session');
//1.2 导入 验证码 模块
var svgCaptcha = require('svg-captcha');

//2.创建服务器程序
const app = express();


//3.注册中间件 ------------------------
// 3.0 暴露静态资源文件夹 ------
app.use(express.static('./web/'));

//3.1 注册 session 中间件 -----
app.use(cookieSession({
  name: 'sessionid', // a.cookie的键
  keys: ['james', 'asdkfhapoidsfasoifd'] // b.盐值，用来对 发送给浏览器的 sessionid 做 混淆
}))

//3.2 注册 bodyParser 中间件 ---
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//4.注册路由------------------------------
// 4.1 普通登录路由（无验证码）
app.post('/login', (req, res) => {
  //4.1 接收用户名和密码并校对
  if (req.body.txtName == 'james' && req.body.txtPwd == '123123') {
    //4.2 将用户名 保存到 服务器端 session 中
    // 三件事：
    ///    a.在session池中创建了 一个 键值对
    //       a1.键：新的sessionid
    //       a2.值：{uName:'james'}
    //     b.将 新的 sessionid 以缓存cookie方式 发送到 浏览器
    //         Set-Cookie: sessionid=eyJ1TmFtZSI6ImphbWVzIn0=; 
    req.session.uName = req.body.txtName;

    //4.3 发送 响应报文给浏览器
    res.send('登录成功啦~~~');
  } else {
    res.send('用户名密码错误~~~');
  }
});

// 4.1 带验证码登录路由
app.post('/loginvcode', (req, res) => {
  //4.0 先检查 验证码是否正确
  let vcode = req.body.txtVcode;

  if (vcode != req.session.vcode) {
    res.send('验证码错误~~！');
  } else {

    //4.1 接收用户名和密码并校对
    if (req.body.txtName == 'james' && req.body.txtPwd == '123123') {
      //4.2 将用户名 保存到 服务器端 session 中
      // 三件事：
      ///    a.在session池中创建了 一个 键值对
      //       a1.键：新的sessionid
      //       a2.值：{uName:'james'}
      //     b.将 新的 sessionid 以缓存cookie方式 发送到 浏览器
      //         Set-Cookie: sessionid=eyJ1TmFtZSI6ImphbWVzIn0=; 
      req.session.uName = req.body.txtName;

      //4.3 发送 响应报文给浏览器
      res.send('登录成功啦~~~');
    } else {
      res.send('用户名密码错误~~~');
    }
  }
});

//5.登录成功后 的列表 数据路由
//   功能：验证 session 是否存在，如果不存在 调回到登录页面
app.get('/list', (req, res) => {
  //5.1 通过 req.session 访问 在 服务器端 对应的 对象和属性
  // a.讲 请求报文中的 叫做 sessionid 的 cookie 值获取到 
  // b.到 session池中 根据 sessionid 查找 session对象
  // c.如果 找到了，就讲 session对象 设置给  req.session 属性
  if (req.session.uName == undefined) {
    res.send('尚未登录~~~ <a href="/login.html">去登录</a>');
  } else {
    res.send('欢迎您：' + req.session.uName+' <a href="/logout">退出</a>');
  }

});

//6.注销功能（退出登录）
app.get('/logout', (req, res) => {
  // 销毁 当前浏览器 发送来的 sessionid 对应的 session池中的 对象
  req.session = null;

  res.send('退出成功~~~ <a href="/login.html">去登录</a>');
});

//7.生成 验证码 图片
//验证码input中的 img的 src路径  /makecode  ,不是ajax请求的路径
app.get('/makecode', (req, res) => {
  //1.生成验证码对象
  var captcha = svgCaptcha.create();
  //2.将验证码 存入 session ----------   toLowerCase() 验证码也可以小写识别
  req.session.vcode = captcha.text.toLowerCase();
  //3.设置 响应报文头里的 mime
  res.type('svg');
  //4.发送 图片数据 给浏览器
  res.status(200).send(captcha.data);
})

//5.启动服务器
app.listen(3747, (err) => {
  if (err == null) {
    console.log('启动服务器成功：3747');
  } else {
    console.log('启动失败：' + err.message);
  }
});