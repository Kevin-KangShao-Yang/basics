## PC-day06

### 1.0 概述

#### 1.1 复习

##### 1.1.1 分页功能：

+ 点击上一页下一页实现分页
+ 点击具体页实现分页

##### 1.1.2 给表格数据添加加载动画

+ 给表格添加一个属性 v-loading="loading"
+ 当发送请求时， loading 为 true
+ 当请求结束时， loading 为 false

##### 1.1.3 完成删除操作

+ 给删除按钮添加点击事件
+ 在事件中得到要删除数据的 id1
+ 根据 id 发送请求到服务器删除数据
  + 问题1：
    + 文章的 id 超出来 js 可以处理的数据范围所以报错了
  + 解决方案1：
    + 使用 JSON_bigint
  + 问题2：
    + 删除接口后返回的数据为空
  + 解决方案2：
    + 如果数据不能进行 JSONBig.parse，就直接返回
+ 更新数据
+ 注意点：
  + 这个接口中只能删除草稿的数据不能删除已经发布的数据

##### 1.1.4 给删除添加提示框

+ 确定和取消提示框
+ 提示删除成功和失败的提示框

##### 1.1.5 筛选功能

+ 文章状态
+ 频道
  + 动态获取频道数据 
+ 时间

#### 1.2 article 接口

+ 获取文章列表的接口
  + API： /article
  + method: GET
  + 参数：
    + 请求头：
      + Authorizations
    + url:
      + page：当前页
      + pre_page：页容量
      + status：文章 的状态
      + channel_id：文章所属的频道
      + start_pubdate：开始时间
      + end_pubdate： 结束时间

#### 1.3 今日内容

+ 发布文章
+ 修改文章 
+ 评论列表
+ 账户信息

### 2.0 项目

#### 2.1 发布文章

+ 步骤：
  + 1）添加组件&路由
  + 2）完成静态结构
  + 3）完成功能
    + 3.1 动态获取下拉框中的数据 
      + 将频道下拉框单独封装为一个组件
        + a. 创建一个频道组件
        + b. 在组件中自动获取频道数据
        + c. 在其它组件中使用
        + d. 将 channle_id 绑定给自己封装的组件
    + 3.2 发表数据
      + 给发表按钮添加一个点击事件
      + 在事件中
        + 得到所有的数据
        + 将数据提交给服务器 API
          + API： articles
          + method: POST
          + 参数：
            + 请求头：
              + Authorization：token
            + url：
              + draft
                + true：草稿
                + false：发表
            + 请求体：
              + channel_id：所属频道的 id
              + content：文章的内容
              + cover: 对象
                + type: 类型
                  + -1 自动
                  + 0   无图
                  + 1   一张
                  + 3   三张
                + images：数组
                  + 图片的路径
                    + http://toutiao.meiduo.site/Fhp5OXHbYJzUdd8pCJGjX4i9K_7y
              + title：文章的标题

#### 2.2 将发布文章中的输入框改为富文本编辑框 

+ 略

#### 2.3 修改文章

+ 前提
  + 由于发布文章的结论与修改文章的页面结构相差不大
  + 直接让发布文章与修改文章共同使用一个组件
+ 步骤：
  + 1）添加一个修改文章的路由: /article/edit/:id
  + 2）给修改按钮绑定点击事件
    + 在事件中：
      + 跳转到修改文章的路由中
      + 传入要修改文章的 id
  + 3）在修改文章组件中根据 id 得到要修改的数据
    + 判断当前逻辑是哪个操作：
      + 发表文章：/article/publish
      + 编辑文章：/article/edit/1231214141
      + 可以通过 $route.path
    + 先获取 id
    + 根据 id 得到要修改的文章
      + API：articles/:target
      + method: GET
      + 参数
        + 无
  + 4）将数据渲染到组件中
  + 5）给发表按钮添加逻辑：
    + 判断是否是编辑页面
      + 编辑页面-
        + 将修改后的数据提交到服务器
          + API：/articles/:target
          + method: PUT
          + 参数：
            + 路径：
              + target：要修改文章的 id
            + Query
              + draft：草稿
                + true 草稿
                + false 发表
            + body:
              + channel_id：所属频道的 id
              + content：文章的内容
              + cover: 对象
                + type: 类型
                  + -1 自动
                  + 0   无图
                  + 1   一张
                  + 3   三张
                + images：数组
                  + 图片的路径
                    + http://toutiao.meiduo.site/Fhp5OXHbYJzUdd8pCJGjX4i9K_7y
              + title：文章的标题
      + 发表页面
        + 发表新的文章

### 扩展

#### e1. 组件之间的传参

+ 父传子

  + 1）父传

    + 1.1 父组件中定义一个数据： fmsg

    + 1.2 通过自定义属性的方式将 fmsg 交给子组件

      ```
      <ftos :abc="fmsg" />
      ```

  + 2）子接

    + 2.1 通过特定属性： props 来进行接收

      ```
      props: ['abc']
      或：
    props: {
      	abc: {
            type: String,
              default: '默认值'
      	}
      }
      ```
    
    + 2.2 直接以属性的方式来使用 参数
    
      ```
      {{ abc }}
      ```

+ 子传父

  + 1）子传

    + 1.1 子组件中定义一个数据： smsg

    + 1.2 通过自定义事件的方式将 smsg 交给父组件

      ```
      // 格式：this.$emit('事件名', 参数)

      this.$emit('abcfn', this.smsg)
      ```

  + 2）父接

    + 2.1 给子组件实现方法: abcfn

      ```
      <stof @abcfn="getvalue" />
      
        <script>
        export default {
          data () {
          	return {
              spassf: ''
          	}
          },
          methods: {
            getvalue (value) {
              this.spassf = value
            }
          }
        }
        </script>
      ```
      
    + 2.2 方法中有一个参数，这个参数就是 smsg

#### e2. npm 与 cnpm 的区别

+ npm 
  + npm 它是一个社区
  + 包管理器
    + 安装 node 是会自动安装的一个工具
    + 可以去国外的第三方包服务器上面下载对应的资源

+ cnpm
  + 也是一个第三方包工具：
  + 它的作用基本上与 npm 是一样的
  + 唯一的区别是 npm 是去国外的服务器上下载资源
  + cnpm 在国内的淘宝镜像上下载资源

#### e3. 查找 vue 的资源

+ 在 vue 中有大量的资源可以供我们使用
  + 官网中提供了大量的资源：
    + 官方仓库
    + Vue 优先
    + Vue 资源
+ tip：
  + 在 github 上搜索资源时，合理使用 awesome

#### e4. vue-quill-editor 的使用

+ 步骤：

  + 1）安装

    ```
    npm install vue-quill-editor --save
    ```

  + 2）导入

    ```
    // 全局加载
    import Vue from 'vue'
    import VueQuillEditor from 'vue-quill-editor'
    
    // require styles
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    
    Vue.use(VueQuillEditor)
    ```

  + 3）使用

    ```
    <quill-editor v-model="content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
      </quill-editor>
    ```

#### e5. \$router 与 \$route 的区别 

+ 路由的创建过程：

  ```
  import Vue from 'vue'
  import VueRouer from 'vue-router'
  Vue.use(VueRouter)
  // 创建一个路由对象
  var router = new VueRouter({
  	// 设置路由匹配规则（路由选项）
  	routes: [
  		{ name: 'home', path: '/home', component: Home },
  		{ name: 'index', path: '/index', component: Index }
  	]
  })
  export default router
  ```

+ $router 其实对应的是路由实例

  + 方法：
    + this.$router.push() ----> 进行路由的跳转

+ $route 其实对应的是 路由信息对象 （路由选项）

  + $route.params ----> 路由的参数
  + $route.name ------> 路由的名称
  + $router.path -------> 路由的路径

#### e6. 经典 bug

+ 表现：
  + 由于编辑页面与发表页面使用的是同一个组件
  + 当点击编辑页面后，会加载数据到组件上
  + 如果不提交，直接请求发表路由
  + 路由进行了跳转但是内容没有清空

+ 解决思路：
  + 当跳转到 publish 页面时，最好清除数据源
+ 解决方案：
  + 使用侦听器侦听路由信息对象
  + 一旦路由发生改变，改变到 publish 中就将数据清除
+ 产生的条件：
  + vue 中为了提升性能，有一个优化处理：
    + 当从一个路由跳转到另一个路由时	
      + /news/1    ~       /news/2  (使用的组件是同一个，只有显示的参数不一样)
    + vue 会将上一次的组件进行重用（组件不会重新创建，数据也不会）











