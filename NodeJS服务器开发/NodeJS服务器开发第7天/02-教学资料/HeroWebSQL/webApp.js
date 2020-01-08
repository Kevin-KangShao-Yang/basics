const express = require('express');
// 加载两个 子路由
const heroR = require('./routers/heroRouter.js');
const usrR = require('./routers/usrRouter.js');

const app = express();


//1. 中间件 ------------------------------------------
//1.1 暴露 静态文件夹
app.use(express.static('web'));

//1.2 注册子路路由-------------------------------------
app.use(usrR);
app.use(heroR);

// 启动服务器
const PORT = 3747;
app.listen(PORT, (err) => {
  if (err == null) {
    console.log('启动 【英雄项目】服务器成功：' + PORT);
  } else {
    console.log('启动失败:' + err.message);
  }
});