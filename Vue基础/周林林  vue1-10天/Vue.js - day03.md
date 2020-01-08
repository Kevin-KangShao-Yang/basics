---
typora-copy-images-to: assets
---

# Vue.js - day03

## 网络请求库axios

[传送门](https://github.com/axios/axios)

- 专门用来发ajax请求的
- 原生：1.xhr = new XMLHttpRequest(); 2.open  3.如果post设置请求头  4.监听响应完成事件 5.send
- jQuery：$.ajax  $.get  $.post
- axios更方便，库文件更小，让网页打开速度更快，因为它仅仅只是发ajax请求所以比较单纯简洁
- 用法：

```js
axios
	.get(路径)    // 也可以换成 .post( 路径, {参数} )
	.then( 回调函数 ) //成功
	.cath( 回调函数 ) //失败
```

	### 注意：

- axios发的post请求，请求报文里的提交的参数，默认使用的JSON格式，如果想用以前的
- Content-type:application/x-www-form-urlencoded这种形式
- 需要用到 `URLSearchParams` 这个对象

用法:

```js
let params = new URLSearchParams();
params.append('username','jack');

                axios
                    .post('https://autumnfish.cn/api/user/check',params)
                    .then( backData => {

                        console.log(backData);
                        
                    } )
```





## Vue.js-DevTools

![1563240843724](\assets\1563240843724.png)

![1563239328485](assets\1563239328485.png)

![1563239371813](assets\1563239371813.png)





### 作用：

1. 如果你的网站是用Vue写的，那么插件会亮，不是用Vue就不亮
2. 可以看到使用Vue开发网站的里面的数据（F12,找到Vue那一栏）

### 注意：

- 如果一个网站是用Vue开发，你能看到浏览器上Vue的图标变亮，但是F12里看不到Vue那一栏
- 原因：它导入的是压缩版的Vue

## v-bind 使用补充

1. 对象的方式绑定class
   
   ```  js
:class="{类名：结果}" //如果结果为true代表有这个类，为false代表没有，如果要加多个类名用逗号隔开
   ```
   
   
   
2. 对象的方式绑定style

```html
 <div :style="{ fontSize: size + 'px' }">我是div</div>// 代表我要给div加font-style样式，但是值没有写死，根据vue的数据来
```

>  注意：css中的样式带 `-` ，我们写的时候要去掉 `-` 并把 `-` 后面首字母 



## Demo-天知道

### 实现步骤

1. 要在vue里准备一个数据叫city，用来跟文本框双向绑定
2. 搜索按钮加点击事件，点击一开始就出现加载动画，数据加载完毕就消失加载动画
   1. 我们界面默认给按钮加了loading这个类，这个类可能有，可能没有，所以写一个:class
   2. 绑定一个值叫 isLoading，默认为false，点击时改为true
3. vue里准备一个数组，方便到时候对li进行渲染（v-for），数据填充到li就行了



### 注意点：

1. 要用v-if去判断各种天气类型图标
2. 点击城市名字，要能把城市名字显示到文本框，并且发请求
   - 所有它应该单独写个点击事件（不能直接用search）
   - 因为search不能把被点的文字加到界面
   - 我们需要获取被点击的城市的名字
   - 本质上就是调用函数，那么我把城市当参数传进去，就能拿到被点击的城市了



## Vue动画-单个元素动画

[传送门](https://cn.vuejs.org/v2/guide/transitions.html#%E5%8D%95%E5%85%83%E7%B4%A0-%E7%BB%84%E4%BB%B6%E7%9A%84%E8%BF%87%E6%B8%A1)

### 使用步骤：

1. 要准备好动画的样式
2. 把需要参与动画的元素，包在 `transition` 标签里
3. `transition` 这个标签要加 `name` 属性，它的值跟 样式的 前缀有关

### 注意事项：

- v-if和v-show都能应用到动画效果：因为动画效果描述的是  “进入” 和 “离开”,而v-if和v-show都有进入和离开的过程

- 类的6种状态：

1. `v-enter`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
2. `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
3. `v-enter-to`: **2.1.8版及以上** 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 `v-enter` 被移除)，在过渡/动画完成之后移除。
4. `v-leave`: 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
5. `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
6. `v-leave-to`: **2.1.8版及以上** 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave` 被删除)，在过渡/动画完成之后移除。



## Vue动画-列表过渡

[传送门](https://cn.vuejs.org/v2/guide/transitions.html#列表过渡)

### 使用方法：

- 把参与过渡的元素全部包在 `transtion-group` 标签里面
- 并且参与过渡的元素，要加一个:key，而且值不能重复，所以建议用 `id` 或者 `下标`
- `transtion-group` 给它加一个 `name` 就行了 `name` 的值就是样式的前缀

## Demo-播放器

[文档地址](https://autumnfish.cn/)

### 实现步骤

1. vue里面要准备一个属性叫song，跟文本框进行双向绑定
2. 准备一个搜索歌曲的方法，给文本框加keyup.enter触发
3. 发请求到接口获取结果，再把结果显示到左侧，要有一个数据是数组保存这些结果，再遍历到界面
4. 绑定audio的src为songUrl
5. 给每个li加双击事件，准备一个方法，方法要接受一个歌曲id的参数，调用方法时传进来
6. 根据歌曲id发请求，拿到歌曲的url，赋值给songUrl


### 注意点
