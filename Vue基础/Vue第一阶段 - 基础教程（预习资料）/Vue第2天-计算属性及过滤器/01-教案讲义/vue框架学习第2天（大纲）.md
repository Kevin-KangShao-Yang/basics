# Vue框架学习 - 第2天

## 课程回顾

1. vue框架是如何使用的？

   > 1. 导包
   > 2. 用包
   > 3. 构建vue实例 const app = new Vue( { 参数 } )
   > 4. el参数，元素节点选择器，一般使用id选择器
   > 5. data参数，可以用在标签内容上：v-text、{{}}、v-html ，也可以用在元素标签属性上 v-bind
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
   



##今日目标

- 能够使用v-on给元素注册事件
- 理解事件修饰符的作用
- 能够使用过滤器格式化日期
- 能够说出计算属性的作用
- 能够使用vue完成列表的增删改查功能



##v-on指令的基本使用

[基本使用](https://cn.vuejs.org/v2/guide/events.html)

1. v-on指令主要是用来干什么的？

   > 1. v-on指令主要是用来给html的标签绑定一个事件来使用的
   > 2. 在事件中修改data中的数据，进而动态的更新页面内容，实现我们想要的结果

2. v-on指令是如何使用的呢？

   > 1. v-on:事件名="事件处理方法"
   > 2. 事件名和原生的事件名一致，可以是dblclick,click,mouseover,keyup,keyenter.... 
   > 3. 事件处理方法声明在methods对象里边，methods和el、data并列，methods是一个对象

3. v-on指令简写方式是什么？

   > @

4. v-on指令调用方法是如何传参的？

   > 1. 事件处理方法的默认参数是event对象
   > 2. 在方法中可以直接使用event拿到event对象就可以使用了
   > 3. 方法传参和原来HTML注册事件方法没什么分别

5. v-on指令调用的方法内部使用this直接访问data数据

    

## 事件修饰符的基本使用

v-on指令的事件修饰符主要用来干什么的？是如何使用的？有哪些常用的事件修饰符？

> 1. 修饰符使用方法： v-on:事件名.修饰符 = "事件处理方法"
> 2. 演示demo，演示.prevent阻止a标签默认行为
> 3. 举例@keyup.enter替代event.keyCode===13逻辑
> 4. 枚举各个修饰符的作用，这些事件修饰符不需要死记硬背哈，用的时候查阅一下文档就可以了

``````html
<!-- 阻止事件冒泡 -->
<a v-on:click.stop="doThis"></a>
<!-- 阻止默认行为 -->
<a v-on:click.prevent="myClick"></a>
<!-- 修饰符可以串联，即阻止默认行为又阻止事件冒泡 -->
<a v-on:click.stop.prevent="doThat"></a>
<!-- 只当在 event.target 是当前元素自身时触发处理函数，即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
<!-- 只有在 `key` 是 `Enter` 时，也是一个别名，调用 vm.submit() -->
<input v-on:keyup.enter="submit">
``````



## v-if指令使用template标签包裹多个元素

[官方地址](https://cn.vuejs.org/v2/guide/conditional.html#%E5%9C%A8-lt-template-gt-%E5%85%83%E7%B4%A0%E4%B8%8A%E4%BD%BF%E7%94%A8-v-if-%E6%9D%A1%E4%BB%B6%E6%B8%B2%E6%9F%93%E5%88%86%E7%BB%84)   template如何使用？

> 当我们有一组标签都需要使用同一个v-if对应的逻辑的时候，避免为每个标签都添加一个v-if的麻烦，我们可以使用`<template>` 元素标签包裹这一组标签，在上面使用 `v-if`即可，template最终的渲染结果将不包含 `<template>` 元素



## Demo-天知道

1. 实现最终效果演示
2. 实现步骤分析
   1. 输入框输入一个城市 v-model 
   2. 点击回车或者点击查询按钮  @keyup.enter @click = "searchWeather"
   3. $.ajax( url ) http://wthrcdn.etouch.cn/weather_mini?city=深圳 请求数据地址
   4. 请求的数据结果是一个数组，weatherList
   5. 使用v-for指令来渲染天气列表
3. 代码结构演示
4. 开发过程演示
5. 所用知识及注意事项小结

> 注意事项小结
>
> 1. $.ajax( url ) http://wthrcdn.etouch.cn/weather_mini?city=深圳 请求数据地址
> 2. a.indexOf(b) 查找b在a字符串中的索引位置，如果没有的话返回 -1，如果找到则返回索引值



## 日期格式化库 moment.js

[官方文档](http://momentjs.cn/docs/#/parsing/)  如何使用日期格式化库？

> 1. 导包，html导入moment.js
>
> 2. 用包，对照文档说明，输出日期格式
>
>    ``````js
>    <script>
>      //当前的时间，默认的格式化
>      document.write(moment().format('YYYY-MM-DD HH:mm:ss a'))
>    </script>
>    ``````
>
> 3. 格式化对应的官方文档地址：http://momentjs.cn/docs/#/displaying/format/



## vue过滤器的定义及使用

[官方文档](https://cn.vuejs.org/v2/guide/filters.html#ad)

1. vue过滤器是什么？

   > 我们有一个时间值是秒数，我们现在希望显示对应的分钟数，该如何做？我们之前都是如何解决的呢?第一种方法是将直接修改原始数据即可，但是，原始数据如果我们在其他地方会有另外的用途，是不是不太合理？vue给我们提供了一个解决方案，这种方案在**不更改原始数据**的情况下，实现我们想要的结果，这种解决问题的方法就叫做vue过滤器

2. vue过滤器如何声明和使用的？

   > 1. 定义的方式，vue中直接定义 filters : {}
   > 2. 一个过滤器一个方法
   > 3. 使用的使用`{{ 数据 | 过滤器 }}`
   > 4. 过滤器需要接收一个参数，参数就是处理的数据
   > 5. 内部处理完毕之后 return 新的值，页面会显示 返回出来的新值
   > 6. 不会修改原始值




## vue计算属性computed的基础使用

[计算属性](https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7)

1. vue计算属性computed是什么？

   > 有一个数组，我们需要随时用到这个数组的长度进行判断，vue给我们提供了一个方法，我们称作为计算属性computed，顾名思义计算属性是需要计算的，这个案例中就是要用来动态的计算数组的长度，以方便在任何需要调用的地方可以直接使用数组的长度

2. vue计算属性如何使用？

   > 1. computed声明的时候和el、data、methods平级
   > 2. 计算属性作为computed里面的一个方法，必须return，这个return就是这个值
   > 3. 使用的时候和data里面的属性一样
   > 4. 计算属性所依赖的属性有变化的时候，计算属性会重新计算
   > 5. 比较复杂的地方使用计算属性的频率还是很高的




## Demo-品牌管理

1. 实现最终效果演示
2. 实现步骤分析

3. 代码结构演示
4. 开发过程演示
5. 所用知识及注意事项小结



## v-cloak指令(了解)

[官网地址](https://cn.vuejs.org/v2/api/#v-cloak)

1. v-clock指令有什么作用？

   > 我们使用胡子语法{{}}解析数据的时候，如果vue脚本没有加载完成的情况下，页面会暴露胡子语法，我们可以使用这个指令来让页面没有加载vue脚本的时候不暴露胡子语法，用户体验会更好

2. v-clock指令如何使用？

   > 1. 使用属性选择器在css中定义一个样式`[v-cloak]{display: none}` 
   > 2. 在会有胡子语法的标签上加上一个v-clock属性，这个时候页面是不会显示的
   > 3. 当vue加载完成并且运行成功后，vue实例会自动移除v-clock这个标签属性，页面就显示出来了




## v-once指令(了解)

[官网地址](https://cn.vuejs.org/v2/api/#v-once)  v-once指令如何使用？

> v-once添加的元素，内部的插值表达式（胡子语法），只会解析一次，后续data数据改变了不会再次出发数据更新渲染到页面上



## v-pre指令(了解)

[官网地址](https://cn.vuejs.org/v2/api/#v-pre)  v-pre指令如何使用？



## Demo-聊天机器人

1. 实现最终效果演示

2. 实现步骤分析

3. 代码结构演示

4. 开发过程演示

5. 所用知识及注意事项小结

> 知心姐姐回复消息接口调用方法
>请求地址：http://www.tuling123.com/openapi/api
> 请求方法：post
>    请求参数：key,info
>    2162602fd87240a8b7bba7431ffd379b
>    a618e456f0744066840ceafb6a249d9d
>    d7c82ebd8b304abeacc73b366e42b9ed
>    7b1cf467c0394dd5b3e49f32663f8b29

关键技术优化实现

> 1. 代码里姐姐聊天记录添加后，强制滚动，实际的效果滚动不彻底
> 2. 解释原因是dom更新是异步的：Vue 在更新 DOM 时是**异步**执行的，Vue会把数据的改变，缓冲起来，批量更新DOM
> 3. setTimeout延时，能解决问题，让消息列表滚动底部异步更新，确保能够将消息放在底部
>    setTimeout(()=>{
>           $('.content').scrollTop(999999999)
>    },100)



## Vue生命周期钩子

[官方网站](https://cn.vuejs.org/v2/guide/instance.html#%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)

1. 什么是生命周期？

   > 一个人从生到死，比如18岁，28岁，比如学前端前和学前端后

2. 什么是钩子函数？

   > 钩子函数就是回调函数

3. 什么是Vue生命周期钩子函数？

   > Vue提供给开发者的一系列的回调函数，方便我们添加自定义的逻辑，Vue的生命周期 创建到销毁，重要的节点挂载数据更新

4. Vue生命周期钩子函数有哪些？

   > 从创建到销毁有8个节点，8个事件发现的时候，Vue允许我们用回调函数的形式通知我们

5. updated vue生命周期钩子函数是用来干什么的？

   > `updated`在数据改变，对应的视图已经更新完后，会触发updated方法.

6. 如何定义及使用生命周期钩子函数？

   > 1. 钩子函数和data，el、methods是并列的
   > 2. 生命周期钩子的 `this` 上下文指向调用它的 Vue 实例。用methods里面的方法是一样的

7. 使用updated来解决保证知心姐姐聊天置底更新的问题



##今日小结

- 能够使用v-on给元素注册事件
- 理解事件修饰符的作用
- 能够使用过滤器格式化日期
- 能够说出计算属性的作用
- 能够使用vue完成列表的增删改查功能



