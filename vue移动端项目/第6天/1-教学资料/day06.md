## mobile-day06

### 1.0 概述

#### 1.1 复习

+ 前置知识点：

  + v-model 在组件中的使用

    + v-model 会给组件添加两个内容：

      + 默认添加一个属性名为：value

        + value 会传给子组件，在子组件中可以使用

      + 默认添加一个事件名为：input

        + 触发时 ，会将传入的数据赋值给 v-model 设置的数据

      + model：可以用来修改默认的名称

        ```
        model: {
          prop: 'myvalue',
          event: 'myevent'
        }
        ```

  + sync 的作用：给组件‘双向绑定数据’

    + 父组件

      ```
      <son :abc.sync="value"></son>
      ```

    + 子组件

      ```
      export default {
        prop: ['abc'],
        mehtods: {
          fn() {
            this.$emit('update:abc', 'xjj')
          }
        }
      }
      ```

+ 项目

  + 封闭一个频道组件
    + 打开&关闭
    + 完成界面结构
    + 渲染用户频道数据
    + 渲染频道推荐数据
    + 设置激活的频道
    + 未登录
      + 添加频道
      + 删除频道
    + 登录
      + 渲染频道
      + 删除频道
  + 首页中的布局
    + 渲染了图片&作者&评论&时间

#### 1.2 今日内容

+ 首页
  + 处理日期的显示
  + 处理更多操作
    + 隐藏此文章
    + 举报引文章
    + 拉黑作者

+ 搜索页面
  + 组件&路由
  + 完成静态页面
  + 功能：
    + 保存搜索历史
    + 联想功能
    + js 的抖动
      + 防抖
      + 节流

### 2.0 前置知识点

#### 2.1  dayjs 的使用

+ 是什么：

  + 与 moment 一样都是用来处理时间的第三方包
  + 比 moment.js 要不得多

+ 有什么用：

  + 与 Moment 一样

+ 怎么用：

  + 目的：

    + 得到一个相对时间

      + 1）下载

        ```js
        npm install dayjs --save
        ```

      + 2）导入

        ```
        import dayjs from 'dayjs'
        ```

      + 3）导入插件：相对时间的插件

        ```
        // 导入插件
        import relativeTime from 'dayjs/plugin/relativeTime'
        // 使用插件
        dayjs.extend(relativeTime)
        ```

      + 4）获取相对时间：默认是英文

        ```
        dayjs().fromNow()
        ```

      + 5）导入中文

        ```
        // 导入中文包
        import 'dayjs/locale/zh-cn'
        // 使用中文包
        dayjs.locale('zh-cn')
        ```

        

### 3.0 首页

#### 3.1 修改发布文章时间

+ 步骤：

  + 1）将得到相对时间的操作封装为了一个全局过滤器

    ```
    // 定义全局过滤器
    Vue.filter('myfilter', function(value) {
	// value 使用过滤器的数据
    	return value + 1
    })
    // 使用过滤器
    {{ '2018-09-09T20:00:00' | myfilter }}
    ```
    
  + 2）在输出时间时，使用过滤器进行处理

#### 3.2 更多操作

+ 步骤：

  + 1）打开更多操作的面板

    + 显示面板
    + 显示三个选项：
      + 隐藏此文章
      + 举报此文章
        + 点击之后可以选择举报的类型
      + 拉黑此作者
    + 打开&关闭面板
      + 给叉叉添加点击事件 
        + 在事件中完成对面板的显示
      + 给面板中的叉叉添加点击事件
        + 在事件中完成对面板的隐藏

  + 2）将更多操作面板封装为一个组件

  + 3）完成功能：

    + 隐藏此文章

      + a. 给按钮添加点击事件

      + b. 在事件中

        + 得到当前文章

          + 在打开面板时，将当前文章数据传入到子组件（moredialog）

        + 得到当前显示的文章的数据源

          + 在打开面板时，将当前显示的文章数据源传入到子组件中

        + 将文章从数据源中删除

        + 判断用户是否登录

          + 如果登录还需要从服务器中将这个文章从当前用户的显示列表中永久的删除

            + 接口

              + url： /v1_0/article/dislikes/:target 

              + 方式： DELETE 

              + 参数：

                + target ：

                  + 不喜欢文章的 id

      + 举报文章

        + a. 给举报的选项添加点击事件
      
        + b. 在事件中：
      
          + 得到当前要举报的文章
          + 将文章信息提交到服务器进行举报
            + 接口
              + url： /v1_0/article/reports 
              + method:  POST 
              + 参数：
                + body
                  + target ：举报文章 的 id
                  + type：举报的类型
                  + remark：备注
      
          + 注意点：由于 id 超过了 js 的处理范围需要使用 json-bigint 来处理
      
            + 步骤：
      
              + 1）安装
      
                ```
                npm i json-bigint
                ```
      
              + 2）导入
      
                ```
                import JSONbigint from 'json-bigint'
                ```
      
              + 3）在 axios 中进行配置
      
                ```
                let instance = axios.create({
                	baseURL: '',
                	transformResponse: [function(data){
                		try {
                			return JSONbigint.parse(data)
                		} catch {
                			return data
                		}
                	}]
                })
                ```
      
                
      
    + 拉黑作者
    
      + a. 给拉黑作者添加一个点击事件
      + b. 在事件中
        + 得到当前文章的作者
        + 将作者的信息提交到服务器
          + 接口
            + url:  /v1_0/user/ blacklists 
            + method:  POST 
            + 参数
              +  body
                +  target ：要被拉黑的作者 id
    
    

#### 3.3 搜索

+ 组件&路由
+ 设置入口
+ 完成结构&样式
+ 完成功能
  + 完成搜索功能
    + a. 获取到搜索框中的文本
    + b. 跳转到搜索页面
    + c. 在搜索页面中将数据渲染出来（这个页面今天暂时不做）
  + 判断：没有内容时不应该跳转
  + 取消：点击取消清空搜索框中的内容
  + 完成联想功能
    + a. 给输入框添加一个事件： input ：只要用户一输入内容，就需要发送请求到
    + b. 在事件中
      + 得到要搜索的关键字
      + 发送请求到服务器得到联想的结果
        + 接口：
          + url:   /v1_0/suggestion 
          + method: GET
          + 参数
            +  q ：联想的关键字
      + 将联想的结果渲染到页面上
  + 当内容清空时，联想的数据源也需要清空
  + 点击联想列表，跳转到搜索页面

#### 3.4 js 的抖动

+ 抖动：
+ 解决抖动的方案：
  + 防抖
  + 节流