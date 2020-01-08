//1.导入 express
const express = require('express');
//1.2 导入 自定义路由 对象
const myR1 = require('./02自定义路由.js');

//2.创建服务器程序
const app = express();


//3.注册中间件
//3.1 将  导入的 路由对象 作为中间件 注册 到网站程序中
// A. 直接 将  导入的自定义路由对象 注册 到 服务器程序
//   浏览器访问路径：127.0.0.1:3747/list
// app.use(myR1);

// B. 注册 自定义路由对象时，还指定一个 子url
//   浏览器访问路径：127.0.0.1:3747/stu/list
app.use('/stu',myR1);

//4.注册路由
app.get('/showlove', (req,res) => { 
  res.send('讨厌~~~死鬼~~~');
});

//5.启动服务器
app.listen(3747, (err) => { 
  if (err == null) {
    console.log('启动服务器成功：3747');
  } else { 
    console.log('启动失败：' + err.message);
    
  }
});

