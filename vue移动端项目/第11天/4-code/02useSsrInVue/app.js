const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url,
      list: [{id: 1, name: 'xjj'}]
    },
    template: `<div>访问的 URL 是： {{ url }} ==== {{ list[0].name }}</div>`
  })

  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `)
  })
})

server.listen(8080)



// // 1.0 导入 Vue
// const Vue = require('vue')

// // 2.0 创建一个 Vue 的实例
// const app = new Vue({
//     template: `<div><h1>我是模块代码</h1> {{msg}}</div>`,
//     data: {
//         msg: 'haha'
//     }
// })

// // 3.0 创建一个 renderer 对象，用来进行服务器渲染
// const renderer = require('vue-server-renderer').createRenderer()

// // 4.0 进行服务器渲染
// renderer.renderToString(app, (err, html) => {
//     if (err) throw err // 抛出异常
//     console.log(html)
// })