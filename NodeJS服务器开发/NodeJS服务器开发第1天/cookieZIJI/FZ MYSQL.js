const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'student'
})

connection.connect();
// *** 导出  连接通道 对象
module.exports = connection;