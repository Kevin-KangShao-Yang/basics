const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'web/uploads/' })
const db  = require('./utils/db');

//1. 中间件 --------------
//1.1 暴露 静态文件夹
app.use(express.static('web'));
//1.2 注册 bodyParser 中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//2. 路由-----------------
// 2.1 注册 登录 路由
app.post('/login', (req, res) => {
  //a.准备 响应消息对象
  let msgObj = {
    code: 200,
    msg: '登录成功~~！'
  };
  
  //b.判断，如果 登录失败，就 修改 消息对象里的 内容
  if (req.body.username != 'james' || req.body.password != '123456') {
    msgObj.code = 400;
    msgObj.msg = '用户名或密码错误~~！'
  }

  //c.向浏览器 发送 消息对象
  res.send(msgObj);
});

function makeMsgData(code=200,msg='获取成功',data=[]) {
  return {
    code,
    msg,
    data,
  }
}

app.get('/list',(req,res)=>{
let backData = makeMsgData(200,'获取成功');

let heroList = db.getHeros();

if (heroList !=null && heroList.length >0) {
  backData.data=heroList;
}else{
  backData.code=201;
  backData.msg="获取失败";
}

res.send(backData);

})

app.post('/add',upload.single('icon'),(req,res)=>{
  let addData ={
    name:req.body.name,
    skill:req.body.skill,
    icon:req.file.filename,
  };
  let isOk =db.addHero(addData);

  let msgData = makeMsgData(201,'新增成功');

  if (!isOk) {
    msgData.code=400;
    msgData.msg='新增失败';
  }

  res.send(msgData);
})

app.post('/delete',(req,res)=>{
  let deleID = req.body.id;
  let deleteHero = db.deleteHeroById(deleID);
  let deleData =  makeMsgData(202,'删除成功');
  if (!deleteHero) {
    deleData.code=400;
    deleData.msg='参数错误';
  }

  res.send(deleData);
})

app.get('/search',(req,res)=>{
   let seaId = req.query.id;
   let seaHero = db.getHeroById(seaId);
   let seaOk = makeMsgData(200,'查询成功',seaHero);
   if(!seaHero){
    seaOk.code=400;
    seaOk.msg='参数错误';
   }
   res.send(seaOk);
})


app.post('/edit',upload.single('icon'),(req,res)=>{
  let editObj = {
    id:req.body.id,
    name:req.body.name,
    skill:req.body.skill,
    icon:req.file.filename,
  };
  let editHero=db.editHero(editObj)
  let editData = makeMsgData(203,'修改成功');

  if (!editHero) {
    editData.code=400;
    editData.msg="参数错误";
  }
  res.send(editData);
})

// 启动服务器
const PORT = 3747;
app.listen(PORT, (err) => {
  if (err == null) {
    console.log('启动 【英雄项目】服务器成功：' + PORT);
  } else {
    console.log('启动失败:' + err.message);
  }
});