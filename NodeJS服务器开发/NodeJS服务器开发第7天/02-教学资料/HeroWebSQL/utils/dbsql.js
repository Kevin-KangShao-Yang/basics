var mysql = require('mysql');


// 导出 连接通道对象
module.exports = {
  // 获取 一个 新的 打开的 连接通道对象
  getConn: function () {
    //1.创建连接通道对象
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'hero'
    });

    //2.打开连接通道 （与数据库建立连接）
    connection.connect();

    //3.返回 打开的连接通道
    return connection;
  }
};