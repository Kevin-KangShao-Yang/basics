## PC-day01 

### 1.0 复习

##### 项目开发：

+ 项目的分类：
  + OA 系统
  + ERP 系统
  + ...
+ 演变：
  + 第一阶段：
    + 由一个人完成所有的功能：
      + 界面的书写
      + 逻辑的编写
      + 数据的渲染
    + 项目特点：
      + 开发周期会慢
      + 逻辑能实现，但是界面很恶心，功能健全，界面垃圾
  + 第二阶段
    + 界面
      + 美工
        + 界面的设计与书写
    + 逻辑与数据
      + 后端工程师
        + 逻辑的书写
        + 数据的渲染
    + 项目特点：
      + 开发周期相对加快
      + 成本相应增加
      + 功能能实现，界面也美观
      + 美工与后端之间的沟通不顺畅
  + 第三阶段
    + 美工
      + 界面的设计
    + 前端工程师
      + 界面的实现
      + 数据的渲染
      + 建议：
        + 两个阶段
          + 将本职工作完成：
            + 写代码
          + 协调公司内部的矛盾：
            + 写代码
            + 美工与后端的基本知识
            + 与人打交道
    + 后端
      + 逻辑处理
      + 接口的开启
    + 项目特点：
      + 开发效率高
      + 逻辑与界面都是最佳的
      + 成本更高了

##### 开发模式：

+ 混合式开发
  + 不管是前端代码（html, css, js）还是后端代码（JAVA）都是写在一起的
+ 前端后分离：
  + 美工
    + 界面的设计
  + 前端：
    + 界面的书写
    + 数据的请求
    + 数据的渲染
      + js 渲染
        + 通过 js 操作 dom 树，动态生成页面结构
  + 后端
    + 书写逻辑
    + 提供接口

##### 问题：前端在进行大量的 dom 操作

+ 引入了后端的一些开发思想：
  + MVC
  + MVVM 

##### MVC

+ 是一种设计思想：
  + 项目由三个部分组成
    + M: model 数据层
    + V: views 视图层
    + C: controller 控制器
  + 缺点：
    + 大量的 dom 操作

##### MVVM

+ 是一种设计思想：
  + 项目由三个部分组成
    + M: model 数据层
    + V: views 视图层
    + VM: viewsModel 控制器
  + 特点：
    + 当 M 改变时，VM 会自动更新 V
    + 当 V 改变时，VM 会自动更新 M
+ 实现了 MVVM 思想的框架：
  + vue
    + 中国尤雨溪
  + angular
    + 谷歌
  + react
    + facebook

##### vue

+ 基本概念

  + 它是一个实现了 MVVM 思想的框架，
  + 学完 vue 之后基本上就告别了 dom 操作

+ 插值表达式：

  + {{ }}

+ vue 的指令

  + v-html & v-text
    + 都可以将数据渲染到标签之中
    + v-html 可以识别标签， v-text 无法识别标签
  + v-if & v-show
    + 都可以让元素显示和隐藏
    + v-if 通过直接将元素在 dom 中进行移除， v-show  通过 display 来使用元素隐藏和显示
  + v-for
    + 遍历数据
  + v-on
    + 绑定事件
    + 简写@
  + v-bind
    + 绑定属性
    + 简写 : 
  + v-model
    + 双向绑定数据
      + 当 M 改变时，V 会自动改变
      + 当 V 改变时，M 也会自动改变
  + ....

+ vue 实例中的成员

  + el：

    + 设置视图渲染的容器

  + data：

    + 定义数据

  + methods：

    + 定义方法

      + methods 中定义的方法不能使用箭头函数

      + 在 methods 中方法中的函数最好使用箭头函数

        ```
        var vm = new Vue({
        	el: '#app',
        	data: {
              msg: '今天是个好日子'
        	},
        	methods: {
        		myclick: function() { // 这个函数绝对不能是箭头函数
        			setTimeout(() => { // 这个函数一定要是箭头函数
                      console.log('11111')
        			}, 2000)
        		}
        	}
        })
        ```

+ $ref

  + 使用 vue 中的方式来操作 dom

+ 计算属性

  + 将一些比较复杂的表达式封装为计算属性

    ```{
    var vm = new Vue({
    	data: {
          msg: '哈哈'
    	},
    	computed: {
          msgAddNum: function() {
    		return this.msg + 111;	
    	  }
    	}
    })
    ```

  + 注意：

    + 一定要有返回值
    + 会将结果进入缓存
    + 当计算属性依赖的数据发生改变时会重新执行计算属性对应的函数，并将结果再次进行缓存

+ 过滤器

  + 将一些复杂的操作的封装为过滤器

    ```
    // 过滤器的定义
    Vue.filter('myfilter', function(data) {
    	returnt data.format('YYYY-MM-DD')
    })
    // 过滤器的使用
    <div id="app">
    	{{ msg | myfilter }}
    </div>
    ```

+ 侦听器

  + 侦听数据的改变，当数据改变时， 会触发一个函数

    ```
    var vm = new Vue({
       el: "#app",
       data: {
    		msg: 'xjj'
    	},
    	watch: {
          msg: function(newValue, olaValue) {
            // 逻辑处理
          }
    	}
    })
    ```

+ 组件

  + 基本概念

    + vue 中有一种开发思想：组件化开发
    + 组件化开发：
      + 将所有的功能模板全部封装为组件
      + 组件的组成：
        + html 
        + css
        + js
    + 模块化开发：
      + 将所有的逻辑代码进行封装
      + 模板的组成
        + js 代码

    ```
    // 组件的定义
    Vue.component('mycom', {
     	template: `<div>我是组件</div>`，
     	data() {
    		return {
              name: 'xjj'
    		}
    	},
    	methods: {
    	}
    })
    // 组件的使用
    <div id="app">
    	<mycom></mycom>
    </div>
    ```

+ 路由

  + 基本概念

    + 请求的路径对应的组件

  + vue-router

    ```
    // 创建一个路由对象
    import home from './components/home'
    var router = new VueRouter({
    	routes: [
          { name: 'home', path: '/', component: home }
    	]
    })
    // 使用路由对象
    new Vue({
    	router
    })
    // 标签：
    <router-link></router-link>  // 跳转到路由的某一区域
    <router-view></router-view>  // 渲染路由
    ```

  + vue-cli

    + 基本概念

      + vue 中的脚手架
      + 生成一个 vue 的项目结构

    + 使用：

      + 安装

        ```
        npm install -g @vue/cli
        ```

      + 使用

        ```
        vue create myproject
        ```

  + 安排：

    + vue 的PC端项目

### 2.0 PC 端项目--- 项目准备

#### 2.1项目的开发流程：

+ 销售部门
  + 销售 ---->  客户
    + 客户下单  
      + 合同的签订
      + 30% 定金
+ 产品经理
  + 经理 ---> 客户
    + 需求沟通
    + 实地考察
    + 整理 
      + 需求文档
      + 项目的原型图
+ 项目经理
  + 工作
    + 转换文档
      + 需求文档 ----> 接口文档
    + 分配任务
      + 美工
        + 项目的原型图 ---> 设计项目界面
        + 切图
      + 前端
        + 美工设计项目界面：
          + 书写页面结构
        + 接口文档
          + 调用接口
          + 渲染数据
      + 后端
        + 接口文档
          + 开发接口
        + 问题：
          + 项目如果前端与后端同时开工：前端需要接口时，后端可能还没有开发完成
          + 项目开发初期，前端的数据不是来自于后端，而是来自前端自力更生
          + 自力更生：自己使用 mock.js 来创建一个假数据
      + 测试
        + 前后端的联调
          + 将假数据换为真实数据
        + 测试项目 ---> 打回修改 ---> 测试项目 ---> **打**回修改 
    + 项目上线
      + 支付剩余的 50%

#### 2.2 前端的职责

+ 根据设计图完成界面
+ 根据接口文档请求数据
+ 将数据渲染到页面上

#### 2.3 前端开发的准备材料

+ 设计稿
+ 接口文档

#### 2.4 项目的技术栈

**讲义笔记**:<https://vuejs.lipengzhou.com/topline-pc>

+ vue.js
  + 使用框架
+ vue router
  + 设置路由
+ vue cli
  + 框架项目的结构
+ vuex
  + 统一管理数据
+ axios
  + 发送异步请求
+ element-ui
  + 构建界面
+ echart
  + 将数据以图表的形式进行显示
+ Lodash
  + 数据的转换
+ ...
  + 忠告：
    + 培养以下两种能力：
      + 查看文档
      + 解决 bug

#### 2.5 项目的目标：

+ 会使用 vue.js 以及周边的技术来开发一个后台管理系统

#### 2.6 项目的技术准备

+ html
+ css
+ js
+ vue.js 基础

#### 2.7 其它资料

+ 项目笔记
  + [https://vuejs.lipengzhou.com/topline-pc](https://vuejs.lipengzhou.com/topline-pc)
+ 接口文档：
  + 在线的版本已经作废
  + 使用本地版本
+ 接口：
  + 使用在线的地址

### 3.0 PC端项目-开始

#### 3.1 搭建项目结构

+ 步骤

  + 1.0 安装 vue-cli

  + 2.0 生成一个项目

    ```
    vue create projectname
    ```

  + 3.0 启动项目

    + npm run serve

##### 3.1.1 生成项目的选项：

+  Manually select features：
+  自定义项目生成的特性
   + 选项：
     + Babel:
       + 将语法从 ES6 自动转为 ES5
     + TypeScript（忽略：面向对象）
       + TS：微软结合谷歌一起开发的 js 的语言
       + js 另一种语法
     + Progressive Web App (PWA) Suport（忽略）
       + 支持 web App
     + Router
       + 是否使用路由(vue-router)
       + 选项：
         + 是否使用 history 模式
     + Vuex：
       + 是否使用 vuex
       + vuex 统一管理项目的数据
     + CSS Pre-processors
       + 是否使用 css 预处理器
       + 选项
         + SASS
         + LESS
         + ...
     + Linter / Fomatter
       + 规范语法
       + 选项：
         + ESLint with error prevention only
           + 仅仅只提示错误
         + ESLint + Airbnb config
           + 使用 **爱彼迎** 规范
         + ESLint + Standard config
           - 使用 **标准** 规范
           - 注意点：这里的标准不是说行业以它为标准，只是因为这个规范的名字叫标准。
         + ESLint + Prettier
           + 不用理会
     + Unit Testing（忽略）
       + 单元测试
     + E2E Testing（忽略）
       + 端对端测试

##### 3.1.2 其它选项

+ 在创建项目时选择了以下特性：
  + Bable
  + Router
    + 二级选项：
      + Use history mode for router?
        + n
  + Vuex
  + CSS Pre-processors
    + 二级选项
      + Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default):
        + SASS
        + LESS  *
        + Stylus
  + Linter / Fomatter
    + 二级选项
      + Pick a linter / formatter config
        + ESLint with error prevention only
        + ESLint + Airbnb config
        + ESLint + Standard config *
        + ESLint + Prettier
      + Pick additional lint features
        + （*）Lint on save
        + （*）Lint and fix on commit
  + Where do you prefer placing config for Babel, PostCSS, ESLint, etc.?
    + 是否将相关的特性的配置保存起来
    + In dedicated config files *
    + In package.json   
  + Save this as a preset for future projects?（y/n）
    + 是否将本次设置设置为一个预选项
    + y
    + Save preset as: mypreset
  + 创建项目结构，下载项目所需要的第三方依赖包
  + 运行项目：
    + cd topline-pc 
      + 切换到 topline-pc 目录下
    + npm run serve
      + 启动项目

##### 3.1.3 项目结构

+ node_modules
  + 管理所有第三方依赖项
+ public
  + 管理项目的静态页面
  + 组成：
    + favicon.ico
      + 网站的小标题 
    + index.html
      + 项目的静态页面
      + 单页应用的入口静态页面
+ .browserslistrc
  + 浏览器相关的配置（不用理会）
+ .eidtorconfig
  + 编程器的配置
+ eslintrc.js
  + 语法规范的配置
+ .gitignore
  + git 提交时要忽略的文件
+ babel.config.js
  + ES6 转 ES5 的配置
+ package-lock.json
  + 当下载第三方包时，这个文件会被自动创建
  + 第三方包的版本锁（保证将来每次下载第三方包时，下载的服务器是同一个）
+ package.json
  + 保存当前项目的信息
    + 选项：
      + 项目名
      + 版本
      + 脚本
      + 依赖项
+ postcss.config.js
  + less 的相关配置
+ README.md
  + 项目说明文件
+ src
  + 管理项目中所有自己书写的文件
  + 组成：
    + main.js	
      + 入口文件
      + 职责：
        + 将 App.vue 渲染到 id 名为 app 视图容器中
        + 将路由进行加载
        + 将 vuex 进行加载
    + router.js
      + 管理路由
      + 职责
        + 创建并暴露一个 router 对象
        + 设置对应的路由
    + store.js
      + 管理项目中的统一数据
      + 职责
        + 创建并暴露一个 store 对象
        + 设置相应的数据
    + App.vue
      + 项目的根组件
      + 职责
        + 管理所有的子组件
        + 三个部分
          + template	html 结构
            + \<router-link\>\</router-link\>
              + 路由跳转的链接
            + \<router-view\>\</router-view\>
              + 渲染容器
          + style 		css 样式
          + script		js 行为
    + assets
      + 管理所有的静态资源
    + components:
      + 项目所有的组件
    + views
      + 项目中所有的视图

##### 3.1.4 改造项目结构

+ 删除 router.js 中的所有路由选项
+ 删除 App.vue 中的内容
+ 删除了 components 下面的所有组件
+ 删除了 views 下面的所有的组件
+ 在控制台中报错了

##### 3.1.5 ESLint 的语法规范

+ 配置标准规范：
  + 缩进使用两个空格
  + 字符串使用单引号
  + 无分号
  + 关键字后面必须加空格
  + 参数后必须加空格
  + 函数名后必须加空格
  + 使用全等来代替 ==
  + 行首不要以 (, [, or `
  + 句末不能有空格
  + 每个文件结束后，必须留一个空行
  + 注释的 // 后面必须加空格
  + 不再有冗余的变量 
+ 一次性修改所有的不规范的代码
  + npm run lint --fix
  + bug：
    + 可以修改语法错误，
    + 但是无法删除冗余的变量

##### 3.1.6 element-ui 

+ 基本概念

  + 是什么：
    + 基于 vue2.0 的桌面组件库，可以用来帮助我们搭建项目的界面
  + 官网：
    + [https://element.eleme.cn/#/zh-CN](https://element.eleme.cn/#/zh-CN)

+ 使用

  + 下载

    ```
    npm i element-ui -S
    ```

  + 引入

    ```
    import Vue from 'vue'; // 引入 vue
    import ElementUI from 'element-ui'; // 引入 element-ui 的源文件
    import 'element-ui/lib/theme-chalk/index.css'; // 引入 element-ui 的样式

    Vue.use(ElementUI) // 让 vue 使用 ElementUI
    ```

  + 使用 ElementUI 中的组件

##### 3.1.7 使用 git 管理项目

+ 创建一个远程仓库
+ 将远程仓库与本地仓库进行关联
+ 将本地仓库提交到远程
  + 项目地址：https://github.com/hubgitjiang/toplinePC40.git

### 扩展知识点：

##### 在 vue-router 中有两种路由模式

+ hash 模式
+ history 模式

##### 单页应用：

+ 全称： **S**ingle **P**age **A**pplication 
+ 简称： SPA
+ 基本概念：
  + 所有的功能都是写在一个页面上
  + 所有的功能都是以组件的形式存在的

##### 项目模式：

+ 开发模式
  + 未上线，处于开发阶段
  + 特点：
    + 项目需要进行开发迭代
    + 项目在书写过程中最好保存代码的清晰度
      + 不要压缩
+ 生产模式
  + 上线了，可以直接给用户去使用
  + 特点：
    + 项目直接进行生产
    + 项目大小越小越好
      + 文件的压缩

##### $mount

+ 将组件渲染到视图上
+ 与 vue 实例中的 el 作用是一样的

















