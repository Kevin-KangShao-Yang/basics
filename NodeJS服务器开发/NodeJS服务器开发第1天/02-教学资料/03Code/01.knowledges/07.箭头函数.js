// -------------------------------------
//三种函数创建方式：
function show() {

}

let show2 = function () {

}

let show3 = new Function();


function a(func) {
  func();
}

a(function () {
  console.log('我是匿名函数~~~');
});

a(() => { console.log('我是箭头函数'); });


// 箭头函数存在的目的：让 匿名函数的 书写 更加简单 （在创造 箭头函数的 时代，当时 流行 叫做 函数式编程 -> 在数学计算领域 有着很宽泛的 应用场景）
// 函数式编程： 把函数 作为参数 和 返回值 调用 -> 匿名函数 ->

function showLove(toName) {
  return 'i love u ~ ' + toName;
}


let showLove2 = toName => 'i love u ~ ' + toName;

let loveWord = showLove2('Linda')
console.log(loveWord); // i love u ~ Linda


// 箭头函数（Arrow Function） ： 相当于匿名函数，并且简化了函数定义。

// 1. function 变为 =>
// 2. 参数：
//    2.1 参数只有1个 省略小括号
//    2.2 参数0个或多个，无法省略小括号
// 3. {}
//    3.1 如果 函数体 代码 只有一行 可以省略 {}
//    3.2 函数体多行 无法省略 {}
// 4. 返回值 return
//        函数体一行 有返回值 省略{} 的 同时 【必须省略 return 】


// 1. function 变为 =>  ---------------------------------------
function b(x) {
  console.log(x);
}

let b1 = (x) => { console.log(x); };

//2. 参数： ----------------------------------------------------
//2.1 参数只有1个 省略小括号 --------------
function c(x) {
  console.log(x);
}

let c1 = x => { console.log(x); };


//2.2 参数0个或多个，无法省略小括号---------
function d(x, y) {
  console.log(x, y);
}

let d1 = (x, y) => { console.log(x); };

function e() {
  console.log('我是快乐的小狗狗~~~');
}

let e1 = () => { console.log('我是快乐的小狗狗~~~'); };


// 3. 大括号 {} ------------------------------------------------------
//3.1 如果 函数体 代码 只有一行 可以省略 {} -----
function f(x) {
  console.log('我爱你 ' + x);
}

let f1 = x => console.log('我爱你 ' + x);

f1('讨厌~~'); // 我爱你 讨厌~~


//3.2 函数体多行 无法省略 {} ---------------------
function g(x) {
  console.log('我爱你 ' + x);
  console.log('我恨你 ' + x);
}

let g1 = x => {
  console.log('我爱你 ' + x);
  console.log('我恨你 ' + x);
};


// 4. 返回值  ---------------------------------------------------------
//        函数体一行 有返回值 省略{} 的 同时 【必须省略 return】
function h(x) {
  return x + ',讨厌，死鬼~~~';
}

let h1 = x => x + ',讨厌，死鬼~~~';

let str = h1('James');
console.log(str); // James,讨厌，死鬼~~~