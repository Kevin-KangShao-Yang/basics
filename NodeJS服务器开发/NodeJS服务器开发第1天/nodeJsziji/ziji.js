//1.导入模块
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
// 导入 后端自己创建db.js 文件来使用
const app = express();
const db = require('./utils/db.js');


// 创建 上传组件，并且 指定 用来保存 上传文件的 路径
const upload = multer({ dest: './web/uploads' });
//中间件  暴露 静态文件夹
app.use(express.static('web'));
//注册 bodyParser 中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//封装常用返回数据,并设置默认值
function msgObj(code = 200, msg = "获取成功", data = null) {
    //返回对象
    return {
        code,
        msg,
        data,
    };
};


//2.路由  注册路由
//登录路由
app.post('/login', (req, res) => {
    let backData = msgObj(200, '登录成功');
    //获取客户输入的用户名及密码
    let username = req.body.username;
    let password = req.body.password;
    //判断用户名及密码是否正确
    if (username != 'admin' || password != '123456') {
        //输入错误及返回提醒错误信息给浏览器
        backData.code = 400;
        backData.msg = "用户名或者密码出错";
    }
    //发送 消息 给 浏览器
    res.send(backData);
});


//获取英雄列表
//有文件表格创建路由,必须导包multer上传文件第三方模块
app.get('/list', (req, res) => {
    //获取后端所有data的数据
    let dataObj = db.getHeros();
    let backData = msgObj(200, '获取成功');
    //判断获取后端的数据是否为空
    if (dataObj != null && dataObj.length > 0) {
        //不为空,及将数据返回浏览器
        backData.data = dataObj;
    } else {    //空则告诉客户没有数据
        backData.code = 500;
        backData.msg = "对不起,没有数据";
    }
    //发送 消息 给 浏览器
    res.send(backData);
})

//英雄新增
//有文件表格创建路由,必须导包multer上传文件第三方模块
app.post('/add', upload.single('icon'), (req, res) => {
    //接收 浏览器 提交来的 数据，并封装到 对象中
    let dataObj = {
        name: req.body.name,//get请求的为request.query.id  req.query返回浏览器 url? 后的数据
        skill: req.body.skill,//get请求的为request.query.name  req.query返回浏览器 url? 后的数据
        icon: req.file.filename,// 图片上传 保存到 服务器生成 随机名称
    };
    console.log(req.file);
    

    let addHreos = db.addHero(dataObj);
    let addData = msgObj(201, '新增成功');
    if (!addHreos) {
        addData.code = 400;
        addData.msg = '参数错误';
    }
    //发送 消息 给 浏览器
    res.send(addData);
})


//英雄删除
//路由  注册删除路由
app.post('/delete', (req, res) => {
    let backData = msgObj(202, '删除成功');
    let deleId = req.body.id;
    let deleArr = db.deleteHeroById(deleId);
    if (!deleArr) {
        backData.code = 400;
        backData.msg = '参数错误';
    }
    //发送 消息 给 浏览器
    res.send(backData);
})

//英雄查询
//2.路由  注册查询路由
app.get('/search', (req, res) => {

    let searchId = req.query.id;
    let searchArr = db.getHeroById(searchId);
    let backData = msgObj(200, '查询成功', searchArr);

    if (!searchArr) {
        backData.code = 400;
        backData.msg = '参数错误';
    }
    //发送 消息 给 浏览器
    res.send(backData);
})

//英雄编辑
//有文件表格创建路由,必须导包multer上传文件第三方模块
app.post('/edit', upload.single('icon'), (req, res) => {
    //接收 浏览器 提交来的 数据，并封装到 对象中
    let dataObj = {
        id: req.body.id,//get请求的为request.query.id  req.query返回浏览器 url? 后的数据
        name: req.body.name,//get请求的为request.query.name  req.query返回浏览器 url? 后的数据
        skill: req.body.skill,
        icon: req.file.filename,// 图片上传 保存到 服务器生成 随机名称
    };

    let editArr = db.editHero(dataObj);
    let editHero = msgObj(203, '修改成功');
    if (!editArr) {
        editHero.code = 400;
        editHero.msg = '参数错误';
    }

    //发送 消息 给 浏览器
    res.send(editHero);
})


//开启服务器
const PORT = 3000;
app.listen(PORT, (err) => {
    if (err == null) {
        console.log('启动服务器成功：' + PORT);
    } else {
        console.log('启动服务器失败:' + err.message);//err.message错误原因
    }
});