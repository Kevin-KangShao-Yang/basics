const mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'student'
});

connection.connect();

connection.query('delete from students where id = 4',(err,result,fieldinfo)=>{
if (err==null) {
    console.log(result);

}else{
    console.log(err.message);
}

connection.end();
})


// 0.导入 mysql 模块
const mysql = require('mysql');
// 1.创建 连接通道 对象
var connection = mysql.createConnection({
host: 'localhost', // 数据库所在的 电脑 ip
user: 'root', // 数据库 登录名
password: 'root', // 数据库 登录密码
database: 'hero' ,// 要操作的 数据库名称
});
// 2.打开连接 （拨通电话）
connection.connect();
// 3.通过 连接通道 发送 sql 命令
// 回调函数的 3个参数： 错误对象，查询结果(用的很多,查询到的表格行转成的数组，数组中保存的是对象)， 字段信息(用的不多,查询到的表格列转成的数组，数组中保存的是对象)
//heroinfo  为 hero 数据库创建的 表格名   
//connection.query('mySQL增删改查的其中一项', 回调函数(err, result, fieldinfo) => { }
connection.query('select * from heroinfo where id = 0', (err, result, fieldinfo) => {
if (err == null) {
console.log(result); // 返回的是 查询到 的 表格行 转成的 数组，数组中保存的 是 对象
console.log('查询到的行数：' + result.length); //查询到  result  数组的长度
// 遍历  查询结果 数组（数组中每个元素 就是一个 行对象，里面包含 所有字段）
for (let i = 0; i < result.length; i++) {
// 取出 数组中 一个 行对象
let heroObj = result[i];
// 依次打印 对象中的 每个 字段 属性值
console.log(heroObj.id);
console.log(heroObj.name);
console.log(heroObj.skill);
console.log(heroObj.icon);
console.log(heroObj.isDelete); // 注意1：js 中 区分 大小写
 // console.log(Boolean(heroObj.isDelete)); // 注意2：Boolean方法 无法直接对 二进制数据 做 正确转换
}
// console.log(fieldinfo);  // 返回的是 查询到 的 表格列 转成的 数组，数组中保存的 是 对象  
} else {
console.log(err.message);
}
//4.关闭 连接通道（挂电话）
connection.end();
})