//1.根据 浏览器 的 请求 url 中的 页面 名称，读取 对应 文件夹中的 静态页面，并 返回 给浏览器
//2.思路：
//  2.1 导入 http 模块 实现 和浏览器的交互
//  2.2 *通过 req.url 获取 请求的 文件 路径
//  2.3 使用 fs 模块 读取目标文件
//      a.如果 有，就 读取 目标文件 并返回
//      b.    没有，就 读取 404.html 并返回

// a. 导包
const http = require('http');
const fs = require('fs');
const path = require('path');

// b. 创建服务器 --------------------------
//    createServer 方法中的 回调函数 调用时机：每当 有浏览器请求 这个 服务器，就会自动调用
//                                  (request - 请求报文对象， response - 响应报文对象)
const app = http.createServer((request, response) => {

  console.log('妈妈，又有人来请求我了~~~' + request.url);
  // request.method - get/post
  // request.url - 请求的文件路径 ：  ./1.html

  // 告诉浏览器 使用 utf8 来解析文字
  response.setHeader('Content-Type', 'text/html;charset=utf8');

  //c.拼接 被请求文件的 绝对路径 ----------------------------
  let f404Path = path.join(__dirname, 'web', '404.html');
  let fPath = path.join(__dirname, 'web', request.url);

  //d.判断 被请求的 文件是否存在，并 读取文件内容 --------------
  fs.readFile(fPath, (err, filedata) => {
    //e.读取成功
    if (err == null) {
      // e1.将 读取内容 发回浏览器 ----------- ---------------
      response.end(filedata);
    }
    //f.读取失败
    else {
      // f1.读取 404 页面的 内容
      fs.readFile(f404Path, (err, data404) => {
        // f2.读取 404 页面 内容 发回  浏览器------------------
        response.end(data404);
      })
    }
  })

});

// c. 开启服务器
app.listen(3747, (err) => {
  if (err == null) {
    console.log('开启服务器成功：3747');
  } else {
    console.log('开启失败：' + err.message);
  }
})