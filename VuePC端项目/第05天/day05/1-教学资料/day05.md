## PC-day05

### 1.0 概述

#### 1.1 复习项目结构

+ public/index.html
  + SPA 的静态页面
+ src/App.vue
  + 根组件
+ src/router.js
  + 路由文件
  + 职责
    + 1）创建了一个路由对象
    + 2）添加了导航守卫
    + 3）暴露了路由对象
+ src/main.js
  + 入口文件：负责将所有的文件进行整合
  + 职责：
    + 1）引入了 App.vue
    + 2）引入了 router.js
    + 3）创建了一个新的 vue 实例
    + 4）在实例中将 App.vue 渲染到了 index.html 中的 id 名为 app 的元素
    + 5）在实例还加载了 router.js
      + 将来在 index.html 中可以进行路由的切换

#### 1.2 复习

+ 使用 nprogress 实现登录的进度条

  + nprogress 的基本使用
  + 路由中的导航守卫：
    + 全局前置守卫
      + 开启进度条
    + 全局后置钩子
      +  关闭进度条

+ 统一设置 axios

  + 在 main.js 中的导入 axios
  + 将 axios 挂载到了 Vue 的原型上
    + Vue.prototype.$http = axios
  + 给 axios 设置了基准地址
    + axios.default.baseURL = ''

+ 内容列表

  + 创建组件添加路由

  + 完成静态结构

  + 动态渲染数据

    + 使用 axios 发送请求到服务器得到数据
      + 遇到 bug 401 
      + 请求后端服务器的请求时，必须携带身份验证的数据： token
        + 放到请求头中
        + 以键值对的形式存在
        + 格式：
          + `Bearer aslkdfjaskl;dfjalskd;fja;ldfjaskd;lfkjalsdf`
    + 再将数据进行渲染

  + 使用 element 中的 table 组件

    + 绑定数据源： data

    + 自定义内容

      ```
      <template slot-scoped="scope">
        // 自己的内容
        // 数据源 scope.row
      </template>
      ```

+ 使用 axios 中的 拦截器 

  + 拦截器

    + 请求
    + 响应

  + 在 axios 中添加了请求 拦截器：统一设置 token

    + 得到 localstorage 中的 userInfo
    + 如果存在：
      + 将 userInfo 添加到请求的头中
    + 如果不存在
      + 不作理会

  + 在 axios 中添加了响应拦截器：处理返回的数据

    + 将响应返回的数据进行处理

      + 返回的数据

        ```
        {
          data: {
            data: {
        		id: '',
        		...
        	}
          }
        }
        ```

    + 直接将返回的数据中的 data 下面的 data 进行返回

#### 1.3 今日内容

+ 完成分页功能
+ 完成删除功能
+ 完成筛选功能
+ 完成文件的发布

### 2.0 项目

#### 2.1 分页功能

+ 步骤：
  + 1）动态渲染总的文章数据
  + 2）了解 element 中分页组件的使用
    + layout：分页组件的布局
    + total: 当前页面数据的总条数
      + 将来这个组件会自动根据 total 来确定总页数
      + 默认每页是 10 条
  + 3）关联分页组件与表格数据
    + 请求文章列表的 API：
      + API：articles
      + 方式：GET
      + 参数：
        + 请求头
          + Authorization: token
        + query:
          + page：（非必须） 当前的页码
          + per_page：（非必须）每页查询的条数，介于 10 ~ 50 之间
    + 当点击分页组件时，需要重新请求分页的数据
      + 给分页组件绑定两个事件:
        + prev-click
        + next-click
      + 在事件中：
        + 修改当前页
        + 重新请求数据
    + 当点击具体页时， 也需要重新请求数据
      + 给分页组件绑定事件：
        + current-change
      + 在事件中
        + 修改当前页
        + 重新请求数据
    + 当页面打开时， table 表格在加载数据时，添加一个加载动画
      + v-loading:
        + true 显示加载动画
        + false 隐藏加载动画
      + 当发送 axios 请求到服务器时，需要开启动画
      + 当数据响应完成应该隐藏动画
    + 当数据正在请求时，禁用分页组件
      + 当数据加载时，给分页组件添加一个属性 disable: true

#### 2.2 删除功能

+ 步骤：

  + 1）给删除按钮添加一个点击事件

  + 2）在事件中

    + 得到要删除数据的 id
    + 将要删除的 id 提交到服务器：
      + API：articles/:target
      + method: DELETE
      + 参数：
        + 请求头：
          + Authorization: token
        + url:
          + target：要删除的文章 id
    + 重新请求删除完成之后的数据



+ 注意点：

  + 问题：
    + 在将要删除文件的 id 提交到服务器时，报了一个 400 的错误
  + 产生的原因：
    + js 中 Number 有一个最大的安全值：9007199254740992，而我们要删除数据的 id 已经远远的超出了这个值，最终 js 无法处理这个 id， 所以浏览器端报错 400
  + 解决办法：
    + 使用一个第三方包来将数字进行处理：
      + json-bigint
  + 解决步骤：
    + 1）在项目中引入 bigint 
    + 2）将服务器响应回来的 id 使用 bigint 进行处理
    + 3）如果在 axios 中结合 bigint 来使用不能在响应拦截器中使用 parse 方法，应该在服务器响应数据给 axios 时，进行转换。
    + 4）删除接口删除成功后返回的数据是 **空**

#### 2.3 筛选功能

+ API：acticles
+ method: GET
+ 参数：
  + 请求头
    + Authorization: token
  + query:
    + page: 当前页
    + pre_page: 页容量
    + status：文章的状态
      + 不传为： 全部
      + 0：草稿
      + 1：待审核
      + 2：审核通过
      + 3： 审核失败
    + channel_id：文章所属频道的 id
    + begin_pubdate：起始时间
    + end_pubdate：结束时间
+ 步骤：
  + 1）在筛选区域中动态渲染频道数据
    + 去服务器中得到频道数据
      + API：channels
      + method: get
      + 参数：无
    + 频道数据的设置
      + 使用 element 中的 select 来渲染数据
      + 给 select 绑定值： form.channle
    + 搜索日期的设置：
      + 使用 element 中的 date-picker 来设置日期
      + 可以设置开始时间&结束时间： value
        + value: ['开始时间', '结束时间']
        + 对时间进行格式化
          + value-format="yyyy-MM-dd"
        + 从 value 数组中取出第一个元素，即为开始时间
        + 从 value 数组中取出第二个元素，即为结束时间
  + 2）在页面上添加了一个搜索按钮
  + 3）给搜索按钮绑定点击事件：
    + 在事件中
      + 得到所有搜索相关的属性：状态 & 频道 & 时间
      + 以这些数据为参数去服务器中请求数据
      + 将数据动态渲染到页面上

## 扩展：

#### e1.  请求方式：

+ get
  + 向服务器请求数据
+ post
  + 提交数据向服务器
+ delete
  + 删除数据
+ patch
  + 修改数据

#### e2. json-bigint

+ 作用：
  + 当数字超过了 js 可以处理的范围，可以使用这个第三方包来将数字进行处理
+ 步骤：
  + 1）下载
    + npm i json-bigint -S
  + 2）导入
    + import JSONbig from 'json-bigint'
  + 3）调用方法
    + JSONbig.parse(obj)

#### e3. ... 展开运算符（扩展运算符）

+ 作用：
  + 可以用来展开对象&数组

#### e4. try-catch

+ 作用：
  + 捕获异常
+ 用法：
  + 使用 try 将可能出错的代码进行包裹
  + 在 catch 中书写错误后处理的逻辑