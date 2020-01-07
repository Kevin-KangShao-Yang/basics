# 今日学习任务



* [ ] 1.递归函数
* [ ] ==2.闭包函数(js高级中的难点与重点）==



# 01-递归

## 1.1-递归函数介绍

*本小节知识点*

* 1.递归函数：一个函数自己调用自己
* 2.递归函数特点
  * a.一定要有结束条件，否则会导致死循环
  * b.能用递归函数实现的需求，就一定可以用循环调用函数来解决，只是代码简洁与性能不同而已



```javascript
//递归函数：一个函数自己调用自己
    /*递归特点
        a.一定要有结束条件，否则会导致死循环
        b.能用递归函数实现的需求，就一定可以用循环调用函数来解决，只是代码简洁与性能不同而已
     */

    //递归函数语法介绍
    // function fn (  ) {
    //     console.log ( "哈哈" );
    //     fn();//自己调用自己
    // };
    //
    // fn();

    //递归函数嵌套
    // function test1 (  ) {
    //     test2();
    // }
    // function test2 (  ) {
    //     test1();
    // };
    // test2();

    //例如： 写一个函数，打印三次哈哈
    // function fn (  ) {
    //     for (var i = 1;i<=3;i++){
    //         console.log ( "哈哈" );
    //     }
    // }

    var i = 1;
    function fn (  ) {
        console.log ( "哈哈" );
        i++;
        if (i<=3){
            fn();
        }
    }

    fn();
```



## 1.2-递归应用场景1(累加和，阶乘)



```javascript
//1.求1-n之间的累加和

    //使用递归实现
    function getSum ( n ) {
        if (n ==1){
            return 1;
        }else {
            return getSum(n-1) + n;
        };
        //递归思路
        // if (n ==1){
        //     return 1;
        // }else if(n == 2) {
        //     return getSum(2-1) + 2;
        // }else if(n == 3);{
        //     return getSum(3-1) + 3;
        // }
        // ……………………
        // else if(n == 100){
        //     return getSum(100-1) + 100;  
        // }
    }
    console.log ( getSum ( 3 ) );
    //使用循环实现
    // function getSum ( n ) {
    //     var sum = 0;
    //     for(var i = 1;i<=n;i++){
    //         sum += i;
    //     }
    //     return sum;
    // }

    console.log ( getSum ( 10 ) );
```



* 递归实现阶乘



```javascript
//2.求n的阶乘
    /*
    5! = 5 * 4 * 3 * 2 * 1
    n! = n * n-1 * n-2 * ………………1
    1! = 1
     */
    function getJieCheng ( n ) {
        if (n == 1){
            return 1;
        }else{
            return n * getJieCheng(n-1);
        }
    }
```



* 递归实现斐波那契数列

```javascript
//3.求斐波那契数列:性能不如循环
    var i = 1;//记录函数执行次数
    function getFeiBo (n  ) {
        i++;
        if (n == 1 || n == 2){
            return 1;
        }else{
            return getFeiBo(n-1) + getFeiBo(n-2);
        }
    }

    console.log ( getFeiBo ( 10 ) );
    console.log ( i );
```



## 1.3-递归应用场景2(遍历DOM树)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div class="father" id="father">
    <div>div1
        <span>span1</span>
        <span>span2</span>
    </div>
    <div>div2</div>
    <div>div3</div>
    <p>p1</p>
    <p>p2</p>
    <p>p3
        <b>b1</b>
        <b>b2</b>
    </p>
</div>

<script>
    //需求：获取id为father的元素所有的后代元素
    //有没有直接的api可以获取呢？ 没有
    /*思路：
    （1）写一个函数获取一个元素所有的子元素
       (2)  让每一个子元素继续调用这个函数获取子元素的子元素，形成递归调用
     */
    var list = [];//声明一个数组存储所有的后代元素
    function getHouDai (  ele ) {
        var childrend = ele.children;//获取子元素
        for(var i = 0;i<childrend.length;i++){
            list.push(childrend[i]);//存入数组中
            getHouDai(childrend[i]);//每一个子元素继续递归获取子元素
        }
    }

    // var father = document.getElementById('father');
    // getHouDai(father);
    // console.log ( list );

    //遍历整个dom树
    getHouDai(document);
    console.log ( list );
</script>
</body>
</html>
```



# ==02-闭包（js高级中的难点与重点）==



## 1.1-闭包介绍



* **本小节知识点**
  * 1.闭包(closurc)作用：在函数外部访问函数内部变量
    * 闭包`是`一个可以获取其他函数内部变量的`函数`
  * 2.语法
    * a.外部函数内部声明一个闭包函数
    * b.在闭包函数中返回想要访问的局部变量
    * c.外部函数中返回这个闭包函数
  * 3.本质
    * 函数内部与函数外部连接起来的一座桥梁
* **为什么要学习闭包**
  * 1.需求引入：想要在函数外部访问函数内部的变量
  * 2.思考能不能直接获取：不能
    * 原因：函数执行完毕之后局部变量会被系统回收
    * 复习js作用域
      * 全局作用域（全局变量）：函数外面声明的变量，可以在任何地方访问
      * 局部作用域（局部变量）：函数里面声明的变量，只能在函数里面访问
  * 3.继续思考，使用return返回这个变量
    * 无法实现需求
      * 因为每一次调用函数都会重新声明一个新的变量，并不是同一个
  * 4.闭包：可以保证函数内部变量只会声明一次，多次访问都是同一个变量



```javascript
/*复习js变量的作用域
        全局作用域（全局变量）：函数外面声明的变量，可以在任何地方访问
        局部作用域（局部变量）：函数里面声明的变量，只能在函数里面访问
     */

    //需求：在函数外面访问函数内部的变量
   function  fn(  ) {
        var canglaoshi = {
            name:'苍老师'
        };
   };
   //1.函数外部无法直接访问函数内部变量:函数执行完毕之后局部变量会被系统回收
    fn();
   // console.log ( canglaoshi );//程序报错

    //2.解决方案：将变量的值通过return关键字返回
    //弊端：每调用一次函数就会声明一个新的变量，浪费性能
    //return返回值无法实现需求：访问的并不是函数内部的变量，而是会生成新的变量
    function  fn(  ) {
        var canglaoshi = {
            name:'苍老师'
        };
        return canglaoshi;
    }
    var a = fn();
    console.log ( a );
    var b = fn();
    console.log ( b );
    console.log ( a == b );//false   为什么调用两次会得到两个不一样的苍老师？
    //思考：修改了a，b会不会有影响?    不会：因为他们是两个不同的变量（对象）
    a.name = '张三';
    console.log ( a );
    console.log ( b );

    /*3.  闭包closure：闭包是一个可以获取其他函数内部变量的函数
            闭包作用：在函数外部访问函数内部变量
            闭包语法：（1）函数内部声明一个闭包函数  （2）在闭包函数中返回想要访问的局部变量  （3）返回闭包函数
            闭包本质：函数内部与函数外部连接起来的一座桥梁
     */
    function  fn(  ) {
        var canglaoshi = {
            name:'苍老师'
        };
       //声明一个函数
        function closure (  ) {
            return canglaoshi;
        };
        //返回这个函数
        return closure;
    };

    var res = fn();//调用fn会得到一个函数，就是closure函数
    var a = res();//调用bibao函数，得到closure函数的返回值，就是函数内部的变量
    console.log ( a );
    var b = res();//多次调用bibao函数，并没有生成新的变量，返回的还是同一个变量
    console.log ( b );
    console.log ( a == b );//true  说明a与b访问的是同一个变量
    //思考：修改了a，b会不会有影响?    会：因为他们访问的是相同的变量
    a.name = '张三';
    console.log ( a );
    console.log ( b );
```





## 1.2-闭包语法注意点



*本小节知识点*

* 1.复习闭包标准语法
* 2.如果希望访问函数内部变量是同一个，外部函数只能调用一次
* 3.如果外部函数调用多次，则每一次都会重新声明内部变量





```javascript
//1.闭包注意点

    function outer (  ) {
        var num = Math.floor(Math.random() * 100);//0-100随机整数
        function closure (  ) {//1.外部函数内部声明一个函数（闭包函数）
            console.log ( num );
            return num;//2.闭包函数中返回想要访问的局部变量
        };
        return closure;//3.返回这个闭包函数
    };

    //1.1 如果希望访问函数内部变量是同一个，外部函数只能调用一次
    var fn = outer();//调用一次outer，内部变量就会声明一次
    //调用fn三次，只是获取三次num的值，所以是相同的值
    fn ();
    fn ();
    fn ();

    //1.2 如果外部函数调用多次，则每一次都会重新声明内部变量
    outer()();
    outer()();
    outer()();

    //2.投票机示例

    function voter (  ) {
        var num = 10;
        function add (  ) {
            num++;
            console.log ( num );
        };
        return add;
    };
    //2.1 给一台投票机投三票
    var fn = voter();
    fn();//11
    fn();//12
    fn();//13

    //2.2 给三台投票机各投一票
    voter()();//11
    voter()();//11
    voter()();//11

```

* 面试题

```javascript
for (var i =1;i<=3;i++){
        function outer (  ) {
            var num = i;
            function closure (  ) {
                return num;
            };
            return closure;
        };
        console.log ('循环内:' +  outer () () );//会打印什么
    };

    console.log ('循环外' + outer () () )//会打印什么
```



## 1.3-闭包语法练习题



**本小节知识点**

* 练习1：熟悉闭包语法，体会闭包的好处
* 练习2：了解定时器中的代码具有延迟(异步)执行特点
* 练习3：通过分别测试斐波那契`数组求法`,`递归求法`,`闭包求法`，熟悉闭包语法与了解闭包性能
* 练习4：闭包经典面试题。俗话说：如果你能理解下面两段代码的运行结果，应该就算理解闭包的运行机制了。

### 1-点击显示li元素索引

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<ul id="ul1">
    <li>我是第1个li元素</li>
    <li>我是第2个li元素</li>
    <li>我是第3个li元素</li>
    <li>我是第4个li元素</li>
    <li>我是第5个li元素</li>
    <li>我是第6个li元素</li>
</ul>

<script>
    //需求：点击li元素弹出对应索引

    //1.以前做法
    //1.1 获取所有li元素
    var liList = document.getElementsByTagName('li');
    //1.2 遍历li元素数组
    for(var i = 0;i<liList.length;i++){
        //1.3 给每一个li元素添加自定义索引属性
        liList[i].setAttribute('index',i);
        //1.4 给每一个li元素注册点击事件
        liList[i].onclick = function (  ) {
            alert(this.getAttribute('index'));
        }
    };

    //2.使用闭包
    //1.1 获取所有li元素
    var liList = document.getElementsByTagName('li');
    //1.2 遍历li元素数组
    for(var i = 0;i<liList.length;i++){
        //声明外部函数：开辟局部作用域
        function outer (  ) {
            var num = i;//声明局部变量存储本次循环体i
            function closure (  ) {
                alert(num);//闭包获取num值
            };
            return closure;
        }
        // 给每一个li元素注册点击事件
        liList[i].onclick = outer();
    };
</script>
</body>
</html>
```



### 2-循环中的定时器



```javascript
//1.开启三个定时器，隔1s之后，分别打印1 2 3
    setTimeout(function (  ) {
        console.log ( 1 )
    },1000);
    setTimeout(function (  ) {
        console.log ( 2 )
    },1000);
    setTimeout(function (  ) {
        console.log ( 3 )
    },1000);

    //2.相同代码执行三次，可以使用for循环
    //发现问题：三次打印的i的值都是4
    //分析：定时器回调函数中的代码会在一秒之后才执行，而此时for循环已经执行完毕，所以i变成4（类似于事件处理函数）
    for(var i = 1;i<=3;i++){
        setTimeout(function (  ) {
            console.log ( i );
        },1000);
    };

    //3.解决办法：使用闭包来保存循环变量i
    for(var i = 1;i<=3;i++){
        function outer (  ) {
            var num = i;
            function closeure (  ) {
                console.log ( num );
            };
            return closeure;
        };
        setTimeout(outer(),1000);
    };
```



### 3-闭包实现斐波那契数列

* 三种实现方式性能排行
  * 1.使用闭包
  * 2.使用以前的数组方式
  * 3.使用递归函数（性能最低）
* **课后了解：网上有一篇博客详细介绍了斐波那契数列各种算法的性能，经过实际测试，笔者的这种闭包思路性能是最好的（略微高于递推法）**

* 1.数组法

```javascript
//1.以前的做法：将斐波那契数列每一个数字放入数组中
    //弊端：数组中元素越来越多，消耗性能（消耗内存）
    //优点：代码执行次数较少

    console.time();//性能调试
    function fib ( n ) {

        var arr = [1,1];
        for (var i = 2;i<n;i++){
            arr[i] = arr[i-1] + arr[i-2];
        };
        return arr[arr.length-1];
    }
    console.log ( fib()[10] );
    console.timeEnd();
```



* 2.递归法

```javascript
//2.使用递归
    //弊端：代码执行次数太多，产生重复计算（消耗cpu）
    //优点：不需要存储大量数据，节省内存
    console.time();
    function fib ( n ) {
        if (n == 1 || n == 2){
            return 1;
        }else{
            return fib(n-1) + fib(n-2);
        }
    };
    fib(10);
    console.timeEnd();
```

* 3.闭包

```javascript
//3.使用闭包：
    //优点：计算次数少于递归，数组存储元素少于以前做法
    /*核心思路
    * 1.数组中只存储三个元素：前两个元素用于存储前两列数字，第三个元素用于占位，存储最后的结果
    * 2.如何避免数组被重复声明：使用闭包延长数组声明周期
     */
    console.time();
    function fib (  ) {
        var arr = [1,1,0];//最后那个0只是占位的，用于存储最终的结果
        function closure ( n ) {//声明函数的目的是为了延长arr的生命周期
            for (var i = 2;i<n;i++){
                var x = arr[0] + arr[1];//先求出数组中前两个数字的和
                arr[2] = x;//将和放入数组第三个元素中
                //前两个元素前移，节省空间
                arr[0] = arr[1];
                arr[1] = arr[2];

            };
            return arr[2];
        };
        return closure;//返回闭包函数
    };

    //调用fib得到一个closure函数，继续调用closure函数求斐波那契额数列
    console.log ( fib () ( 10 ) );
    console.timeEnd();
```



* 闭包也可以这样写

```javascript
//4.其实上面代码也可以这样写
    function fib (  ) {
        var arr = [1,1,0];//最后那个0只是占位的，用于存储最终的结果
        function closure (  ) {//声明函数的目的是为了延长arr的生命周期
            var x = arr[0] + arr[1];//先求出数组中前两个数字的和
            arr[2] = x;//将和放入数组第三个元素中
            //前两个元素前移，节省空间
            arr[0] = arr[1];
            arr[1] = arr[2];
        };
        //这里我并没有返回这个闭包函数，而是在函数内部使用自己的闭包函数，语法上也是可以的
        //与上面方式一样，声明闭包函数的作用都是为了延长arr的声明周期
        for (var i = 2;i<n;i++){
            closure();
        };
        closure = null;//优点是，可以在算完之后释放闭包内存（略微提升性能，几乎可以忽略不计）
        return arr[2];
    }
```



### 4-闭包经典面试题

```javascript
//1.
    var name = "The Window";
    var object = {
      name: "My Object",
      getNameFunc: function () {
        return function () {
          return this.name;
        };
      }
    };
    //object.getNameFunc()：返回一个匿名函数，在全局作用域中调用该函数，此时相当于是window调用，所以this指向window
    console.log(object.getNameFunc()());//"The Window"

    //2.
    var name = "The Window";
    var object = {
      name: "My Object",
      getNameFunc: function () {
        var that = this;
        return function () {
          return that.name;
        };
      }
    };
    //object.getNameFunc():在getNameFunc函数中，this指向object，使用局部变量that来存储this，所以闭包函数中that指向的是object
    console.log(object.getNameFunc()());// "My Object"
```



## 1.4-闭包应用场景:沙箱模式

*本小节知识点：介绍闭包在以后开发中最常用的一种开发场景-沙箱*

* 沙箱：是js一种设计模式，指的是一种封闭的空间，通常是一个自执行函数
  * 作用
    * a.提供不同的作用域 ：避免全局变量污染
    * b.模块化开发 ：一个可以实现完整功能的独立空间（作用域）



```javascript
//沙箱：是js一种设计模式，指的是一种封闭的空间，通常是一个自执行函数
    /*作用：
        a.提供不同的作用域 ：避免全局变量污染
        b.模块化开发 ：一个可以实现完整功能的独立空间（作用域）
     */
    (function (  ) {
        //自执行函数作用：开辟局部作用域，避免全局变量污染
        var num = 10;
        function fn (  ) {
            console.log ( "哈哈" );
        }
    })();


    //模块化开发：一个局部作用域可以完成一个独立的功能模块
    //沙箱内部如何与外部通讯？ ----使用参数
   (function ( w ) {
        var person = {};
        person.name = '班长';
        person.eat = function (  ) {
            console.log ( "大吉大利，今晚吃鸡" );
        };
        person.play = function (  ) {
            console.log ( "人生如戏，全靠演技" );
        };
        /*为什么这里在调用匿名函数的时候将window作为参数传进来，而不是直接直接window呢？
        a.沙箱是一个独立的空间，如果在沙箱内部访问了全局变量，则会破坏封装性
        b.避免代码压缩的时候导致错误（有些工具会把函数中变量压缩成一个字母，节省空间）
         */
        w.person = person;
    })(window);

    console.log ( person );
```

