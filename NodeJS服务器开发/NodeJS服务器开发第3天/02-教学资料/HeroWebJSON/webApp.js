const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//1. 中间件 --------------
//1.1 暴露 静态文件夹
app.use(express.static('web'));
//1.2 注册 bodyParser 中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//2. 路由-----------------
// 2.1 注册 登录 路由
app.post('/login', (req, res) => {
  //a.准备 响应消息对象
  let msgObj = {
    code: 200,
    msg: '登录成功~~！'
  };
  
  //b.判断，如果 登录失败，就 修改 消息对象里的 内容
  if (req.body.username != 'james' || req.body.password != '123456') {
    msgObj.code = 400;
    msgObj.msg = '用户名或密码错误~~！'
  }

  //c.向浏览器 发送 消息对象
  res.send(msgObj);
});

// 启动服务器
const PORT = 3747;
app.listen(PORT, (err) => {
  if (err == null) {
    console.log('启动 【英雄项目】服务器成功：' + PORT);
  } else {
    console.log('启动失败:' + err.message);
  }
});