//1.目标：向当前文件夹中写入 一个 新文件 3.txt ，内容为：讨厌死鬼~~~
//1.1 导包
const fs = require('fs');

//1.2 调用 fs.writeFile 写入(保存)文件
fs.writeFile('./3.txt', '讨厌死鬼~~~', (err) => {
  if (err == null) {
    console.log('保存成功啦~~~');
  }else{
    console.log('保存失败：'+ err.message);
  }
});