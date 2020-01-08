## PC-day03

### 1.0 概述

#### 1.1 昨日故事

+ PC端项目
  + 项目准备
    + 在公司中一个项目的完整流程
    + 前端开发时需要的准备材料
    + 使用的技术栈
  + 项目开发
    + 项目结构的搭建
      - 使用 vue-cli 来搭建项目结构
        - 以前步骤：
        - 使用了最新的步骤
        - ESLinter的语法规范
        - 造项目结构
        - element-ui
    + 完成登录页面
      + 修改项目的图标
        + 将项目的 favicon 进行替换
      + 创建建两个页面
        + login.vue
        + home.vue
      + 完成登录页面样式
        + html 结构
        + css 样式
      + 登录的数据进行验证
        + 使用 element-ui 中 form 元素的验证方式来进行验证
          + 仅仅只是使用 rules 属性来进行参数失去焦点时的验证
        + 给登录按钮添加点击事件时的验证
          + 使用 form 元素的事件：
            + validate
      + 将数据提交到服务器
        + 将登录的参数提交到后台接口
        + 跳转到首页
      + 添加一个阅读协议
        + 添加一个多选框
        + 给多选框也添加一个验证规则
      + 点击获取验证码按钮来验证是否输入了手机号
        + 使用了 form 中另一个方法： validateField
      + 添加一个倒计时

#### 1.2 今日内容

+ 完成 home 的布局
  + 侧边栏导航
    + 完善侧边栏
  + 头部区域
    + 完善头部
  + 内容区域
    + 首页的内容
+ 知识点：
  + vue-router 中的路由守卫
  + 统一导入 axios 

### 2.0 PC项目

#### 2.1 首页

##### 2.1.1 布局

+ 步骤：
  + 1.0 创建一个单独的组件：用来完成页面的布局
  + 2.0 把布局组件注册到路由中
  + 3.0 完成组件的结构与样式
    + 使用 elemnt-ui 中的自带的布局：Container
  + 4.0 将侧边 asider & header 再次封装为组件
    + 问题：
      + 在封装的过程中不要将 el-asider & el-header 书写到封装的组件中
  + 5.0 完成侧边栏的布局
    + 项目的 logo
    + 侧边导航栏
      + 基本使用
      + 属性：
        + unique-opened：只保持一个子菜单展开
        + router：开启 vue-router 模式：可以在点击导航时，以 index 为 path 进行跳转
  + 6.0 完成头部布局
    + 完成结构
    + 使用 element 下拉框来实现点击头像弹出下拉选项
  + 7.0 当请求其它路由时，需要带上 layout
    + 改造 layout 的代码
      + 将 layout 中内容区域 el-main 区域添加一个组件：\<router-view /\>

##### 2.1.2 动态获取用户头像和用户名称

+ 步骤：
  + 1）当用户登录成功时，将服务器返回的用户数据保存到浏览器中 （/login）
    + 1.1 使用 localstorage 将数据保存起来
  + 2）当打开功能页面时，将之前保存到浏览器中的用户数据取出来，渲染到头部
    + 2.1 从 localstorage 中将数据取出，并且渲染

##### 2.1.3 登录验证

+ 步骤：
  + 1）当请求的路由发生改变时，我们需要判断用户是否登录
    + 判断依据是：
      + 判断 localstorage 中是否存在 userInfo
        + 存在：说明已经登录过了
          + 继续访问路由
        + 不存在：说明还没有登录
          + 跳转到登录页面
  + 2）问题：如何知道路由是否改变：
    + vue-router： 导航守卫

### 扩展

#### e1. 图片的保存路径

+ 如果图片一般不发生改变，建议直接将图片与组件放到同一目录
+ 如果图片是动态变化的，不需要将图片放到与组件同级

#### e2. element-ui 中导航的分级

```
<el-menu>
	<el-menu-item>
		没有二级菜单的一级菜单
	</el-menu-item>
	<el-submenu>
		<template>一级菜单名称</template>
		<el-menu-item>一级下的二级菜单</el-menu-item>
	</el-submenu>
</el-menu>
```

#### e3. 嵌套路由案例

+ 需求：
  + 打开页面时，有三个链接：
    + 新闻
    + 音乐
    + 图片
  + 点击新闻&音乐&图片时再打开一个页面
  + 在新闻页面上有两个链接
    + 王宝强
    + 贾乃亮
  + 点击名称后再打开一个页面
+ 实现步骤：
  + 1.0 创建一个项目
  + 2.0 在项目中使用嵌套路由
    + 2.1 先完成第一个页面的三个链接
    + 2.2 再在第二个页面中添加嵌套路由

#### e4. 如果将用户信息保存到浏览器：

+ 浏览器的数据缓存
  + 区别：
    + localStorage：
      + 保存在本地电脑中，关闭浏览器是不会销毁的
    + sessionStorage
      + 保存在电脑的缓存中，关闭浏览器会销毁数据
  + 操作：
    + 新增
      + window.localStorage.setItem(key, value)
      + window.sessionStorage.setItem(key, value)
    + 删除
      + window.localStorage.removeItem(key)
      + window.sessionStorage.removeItem(key)
    + 修改
      + 对 localStorage 来说没有修改，只要覆盖
        + window.localStorage.setItem(key, value)
        + window.sessionStorage.setItem(key, value)
    + 查询
      + window.localStorage.getItem(key)
      + window.sessionStorage.getItem(key)
  + 注意点：：
    + localStorage 和 sessionStorage 有域的概念
      + 比如说：www.baidu.com 创建的 localStorage & sessionStorage 只能在 www.baidu.com 的域名下使用
    + localStorage 和 sessionStorage 只能存储字符串



#### e5. 导航守卫：

+ 概念：

  + 本质上它是一个函数
  + 它会在一个路由跳转到另一个路由的过程中触发

+ 分类

  + 全局前置守卫

    + 在一个路由跳转到另一个路由之前执行

    + 语法

      ```
      var router = new Router()
      router.beforEach((to, from, next) => {
        // to 到到达的目标路由
        // from 发起跳转的路由
        // next 是否执行执行后续代码
      })
      ```

      ​