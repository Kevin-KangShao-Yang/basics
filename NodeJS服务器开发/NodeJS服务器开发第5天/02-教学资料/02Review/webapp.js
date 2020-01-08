//1.使用 nodejs express模块搭建服务器
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();

let uploadObj = multer({dest:'./web/upload/'});

//2.注册 中间件
app.use(express.static('./web'));
// 注册 bodyParser 中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//3.注册路由 - get
app.get('/login', (req, res) => {
  //3.1 接收 get 出来的数据 /login?id=1&age=18
  console.log(req.query.id);
  console.log(req.query.age);

  //3.2 发送一个 友好信息 回 去
  res.send('谢谢你的访问，你是好人~~！');
});

//3.注册路由 - post (urlencode)
app.post('/login', (req, res) => {
  //3.1 接收 post 出来的数据
  console.log(req.body.usrname);
  console.log(req.body.pwd);

  //3.2 发送一个 友好信息 回 去
  res.send('谢谢你的访问，你是好人~~！');
});


//3.注册路由 - post (formdata)
app.post('/up',uploadObj.single('usrPic'), (req, res) => {
  //3.1 接收 post 出来的数据
  console.log(req.body.usrname);
  console.log(req.file);

  //3.2 发送一个 友好信息 回 去
  res.send('谢谢你的访问，你是好人~~！');
});

//4.启动服务器
app.listen(3747, (err) => {
  console.log('启动成功~~！ - 3747');
});