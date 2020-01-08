// 保存 注册了 所有的 和 英雄数据 操作 相关的 接口
const express = require('express');
var cookieSession = require('cookie-session');

// 导入 db.js 文件来使用
const dbsql = require('../utils/dbsql.js');

const bodyParser = require('body-parser');
const multer = require('multer');
//1. 获取 路由表对象
const usrR = express.Router();

//1.1 创建 上传组件，并且 指定 用来保存 上传文件的 路径
const upload = multer({
  dest: './web/uploads'
});

//2. 注册 中间件 - 通过 路由表对象 -----------------
//2.1 注册 bodyParser 中间件
usrR.use(bodyParser.urlencoded({
  extended: false
}));
usrR.use(bodyParser.json());

//2.2 注册 session 中间件
// 注册 session 中间件
usrR.use(cookieSession({
  name: 'sessionid',
  keys: ['asdfasdf', 'asdfasdf']
}));

//2.3 注册 整站 登录检查（检查session） 中间件 ----
usrR.use((req, res, next) => {
  // 如果 当前浏览器 访问时，服务端 检查不到 session，就说明没有登录
  if (req.session.usrName == undefined) {
    res.send({
      code: 777,
      msg: '对不起，还没登录吧~~~',
      backurl:'./login.html'
    });
  } else { 
    // 如果  有 session，说明登录了，可以 访问 后面的 路由
    next();
  }
});

//3. 注册 路由 -   通过 路由表对象
// 3.1 注册 英雄列表 路由 --------------
usrR.get('/list', (req, res) => {
  // 准备 消息对象
  let backData = makeMsgData(200, '获取成功~~！');

  //a.获取 所有 未被 标记为 删除的 英雄
  // a1.获取 连接通道
  let connObj = dbsql.getConn();
  // a2.执行查询语句 ， 查询结果 在回调函数 第二个参数 resArr 中
  connObj.query('select * from heroinfo where isDelete = 0', function (err, resArr) {
    //a3. 判断 是否有 数据
    if (resArr.length > 0) {
      // 将 查询到的 数据 设置给 响应数据对象
      backData.data = resArr;

    } else {
      // 修改 响应数据对象的内容
      backData.code = 401;
      backData.msg = '对不起，没有数据~~！';
    }
    // a4.关闭连接通道
    connObj.end();
    // a5.返回 消息对象 给浏览器
    res.send(backData);
  });

});

// 3.1 注册 英雄新增 路由 --------------
usrR.post('/add', upload.single('icon'), (req, res) => {
  //a.准备消息对象
  let msgData = makeMsgData(201, '新增成功~~！');

  //b.校验数据
  if (req.body.name == "" || req.body.skill == "" || req.file == undefined) {
    msgData.code = 407; // 设置 执行状态码 为 407，告诉浏览器 数据有误
    msgData.msg = '数据有缺失，请检查后再提交~~~ 如果您是尊贵的黑客，请放过小站~~~';
  } else {
    //c.将 数据对象 提交到 mysql数据库
    // c1. 获取 连接通道
    let connObj = dbsql.getConn();
    // c2. 执行 新增 sql语句
    let strSql = `insert into heroinfo (name,skill,icon) values('${req.body.name}','${req.body.skill}','${req.file.filename}')`;
    console.log(strSql);

    // c3.连接通道 执行 sql语句
    connObj.query(strSql, (err, resObj) => {
      //c4.如果 执行结果 的 受影响函数 <1，说明 新增失败了！！！
      if (resObj.affectedRows < 1) {
        msgData.code = 400;
        msgData.msg = '参数错误~~~'
      }
      //c5.关闭连接通道
      connObj.end();
      //c6.返回消息对象
      res.send(msgData);
    })
  }
});

// 2.4 删除英雄     --------------
usrR.post('/delete', (req, res) => {
  //c1.准备 返回消息对象
  let msgData = makeMsgData(202, '删除成功~~~');

  //a.获取 请求报文 中 要删除的 英雄id
  let heroId = req.body.id;
  //b.调用 dbsql.js ,执行更新 sql语句，根据 id "软删除" 一个 英雄
  //b1. 获取 连接通道对象
  let connObj = dbsql.getConn();
  //b2. 执行 修改语句，根据id值 修改 英雄 的 isDelete列
  connObj.query('update heroinfo set isDelete = 1 where id = ' + heroId, (err, resObj) => {
    //b3. 判断 更新的 结果 行数 是否为 1，如果是，则代表更新成功
    if (resObj.affectedRows < 1) {
      msgData.code = 400;
      msgData.msg = '参数错误~~~';
    }
    /* resObj = 
    {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      serverStatus: 2,
      warningCount: 0,
      message: '(Rows matched: 1  Changed: 0  Warnings: 0',
      protocol41: true,
      changedRows: 0 }
    */

    //b4.关闭连接通道
    connObj.end();

    //b5.发送消息回浏览器
    res.send(msgData);
  });
});

// 2.5 查询英雄     --------------
usrR.get('/search', (req, res) => {
  //准备消息对象
  let msgData = makeMsgData(200, '查询成功~~~');

  //a.获取 url 中 传来的 ID值 url?id=1
  let heroId = req.query.id;
  //b.查询 数据库
  //b1. 获取连接通道对象 
  let connObj = dbsql.getConn();
  //b2. 准备查询语句
  let strSql = `select * from heroinfo where id=${heroId}`;
  //b3. 执行查询
  connObj.query(strSql, (err, resArr) => {
    if (err == null) {
      if (resArr.length > 0) {
        msgData.data = resArr[0];
      } else {
        msgData.code = 400;
        msgData.msg = '对不起，没有数据~~~~可能是参数错误~~！';
      }
    } else {
      msgData.code = 500;
      msgData.msg = '对不起，服务器繁忙，请稍后再试~~~~';
      console.log('根据id 查询英雄 出错：' + err.message);
    }

    //b5.关闭连接通道
    connObj.end();
    //b6.发送消息对象 给浏览器
    res.send(msgData);
  });

  // //d.判断结果
  // if (heroObj == null) {
  //   msgData.code = 400;
  //   msgData.msg = '参数错误~~~'
  // }
  // //e.返回消息给浏览器
  // res.send(msgData);

});

// 2.6 修改英雄     --------------
usrR.post('/edit', upload.single('icon'), (req, res) => {

  //a.准备消息对象
  let msgData = makeMsgData(203, '修改成功~~！');

  //a.接收 浏览器上传的 修改 数据
  let editHero = {
    id: req.body.id,
    name: req.body.name,
    skill: req.body.skill,
    // 设置 数据对象 的 图片名称时，判断 浏览器是否有提交新的图片文件
    icon: req.file ? req.file.filename : ''
  };

  //b.校验 id/name/skill 不能为空，图片可以为空
  if (editHero.name == "" || editHero.skill == "" || editHero.id == "") {
    msgData.code = 407; // 设置 执行状态码 为 407，告诉浏览器 数据有误
    msgData.msg = '数据有缺失，请检查后再提交~~~ 如果您是尊贵的黑客，请放过小站~~~';
  } else {
    //c.根据 是否有上传图片 准备 不同的 sql语句
    let strSql = `update heroinfo set name='${editHero.name}' ,skill = '${editHero.skill}' where id=${editHero.id}`;

    if (editHero.icon != '') {
      strSql = `update heroinfo set name='${editHero.name}' ,skill = '${editHero.skill}',icon='${editHero.icon}' where id=${editHero.id}`;
    }

    //d.执行 sql语句
    let connObj = dbsql.getConn();
    connObj.query(strSql, (err, resObj) => {
      // 如果 更新语句 在数据库 中的 影响行数 < 1 ，说 修改失败
      if (resObj.affectedRows < 1) {
        msgData.code = 401;
        msgData.msg = '修改失败~~';
      }
    });

    //e.关闭连接
    connObj.end();

    //f.发送 消息 回浏览器
    res.send(msgData);
  }



  // //c.返回数据
  // let msgData = makeMsgData(203, '修改成功');
  // if (!isOk) {
  //   msgData.code = 400;
  //   msgData.msg = '参数错误~~！';
  // }

  // res.send(msgData);
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
    code, //: code,
    msg, //: msg
    data
  };
}

//4. 导出 路由表对象
module.exports = usrR;