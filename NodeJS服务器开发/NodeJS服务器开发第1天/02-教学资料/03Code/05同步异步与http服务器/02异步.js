
console.log('1.计时器前面的代码');
let num = 0;

let t1 = setInterval(() => {
  console.log('2.计时器内部的代码：num=' + num);
  if (num >= 3) {
    clearInterval(t1);
  }
  num++;

}, 100);

console.log('3.计时器后面的代码');


