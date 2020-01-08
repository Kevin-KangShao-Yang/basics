const express = require('express');
const cookieSession =require('cookie-session');
const bodyParser = require('body-parser');
//导入验证码模块
const svgCaptcha = require('svg-captcha');

//创建服务器程序
const app = express();


//注册中间件
//暴露静态文件夹++++++
app.use(express.static('./web/'));
//注册session中间件
app.use(cookieSession({
    name: 'session', //cookie的键
   keys:['hbij','jubsk'], // 盐值,用来发送给浏览器的sessionid做混淆
}))

//注册body-parser 中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//带验证码登录路由
app.post('/login',(req,res)=>{
    let imgText = req.body.img;
    if (imgText!=req.session.vcode) {
        res.send('验证错误');
    }else{
        if (req.body.username=='kevin' && req.body.paw=='12345') {
            req.session.uName = req.body.username;

            //4.3 发送 响应报文给浏览器
            res.send('登录成功啦~~~');
        }else{
            res.send('用户名或者密码错误');
        }
     
    }
})


app.get('/list',(req,res)=>{
    if (req.session.uName==undefined) {
        res.send('还未登录---<a href="/login.html">去登录</a>');
    }else{
        res.send('欢迎登录'+req.session.uName);
    }
})


//生成 验证码 图片
//验证码input中的 img的 src路径  /makecode  ,不是ajax请求的路径
app.get('/makecode', (req, res) => {
    //1.生成验证码对象
    var captcha = svgCaptcha.create();
    //2.将验证码 存入 session ----------
    req.session.vcode = captcha.text.toLowerCase();
    //3.设置 响应报文头里的 mime
    res.type('svg');
    //4.发送 图片数据 给浏览器
    res.status(200).send(captcha.data);
  })
  



//开启服务器
app.listen(4000,(err)=>{
    if (err==null) {
        console.log('开启成功',4000);
    }else{
        console.log('开启失败'+err.message);
    }
})