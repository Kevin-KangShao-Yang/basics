// 作用：统一管理项目中的配置信息
const path = require("path");
// 导入插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  // 当前项目的入口文件
  entry: "./src/main.js",
  // 设置出口
  output: {
    filename: "main.js", // 打包后生成的文件名
    path: path.resolve(__dirname, "dist")
  },
  // 将当前环境设置为开发环境：打包后的代码不会压缩
  mode: "development",
  // 添加一个源码映射
  devtool: "source-map",
  // 解析
  resolve: {
    // 配置别名
    alias: {
      "@": path.resolve(__dirname, "src") // 将 @ 符号设置为 src 路径
    },
    // 省略的扩展名
    extensions: ['.js', '.vue', '.css']
  },
  // 开启服务器
  devServer: {
    contentBase: "./dist",
    hot: true // 开启模块换替换
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      title: "Output Management",
      filename: "index.html", // 将来生成静态文件的名称
      template: path.resolve(__dirname, "index.html") // 当前生成的静态文件以谁为模板来生成
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ],
  // 配置当前项目的打包规则
  module: {
    // 规则的集合
    rules: [
      // 打包 .vue
      {
        test: /\.vue/,
        use: ["vue-loader"]
      },
      // 打包 css
      {
        test: /\.css/, // 匹配后缀名为 .css 的文件
        use: [
          // 使用 style-loader ,css-loader
          "style-loader", // 将样式以 style 标签的形式加载到页面上
          "css-loader" // 将 css 打包到 main.js
        ]
      },
      // 打包 less
      {
        test: /\.less/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader" // 解析 less 语法
        ]
      },
      // 打包 sass
      {
        test: /\.scss/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader" // 解决 sass 语法
        ]
      },
      // 打包图片
      {
        test: /\.(gif|jpg|png)$/,
        use: ["file-loader"]
      },
      // 打包字字体
      {
        test: /\.(ttf|woff2|woff|eot|svg)$/,
        use: ["file-loader"]
      },
      // 将 ES6 转为 ES5
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};
