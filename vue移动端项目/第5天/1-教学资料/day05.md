## mobile-day05

### 1.0 概述

#### 1.1 复习

+ 频道数据的处理：
  + 判断用户是否登录
    + 没有登录
      + 判断 localstorage 中是否存在频道数据
        + 如果存在
          + 直接将数据取出来渲染到频道区域中
        + 如果不存在 
          + 直接去服务器中得到数据（默认数据）
    + 登录
      + 直接去服务器中得到当前用户的频道数据
+ 给频道数据中添加额外属性：
  + up：上拉的状态
  + finished：上拉的数据是否加载完毕
  + articleList：文章列表
  + pull：下拉刷新的状态
  + 注意：使用 $set 来进行添加
+ 将添加的额外属性动态渲染到页面上
+ 在 load 中请求 articleList 数据
  + 接口注意点：
    + 第一次请求时需要传入当前时间作用 timestamp 
    + 后面的请求需要传入上一次返回的 pre_timestamp 作为参数
    + ...
  + 之前的接口是 ： v1.0 
  + 这个接口是： v1.1 
    + 1）修改基准地址，再修改所有的请求代码
    + 2）通过 axios.cretae() 再创建一个新的 axios 实例
+ 动态渲染 articleList  数据
+ 上拉加载更多
+ 下拉刷新

#### 1.2 今日内容

+ 操作频道：
  + 1）打开频道管理面板
  + 2）完成静态结构
  + 3）动态渲染用户频道 & 所有频道
  + 4）新增频道
  + 5）删除频道

+ 补充知识点：
  + v-model 的使用
  + .sync 的使用
  + 从一个数组中取出另一个数组中不存在的集合

### 2.0 前置知识点

#### 2.1 v-model 在组件中的使用

+ 需求：

  + 1）父组件组子组件传入一个 num
  + 2）在子组件点击按钮改变父组件中的 num

+ 总结：

  + 1）父传子
  + 2）子传父
  + 注意点：
    + 由于在实现开发过程中，类似的父传子与子传入发生在同一个结构上的情况会经常遇到了。每次如果都使用父传子再使用子传父。过程会非常麻烦
    + 为了解决以上问题（父传子，再子传父）,我们可以选择使用 v-model 应用在组件中

+ 作用：将一个数据双向绑定到一个子组件中

+ 当 v-model 应用在组件中时：

  + 会默认给子组件入一个名为 value 的参数

  + 会默认给子组件绑定一个名为 input 的事件

    + 一旦 input 事件触发，它会自动修改 v-model 传入的数据

  + 自定义 v-model 的参数

    ```
    model: {
    	porp: 'value',
    	event: 'input'
    }
    ```

#### 2.2 sync 的作用

+ 为什么需要：

  + 在父子组件中可能出现数据的“双向绑定”

  + sync 可以用来将数据进行双向绑定

+ 默认“双向绑定”

  + 父组件

    + 通过自定义属性给子组件传参数

      ```
      <son :abc="msg" @update:abc="msg=$event"></son>
      ```

  + 子组件

    + 接收参数

    + 子组件中通过方法来修改这个数据，提交给父组件

      ```
      export default {
      	porps: ['abc'],
      	methods: {
      		updateAbc: function() {
      			this.$emit('update:abc', 'xjj')
      		}
      	}
      }
      ```

+ 使用 sync "双向绑定"

  + 父组件

    + 通过 sync 给子组件绑定参数

      ```
      <son :abc.sync="msg"></son>
      ```

  + 子组件

    + 接收参数

      ```
      export default {
      	props: ['abc'],
      	methods: {
      		updateAbc: function() {
      			this.$emit('update:abc': 'xjj')
      		}
      	}
      }
      ```

      

### 3.0 项目

#### 3.1 完成频道管理

+ 步骤：

  + 1）打开频道管理的面板
    + 面板是一个页面的弹框
    + vant 中的 Popup
    
  + 2）将频道管理弹出框封装为一个组件
  
  + 3）完成频道管理的静态页面
    + 单元格
    + 宫格
    + 效果：
      + 点击编辑给每个频道添加一个叉叉
    
  + 4）动态渲染频道数据
    + 将频道数据从 home 中传入到 channelpop 中
    + 再在 channelpop 中接收
    + 并且渲染到 grid 中
    
  + 5）将剩余频道数据渲染到频道推荐中
    + 得到所有的频道数据
      + 去服务器请求接口
        + url： channels 
        + method: GET
        + 参数：无
    + 从所有的频道数据中将用户没有有的频道数据单独提取为一个集合
    + 将这个集合渲染到频道推荐中
    
  + 6）将在 home 中选中的频道设置给 channelpop 中的频道
    + 在 channelpop 中给元素添加一个选中的类名
  + 在 home 中传入一个选中频道的下标给 channelpop 
    + 让 channelpop 中的用户频道设置选中的样式
    
  + 7）点击 channelpop 中的频道时，也要动态修改 home 中的选中频道
    + 给 channelpop 中的频道数据添加一个点击事件
    + 在事件中修改父组件中的 activeTab 
  
  + 8）点击添加频道
    + 给频道推荐中的元素添加点击事件
  + 将点击的元素添加到用户频道数组中
    + 保存添加的频道数据
      + 没有 登录时
        + 将频道数据保存到本地：localstorage 中
      + 登录时
        + 将频道数据保存到服务器
    
  + 9）删除频道
  
    + 给叉叉添加一个点击事件
  
    + 在事件中将当前点击的元素从数组中删除
  
    + 将删除后的结果保存起来
  
      + 没有 登录时
  
        + 将频道数据保存到本地：localstorage 中
  
      + 登录时
  
        + 将频道数据保存到服务器
  
          + 请求服务器的接口
  
            + url： /v1_0/user/channels 
  
            + method:  PUT 
  
            + 参数：
  
              + body
  
                +  channels : obj[]
  
                  + id：频道的 id
                  + seq：频道的顺序编号
                    + 这个 seq 从 1 开始
  
                  ````
                  channles: [
                  	{ id: 0, seq: 1 },
                  	{ id: 1, seq: 2 }
                  ]
                  ````
  
                  

#### 3.2 首页

+ 页面的布局
+ 动态渲染了数据
  + 实现了图片的懒加载