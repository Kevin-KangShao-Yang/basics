//1.导入 express
const express = require('express');

//2.获取 路由对象
const myR = express.Router();

//3.注册 路由方法
myR.get('/list',(req,res) => { 
  res.send('不讨厌，亲爱的~~~');
});

//5.导出 路由对象
module.exports = myR;