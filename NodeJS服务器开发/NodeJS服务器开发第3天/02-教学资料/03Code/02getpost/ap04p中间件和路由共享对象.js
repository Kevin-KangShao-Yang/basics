const express = require('express');
const app = express();

app.use(function (req, res, next) {
  // 在中间中 为 请求报文对象 动态添加一个 属性 mylovername
  req.mylovername = 'Ruiky';
  next();
});

app.get('/login', (req, res) => {
  // 在路由中 访问 请求报文对象中的 属性 mylovername
  console.log(req.mylovername); // Ruiky

  res.send(req.mylovername);
})


app.listen(3747, (err) => {
  if (err == null) {
    console.log('开启服务器成功：3747');
  } else {
    console.log('开启失败：' + err.message);
  }
});