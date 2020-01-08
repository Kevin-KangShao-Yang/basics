// 单独的模块

// 定义一个属性
const name = "xjj";
const age = 19
function sayHi2() {
    console.log('再说一次，你好啊')
}

// 定义一个方法
function sayHi() {
  console.log("你好啊");
}

// 1.0 默认导出
//  缺点：只能导出一个内容
export default sayHi;

// 2.0 按需导出
export { name, age, sayHi2 };
