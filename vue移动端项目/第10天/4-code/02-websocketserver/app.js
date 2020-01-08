// 开启一个服务器

// 导入 express 创建一个对象
var app = require("express")();
// 创建一个 http 服务器，传入 app
var http = require("http").createServer(app);
// 导入 io
var io = require("socket.io")(http);

// 设置路由： / ===》 响应 hello world
app.get("/", function(req, res) {
  // 响应 Index.html
  res.sendFile(__dirname + "/index.html");
});

// 添加一个连接事件
io.on('connection', function(socket) {
    console.log('有客户端连接上来了')
    // socket：就是连接服务器的 socket
    // 接收浏览器发送过来的数据
    socket.on('chat message', function(data) {
        // console.log(data)
        // 接收到的数据返回到浏览器：
        // socket.emit('serve message', data)
        // 广播
        io.emit('serve message', data)
    })
})

// 开启服务器： 3000
http.listen(3000, function() {
  console.log("listening on *:3000");
});
