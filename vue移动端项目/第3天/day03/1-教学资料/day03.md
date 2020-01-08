## mobile-day03

### 1.0 概述

#### 1.1 复习

+  模块的导入与导出

  + 模块的规范
    + commonjs 规范
    + ES6 规范
    + AMD
    + CMD
  + ES6 的规范
    + a. 默认导入与导出
      + export default obj
      + import obj from './tools'
    + b. 按需导入与导出
      + export { name, age }
      + import { name } from './tools'
      + import { name, age } from './tools' ==> import * as obj from './tools'

+ 项目登录功能

  + 添加组件与路由

  + 完成静态页面

    + vant 组件的使用
      + 使用 fields 中的 error-message 进行参数验证
    + 字体图标的使用

  + 提交登录数据

    + axios

      + 1）阶段一：直接在组件中引用 axios
        + 太麻烦了，每次组件中都要引入
      + 2）阶段二：将 axios 统一设置在 Vue 中，在 main,js 中完成
        + 代码的功能结构不清楚
      + 3）阶段三：将 axios 单独封装为了一个模块
        + main.js 中的结构代码清晰了，但是每个组件中要使用都要引用
      + 4）阶段四：将 axios 封装为了一个自定义插件，在main.js 中使用
        + 解决了：
          + 组件使用时不再需要引入
          + main.js 中的代码结构也清晰

    + porimse

      + axios() 方法返回的就是一个 promise 对象
      + promise 对象可以使用 than & catch 方法

    + 将项目中所有的网络请求都封装到 API 文件夹中文件里

      + 在 API 中创建一个 user.js

      + 在 user.js 中添加一个方法 userLogin

      + 实现 userLogin

        ```
        function userLogin(axios, { url, method, data }) {
        	return axios({
        		url: url,
        		method: method,
        		data: data
        	})
        }
        ```

      + 按需导出 userLogin

        ```
        export { userLogin }
        ```

        

#### 1.2 今日内容

+ 继续封装代码结构
  + 使用 async & await 来改造代码结构
  + 将数据存储到 Localstorage 中的操作进行封装
  + 使用 vuex 将 用户信息保存起来

+ 开始首页功能的完善
  + 静态页面
  + 功能模块

### 2.0 改造代码结构

#### 2.1 使用 async 和 await 来改造代码

+ 为什么需要改造
  + 由于现在发送网络请求，响应的数据是交给 axios 的 then 方法来处理，而 then 方法处理时，是通过它的回调函数
  + 所有的逻辑代码都是写 then 的回调函数中，如果将来逻辑代码一旦过多。造成的结果是结构混乱
  + 想法：**将所有的回调函数的代码，以同步代码的方式来进行书写**

+ async 和 await

  + 是什么

    + ES7 中提出的新的概念

  + 有什么用

    + 可以让异步代码以同步的方式进行书写

      ```
      // 普通的异步代码
      console.log(1)
      $.ajax({
      	url: '',
      	method: '',
      	data: {},
      	success(res) { // 异步代码：当 ajax 的请求从服务器得到响应数据后才会执行
      		// 逻辑代码
      		console.log(res)
      	}
      })
      console.log(3)
      // 1,3,res
      ```

      ```
      // 异步代码改造为同步代码
      console.log(1)
      let res = $.ajax({
      	url: '',
      	method: '',
      	data: {}
      })
      console.log(res)
      console.log(3)
      // 1, res, 3
      // 如果直接这样写代码，绝对不能达到我们的要求
      // 如果要达到要求，使用 async & await
      ```

  + 怎么用

    + async
      + 用来修饰异步所在的函数
    + await
      + 用来修改返回 promise 对象的异步请求

  + 例子

    ```
    // 需求：登录
    // 使用 axios 进行异步登录
    function login() {
    	console.log(1)
    	axios({
    		url: '',
    		method: '',
    		data: ''
    	}).then(res => {
    		console.log(res)
    	})
    	conosle.log(3)
    }
    login()
    
    // 将异步代码使用 async & await 改造为同步代码
    async function login() {
    	console.log(1)
    	let res = await axios({
    		url: '',
    		method: '',
    		data: ''
    	})
    	console.log(res)
    	conosle.log(3)
    }
    login() // 1 res 3
    ```

#### 2.2  将操作 localstorage 的方法封装到一个文件中

+ 为什么需要将 localstorage 的方法时行封装呢？
  + 因为将来在项目中对 localstorage 的操作会很频繁，为了能够让代码使用起来方便，可以将代码进行封装
+ 步骤：
  + 1）在 utils 中创建一个文件，名叫： userLocal 
  + 2）在文件中添加方法：
    + 增
      + setUserLocal
    + 删
      + removeUserLocal
    + 查
      + getUserLocal

#### 2.3 使用 vuex 将 用户信息保存起来

+ 为什么要将用户信息使用 vuex 来管理
  + 因为用户信息将来在多个组件中都要被使用到，如果只是放到  localstorage 中，将来数据更新可能不及时
  + 我们需要将数据保存到一个公用的位置，将来所有的组 件都能够使用到
  + 将数据保存到 vuex 中就可以了
+ 步骤
  + 1）在 store 中的 state 中定义一个属性： user
  + 2）给 user 赋一个默认值： 从 localstroage 中取出数据
  + 3）在 store 中的 mutations 中定义一个方法： setUser
    + 在方法中给 user 进行赋值
    + 将数据存储到 localstorage 中

### 3.0 完善登录的其它功能

#### 3.1 给登录添加一个 loading 效果

+ 前置知识点：
  + 给 button 添加属性：
    + loading: 加载动画
    + loading-text: 加载文字

+ 步骤：
  + 1）动态给按钮的 loading 绑定一个值
  + 2）当没有发送请求时，为 false
  + 3）将请求发送时，为true
  + 4）当请求完成后重新改为 false

#### 3.2 给登录失败时添加一个提示框

+ 前置知识点：
  + toast（提示框：吐司）：

### 4.0 首页

#### 4.1 完成静态页面

+ 完成组件&路由

+ 将 tabBar 封装为父组件

  + 1）封装一个组件：layout

    + 在组件中有四个 tabBar

    + 2）给 layout 添加一个路由
    + 3）将 home 设置为 layout 的子路由
    + 4）给 tabBar 开启路由模式
      + 给 tabBar 设置属性： route
      + 给每个 tabBar 中的选项设置 to 属性

  

+ 完成静态页面

  + 首页的导航
  + tab 栏
    + 使用 vant 中的 tab栏
  + 列表项
    + 使用 vant 中的 list 来完成列表项
    + **使用列表项**
      + 上拉加载更多
  + 下拉刷新
    + 使用 vant 中的 

#### 4.2 动态请求数据

##### 4.2.1 动态请求频道数据

+ 步骤：
  + 1）当 home 页面加载时调用方法
  + 2）在方法中发送请求到服务器获取频道数据
    + 接口
      + url： /user/channels 
      + method： GET 
      + 参数
        +  headers
          + Authorization: token 可选参数（如果登录了，就传给服务器，如果没有登录就不传）
          + 由于参数可有可无，在传递时，应该作一个判断，如果登录，就传入 token ，如果没有登录就不传
          + 可以在请求拦截器中完成
  + 3）将数据渲染到页面上

##### 4.2.2 在请求头中添加 token

+ 步骤
  + 1）在 request.js 中导入 store
  + 2）在请求拦截器中得到 store 中的 state 下面的 user
  + 3）判断
    + 如果 user 存在就直接将 user 中的 token 添加到请求头中
    + 如果 user 不存在 不作任何处理

###  扩展：

#### e1. 深度选择器

+ 为什么要学习：
  + 默认情况下：是无法修改成功的，不管你的权重有多高
  + 如果实在要在组件外部修改内部的样式，请使用深度选择器

+ 是什么

  + 一种 vue 中的选择器

+ 有什么用

  + 可以在组件外部修改内部的样式

+ 怎么用

  ```
  -- home.vue
  <template>
    <div class="home">
    	<son></son> // 在 son 组件中有一个输入框 input，类名为 myipt
    </div>  
  </template>
  <style>
  // 深度选择器
  .home /deep/ .myinput {
    color: pink;
  }
  </style>
  ```

  

















