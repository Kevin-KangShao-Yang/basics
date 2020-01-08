## PC-day04

### 1.0 概述

#### 1.1 复习导航守卫

+ 基本概念：

  + 是什么：

    + 它是 vue-router 中提供一些函数：
    + 在这些函数中可以添加自己的逻辑代码

  + 怎么用：

    + 全局前置守卫

      ```
      var router = new Router();
      router.beforEach((to, from, next) => {
        // to：到达的目标路由
        // from：路由跳转发生的路由
        // next：函数，决定后续代码是否执行
      })
      ```

+ 讲解：

  + 导航守卫在项目中的作用：
    + vue 项目中存在两个服务器
      + 前端服务器：给路由提供对应的组件
      + 后端服务器：提供数据接口
    + 导航守卫定义在前端服务器中 
    + 当路由发生改变时，会触发对应的逻辑代码
  + 导航守卫在项目中的逻辑代码
    + 1）如果路由在跳转时跳转的 login 页面，不需要进行登录验证
    + 2）如果跳转的不是 login 页面，判断是否存在 userInfo
      + 如果存在 userInfo 说明已经登录过了
      + 如果不存在 userInfo 说明没有登录

#### 1.2 复习

+ 布局：

  + a. 创建布局的组件&路由

  + b. 完成布局组件的布局： container

  + c. 将侧边栏&头部提取为单独的组件

  + d. 实现路由的嵌套

    + 以 layout 作用一级路由：

      + 提供了侧边栏
      + 提供了头部
      + 将来发生变化的区域是内容：在内容区域添加一个 router-view

    + 以内容区域为二级路由

    + 总结：嵌套路由的实现：

      + 设置一个一级路由：在 App.vue 中添加一个 router-view

      + 设置一个二级路由：在 layout.vue 中添加一个 router-view

      + 设置路由选项

        ```
        var router = new Router({
        	routes: [
              { path: '/layout', component: layout, children: [
                { path: '/home', compoent: home }
              ]}
        	]
        })
        ```

      + 路由的执行过程：

        + 当请求 /home 时，项目会去 router.js 中找到对应的 /home
        + 结果发生 /home 是 /layout 的二级路由
        + 项目会在 App.vue 中先加载 layout 
        + 再加载完成 layout 后发现在 layout 中也有一个 router-view
        + 会将 /home 再次渲染到 layout 中

  + 保存用户信息

    + 登录时将用户信息保存到浏览器中
    + 访问非登录页面时将用户信息取出并渲染到页面上

  + 本地存储：

    + localstorage
      + setItem(key,valu)
      + getItem(key)
      + removeItem(key)
      + JSON.stringify()
      + JSON.parse()
    + sessionstorage

  + 登录验证：

    + 当路由切换时，要进行登录验证
      + 得到路由切换
        + 添加一个导航守卫
      + 登录验证 
        + 判断 localstroage 中是否存在 userInfo

#### 1.4 今日内容：

+ 使用 **nprogress** 完成登录进度的提示
+ 统一设置 axios 
  + 将 axios 挂载在 vue 中
  + 统一设置 axios 的请求基地址
+ 内容列表
  + 组件与路由
  + 静态结构
  + 动态渲染数据
+ axios 中的拦截器
  + 给请求添加统一的 Authorization
  + 将响应的数据进行处理
+ 其它功能

### 2.0 PC项目

#### 2.1 使用 **nprogress** 完成登录进度的提示

+ nprogress 的基本介绍

  + 基本概念：

    - 什么是 nprogress
      - 它是 github 中使用的一个进度条

  + 使用步骤：

    - 下载

      ```
      npm install --save nprogress
      ```

    - 导入

      ```
      // router.js
      // 导入 js 文件
      import NProgress from 'nprogress'
      // 导入 css 文件
      import 'nprogress/nprogress.css'
      ```

    - 调用方法：

      ```
      NProgress.start(); // 开启进度条
      NProgress.done();  // 结束进度条
      ```

+ 步骤：

  + 1）下载并导入 nprogress
  + 2）在全局前置守卫中开启进度条 router.js
  + 3）在全局后置钩子中结束进度条 router.js

#### 2.2 统一设置 axios

+ 为什么需要统一设置 axios

  + 因为 axios 在使用时，每个组件中都需要导入一份自己的，太麻烦了，可以通过统一设置的方式来设置 axios

+ 实现步骤：

  + 1）只需要将 axios 挂载到 Vue 的 prototype（原型）

    + 在 main.js 中引入 axios
    + 通过 Vue.prototype.$http=axios 进行挂载
    + 在组件中通过 this.$http 来进行使用

  + 2）给 axios 设置一个请求基准地址 

    + 一旦设置之后，每次请求时，axios 会自动将基准地址中的路径与请求的路径进行拼接

    ```
    axios.defaults.baseURL = 'https://api.example.com';
    ```

#### 2.3 完成内容列表

##### 2.3.4 组件与路由

##### 2.3.5 静态结构

+ 步骤：
  + 1）通过 card 实现结构布局
  + 2）通过 from 完成搜索区域
  + 3）通过 table 完成数据展示
  + 4）通过 Pagination 完成分页

##### 2.3.6 动态渲染数据

+ 步骤：
  + 1）打开 List 页面时，要发送一个请求到服务器去获取数据
    + API：http://ttapi.research.itcast.cn/mp/v1_0/articles
    + method:  GET
    + 参数：
      + 放到 header 中通过 键值对的方式来传：
        + Authorization: token
      + 全部都是非必须的
      + 项目中所有的接口在请求时都必须携带 token
      + 除了 login 之外
  + 2）将数据保存起来：
    + 定义一个变量 dataList 
    + 将数据源保存到 dataList 中
  + 2）将数据渲染到 table 表格中
    + 学习 table 组件的使用
      + table: 
        + data: 设置数据源
        + table 会自动遍历这个数据源
      + table-column
        + prop: 用来渲染数据源中对应的属性
        + lable：当前列标题
        + width: 当前列的宽度
        + align：当前列中内容的位置 (left,center,right)
        + 自定义列
          + \<template slot-scope="scope" \>\</tempalte\>
          + scope.row 当有行的数据源

##### 2.3.7 使用请求拦截器动态设置 token

+ 为什么需要动态设置 token
  + 由于后端服务器中的所有接口在访问时都需要携带 token（除了 Login ）之后，每次请求都带 token 很麻烦
+ 解决方案
  + 统一在发送请求之前给请求头添加一个 token
  + 在项目中所有发送请求的角色都是 axios
  + 通过给 axios 设置一个统一的请求头
+ 步骤：
  + 1.0 在 axios 中的请求拦截器中添加逻辑代码
  + 2.0 在代码中给请求头添加一个 token

##### 2.3.8 使用响应拦截器统一处理响应数据

+ 为什么需要统一处理响应数据
  + 因为 axios 返回的数据在 res.data.data 对象中，每次使用里面的数据都要点两次，太麻烦了
+ 解决方案：
  + 在响应拦截器中将返回的数据进行处理
+ 步骤：
  + 1.0 在 axios 中的响应拦截器中添加逻辑代码
  + 2.0 return response.data.data

### 扩展：

#### e1. 导航守卫

+ 全局前置守卫

  + 当由一个路由跳转到另一个路由之前它会执行

    ```
    router.beforEach((to, from, next) => {})
    ```

+ 全局后置钩子

  + 当由一个路由跳转到另一个路由完成之后会执行

    ```
    router.afterEach((to, from) => {})
    ```


#### e2. 状态码

+ 100 ~ 信息，服务器接收到请求，需要继续操作
+ 200 ~ 成功
  + 200 成功
+ 300 ~ 重定向
  + 304 缓存：
    + 浏览器第一次请求服务器时，服务器响应数据到浏览器，浏览器为了方便下次快速得到数据，会将这次得到的数据保存到浏览器中，将来如果再次请求相同的资源，浏览器会直接从自己的缓存中拿出数据。速度会快一点。
+ 400 ~ 客户端错误（浏览器端的异常）
  + 401 客户端的验证信息不通过
  + 404 没有找到资源
+ 500 ~ 服务器错误（后端异常）
  + 500 服务器错误

#### e3. token

+ 传递方式：

  + 在请求头中

  + 以键值对方式存在

    ```
    Authorization: ‘Bearer eyJ0eXAiOiJKV1QiLCJhbGciO’
    ```



#### e4. axios 中拦截器

+ 请求拦截器

  + 当 axios 发送请求时会触发的函数

    ```
    axios.interceptors.request.use(config => {
      // 如果要请求正常发送必须返回 config
      return config
    }, err => {})
    ```

  + 注意点：

    + 请求拦截器 axios 发送请求时执行
    + config 是当前请求的相关信息
      + url
      + method
      + baseURL
      + headers
        + Authorization: token

+ 响应拦截器

  + 当 axios 接收响应时会触发的函数

    ```
    axios.interceptors.response.use(response => {
      // 如果要响应正常返回必须返回 response
      return response
    }, err => {
      // 当状态码 >= 400 时会执行这个函数
    })
    ```

#### e5. 对应导航守卫与拦截器

+ 导航守卫
  + 当路由发生改变时会触发的函数
  + 针对前端服务器：路由
+ 拦截器
  + 当 axios 发送请求&接收响应时会触发的函数
  + 针对后端服务器：接口

