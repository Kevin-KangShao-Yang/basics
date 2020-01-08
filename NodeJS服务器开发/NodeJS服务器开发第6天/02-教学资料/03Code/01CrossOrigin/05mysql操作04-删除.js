// 0.导入 mysql 模块
const mysql = require('mysql');

// 1.创建 连接通道 对象
var connection = mysql.createConnection({
    host: 'localhost', // 数据库所在的 电脑 ip
    user: 'root', // 数据库 登录名
    password: 'root', // 数据库 登录密码
    database: 'hero' // 要操作的 数据库名称
});

// 2.打开连接 （拨通电话）
connection.connect();

// 3.通过 连接通道 发送 sql 命令
// 回调函数的 3个参数： 错误对象，查询结果(用的很多)， 字段信息(用的不多)
connection.query('delete from heroinfo where id = 7 or id=6', (err, result, fieldinfo) => {
    if (err == null) {
        console.log('删除结果：');
        console.log(result);
        /* 
        {
            fieldCount: 0,   
            affectedRows: 2,  -- 受影响行数
            insertId: 0,     
            serverStatus: 2, 
            warningCount: 0, 
            message: '',     
            protocol41: true,
            changedRows: 0   
        }
        */
        
    } else {
        console.log(err.message);
    }

    //4.关闭 连接通道（挂电话）
    connection.end();
})