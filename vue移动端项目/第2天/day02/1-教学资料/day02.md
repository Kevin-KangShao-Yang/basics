## mobile-day02

### 1.0 概述

#### 1.1 复习

##### 1.1.1 上次上课内容

+ webpack

  + 是什么

    + 打包工具

  + 有什么用

    + 可以用来打包模块化的 js 代码（默认行为）
    + 通过 Loader 打包其它的文件
    + 通过 plugs 添加扩展功能
    + 通过配置文件来配置 webpack 的相关信息

  + 怎么用

    + 步骤

      + 1）初始化项目

        + npm init -y

      + 2）安装 webpack

        + npm i webpack --save-dev

      + 3）在 package.json 中添加打包指令

        ```
        "script": {
        	"start": "webpack ./src/main.js"
        }
        ```

      + 4）开始打包

    + 内容

      + 配置文件
        + 创建配置文件
        + 配置项：
          + input
          + output
          + mode
          + sourcemap
          + resolve
            + aligns 设置别名
            + extensions： 设置可省略的后缀
          + ....
      + loader（加载器）
        + css-loader
        + sass-loader
        + less-loader
        + file-loader
        + babel-loader
        + vue-loader
      + plugs （插件）
        + HTMLWebpackPlugs：自动以一个静态文件为模板生成一个 html 文件
        + Clear-webpack-plugs：自动清除 dist 目录
        + webpack-dev-server：将项目开启为一个服务器，实时的同步更新
          + 模块的换替换
        + ...

+ 移动端的项目

  + 项目完整流程的复习
  + 开始准备材料
  + 项目用到的技术
    + vue
    + vue-cli
    + vue-router
    + vuex
    + axios
    + vant
    + 。。。
  + 搭建项目的结构
    + 使用 vue-cli 脚手架来搭建
    + 复习了结构的运行流程
    + 改造项目结构

+ vant

  + 是什么

    + 它是基于 vue.js 的移动端的组件库

  + 有什么

    + 可以帮助程序员快速搭建移动端的页面结构

  + 怎么用

    + 下载&引用&使用组件

    + 注意点：

      + 插槽

        ```
        <van-cell title="标题" value="默认值" ></van-cell>
        使用插槽
        <van-cell>
        	<template slot="title">
        		这是覆盖 title 的内容
        	</template>
        	<template slot="default">
        		这是覆盖 value 的内容
        	</template>
        </van-cell>
        ```

#### 1.2 今日内容

+ 完成登录页面
+ 开始首页功能

### 2.0 前置知识点：

#### 2.1 模块的导入与导出

+ nodejs

  + commonjs 规范
    + 是什么
      + 是 nodejs 的一个模块化规范
    + 有什么用
      + 它用来规定 nodejs 中模块的导入与导出
    + 怎么用
      + 导入：
        + const path = require('path')
      + 导出：
        + module.exports = {} 

+ ES

  + es6 规范

    + 是什么
      + 它是前端的一个模块化规范
    + 有什么用
      + 它用来规定前端模块的导入与导出
    + 怎么用
      + 导入
        + import path from 'path'
      + 导出
        + exports default {}

  + 代码演示：

    + 1）搭建一个项目结构（vue-cli2.x）

      + 注意点：

        + 由于大家的电脑中安装的都是 vue-cli 3.11.4，是无法使用 2.x 方式来安装的

      + a. 安装一个桥接工具

        ```
        npm install -g @vue/cli-init
        ```

      + b.  生成项目

        ```
        vue init webpack project
        ```

      + c. 选择生成项目的选项就 OKEY 了

    + 2）创建一个单独的模块

    + 3）在 App.vue 中使用模块中暴露出来的内容

  + 总结：

    + 模块中
      + 1.0 默认导出&导入
        + 导出
          + export default sayHi
        + 导入
          + import sayHi from './mytool'
      + 2.0 按需导出&导入
        + 导出
          + export { name, age, sayHi2 }
        + 导入
          + import { name } from './mytool'
          + 简写
            + import * as obj from './mytool'

### 3.0 项目-登录功能

#### 3.1 完成静态页面

+ 创建登录的组件（login）&路由（/login）
+ 完成登录的静态布局
  + 头部
    + vant 中的 navBar
  + 输入框
    + vant 中的 field
    + 使用 iconfont 字体图标
  + 登录按钮
    + vant 中的 button

#### 3.2 参数的合法性验证

+ 准备知识点：
  + fielde 字体中  error-message 属性的使用
    + 1）给组件添加 error-message 属性，绑定一个动态的值
    + 2）在 data 中定义动态的值
    + 3）判断：field 中的字段是否合法
      + 如果合法就不作任何处理
      + 如果不哈法就给 error-message 属性中添加内容
+ 步骤：
  + 1）给参数添加对应的验证属性
  + 2）判断参数是否满足条件

#### 3.3 完成登录参数的提交

+ 步骤：

  + 1）获取参数的数据

  + 2）将参数提交到服务器

    + 接口

      + url： http://ttapi.research.itcast.cn/app/v1_0/authorizations 

      + method: POST

      + 参数

        + body
          + mobile 手机号
          + code     验证码

      + 返回的数据

        ```
        {
        	"message": "",
        	"data": {
        		"token": "",
        		"refresh_token": ""
        	}
        }
        ```

  + 3）接收数据的判断进行判断

    + 如果登录成功，直接跳转到 home 页
    + 如果登录失败，提示错误信息

  + 4）添加其它功能：

    + 将用户登录 token 保存到 localstorage 中
      + window.localstorage.setItem(key, value)

#### 3.4 将 axios 封装到一个单独的模块中

+ 步骤：
  + 1）在 utils 中创建一个单独的文件：request.js
  + 2）将逻辑代码添加到 request.js 中
    + 导入 axios 实例
    + 设置统一的基准地址
    + 设置拦截器
  + 3）在 login 页面中引入文件&调用方法

+ 总结：
  + 这样封装产生的结果是，使用 aioxs 时，需要两步操作
    + 1）导入 request.js
    + 2）使用 reques()
  + 每个页面在使用时都需要重新导入一次太麻烦了
  + 我们需要解决这个问题:
    + 每次都要导入的问题
  + 解决方案
    + 使用 axios 中的插件来完成
    + 将来可以将 request.js 封装为 vue 的插件

#### 3.5 将 login 请求单独封装到一个文件中

+ 思想：
  + 封装的思想：由于在 Login 页面中直接发送到服务器中，使得 Login 中代码量变大
  + 解决方案：将 Login 请求服务器的代码单独封装到一个文件中
+ 步骤：
  + 1）在 api 文件夹下创建一个文件 user.js 用来存放登录的网络请求
  + 2）在文件中添加一个方法： userLogin
    + 发送请求到服务器
  + 3）将方法暴露给外界
  + 4）在 login 页面中导入这个方法
  + 5）在 login 页面中调用这个方法









### 扩展：

#### e1. 其它模块化规范

+ commonjs
+ es6 规范 
+ AMD
  + require.js 
    + 实现了 AMD 规范的框架
+ CMD
  + sea.js
    + 实现了 CMD 规范的框架

#### e2. vue-cli2.x 与 vue-cli3.x 创建项目的区别

+ 项目结构
  + 2.x
    + 静态文件直接放到根目录下
    + 配置文件可以直接在项目中找到
  + 3.x
    + 静态文件被管理到了 public 目录下
    + 配置文件被隐藏了，我们无法看到

+ 创建项目的指令
  + 2.x
    + vue init webpack porject
  + 3.x
    + vue create porject
+ 启动项目的指令
  + 2.x
    + npm run dev
  + 3.x
    + npm run serve

#### e3. 在项目中使用 iconfont

+ 步骤：
  + 1）打开网站： https://www.iconfont.cn/ 
  + 2）选择自己需要的图标，添加到购物车中
  + 3）在 iconfont 中添加一个项目，将选择的字体添加到项目中
  + 4）选择 font-class，生成在线代码
  + 5）在项目中创建一个 css 文件，将生成的代码复制
  + 6）直接使用

#### e4. vue 的插件：

+ 已经学习过的 vue 的插件：
  + vue-router
    + 步骤：
      + 导入 vue-router
        + import VueRouter from 'vue-router'
      + 使用 vue-router
        + Vue.use(VueRouter)
  + vuex
    + 步骤：
      + 导入 vuex
        + import Vuex from 'vuex'
      + 使用 vuex
        + Vue.use(Vuex)
  + vant
    + 。。。。
  + 插件：
    + 步骤：
      + 导入插件
      + 在 vue 中使用 Vue.use
+ 目的：自己封装一个 request.js 
  + 步骤：
    + 导入 request.js
    + 在 vue 中使用
      + Vue.use(request)
+ 定义步骤：
  + 1）创建一个单独的文件
  + 2）在文件中添加一个对象
  + 3）给对象添加一个  `install`   方法
    + 在 install 方法中添加自己的逻辑就 OKEY 了
    + install 方法的第一个参数是 Vue 的构造器
  + 4）将这个对象暴露给外界
  + 5）在 main.js 中的导入这个文件
  + 6）通过 Vue.use 来使用

#### e5. promise 的应用：

+ #### 应用案例

  + axios.get('/aritcle').then(res => {}).catch(err => {})

+ 方法：

  + then()
    + 作用：处理正常运行时的逻辑代码
  + catch()
    + 作用：处理逻辑代码出错时的情况

+ 使用一下：

  + $.ajax() 返回的也是 promise 对象

+ 总结：

  + promise 其实我们已经用的很多了
    + axios.get() 返回的就是一个 promise 对象
    + $.ajax 返回的也是一个 promise 对象
  + 将来在使用时 ，要需要记住
    + 在 pormise 中可以使用 then & catch 方法