## mobile-day10

### 1.0 概述

#### 1.1 复习

+ http 协议：

  + 组成
    + 请求报文
    + 响应报文
  + 特点：
    + 无状态的
      + 状态保存机制
        + localstorage & sessionstorage
        + cookie & session
          + cookie：存储在浏览器端
          + session：存储在服务器端
    + 每次数据交互都需要连接&断开
      + 连接：
        + 三次握手
      + 断开：
        + 四次挥手

+ websocket

  + 作用：是一种通讯协议与 http 一样

  + 特点：

    + 一旦建立连接一般情况下不会断开
    + 服务器可以主动向浏览器发送数据

  + 基于浏览器的 websocket

    + 创建一个 websocket 
    + 连接服务器
      + var socket = new WebSocket('localhost:3000')
    + 发送数据给服务器
      + socket.send(value)
    + 接收服务器的数据
      + socket.onmessage = function(evt) { console.log(evt.data) }
    + 关闭连接
      + socket.close()

  + 使用 socket.io 框架来搭建一个 socket 服务器

    + a. 使用 Nodejs 搭建一个普通的服务器

    + b. 响应一个静态页面回浏览器

    + c. 在服务器中开启 socket 连接

    + d. 在浏览器中连接这个 socket

    + e. 浏览器与服务器进行数据交互

      + 浏览器
        + 发送数据给服务器
          + socket.emit('message', value)
        + 接收服务器的数据
          + socket.on('message', value => {})
      + 服务器
        + 发送数据给浏览器
          + 响应浏览器
            + socket.emit('message', value)
          + 广播
            + io.emit('message', value)
        + 接收浏览器的数据
          + socket.on('message', value=> {})

      ```js
      --- 服务器代码
      import io from 'socket.io'
      
      io.on('connection', function(socket) {
      	console.log('有客户端连接上了')
      })
      ```

      ```js
      --- 客户端代码
      // 导入 socket.io
      var socket = io('http://localhost:3000')
      ```

  + 在 vue 中使用 websocket

    + socket.io-client
      + 单独在 vue 项目中与服务器进行 socket 交互

+ 补充知识点：

  + $attrs：

    + 让内置属性可以直接作用在子组件中某一元素上
    + v-bind="$attrs"

  + inheritAttrs：

    + 让子组件中的根元素不继续父组件中传入的内置属性

  + $listeners

    + 让内置方法可以直接作用在子组件中的某一元素上
    + v-on="$listeners"

  + 插槽

    + 基本用法
    + 具名插槽：
      + 给 slot 添加一个属性 name
      + 将来使用组件时，添加一 v-slot:name 来替换对应的 slot
    + 默认插槽
    + 作用域插槽
      + 给 slot 添加一个数据源
      + 将来在使用组件中可以从替换 slot 的内容结构是得到数据

  + 在 vue 中封装一个组件：

    + 只能在页面中导入，使用

    + 直接通过 js 方式来调用

      + 注意点：

        + 一定不能是页面结构上的内容

      + 核心思想：

        + 将封装的组件以插件的形式挂载到 vue 的实例上

          ```
          // 导入组件对象
          import mymodel from './mymodel'
          // 导出一个插件
          export default {
            install: function(Vue) {
            	// 以组件对象为模板得到一个构造器
            	var modelCon = Vue.extend(mymodel)
            	// 给 Vue 的实例添加组件
            	Vue.prototype.$mymodel = function() {
          		// 创建一个组件对象
          		var newModel = new modelCon()
          		// 设置 newModel 的显示属性
          		newModel.showModel = true
          		// 将组件渲染成为虚拟 dom
          		var elModel = newModel.$mount().$el
          		// 将虚拟 dom 添加到页面中
          		document.body.appendChild(elModel)
          	}
            }
          }
          
          ```

  + 动态组件：

    + 作用：
      + 添加一个组件的占位，将来要进行组件切换时，设置这个占位的 is 属性
    + 用法：
      + <component :is="currentcom"></component>

  + mock.js

    + 作用：
      + 拦截 ajax 请求，生成假数据
    + 使用：
      + 拦截 ajax 请求
        + Mock.mock(path, method, function() { return {} })
      + 生成假数据
        + Mock.mock({...})
      + 生成的规则：
        + "name|rule": value
          + 属性名
          + 规则
          + 属性值

#### 1.2 今日内容

+ SEO
+ 客户端渲染 & 服务端渲染
+ vue 中的服务器渲染
+ 服务端渲染框架 Nuxt
  + 创建项目
  + 路由 
  + 视图
  + 异步数据
  + 生命周期
+ realworld
+ 综合案例

### 2.0 基本概念

#### 2.1 项目的打包

+ vue-cli 搭建的项目，写好之后可以使用
+ 指令：
  + npm run build 进行打包
+ 结构：
  + dist
    + css
    + js
    + index.html

#### 2.2 SPA 项目

+ 特点：所有的代码都是放在 index.html 中执行的
+ 优点：
  + 打开其它页面速度会很快
+ 缺点：
  + 第一次打开页面时非常慢
    + 原因：
      + 第一次打开会加载所有的资源
    + 解决方案： 
      + 路由的懒加载
  + 不利于 SEO 优化（不会去讨好爬虫）
    + 原理：
      + 所有的数据都是用异步请求动态获取，动态渲染到页面上的
      + 而在网页源代码中是看不到这些数据的
      + 网站爬虫也无法去收集到对应的关键字
    + 解决方案：
      + 不使用客户端渲染，选择使用服务端渲染

#### 2.3 SEO

+ 基本介绍：

  + 搜索引擎：百度
  + 优化：优化在搜索引擎中的排名
    + 因为排名越靠前，被点击的可能性越大，流量转换为用户的可能就越大

+ 方式：

  + 花钱买排名（人民币玩家）

  + 广发外链

    + 在各种社区&论坛发布自己网站的地址

  + 结构的语义化

    + 原理：

      + 在搜索引擎中当我们搜索关键字时，会将与这个关键字匹配的网站进行显示
      + 在搜索引擎还会去收集网站的信息：使用一个技术来收集（网络爬虫）

      + 网络爬虫如果收集信息：
        + 查看网页的源代码，遍历内容从上到下收集关键字
        + 如果遇到其它连接，会继续进入这个连接

### 3.0 客户端渲染与服务端渲染

#### 3.1 客户端渲染

+ 基本概念：
  + 中文 ：客户端渲染
  + 英文：CSR: Client Side Render

+ 特点:
  + 在网页源代码中看不到任何数据
  + 它的数据源是通过异步方式请求服务器
  + 通过 js 动态渲染到页面上
+ 缺点：
  + 不利于 SEO 优化

#### 3.2 服务端渲染

+ 基本概念
  + 中文：服务器渲染
  + 英文：SSR：Server Side Render
+ 特点：
  + 在网页源代码中可以看到数据
  + 它的数据源不是通过异步方式来得到的，而是服务器直接响应的
  + 浏览器只负责解析服务器响应回的数据

+ 总结：
  + 概念：	
    + SPA ----> 不利于 SEO 优化
    + SEO ----> 网络爬虫
    + 客户端渲染
      + 原理：
        + 第一次打开页面时只得到了页面的结构，并没有数据
        + 将来在页面会通过异步请求得到数据，再动态渲染数据
        + 结构与数据是分开加载的
          + 结构 ---》 打开页面时加载
          + 数据 ---》通过异步请求来加载
    + 服务端渲染
      + 原理：
        + 第一次打开页面时得到页面的结构与数据
        + 结构与数据是直接从服务器中的返回的
          + 结构 ---》在服务器中读取的静态页面
          + 数据 ---》直接从服务器中的获取的
          + 服务器将两者进行结合

### 4.0 在 vue 中的使用 SSR

+ 思想：

  + 在现有的 浏览器 ——————> 服务器的结构中添加一中间服务器
  + 浏览器  <====> 中间服务器 <====> 服务器
  + 真正做到服务器渲染并不后台服务器，而是我们自己搭建的中间服务器

+ 步骤：

  + 在中间服务器中返回 html 字符的方式

    + 1）安装

      ```
      npm i vue vue-server-renderer --save
      ```

    + 2）使用服务器渲染方式创建一个 vue 实例

      ```
      // a 导入了 vue
      const Vue = require('vue')
      // b. 创建了一个 vue 的实例
      const app = new Vue({
      	template: `<div></div>`
      })
      // c. 创建一但上 renderder 用来进行服务器渲染
      cosnt render = require('vue-server-renderer')
      // d. 进行服务器渲染
      renderer.rendreToString(app, (err, html) => {
        if (err) throw err
        console.log(html) // 渲染出来的 html 字符
      })
      ```

  + 与服务器进行集成
    + 总结：这种用法太麻烦了，不使用这种方式，建议使用  Nuxt.js

### 5.0 Nuxt.js

+ 基本概念:
  + 是什么：
    + 基于 vue.js 的一种 SSR 框架
+ 使用：
  + 