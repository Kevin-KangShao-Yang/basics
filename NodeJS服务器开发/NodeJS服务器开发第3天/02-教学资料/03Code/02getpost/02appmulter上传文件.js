const express = require('express');
const multer = require('multer'); // 1.导入 multer 模块包， 用来接收 浏览器使用 post 提交的 formdata格式的 数据
// 创建服务器程序
let app = express();

let upload22 = multer({ dest: 'uploads/' }); // 2.创建 multer 上传组件对象，设置 用来保存 上传文件的 文件夹路径

// 3.目标：获取 浏览器 post 传来的 formdata 格式 的 数据-----------------------------------------------------
//   中间 添加了 一句 upload22.single('txtFile') 代码
//   此句代码法力无边，*a.会 自动 将 浏览器 post提交来的 formdata格式 数据  封装到 req.body 中
app.post('/reg', upload22.single('txtFile'), function (req, res) {
  console.log(req.body);
  console.log(req.body.txtName);
  console.log(req.body.txtPwd);

  res.send('注册成功啦~~亲~~~一起去南沙曾母暗礁 度蜜月吧~~~~');
});

// 4.目标：获取 浏览器 post 传来的 fromdata 格式 的 数据和文件 -------------------------------------------------
//   通过 upload22.single('filePic') 告诉 上传组件 提交来的数据中 filePic 字段里 有要保存的文件
app.post('/upload',upload22.single('filePic'), (req, res) => {
  // 4.1 req.body：post 提交来的数据 通过 req.body 可以访问到（非文件选择框的字段）
  console.log(req.body.txtName);

  let upF01 = req.file;
  console.log(upF01);

  //*** 【reqeust.file】 保存 了 上传文件的 相关信息
  //       filename:上传到服务器后 生成的 随机名字 -- 不带后缀名
  //       destination:上传到服务器 中的 文件夹名字
  //       mimetype:文件类型
  //       fieldname: 上传文件 在 浏览器端 的 原始文件名

  // {
  //   fieldname: 'heroPic',
  //   originalname: '无界2014泰国教练合照.jpg',
  //   encoding: '7bit',
  //   mimetype: 'image/jpeg',
  //   destination: 'uploads/',
  //   filename: '12c1faab38a68593572fb67d0ee9ec88',
  //   path: 'uploads\\12c1faab38a68593572fb67d0ee9ec88',
  //   size: 353258
  // }

  res.send('上传成功啦~~~');
})

// 启动服务器程序，监听一个 端口号
app.listen(3747, (err) => {
  if (err == null) {
    console.log('开启服务器成功：3747');
  } else {
    console.log('开启失败：' + err.message);
  }
})