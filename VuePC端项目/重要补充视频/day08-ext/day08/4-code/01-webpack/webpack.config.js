// 作用：统一管理项目中的配置信息
const path = require('path')

module.exports = {
  // 当前项目的入口文件
  entry: "./src/main.js",
  // 设置出口
  output: {
      filename: 'main.js', // 打包后生成的文件名
      path: path.resolve(__dirname, 'dist')
  }
};
