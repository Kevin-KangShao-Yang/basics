## mobile-day08

### 1.0 概述

#### 1.1 复习

+ 前置知识点：

  + js 抖动

    + 在 html 页面中，当屏幕滚动&窗口大小改变&输入框内容改变...会触发事件，但是这些事件触发时会触发多次。会造成逻辑代码反复执行

      + 降低用户体验
      + 消耗服务器性能

    + 总结：触发事件的反复执行

    + 解决方案：

      + 防抖

        + 当持续执行事件时，不执行逻辑代码

        + 当停止一段时间后，再执行逻辑代码

          ```js
          function fangdou(cb, wait) {
              var timer;
              return function() {
          		clearTimeOut(timer)
                  timer = setTimeout(() => {
          			cb()
                  }, wait)
              }
          }
          ```

          

      + 节流

        + 当持续执行事件时，每隔一段时间也要执行一次

          ```js
          function jieliu(cb, wait) {
          	var beginTime = Date.now()
              var timer
          	return function() {
                  clearTimeout(timer)
          		var currentTime = Date.now()
          		var space = currentTime - beginTime
          		if (space - wait > 0) {
          			cb()
          		} else {
                      timer = setTImeout(() => {
                          cb()
          			}, wait)
                  }
          	}
          }
          ```

  + set 的使用

    + 给数组去重

      ```js
      var newArr = [...new Set(arr)]
      ```

    

+ 搜索页面

  + 搜索历史
    + 将搜索历史保存到本地
    + 将搜索历史从本地取出，并且显示到页面上
    + 对数据的排序
    + 对数据的去重
    + 对数据进行删除
      + 单条删除
      + 全部清除
    + 点击搜索历史跳转到搜索列表页面

+ 搜索列表

  + 页面结构的书写
  + 动态请求搜索数据&渲染到页面上
  + 登录的验证：
    + 直接在搜索列表中完成登录验证
    + 将登录验证的方式封装到 main.js 中以 vue 的实例方法存在
      + 违背了：模块化的思想
    + 将登录验证的方法封装为了插件
  + token 的失效：
    + 基本概念：
      + token：
        + 从服务器发送到服务器
        + 用于保存用户的登录信息
        + 时效为 2 小时
      + refresh_token
        + 用于更新 token
        + 时效为 14 天
    + 步骤：
      + 在响应拦截器判断响应状态是否为 401
      + 当为 401 时，从 store 中得到 refresh_token 发送到服务器获取新的 token
      + 将新的 token 存入到 store 中
      + 重新发送请求

+ 文章详情

  + 组件 & 路由
  + 入口设置
  + 完成静态页面
    + 将评论封装为了组件
    + 将留言封装为了组件
  + 功能：
    + 根据文章 id 得到文章详情
    + 将数据渲染到页面上
    + 完成作者的关注&取消关注
    + 完成文章的点赞&不喜欢
    + 完成留言的新增

#### 1.2 今日内容

+ 文章详情：
  + 完善评论的新增
  + 显示评论
  +  回复评论
    + 打开一个回复评论的面板
    + 显示当前评论的所有回复
    + 新增评论的回复
+ websocket：
  + 基本介绍
  + 完成一个完整的 websocket 版本的聊天室
  + 在 vue 中使用 websocket，完成聊天机器人
+ 补充知识点：
  + mock.js
  + 插槽
  + ....

### 2.0 文章详情

#### 2.1 显示添加的评论

+ 需求：
  + 添加完评论之后服务器其实已经将评论的信息返回到了浏览器
  + 在浏览器中接收，并且将数据渲染到评论区域
+ 步骤：
  + 1）在 detail.vue 中创建一个数组：commentList （默认为空）
  + 2）打开页面时将 commentList 传入到添加评论的组件中
  + 3）在组件中接收 commentList ，将来评论发送到服务器之后会返回评论信息，直接将评论信息动态添加到 commentList 中
  + 4）在 detail.vue 中将 commentList 进行渲染

#### 2.2 动态渲染评论数据

+ 步骤：
  + 1）在 detail.vue 中遍历数组 commentList
  + 2）将数据渲染到组件： comment 中
  + 3）将数据传入到 comment 组件中在组件中进行传递

#### 2.3 加载文章已有评论数据

+ 步骤：

  + 1）在打开 detail.vue 时，我们需要请求服务器得到文章已有的评论数据

    + 服务器接口

      + url： /v1_0/comments 

      + method：GET

      + 参数

        + query:
          + type：类型：
            +  a ：文章的评论
            +  c  ：评论的回复
          + source： 文章id或评论id 
          + offset： 请求第一页时不需要传，请求第二页开始，需要得到第一页数据中返回回来的 last_id。如果  last_id 等于 end_id 说明数据请求完毕
            + 分页
          + limit：每页显示的条数

      + 返回值

        ```
        {
        	message:‘’，
        	data: {
        		total_count: 28,
        		end_id: '最后一页的 id',
        		last_id: '下一页的 id',
        		results: []  返回的评论数据
        	}
        }
        ```

  + 2）将数据保存起来

  + 3）将数据渲染到页面上

#### 2.4 回复留言

##### 2.4.1 打开回复评论的面板

+ a. 点击页面上的回复按钮，打开一面板
+ b. 在面板中将当前评论进行显示
  + 将面板也单独封装为一个组件
  + 将评论信息从 commnet 组件中传入到面板中
+ c. 显示当前评论的回复

##### 2.4.2 在面板中对评论进行回复

+ a. 在面板中添加一个组件：addcomment 组件
+ b. 在输入框中输入要回复的留言，给发送按钮添加点击事件
+ c. 在事件中
  + 得到要回复的内容，
  + 将数据提交到服务器
    + 服务器的接口：
      + url： /v1_0/comments
      + method: POST
      + 参数：
        + body
          + 添加评论：
            + target：文章 的 id
            + content: 评论的内容
          + 添加评论回复
            + target：评论的 id
            + content：评论回复的内容
            + art_id：当前评论属的文章  id

##### 2.4.3 添加回复评论完成后渲染回复的评论

+ a. 在评论回复面板中添加一个数组： commentRepalyList
+ b. 打开页面时将这个参数传给 addcomment
+ c. 添加完回复评论之后将返回的数据添加到 commentRepalyList 中
+ d. 将 commentRepalyList 在评论回复面板中进行渲染

##### 2.4.4 动态渲染当前评论的所有回复数据

+ a. 打开评论回复面板时，请求服务器得到评论的回复数据
  + 服务器接口
    + url： /v1_0/comments 
    + method : GET
    + 参数：
      + type: 类型
        + a：文章的评论
        + c：评论的回复
      + source：文章的 id & 评论的 id
      + offset：偏移量
        + 如果第一页不传
        + 如果第二页传入第一页返回的 last_id
        + 如果 last_id 与 end_id 一样，说明评论加载完毕
      + limit：页容量
+ b. 将得到的数据保存到 commentRepalyList 中，并且渲染

### 扩展

#### e1 堆 和 栈

+ 栈

  + 是什么

    + 内存中存储数据的一种空间

  + 有什么用

    + 存储数据

  + 怎么用

    ```js
    var a = 123	
    ```

    

+ 堆 

  + 是什么

    + 内存中存储数据的一种空间

  + 有什么

    + 存储数据

  + 怎么用

    ```js
    var obj = {
    	name: 'xjj',
    	age: 19
    }
    ```

+ 总结：

  + 共同点：
    + 存储数据
  + 不同点：
    + 栈：
      + 空间小，存储速度相对快
    + 堆 ：
      + 空间大，存储速度相对慢

#### e2 简单数据类型（值类型）和复杂数据类型（引用类型）

+ 简单数据类型：
  + string, num，bool, undefined, null
+ 复杂数据类型
  + array, object, function ....

#### e3 值传递 & 引用传递

+ 基本概念：
  + 传递：在 js 中经常会出现将一个变量赋值给另一个变量，这种操作我们叫做传递
  + 分类：
    + 值传递
    + 引用传递
+ 值传递：值类型的传递
  + 在值类型进行赋值时，只是简单将数据赋值给另一个变量
+ 引用传递：（引用类型的传递）

#### e4 单向数据流

+ 父组件通过 prop 传给子组件的数据
  + 只能在父组件中进行修改，同步到子组件中
  + 不能在子组件中进行修改，否则会报错
+ 核心：
  + 不允许在子组件中进行<u>**修改**</u>：修改父组件中传入的数据

#### e5 eventbus

+ 是什么

  + 由于在 vue 开发过程中传参可能出现以下情况：
    + 两个兄弟组件之间需要进行参数的传递
  + 解决来兄弟组件之间的传参

+ 有什么用

  + 解决来兄弟组件之间的传参

+ 怎么用

  + 1）创建一个公共的 bus 对象

    ```
    -- bus.js
    export default new Vue()
    ```

  + 2）son1 将参数给 bus

    ```
    --son1.vue
    import bus from 'bus'
    
    bus.$emit('passvalue', num)
    ```

  + 3）son2 中接收 bus 的参数

    ```
    -- son2.vue
    import bus from 'bus'
    
    bus.$On('passvalue', (value) => {}) // 写在页面打开时
    ```

    