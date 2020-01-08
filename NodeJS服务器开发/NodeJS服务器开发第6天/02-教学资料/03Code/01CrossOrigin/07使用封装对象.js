//1.导入 06页面中 准备好的 连接通道对象
const conn = require('./06mysql封装.js');

//2.执行 sql 语句
conn.query('select * from heroinfo', (err, data) => {
    if (err == null) {
        console.log(data);
    } else {
        console.log('错了~~老婆：' + err.message);
    }
    conn.end();
});
