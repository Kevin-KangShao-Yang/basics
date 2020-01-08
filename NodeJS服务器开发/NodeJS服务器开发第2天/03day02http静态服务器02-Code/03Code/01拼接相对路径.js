//1. 目标：读取 同级目录 下的 01dog.txt 文档
//2. 实现
//2.1 导包 fs
//2.2 路径准备： __dirname + '/01dog.txt'
//2.3 用包 fs.readFile

const fs = require('fs');
const path = require('path');


//         js文件夹绝对路径  +  相对路径（目标文件相对于当前js文件 所在的路径）
let fPath1 = __dirname + '../01dog.txt'; 
console.log(fPath1); // f:\01Edu\01深圳\02.3前端\00_JZ课件授课\40期a班\NodeJS\Day02http与express\03Code../01dog.txt

//   补充： path.join  会 自动 识别  路径中的  特殊符号，并且 做 对应的处理： .. 向上跳出一级文件夹
let fPath2 = path.join(__dirname, '../01dog.txt');
console.log(fPath2); // f:\01Edu\01深圳\02.3前端\00_JZ课件授课\40期a班\NodeJS\Day02http与express\01dog.txt

// fs.readFile(fPath, 'utf8', (err, data) => {
//   if (err == null) {
//     console.log(data);
//   } else {
//     console.log(err.message);
//   }
// });
