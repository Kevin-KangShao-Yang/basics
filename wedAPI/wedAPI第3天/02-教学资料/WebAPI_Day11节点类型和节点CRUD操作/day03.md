## 今日学习任务

* [ ] 1.DOM节点
  * [ ] a.了解节点与元素的区别
  * [ ] b.节点与元素相关操作（==常用只有两个：子元素children与父节点parentNode==）
    * [ ] 子节点与==子元素==
    * [ ] 兄弟节点与兄弟元素
    * [ ] 第一个子节点与第一个子元素
    * [ ] 最后一个子节点与最后一个子元素
    * [ ] 获取==父节点==
    * [ ] 案例：点击关闭二维码

* [ ] 2.dom增删改页面元素
  * [ ] a.语法
    * [ ] 创建子元素createElement()
    * [ ] 增加子元素appendChild()
    * [ ] 插入子元素insertBefore()
    * [ ] 替换子元素replaceChild()
    * [ ] 移除子元素removeChild()
  * [ ] b.案例
    * [ ] ==选择职业技能==



# 01-DOM节点：网页一切内容皆节点



## 1.1-DOM节点介绍



* 1.什么是节点：在HTML文档中，一切皆节点（HTML文档本身、标签、属性、注释内容、文本）
* 2.什么是元素：元素在HTML中叫做标签，在JS的dom对象中称为元素（可以理解为标签的面向对象的叫法）
* 3.HTML标签属于节点的一种，叫做元素节点
* 4.节点三要素：
  * 节点类型：标签、属性、注释、文本
  * 节点名称：p、div、class（标签名）
  * 节点的值：one（属性的值）
* 在JavaScript中，document这个对象大家一定很熟悉，哪怕是刚刚开始学习的新人，也会很快接触到这个对象。而document对象不仅仅是一个普通的JavaScript内置对象，它还是一个巨大API的核心对象，这个巨大的API就是DOM（Document Object Model），它将文档的内容呈现在JS面前，并赋予了JS操作文档的能力。
  * DOM树体现着HTML页面的层级结构，学习中经常提到的父元素子元素的说法也是建立在树这种数据结构的基础之上的,而DOM文档树则包含文档中所有内容。

![](day03.assets/1553966914340.png)

* HTML页面中的所有内容都会体现在DOM文档树中，要理解这种结构，对构成它的每个节点就要先有了解。下面是DOM节点的基本类别，以及各自类别基本属性的值及简单介绍：

![](day03.assets/1553966931316.png)



## 1.2-元素节点与属性节点

* 1.元素节点
  * 类型 nodeTypoe:1
  * 名称 nodeName：标签名大写
  * 值 nodeValue ： null
* 2.属性节点
  * 类型 nodeTypoe:2
  * 名称 nodeName：属性名
  * 值 nodeValue ： 属性值



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<div class="one" id="box">我是一个div</div>
<p class="one" id="p1">我是一个p</p>

</body>

<script>
    /*1.元素节点
        * 类型 nodeTypoe:1
        * 名称 nodeName：标签名大写
        * 值 nodeValue ： null
      2.属性节点
        * 类型 nodeTypoe:2
        * 名称 nodeName：属性名
        * 值 nodeValue ： 属性值
     */

    //1.获取到元素节点
    var box = document.getElementById('box');
    var p1 = document.getElementById('p1')
    //2.查看元素节点
    console.log ( box.nodeType );//1
    console.log ( box.nodeName );//DIV
    console.log ( box.nodeValue );//null

    console.log ( p1.nodeType );//1
    console.log ( p1.nodeName );//P
    console.log ( p1.nodeValue );//null

    //3.获取到属性节点
    console.log ( box.getAttribute ( "class" ) );//这个只是单纯的获取class属性的值，不是获取属性节点
    console.log ( box.attributes );//查看box元素的所有属性节点

    //4.查看属性节点
    console.log ( box.attributes[0].nodeType );//2
    console.log ( box.attributes[0].nodeName );//class
    console.log ( box.attributes[0].nodeValue );//one
</script>
</html>
```



## 1.3-文本节点与注释节点与文档节点



* 1.文本节点
  * 类型 nodeTypoe:3
  * 名称 nodeName：#text
  * 值 nodeValue ： 文本内容
* 2.注释节点
  * 类型 nodeTypoe:8
  * 名称 nodeName：#comment
  * 值 nodeValue ： 注释内容
* 3.文档节点
  * 类型 nodeTypoe:9
  * 名称 nodeName：#document
  * 值 nodeValue ： null



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<ul id="ul1">我是文本内容
    <!--我是注释内容-->
    <li>隔壁老王1</li>
    <li>隔壁老王2</li>
    <li>隔壁老王3</li>
    <li>隔壁老王4</li>
    <li>隔壁老王5</li>
</ul>
</body>

<script>
    /*1.文本节点
        * 类型 nodeTypoe:3
        * 名称 nodeName：#text
        * 值 nodeValue ： 文本内容
        *
      2.注释节点
        * 类型 nodeTypoe:8
        * 名称 nodeName：#comment
        * 值 nodeValue ： 注释内容
        *

       3.文档节点
        * 类型 nodeTypoe:9
        * 名称 nodeName：#document
        * 值 nodeValue ： null

     */

    //获取元素节点
    var ul1 = document.getElementById('ul1');
    //获取元素节点下的所有子节点（元素之间的空格部分可以看作一个没有内容的文本节点）
    var nodeList = ul1.childNodes;
    console.log ( nodeList );

    //查看文本节点
    console.log ( nodeList[ 0 ].nodeType );//3
    console.log ( nodeList[ 0 ].nodeName );//#text
    console.log ( nodeList[ 0 ].nodeValue );//文本内容

    //查看注释节点
    console.log ( nodeList[ 1 ].nodeType );//8
    console.log ( nodeList[ 1 ].nodeName );//#comment
    console.log ( nodeList[ 1 ].nodeValue );//注释内容

    //查看文档节点（文档节点就是document自己）
    console.log ( document.nodeType );//9
    console.log ( document.nodeName );//#document
    console.log ( document.nodeValue );//null

</script>
</html>
```



## 1.4-获取子节点与子元素



* childNodes：获取子节点：（文本节点，注释节点，子元素节点）
  * 细节：属性节点通过attribute来获取，一般用的不多
  * 浏览器兼容问题：IE8及之前不包含非空文本
* children：获取子元素：（元素节点）
  * 浏览器兼容问题: IE8及之前包含注释节点



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <ul id="ul1">
        我是班长的小迷妹
        <!-- 我是暗恋班长的班花 -->
        <li>我是班长1</li>
        <li>我是班长2</li>
        <li>我是班长3</li>
        <li>我是班长4</li>
        <li>我是班长5</li>
    </ul>

    <script>
    /*本小节知识点：获取子元素与子节点
        1.获取子元素： 父元素.children

        2.获取子节点： 父元素.childNodes
     */ 
    
     var ul1 = document.getElementById('ul1');

     //1.获取子元素： 元素节点
     /* 
     谷歌火狐：元素节点
     IE8：包含注释和元素
     */
     console.log(ul1.children);
     

     //2.获取子节点: 元素节点  文本节点  注释节点
     /* 
     谷歌火狐：  包含空文本
     IE8：  不包含空文本
     */
     console.log(ul1.childNodes);

    </script>
</body>
</html>
```



## 1.5-兄弟节点与兄弟元素



本小节知识点：获取兄弟节点与兄弟元素

* nextSibling：获取下一个节点 previousSibling：获取上一个节点
  * IE8及之前：文本（不包含非空）、注释、元素
  * 其他浏览器：文本（包含非空）、注释、元素

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <ul id="ul1">
        
        我是班长的小迷妹
        <!-- 我是暗恋班长的班花 -->
        <li>我是班长1</li>
        <!-- svkhskvhb -->
        <li id="li2">我是班长2</li>666
        <li>我是班长3</li>
        <li>我是班长4</li>
        <li>我是班长5</li>
    </ul>

    <script>
    /*本小节知识点：获取兄弟元素与兄弟节点
        1.获取兄弟节点
            * 上一个节点： 元素.previousSibling
            * 下一个节点： 元素.nextSibling

        2.获取兄弟元素(常用)
            * 上一个元素：元素.previousElementSibling
            * 下一个元素 元素.nextElementSibling
     */ 
    
     var ul1 = document.getElementById('ul1');
     var li2 = document.getElementById('li2');//班长2


     //1.兄弟节点：  元素、注释、文本

     //1.1 获取上一个节点
     console.log(li2.previousSibling);

     //1.2 获取下一个节点
     console.log(li2.nextSibling);
     
    
     //2.兄弟元素:  元素
     //2.1 获取上一个元素
     console.log(li2.previousElementSibling);
     //2.2 获取下一个元素
     console.log(li2.nextElementSibling);

    </script>
</body>
</html>
```



## 1.6-第一个子节点与第一个子元素



* 1.firstChild : 第一个子节点
* 2.firstElementChild：第一个子元素节点
  * 他们两者的浏览器兼容问题与兄弟节点一致



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <ul id="ul1">
            我是班长的小迷妹
            <!-- 我是暗恋班长的班花 -->
            <li>我是班长1</li>
            <!-- svkhskvhb -->
            <li id="li2">我是班长2</li>666
            <li>我是班长3</li>
            <li>我是班长4</li>
            <li>我是班长5</li>
    </ul>

    <script>
    /*本小节知识点：获取第一个子元素与第一个子节点
        1.获取第一个子节点： 父元素.firstChild
        2.获取第一个子元素:  父元素.firstElementChild
     */ 
    
     var ul1 = document.getElementById('ul1');
     
     //1.获取第一个子节点 (元素 文本  注释)
     console.log(ul1.firstChild);

     //2.获取第一个子元素: 元素
     console.log(ul1.firstElementChild);
     
    </script>
</body>
</html>
```



## 1.7-最后一个节点与最后一个元素



* 1.lastChild : 最后一个子节点
* 2.lastElementChild：最后一个子元素节点
  * 他们两者的浏览器兼容问题与兄弟节点一致



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <ul id="ul1">
            我是班长的小迷妹
            <li>我是班长1</li>
            <!-- svkhskvhb -->
            <li id="li2">我是班长2</li>666
            <li>我是班长3</li>
            <li>我是班长4</li>
            <li>我是班长5</li>
             <!-- 我是暗恋班长的班花 -->
            </ul>

    <script>
    /*本小节知识点：获取最后一个子元素与最后一个子节点
        1.获取最后一个子节点： 父元素.lastChild
        2.获取最后一个子元素:  父元素.lastElementChild
     */ 
    
     var ul1 = document.getElementById('ul1');
     
     //1.获取最后一个子节点 (元素 文本  注释)
     console.log(ul1.lastChild);
     
     //2.获取最后一个子元素: 元素
    console.log(ul1.lastElementChild);
    
    </script>
</body>
</html>
```

## ==1.8-获取父节点==



parentNode:获取元素的父元素节点

* 细节：一个元素的父节点一定是一个元素，而不是（文本、注释、属性），只有元素才有子节点

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <ul id="ul1">
        我是班长的小迷妹
        <li>我是班长1</li>
        <!-- svkhskvhb -->
        <li id="li2">我是班长2</li>666
        <li>我是班长3</li>
        <li>我是班长4</li>
        <li>我是班长5</li>
        <!-- 我是暗恋班长的班花 -->
    </ul>

    <script>
        //获取元素的父节点： 子元素.parentNode
        var li2 = document.getElementById('li2');
        //获取元素的父节点一定是元素。  （因为只有元素节点才会有节点）
        console.log(li2.parentNode);//ul1

        console.log(li2.parentNode.parentNode);//body
        console.log(li2.parentNode.parentNode.parentNode);//html
        console.log(li2.parentNode.parentNode.parentNode.parentNode);//document
        console.log(li2.parentNode.parentNode.parentNode.parentNode.parentNode);//null
    </script>
</body>
</html>
```



## 1.9-案例：点击关闭二维码

[效果预览](<file:///C:/Users/%E5%BC%A0%E6%99%93%E5%9D%A4/Desktop/%E5%BC%A0%E6%99%93%E5%9D%A4%E5%89%8D%E7%AB%AF%E5%A4%87%E8%AF%BE%E8%B5%84%E6%96%99/%E5%85%A8%E5%A4%A9%E6%A8%A1%E5%BC%8F/02-WebApi/%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/%E5%A4%87%E8%AF%BE%E4%BB%A3%E7%A0%81/day02/15-%E6%A1%88%E4%BE%8B%EF%BC%9A%E7%82%B9%E5%87%BB%E6%8C%89%E9%92%AE%E5%85%B3%E9%97%AD%E4%BA%8C%E7%BB%B4%E7%A0%81.html>)



* 需求：点击二维码图片右上角的小叉叉，关闭二维码
* 思路：给子元素添加一个点击事件，点击之后移除父元素

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>关闭二维码</title>
    <style>
        .box {
            border: 1px solid #D9D9D9;
            margin: 100px auto;
            position: relative;
            width: 107px;
        }

        #x {
            border: 1px solid #D9D9D9;
            width: 14px;
            height: 14px;
            line-height: 14px;
            color: #D6D6D6;
            cursor: pointer;
            position: absolute;
            top: 0;
            left: -15px;
        }
    </style>
</head>
<body>

<div class="box">
    <img src="images/taobao.jpg" alt=""/>
    <span id="x">×</span>
</div>

</body>

<script>
    /**需求：点击二维码图片右上角的小叉叉，关闭二维码
     * 思路：给子元素添加一个点击事件，点击之后移除父元素
     *
     */
    var x = document.getElementById('x');
    x.onclick = function (  ) {
        //隐藏父元素
        this.parentNode.style.display = 'none';
    }
</script>
</html>
```



# 02-dom增删改页面元素

| 语法                        | 示例                          | 描述                     |
| --------------------------- | ----------------------------- | ------------------------ |
| document.createElement()    | document.createElement('li')  | 创建空标签元素           |
| 父元素.appendChild(子元素)  | ul.appendChild(li)            | 添加子元素               |
| 父元素.insertBefore(子元素) | ul.insertBefore(元素A，元素B) | 将元素A插入到元素B的前面 |
| 父元素.replaceChild(子元素) | ul.replaceChild(元素A，元素B) | 元素A替换元素B           |
| 父元素.removeChild(子元素)  | ul.removeChild(li)            | 移除子元素               |



## 1.1-创建元素三种方式介绍

* 1.document.write():慎用，可能会覆盖原本内容
  * 解析字符串识别标签
* 2.innerHTML：创建元素过多时（100以内可以忽略），会损耗性能
  * 解析字符串识别标签
  * 直接赋值 元素.innerHTML 会替换原本内容，如果不想替换使用 += 拼接
* 3.document.createElement()：dom推荐方式
  * 动态创建一个dom对象（空标签，需要自己设置属性）在内存中
  * 需要使用appendChild来添加到HTML
* document.write():慎用，因为可能会覆盖原本的内容
  * 覆盖内容的原理了解即可：编译器从上往下解析HTML的时候会形成一个文档流，这个文档流会在文档所有的HTML标签解析后关闭。不会覆盖的情况：如果在关闭这个文档流之前调用document.write()，则不会覆盖会覆盖的情况：如果在关闭文档流之后调用document.write()，会开启一个新的文档流，此时会把上一个文档流中的内容覆盖

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div style="background: greenyellow" id="box">我是div</div>
<p>我是pp</p>
<input type="button" value="添加" id="btn">
</body>

<script>
    /*创建元素三种方式
    1.document.write():慎用，可能会覆盖原本内容
        * 解析字符串识别标签
    2.innerHTML：创建元素过多时（100以内可以忽略），会损耗性能
        * 解析字符串识别标签
        * 直接赋值  元素.innerHTML 会替换原本内容，如果不想替换使用 += 拼接
    3.document.createElement()：dom推荐方式
        * 动态创建一个dom对象（空标签，需要自己设置属性）在内存中
        * 需要使用appendChild来添加到HTML
     */

    //1.document.write():慎用，因为可能会覆盖原本的内容
    /*覆盖内容的原理了解即可：编译器从上往下解析HTML的时候会形成一个文档流，
   这个文档流会在文档所有的HTML标签解析后关闭。
   不会覆盖的情况：如果在关闭这个文档流之前调用document.write()，则不会覆盖
   会覆盖的情况：如果在关闭文档流之后调用document.write()，会开启一个新的文档流，此时会把上一个文档流中的内容覆盖

     */
    //下面这行代码在加载HTML的时候就会执行，也就是未关闭文档流之前，所以不会覆盖原本内容
    document.write ( "<div>我是docuemnt.create()添加的div</div>" )
    document.getElementById ( "btn" ).onclick = function () {
        //这行代码并不会在加载的时候执行，而是加载完毕之后，点击按钮才会执行，此时已经关闭文档流，所以会覆盖原本内容
        document.write ( "<div>我是谁？为了谁？</div>" )
    }

    //2.innerHTML：给指定元素添加标签
    var box = document.getElementById ( "box" )
    //这样写会覆盖原本的内容，相当于把所有的子元素替换了
    box.innerHTML = "<p>我是P标签</p>"
    //如果不想替换内容，只是在原有的基础上添加，则可以用字符串拼接的方式
    box.innerHTML += "<a href=\"#\">我是a标签</a>>"
    //innerHTML这种方式创建多个元素时，会损耗性能，因为字符串具有恒定性，每一次添加都会开辟新的空间
    // for(var i = 0;i<100;i++){
    //     box.innerHTML += '<span>键盘敲烂，月薪过万</span></br>';
    // }

    //3.document.createElement('标签名')
    //document.createElement()创建出来的元素放在内存中，不会自动加到HTML中，需要使用appendChild手动添加
    var p1 = document.createElement ( "p" );//创建出来的是一个空标签，需要自己设置属性
    p1.style.background = "yellowgreen"
    p1.innerText = "我是老P"
    box.appendChild ( p1 )

    //document.createElement（）添加多个标签性能要高于innerHTML字符串拼接的方式
    // for ( var i = 0 ; i < 100 ; i ++ ) {
    //     var p = document.createElement ( "p" )
    //     p.style.background = "yellowgreen"
    //     p.innerText = "我是p" + i;
    //     box.appendChild(p);
    // }
</script>
</html>
```



## 1.2-练习：点击按钮创建多个标签

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<input type="button" value="增加" id="add">
</body>

<script>
    var add = document.getElementById('add');

    add.onclick = function (  ) {
        //以1000个为实例，实际测试各种方式之间的性能

        // //第一种方式innerHTML字符串拼接
        // var date = Date();
        // console.time (date);//console.time()专门用来调试代码的性能
        // for(var i = 0;i<1000;i++){
        //     //innerHTML字符串拼接
        //     document.body.innerHTML += '<p>我是第' + i+ '个P标签</p>';
        // }
        // console.timeEnd (date);//会自动输出  从console.time到console.timeEnd消耗的毫秒数

        //第二种方式innerHTML：先将字符串放入数组中，然后将数组转为字符串（避免字符串恒定性造成的资源浪费）

        // var date = Date();
        // console.time(date);
        // var arr = [];
        // for(var i = 0;i<1000;i++){
        //     arr.push('<p>我是第' + i+ '个P标签</p>');
        // }
        // document.body.innerHTML = arr.join('');//join将数组元素按照指定符号拼成字符串
        // console.timeEnd(date);

        //第三种方式：document.createElement()
        var date = Date();
        console.time(date);

        for(var i = 0;i<1000;i++){
            var p = document.createElement('p');
            p.innerText = '我是第' + i+ '个P标签';
            document.body.appendChild(p);
        }
        console.timeEnd(date);

    }

</script>
</html>
```



## 1.3-添加子元素：appendChild()

* appendChild()添加元素有三种情况
  * （1）如果是一个新的子元素，则默认会添加到最后
  * (2)如果是一个已存在的子元素，相当于移动到最后面
  * （3）如果添加的元素有子元素，子元素也会一起移动到最后面



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<ul id="ul1">
    <li>隔壁老王1</li>
    <li id="li2">隔壁老王2</li>
    <li>隔壁老王3</li>
    <li>隔壁老王4</li>
    <li>隔壁老王5</li>
</ul>
<ul id="ul2">
    <li>隔壁老张1</li>
    <li>隔壁老张2</li>
    <li>隔壁老张3</li>
    <li>隔壁老张4</li>
    <li>隔壁老张5</li>
</ul>
</body>

<script>
    /**appendChild()添加元素有三种情况
     * （1）如果是一个新的子元素，则默认会添加到最后
     *   (2)如果是一个已存在的子元素，相当于移动到最后面
     *   （3）如果添加的元素有子元素，子元素也会一起移动到最后面
     */

    var ul1 = document.getElementById('ul1');
    var ul2 = document.getElementById('ul2');
    var li2 = document.getElementById('li2');

    //1.如果是新创建的子元素则默认添加到最后面
    var li = document.createElement('li');
    li.innerText = '我是新来的';
    ul1.appendChild(li);

    //2.如果是添加一个已经存在的元素（不是新创建的），则进行的是移动操作
    ul2.appendChild(li2);

    //3.如果将一个已存在的元素添加到其他元素中，则该元素的子元素也会随着父元素一起移动
    ul1.appendChild(ul2);


</script>
</html>
```



## ==1.3-案例：选择职业技能==

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/全天模式/02-WebApi/课程资料/备课代码/day03/10-案例：选择职业技能.html)



需求分析：

* 点击 >> ：将左边所有的内容移动到右边
* 点击 <<:将右边所有的内容移动到左边
* 点击 >:将左边选中的内容移动到右边
* 点击 <:将右边选中的内容移动到左边

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>

    <style>
        select {
            width: 100px;
            height: 150px;
        }
    </style>
</head>
<body>

<select name="" id="left" multiple>
    <option value="">web工程师</option>
    <option value="">android工程师</option>
    <option value="">ios工程师</option>
    <option value="">php工程师</option>
    <option value="">nodejs工程师</option>
    <option value="">pyton小白</option>
    <option value="">足疗爱好者</option>
</select>

<button id="btn1">&gt;&gt;</button>
<button id="btn2">&lt;&lt;</button>
<button id="btn3">&gt;</button>
<button id="btn4">&lt;</button>


<select name="" id="right" multiple></select>

</body>

<script src="common.js"></script>

<script>
    /*需求分析：点击 >> ：将左边所有的内容移动到右边
    点击 <<:将右边所有的内容移动到左边
    点击 >:将左边选中的内容移动到右边
    点击 <:将右边选中的内容移动到左边
     */

    //1.获取元素
    var left = id ( "left" )
    var right = id ( "right" )
    var btn1 = id ( "btn1" )
    var btn2 = id ( "btn2" )
    var btn3 = id ( "btn3" )
    var btn4 = id ( "btn4" )

    //2.全部到右边
    btn1.onclick = function () {
        //思路：遍历左边每一个option项，追加到右边即可
        //特点：每移动一次，left的长度会发生变化，当我移动0个的时候，下一个元素就变成了0个
        /*这里for循环的循环变量自增不写，就是为了保证 i 永远都是0，由于left.children长度每执行一次就会-1，
        所以最终循环的次数刚好就是left.children的初始长度*/
        for ( var i = 0 ; i < left.children.length ; ) {
            right.appendChild ( left.children[ 0 ] )//这里下标0就可以了，因为每移动一次下一个元素的下标就是0
        }

    }

    //3.全部到左边
    btn2.onclick = function () {
        for ( var i = 0 ; i < right.children.length ; ) {
            left.appendChild ( right.children[ 0 ] )
        }
    }

    //4.左边选中项到右边
    btn3.onclick = function () {

        //遍历左边每个元素，如果是选中状态则移动到右边
        for ( var i = 0 ; i < left.children.length ; i ++ ) {
            if ( left.children[ i ].selected ) {
                //当元素移动的时候，它的下一个元素下标就会前移
                //而此时i++，所以就会导致某些元素被跳过
                right.appendChild ( left.children[ i ] )
                //解决方案：如果元素发生移动，那么本次循环遍历i不变（i所对应的下标刚好就是下一个元素），这样就不会跳过其他元素
                i --//抵消本次的 i++
            }
        }
    }

    //5.右边选中项到左边
    btn4.onclick = function () {
        //遍历左边每个元素，如果是选中状态则移动到左边
        for ( var i = 0 ; i < right.children.length ; i ++ ) {
            if ( right.children[ i ].selected ) {
                //当元素移动的时候，它的下一个元素下标就会前移
                //而此时i++，所以就会导致某些元素被跳过
                left.appendChild ( right.children[ i ] )
                //解决方案：如果元素发生移动，那么本次循环遍历i不变（i所对应的下标刚好就是下一个元素），这样就不会跳过其他元素
                i --//抵消本次的 i++
            }
        }
    }
</script>
</html>
```



### 选择职业技能函数封装

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>

    <style>
        select {
            width: 100px;
            height: 150px;
        }
    </style>
</head>
<body>

<select name="" id="left" multiple>
    <option value="">web工程师</option>
    <option value="">android工程师</option>
    <option value="">ios工程师</option>
    <option value="">php工程师</option>
    <option value="">nodejs工程师</option>
    <option value="">pyton小白</option>
    <option value="">足疗爱好者</option>
</select>

<button id="btn1">&gt;&gt;</button>
<button id="btn2">&lt;&lt;</button>
<button id="btn3">&gt;</button>
<button id="btn4">&lt;</button>


<select name="" id="right" multiple></select>

</body>

<script src="common.js"></script>

<script>
    /*需求分析：点击 >> ：将左边所有的内容移动到右边
    点击 <<:将右边所有的内容移动到左边
    点击 >:将左边选中的内容移动到右边
    点击 <:将右边选中的内容移动到左边
     */

    //1.获取元素
    var left = id ( "left" )
    var right = id ( "right" )
    var btn1 = id ( "btn1" )
    var btn2 = id ( "btn2" )
    var btn3 = id ( "btn3" )
    var btn4 = id ( "btn4" )

    /*封装的好处：（1）代码复用，避免重复代码冗余  （2）便于维护
    我们这里封装以后，以后遇到类似功能，只是界面样式发生变化，此时js函数就可以直接使用
     */
    /** 将一个select中的所有option移动到另一个select
    * @param form:要移出的select元素的id   to:要移入的select元素的id
    * @return 无
    */
    function moveAll (form,to  ) {
        for ( var i = 0 ; i < form.children.length ; ) {
            to.appendChild ( form.children[ 0 ] )//这里下标0就可以了，因为每移动一次下一个元素的下标就是0
        }
    }

    /** 将一个select中的选中option移动到另一个select
    * @param form:要移出的select元素的id   to:要移入的select元素的id
    * @return 无
    */
    function moveSelect ( form,to ) {
        for ( var i = 0 ; i < form.children.length ; i ++ ) {
            if ( form.children[ i ].selected ) {
                to.appendChild ( form.children[ i ] )
                i --;
            }
        }
    }

    //2.全部到右边
    btn1.onclick = function () {
        moveAll(left,right);
    }

    //3.全部到左边
    btn2.onclick = function () {
        moveAll(right,left);
    }

    //4.左边选中项到右边
    btn3.onclick = function () {

        moveSelect(left,right);
    }

    //5.右边选中项到左边
    btn4.onclick = function () {
        moveSelect(right,left);
    }
</script>
</html>
```





## 1.4-插入子元素：inertBefore()



insertBefore:插入子元素到指定位置

* 语法： `父元素.insertBefore(要插入的标签，插入到哪一个标签前面)`
* 特点：与appendChildNode一致
  * （1）如果是新元素则插入到指定位置
  * （2）如果是已存在元素则移动到指定位置
  * （3）如果元素有子元素，则子元素随着它一起移动
* 如果想插入到某元素后面，没有直接的api，可以先获取该元素的下一个元素，然后插入到下一个元素前面即可



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<ul id="ul1">
    <li>隔壁老王1</li>
    <li>隔壁老王2</li>
    <li id="li3">隔壁老王3</li>
    <li>隔壁老王4</li>
    <li id="li5">隔壁老王5</li>
</ul>

<ul id="ul2">
    <li>隔壁老张1</li>
    <li>隔壁老张2</li>
    <li id="li33">隔壁老张3</li>
    <li>隔壁老张4</li>
    <li>隔壁老张5</li>
</ul>
</body>

<script>
    /*insertBefore:插入子元素到指定位置
        语法：  父元素.insertBefore(要插入的标签，插入到哪一个标签前面)
    特点：与appendChildNode一致（1）如果是新元素则插入到指定位置
        （2）如果是已存在元素则移动到指定位置
        （3）如果元素有子元素，则子元素随着它一起移动
    如果想插入到某元素后面，没有直接的api，可以先获取该元素的下一个元素，然后插入到下一个元素前面即可
     */
    var ul1 = document.getElementById('ul1');
    var ul2 = document.getElementById('ul2');
    var li3 = document.getElementById('li3');
    var li5 = document.getElementById('li5');
    var li33 = document.getElementById('li33')

    //1.插入新标签
    var newLi = document.createElement('li');
    newLi.innerText = '我是新插入的';
    ul1.insertBefore(newLi,li3);

    //2.插入已存在标签
    ul1.insertBefore(li33,li3);

    //3.插入有子元素的标签
    ul1.insertBefore(ul2,li5);
</script>
</html>
```



## 1.5-替换子元素：replaceChild()

* 替换子元素：replaceChild() 语法：`父元素.replaceChile(新元素,旧元素)`
* 特点：
  * 1.如果是新创建的元素，则直接替换
  * 2.如果是已存在的元素（不论这个元素是自己的子元素还是别人的）会将新元素移动到旧元素位置，并且旧元素被移除
  * 3.如果已存在的元素有子元素，则子元素会随着父元素一起替换

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<ul id="ul1">
    <li>隔壁老王1</li>
    <li id="li2">隔壁老王2</li>
    <li id="li3">隔壁老王3</li>
    <li>隔壁老王4</li>
    <li id="li5">隔壁老王5</li>
</ul>
<ul id="ul2">
    <li id="li11">隔壁老张1</li>
    <li>隔壁老张2</li>
    <li>隔壁老张3</li>
    <li>隔壁老张4</li>
    <li>隔壁老张5</li>
</ul>

</body>

<script>
    /*替换子元素：replaceChild()  语法：父元素.replaceChile(新元素,旧元素)
    特点：1.如果是新创建的元素，则直接替换
    2.如果是已存在的元素（不论这个元素是自己的子元素还是别人的）
    会将新元素移动到旧元素位置，并且旧元素被移除
    3.如果已存在的元素有子元素，则子元素会随着父元素一起替换

     */

    var ul1 = document.getElementById('ul1');
    var ul2 = document.getElementById('ul2');
    var li11 = document.getElementById('li11');
    var li2 = document.getElementById('li2');
    var li3 = document.getElementById('li3');
    var li5 = document.getElementById('li5');

    //1.如果是新创建的元素，则直接替换
    var newLi = document.createElement('li');
    newLi.innerText = '我是新来的';
   ul1.replaceChild(newLi,li2);

    //2.如果是已存在的元素（不论这个元素是自己的子元素还是别人的）
    // 会将新元素移动到旧元素位置，并且旧元素被移除
    ul1.replaceChild(li11,li5);

    //3.如果已存在的元素有子元素，则子元素会随着父元素一起替换
    ul1.replaceChild(ul2,li3);

</script>
</html>
```



## 1.6-移除子元素:removeChild()

removeChild:移除子元素 语法：

```
父元素.removeChild(子元素)
```

* 1.不能自己移除自己（只能让爸爸干掉自己）
* 2.父元素只能移除自己的子元素，不能移除别人的子元素（只有亲爸爸才能干掉自己）

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<ul id="ul1">
    <li>隔壁老王1</li>
    <li id="li2">隔壁老王2</li>
    <li>隔壁老王3</li>
    <li>隔壁老王4</li>
    <li>隔壁老王5</li>
</ul>

<ul id="ul2">
    <li>隔壁老林1</li>
    <li id="li22">隔壁老林2</li>
    <li>隔壁老林3</li>
    <li>隔壁老林4</li>
    <li>隔壁老林5</li>
</ul>

<input type="button" value="全部删除" id="del"/>

</body>

<script>
    /*removeChild:移除子元素   语法：父元素.removeChild(子元素)
    1.不能自己移除自己（只能让爸爸干掉自己）
    2.父元素只能移除自己的子元素，不能移除别人的子元素（只有亲爸爸才能干掉自己）
     */

    var ul1 = document.getElementById('ul1');
    var ul2 = document.getElementById('ul2');
    var li2 = document.getElementById('li2');
    var li22 = document.getElementById('li22');

    //1.错误操作：自己不能移除自己，程序报错
    //li2.removeChild(li2);

    //2.错误操作：自己不能移除别人的子元素，只能移除自己子元素,程序报错
    //ul1.removeChild(li22);

    //3.正确操作：父元素移除自己的子元素（亲爸爸干掉亲儿子）
    ul1.removeChild(li2);//常规操作，先获取父元素，再获取子元素，然后父元素移除子元素
    li22.parentNode.removeChild(li22);//骚操作 ，通过parentNode找到自己的父元素，然后移除自己

    //4.想要移除所有的元素，只能循环遍历移除
    //注意，这里也不能i++,因为移除的时候数组的长度发生变化
    document.getElementById('del').onclick = function (  ) {
        for(var i = 0;i<ul2.children.length;){
            ul2.removeChild(ul2.children[0]);//下标取0就可以，因为每删除一个下一个元素下标就会前移
        }
    }

</script>
</html>
```



## 1.7-案例：模拟百度搜索框

需求分析：
          1.键盘松开txt ： 根据搜索内容显示对应搜索列表ul
          2.鼠标移入li元素：颜色变红
          3.鼠标移出li元素：颜色变原先颜色
          4.鼠标点击li元素： （1）搜索框显示点击的li元素文本  （2）情况内容列表ul
思路分析：事件三要素
                 1 获取元素：
                 2 注册事件：
                 3 事件处理：

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        body {
            font-size: 20px;
        }
        .box {
            width: 600px;
            height: 40px;
            margin: 200px auto;
            position: relative;
        }
        #txt {
            width: 498px;
            height: 38px;
            border: 1px solid #ccc;
            font-size: 20px;
        }
        #search {
            width: 100px;
            height: 40px;
        }
        #keywords {
            position: absolute;
            top: 40px;
            left: 0;
            background-color: rgb(12, 255, 24);
            list-style: none;
            width: 500px;;
        }
        li {
            line-height: 24px;
        }
    </style>
</head>
<body>
<div class="box">
    <div class="top">
        <input type="text" id="txt"/><input type="button" value="search" id="search"/>
    </div>
    <ul id="keywords"></ul>
</div>
<script src="common.js"></script>
<script>

      /* 需求分析：
          1.键盘松开txt ： 根据搜索内容显示对应搜索列表ul
          2.鼠标移入li元素：颜色变红
          3.鼠标移出li元素：颜色变原先颜色
          4.鼠标点击li元素： （1）搜索框显示点击的li元素文本  （2）情况内容列表ul
           思路分析：事件三要素
                 1 获取元素：
                 2 注册事件：
                 3 事件处理：
       */
    var keywords = ["林利群", "林利群为什么很黑", "林利群的经纪人是周林林吗", "林利群是谁", "广东人", "广东人爱吃", "广东人爱吃福建人","王宝强","王宝强的经纪人","王宝强的老婆","林丹出轨门","林丹夺冠","123","1234","2341","林丹的生平","JavaScript","Java","王思聪","王健林","社会王","隔壁老王"];

    //1. 获取元素：
    var txt = document.getElementById('txt');
    var ul = document.getElementById('keywords');
    //2.注册事件：

      //2.1 键盘松开
      txt.onkeyup = function (  ) {
        //3.事件处理 : 根据搜索内容显示对应文本
          //3.1 获取搜索文本
          var search = this.value;
          //3.2 每一次输入之前应该把之前的内容清空，以本次输入为准
          ul.innerHTML = '';
          //3.3 如果用户没有输入，则不搜索
          if(search.length == 0){
              return;
          };
          console.log ( search );
          //3.3 根据搜索文本显示对应内容
          searchTxt(search);
      };


      /**
       *
       * @param searchTxt 要搜索的文本
       */
      function searchTxt ( searchTxt ) {
          //将数组中的内容显示到页面
          for(var i = 0;i<keywords.length;i++){
              var str = keywords[i];
              //如果搜索文本searchTxt在str中则显示
              if (str.indexOf(searchTxt) != -1){
                  //1.创建空li元素
                  var li = document.createElement('li');
                  //2.设置文本
                  li.innerText = str;
                  //3.li元素添加到ul
                  ul.appendChild(li);

                  //每一个创建的li元素都有三个事件

                  //鼠标移入：颜色变红
                  li.onmouseover = function (  ) {

                      //(1)先用一个自定义属性存储原先的颜色
                      this.aaa = this.style.backgroundColor;
                      //(2)修改颜色为红色
                      this.style.backgroundColor = 'red';
                  };

                  //鼠标移出：颜色恢复原先的颜色
                  li.onmouseout = function (  ) {
                      this.style.backgroundColor = this.aaa;
                  };

                  //鼠标单击：
                  li.onclick = function (  ) {
                      //(1)搜索框文本变成单击的li元素文本
                      txt.value = this.innerText;
                      //(2)清空内容列表
                      ul.innerHTML = '';
                      // for(var i = 0;i<ul.children.length;i++){
                      //       ul.removeChild(ul.children[i]);
                      // }
                  };
              }
          }

      };
</script>
</body>
</html>
```



# 03-今日学习总结



* 1.innerText/innerHTML:获取的都是字符串类型
  * innertText：获取元素中的文字，如果子元素有文字也会获取
  * innerHTML：获取元素的内容，包含文字与标签
* 2.节点
  * 节点类型:nodeType
    * 1：元素节点
    * 2：属性节点
    * 3：文本节点
    * 8：注释节点
    * 9：文档节点（document）
  * 节点名称:nodeName
    * 元素节点：标签名(大写)
    * 属性节点：属性名
    * 文本节点： #test
    * 注释节点：#comment
    * 文档节点：#docuemnt
  * 节点的值:nodeValue
    * 元素节点：null
    * 属性节点：属性的值
    * 文本节点：文本内容
    * 注释节点：注释内容
    * 文档节点：null
* 3.获取子节点与子元素
  * 获取子节点：元素.childNodes
  * 获取子元素：元素.children
* 4.获取兄弟节点与兄弟元素
  * 获取兄弟节点
    * `元素.nextSibling：获取下一个节点`
    * `元素.previousSibling：获取上一个节点`
  * 获取兄弟元素
    * `元素.nextElementSibling：获取下一个元素`
    * `元素.previousElementSibling：获取上一个元素`
* 5.获取第一个子节点与第一个子元素
  * 元素.firstChild : 第一个子节点
  * 元素.firstElementChild：第一个子元素节点
* 6.获取最后一个子节点与最后一个子元素
  * 元素.lastChild : 最后一个子节点
  * 元素.lastElementChild：最后一个子元素节点
* 7.获取父节点:`元素.parentNode`
  * 一个节点的父节点只能是标签，也就是元素节点
  * 只有元素才会有子节点，（注释、文本、属性等都不会有子节点）

