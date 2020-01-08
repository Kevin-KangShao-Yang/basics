//1.同步代码：代码 由上到下，逐一执行，中间即时有 耗时操作，也要等待执行
console.log('1.我正在吃饭');
console.log('2.我正在吃饭2');

for (let i = 1; i <= 5; i++) {
  console.log('我正在吃燕窝' + i);
}

console.log('3.我已经胖了~~~');