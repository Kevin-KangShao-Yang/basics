## PC-day07

### 1.0 概述

#### 1.1 复习

+ 系统回顾了一下第五天的代码

+ 发布文章

  + 创建组件&路由

  + 完成静态页面

    + 频道的下拉框

      + 将它封装为一个单独的组件

      + 动态请求下拉的数据

      + 传递数据

        + 外界传入数据给下拉框，设置默认选中的下拉选项

          + 父传子

            + 父传

              + 通过给子组件设置自定义属性来传参

                ```html
                <son :abc="msg"></son>
                ```

            + 子接

              + 通过属性 props 来接收

                ```js
                {
                	props: ['abc'],
                	或者
                	props: {
                		abc: {
                			type: String,
                			default: ''	
                		}
                	}
                }
                ```

                

        + 改变下拉选项之后，将新的值返回给外界

          + 子传父

            + 子传

              + 在子组件调用自定义方法来传递参数

                ```js
                this.$emit('fnname', msg)
                ```

            + 父接

              + 给子组件实现方法

                ```html
                <son @fnname="getVal" />
                ```

              + 定义这个实现的方法

                ```js
                {
                	methods: {
                		getVal(val) {
                			console.log(val)
                		}
                	}
                }
                ```

        

  + 发送请求

    + 将所有的数据提交到服务器生成新的文章

  + 将文章内容的输入框改为富文本编辑器

    + 在 vue 中寻找资源
    + 查看 github 中文档的步骤
    + 了解富文本编辑框的使用步骤
    + 使用

+ 修改文章

  + 创建路由&组件（它与发布文章使用同一个组件）
  + 通过 $route.path.indexOf('edit') 判断是否是修改的逻辑
    + 再处理其它逻辑

#### 1.2 今日内容

+ 完成评论列表
  + 结构
  + 数据渲染
  + 关闭评论
+ 帐户信息
  + 结构
  + 数据渲染
  + 修改数据
+ 素材管理

### 2.0 完成评论列表

#### 2.1 功能预览

+ 评论数据的显示
+ 关闭评论

#### 2.2 完成功能

##### 2.2.1 完成静态页面

+ 添加组件&路由
+ 设置组件的入口
+ 完成静态页面

##### 2.2.2 动态渲染评论数据

+ 打开页面时请求服务器接口获取评论数据
  + 接口：
    + API：articles
    + method: GET
    + 参数：
      + query
        + status: 状态
        + channle_id：频道 id
        + begin_pubdate:开始时间
        + end_pubdate:结束时间
        + page：页码
        + per_page：页容量
        + response_type：
          + 不传：	返回的数据是文章列表
          + comment：返回的是评论列表
          + statistic：返回图片数据
+ 将评论数据动态渲染到表格中
  + 将数据保存到页面中
  + 将数据设置给表格作用数据源
  + 注意点：
    + element 中的 table 默认不能显示 boolen 值

##### 2.2.3 关闭评论

+ 给关闭评论按钮添加点击事件

+ 在事件中

  + 得到当前评论的 id

  + 发送请求到服务器关闭当前文章的评论

    + 接口

      + url: /comments/status

      + method: PUT

      + 参数：

        + query：
          + article_id ：要关闭评论的文章 id
        + body
          + allow_comment：boolean 是否允许评论
            + true 允许
            + false 不允许

        ```
        this.$http({
        	url: `/comments/status?article_id=${article_id}`,
        	method: 'PUT',
        	data: {
        		allow_comment: false
        	}
        })
        ```

  + 重新渲染页面

### 3.0 素材管理

#### 3.1 功能预览

+ 全部素材的展示
+ 收藏素材的展示
+ 点击收藏素材
+ 点击删除素材
+ 上传新的素材

#### 3.2 完成功能

##### 3.2.1 完成静态页面

+ 创建组件&路由
+ 设置入口
+ 完成结构样式

#### 3.3 功能

##### 3.3.1 完成素材的渲染

+ 打开页面时请求服务器获取素材信息
  + 接口：
    + url：user/images
    + method：GET
    + 参数：
      + Query
        + collect：
          + true   收藏的数据
          + false  全部的数据
        +  page：页码
        + per_page：页容量
+ 将素材信息动态渲染到页面上

##### 3.3.2 完成切换全部&收藏的数据

+ 给全部&收藏按钮添加 change 事件
  + 在事件中有一个参数 abc: 对应的就是单选框的中的 label 值
+ 在事件中
  + 分别请求不同的数据

##### 3.3.3 修改收藏后素材的显示状态

+ 如果元素是收藏的状态将星星设置为点亮

##### 3.3.4 点击收藏&取消收藏素材

+ 给收藏按钮添加点击事件
+ 在事件中：
  + 将当前元素的状态进行修改，将修改后的状态更新到服务器中
    + 接口
      + url: /user/images/:target
      + method: PUT
      + 参数
        + url：
          + target	收藏&取消收藏的素材 id
        + body
          + collect
            + true 添加收藏
            + false 取消收藏
  + 提示用户更新成功
  + 刷新数据

##### 3.3.5 删除素材

+ 给删除按钮添加点击事件
+ 在事件中
  + 得到要删除素材的 id
  + 调用服务器的删除素材接口，传入参数
    + 接口
      + url：user/images/:target
      + method: DELETE
      + 参数
        + url：
          + target	要删除的素材 id
    + 注意：
      + 删除成功后接口返回的内容为空
  + 提示用户删除成功
  + 刷新数据

##### 3.3.6 上传素材

+ 功能预览

  + 点击上传素材，打开一个新的面板
  + 在面板中点击上传图片的组件选项图片
  + 选项图片之后，图片自动上传
  + 关闭面板，数据显示

+ 步骤：

  + 给上传素材按钮添加点击事件

  + 在事件中：

    + 打开一个面板
    + 面板中显示
      + 上传组件
      + 关闭面板按钮

  + 点击上传组件可以选择图片，并进行上传

    + 必须给上传组件设置 action 属性

    + action 属性必须指定为我们自己的服务器接口

      + 接口
        + url：http://ttapi.research.itcast.cn/mp/v1_0/user/images
        + 方式：POST
        + 参数：
          + header:
            + Content-Type：multipart/form-data
            + Authorization: token
          + body
            + image 上传的图片

    + 设置以下属性：

      + action：要上传的服务器地址
      + headers：传入 Authorization 对应的 token
      + name：修改上传时文章对应的名称：必须改为 image

    + 返回的数据

      ```
      {
      	data: {
      		id: '',
      		url: ''
      	},
      	message: ''
      }
      ```

      

  + 点击关闭面板按钮刷新页面

### 4.0 帐户信息

##### 4.1 功能预览

+ 显示用户信息
+ 修改用户信息
+ 修改用户头像
+ 修改完成之后用户信息会自动更新

##### 4.2 完成静态页面

+ 组件&路由
+ 设置入口
+ 完成静态页面

##### 4.3 动态渲染用户信息

+ 打开帐户信息，请求服务器接口去得到用户的信息
  + 接口：
    + url：user/profile
    + method: GET
    + 参数：
      + 无
+ 将用户信息渲染到页面上

##### 4.4 修改用户信息

+ 在输入框中修改用户信息
+ 点击修改按钮
  + 得到修改之后的信息
  + 将信息提交到服务器
    + 接口
      + url：/user/profile
      + method: PATCH
      + 参数
        + body：
          + name：用户名
          + intro：个性签名
          + email：用户邮箱
  + 更新数据

##### 4.5 当用户信息更新之后头部中的数据不会更新

+ 分析原因：
  + 头部结构中的用户信息是从哪里来的：
    + localstorage 中来的
  + localstorage 中的信息从哪里来的
    + 当登录成功后，会将登录成功的信息保存到 localstorage 中
    + 总结：一旦登录成功之后，会将当前的用户信息保存到 localstorage，除非下一次重新登录，否则 localstorage 中的数据是不会改变的
  + 当我们修改完用户信息之后
    + 刷新页面时，头部中的用户数据依旧是从 localstorage 中取的
  + 总结：
    + 由于 localstorage 中的数据保存后不会再更新
    + 修改完成用户信息之后，依旧从 localstorage 中去取信息
    + 所以才会出现修改用户信息之后，头部中的数据依旧不会改变

##### 4.6 将用户信息存储到 vuex 中

+ 在 store 中从 localstorage 中取出 userInfo 赋值给 userInfo
+ 在头部组件中得到 store 中的 userInfo 并进行赋值
+ 当修改完成用户信息之后，需要将新的信息同步到 vuex
  + 修改结束后将数据更新到 vuex 中
  + 再由 vuex 更新 localstorage

##### 4.7 修改用户头像

+ 在上传框中修改以下属性：
  + action：设置上传的地址
    + API：
      + url: http://ttapi.research.itcast.cn/mp/v1_0/user/photo
      + method: PATCH
      + 参数：
        + headers:
          + Authorization: token
        + body
          + photo
  + headers：设置上传的请求头
  + name：设置上传的名称
+ 注意点：
  + 由于 upload 组件只能上传请求方式为 post 的路径，但是我们的接收请求方式为 PATCH 。所以无法上传
+ 步骤：
  + 1）在 upload 中使用 http-request 来覆盖掉默认上传行为
  + 2）在事件中
    + 通过 axios 来上传图片

### 扩展

#### e1. 接口中的参数类型

+ url（路径参数）

  + 指的是在路径携带的参数

    + /article/:id
    + 这里的 url(路径参数) 指的就是 :id

  + 传参：

    ```js
    this.$http({
    	url: '/article/1122'	
    })
    ```

    

+ query

  + 指的是在路径中通过 ? 携带的参数

    + /article/:id?name=xjj&age=18
    + 这里的 name & age 指的就是 query 参数

  + 传参

    ```js
    this.$http({
    	url: '/article/1122?name=xjj&age=18'
    })
    或者
    this.$http({
    	url: '/article/1122',
    	params: {
    		name: 'xjj',
    		age: 18
    	}
    })
    ```

    

+ body

  + 指的是在请求报文体中携带的参数

    + /article/:id?name=xjj&age=18
    + 这是没有 body 的参数，因为它的参数是放到请求报文体中，直接通过 url 路径是看不到的

  + 传参

    ```js
    this.$http({
    	url: '/article/1122',
    	data: {
    		name: '',
    		age: ''
    	}
    })
    ```

#### e2. vuex

+ 基本概念：

  + 作用：
    + 统一管理数据的结构
  + 官网：
    +  https://vuex.vuejs.org/zh/guide/ 

+ 使用 vuex 的步骤：

  + 1）安装

    + npm i vuex -S

  + 2）引用

    ```
    import Vue from 'vue'
    import Vuex from 'vuex'
    Vue.use(Vuex)
    ```

  + 3）创建一个统一的数据管理仓库

    ```
    // store.js
    const store = new Vuex.Store({
    	state: {
    		// 用来存放所有的公共数据
    		userInfo: 'user'
    	}
    })
    // 导出对象
    export defaul store
    ```

  + 4）挂载到 Vue 实例中

    ```
    import store from 'store.js'
    new Vue({
    	router: router,
    	store: store // 挂载到 vue 实例
    })
    ```

  + 5）在其它组件中使用

    ```
    this.$store.state.userInfo
    ```

+ 修改 vuex 中的数据

  + 步骤：

    + 1）在 store.js 中的 store 对象中定义一个属性：mutations

    + 2）在 mutations 中添加一个方法

      + 方法中有一个参数 state

      ```
      const store = new Vuex.Store({
      	state: {
      		userInfo: 'vuex 中的数据'
      	},
      	mutations: {
      		changeUserInfo(state) {
      			state.userInfo = '修改后的值'
      		}
      	}
      })
      ```

    + 3）在其它组件可以调用这个 Mutations 中的方法 changeUserInfo

      ```
      this.$store.commit('changeUserInfo')
      ```

+ 总结：
  + 向 vuex 中的存入数据
    + 创建一个仓库对象，添加一个属性 state 属性
  + 向 vuex 中取出数据
    + this.$store.state.xxx
  + 改 Vuex 中的数据
    + 添加一个 mutations 属性
    + 在属性中添加一个修改的方法（方法的第一个参数是 state 对象）
    + 在方法中修改 state 中的属性







