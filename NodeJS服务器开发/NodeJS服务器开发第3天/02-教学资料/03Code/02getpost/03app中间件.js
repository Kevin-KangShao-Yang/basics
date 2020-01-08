const express = require('express');
const app = express();

// 中间件：是 exprss 服务器 中 优先于 所有路由函数 执行 的 一种 新的函数
//        【当浏览器 请求 服务器任意 路由时， 服务器都会 先执行 所有的 中间件函数，然后再去执行 被请求的 路由】
app.use((req, res, next) => {
  console.log('有人请求我了~~~中间件函数1 begin');
  next(); // next 是一个 函数，如果 在 中间件中 不手动调用的话，服务器后面的 业务 都无法执行了！！！
  console.log('有人请求我了~~~中间件函数1 end');
});

app.use((req, res, next) => {
  console.log('有人请求我了~~~中间件函数2 begin');
  next(); // next 是一个 函数，如果 在 中间件中 不手动调用的话，服务器后面的 业务 都无法执行了！！！
  console.log('有人请求我了~~~中间件函数2 end');
});

app.use((req,res,next)=>{
  let userName ='james';
  //1.判断 当前浏览器用户是否 是 james
  //2.如果 是james，则 允许访问 后面的 路由函数
  if(userName == 'james'){
    next();
  }
  //3.如果 不是james，则 直接打回，不执行 后面路由函数
  else{
    res.send('对不起，您权限不够~~~！'); // 中间件中 一旦 使用 res.send 数据，那么 在路由中 就无法 在 发送数据给浏览器了！
  }
});


//注册路由
app.get('/showlove1', (req, res) => {
  res.send('love u ~~1 ');
});

app.get('/showlove2', (req, res) => {
  res.send('love u ~~2 ');
});

app.get('/showlove3', (req, res) => {
  res.send('love u ~~3 ');
});
// app.post();


app.listen(3747, (err) => {
  if (err == null) {
    console.log('开启服务器成功：3747');
  } else {
    console.log('开启失败：' + err.message);
  }
});