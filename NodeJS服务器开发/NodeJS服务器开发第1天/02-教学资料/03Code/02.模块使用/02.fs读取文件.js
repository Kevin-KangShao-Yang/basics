//1.目标：读取 相同目录下的 2.txt 文件
//1.1 导包：导入 模块 - fs
const fs = require('fs');

//1.2 调用 fs.readFile 方法 读取文件数据
fs.readFile('./2.txt', 'utf-8', (err, data) => {
  if (err == null) {
    console.log(data); // 打印 读取的内容
  } else {
    console.log(err.message); // 打印 失败的信息
  }
})