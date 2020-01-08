# Vue框架学习 - 第5天



## 课程回顾

1. 在标签中添加 el 属性，配合使用this.$refs.name 获取Vue的DOM元素

> 1. 给要获取的元素添加ref属性，名字随便起  ：有意义即可
> 2. 通过`vue实例.$refs.属性名`即可获取标记的元素，我们在mounted钩子函数中调用可以直接使用this指向当前vue实例，这个才是vue推荐的元素获取方式
> 3. 如果ref重名，后面的会覆盖前面的标签，只能获取后面的标签dom

2. Vue组件知识回顾

> 1. Vue.component( "name" , { ...options... } )
> 2. options是一个对象参数，包含data、methods、updated、computed、filters、directives、template等属性
> 3. template属性，定义组件的html文档模板，可以使用字符串方式，但是不推荐
> 4. template属性，可以推荐配合使用 <script type="html/text" id="temName"> 包裹模板部分，也可以使用 <script type="text/x-template" id="temName">，推荐使用
> 5. methods、updated、computed、filters、directives等属性和之前我们实例化vue的参数一模一样定义和使用
> 6. 定义data属性，需要使用函数返回值的方法，避免在组件多次调用的时候数据互相干扰

3. Vue路由的基础使用

> 1. 导包
>
>    vueRouter路由并没有集成到vue中,不是所有的项目都会用到路由，所以我们先导包vueRouter到项目中，这里需要注意的是：vue-router依赖vue，所以导包要先导vue再导vue-router，不然无法初始化vue-router，就会报错
>
> 2. 用包
>
>    1. 先进行组件声明，准备好组件，这里要注意，这里所谓声明的组件，其实就是一个对象
>
>       ``````js
>           const MyBox1 = {
>               data() {
>                   return {
>                       msg: "学好vue"
>                   }
>               },
>               template: "<div><p>{{msg}}</p><img src='./images/1.png'></div>"
>           }
>           const MyBox2 = {
>               template: "<div><img src='./images/2.png'></div>"
>           }
>           const MyBox3 = {
>               template: "<div><img src='./images/3.png'></div>"
>           }
>           const MyBox4 = {
>               template: "<div><img src='./images/3.png'></div>"
>           }
>       ``````
>
>    2. 定义路由 每个路由应该映射一个组件
>
>       ``````js
>           const routes = [{
>               path: '/haha',
>               component: MyBox1
>       
>           }, {
>               path: '/hehe',
>               component: MyBox2
>           }, {
>               path: '/xixi',
>               component: MyBox3
>           }, {
>               path: '/lala',
>               component: MyBox4
>           }]
>       ``````
>
>    3. 创建 router 实例，然后传 `routes` 配置
>
>       ``````js
>           const router = new VueRouter({
>               routes // (缩写) 相当于 routes: routes
>           })
>       ``````
>
>    4. 通过 router 配置参数注入路由，创建和挂载路由到根实例上，从而让整个应用都有路由功能
>
>       ``````js
>           const app = new Vue({
>               el: "#app",
>               router
>           })
>       ``````
>
>    5. 路由调用
>
>       ``````html
>           <div id="app">
>               <p>
>                   <!-- 使用 router-link 组件来导航. -->
>                   <!-- 通过传入 `to` 属性指定链接. -->
>                   <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
>                   <router-link to="/haha">哈哈</router-link>
>                   <router-link to="/hehe">呵呵</router-link>
>                   <router-link to="/xixi">嘻嘻</router-link>
>                   <router-link to="/lala">啦啦</router-link>
>               </p>
>               <!-- 路由出口 -->
>               <!-- 路由匹配到的组件将渲染在这里 -->
>               <router-view></router-view>
>           </div>
>       ``````



## 今日课程目标

- 能够使用props把父组件给子组件传值
- 能够使用$router控制路由导航
- 能够进一步概述生命周期的基本流程
- 能够在组件中使用过滤器格式化日期



## 使用props实现父组件向子组件传值

前面我们定义了一个组件，大家想一想，如果这个组件内部需要使用到的一些数据是来自于调用它的时候，那么又如何在组件内部使用这些数据呢？今天咱们就来介绍一个新的知识点，叫做父组件向子组件通信传值。这个说法听起来还是比较高大上的哈，其实说白了可以用一句话来描述：vue框架定义了一些规则，我们定了好了一个组件，在调用的时候可以设置一些自定义的属性，这些属性的值可以在当前组件内部进行使用，让我们定义的组件不再“孤独”，而是与调用它的“**父组件**”实现了关联通信，形成一个良好的闭环。

如何实现父组件向子组件传值呢？

> 1. 第一步，首先我们需要定义一个组件
>
>    ``````js
>        Vue.component("my-box", {
>            data() {
>                return {
>                    msg: "学好vue"
>                }
>            },
>            methods: {
>                sayHi() {
>                    this.msg = this.info
>                }
>            },
>            template: "#mybox"
>        })
>    ``````
>
> 2. 第二步，咱们就像使用html自定义标签一样调用这个组件，并且写几个自定义属性
>
>    ``````html
>    <my-box info="这个信息可以在组件内部使用" :infoList="infoList"></my-box>
>    ``````
>
> 3. 第三步，在组件内部添加一个和data、methods等平级的props属性，这个属性是一个对象，里面就可以接收到咱们传递过来的数据信息，并且可以像data里面定义的数据一样拿来使用了
>
>    ``````js
>        Vue.component("my-box", {
>            data() {
>                return {
>                    msg: "学好vue"
>                }
>            },
>            props: {
>                //在子组件中拿到父组件的值需要进行初始化的声明和可选的默认赋值
>                info: {
>                    type: String,
>                    default: () => 'hello world'
>                },
>                infoList:{
>                    type:Array,
>                    default:() => []
>                }
>            },
>            methods: {
>                sayHi() {
>                    //调用和data里面的数据一模一样的调用即可
>                    this.msg = this.info
>                }
>            },
>            template: "#mybox"
>        })
>    ``````



## 黑云播放器 - 路由高亮样式

> 1. 刚才咱们已经实现了通过路由点击，动态的选择显示对应的组件页面，但是路由并没有样式提示的效果，咱们这一节课实现一个切换路由，路由高亮显示的效果
> 2. vue-router 在我们切换`router-link`时，默认会自动的添加移除一个高亮的类名
> 3. 如果需要更改路由对应的样式，则通过`active-class`这个属性设置给`router-link`，即可实现使用自己的类名作为高亮类名

[官方文档](https://router.vuejs.org/zh/api/#active-class )，实现后通过git提交到本地

```html
<router-link active-class='active'>导航</router-link>
```



## 黑云播放器 - 歌曲搜索实现分析

![1562401240897](assets/1562401240897.png)

> 1. 上面我们已经将组件及路由都进行了设置，并且在路由切换的过程中实现高亮显示的效果，下面我们来实现具体的页面功能效果
>
> 2. 我们先来分析一下搜索功能实现的具体步骤是什么？
>
>    1. 顶部的搜索框双向数据绑定v-model.trim :search
>    2. 点击搜索或者点击回车
>       1. @click @keyup.enter :searchMusic
>       2. 把搜索的内容，传递给 搜索组件 - **动态路由匹配**
>       3. 同时让搜索组件显示出来 - **编程式导航**
> 3. 动态路由匹配和编程式导航，大家先记住这个名字，实现起来非常简单，就是一行代码，下一节课我们来系统的介绍学习



## VueRouter - 编程式导航

> 1. 下面我们来系统的学习 **编程式导航** 这个概念，语法不难就是一行代码，但是难的是我们需要知道它具体要来干什么？
> 2. 打开我们之前写的代码实现，搜索框输入数据后，想实现路由页面跳转，需要做两件事
>    1. 将搜索框输入的关键字内容，传递给 搜索组件 - **动态路由匹配**
>    2. 同时让搜索组件显示出来 - **编程式导航**
> 3. 我们先来学习一个比较简单的，编程式导航，编程式导航通俗一点来讲就是用代码来实现路由切换，[官网地址](https://router.vuejs.org/zh/guide/essentials/navigation.html)
> 4. 其实在之前咱们学过vue路由切换的一种方式，使用router-link的方式，这个叫声明式导航，类似于使用a标签写好了直接跳
> 5. 编程式导航本质是用代码的方式去跳，类似于之前咱们学习过的js代码跳转方式
>    window.location.href = '地址'
> 6. 下面来看具体是怎么玩呢？复制之前咱们写好的基础知识点代码，再进行介绍，先介绍声明式导航，再在methods方法中实现编程式导航

声明式导航的本质是

```html
<a href='/run'>去跑步</a>
<router-link to='/run'>去跑步</router-link>
```

编程式导航的本质是

```js
window.location.href = '地址'
router.push('地址')
```

适用情景

1. 声明式导航：点了就跳转，没有任何逻辑，类似于(a标签设置了href)
2. 编程式导航：跳转的同时有其他逻辑需要执行
3. 面试一般会直接问大家对编程式导航和声明式导航的了解



## VueRouter - 动态路由匹配

> 1. 在搜索歌曲的时候，是不是要将输入的关键字动态的传到我们的result组件里去？这个在Vue中也有一个比较高大上的名字，叫“动态路由匹配”
> 2. 打开[官网地址](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html)，复制之前的演示代码，修改路由规则，配合vue-chromanols来查看数据变化
> 3. 修改路由定义：规则 `/user`修改为`/user/:key`，其中的`:key`是一个占位，名字可以更改
> 4. 切换路由访问地址：`/user`修改为`/user/数据`，其中的数据对应上面的key占位符
> 5. 携带者数据切换了路由之后，如何获取数据
>    1. data中会自动的被添加上一个`$route`内部的.params就保存了我们传递的数据
>    2. ![1562403694490](assets/1562403694490.png)



## 黑云播放器 - 歌曲搜索路由设置

![1562401240897](assets/1562401240897.png)

> 1. 顶部的搜索框双向数据绑定：v-model.trim :search，点击搜索或者点击回车调用方法：@click @keyup.enter :searchMusic
>
> 2. 使用 **编程式导航**（用代码的方式实现跳转）让搜索组件显示出来
>
>    router.push('/result')
>
> 3. 把搜索的内容，传递给 搜索组件，咱们使用的是**动态路由匹配**，（可以在路由地址上传递参数）
>
>    1. 先声明动态路由：/result=>/result/:search
>    2. 再在编程式导航中调用动态路由：router.push('/result/${this.search}')



##黑云播放器 - 搜索结果实现分析

> 1. 当路由切换，Result搜索结果组件对应的页面显示出来以后
>
> 
>2. 获取传递过来的关键字 `this.$route.params.键`
> 
>3. 通过关键字调用接口， axios

>4. 数据获取到之后，渲染到页面上
> 
>   1. then
>    2. v-for : musicList

 

## 生命周期钩子函数 -created

![](.\assets\1565678987892.png)

> 1. 当路由切换，Result搜索结果组件对应的页面显示出来以后，我们希望用户能够尽早看到请求的数据结果，我们使用哪个钩子函数来请求数据比较合适呢？
> 2. 通过生命周期钩子函数图解，我们发现mounted和updated都太晚了，是不是有更早的执行时机？
> 3. 于是，我们使用生命周期钩子函数created（自动执行），尽可能早一些执行的，让用户早一些看到数据
> 4. 我们为什么不用beforeCreate而用created呢？好，我们在代码中来演示一下，会有什么结果呢？
> 5. beforeCreate这个钩子函数，是在Vue实例被创建，但是传入的data参数还没有设置上去的这个时机上
> 6. created这个钩子函数，是Vue实例被创建，传入的data参数已经设置给这个Vue实例了，所以，如果要操纵数据最起码要在created这个时间点上
> 7. beforeMount，开始解析结构，把数据和解构关联起来，刚刚开始，页面上还看不到解析渲染的DOM元素，也就无法获取DOM元素
> 8. mounted，数据和页面已经关联起来，完成了渲染，这一步DOM元素已经可以获取到，也就是说要获取操作DOM元素，最起码要在mounted这个时间点上
> 9. beforeUpdate，data里面设置的数据发生更新前，但是还没有渲染到页面上，触发的钩子函数
> 10. updated，data数据发生了更新，并渲染到了页面上后，触发的钩子函数



## 黑云播放器 - 搜索结果功能实现

> 1. 当路由切换，Result搜索结果组件对应的页面显示出来以后
>    1. 使用生命周期钩子（自动执行）created
>    2. 尽可能早一些执行的，让用户早一些看到数据
>
> 2. 获取传递过来的关键字 `this.$route.params.键`
> 3. 通过关键字调用接口， axios
> 4. 数据获取到之后，渲染到页面上
>    1. then
>    2. v-for : musicList
> 5. 提出问题：现在我们的数据已经拿到了，并显示到了页面上，但是还有两个小问题，一个是名字只显示了一个，一个是时间显示不对，下一节课我们来解决这两个问题



## 过滤器基本使用 - filters

> 1. 前面咱们提到了两个小问题，名字显示和时间显示不对，我们如果要想把这两个改成我们想要的结果，我们之前都是如何解决的呢?第一种方法是将直接修改原始数据即可，但是，原始数据如果我们在其他地方会有另外的用途，是不是不太合理？
> 2. vue给我们提供了一个解决方案，这种方案在**不更改原始数据**的情况下，实现我们想要的结果
> 3. 过滤器 filters 的实现过程
>    1. 定义的方式，vue中直接定义 filters : {}
>    2. 一个过滤器一个方法
>    3. 使用的使用`{{ 数据 | 过滤器 }}`
>    4. 过滤器需要接收一个参数，参数就是处理的数据
>    5. 内部处理完毕之后 return 新的值，页面会显示 返回出来的新值
>    6. 不会修改原始值

![](.\assets\Snipaste_2019-08-13_15-20-45.png)



## 黑云播放器 - 过滤器处理数据

> 1. 处理歌手名
>    1. 为了防止多人演唱只显示第一个的问题
>    2. 添加过滤器 处理歌手 
>       1. filters:{ formatSinger(arr) }
>       2. {{ item.artists  | formatSinger }}
>    3. 过滤器内部逻辑
>       1. 循环数组，拼接名字 用 '/'
>       2. 移除最后的那个`/`
>       3. return
> 2. 处理时间
>    1. 添加过滤器 处理 时间
>       1. filters:{ formatTime(time) }
>       2. {{item.duration |formatTime }}
>    2. 处理逻辑
>       1. 毫秒->秒
>       2. 算出分 60的整数倍 除
>       3. 剩余的部分作为秒 取余
> 3. 需要注意点
>    1. 时间从毫秒转为 时分秒，
>       1. 先除  再取余
>    2. 过滤器的特点是，不修改数据的情况下 更改数据的显示效果
>    3. 过滤器的使用 `|` 
>       1. 这个| 也叫 `管道符`



## 黑云播放器 - 实现点击播放MV

> 1. result组件中生成mv按钮时，绑定点击事件 携带mvid 跳转到mv路由那
>    1. router.push('/mv/mv的id')
>    2. 路由规则`/mv`->`/mv/:mvid`
> 2. mv组件中 
>    1. 获取mvid
>    2. axios接口调用
>    3. 数据回来之后，渲染到页面上
>       1. 歌名：songName
>       2. 歌手名:singerName
>       3. mv的地址:mvUrl
> 3. 重点是实现步骤和 搜歌 类似 跳转，携带数据



## 今日课程目标

- 能够使用props把父组件给子组件传值
- 能够使用$router控制路由导航
- 能够进一步概述生命周期的基本流程
- 能够在组件中使用过滤器格式化日期



## 课后预习

> 2. 安装vue-cli脚手架，[脚手架](https://cli.vuejs.org/zh/guide/) 
> 3. 安装vue-cli脚手架，[安装](https://cli.vuejs.org/zh/guide/installation.html)
> 4. 按照官方文档，[创建项目输出基本页面](https://cli.vuejs.org/zh/guide/creating-a-project.html)



