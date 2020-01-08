const express = require('express');
const app = express();

const cors = require('cors');

//1. 中间件 ------------------------------------------
//1.1 暴露 静态文件夹
app.use(express.static('web'));
//1.2 跨域中间件
app.use(cors());

//2. 路由---------------------------------------------
app.post('/showlove', (req, res) => {
  // 向 响应报文头中 添加一个 状态行，告诉浏览器 允许跨域 本路由
  // res.append('Access-Control-Allow-Origin','*');
  res.send('讨厌~~~');
});


app.get('/showlove1', (req, res) => {
  res.send('alert("123")');
});

app.get('/showLoverName', (req, res) => {
  res.send('mylove("Linda");');
});

app.get('/showLoverName2', (req, res) => {
  //1.接收 请求url中的 callback 的参数
  let methoName = req.query.callback; // mylove
  res.send(methoName + '("Linda");'); // mylove("Linda")
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