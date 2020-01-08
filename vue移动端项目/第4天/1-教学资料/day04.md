## mobile-day04

### 1.0 概述

#### 1.1 复习

+ 继续完成登录页面代码的封装

  + async & await：

    + 是什么

      + ES7中提供的新的技术

    + 有什么用

      + 用来将异步的代码以同步的方式进行书写

    + 怎么用

      + async：修饰异步代码所在的函数

      + await：修改返回 promise 对象的异步代码

      + 结论：通过 async & await 修饰后的异步代码得到结果会以同步的方式进行返回

        ```
        async function fn() {
        	let res = await axios({url: ''})
        }
        ```

  + 使用 async & await 来改造异步请求

  + 给 async & await 修饰的代码添加错误判断： try-catch

  + 封装文件 userLocal：处理 localstorage 中的函数

    + 设置 localstorage
    + 取出 localstorage
    + 移除 localstorage

  + 将用户信息保存到 vuex 中

    + 在 vuex 中将用户数据存储到 localstorage 中

+ 完善登录功能：

  + 点击登录按钮，在服务器数据响应回来之前，给登录按钮添加加载效果
  + 点击登录按钮，当登录失败时，使用吐司（toast）来提示用户登录失败

+ 首页

  + 添加路由&组件
  + 完成静态页面
    + 深度选择器：
      + 是什么
        + vue-loader 中提供的一种选择器
      + 有什么用
        + 可以在组件之外设置组件内部元素的样式
      + 怎么用
        + 格式
          + \>\>\>
            + 问题： less 请求不支持
          +  ::v-deep 
          + /deep/
    + 组件：
      + tabBar
        + 底部的 tabBar
        + route：开启路由模式
          + 点击时，会跳转到 tabBar 选项对应的 to 属性中
      + tab
        + 页面上方的 tab 选项
      + list
        + 显示列表
        + 属性：
          + v-model：用来设置当前 list 的状态
            + true：加载状态
              + 无法调用 load
            + false：加载完成
          + finished：用来设置当前 list 中数据是否已经全部渲染完
            + true：渲染完
            + false：数据还有，可以继续加载
          + load：加载数据的方法
            + 1）当 list 组件被加载时，会调用一次
            + 2）当 list 组件上拉触底时也会调用一次
            + 3）每次调用这个方法会将 v-model 中对应的数据改为 true
              + 每次调用完成需要将 v-model 中的值手动设置为 false
      +  PullRefresh 
        + 下拉刷新
        + 属性：
          + v-model：用来设置当前 PullRefresh 的状态
            + true：正在加载数据
              + 不能再次调用  refresh 
              + 页面上会显示一段文字：加载中
            + false：加载完成
          + refresh：加载数据的事件
            + 1）当 PullRefresh  被下拉时，会触发
            + 2）每次调用这个方法会将 v-model 中的对应的数据改为 true
              + 调用完成之后需要手动将 v-model 中的数据设置为 false
    + 动态获取频道数据&渲染到页面上

#### 1.2 今日内容

+ 频道
  + 得到频道数据
    + 判断用户是否登录：
      + 如果登录：
        + 直接去服务器中得到频道数据
      + 如果没有登录
        + 判断 localstorage 中是否存在频道数据
          + 如果存在直接去 localstorage 中得到数据
          + 如果不存在再去去服务器中得到默认数据
  + 得到频道下文章的数据
  + 管理频道数据

### 2.0 频道

#### 2.1 处理频道数据

+ 以前的思路：
  + 打开页面时要得到频道数据：
    + 判断用户是否登录（决定要请求时是否携带 token）
      + 如果登录：在请求中携带 token
        + 从服务器中得到当前登录用户对应的频道数据
      + 如果没有登录：在请求中没有携带 token
        + 服务器会直接返回默认的 7 条频道数据
+ 改进思路
  + 打开页面时要得到频道数据：
    + 判断用户是否登录（决定要请求时是否携带 token）
      + 如果登录：在请求中携带 token
        + 从服务器中得到当前登录用户对应的频道数据
      + 如果没有登录：在请求中没有携带 token
        + 判断浏览器中是否存在之前操作过的频道数据
          + 判断 localstorage 中是否有频道数据
            + 如果存在，直接将 localstorage 中的频道数据加载出来
            + 如果不存在，再去服务器中得到返回的默认 7 条频道数据

#### 2.2 处理频道下文章数据

+ 前置知识点：

  + $set

  + 由于将来每个频道都有自己的：上拉状态(up)，上拉完结状态(finished)，list 数据源(articleList)，下拉状态(pull)，如果每个都单独在 data 中创建一个属性，太麻烦了。

    + 我们将 up & finished & articleList & pull 动态添加到频道数据源中

    + 将来频道数据源中的数据结构会变为

      + 之前

        ```js
        channelList: [
        	{ id: 0, name: '推荐' },
        	{ id: 1, name: 'C++' }
        ]
        ```

      + 之后

        ```js
        channelLists: [
        	{ id: 0, name: '推荐', up: false, finshed: false, articleList: [], pull: false },
        	{ id: 1, name: 'c++', up: false, finshed: false, articleList: [], pull: false }
        ]
        ```

+ 步骤：

  + 1）应该在得到频道数据之后动态给频道数据添加额外属性

  + 2）动态请求频道下文章 的数据

    + a. 得到当前选中的频道

      + 给 van-tab 设置属性 v-model="activeTab"  activeTab 就是当前选中频道的 tab 下标
      + 频道数据在 channlesList[activeTab]

    + b. 在 list 被加载时， 根据选中频道的数据去服务器中得到文章数据

      + list 被加载时，会执行函数 load

      + 根据频道信息得到文章数据

        + 接口

          + url： articles 

          + method: GET

          + 参数

            +  Query 
              +  channel_id：
                + 当前频道的 id
              +  timestamp 
                + 时间戳（新闻的更新时间）：也是分页的标识
              +  with_top 
                + 是否置顶
                  + 0： 不包括置顶
                  + 1：包括置顶

          + 返回数据

            ```
            {
            	message: 'OK', // 返回的信息
            	data: {
            		pre_timestamp: '1571803989876', // 下一页时间戳
            		results: [], // 返回的文章集合
            		page: 1 // 当前页码
            	}
            }
            ```

          + 总结：

            + timestamp ：当前接口的分页标识
            + 第一次请求数据时，只要传入当前的时间戳，服务器会返回第二页的时间戳
            + 第二次请求数据时，传入第一次返回的时间戳，服务器会再返回第三页的时间戳
            + 第三次请求数据时，传入第二次返回的时间戳，服务器会再返回第四页的时间戳
            + ...
            + 只有第一次 访问时间戳为当前时间，
            + 后面的时间戳全是接口自己返回的
    
  + 3）当前请求非第一页数据时，应该将上一页返回的时间戳作为参数去请求下一页的数据
  
    + a. 将上一页返回的时间戳进行保存
  
  + 4）完成下拉刷新
  
    + 下拉时，应该清除频道文章 的所有的数据
    + 重新请求当前的数据添加到文章集合中
  
  + 5）判断数据是否加载完毕
  
    + 当数据返回的结果为 [] 应该将 list 的 finished 设置为 true

### 扩展

#### e1. $set

+ 是什么：

  + $set 是 vue 提供的一个  api

+ 有什么用：

  + 数据响应式：
    + 在 vue 实例的 data 属性中的定义一个变量，
    + 将变量显示到视图中
    + 当data中的这个变量发生改变，视图上的数据也会跟着改变
  + 什么情况下数据才是响应式的呢？
    + 只在直接定义在 data 中的数据才有响应式的效果：后期通过别的方式添加到 data 中的数据是没有响应效果的
  + 作用：
    + 由于默认情况下动态向 data 中添加属性是没有响应式效果的，$set 可以让后期添加的属性具备响应式效果
    + 动态添加响应式的属性

+ 怎么用：

  ```
  // target：添加响应式属性的对象
  // prototypeName:要被添加的属性
  // value:要被添加属性对应的值
  vm.$set(target, prototypeName, value)
  
  // target: this.obj
  // prototypeName: name
  // value: 'xjj'
  this.obj.name = 'xjj'
  ```

#### e2. ES6中操作数组的方法：

+ forEach

  + 遍历数组

    ```js
    arr.forEach((item, index) => {
    	// item：每一项
    	// index: 每一项的下标
    })
    ```

    

+ filter

  + 遍历数据，筛选满足条件的元素，并且将这个元素返回成为一个新的数组 

    ```js
    let newArr = arr.filter(item => {
    	return item.age < 20
    })
    ```

    

+ map

  + 遍历数组，返回一个新的数组集合

    ```js
    let newArr = arr.map(item => { name: item.name })
    ```

    

+ includes
  
  + 判断一个字符串是否包含另一个字符串

#### e3. 给 axios 创建不同的实例

+ 