## webpack

### 1.0 webpack 基本概念

#### 1.1 前言：

+ vue 项目在开发阶段使用到的能力：
  + 自动开启一个服务器修改后保存，
  + 会自动在浏览器中更新
  + 能够加载 css
  + ...
+ 以上能力都是 vue-cli 赋与给 vue 的项目
  + 研究 vue-cli 是如何将这些能力赋予 项目
  + webpack：vue-cli 搭建的项目结构就是基于 webpack

#### 1.2 webpack 

+ 官网： https://www.webpackjs.com/ 

+ 是什么：
  + 打包工具：
+ 有什么用：
  + 用来将资源进行打包
+ 怎么用：

### 2.0 webpack 的使用

+ 准备工作：
  + 书写一个模块化计算器
    + 模块化：
      + 将项目的功能进行封装，一个 js 文件只负责一个功能
    + 步骤：
      + 1.0 书写一个计算器的界面
      + 2.0 实现计算功能
        + 获取页面上的数据
        + 获取计算符号
        + 给按钮绑定点击事件
        + 处理逻辑
        + 显示结果
      + 3.0 将功能进行模块化
        + 将计算方法单独封装成为一个模块
    + 结论：
      + 默认情况下浏览器不支持 js 的模块化
      + 想办法让浏览器支持模块化开发
      + 解决方案：使用 webpack 将模块化的代码进行打包，打包完成之后就可以在浏览器中执行
        + 项目是模块化
        + 项目也可以在浏览器中运行

#### 2.1 安装 webpack

+ 步骤：

  + 1）初始化项目

    ```
    npm init -y // 生成一个文件 package.json
    ```

  + 2）安装 webpack

    ```
    npm i --save-dev webpack
    npm install --save-dev webpack-cli
    ```

  + 3）设置打包指令

    ```
    -- package.json
    "script": {
      "start": "webpack ./src/main.js"
    }
    ```

  + 4）打包项目

    ```
    -- CMD
    npm run start
    ```

  + 总结：

    + webpack 可以用来打包模块化的 js 文件

#### 2.2 配置文件

+ 概念
  + 可以将项目中要用到的所有的配置统一进行管理
  + 将来便于代码的管理和维护


  + 添加配置文件步骤


      + 1）创建一个文件，名为： webpack.config.js

      + 2）在文件中添加代码

          ```js
          -- webpack.config.js
          module.exports = {
            entry: './src/main.js'
          }
          ```

    + 3）使用这个文件

        ```
        --package.json
        "script": {
         "start": "webpack --config webpack.config.js"
        }
        ```

    + 4）执行指令

        ```
        -- CMD
        npm run start
        ```

+ 设置配置项
  + 入口

    + entry

  + 出口

    + output
  
      ```
      const path = require('path') // nodejs 中的 path 核心模块
      module.exports = {
      	entry: './src/main.js',
      	output: {
      		filename: 'bundle.js', // 打包后生成的文件名
      		path: path.resolve(__dirname, 'dist') // 打包后生成文件的路径
      	}
      }
      ```
  
  + 模式
  
    + mode
      + production：生产环境
        + 代码会进行压缩
      + development：开发环境
        + 代码全原样输出
  
  + 解析
  
    + 别名
  
      ```
      resolve：{
      	alias: {
      		"@": path.resolve(__dirname, 'src')
      	}
      }
      ```
  
      
  
    + 扩展名
  
      ```
      resolve：{
      	alias: {
      		"@": path.resolve(__dirname, 'src')
      	},
      	extensions: ['.js', '.vue', '.css', '.less']
      }
      ```
  
      
  
  + 源码映射（ [source map](https://www.webpackjs.com/guides/development/#使用-source-map) ）
  
    + 作用：可以记录打包之前的文件的代码信息
  
      ```
      devtool: 'inline-source-map‘
      ```
  
  + ....

#### 2.3 加载器（loader） 

+ 前置知识
  + webpack 默认只能打包模块化的 js 代码
  + 使用 webpack 打包 css 代码会报错
  + 使用 **加载器(loader)** 可以扩展 webpack 的打包功能


+ css-loader


  + 作用：扩展 webpack 打包 CSS 的功能

  + 步骤：


    + 1）安装 loader

      ```
      npm install --save-dev style-loader css-loader
      ```

    + 2）在配置文件中添加配置项

      ```
      -- webpack.config.js
      module.exports = {
         entry: '',
         output: {},
         // 配置当前项目的打包规则
         module: {
          // 规则的集合
         	rules: [
         		// 第一个规则：打包 css 文件的规则
         		{
         			test: /\.css/, // 所有后缀名为 .css 的文件
         			use: [ // 如果文件匹配到 .css 的后缀，那么就使用 style-loader&css-loader 来进行打包
         				'style-loader',
         				'css-loader'
         			]
         		}
         	]
         }
      }
      ```

    + 3）重新打包项目

+ less-loader


  + 作用：扩展 webpack 打包 less 的功能

  + 步骤：


    + 1）安装 loader

      ```cmd
      npm i --save-dev less-loader less
      ```

    + 2）配置打包规则

      ```js
      -- webpack.config.js
      module.exports = {
      	module: {
      		rules: [
      			{
      				test: /\.less/,
      				use: [
      					'style-loader',
      					'css-loader',
      					'less-loader'
      				]
      			}
      		]
      	}
      }
      ```

    + 3）重新打包

+ sass-loader


  + 作用：扩展 webpack 打包 SASS 的功能

  + 步骤：


    + 1）安装

      ```
      npm install sass-loader node-sass --save-dev
      ```

    + 2）配置打包规则

      ```
      -- webpack.config.js
      module.exports = {
      	module: {
      		rules: [
      			{
      				test: /\.scss/,
      				use: [
      					'style-loader',
      					'css-loader',
      					'sass-loader'
      				]
      			}
      		]
      	}
      }
      ```

    + 3）重新打包

+ file-loader
  + 打包图片

    + 步骤

      + 1）安装
  
        ```
            npm install --save-dev file-loader
        ```
  
      + 2）配置打包规则
  
        ```js
        -- webpack.config.js
        module.exports = {
        	module: {
        		rules: [
        			{
        				test: /\.(png|svg|jpg|gif)$/,
        				use: [
        					'file-loader'
        				]
        			}
        		]
        	}
        }
        ```
  
        
  
  + 打包字体
  
    + 配置打包规则
  
      ```
      -- webpack.config.js
      module.exports = {
      	module: {
      		rules: [
      			{
      				test: /\.(ttf|woff2|woff|eot|svg)$/,
      				use: [
      					'file-loader'
      				]
      			}
      		]
      	}
      }
      ```
  
+ babel-loader


  + 作用：将 ES6 转为 ES5

  + 步骤：


    + 1）安装

      ```cmd
      npm install babel-loader@8.0.0-beta.0 @babel/core @babel/preset-env 
      ```

    + 2）配置打包规则

      ```
      -- webpack.config.js
      module.exports = {
      	module: {
      		rules: [
      			{
      				test: /\.js/,
      				exclude: /node_modules/,
      				use: {
      					loader: 'babel-loader',
      					options: {
      						presets: ['@babel/preset-env']
      					}
      				}
      			}
      		]
      	}
      }
      ```

    + 3）重新打包

+ vue-loader


  + 作用：打包 .vue 文件

  + 步骤：


    + 1）安装

      ```
      npm install -D vue-loader vue-template-compiler
      ```

    + 2）配置打包规则

      ```
      -- webpack.config.js
      // 导入文件
      const VueLoaderPlugin = require('vue-loader/lib/plugin')
      module.exports = {
      	module: {
      		rules: [
      			{
      				test: /\.vue/,
      				use: ['vue-loader']
      			}
      		]
      	},
      	plugs: [
      		new VueLoaderPlugin()
      	]
      }
      ```

    + 3）重新打包

#### 2.4 插件（plug）

+ 前置知识
  + webpack 配置只能配置项目的一些选项
  + webpack loader 只负责打包文件
  + 插件可以用来帮助我们的 webpack 提供一些强大的额外的功能
    + 自动生成一个 html 文件


+ HtmlWebpackPlugin


  + 作用：可以自动生成一个 html 文件

  + 步骤：


    + 1）安装

      ```
      npm install --save-dev html-webpack-plugin
      ```

    + 2）配置插件

      ```
      -- webpack.config.js
      // 导入插件
      const HtmlWebpackPlugin = require('html-webpack-plugin');
      
      module.exports = {
      	plugins: [
      		new HtmlWebpackPlugin({
      			title: 'hahahaha',
      			filename: '',// 生成文件的名称
      			template: path.resolve(__dirname, 'index.html') // 以 index.html 为模板
      		})
      	]
      }
      ```

    + 3）重新打包

+ clean-webpack-plugin


  + 作用：可以自动清除 dist 目录

  + 步骤：


    + 1）安装

      ```
      npm install clean-webpack-plugin --save-dev
      ```

    + 2）配置插件

      ```
      -- webpack.config.js
      // 导入插件
      const CleanWebpackPlugin = require('clean-webpack-plugin');
      // 配置
      module.exports = {
      	plugins: [
      		new CleanWebpackPlugin(['dist'])
      	]
      }
      ```

    + 3）重新打包

+ webpack-dev-server


  + 作用：将当前项目启动为一个服务器


    + 时实更新页面

  + 步骤：


    + 1）安装

      ```
      npm install --save-dev webpack-dev-server
      ```

    + 2）配置插件

      ```
      -- webpack.config.js
      module.exports = {
          devServer: {
            contentBase: './dist'
          }
      }
      ```

      ```
      -- package.json
      {
      	"script": {
      		"start": "webpack --config webpack.config.js",
      		"server": "webpack-dev-server --open"
      	}
      }
      ```

    + 3）执行指令

      ```
      npm run serve
      ```

+ HMR


  + 作用：模块换替换
  + hot: true

+ 总结：

  + webpack
    + 概念：
      + webpack 默认只能打包模块化的 js 文件
      + 配置：
        + 设置 webpack 打包时的选项
      + loader:
        + 设置 webpack 打包其它文件
      + 插件
        + 给 webpack 提供额外的功能

### 扩展

#### e1. 模块化与组件化的区别

+ 模块化
  + nodejs 中学习的
  + 概念：
    + 每个 js 文件都是一个模块
    + 每个模块有自己的特定的功能
  + 组成：
    + js 文件
  + 总结：
    + 功能 js 代码代段的封装
+ 组件化
  + vue 中学习的
  + 概念：
    + 将页面中的一个完整的功能拆分为一个单独的组 件
  + 组成
    + html ---> 结构
    + css    ----> 样式
    + js      -----> 行为
  + 总结：
    + 一个完整的功能
    + html & css & js
    + 组件化的概念比模块化要大

#### e2. npm 中下载的指令

+ -S / --save
  + 将依赖项保存到 package.json 中
  + 保存为依赖项：
    + 开发
    + 生产
+ -D / --save-dev
  + 将依赖项保存到 package.json 中
  + 保存开发依赖项
+ -g / --global
  + 全局安装

#### e3. __dirname

+ 当前文件所在绝对路径

#### e4. 样式 Loader

+ style-loader：将样式代码以 style 标签的形式添加到 index.html 中
+ css-loader：将样式文件打包到 main.js 中
+ less-loader：解析 less 语法
+ sass-loader：解析 sass 语法

#### e5. 总结 webpack

+ 配置信息
  + 给项目添加一些配置项，以达到一些特定的效果
  + 配置信息有很多
  + 常用的有：
    + 入口
    + 出口
    + 解析
      + 别名
      + 扩展名
    + 源码映射
    + ...
+ 加载器
  + 用来帮助 webpack 打包其它文件
    + less-loader
    + sass-loader
    + style-loader
    + css-loader
    + file-loader
    + babel-loader
    + ...
+ 插件
  + 给项目扩展强大的功能