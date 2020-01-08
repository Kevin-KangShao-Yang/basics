const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
// 导入 db.js 文件来使用
const db = require('./utils/db.js');

// 创建 上传组件，并且 指定 用来保存 上传文件的 路径
const upload = multer({ dest: './web/uploads' });

//1. 中间件 ------------------------------------------
//1.1 暴露 静态文件夹
app.use(express.static('web'));
//1.2 注册 bodyParser 中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//2. 路由---------------------------------------------
// 2.1 注册 登录 路由     --------------
app.post('/login', (req, res) => {
  //a.准备 响应消息对象
  // let msgObj = {
  //   code: 200,
  //   msg: '登录成功~~！'
  // };
  let msgObj = makeMsgData(200, '登录成功~~！');

  //b.判断，如果 登录失败，就 修改 消息对象里的 内容
  if (req.body.username != 'james' || req.body.password != '123456') {
    msgObj.code = 400;
    msgObj.msg = '用户名或密码错误~~！'
  }

  //c.向浏览器 发送 消息对象
  res.send(msgObj);
});


// 2.2 注册 英雄列表 路由 --------------
app.get('/list', (req, res) => {
  let backData = makeMsgData(200, '获取成功~~！');

  //a.获取 所有 未删除的 英雄
  let heroList = db.getHeros();

  //b. 判断 是否有 数据
  if (heroList != null && heroList.length > 0) {
    // 将 查询到的 数据 设置给 响应数据对象
    backData.data = heroList;
  } else {
    // 修改 响应数据对象的内容
    backData.code = 201;
    backData.msg = '对不起，没有数据~~！';
  }

  res.send(backData);
});

// 2.3 注册 英雄新增 路由 --------------
app.post('/add', upload.single('icon'), (req, res) => {
  //a.准备消息对象
  let msgData = makeMsgData(201, '新增成功~~！');

  //b.校验数据
  if (req.body.name == "" || req.body.skill == "" || req.file == undefined) {
    msgData.code = 407;// 设置 执行状态码 为 407，告诉浏览器 数据有误
    msgData.msg = '数据有缺失，请检查后再提交~~~ 如果您是尊贵的黑客，请放过小站~~~';
  } else {
    //c.接收 浏览器 提交来的 数据，并封装到 对象中
    let addData = {
      name: req.body.name,
      skill: req.body.skill,
      icon: req.file.filename // 图片上传 保存到 服务器生成 随机名称
    };
    //d.将 数据对象 提交到 db.js
    let isOk = db.addHero(addData);
    //e.判断新增结果，返回不同的消息
    if (!isOk) {
      msgData.code = 400;
      msgData.msg = '参数错误~~~'
    }
  }

  //f. 发送 消息 给 浏览器
  res.send(msgData);
});

// 2.4 删除英雄     --------------
app.post('/delete', (req, res) => {
  //a.获取 请求报文 中 要删除的 英雄id
  let heroId = req.body.id;
  //b.调用 db.js 里的方法，根据 id "软删除" 一个 英雄
  let isOk = db.deleteHeroById(heroId);
  //c.告诉浏览器 删除结果
  //c1.准备 返回消息对象
  let msgData = makeMsgData(202, '删除成功~~~');
  //c2.判断 删除结果，并设置 消息对象的内容
  if (!isOk) {
    msgData.code = 400;
    msgData.msg = '参数错误~~~';
  }

  //c3.发送消息回浏览器
  res.send(msgData);
});

// 2.5 查询英雄     --------------
app.get('/search', (req, res) => {
  //a.获取 url 中 传来的 ID值 url?id=1
  let heroId = req.query.id;
  //b.调用 db 中的方法 查询
  let heroObj = db.getHeroById(heroId);
  //c.准备消息对象
  let msgData = makeMsgData(200, '查询成功~~~', heroObj);
  //d.判断结果
  if (heroObj == null) {
    msgData.code = 400;
    msgData.msg = '参数错误~~~'
  }
  //e.返回消息给浏览器
  res.send(msgData);

});

// 2.6 修改英雄     --------------
app.post('/edit', upload.single('icon'), (req, res) => {
  //a.接收数据
  let editHero = {
    id: req.body.id,
    name: req.body.name,
    skill: req.body.skill,
    // 设置 数据对象 的 图片名称时，判断 浏览器是否有提交新的图片文件
    icon: req.file ? req.file.filename : ''
  };
  //b.提交到 db
  let isOk = db.editHero(editHero);
  //c.返回数据
  let msgData = makeMsgData(203, '修改成功');
  if (!isOk) {
    msgData.code = 400;
    msgData.msg = '参数错误~~！';
  }

  res.send(msgData);
});


/** 
 * @description: 创建 返回给浏览器的 消息对象
 * @param {Number}  code - 状态码
 * @param {String}  msg - 给浏览器的消息
 * @param {Object}  data - 给浏览器的数据（有些接口没有数据）
 * @return: 消息对象 {code,msg,data}
 */
function makeMsgData(code = 200, msg = '成功~~', data = null) {
  return {
    code,//: code,
    msg,//: msg
    data
  };
}

// 启动服务器
const PORT = 3747;
app.listen(PORT, (err) => {
  if (err == null) {
    console.log('启动 【英雄项目】服务器成功：' + PORT);
  } else {
    console.log('启动失败:' + err.message);
  }
});