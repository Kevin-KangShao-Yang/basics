//1.导包
const hash = require('hash.js');

//2.               算法         原文               转成16进制字符串
let hashStr = hash.sha256().update('i love u').digest('hex');

console.log('i love u');
console.log(hashStr);

// i love u
// 157d7e5dd205abedbe8e20a33e91fc80158fac99d4a3fdd7980eec6a0ec94a27
