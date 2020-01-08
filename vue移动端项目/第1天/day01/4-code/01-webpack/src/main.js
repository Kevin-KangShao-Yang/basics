// 模块化计算器
//  模块化：
//      一个 js 文件是一个单独的模块
//      一个模块有自己特定的功能

// 导入计算模块 ES6 规范
// import calc from "./asstes/calc"
// nodejs 中规定的模块的导入和导出
const calc = require('@/asstes/calc')
import Vue from 'vue'
import App from '@/App'

// 导入样式
import '@/style/index'
import '@/style/less.less'
import '@/style/sass.scss'
// 导入 bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap'

// 得到所有元素
let t1 = document.querySelector("#t1");
let t2 = document.querySelector("#t2");
let t3 = document.querySelector("#t3");
let sel = document.querySelector("#sel");
let btn = document.querySelector("#btn");

let name = 'xjj'
let age = 18

// 给按钮绑定事件
btn.onclick = function() {
  // 得到 t1 和 t2 的 value
  let v1 = t1.value;
  let v2 = t2.value;
  // 得到运算符号
  let fh = sel.value;
  // 判断
  switch (fh) {
    case "+":
      t3.value = calc.add(v1, v2);
      break;
    case "-":
      t3.value = calc.sub(v1, v2);
      break;
    case "x":
      t3.value = calc.mul(v1, v2);
      break;
    case "/":
      t3.value = calc.div(v1, v2);
      break;
  }
};


// 创建一个 Vue 的实例
new Vue({
  el: '#app',
  render: h => h(App) // 将 App 渲染到 App 元素中
})