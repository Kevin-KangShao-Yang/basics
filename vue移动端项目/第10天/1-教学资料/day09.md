## day09-补充知识点

### 1.0 概述

#### 1.1 复习

+ 复习整个的功能和技术点：
  + 项目准备工作：
    + 项目的开发流程：
      + 销售 --->  产品经理（需求文档，原型图） ---> 项目经理（开发文档） ----->  美工（原型图 ---> 项目的设计稿）、后端程序（开发接口）、前端（设计稿 ---> html 页面， 后端的接口 ---> 渲染到页面上） ----> 测试 ---> 上线 ----> 销售
    + 准备材料
      + 设计稿
      + 开发文档
  + 项目的书写
    + 搭建项目的结构
      + 使用 vue-cli3.x 搭建一个项目结构
      + 改造项目结构：
        + api	封装所有的网络请求接口
        + utils  管理当前项目中所有的辅助的文件
        + styles 管理当前项目中的所有的全局样式
        + components 管理当前项目中的所有组件
        + views 管理当前项目中的所有的页面
        + router/index.js  路由文件
        + store/index.js vuex 文件
      + 介绍项目的运行流程：
        + SPA：
          + index.html ----> 引入 main.js
          + main.js
            + 引入发 vue
            + 引入了 vuex
            + 引入了 router
            + 引入了 App
            + 创建了一个 vue 实例，加载了  vuex, router，将 App.vue 渲染到了页面上
    + 功能：登录
      + 组件&路由
      + 使用 vant 完成静态页面
      + 完成登录逻辑
        + 通过 axios 将登录的信息提交到服务器
        + 通过 vuex 将登录信息保存起来
          + 通过 localstorage 将信息保存到本地
    + 功能：首页
      + 组件&路由
      + 将底部的 tab 栏单独封装为一个组件以嵌套中的方法将首页作为 tab 栏的子路由存在
      + 使用 vant 完成静态页面
        + 深度选择器：>>> , /deep/
      + 渲染频道数据：
        + 通过 axios 发送请求到服务器
          + 已登录
            + 每次请求都需要携带 token
              + 在 axios 的请求拦截器中的请求头中添加了一个 token
              + 在 axios 的响应拦截器中返回了 res.data.data
          + 未登录
            + 判断 localstorage 中是否存在频道数据
              + 存在：取出，并且渲染
              + 不存在：发送请求到服务器获取默认的频道数据
        + 接收数据并且渲染到页面上
      + 频道下的文章数据
        + 获取文章数据之后
          + 通过 $set 给频道数据添加一些属性：
            + articleList
            + up
            + pull
            + fininshed
        + 发送请求到服务器得到对应频道的文章
        + 将文章数据进行渲染
        + 完成上拉加载更多
        + 完成下拉刷新
    + 功能：搜索
      + 组件&路由
      + 完成静态页面
      + 完成功能
        + 搜索功能
          + 输入关键字，点击完成跳转到搜索列表
          + 输入关键字，要进行联想操作
            + js 的抖动：
              + 防抖
              + 节流
        + 搜索历史
          + 每次搜索将搜索的关键字保存到 localstorage 中
          + 排序：
            + push ---> pop 
            + shift ---> unshift
          + 去重：
            + Set 对象
    + 搜索列表
      + 组件&路由
      + 完成静态页面
      + 动态请求搜索的结果数据
      + 上拉加载更多
      + 下拉刷新
      + 全局登录的方法：
        + 将登录方法以插件的形式挂载到 vue 实现中
      + 解决 token 的失效问题：
        + error 对象：
          + config：本次请求的相关信息
          + response：响应对象
          + status：响应状态
        + 在 axios 的响应拦截器中重新发送请求
    + 文章详情
      + 组件&路由
      + 完成静态页面
      + 功能：
        + 关注&取消关注用户
        + 点赞&不喜欢文章
        + 评论：
          + 将评论的显示封装为了组件
          + 将发表评论也封装为了组件
          + 给文章添加评论
          + 给文章显示评论
          + 点击评论的回复按钮：
            + 打开回复的面板：将面板封装为了一个单独的组件
              + v-model 在组件中的应用
            + 传入当前评论的信息
              + eventbus 
            + 渲染当前评论
            + 添加当前评论的回复
            + 渲染当前评论的回复

+ 技术点总结：
  + vue
    + 过滤器
    + 计算属性
    + v-model 在组件中的使用
    + 父子组件之间的传参
      + 父传子
      + 子传父
    + .sync 双向绑定属性
    + 插件的定义和使用
  + vue-cli
  + vue-router
  + vue-vuex
  + vant 
  + localstorage
  + day.js / moment.js 
  + json-bigint
  + axios
    + 创建对象
      + 设置 baseURL
    + 拦截器
  + js 的抖动
    + 防抖
    + 节流
  + es6
    + set 对象
    + 数组中的方法
      + forEach
      + filter
      + map
      + includes
  + token & refresh_token

#### 1.2 今日内容

+ 学习 websocket
  + 了解 websocket 的基本代码
  + 使用 websocket 的一个第三方包 socket.io 来自己搭建一个聊天室
  + 将 websocket 应用到移动端的项目中
+ 其它知识点：
  + $attrs
  + $listeners
  + 插槽：
    + 基本用法
    + 具名插槽
    + 默认插槽
    + 作用域插槽
  + 自己封装一个 vue 中的组件
    + 既可以通过 html 代码来引用
    + 又可以通过 js 代码来调用
  + 双向绑定的原理
  + mock.js

### 2.0 websocket

+ 为什么要有它：
  + 虽然 http 是一种通讯，可以解决大部分的问题：
    + 每次数据交互都需要连接&断开
    + 只能由客户端发送请求，服务器才能响应
  + 在 websocket 中将以上两个短板进行了完善
    + 建立连接后不会轻易断开
    + 可以由服务器主动发送数据到客户端

+ 是什么
  + 它是一种网络协议：
    + http
    + https
+ 有什么用
  + 规定了客户端与服务器的通讯协议：
    + 一次连接，一直使用
    + 客户端与服务器都能主动的发送数据
+ 怎么用
  + 基本的 websocket 的使用
  + 使用框架：socket.io
  + 在 vue 中使用

#### 2.1 基本的 websocket 的使用：在客户端中使用 websocket

+ 创建对象&建立连接

  ```js
  var ws = new WebSocket("wss://echo.websocket.org");
  // 开启的事件
  ws.onopen = function() {
  	console.log('服务器开启了')
  }
  ```

+ 发送信息到服务器

  ```js
  ws.send('message');
  ```

+ 接收服务器的响应数据

  ```js
  ws.onmessage = function(evt) {
     console.log('服务器响应的数据为：' + evt.data)
  }
  ```

+ 关闭连接

  ```js
  ws.close()
  // 关闭的事件
  ws.onclose = function() {
     console.log('连接关闭了')
  }
  ```

#### 2.2 使用框架 socket.io 开启一个服务器

+ 基本概念：socket.io 
  + socket.io：
    + 是什么：一个基于 websocket 的框架，
    + 有什么用：可以用 来开启 websocket 的服务器
+ 使用步骤：
  + 目的：使用 websocket 搭建一个聊天服务器（基于 nodejs）
  + a. 使用 nodejs 创建一个服务器项目：
    + 初始化 package.json 文件
    + 下载搭建服务器中的框架： express
    + 开启一个服务器
  + b. 将 nodejs 返回一个静态页面
  + c. 完成静态页面的布局
  + d. 在服务器中使用 socket.io
    + 下载 socket.io
    + 引入 socket.io
    + 在服务器中添加一个 socket 的连接事件
      + io.on('connection', function(socket) {  })
  + e. 在浏览器中使用 socket.io
    + 引入 socket.io 文件
    + 连接
      + var socket = io('localhost:3000')
  + 通讯：
    + 浏览器
      + 发送数据到服务器
        + socket.emit('message', value)
      + 接收服务器发送的数据
        + socket.on('message', value => {})
    + 服务器
      + 接收浏览器发送的数据
        + socket.on('message', value => {  })
      + 发送数据到浏览器
        + 谁发送响应谁
          + socket.emit('message', value)
        + 广播
          + io.emit('message', value)
+ 总结：
  + websocket
    + 浏览器：
      + 连接服务器
        + var socket = io('http://localhost:3000')
      + 发送数据到服务器
        + socket.emit('message', value)
      + 接收服务器的数据
        + socket.on('message', value)
      + 关闭连接
        + socket.on('disconnect', function() {})
    + 服务器
      + 开放连接
        + io.on('connection', (socket) => {  })
      + 接收浏览器的数据
        + socket.on('message', value => {})
      + 发送数据到浏览器
        + 直接响应
          + socket.emit('message', value)
        + 广播
          + io.emit('message', value)
      + 关闭连接
        + socket.on('disconnect', function(){})

#### 2.3 在 vue 中使用 webscoket

+ 在移动端项目中添加一个小智同学

  + 在项目中添加一个小智同学的页面
  + 在小智同学页面中连接服务器
  + 发送聊天内容给服务器
  + 接收服务器的聊天内容

+ 步骤

  + 下载第三方包

    ```
    npm i --save socket.io-client
    ```

  + 导入

    ```js
    import io from 'socket.io-client';
    ```

  + 连接服务器

    ```js
    const socket = io('http://localhost');
    ```

  + 发送消息 & 接收消息

    ```js
    socket.emit('message', value) // 发送消息
    socket.on('message', value => {}) // 接收消息
    ```

### 3.0 补充知识点

#### 3.1 $attrs

+ 基本概念：
  + 为什么需要 $attrs
    + 在封装组件中时，经常会将一些自定义属性传入到子组件中，可以通过自定义的属性的方式来接收
    + 如果传入的属性是当前子组件的内置属性：vue 会自动将这些属性直接添加到子组件的根元素
    + 如果需要将这些内置属性直接作用到指定的元素中可以使用 $attrs
+ 作用：
  + $attrs：
    + 让父组件中设置的内置属性作用到指定的子组件中的元素中
    + 问题：根元素一样的会拥有内置属性
  + inheritAttrs：
    + 让子组件中的根元素不再继承父组件中传入的内置属性
    + 值：
      + true：默认值（继承）
      + false：不继承

#### 3.2 $listeners

+ 基本概念
  + 为什么需要 $listeners
    + 在父组件中给子组件绑定内置事件时，可以通过 $listeners 来直接作用到某一个特定的子组件中
+ 作用：
  + $listeners：
    + 可以让子组件中的某一元素直接使用父组件中绑定的内置事件
    + v-on="$listeners"

#### 3.3 插槽

##### 3.3.1 基本用法

+ <slot></slot>

##### 3.3.2 具名插槽

+ <slot name="header"></slot>

##### 3.3.3 默认插槽

+ 基本用法

##### 3.3.4 作用域插槽

+ 在组件中给插槽传入数据

  + <slot v-bind:hobby="hobby"></slot>

+ 使用是取出数据

  + <template v-slot="scope"> {{ scope.hobby }} </template>

#### 4.0 在 vue 中封装一个模式组件

+ 在 vue 中调用组件有两种方式：
  + 在页面上使用直接使用
    + 封装好一个组件
    + 在页面中引入
    + 在页面上使用
  + 通过 js 方式，直接调用方法页面上显示组件
    + 目的：
      + 点击按钮时，调用 js 方法，页面上直接显示组件
    + 注意点：
      + 不是所有的组件都可以通过 js 方式来调用
      + 只有那些不依靠 dom 结构的元素才行：弹出框
  + 步骤：
    + 1）将组件以插件的方式添加到 vue 的原型中

#### 5.0 动态组件

+ 为什么需要动态组件：

  + 如果页面上组件之间互斥，传统的方式是将所有的组件都渲染到页面上，通过显示和隐藏的方式进行控制
  + 为了能够提升用户体验，可以用一个动态组件来解决这个问题

+ 步骤：

  + a. 在页面上添加一个动态组件, 通过 is 属性动态设置这个组件的值

    ```
    <component :is="com"></component>
    ```

  + b. 点击不通过的导航修改 com 对应的值

    + 将来 component 会根据 is 的值去动态改变自己显示的组件

#### 6.0 mock.js

+ 为什么需要 mock.js

  + 项目开发流程：
    + 美工
      + 制作设计稿
    + 后端
      + 开发接口
    + 前端
      + 负责书写静态页面
      + 调用接口，渲染数据
        + 前端自力更生：自己创建接口自己去使用
        + 接口：提供的都是假数据
        + 由于 mock.js 来进行模拟
  + 总结：前端开发时，有可能后端的接口还没有开发完成，为了能够让前端的开发继续下去，前端可以使用 mock.js 来模拟假数据

+ 作用：

  + 模拟假数据

+ 官网： http://mockjs.com/ 

+ 使用：

  + 生成假数据

    + 步骤：

      + 1）安装

        ```
        npm install mockjs --save
        ```

      + 2）使用 mock

        ```
        // 导入 Mock
        var Mock = require('mockjs')
        // 生成假数据
        var data = Mock.mock({
        	'list|1-10': [{
        		'id|+1': 1
        	}]
        })
        ```

        

  + 拦截 ajax 请求

    + 步骤：
      + 1）安装
      + 2）

### 扩展：

#### e1. http协议

+ 请求报文

  + 请求行
  + 请求头
  + 请求体

+ 响应报文

  + 响应行
  + 响应头
  + 响应体

+ 无状态的

  + 浏览器与服务器交互之后不会保存任何交互后的痕迹
  + 解决方案：
    + localstorage & sessionstorage

+ 三次握手：

  + 浏览器与服务器交互数据之前需要建立连接通道： 建立过程的就叫做三次握手

+ 四次挥手：

  + 浏览器与服务器数据交互完毕这后关闭通道的过程：这个过程叫做四次挥手

+ 总结

  + http 是无状态的
  + http 每次数据交互：
    + 建立连接通道（三次握手）
    + 关闭连接通道（四次挥手）
  + 服务器只能被动的响应数据，不能主动响应数据

  + 不爽：
    + 频繁的连接&断开
    + 只能浏览器主动请求，不能服务器主动响应