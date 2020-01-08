// 目标：将  针对 mysql 数据库 的 通用操作 封装在 一个 js 文件中
// 1.导包
const mysql = require('mysql');
// 2.创建 连接通道对象
const connection = mysql.createConnection({
    host:'127.0.0.1',
    user: 'root', // 数据库 登录名
    password: 'root', // 数据库 登录密码
    database: 'hero' // 要操作的 数据库名称
});
//3.打开连接通道
connection.connect();

// *** 导出  连接通道 对象
module.exports = connection;

