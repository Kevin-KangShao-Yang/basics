# 今日学习任务



* [ ] 1.函数的四种调用方式
  * [ ] ==重点掌握this指向的三种情况==
  * [ ] a.普通函数
  * [ ] b.对象方法
  * [ ] c.构造函数
  * [ ] d.上下文模式
* [ ] ==2.函数调用的上下文模式==
  * [ ] a.call()
  * [ ] b.apply()
  * [ ] c.bind()
  * [ ] ==上下文模式经典场景==
* [ ] 3.原型对象补充知识点
  * [ ] a.静态成员与实例成员
  * [ ] b.Object.prototype成员介绍
  * [ ] c.函数对象常用属性
  * [ ] d.给内置构造函数添加自定义方法



# ==01-函数的三种调用方式(this关键字)==

1.复习函数三种调用方式：普通函数 对象方法 构造函数

* 重点：理解this关键字作用：`谁调用这个函数，this指向谁`
* 了解：这三种方式共同点：`this指向无法修改`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>


<script>
    /*1.函数的三种执行方式： 普通函数  对象方法 构造函数
       2.函数中的this关键字：谁调用这个函数,this指向谁
     */
    //1.普通函数
    function fn (  ) {
        console.log ( "呵呵" );
        console.log ( this );
    };
    fn();//相当于window.fn(),所以此时this指向window
    
    //2.对象方法
    var obj = {
        name:'班长',
        sayHi:function (  ) {
            console.log ( "我是班长" );
            console.log ( this );
        }
    };
    obj.sayHi();//this指向obj

    //2.1 混淆点：不要看函数是怎么声明的，要看函数是怎么调用的，谁调用这个函数，this就指向谁
   obj.sayHi = fn;//将fn函数赋值给obj的saiHi属性，此时调用obj.saiHi()就会执行fn中的代码
   obj.sayHi();//this指向obj

    //3.构造函数
    function Person (  ) {
        this.name = '保健坤';
        this.age=38;
    };

    //3.1  如果使用new调用构造函数，根据new关键字作用，this指向new创建出来的那个对象
    var p1 = new Person();//p1是new创建的对象
    console.log ( p1 );
    //3.2  如果没有使用new（此时Person就是一个普通的函数），那么this指向的就是window
    var p2 = Person();
    console.log ( p2 );//undefined  这个函数没有return返回值
    console.log ( window.age );
    console.log ( window.name );

    //4.补充说明：定时器中的this指向window

    setTimeout(function (  ) {
        console.log ( this );
    },1000);
</script>
</body>
</html>
```



# ==02-函数调用的上下文模式==

了解上下文模式注意点

* a.函数上下文三个方法：`call()` `apply()` `bind()`,它们定义在Function构造函数的原型中
* b.如果将this指向修改为值类型:(number,boolean,string)，则函数会自动帮我们包装成对应的引用类型（基本包装类型)
  * 值类型： `'123'`,`1`,`true`
  * 基本包装类型:`String('123')`,`Number(1)`,`Boolean(true)`

## 1.1-函数执行的上下文模式



作用：可以动态修改函数中的this指向

* ```javascript
  call() apply() bind()
  ```

  异同点

  * 相同之处：都可以修改函数中this指向
  * 不同点：传参方式不同
    * call()语法： `函数名.call(this修改后的指向，arg1,arg2…………)`
    * apply()语法：`函数名.apply(this修改之后的指向,伪数组或者数组)`
      * bind()语法：`函数名.bind(this修改后的指向,arg1,arg2....)`
      * **bind()语法并不会立即执行函数，而是返回一个修改指向后的新函数,常用于回调函数**



```javascript
//1.函数三种调用方式（普通函数 对象方法 构造函数）有一个共同特点：this指向无法修改
    //谁调用这个函数，this指向谁
    var obj = {
        name:'张三'
    };
    function fn (  ) {
       // this = obj;//程序报错，this无法被修改
        console.log ( this );
    };
    fn();

    //需求：需要手动修改函数的this指向，如何实现?
    /*2.函数的第四种调用方式：上下文调用
    作用：可以修改函数中this指向
    语法：  call()      apply()   bing()
    */

    //2.1 call()
    //语法：  函数名.call(this修改后的指向，arg1,arg2…………)
    var obj = {
        name:"班长"
    };
    function getSum(a,b){
        console.log(this);
        console.log(a+b);
    }

    getSum(10,20);  //如果直接调用this就是window
    getSum.call(obj,10,20); //如果用上下文call的方式调用,this就是修改之后的obj.

    //2.2 apply();
    //语法: 函数名.apply(this修改之后的指向,伪数组或者数组);
    var obj = {
        name:"文聪兄"
    };
    function getSum(a,b){
        console.log(this);
        console.log(a+b);
    }
    getSum(10,20);//this指向window
    getSum.apply(obj,[10,20]); //就会把数组的元素依次的交给getSum的形参.



    //2.3 bind();
    //语法:  函数名.bind(this修改后的指向,arg1,arg2....);
    var obj = {
        name:"文聪兄"
    };

    function getSum(a,b){
        console.log(this);
        console.log(a+b);
    }

    getSum(10,20);//this指向window
    var fn = getSum.bind(obj); //bind()不会执行这个函数,而是会返回一个修改了this的函数.
    fn(100,200); //此时这个fn,就相当于是修改了this之后的getSum.


    //3 回调函数（例如定时器），一般使用bind来修改this指向
       var obj = {
         name:"班长"
       };
        //3.1  定时器的回调函数是一个具名函数
       function test1(){
         console.log(this);
       }
       var test2 = test1.bind(obj);
       setInterval(test2,2000);
       //3.2 定时器的回调函数是一个匿名函数
       setInterval(function () {
           console.log ( this );
       }.bind(obj),2000);
```



## 1.2-函数调用上下文模式注意点

```javascript
//1.函数上下文三个方法：call()  apply() bind(),它们定义在Function构造函数的原型中
    //也就是说：所有的函数都可以使用上下文模式调用
    console.dir ( Function.prototype );

    //2.如果将this指向修改为值类型(number,boolean,string)，则函数会自动帮我们包装成对应的引用类型（基本包装类型）
    function fn (  ) {
        console.log ( this );
    };

    fn.call(1);//Number(1)
    fn.call(true);//Boolean(true)
    fn.call('1');//String('1');
    //如果修改为undefined与null，程序不会报错，但是修改无效，还是window
    fn.call(undefined);//window
    fn.call(null);//window
    fn.call();//window
    fn.call(window);//window
```



## 1.3-案例01：伪数组转数组

*本小节知识点：伪数组转数组*

* 1.伪数组：只有数组的三要素（元素、下标、长度），没有数组的api
* 2.转数组目的：让伪数组也可以调用数组的api
* 3.方式很多种，掌握任何一种即可



```javascript
//1.伪数组：拥有数组三要素，没有数组的api
    /*伪数组本质其实是一个对象*/
    var weiArr = {
        0:'林黑群',
        1:'林绿群',
        2:'保健坤',
        3:'社会龙哥',
        4:'社会王',
        5:'班长',
        length:6
    };
    console.log ( weiArr[ 0 ] );
    console.log ( weiArr );
    //weiArr.push('黑马李宗盛');//程序报错

    //需求：将伪数组转成真正的数组，目的就是为了可以调用数组的api

   // 1.1 遍历伪数组的每一个元素往真数组arr中添加.
    var arr = [];
    for(var i = 0 ; i < weiArr.length; i++){
        // arr[i] = weiArr[i];
        //这行代码与上面代码作用一样
        arr.push(weiArr[i]);
    }
    console.log(arr);

    //1.2  push.apply
    /*push方法支持添加多个参数：  arr.push(元素1，元素2，元素3…………)*/
    var arr = [];
    arr.push.apply(arr,weiArr);//利用apply上下文第二个参数是一个数组/伪数组，可以简写代码
    console.log(arr);

    //1.3 slice() ： 查找数组元素
    //slice(start,end)：作用查找数组元素,如果传入0则会返回数组自身
    /*a.如果伪数组也可以调用slice方法，就可以返回一个与自身元素一样的真数组*/
    // var newArr = weiArr.slice(0);  //直接调用程序会报错
    /*b.使用上下文call的方式来调用Array原型中的slice方法，将this指向改成伪数组，就好像是真正的数组在调用一样*/
    var newArr = Array.prototype.slice.call(weiArr,0);
    console.log ( newArr );

    //1.4 concat() : 连接数组
    var arr = [];
    //不能直接这样写，会把weiArr当成一个元素连接到数组中
    // arr = arr.concat(weiArr);
    // console.log ( arr );
    arr = arr.concat.apply(arr, weiArr);//将weiArr每一个元素连接到arr中
    console.log ( arr );
```



## 1.4-案例02：伪数组排序

*本小节知识点*

* 通过实现伪数组的排序，更加深入的了解函数的上下文模式调用在实际开发的应用场景

```javascript
var weiArr = {
        0:88,
        1:100,
        2:5,
        3:999,
        4:500,
        length:5
    };

    //伪数组调用数组的sort方法排序
    Array.prototype.sort.call(weiArr,function ( a,b ) {
        return a - b;
    });
    console.log ( weiArr );

    //复习数组排序
    // var arr = [88,100,5,999,500];
    // arr.sort(function (a, b) {
    //     return a-b;
    // });
    // console.log ( arr );
```



## 1.5-案例03：求数组最大值

*本小节知识点*

* 通过apply方式，让数组对象可以调用Math对象的方法
  * 原因：apply方法传参的时候，会自动将数组的每一个元素取出来作为实参

```javascript
//需求：求数组最大值
    var arr = [88,100,5,20,66];

    //1.以前做法：打擂台思想
    var max = -Infinity;
    for(var i = 0 ; i < arr.length; i++){
        if(arr[i] > max){
          max = arr[i];
        }
    }
    console.log(max);

    //2.使用Math.max()
    var max = Math.max ( 88, 100, 5, 20, 66 );
    console.log ( max );

    //3.数组调用Math.max方法
    var max = Math.max.apply(Math,arr);
    console.log ( max );
```



## 1.6-案例04：检测数据类型

* 思考题：为什么数组调用toString和对象调用toString得结果不一样

```javascript

//万能检测数据类型方法：返回值都是字符串
    //原理：调用对象Object的toString方法，修改this执行为真实的需要检测的数据
    console.log ( Object.prototype.toString.call ( null ) );//[object Null]
    console.log ( Object.prototype.toString.call ( undefined ) );//[object Undefined]
    console.log ( Object.prototype.toString.call ( [10,20] ) );//[object Array]
    console.log ( Object.prototype.toString.call ( {name:'老铁'}) );//[object Object]
    console.log ( Object.prototype.toString.call (function (  ) {}) );//[object Function]

    //返回值是一个固定格式字符串：  "[object 数据类型]"
    console.log ( typeof  Object.prototype.toString.call ( null ) );//String

    //这是数组的toString方法，作用与对象的toString方法不一样
    console.log ( [ 10, 20, 30 ].toString () );//'10,20,30'
```



## 1.7-案例05：借用构造函数继承(了解)



```javascript
/*1.借用构造函数继承：用的不多，因为只能继承this.xxx这种属性*/
    //Person构造函数
    function Person(name,age){
        this.name = name;
        this.age = age;
    };

    //Student构造函数
    function Student(name,age,score){
        //这行代码意思：调用Person构造函数，修改Person中的this指向为当前Student这个构造函数中new创建的对象
        Person.call(this,name, age);
        this.age = age;
    };

    //实例化student
    var s1 = new Student('班长',38,99);
    console.log ( s1 );

    var s2 = new  Student('班花',18,88);
    console.log ( s2 );
```





# 03-原型对象补充知识点



## 1.1-静态成员与·实例成员



*本小节知识点:属于概念性知识点*

* 实例成员：属于构造函数实例化对象的成员变量，称之为实例成员
* 静态成员：属于构造函数对象自身的成员变量，称之为静态成员



```javascript
/*构造函数可以实例化对象*/
    function Person ( name ) {
        this.name = name;
        //这个sayHi属性属于构造函数生成的实例化对象的（实例成员）
        this.sayHi = function (  ) {
            console.log ( "你好，我的名字是" + this.name );
        }
    }
    /*构造函数本身也是一个对象*/
    //这个sayHi属性属于构造函数Person对象的（静态成员）
    Person.sayHi = function (  ) {
        console.log ( "我是sayHi" );
    }

    var p1 = new Person('班长');

    p1.sayHi();//实例成员
    Person.sayHi();//静态成员

    //示例
    var arr = [10,20,30];
    arr.push();//实例成员
    console.log ( Math.PI );//静态成员
    console.log ( Object.prototype );//静态成员
    var obj = {};
    console.log ( obj.__proto__ );//实例成员
```



## 1.2-Object.prototype成员介绍

* **本小节知识点**
  * 介绍Object.prototype原型中一些常用属性
    * 原型链最终都会指向Object.prototype,意味着所有的对象都可以访问它的成员变量
    * hasOwnProperty() : 判断对象是否拥有某个成员
    * isPrototypeOf():判断一个对象是否是另一个对象的原型
    * propertyIsEnumerable():判断对象是否可以枚举某个属性
      * 枚举（同时满足两个条件）：（1）属性是对象自己的成员 （2）属性可以使用for-in循环遍历
        * for-in循环可以遍历的属性有哪些？：（1）自己的成员 （2）原型的成员
* **困惑点解答：hasOwnProperty与propertyIsEnumerable看起来好像作用一样**
  * 数组的length属性属于数组对象的成员，但是for-in循环无法枚举
    * 数组.hasOwnProperty('length') = true
    * 数组.propertyIsEnumerable('length') = false

![1559061403932](day03.assets/1559061403932.png)

```javascript
//1.原型链最终都会指向Object.prototype,意味着所有的对象都可以访问它的成员变量

    //2.Object.prototype原型的成员变量有哪些，有什么作用？
    console.log ( Object.prototype );

    //2.1 hasOwnProperty() : 判断对象是否拥有某个成员
    function Person ( name ) {
        this.name = name;
    }
    Person.prototype.sayHi = function (  ) {
        console.log ( "我的名字是" + this.name );
    }
    var p1= new Person('班长');
    p1.sayHi();
    console.log ( p1.hasOwnProperty ( "name" ) );//true
    console.log ( p1.hasOwnProperty ( "girlFriend" ) );//false
    console.log ( p1.hasOwnProperty ( "sayHi" ) );//false  虽然p1可以访问sayHi，但是sayHi并不是p1的成员

    //2.2 isPrototypeOf():判断一个对象是否是另一个对象的原型
    console.log ( Person.prototype.isPrototypeOf ( p1 ) );//true
    var p2 = {name:'张三'};
    var p3 = {name:'李四'};
    //手动修改p2的原型
    p2.__proto__ = p3;
    console.log ( p3.isPrototypeOf ( p2 ) );//true

    //2.3 propertyIsEnumerable():判断对象是否可以枚举某个属性
    //枚举（同时满足两个条件）：（1）属性是对象自己的成员   （2）属性可以使用for-in循环遍历
    function Person ( name ) {
        this.name = name;
    }
    Person.prototype.sayHi = function (  ) {
        console.log ( "我的名字是" + this.name );
    }
    var p1= new Person('班长');
    //for-in循环可以遍历的属性有哪些？：（1）自己的成员  （2）原型的成员
    for (var key in p1){
        console.log ( key );
    }
    console.log ( p1.propertyIsEnumerable ( "name" ) );//true  同时满足条件1和2
    console.log ( p1.propertyIsEnumerable ( "sayHi" ) );//false  不满足条件1

    console.log ( [].hasOwnProperty ( "length" ) );//true
    console.log ( [].propertyIsEnumerable ( "length" ) );//false
```



## 1.3-函数对象常用属性

* **本小节知识点**
  * 函数属于对象，它也会有一些默认属性
  * 1.caller属性:获取调用当前函数的引用(谁调用了我)
    * a.如果函数A中调用了函数B，那么函数B的caller就是函数A
    * b.如果在全局调用函数A,相当于window.fn2(),那么函数A的caller就是null
  * 2.length属性:获取函数形参的个数
  * 3.name属性：获取函数名
  * 4.arguments属性:获取所有实参
* **疑惑点解答：arguments关键字和函数名.arguments是不相等的**
  * [常用]arguments关键字:可以理解为是函数中一个默认的形参，作用是存储所有实参，并且与形参一一对应（修改了arguments，形参也会改）
    * 本质是一个对象（伪数组）
  * [不常用]`函数名.arguments`：可以理解为是函数对象的一个属性，作用是获取所有实参，不与形参一一对应（修改了函数名.arguments，形参不会改）
  * `函数名.arguments == arguments`得到false
* **arguments对象**
  * arguments是一个伪数组（拥有数组三要素，没有数组的api，本质是一个对象），有两个常用属性
    * callee:获取当前函数自身 应用场景：匿名函数递归调用
    * length:实参的个数 length属于数组的三要素之一

```javascript
//1.函数属于对象，它也会有一些默认属性
    function fn (  ) {
        console.log ( "学的好开心~，回忆总想哭" );
    }

    console.log ( fn );//log只是打印函数体，不是打印函数对象
    console.dir ( fn );//dir 打印函数对象

    //2.常用属性

    //2.1 caller属性:获取调用当前函数的引用(谁调用了我)，如果是window调用则返回null

    //a.如果函数A中调用了函数B，那么函数B的caller就是函数A
    function fn1 (  ) {
        console.log ( "我是函数fn1" );
        fn2();
    }
    //b. 如果在全局调用函数A,相当于window.fn2(),那么函数A的caller就是null
    function fn2 (  ) {
        console.log ( "我是函数fn2" );
        console.log ( fn2.caller + '谁调用了我');
    }

    fn1();//fn1函数体中调用了fn2，所以此时fn2.caller就是函数fn1
    fn2();//这行代码相等价于window.fn2(),所以此时fn2.caller就是null

    //2.2 length:获取函数形参的个数
    function test1 (a,b,c,d,e  ) {
        console.log ( a + b );
        console.log ( test1.length );//5
    }
    console.log ( test1.length );//5
    test1(10,20);

    //2.3 name：获取函数名
    function test2 (  ) {
        console.log ( test2.name );//test2
    }
    test2();
    var  test3 = function () {
      console.log(test3.name);//test3
    }
    test3()

    //2.4 arguments:获取所有实参
    function test4 (a  ) {
        console.log ( arguments );
        console.log ( test4.arguments );
        /*arguments关键字:[开发中常用]存储所有实参，并且与形参一一对应（形参会改）
        函数名.arguments属性：开发中不常用，获取所有实参，不与形参一一对应（形参不会改）
        区别： 两者虽然存储的数据都是一样，但他们是两个不同的东西，所以不相等
         */
        console.log ( test4.arguments == arguments );//false
        console.log ( a );
    }
    test4(100,200);

    //3.arguments对象
    function test5 (  ) {
        //arguments是一个伪数组（拥有数组三要素，没有数组的api，本质是一个对象）
        console.log ( arguments );
        //arguments有两个属性
        //callee:获取当前函数自身    应用场景：匿名函数递归调用
        console.log ( arguments.callee );
        //length:实参的个数     length属于数组的三要素之一
        console.log ( arguments.length );
    }

    test5(10,20,30);

    //4.递归：函数自己调用自己
    //目前了解语法即可，后面会讲解递归函数的使用场景
    // (function () {
    //     arguments.callee(); //在函数内部通过arguments.callee来调用函数自己.
    // }());
```



## 1.4-给内置构造函数原型添加方法



* 1.给内置构造函数添加方法
  * 应用场景：内置构造函数方法不够用，我想添加一些自定义方法
    * 例如：给Array构造函数原型添加求最大值方法，那么所有数组都可以使用
* 2.如何安全的给内置构造函数原型添加方法
  * 给内置构造函数添加方法弊端：在多人开发中，如果每个人都修改了内置构造函数的原型，则会造成潜在bug（属性名一致导致覆盖的问题）与资源浪费（你写的别人用不上，别人写的你用不上）
  * 解决方案：使用替换原型继承(自定义构造函数，将原型指向内置对象)



```javascript
//1.数组实例对象都是Array构造函数生成
    //这意味着，Array.prototype中的成员每一个数组都可以访问
    var arr1 = [100,88,90,20,66];
    var arr2 = [-5,-10,20,50,88];
    console.log ( arr1.__proto__ === arr2.__proto__ );//true
    console.log ( arr1.__proto__ === Array.prototype );//true
    console.log ( Array.prototype );

    //2.内置Array构造函数方法不够用，我想添加一些自定义方法

    //2.1 添加冒泡
    Array.prototype.mySort = function (  ) {
        //this:调用这个方法的具体数组（谁调这个方法，this就是谁）
        for(var i = 0;i<this.length-1;i++){
                for(var j = 0;j<this.length-1-i;j++){
                    if (this[j]>this[j+1]){
                        var temp = this[j];
                        this[j] = this[j+1];
                        this[j+1] = temp;
                    }
                }
            }
        return this;
    }
    console.log ( arr1.mySort () );//[20, 66, 88, 90, 100]
    console.log ( arr2.mySort () );//[-10, -5, 20, 50, 88]

    //2.2 添加求最大值
    Array.prototype.myMax = function (  ) {
        //打擂台思想
        var max = -Infinity;
        for(var i = 0;i<this.length;i++){
            if (this[i] > max){
                max = this[i];
            }
        }
        return max;
    };
    console.log ( arr1.myMax () );//100
    console.log ( arr2.myMax () );//88
```



* ## 如何安全的给内置构造函数原型添加方法

```javascript
/*1.给内置构造函数原型添加方法弊端
        a.存在潜在bug ： 多人开发中，每个人都给内置构造函数原型添加方法，就有可能导致变量名一致，产生覆盖的情况
        b.资源浪费：你加的方法别人用不上，别人加的方法你用不上
     */

    //程序员A
    Array.prototype.sayHi = function () {
      console.log("哈哈,很帅");
    }
    //程序员B
    Array.prototype.sayHi = function () {
      console.log("你帅nm啊...");
    }
    //程序员A
    var arr = [10,20,30];
    arr.sayHi();

    /*2.解决方案：使用替换原型继承(自定义构造函数，将原型指向内置对象)
     */

    function MyArr (  ) {
        this.sayHi = function  (  ) {
            console.log ( "学习使我感到快乐" );
        };
    };

     /*这里为什么是空数组而不是Array.prototype呢？
    Array.prototype：对象类型赋值的时候拷贝的是地址，修改了MyArr的原型之后，Array.prototype也会修改
    []：由于空数组的原型会指向Array.prototype，根据原型链中成员访问规则，MyArr实例对象可以访问数组成员的成员
        并且，修改MyArr的原型对象，本质上是修改这个空数组，不会对Array.protpotype造成影响
     */
    MyArr.prototype = [];//此时MyArr的原型拥有数组对象所有的方法

    var arr = new MyArr();
    arr.push(10,20,30);
    arr.sayHi();
    console.log ( arr );
```





# 04-第三天学习总结

1.函数的四种执行模式

* 前三种：共同特点，this指向无法修改

  * 普通函数
  * 构造函数
  * 对象方法

* 上下文模式：可以动态修改函数中的this指向

  * call():`函数名.call(this修改后的指向，arg1,arg2…………)`

  * apply():`函数名.apply(this修改之后的指向,伪数组或者数组);`

  * bind():

    ```
    函数名.bind(this修改后的指向,arg1,arg2....);
    ```

    * bind不会立即指向函数，而是会生成一个修改指向后的新函数，常用于回调函数

  * 注意点：如果将this指向为基本数据类型（值），则系统会自动帮我们转为对应的基本包装类型（对象）

2.其他知识点补充

* a.静态成员与实例成员
  * 静态成员：属于构造函数对象自身的成员
    * 例如：`Math.PI`
  * 实例成员：属于构造函数实例出来的对象的成员
    * 例如：`[10].push(20)`
* b.instanceof运算符
  * 语法：`对象 instanceof 构造函数`
  * 作用：检测构造函数的原型prototype在不在这个对象的原型链上
    * Function原型链 Function对象->Function.prototype->Object.prototype->null
    * Object原型链 Object对象->Function.prototype->Object.prototype->null
* c.Object.prototype原型的成员变量
  * hasOwnProperty() : 判断对象是否拥有某个成员
  * isPrototypeOf():判断一个对象是否是另一个对象的原型
  * propertyIsEnumerable():判断对象是否可以枚举某个属性
    * 枚举（同时满足两个条件）：（1）属性是对象自己的成员 （2）属性可以使用for-in循环遍历
    * for-in循环可以遍历的属性有哪些？：（1）自己的成员 （2）原型的成员
* d.函数对象常用属性
  * caller属性:获取调用当前函数的引用(谁调用了我)，如果是window调用则返回null
  * length:获取函数形参的个数
  * name：获取函数名
  * arguments:获取所有实参
    * callee:获取当前函数自身
      * 应用场景：匿名函数递归调用
    * length:实参的个数
      * length属于数组的三要素之一
* e.给内置构造函数原型添加方法
  * 1.自定义构造函数
  * 2.将自定义构造函数指向内置对象