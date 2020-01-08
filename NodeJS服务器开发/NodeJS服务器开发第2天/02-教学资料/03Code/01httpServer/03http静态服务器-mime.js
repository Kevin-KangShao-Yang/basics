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
const mime = require('mime');

// b. 创建服务器 --------------------------
//    createServer 方法中的 回调函数 调用时机：每当 有浏览器请求 这个 服务器，就会自动调用
//                                  (request - 请求报文对象， response - 响应报文对象)
const app = http.createServer((request, response) => {
  // request.method - get/post
  // request.url - 请求的文件路径 ：  ./1.html
  console.log('妈妈，又有人来请求我了~~~' + request.url); // 
  // b1.设置 content-type ------------------------------------------------------
  // b1.1 获取 mime值 （注意：需要下载 第三方模块 mime ，并导入 才能使用）
  let mimeStr = mime.getType(request.url);
  console.log(mimeStr);

  // b1.2 告诉浏览器 使用 utf8 来解析文字  ，并 按照 对应mime 值来解析响应数据
  // response.setHeader('Content-Type', mimeStr + ';charset=utf8');
  response.setHeader('Content-Type', `${mimeStr};charset=utf8`); // 使用 模板字符串"拼接"变量

  //c1.拼接 被请求文件的 绝对路径 ------------------------------------------------
  let fPath = path.join(__dirname, 'web', request.url);
  //c2.拼接 404 文件 的 绝对路径
  let f404Path = path.join(__dirname, 'web', '404.html');

  //d.读取被请求文件内容 -------------- -------------------------------------------
  fs.readFile(fPath, (err, filedata) => {
    //e.读取成功
    if (err == null) {
      // e1.将 读取内容 发回浏览器 -------------
      response.end(filedata);
    }
    //f.读取失败的话，将 404 页面内容 读取 并发回 浏览器
    else {
        // f1.读取 404 页面的 内容
        fs.readFile(f404Path, (err, data404) => {
          // f2.读取 404 页面 内容 发回  浏览器--
          response.end(data404);
      });
    }
  })

});

// c. 开启服务器
app.listen(3747, (err) => {
  if (err == null) {
    console.log('开启服务器成功123：3747');
  } else {
    console.log('开启失败：' + err.message);
  }
})