# Vue框架学习 - 第3天



## 前日课程回顾

1. vue框架是如何使用的？

   > 1. 导包
   > 2. 用包
   > 3. 构建vue实例 const app = new Vue( { 参数 } )
   > 4. el参数，元素节点选择器，一般使用id选择器
   > 5. data参数，声明js变量
   >    1. 可以用在标签内容上：`v-text、{{}}、v-html` 
   >    2. 可以用在元素标签属性上 `v-bind ：`
   > 6. methods参数，定义方法，可以被v-on:click="方法名"调用

2. 我们都学习了哪些vue指令？

   > 1. `v-text` 内容绑定，innerText、{{}}、插值表达式
   > 2. `v-html` 内容绑定，innerHtml、解析html语义标签
   > 3. `v-bind` 属性绑定，字符串、数组、对象绑定行内表达式
   > 4. `v-on` 事件监听，支持行内表达式和函数，有个默认参数event，代表当前事件对象
   > 5. `v-model` 表单双向数据绑定
   > 6. `v-for` 数组循环遍历渲染到页面上
   > 7. `v-if` 条件逻辑渲染
   > 8. `v-show` 条件显示渲染

**案例：基础知识demo使用**



## * 案例：知心姐姐

1. 实现最终效果演示
2. 实现步骤分析
3. 代码结构演示
4. 开发过程演示
5. 所用知识及注意事项



## 计算属性computed基础使用

[计算属性](https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7)

> 1. Vue构造函数传参中和`el、data、methods`平级，声明一个对象`computed：{}`
> 2. 计算属性作为computed对象里面的一个方法，这个方法名就是计算属性
> 3. 这个方法依赖 data 中声明的相关属性
> 4. 这个方法必须return出来一个值
> 5. 使用的时候，方法名和data里面的属性一样使用在 `{{}}、v-bind:` 中
> 6. 计算属性所依赖data中声明的属性有变化的时候，计算属性会自动调用重新计算重新返回新值

案例：圆周长、面积自动计算



## 今日课程目标

- 能够使用过滤器格式化日期
- 能够概述生命周期的基本流程
- 能够使用axios发送get请求
- 能够使用axios发送post请求
- 能够使用vue实现过渡动画效果



## Vue过滤器基础使用

[官方文档](https://cn.vuejs.org/v2/guide/filters.html#ad)

vue过滤器如何声明和使用的？

> 1. Vue构造函数传参中和`el、data、methods、computed`平级，声明一个对象 `filters : {}`
> 2. 过滤器就是filters对象中定义的一个方法，这个方法名就是过滤器
> 3. 一个过滤器一个方法、
> 4. 过滤器方法需要接收一个参数，参数就是要处理的数据
> 5. 内部处理完毕之后 return 新的值，页面会显示 返回出来的新值
> 6. 使用的使用`{{ 数据 | 过滤器 }}`
> 7. 使用过滤器只是调用了一下函数方法，不会修改原始值

案例：输入一个秒数，自动转换为XX分XX秒



## * 案例：知心姐姐 - 自动置底

知心姐姐聊聊天，内容更新置底自动更新实现

> 1. 为什么会出现这个情况呢？
>    1. Vue中更改数据并更新页面显示数据分为两步
>    2. 第一步是js中直接赋值，同步执行
>    3. 第二步是将更改后的内容渲染到页面上，异步执行
> 2. 如何解决这个问题呢？
>    1. 第一种方法，使用setTimeOut改成异步实现
>    2. 第二种方法，使用Vue提供的一个方法
>    3. 还有第三种方法，updated

```js
this.$nextTick(()=>{
  $('.content').scrollTop(999999999)
})
```



## Vue生命周期钩子

1. 什么是生命周期？

   > 一个人从生到死，比如18岁，28岁，比如学前端前和学前端后

2. 什么是钩子函数？

   > 钩子函数就是回调函数

3. 什么是Vue生命周期钩子函数？

   > Vue提供给开发者的一系列的回调函数，方便我们添加自定义的逻辑，Vue的生命周期 创建到销毁，重要的节点挂载数据更新
   >
   > [官方网站](https://cn.vuejs.org/v2/guide/instance.html#%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)

4. Vue生命周期钩子函数有哪些？

   > 从创建到销毁有8个节点，8个事件发现的时候，Vue允许我们用回调函数的形式通知我们
   >
   > - 创建阶段 beforeCreate 、created
   > - 挂载渲染页面阶段  beforeMount、 mounted
   > - 更新阶段 beforeUpdate、updated
   > - 卸载阶段 beforeDestory、destoryed

5. updated 生命周期钩子函数是用来干什么的？

   > updated 在数据改变，对应的视图已经更新完后，会触发updated方法.

6. 如何定义及使用生命周期钩子函数？

   > 1. 钩子函数和data，el、methods是并列的
   > 2. 生命周期钩子的 `this` 上下文指向调用它的 Vue 实例。用methods里面的方法是一样的




## 网络请求库axios

1. 什么是axios，axios是用来干什么的？

   > 1. axios是一个轻量的JavaScript插件
   > 2. axios就是用来进行异步请求数据

2. axios如何使用？

   > 1. 导包  `<script src="https://unpkg.com/axios/dist/axios.min.js"></script>`
   >
   > 2. 用包
   >
   >    1. get请求
   >
   >       ``````js
   >       axios.get('http://wthrcdn.etouch.cn/weather_mini?city=深圳')
   >         .then(function (response) {
   >           console.log(response);
   >         })
   >         .catch(function (error) {
   >           console.log(error);
   >         })
   >       ``````
   >
   >    2. post请求
   >
   >       ``````js
   >         axios.post('http://www.tuling123.com/openapi/api', {
   >           key: '7b1cf467c0394dd5b3e49f32663f8b29',
   >           info: '知心姐姐你好美'
   >         })
   >         .then(function (response) {
   >           console.log(response);
   >         })
   >         .catch(function (error) {
   >           console.log(error);
   >         });
   >       ``````
   >
   >    3. 使用箭头函数确保this指向当前vue实例



## * 案例：天知道

1. 实现最终效果演示

2. 实现步骤分析

3. 代码结构演示

4. 开发过程演示

5. 所用知识及注意事项小结



## Vue单个元素过渡动画

[官方地址](https://cn.vuejs.org/v2/guide/transitions.html#%E5%8D%95%E5%85%83%E7%B4%A0-%E7%BB%84%E4%BB%B6%E7%9A%84%E8%BF%87%E6%B8%A1)

1. 什么叫vue过渡动画？

   > vue实现动画是配合css中定义好的css3样式实现的动画，这种依靠css3实现的动画过程就叫做过渡动画

2. 什么是单个元素过渡动画？

   > 单个元素过渡动画，顾名思义就是将一个html标签包裹起来的元素配合css3实现动画的过程

3. 如何实现单个元素过渡动画？

   > 1. 使用 transition 标签将当前元素包裹起来
   >
   > 2. 给 transition 标签声明一个name属性
   >
   > 3. 触发时机，使用v-if/v-show切换显示的时候，显示和隐藏的过程配合css3定义好属性进而实现动画
   >
   >    ``````html
   >     <transition name="fade">
   >            <img v-show="isShow" src="./img/sister.png" alt="" />
   >    </transition>
   >    ``````
   >
   > 4. 我们使用css3定义好一组动画效果
   >
   >    ``````css
   >    .fade-enter-active,
   >    .fade-leave-active {
   >            transition: opacity 0.5s;
   >    }
   >    .fade-enter, .fade-leave-to {
   >            opacity: 0;
   >    }
   >    ``````
   >
   > 5. vue在操作v-if/v-show的时候，会动态的在不同的时机为需要过渡的动画元素添加6个class，进而配合我们定义好的css3属性实现动画效果
   >
   >    ![Transition Diagram](https://cn.vuejs.org/images/transition.png)
   >    
   > 6. 工作中使用动画的频率不高，基本上都是简单动画，直接copy定义好的css3属性后直接修改，复杂动画一般不会交给初级工程师来做，并且这个地方大家切忌不要死记硬背
   > 



## 动画仓库animate.css基础使用

> 1. 演示地址：<https://daneden.github.io/animate.css/> 
>2. 直接导包的话，太大了，不太合理
> 3. 找到对应的css位置，将写好的css动画样式拷贝过来
>
>    ``````css
>    @keyframes bounce-in {
>            0% {
>              transform: scale(0);
>            }
>            50% {
>              transform: scale(1.5);
>            }
>            100% {
>              transform: scale(1);
>            }
>    }
>    ``````
>
> 4. 结合咱们前面学到的单个元素过渡动画知识写对应的动画css
>
>    ``````css
>    .bounce-enter-active {
>            animation: bounce-in  0.5s;
>    }
>    .bounce-leave-active {
>            animation: bounce-in  0.5s reverse;
>    }
>    ``````
>
> 5. 调用当前元素过渡动画
>
>    ``````
>    <button @click="show = !show">切换动画显示</button>
>    <transition name="bounce">
>         <p v-if="show">我是动画的元素</p>
>    </transition>
>    ``````
>




## Vue列表过渡动画

[官方地址](https://cn.vuejs.org/v2/guide/transitions.html#%E5%88%97%E8%A1%A8%E8%BF%87%E6%B8%A1)

1. 什么是列表过渡动画？

   > 列表过渡动画就是使用v-for遍历出来的列表在新增和删除的时候会自动调用的动画。

2. 如何实现列表过渡动画？

   > 1. 使用 `transition-group`标签将当前元素包裹起来。
   > 2. 给 `transition-group`标签声明一个name属性和一个tag属性，tag属性会被解析成为一个HTML的标签名。
   > 3. transition-group包裹的循环生成的结构。
   >    1. v-for
   >    2. 结合key属性，key的取值：字符串，数字
   > 4. 触发时机，动态的增删元素的，就会触发进入动画，以及移除动画。
   >
   > ```html
   > <div id="app">
   >       <button @click="add">添加</button>
   >       <button @click="remove">移除</button>
   >       <!-- 列表动画-->
   >       <transition-group name="fade" tag="p">
   >         <li v-for="(item, index) in arr" :key="index">{{ item }}</li>
   >       </transition-group>
   > </div>
   > ```
   >
   > 5. 我们使用css3定义好一组动画效果。
   >
   > ```css
   > .fade-enter-active,
   > .fade-leave-active {
   >         transition: opacity 0.5s;
   > }
   > .fade-enter, .fade-leave-to {
   >         opacity: 0;
   > }
   > ```
   >
   > 6. vue在操作v-if/v-show的时候，会动态的在不同的时机为需要过渡的动画元素添加6个class，进而配合我们定义好的css3属性实现动画效果
   >    
   >    ![Transition Diagram](https://cn.vuejs.org/images/transition.png)
   >    
   > 7. 工作中使用过渡动画的频率也不高，大家先学会模仿使用就可以
   
   

## * 案例：天知道 - 整合过渡动画

> 1. 整合动画到搜索天气进入里面去，循环生成的标签用`transition-group`包裹
>    1. name:list
>    2. tag:ul
>    3. 动画的样式
>    
>    ``````css
>    .fade-enter-active,
>    .fade-leave-active {
>            transition: opacity 0.5s;
>    }
>    .fade-enter, .fade-leave-to {
>            opacity: 0;
>    }
>    ``````
>    
> 2. 第二次没有动画是为什么呢？
>    1. 元素的个数没有变
>    2. 每次查询天气的时候清空数组即可
>
> 3. 间隔动画
>    1. 使用transition-delay:让每一个元素比上一个的时间晚一些即可
>    2. v-for的时候，动态的设置transitionDelay的值即可`{transitionDelay:index*50+'ms' }`
>



## * 案例：悦听播放器

[网易云音乐API接口服务](https://autumnfish.cn/)

1. 实现最终效果演示

2. 实现步骤分析

   > 获取搜索歌曲：<https://autumnfish.cn/search?keywords=星月神话>
   > 
   > 获取当前歌曲： <https://autumnfish.cn/song/url?id=33894312> 
   > 
   > 歌曲封面获取：<https://autumnfish.cn/song/detail?ids=347234> 
   > 
   > 获取歌曲评论：<https://autumnfish.cn/comment/hot?type=0&id=186015> 
   
3. 代码结构演示

4. 开发过程演示

5. 所用知识及注意事项小结

   > 版权问题，企业中，如果要做播放器，一定要考虑版权问题，学习节点，个人玩耍，只要不商用，不盈利，不会涉及侵权



## 课程小结

- 能够使用过滤器格式化日期
- 能够概述生命周期的基本流程
- 能够使用axios发送get请求
- 能够使用axios发送post请求
- 能够使用vue实现过渡动画效果