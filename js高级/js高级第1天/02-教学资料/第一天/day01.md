# 今日学习任务

* [ ] 1.面向对象编程
  * [ ] a.了解什么是面向对象
  * [ ] b.熟悉构造函数的执行原理
    * [ ] new关键字四个步骤
* [ ] ==2.原型对象==
  * [ ] a.了解什么是原型对象
  * [ ] b.==熟悉构造函数、原型对象、实例对象之间的三角关系==
    * [ ] prototype属性
    * [ ] ____proto____属性
    * [ ] constructor属性
  * [ ] c.小案例：面向对象方式创建随机方块



# 01-课程介绍

## 1.1-课程特点

* 1.js高级是对js基础语法的一个补充说明，本质上还是对ECMAScript语法的一个延伸与进阶
* 2.js高级所要学习的语法相比而言没有js基础的多，但是会更加晦涩难懂
  * 更加侧重的是理解

## 1.2-课程大纲

* 6天的时间学习三个知识点
  * 面向对象(2天)
  * 函数进阶（2天）
  * 正则表达式（1天）
  * 贪吃蛇游戏(1天)



![1559237094401](day01.assets/1559237094401.png)



## 1.3-详细授课大纲

* 第一天：面向对象
  * 面向对象入门
    * 1.理解什么是面向对象
    * 2.构造函数创建对象
    * 3.理解什么是原型
      * 掌握原型、构造函数、实例对象之间的关系
* 第二天：面向对象
  * 面向对象三大特征（重点继承）
  * 原型链
* 第三天：函数的四种调用模式
  * 上下文模式(掌握)
    * call() apply() bind() 应用场景
  * 面向对象补充知识点(了解)
* 第四天：函数进阶
  * 递归函数
  * 闭包函数
* 第五天：贪吃蛇游戏案例
  * 目的：理解面向对象编程的本质是对面向过程的一种封装
* 第六天：
  * 正则表达式(了解)
  * 实际开发中常用的正则表达式(掌握)

![1559237299806](day01.assets/1559237299806.png)



![1559237677332](day01.assets/1559237677332.png)



![1559237696025](day01.assets/1559237696025.png)

# 02-面向对象编程

## 1.1-面向对象编程介绍

* 本小节知识点
  * 1.理解什么是面向对象编程
    * `面向对象不是一门技术，而是一种解决问题的思维方式`
    * `面向对象的本质是对面向过程的一种封装`
  * 2.理解什么是对象
    * `对象的本质是程序代码与现实世界沟通的一座桥梁。它有两种函数`
      * 对象：是一种数据类型（存储数据的容器），以键值对的形式存储数据
      * 对象：对现实世界实物的一种抽象。



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

    
<script>
    /*1.面向对象编程与面向过程编程并不是一门技术，而是一种解决问题的思路和方式
            面向对象：注重的是结果
            面向过程：注重的是过程
     */

    //举例：做饭
    //1.1 面向过程：注重的是过程
    //买菜
    //洗菜
    //切菜
    //开火热锅
    //放油
    //把菜放到锅里炒
    //放盐，醋，酱油
    //把菜装到盘子里

    //1.2 面向对象：注重的是结果
    //不想自己做，找一个专业的对象来解决
    //地沟油一条街的厨师们

    /*是不是有了面向对象就不需要面向过程了呢？，不是，面向对象其实是对面向过程的一个封装 */

    /*2.理解什么是对象*/

    //2.1 对象是对单个实物的抽象     --------万物皆对象
    /*
    一台车： 特征：品牌 价格 颜色 轮子数量              行为：加速  刹车
    一个人： 特征：姓名 身高 年龄 性别                     行为：吃饭 睡觉 敲代码
    一条狗： 特征：品种 颜色  性别                            行为：拉屎 撒尿  打招呼

     */

    //2.2  对象是一个存储数据的容器    ------------键值对的形式存储数据
    var student = {
        name:'张三',
        age:18,
        eat:function (  ) {
            console.log ( "大吉大利，今晚吃鸡" );
        }
    }

    //2.3 如何寻找对象：名词提炼法
    //小明在公交车上牵着一条叼着热狗的狗

</script>
</body>
</html>
```



## 1.2-面向对象编程举例01



*本小节知识点：*

* 1.以一个简单示例介绍面向对象编程的好处
* 2.体会面向对象思维方式与面向过程的不同之处

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        div{
            height: 50px;
            margin-top: 20px;
            background-color: greenyellow;
        }

        p{
            height: 50px;
            margin-top: 20px;
            background-color: hotpink;
        }
    </style>
</head>
<body>

<div></div>
<div></div>
<div></div>
<p></p>
<p></p>
<p></p>

<script>
    //需求：给三个div和p标签设置边框

    //一：以前做法: 面向过程
    //弊端：（1）获取元素代码过长  （2）两个for循环，代码冗余   （3）不便于维护
    //1.获取页面元素
    // var divList = document.getElementsByTagName('div');
    // var pList = document.getElementsByTagName('p');
    // //2.遍历数组每一个元素，设置边框
    // for(var i = 0;i<divList.length;i++){
    //     divList[i].style.border = '10px solid red';
    // }
    // for(var i = 0;i<pList.length;i++){
    //     pList[i].style.border = '10px solid red';
    // }

    //二：使用函数封装
    // //好处：代码复用     弊端：函数名是全局变量，会造成全局变量污染
    // var divList = tagName('div');
    // var pList = tagName('p');
    // setStyle(divList,'10px solid red');
    // setStyle(pList,'10px solid red');
    //
    //
    // function tagName ( name ) {
    //     return document.getElementsByTagName(name);
    // }
    //
    // function setStyle ( eles,value ) {
    //     for(var i = 0;i<eles.length;i++){
    //         eles[i].style.border = value;
    //     }
    // }

    //三：使用对象封装
    //好处：（1）便于维护，以后添加修改方法很方便   （2）避免全局变量污染
    var obj = {
        tagName:function ( name ) {
            return document.getElementsByTagName(name);
        },
        setStyle:function ( eles,value ) {
            for(var i = 0;i<eles.length;i++){
                eles[i].style.border = value;
            };
        }
    };

    var divList = obj.tagName('div');
    var pList = obj.tagName('p');
    obj.setStyle(divList,'10px solid red');
    obj.setStyle(pList,'10px solid red');
</script>
</body>
</html> 
```



## 1.3-面向对象编程举例02



*本小节知识点*

* 介绍在以后的开发中，面向对象的应用场景

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        div{
            height: 50px;
            margin-top: 20px;
            background-color: greenyellow;
        }

        p{
            height: 50px;
            margin-top: 20px;
            background-color: hotpink;
        }
    </style>
</head>
<body>

<div></div>
<div></div>
<div></div>
<p></p>
<p></p>
<p></p>

<!--这是下个阶段要学习的第三方框架-->
<script src="jquery-1.12.4.js"></script>
<script>
    //需求：给三个div和p标签设置边框
    $('div,p').css('border','10px solid green');

    /*面向对象编程
    以后开发中，如果要实现一个需求，先看有没有现成的专业的对象来解决这个需求，如果有就直接拿来用，没有就自己造一个专业的对象
    别人造好的对象： 快捷方便，但是不好维护
    自己造的对象：  好维护，但是耗费时间和精力
     */
</script>
</body>
</html>
```



# 03-原型对象

## 1.1-构造函数的工作原理（引入原型对象）

* 本小节知识点：原型对象
  * 原型：任何构造函数在被创建的时候，系统都会自动帮我们创建一个与之对应的对象，称之为原型对象
    * 同时解决内存浪费与全局变量污染的问题
  * 谁可以访问原型对象中的成员(属性和方法)
    * 构造函数自身：`构造函数名.prototype`
    * 构造函数实例化的每一个对象：点语法直接访问

![](day01.assets/1001.gif)



![](day01.assets/1001.jpg)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>


<script>
    /*构造函数创建对象*/

    /*    
    //1.方法写在构造函数中，会浪费内存空间
    //声明构造函数
    function Student (name,age  ) {
            this.name = name;
            this.age = age;
            this.sayHi = function (  ) {
                console.log ( "我的名字是" + this.name + "我的年龄是" + this.age );
            };
    };

    //实例化对象
    var s1 = new Student('班长',38);
    s1.sayHi();
    var s2 = new Student('班花',18);
    s2.sayHi();
    console.log ( s1.sayHi == s2.sayHi );//false */

    //2.把构造函数里的方法提取出来，可以解决内存空间浪费的问题
    //但是造成新的问题：全局变量污染
    /*function sayHi (  ) {
        console.log ( "我的名字是" + this.name + "我的年龄是" + this.age );
    }
    //声明构造函数
    function Student (name,age  ) {
            this.name = name;
            this.age = age;
            this.sayHi = sayHi;
    }

    //实例化对象
    var s1 = new Student('班长',38);
    s1.sayHi();
    var s2 = new Student('班花',18);
    s2.sayHi();
    console.log ( s1.sayHi == s2.sayHi );//true*/

    //3.将构造函数里所有的方法提取到一个对象中，可以解决全局变量污染的问题
    //新的问题：每声明一个构造函数，就要声明一个对象，维护不便
    /*   
        var studentObj  = {
        sayHi:function(  ) {
            console.log ( "我的名字是" + this.name + "我的年龄是" + this.age );
        }
    }
    //声明构造函数
    function Student (name,age  ) {
            this.name = name;
            this.age = age;
            this.sayHi = studentObj.sayHi;
    }
    //实例化对象
    var s1 = new Student('班长',38);
    s1.sayHi();
    var s2 = new Student('班花',18);
    s2.sayHi();
    console.log ( s1.sayHi == s2.sayHi );//true*/

    /* -----------------------------4.使用原型：同时解决内存浪费与全局变量污染的问题    -------------------*/

    //4.1 原型：任何函数在被创建的时候，系统都会自动帮我们创建一个与之对应的对象，称之为原型对象
    //声明构造函数
    function Student (name,age  ) {
        this.name = name;
        this.age = age
    }

    //4.2 如何访问一个构造函数的原型对象呢?
    //语法：  构造函数名.prototype
    console.log ( Student.prototype );

    //4.3 既然是对象，就可以动态的添加属性和方法
    Student.prototype.sayHi = function (  ) {
        console.log ( "我的名字是" + this.name + "我的年龄是" + this.age );
    }
    Student.prototype.sb = function (  ) {
        console.log ( "一群大雁飞过，一会儿排成s形，一会儿排成b形" );
    }
    Student.prototype.school = '黑马程序员';

    //4.4 原型对象中的属性和方法，谁可以访问呢?

    //a.原型自身
    Student.prototype.sb();
    console.log ( Student.prototype.school );

    //b.原型对应的构造函数实例化出来的对象
    var s1 = new Student('班长',38);
    s1.sayHi();
    var s2 = new Student('班花',18);
    s2.sayHi();
    console.log ( s1.sayHi == s2.sayHi );//true

</script>
</body>
</html>
```



## 1.2- ______proto______属性介绍

*本小节知识点：**proto**属性介绍*

* 1.属于对象，指向实例化这个对象的构造函数对应的原型
* 2.proto属性不是W3C的标准属性，所以实际开发中一般不会使用它来访问原型
  * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
  * 往原型添加属性方法，最好使用构造函数来访问`构造函数名.prototype`

![](day01.assets/1002.jpg)



![](day01.assets/1101.jpg)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>


<script>
    //1. __proto__ 属性
    // 属于对象，指向实例化这个对象的构造函数对应的原型
    function Student (name,age  ) {
        this.name = name;
        this.age = age
    };
    Student.prototype.sayHi = function (  ) {
        console.log ( "我的名字是" + this.name + "我的年龄是" + this.age );
    };
    var s1 = new Student('班长',38);
    console.log ( s1 );
    console.log ( s1.__proto__ === Student.prototype );//true

    //2.__proto__属性不是W3C的标准属性，所以实际开发中一般不会使用它来访问原型
    //官方文档参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
    //2.1  不要通过实例对象的__proto__属性来修改原型(平时研究学习可以使用)
    s1.__proto__.type = '人类';
    //2.2 往原型添加属性方法，最好使用构造函数来访问
    Student.prototype.type = '人类';

</script>
</body>
</html>
```



## 1.3-constructor属性介绍



*本小节知识点*

* 1.constructor属性:属于原型对象，指向这个原型对应的构造函数
* 2.constructor属性作用:可以得知某个实例对象，到底是由哪一个构造函数生成的
* 3.注意点：如果对原型对象重新赋值,默认的constructor属性就会丢失
  * 解决方案:手动追加

![](day01.assets/1301.jpg)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<script>
    //1.constructor属性
    //属于原型对象，     指向这个原型对应的构造函数
    function Teacher (name,age  ) {
        this.name = name;
        this.age = age
    };
    Teacher.prototype.teach = function (  ) {
        console.log ( "我是老师，我的名字叫" + this.name + "我正在苦口婆心的教呀教………………" );
    };

    //查看构造函数的原型
    console.log ( Teacher.prototype );
    console.log ( Teacher.prototype.constructor === Teacher );//true

    //2.constructor属性作用:可以得知某个实例对象，到底是由哪一个构造函数生成的
    // 思考：下面这行代码结果
    var t1 = new Teacher('保健坤',38);
    console.log ( t1.constructor );//Teacher
    //思考：下面这行代码能够实例化对象
    var t2 = new Teacher.prototype.constructor('绿群',38);
    console.log ( t2 );

    //3.注意点：如果对原型对象重新赋值,默认的constructor属性就会丢失
    //解决方案:手动追加
    Teacher.prototype = {
        sayHi:function (  ) {
            console.log ( "一日为师终身为父" );
        },
        constructor:Teacher//重新找回constructor属性
    }
    console.log ( t1.constructor === Teacher );//true
    console.log ( Teacher.prototype.constructor === Teacher );//true

</script>
</body>
</html>
```



## 1.4-使用原型注意点



*本小节知识点：附图解说明*

* 1.一般哪些属性可以往原型中添加呢？
  * 构造函数实例化对象共有的数据
    * 例如：构造函数Dog用于创建狗对象，每一只狗都有`saiHi`叫的方法，此时可以添加到原型对象。而`sex`性别属性，不同的狗性别不同，此时就不能添加到原型中（否则实例化出来的狗性别都是固定的）
* 2.对象访问成员变量的访问规则：如果自己有就访问自己的，自己没有就访问原型的
  * 成员变量：指的是对象的属性和方法的别称
* 3.原型对象可以重新赋值
  * **通过构造函数名.prototype来修改原型对象，不要使用实例化对象.proto来修改原型对象**
  * **实例化对象访问原型中的成员变量，是访问修改前还是修改后，取决于这个对象是在修改前实例化还是修改**

![](day01.assets/1201.gif)



![](day01.assets/1201.jpg)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>


<script>
    /* 使用原型对象的注意点  */

    //1. 哪些属性可以往原型中添加：构造函数实例化对象共有的数据
    function Dog (  name,gender) {
        this.name = name;
        this.gender = gender;
    }
    //每一条狗都有叫的方法，那这个方法就可以写在原型中
    Dog.prototype.saiHi = function (  ) {
        console.log ( "汪汪汪~~" );
    }
    Dog.prototype.type = '哺乳动物';
    // Dog.prototype.gender = '母狗';//并不是每一只狗都是母狗，所以性别属性不能加到原型中

    var d1 = new Dog('来福','公狗');
    var d2 = new Dog('旺财','母狗');

    //2.对象访问成员变量(属性和方法)的访问规则：如果自己有就访问自己的，自己没有就访问原型的
    function Cat ( name,type ) {
        this.name = name;
        this.type = type;
        this.sayHi = function (  ) {
            console.log ( "我是构造函数中的sayHi" );
        }
    }
    Cat.prototype.sayHi = function (  ) {
        console.log ( "我是原型对象中的saiHi" );
    }

    var c1 = new Cat('群群','英短');
    console.log ( c1 );
    c1.sayHi();

    //3.原型对象可以重新赋值
    /*a.通过构造函数名.prototype来修改原型对象，不要使用实例化对象.__proto__来修改原型对象
       b.实例化对象访问原型中的成员变量，是访问修改前还是修改后，取决于这个对象是在修改前实例化还是修改后
     */
    function Teacher ( name,age ) {
        this.name = name;
        this.age = age;
    }

    var t1 = new Teacher('利群',38);
    //3.1  注意：这个语法不是修改原型对象，而是给t1动态添加一个方法
    t1.sayHi = function (  ) {
        console.log ( "你们是我带过的最好的学生" );
    }
    console.log ( t1 );
    //3.2 注意：从语法上实例化对象可以修改原型对象,但是不建议这样写
    // t1.__proto__.sayHi = function (  ) {
    //     console.log ( "1111" );
    // }
    // console.log ( t1 );
    //3.3 修改原型对象，应该通过构造函数名.prototype来修改
    Teacher.prototype.sayHi = function (  ) {
        console.log ( "1111" );
    }

    var t2 = new Teacher('保健坤',38);
    console.log ( t2 );

    //3.4 原型对象重新赋值
    Teacher.prototype = {
        sayHi:function (  ) {
            console.log ( "我是修改后的原型对象的sayHi" );
        }
    };
    var t3 = new Teacher('隔壁老王',38);
    console.log ( t3 );
    t3.sayHi();//修改后
    t2.sayHi();//修改前


</script>
</body>
</html>
```

## 1.5-案例：随机方块

*本小节知识点：以面向对象的形式创建随机方块*

* 面向过程思路
  * （1）创建食物方块
  * （2）添加到地图
  * 弊端：不便于维护
* 面向对象思路
  * （1）创建食物方块构造函数`Food`
  * (2) 调用构造函数创建实例化对象`food`
  * （3）添加到地图
  * 好处：维护方便

![](day01.assets/1401.gif)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .map{
            width: 800px;
            height: 600px;
            background-color: #ccc;
            top: 0px;
            left: 0px;
            position: relative;
        }
    </style>
</head>
<body>

<div id="map" class="map"></div>

<script>
    /*面向过程：页面添加食物方块步骤
    a.创建食物
    b.添加到地图上
     */
    
    /*    
    var map = document.getElementById('map');
    //需求：添加十个随机方块
    for(var i = 0;i<10;i++){
        //a.创建方块
        var div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.width = '20px';
        div.style.height = '20px';
        var x = Math.floor(Math.random() * map.offsetWidth/20) * 20;
        var y = Math.floor(Math.random() * map.offsetHeight/20) * 20;
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        div.style.backgroundColor = 'green';
        //b.添加
        map.appendChild(div);
    }*/

    /*面向对象：构造函数创建食物方块
     */

    function Food (width,height,bgc,x,y ) {
        this.width = width || 20;
        this.height = height || 20;
        this.bgc = bgc || 'green';
        this.x = x || 0;
        this.y = y || 0;
        //食物显示在地图上这个方法放在构造函数里面是否合理？
        /*  this.render = function  ( map ) {
            var div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.width =  this.width + 'px';
            div.style.height = this.height + 'px';
            var x = Math.floor(Math.random() * map.offsetWidth/this.width) * this.width;
            var y = Math.floor(Math.random() * map.offsetHeight/this.height) * this.height;
            div.style.left = (this.x || x) + 'px';
            div.style.top = (this.y || y) + 'px';
            div.style.backgroundColor = this.bgc;
            map.appendChild(div);
        }*/
    }
    //食物显示在地图上这个方法放在构造函数里面是否合理？
    //不合理： （1）内存资源浪费  （2）每一个食物都要有显示在地图上的方法，应该放在原型中
    Food.prototype.render = function ( map ) {
        var div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.width =  this.width + 'px';
        div.style.height = this.height + 'px';
        var x = Math.floor(Math.random() * map.offsetWidth/this.width) * this.width;
        var y = Math.floor(Math.random() * map.offsetHeight/this.height) * this.height;
        div.style.left = (this.x || x) + 'px';
        div.style.top = (this.y || y) + 'px';
        div.style.backgroundColor = this.bgc;
        map.appendChild(div);
    };

    for(var i = 0;i<10;i++){
        var food = new Food();
        food.render(map);
    };

    var f1 = new Food(50,50,'red',100,100);
    f1.render(map);
</script>
</body>
</html>
```



# 第一天学习总结



## 1.1-面向对象编程



* 1.什么是面向对象？
  * 面向对象不是一门技术，而是编程的一种思维方式。
* 2.面向对象与面向过程区别
  * 面向过程：注重的是过程(实现某一个功能的逻辑,12345步)
  * 面向对象：注重的是结果（能一行代码搞定，尽量一行代码搞定）
    * 面向对象的本质其实是对面向过程的一个封装（将面向过程的逻辑步骤封装到对象中，然后一行代码搞定）
* 3.如何学习面向对象？
  * a.理解对象
  * b.了解并学习面向对象的三大特征
  * c.贪吃蛇案例了解面向对象编程的好处



## 1.2-原型对象



* 1.什么是原型？
  * 任何构造函数在被创建的时候，系统都会自动帮我们创建一个与之对应的对象，称之为原型对象
* 2.如何访问原型对象
  * 构造函数名.prototype
* 3.哪些对象可以访问原型？
  * a.构造函数自身
  * b.该原型对应的构造函数实例化出来的对象
* 4.使用原型的注意点
  * a.一般哪些数学和方法应该添加到原型中？
    * 构造函数实例化对象共有的数据
  * b.对象访问成员变量(属性和方法)的访问规则：如果自己有就访问自己的，自己没有就访问原型的
  * c.原型对象可以重新赋值
    * 一般使用`构造函数名.prototype`来修改，不要使用`实例化对象.__proto__`属性来修改
    * 实例化对象访问原型中的成员变量，是访问修改前还是修改后，取决于这个对象是在修改前实例化还是修改后的
* 5.proto属性介绍
  * 属于对象，指向实例化这个对象的构造函数对应的原型
  * **proto**属性不是W3C的标准属性，所以实际开发中一般不会使用它来访问原型
* 6.constructor属性介绍
  * 属于原型对象，指向这个原型对应的构造函数
  * 作用:可以得知某个实例对象，到底是由哪一个构造函数生成的
  * 注意点：如果对原型对象重新赋值,默认的constructor属性就会丢失
    * 解决方案：手动添加



## 1.3-js基础语法复习（课后了解）

* 1.数据类型
  * 基本数据类型：number、string、boolean、undefined、null
  * 复杂数据类型：object（包含三种子数据类型）
    * 无序存储对象object: `{}`
    * 有序存储数组array: `[]`
    * 函数function: `function`
  * 内置对象：属于object类型，是js作者提前写好的对象，里面存储了一些属性和方法，方便开发者直接使用
    * Math：数学对象
    * Date：日期对象
    * Function：函数对象
    * RegExp：正则表达式
    * Array：数组对象
    * String ：string对象
    * Boolean ：boolean对象
    * Number ：number对象
* 2.值类型与引用类型
  * a.值类型（基本数据类型）:栈中存储的是数据，赋值拷贝的是数据，修改拷贝后的数据对原数据没有影响
  * b.引用类型（复杂数据类型）：栈中存储的是地址，数据存在堆中，赋值拷贝的是地址，修改拷贝后的数据对原数据有影响
* 3.in关键字三个作用
  * a.for-in循环遍历对象属性
  * b.判断对象能够访问某个属性
    * 语法： `属性名字符串` in `对象名`
  * c.判断数组是否包含某个下标
    * 语法： `下标` in `数组名`
    * 判断数组是否包含某元素，可以使用:`数组名`.indexOf(`元素`)
* 4.delete关键字两个作用
  * a.删除对象的属性 ： `delete` `对象名.属性名`
  * b.删除没有使用var声明的变量
* 5.==与===的区别
  * a.===:全等运算符
    * 严格匹配，值与数据类型必须要同时相等
  * b.==:相等运算符
    * 不严格匹配，当左右两边数据类型不一致的时候允许数据类型转换，分为五种情况（x == y）
      * （1）当x与y都为null或者undefined, 返回true
      * （2）当x或y为NaN,返回false
      * （3）当x或y都为：string，number，boolean。且数据类型不一致的时候，此时会隐式转换成number后比较
      * （4）如果x或y存在对象类型，则会转为原始值后比较
      * （5）x与y都为对象类型，则比较它们的引用地址。如果同一个地址则为true，不同地址则为false
* 6.作用域与预解析
  * a.作用域
    * 全局作用域（全局变量）：在函数外部声明的变量，可以在任何地方起作用
    * 局部作用域（局部变量），在函数内部声明的变量，只能在函数内部起作用
    * 变量在作用域上的访问规则：`就近原则`
  * b.预解析：js在从上往下解析执行代码之前，会将代码看一眼，这个过程成为预解析。在预解析阶段，编译器会做一件事，变量的提升
    * 变量的提升：`将var变量声明与function函数声明提升到当前作用域最顶端，赋值与调用语句在原地`
* 7.混淆知识点解读（基本数据类型number与内置对象Number）

```javascript
//1.基本数据类型
    var num = 10;//基本数据类型number
    console.log ( typeof  num );//string
    console.dir(num);//10   值类型，num中存储就是一个数字值
    //2.基本包装类型（对象类型）
    var num1 = new Number(10);//对象类型 ，是js作者提前写好的内置对象,里面有一些属性和方法
    console.log ( typeof num1 );//object
    console.dir(num1);//对象  引用类型，有一个特殊的PrimitiveValue属性存储了原始值10
    //3.两者区别
    console.log ( num == num1 );//true   两边数据类型不一致，num1会获取它的PrimitiveValue属性中的原始值来比较
    console.log ( num === num1 );//false  数据类型不一样
    //4.工作原理
    num.toString();//由于num是基本数据类型，此时系统会自动帮我们转换成Number类型： new Number(num)
    num1.toString();// 由于num1是对象类型，本身原型中已经有toString方法，所以系统无需转换可以直接调用
```

![1558955999905](day01.assets/1558955999905.png)

