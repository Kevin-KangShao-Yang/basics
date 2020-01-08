### 移动端-黑马头条

#### 1.0 准备工作

+ 项目开发流程
  + 销售
    + 客户 ---->  下单签订合同
    + 成员
      + 甲方：客户
      + 乙方：我们公司自己
  + 产品经理
    + 客户 ----> 实地考察
    + 产出
      + 需求文档
      + 原型图
  + 项目经理
    + 产出
      + 根据需求文档 ----> 开发文档（接口文档）
    + 美工
      + 产出
        + 设计稿
          + 根据原型图设计
          + 切图
    + 后端
      + 产出
        + 接口服务器
          + 根据开发文档
    + 前端
      + 需求材料
        + 开发文档
        + 设计稿
      + 产出：
        + 根据设计稿产出静态页面
        + 根据开发文档渲染数据
    + 测试
      + 测试项目中的 bug
        + 有 bug ：打回修改
        + 无 bug ：发布上线
  + 销售：
    + 结尾款
+ 准备材料
  + 静态文件
  + 接口文档
+ 技术选型
  + vue
    + vue-cli
    + vue-router
    + axios
    + vuex
    + vant
    + VeeValidate
      + 基于 vue 的表单验证插件
+ 搭建项目结构
  + 使用 vue-cli 创建项目
    + vue create topline-mobile
  + 调整目录结构
    + api
      + 管理所有的封装请求 API 的文件
    + assets
      + 管理所有的静态资源
    + components
      + 管理所有的组件文件
    + directives
      + 管理所有的自定义指令
    + filters
      + 管理所有的过滤器
    + router
      + 管理所有的路由文件
      + index.js
    + store
      + 管理 Vuex
      + index.js
    + styles
      + 管理所有的样式文件
    + utils
      + 管理所有的工具文件 
    + views
      + 管理所有的视图文件
    + App.vue
      + 项目的入口组件
    + main.js
      + 项目的入口文件

#### 2.0 vant   

+ 前置知识
  + 是什么
    + 是一个基于 vue.js 的移动的轻量级的组件库
  + 有什么用
    + 使用组件可以快速开发移动端的项目


+ 使用


  + 步骤：


    + 1）创建使用 vant 的组件&路由

    + 2）使用 vant


      + 使用步骤：


        + a. 安装

          ```
          npm i vant -S
          ```

        + b. 导入所有组件

          ```
          import Vue from 'vue'
          import Vant from 'vant'
          import 'vant/lib/index.css'
          
          Vue.use(Vant)
          ```

        + c. 使用组件



+ 添加路由
+ 创建页面
+ 完成静态页面
  + 结构
  + 样式
+ 完成功能
  + 1.0 请求登录接口，提交数据
  + 2.0 将 axios 封装为单独模块
  + 3.0 将 api 请求封装为函数
  + 4.0 将在本地对用户信息操作封装为单独文件
  + 5.0 在 Vuex  中操作用户信息
  + 6.0 添加参数合法性验证
  + 7.0 完成表单验证

### 扩展

#### e1. 导入组件的写法

+ 1.0 版本

  ````
  import Home from './home'
  export default new Router({
  	routes: [
  		{path: '/home', component: Home}
  	]
  })
  ````

+ 2.0 版本

  ```
  const Home = () => import('./home')
  export default new Router({
  	routes: [
  		{path: '/home', component: Home}
  	]
  })
  ```

+ 3.0 版本

  ```
  export default new Router({
  	routes: [
  		{path: '/home', component: () => import('./home')}
  	]
  })
  ```

  

#### e2 vant 导入方式的对比

+ 全部导入
  + 优点：
    + 使用方便简单
  + 缺点：
    +  vant 在移动端运行，移动对性能要求比较高
    + 全局导入：
      + 1）数据量过大：消耗流量
      + 2）数据量过大：加载需要时间，降低续航能力

+ 按需导入：
  + 优点
    + 用到什么导入什么，节约性能
  + 缺点：
    + 使用麻烦，需要各种配置















