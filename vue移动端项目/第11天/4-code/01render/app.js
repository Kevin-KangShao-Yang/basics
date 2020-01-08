// 通过 express 开启服务器

const fs = require('fs');
// 导入 express
const express = require("express");
// 创建一个 app 服务器对象
const app = express();

// 设置静态资源
app.use(express.static('views'))

// 设置请求路由
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 设置一个服务端渲染的路由
// 将来在浏览器中请求路由：ssrindex，会执行后面的 js 代码
app.get('/ssrindex', (req, res) => {
    // 1.0 得到静态页面：使用 fs 核心模块去读取 ssrindex.html 
    let html = fs.readFileSync('./views/ssrindex.html').toString() // 包含那个笑脸
    // 2.0 得到动态数据
    let data = require('./data/db.js') // 将 html 中的笑脸进行替换
    // 3.0 将结构与数据进行组合
    // 遍历数据源，生成 html 结构
    let dataStr = `<ul>`;
    data.forEach(item => {
        dataStr += `<li>${item.name}</li>`
    })
    dataStr += `</ul>`;
    // 3.1 替换笑脸
    let newHtml = html.replace('^.^', dataStr) // newHtml: 页面的结构 & 页面的数据
    // 4.0 返回给浏览器
    res.send(newHtml)
})

// 开启服务器
app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
