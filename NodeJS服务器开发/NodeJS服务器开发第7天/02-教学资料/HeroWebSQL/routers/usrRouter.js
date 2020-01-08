// 保存 注册了 所有的 用户登录注册 相关的 接口
const express = require('express');
const bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
const dbsql = require('../utils/dbsql.js');

//1. 获取 路由表对象
const usrR = express.Router();


//2. 注册 中间件 - 通过 路由表对象
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

//3. 注册 路由 -   通过 路由表对象
// 2.1 注册 登录 路由     --------------
usrR.post('/login', (req, res) => {
  //a.准备 响应消息对象
  let msgObj = makeMsgData(200, '登录成功~~！');

  //b. 准备 sql 语句
  let strSql = `select * from userinfo where loginname='${req.body.username}' and loginpwd='${req.body.password}'`;

  //c. 创建连接通道
  let connObj = dbsql.getConn();

  //d. 执行查询语句
  connObj.query(strSql, (err, resArr) => {
    if (resArr.length <= 0) {
      msgObj.code = 400;
      msgObj.msg = '用户名或密码错误~~！'
    } else {
      // 登录成功，就要在服务器端 保存 用户名 到 session
      req.session.usrName = req.body.username;
    }

    // 关闭连接通道
    connObj.end();

    //c.向浏览器 发送 消息对象
    res.send(msgObj);
  });
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