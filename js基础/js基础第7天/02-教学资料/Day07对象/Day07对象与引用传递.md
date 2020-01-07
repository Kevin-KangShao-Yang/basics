> 第02阶段.前端基本功.前端基础.进阶语法  - from：JamesZou

# 对象与面向对象

## 学习目标
* 理解
  * 对象与对象实例的关系
  * 扩展对象实例的属性和方法
  * 值类型和引用类型内存分配和传参
  * 对象字面量
  * new 和 this 关键字
* 应用
  * 能编写对象版仓储系统
  * 常见系统对象使用

## 一.核心内容

## 1. 对象

### 1.1 为什么要有对象？

+ **使用类似 键值对 方式 封装数据和方法**

> (1. 要记录一个人的信息（姓名、年龄、性别），传统情况需要 定义无关联的3个变量，如下：

```js
var usrName = '小白';
var usrAge = 21;
var usrSex = true;

function sayHi(){
    console.log('我的名字叫：'+ usrName + '，年龄：'+ usrAge + '，性别：'+ usrSex);
}
```

> (2. 问题：能否把这些变量包到一起，方便访问和传输呢？
>         回答：有，数组，因为数组有很多空间，可以保存很多数据。

```` js
var arrStu01 = ['小白',21,true,function(){....}];
alert(arrStu01[0]);
alert(arrStu01[1]);
````

![1553660047060](assets/1553660047060.png)

> **(3. 问题** 又来了，数组可以一起保存很多数据，但只能通过下标访问。
> 		  用的时候还需要记住 下标 与 值 的对应关系，到底是学员姓名 还是 年龄 ..... 太不方便了。
>
> 思考：能不能直接用什么东西 把 这些相关的 变量 和 方法 都连同名称一起 “打包” 使用呢？
> 		如下图： 这样就可以通过 这个 "包" 来统一访问 里面的 变量和方法了

![1553657368376](assets/1553657368376.png)

### 1.2 对象语法

#### 1.2 1 对象初体验

+ **对象** 可以用来将相关的 **变量 和 方法** “打包” 起来 ，方便使用。

```js
// 1.创建 一个 名为 stuObj 的 "盒子"
var stuObj = {
    // 2.设置成员：把 usrName、usrAge、usrSex、sayHi 存入 stuObj "盒子"，同时各自赋值
    usrName : '小白',
    usrAge : 21,
    usrSex : true,
    sayHi : function (){
        console.log('Hi,大家好啊~~！');
    }
};

// 3.调用 stuObj "包裹" 里的 usrName 和 sayHi 
console.log( stuObj.usrName ); // 小白
stuObj.sayHi(); //Hi,大家好啊~~！
```

> **PS：在以后的项目中，会大量使用到对象来封装方法和数据。**
>
> 函数：是用来 封装业务代码
>
> 对象：用来封装 业务相关 的函数 和 变量 ！



#### 1.2.2 什么是对象？

![1553671097024](assets/1553671097024.png)

+ **通俗：对象** 与 `变量 、函数` 一样 都可以看做是一个盒子，只不过 `对象类型的盒子`里 装的是 **变量和函数**
  + 注意：变量  内部都是直接 存放值 `var a = 1;`，而 对象 里放的是 变量!
+ **概念：**对象是一种 用来封装 属性 和 方法 的数据类型

#### 1.2.3 创建对象

+ **new 关键字**
  + 用来创建一个对象（相当于创建一个空盒子）

![1553661381542](assets/1553661381542.png)

+ **对象初体验图解**

  ![对象内存分配图](assets/1522649340621.png)

  + stuObj 是一个变量（栈空间中）

  + new Object() 创建了一个 Object 类型对象的实例（堆空间中）

  + 为 stuObj 对象 添加了 4个属性，给了不同类型的值（堆空间中）

  + stuObj变量中 直接保存的 是 对象在堆空间的地址

  + 对比一下 数组的内存图，明显看出，数组里只有值，对象中 有 **变量名** 和 **变量值**

    + 我们把 对象中的 变量名 叫做 **属性**，变量值 叫做 **属性值**

    ![1553660047060](assets/1553660047060.png)



#### 1.2.4 对象的属性

```js
var oPer = new Object();
oPer.name = 'james';
oPer.sayHi = function(){
    alert('Hi~~');
}
```



![1521769961000](assets/1521769961000.png)

+ **对象的属性**

  - 也叫 **对象的成员**，说白了 就是存在对象里的 **变量**
  - 由 **属性名** 和 **属性值** 组成 

+ **对象的方法**

  + 对象中保存的函数，都统一称为 该对象的方法
  + 对象的方法其实 也是对象的 一个属性，只不过属性值 为 方法
  + 上图中的 sayHi 叫做 oPer 的方法

  

#### 1.2.5 新增和访问属性

+ 动态为 对象 添加 属性 和 方法

  + 为对象实例 `动态添加属性` ，并 `访问`

  ![1521770557106](assets/1521770557106.png)

  + 为对象实例 `动态添加方法` ，并`调用`

  ![1521771865636](assets/1521771865636.png)

+ 访问不存在的 属性

  + 如果强行调用对象中不存在的属性，则会获得 `undefined`

```js
var obj = new Object();
obj.usrName = 'james';
console.log(obj.usrName); // james
console.log(obj.usrAge); // undefined
console.log(obj);
```


> **课堂案例** 
> 要求：定义一个Object对象实例，用来保存 姓名、年龄 和 sayHi 方法

```js
//创建一个 Object对象 的实例 oPer
var oPer = new Object();
//为 oPer 动态添加 2个属性 和 1个方法
oPer.uName = '小爱';
oPer.uAge = 27;
oPer.sayHi = function(){
    console.log('大家好啊~~~今天天气不错嘛~');
}
//调用 oPer 对象实例 的 属性 和 方法
console.log(oPer.uName);
oPer.sayHi();
```



#### 1.2.6 修改属性值

+ 如果对象中的某个属性已经存在，可以像变量一样多次赋值

```js
var obj = new Object();
obj.usrName = 'james';
obj.usrName = 'linda'; // usrName 中的 james 值 被换成 linda
alert(obj.usrName); // linda
```



#### 1.2.7 删除属性 delete

+ 如果只是将属性值 设置为 undefined 或 null，都不能删除这个属性

```js
var obj = new Object();
obj.usrName = 'james';
obj.usrAge = 18;
obj.usrName = undefined;
console.log(obj); // 打印整个 obj， usrName 属性依然存在，值为 undefined
```

+ 使用 delete 关键字 可以删除对象中的属性

```js
var obj = new Object();
obj.usrName = 'james';
obj.usrAge = 18;
delete obj.usrName; // 删除属性 usrName
console.log(obj); // 打印整个 obj，只剩下 usrAge ，不再包含 usrName
```



### 1.3 对象语法补充

#### 1.3.1 属性的本质

+ **属性** 相当于 "变量"，只不过 `属性` 属于 某个 `对象实例`，属性值可以是不同类型的数据或对象
  + **方法** 也是 `对象实例` 的一个 `属性`，只不过这个 `属性` 里保存的 `值` 是一个 `方法`

+ 属性 也可以是一个 **对象**

```js
var obj = new Object();
obj.usrName = 'james';
obj.usrAge = 18;

obj.usrDog = new Object(); // 将一个对象设置给属性
obj.usrDog.dogName = 'ruikey';
obj.usrDog.dogAge = 1;
```

![1553828832147](assets/1553828832147.png)

#### 1.3.2 对象中括号访问法

+ JS可以通过 `[ ]` 完成 `.`  一样的属性操作

+ 语法： **对象名['成员名']**   相当于  **对象.成员名**

+ 添加 和 访问 属性

  ```js
  var obj = new Object();
  obj['usrName'] = 'james';
  console.log(obj['usrName']); // 访问 obj对象 的 usrName 属性
  ```

+ 添加 和 调用 方法

  ```js
  var obj = new Object();
  obj['usrName'] = 'james';
  obj['sayHi'] = function(){
      console.log('hi~~ everyone ~~!');
  }
  console.log(obj['usrName']); // 打印 obj对象 的 usrName 属性
  obj['sayHi'](); // 调用 obj对象 的 sayHi 方法
  ```

> **思考：**通过 [] 来操作属性方法 有什么好处吗？-- 可以根据运行时的情况 决定访问 对象的某个属性方法。
>
> **课堂案例：**请创建 包含 姓名 、年龄、性别 三个属性的对象，并接收用户输入的属性名 来显示 对应的属性值

```js
var obj = new Object();
obj.usrName = 'james';
obj.usrAge = 18;
obj.usrGender = true;

var proKey = prompt('请输入您要查看的属性名称：(usrName/usrAge/usrGender)');
var proValue = obj[proKey]; // 注意：此处 获取属性值时，是通过 用户的输入 来完成
alert('您想要查看的属性【'+proKey+'】= ' + proValue);

// 问题：如果输入一个 不存在 的 属性名呢？
```

#### 1.3.3 关键字 in

+ in 关键字：可以判断对象中是否包含某一个属性

+ 语法： `var res = usrKey in 对象;  `

  + in 右边必须是一个对象

  + 返回 一个 bool 值，表示 usrKey 是否存在于 对象中

  + 注意：哪怕属性值是undefined，in检查都会返回 true

    ​            如果用 delete 删除了属性，in检查时会返回 false

```js
var obj = new Object();
obj.usrName = 'james';
obj.usrAge = 18;
obj.usrGender = true;

console.log('usrName' in obj); // true
console.log('usrHi' in obj); // false
```

> **课堂案例：** 优化上题，如果用户输入的属性名 在对象中不存在 ，需要给出明确提示。

```js
var obj = new Object();
obj.usrName = 'james';
obj.usrAge = 18;
obj.usrGender = true;

var proKey = prompt('请输入您要查看的属性名称：(usrName/usrAge/usrGender)');

// 判断 对象中是否存在 这个属性
if (proKey in obj) { 
    var proValue = obj[proKey];
    alert('您想要查看的属性【' + proKey + '】= ' + proValue);
}else{
    alert('您想要查看的属性【' + proKey + '】不存在~~');
}
```



> **课堂案例：**统计数组 arr 中元素出现的次数，并打印出结果
>
> 思路:  用 对象 的 key 和 value 来统计 字母出现的次数
>
> (1. 准备一个对象来保存 字母 和 字母出现的次数
> (2. 遍历数组
> 	(2.1 如果  对象中不存在 与 数组中的字母同名的属性 ,则为对象 添加属性, 初始化值为 1 
> 	(2.2 如果  对象中已存在 与 数组中的字母同名的属性，则让该属性值 + 1

 ![1553825020186](assets/1553825020186.png)

```js
var arr = ['a', 'b', 'c', 'a', 'b', 'c', 'a', 'x', 'z']; // 需要统计的数组
var obj = {}; // 创建 统计字母次数的 对象
// 遍历数组中的字母
for (var i = 0; i < arr.length; i++) {
    var charKey = arr[i];
    // 判断 字母 是否为对象的一个属性名
    if (charKey in obj) {
        // 存在, 让值 + 1
        obj[charKey]++; // obj.a = obj.a + 1
    }
    else {
        // 不存在
        obj[charKey] = 1; // obj.a = 1
    }
}
console.log(obj);
```



#### 1.3.4 遍历对象属性 for in

> 思考：遍历数组里的每个元素 可以通过 for 循环，那如果想 遍历 对象里所有的属性呢？

+ 回顾 访问对象属性 的方式： `.` 和 `[ ]`
  + 因为对象只能通过 属性名 方式来访问属性值，那怎么才能获取对象中所有的属性名呢？
+ for-in 循环：for( var key in 对象名){ }
  + for-in 循环遍历所有的 属性名

```js
var obj = new Object();
obj.usrName = 'james';
obj.usrAge = 18;
obj.usrGender = true;
// 遍历 obj对象 中所有的 属性名
// for(var i = 0;i < arr.length; i ++){  }

for(var key in obj){ // 循环取出 obj 对象中的 属性名 -> 相当于 var key = 'usrGender';
    console.log(key + ' = ' + obj[key]); // 相当于：usrName = obj.usrName;
}
```

### 1.4 小结

+ 添加到 对象里的 函数 也叫做 对象的 方法

![1553962767484](assets/1553962767484.png)

## 2. 对象字面量

> 使用 new 关键字，然后一个个添加属性和方法，感觉是不是很麻烦？而且代码还冗余。

+ **对象字面值：**是封闭在花括号对 `{}` 中的一个对象的0个或多个 `键:值` 无序列表
+ **键：**相当于属性名
+ **值：**相当于属性值，可以是任意类型的值（数值类型、字符串类型、布尔类型、函数类型）
+ **对象字面量 语法**
  1. 将对象包装在大括号中； 
  2. 对象中以逗号分隔键值对； 
  3. 用冒号分隔属性名和属性值； 
  4. 不要忘记最后大括号后的分号。

### 2.1 用字面量创建对象

```js
var stuObj = {
    usrName : 'james',
	usrAge : 18,
	usrGender : true,
    sayHi : function(){
        console.log('Hi,大家好啊~~！我是 ' + stuObj.usrName + ',年龄 '+ stuObj.usrAge);
    }
};
```

+ 补充：根据网上一些开发者的测试，字面量 创建 对象 的 效率 要高于 new 对象方式

### 2.2 用字面量初始化对象

```js
var stuObj = new Object({ usrName : 'james' , usrAge : 18 , usrGender : true });
```



## 3. 对象方法中的this

> **思考：**如果将 stuObj 改为 stu01，会发生什么问题

```js
var stuObj = {
    usrName : 'james',
	usrAge : 18,
    sayHi : function(){
        console.log('Hi,大家好啊~~！我是 ' + stuObj.usrName + ',年龄 '+ stuObj.usrAge);
    }
};
//调用
stuObj.sayHi(); // Hi,大家好啊~~！我是 小白 ,年龄 21
```

+ 会发生的问题：一旦把 stuObj 修改为 stuObj2，那么 sayHi 方法里的 stuObj 就访问不到了

![1553741447640](assets/1553741447640.png)

+ **this**
  + 通俗：this 就是代表当前对象
  + **本质：this** 就是方法内部的一个 "变量"，用来保存方法调用时所属 对象 的 内存地址
  + 简单的说：调用时哪个对象实例 `.` 出方法，那这个方法里的 `this` 就是哪个对象实例。

```js
var stuObj = {
    usrName : 'james',
	usrAge : 18,
    sayHi : function(){
        // 方法中的 this 代表 调用时所在的对象
        console.log('Hi,大家好啊~~！我是 ' + this.usrName + ',年龄 '+ this.usrAge);
    }
};
//调用 stuObj 的 sayHi()方法，所以 sayHi 里的 this 就是 stuObj
stuObj.sayHi(); // Hi,大家好啊~~！我是 小白 ,年龄 21
```

   + ==**口诀：**谁调用，就是谁。谁调用方法，那么方法里的 this 就是谁！==
   + ==谁 点 出方法，方法里的 this 就是谁==

> **思考：** 如果创建两个 实例 分别保存两个 人的信息，但想共用同一个 sayHi 方法呢？

```js
var commonSayHi = function (){ 
    alert('大家好啊~我的名字叫：' + this.usrName + '，年龄：'+ this.usrAge);
}

var oPer1 = {
    usrName : '波老师',
	usrAge : 25,
    sayHi : commonSayHi // 把 commonSayHi 方法 传给 oPer1 实例 的 sayHi 属性
}

var oPer2 = {
    usrName : '苍老师',
	usrAge : 28,
    sayHi : commonSayHi // 把 commonSayHi 方法 传给 oPer2 实例 的 sayHi 属性
}

oPer1.sayHi();
oPer2.sayHi();
```

> **课堂案例：**
> 要求：为数组添加一个 获取 数组中 最大数值 的方法，并调用。

```js
// 1.创建一个数组对象实例（使用的是 数组字面量 表示法）
var arr = [2,1,5,8,10];
// 2.为数组实例 添加一个 getMax 方法
arr.getMax = function() {
    var maxNum = -Infinity; // 初始值为 负无穷大（最小值）
    for(var i = 0;i < this.length;i++){
        // 方法中的 this 就是数组实例 arr
        if(this[i] > maxNum){
            maxNum = this[i];
        }
    }
    return maxNum;
}
alert(arr.getMax()); // 10
```



> **课堂案例：**
> 要求：用数组对象实例保存 2位学员信息（姓名，年龄，性别），并提供 展示方法

+ 题目思路分解：

![1521621341071](assets/1521621341071.png)

```js
//1.创建学员数组对象实例，用来保存学员实例（数组对象字面量）
var arrStus = [];

//1.1.创建第01个学员对象实例（Object对象字面量）
var stu01 = {
  name:'小白',
  age:28,
  sex:true,
  getInfo:function(){
    return '我的名字叫：'+this.name + '，年龄：'+ this.age + '，性别：' + this.sex;
  }
};
//1.2.创建第02个学员对象实例（Object对象字面量）
var stu02 = {
  name:'小爱',
  age:24,
  sex:false,
  getInfo:function(){
    return '我的名字叫：'+this.name + '，年龄：'+ this.age + '，性别：' + this.sex;
  }
}

//1.3.将两个学员对象实例 存入 数组
arrStus.push(stu01);
arrStus.push(stu02);

//2.为学员数组对象实例 扩展一个 方法，用来显示所有学员信息
arrStus.sayHiAll = function () {
  var strAll = '';
  //2.1 循环 这个数组 里所有的元素（此处的 this 就是数组实例 arrStus）
  for(var i = 0; i < this.length;i++){
    strAll += this[i].getInfo()+ '\r'; // 调用每个学员getInfo()方法，获取学员信息，并追加 换行符
  }
  alert(strAll);
};

//3.调用sayHiAll()方法显示数组实例中所有学员的信息
arrStus.sayHiAll();
```

## 4.工厂函数 创建 对象

> 上面的 案例 我们创建了 2个 学员对象实例，但如果要创建5个呢？

+ 可以用函数将 new 对象和添加成员的过程 封装起来
  + 创建 **工厂函数** 封装创建 学员对象实例 的代码，如下：

```js
// 工厂函数：创建 学员信息对象
function createStuInfo(stuName,stuAge,stuSex){
    //1.创建 1个 对象实例
    var obj = {
        name:stuName,
        age:stuAge,
        sex:stuSex,
        getInfo:function(){
            return '我的名字叫：'+this.name + '，年龄：'+ this.age + '，性别：' + this.sex;
        }
    };
    //2.返回这个 对象实例
    return obj;
}

// 通过 createStuInfo() 方法，可以把 创建学员对象实例 并 扩展属性方法 的代码 轻松复用起来！
var stu01 = createStuInfo('小白',28,true);
var stu02 = createStuInfo('小爱',25,false);
var stu03 = createStuInfo('酷飞',25,true);
var stu04 = createStuInfo('乐迪',29,true);
var stu05 = createStuInfo('妞妞',21,false);
```

+ ==当需要批量创建对象时，使用 工厂方法 更高效==

## 5. 构造函数 创建 对象

### 5.1 Object 是什么

#### 5.1.1 Object 是函数

>  **思考：**new Object() 中的 Object 到底是个啥？

```js
function Person(){

}
console.log(Person);
console.log(Object);
```

+ 第 4 行 `console.log(Person);` 打印出来的 Person 是一个 **函数**，如图：

![1553765467187](assets/1553765467187.png)

+ 第 5 行 `console.log( Object );` 打印出来的 Object 也是一个 **函数**，如图：

  ![1553765634360](assets/1553765634360.png)

+ **由此我们可以看出，Object 其实也是一个函数！**

#### 5.1.2 new 创建对象

> 思考：那 new Object() 是啥意思呢？我们来通过 new Person() 对比体会一下

```js
/* Object函数 由 JS 已经定义好了
function Object(){
    
}*/

function Person(){

}

var obj = new Object();
var p01 = new Person();

console.log(obj);
console.log(p01);
```

+ 结果如图：

![1553766014278](assets/1553766014278.png)

+ **通过打印的结果我们可以看出， obj 和 p01 都是 一对 `{ }`，也就是说，都是 对象**

  + `new Object()` 创建一个 **Object 对象**
  + `new Person()` 创建一个 **Person 对象**

  

#### 5.1.3 小结

+ Object 也是一个函数
+ 通过 new 关键字 可以创建一个 与函数类型 相同的 对象
  + new Object() 会创建一个 Object对象
  + new Person() 会创建一个 Person对象
  + new Array() 会创建一个 Array对象



### 5.2 构造函数是什么

#### 5.2.1 new 关键字研究

```js
// 代码片段 1
function Person(){
    alert('我梦见自己是高帅富~~~');
}
var obj = new Person();
console.log(obj);
```

+ `new Person()` 执行结果如图：

![1553787797094](assets/1553787797094.png)

+ **结论1：** new 关键字作用

  + 1.创建对象

  + 2.执行了 Person函数 中所有代码

    ​    2.1 显示消息框



```js
// 代码片段 2
function Person(){
    alert('我梦见自己是高帅富~~~');
    this.usrName = 'jameszou';
}
var obj = new Person();
```

+ `new Person()` 执行结果如图：

![1553788256201](assets/1553788256201.png)

+ **结论2：** new关键字作用

  + 1.创建对象

  + 2.执行了 Person函数 中所有代码

    ​    2.1 将对象设置给 Person函数 里的 this 

    ​    2.2 显示 消息框

    ​    2.3 为 this 指向的对象 添加了一个 usrName 属性

![1553844435929](assets/1553844435929.png)

+ **new 关键字做了4件事情：**

  + 创建对象
  + 将对象 传给 构造函数 内部的 this
  + 执行 new 后面的函数
  + 返回对象的地址

  

#### 5.2.2 构造函数创建对象

+ 什么是构造函数？
  + 构造，就是初始化的意思
  + 构造函数，是指 结合 **new** 创建对象 并 初始化对象里各种属性的 函数
  + 在 new 对象时，跟在 new 后面的函数 就叫 **构造函数**
+ **语法：**
  + 声明语法与普通函数一样
  + 构造函数 的 函数名 首字母大写
  + 构造函数 内部 不使用 return 关键字

```js
function Person(){
    this.usrName = 'james';
    this.usrAge = 25;
}
```



+ 回顾 工厂函数 创建 对象 的方法
  + 思考1：createStuInfo 方法中 通过 { } 方式 等同于 new Object() 创建了对象，并设置了3个属性1个方法 

```js
// 工厂函数：创建 学员信息对象
function createStuInfo(stuName,stuAge,stuSex){
    //1.创建 1个 对象实例
    var obj = {
        name:stuName,
        age:stuAge,
        sex:stuSex,
        getInfo:function(){
            return '我的名字叫：'+this.name + '，年龄：'+ this.age + '，性别：' + this.sex;
        }
    };
    //2.返回这个 对象实例
    return obj;
}

// 通过 createStuInfo() 方法，可以把 创建学员对象实例 并 扩展属性方法 的代码 轻松复用起来！
var stu01 = createStuInfo('小白',28,true);
var stu02 = createStuInfo('小爱',25,false);
```

+ 代码重构：使用 构造函数 替代 工厂方法

```js
// 工厂函数：创建 学员信息对象
function StuInfo(stuName,stuAge,stuSex){
    this.name=stuName;
    this.age=stuAge;
    this.sex=stuSex;
    this.getInfo=function(){
        return '我的名字叫：'+this.name + '，年龄：'+ this.age + '，性别：' + this.sex;
    };
}

// 通过 new StuInfo() 构造函数，可以把 创建学员对象实例 并 扩展属性方法 的代码 轻松复用起来！
var stu01 = new StuInfo('小白',28,true);
var stu02 = new StuInfo('小爱',25,false);
```



### 5.3 prototype 原型

> 思考：通过 构造函数 批量创建 对象，每个对象中的方法代码都是一模一样的，有没有必要呢？

+ 构造函数中 为对象 添加的方法 是独立的，浪费！

```js
var isSame = stu01.getInfo === stu02.getInfo;
console.log(isSame); // false 
```

+ prototype ：函数 本身的一个特殊属性
  + 构造函数的 prototype 被 这个 构造函数 new 的 所有对象所 **共享**



```js
// 工厂函数：创建 学员信息对象
function StuInfo(stuName,stuAge,stuSex){
    this.name=stuName;
    this.age=stuAge;
    this.sex=stuSex;
}
// 在 StuInfo 的 原型对象 上添加 共享的 方法
StuInfo.prototype.getInfo=function(){
    return '我的名字叫：'+this.name + '，年龄：'+ this.age + '，性别：' + this.sex;
};

// 通过 new StuInfo() 构造函数，可以把 创建学员对象实例 并 扩展属性方法 的代码 轻松复用起来！
var stu01 = new StuInfo('小白',28,true);
var stu02 = new StuInfo('小爱',25,false);

var isSame = stu01.getInfo === stu02.getInfo;
console.log(isSame); // true 
```



### 5.3 小结 对象的创建方式

![1553847344199](assets/1553847344199.png)

+ 使用 构造函数 替代 工厂方法 创建对象
  + new 关键字做了 4个事情：
    + 创建一个 对象 -> 在堆空间
    + 将对象 地址 赋给了 构造函数中的 this
    + 执行 构造函数 代码
    + 返回 对象 地址
+ 构造函数 与 普通函数 区别
  + 构造函数首字母 大写，普通函数首字母小写
  + 构造函数 一般不 return值，而是通过 new 关键字 获取 对象的地址
+ 函数的 prototype 原型属性，可以让 同一个构造函数的 不同对象 共享数据和方法

## 6. 值类型和引用类型

+ 数据类型： 简单数据类型（值类型） 和 复杂数据类型（引用数据类型）

### 6.1 值类型 和引用类型内存图解

#### 6.1.1 值类型

- 值类型（也叫 简单数据类型）： string ，number，boolean，undefined，null
- 值类型变量 的 数据 直接存放在变量（栈空间）中，如图：

![1521539340240](assets/1521539340240.png)

#### 6.1.2 引用类型

- 引用类型（也叫 复杂数据类型）：通过 new 关键字创建的对象（系统对象、自定义对象）
- 引用类型变量（栈空间）里存放的是地址，真正的 **对象实例** 存放在堆空间中，如图：

![1521539508988](assets/1521539508988.png)

> 执行代码时，new 的对象实例 被创建在堆空间中，堆地址通过 = 号 赋值到变量 usrObj 的栈空间中。

- 我们通过变量 usrObj 访问 Object对象实例 里的内容时，实际是通过 栈空间里存放的堆地址来找到对象实例，再调用对象实例里的成员。

- 注意：JavaScript中没有堆和栈的概念，此处我们用堆和栈来讲解，目的方便理解和方便以后的学习。



### 6.2 值类型和引用类型 传参

#### 6.2.1 值类型传参

> 思考以下代码结果：

```js
function changeNum(numInside){
    numInside = 100; 
    alert('numPar = ' + numInside);
}

var numOutside = 27; // 创建变量并赋值
changeNum(numOutside); // 调用 changeNum 方法 并传入 变量
alert('numOutside = ' + numOutside); // 显示变量的值
```

- 图解分析：

 ![1521542821615](assets/1521542821615.png)

- 结论：函数的形参也可以看做是一个变量，当我们把一个值类型变量作为参数传给函数的形参时，其实是把变量在栈空间里的值 复制 了一份给形参，那么在方法内部对形参做任何修改，都不会影响到的外部变量



#### 6.2.2 引用类型传参

> 思考以下代码的结果：

```js
function changeAge(perObjB){
    perObjB.age = 100;
    alert('perObjB.age = ' + perObjB.age);
}
var perObjA = new Object(); // 创建 一个对象实例
perObjA.age = 27; // 为对象实例添加一个 age 属性并赋值 27
changeAge(perObjA); // 调用 changeAge 方法 并传入对象变量
alert('perObjA = ' + perObjA.age); // 显示对象变量的 age
```

- 图解分析：

 ![1521599684814](assets/1521599684814.png)

- 结论：函数的形参也可以看做是一个变量，当我们把 引用类型变量 传给 形参时，其实是把 变量在栈空间里保存的 堆地址 复制给了 形参，形参和实参其实保存的是同一个堆地址，所以操作的是同一个对象



## 7. 对象深入理解

+ 回忆：当业务功能很多，代码量大的时候，为了复用代码，我们用 **函数** 来封装代码

  那如果 函数很多、变量很多呢？--- **可以用 对象 来 封装 方法 和 变量**，更方便复用

  回忆：之前学习的 Array ( 数组 )，就封装了 很多 方法 和 属性，如：

  ![1521787680951](assets/1521787680951.png)

+ **概念：**对象 是 一种 封装了 若干相关 `方法` 和 `属性` 的 **复杂数据类型**

```` js
var arr = new Array(); // 用  new 实例 的方式，创建一个 数组对象实例
var arr1 = [];         // 用 数组字面量 的方式，创建一个 数组对象实例
````

- 现实生活中：万物皆对象，对象是一类有共同 特征 和 行为 的抽象概念，如：人类、犬类、汽车、楼房等

```js
如：汽车
共同特征：红色、四个轮子
共同行为：驾驶、刹车
```

+ 对象的属性和方法

  对象 的 *共同特征 (数据 )*  用 `属性` 来表示 - `如：arr.length`

  对象 的 *共同行为 (功能 )*  用 `方法` 来表示 - `如：arr.push()`

> 例如 **狗** 对象：

```` js
共同特征(数据)：名字、性别、年龄、体重 .....
共同行为(功能)：吃饭、睡觉、撒欢跑、大叫 .....
````

> 例如 **数组** 对象：

```` js
var arr = new Array(2,1,'小白',true);
alert(arr.length); // 属性(数据)：调用 数组对象实例 的 length 属性 来获取 数组长度
arr.push('大猫'); // 方法(功能)：调用 数组对象实例 的 push 方法 向数组中 追加一个字符串
````



### 7.1 系统对象 和 自定义对象

+ 系统对象：顾名思义，就是由 JS 提供好的对象（对象中包含了 一系列 写好的 属性 和 方法）

  如：Array，String，Object 等


+ 自定义对象：由程序员自己定义的对象（包含了程序员为对象编写的 属性 和 方法）
  PS：其实，系统对象也是 `JS引擎 开发者` 编写的，本质也是 “自定义对象”



### 7.2 对象做参数传递

+ 当我们需要经常用到 学员详细信息 时，可以把学员数据作为参数一一传递给方法，如：

```` js
function introPer(usrName,usrAage){
    alert('此人名字叫：'+ usrName + '，年龄：'+ usrAge);
}

introPer('小白' , 21);
introPer('小黑' , 12);
````

+ 因为用对象可以封装一组相关数据，所以当我们给方法传递多个参数时，可以用对象先封装好再传，如：

```js
function introPerson(perObj){
    alert('此人名字叫：'+ perObj.usrName + '，年龄：'+ perObj.usrAge);
}

var stuObj = new Object();
stuObj.usrName = '小白';
stuObj.usrAge = 21;

//将 对象实例 作为参数传递
introPerson(stuObj);
```

 如图：![52264907336](assets/1522649073366.png)



> **课堂案例**
> 要求：编写一个 运算数据对象，包含 运算符、两个数值 3个属性。编写一个 doCul 方法接收 运算数据对象，并根据 操作符 和 两个数值 进行计算，结果返回给调用者，如下：

 ![1521708460294](assets/1521708460294.png)

```` js
// 1.定义一个计算方法，参数为 运算对象
function doCul(cObj){
    var resultNum = undefined;
    // 1.1 根据 运算符 进行不同运算
    switch(cObj.operator){
        case '+':
            //1.2 把运算结果 存入 result 属性中
            resultNum = cObj.numA + cObj.numB;
            break;
        case '-':
            resultNum = cObj.numA - cObj.numB;
            break;
        case '*':
            resultNum = cObj.numA * cObj.numB;
            break;
        case '/':
            resultNum = cObj.numA / cObj.numB;
            break;
        default:
            alert('运算符错误~~~' + cObj.operator);
    }
    //1.2 返回计算结果
    return resultNum;
}
// 2.创建一个 运算数据对象，设置好属性值
var culObj = new Object();
culObj.operator = '+';
culObj.numA = 12;
culObj.numB = 15;

// 3.调用计算方法，并传入 运算数据对象
var resNum = doCul(culObj);
// 4.//输出 计算结果
alert(resNum);
````

### 7.3 对象作为返回值

+ 当我们在一个方法中 需要返回多个值时，可以用对象封装多个值，然后再返回给调用者，如：

````js
//计算两个数值 的 和 、差
function addAndSub(numA,numB){
    //创建一个 Object 对象的实例
    var objRes = new Object();
    //将两个值的 和 存入 实例的 sumResult 属性中
    objRes.sumResult = numA + numB;
    //将两个值的 差 存入 实例的 subResult 属性中
    objRes.subResult = numA - numB;
    //将实例返回
    return objRes;
}
//调用方法，获取 12 与 5 的 和 与 差
var result = addAndSub(12,5);
//显示 返回的结果
alert(result.sumResult);
alert(result.subResult);
````

如图：
![52265014799](assets/1522650147990.png)

### 7.4 小结

- 对象

  通俗：对象 就是一个用来装 变量 和 方法 的 盒子

  概念：对象 是 封装了 相关 数据 和 方法 的 复杂数据类型

  本质：对象就是一组 无序的 **相关数据和方法** 的 **集合**

  **注意：** `函数` 用来按功能 **封装代码**，`对象` 用来按功能 **封装函数和数据**，都起到复用代码和数据的作用

- 对象是引用类型

  - 可以作为参数 或 返回值使用
  - 但 作为参数 和返回值时，传递的都是 **对象在堆空间的地址**

  

## 8. 数据类型复习

### 8.1 简单类型

+ 五大简单数据类型：string，number，boolean，undefined，null

```js
var str = '我爱你们么么哒';
var num = 6.6;
var bol = true;
var und; // 声明未赋值，就是 undefined
var nul = null;
```



### 8.2 复杂类型

+ 复杂数据类型，也叫引用类型
+ 三大复杂类型：Object , Array ,Function

```js
// 1. Object 类型的对象
var obj1 = new Object();
var obj2 = { name:'james' };

// 2. Array  类型的对象
var arr1 = new Array();
var arr2 = [10,20,30];

// 3. Function  类型的对象
var sayHi1 = new Function('console.log("Hi 1~~~");');
var sayHi2 = function () {
    console.log ("Hi 2~~~");
};
function sayHi3(){
    console.log ("Hi 3~~~");
}

// 构造函数 自定义类型
function Person(){
    
}
```



## 9.数据类型检测

### 9.1 typeof 

+ 检测 简单数据类型 ：返回 类型名称
+ 检测 复杂数据类型： 返回 类型名称 都是 Object
  + 特殊：检测 函数 时 返回 function

```js
var str = '我爱你们么么哒';
var num = 6.6;
var bol = true;
var und; // 声明未赋值，就是 undefined
var nul = null;

var obj2 = { name:'james' };
var arr2 = [10,20,30];
var sayHi1 = new Function('console.log("Hi 1~~~");');

console.log ( typeof str );//string
console.log ( typeof num );//number
console.log ( typeof bol );//boolean
console.log ( typeof und );//undefined

console.log ( typeof nul );//object

console.log ( typeof obj2 );//object
console.log ( typeof arr2 );//object
console.log ( typeof sayHi1 );//function
```



### 9.2 instansof

+ 检测 对象是否为 某种 复杂数据类型，返回 bool 值
  + 所有对象 instanceof Object 都会返回 true
  + 所有函数 instanceof Function 都会返回 true

```js
var obj2 = { name:'james' };
var arr2 = [10,20,30];
var sayHi1 = new Function('console.log("Hi 1~~~");');
function Person(){
    
}
var a = new Person();

console.log ( obj2 instanceof Object );// true
console.log ( arr2 instanceof Array ); // true
console.log ( sayHi1 instanceof Function ); // true
console.log ( obj2 instanceof Array ); // false
```

+ 数组检测专用 Array.isArray( )
  + 可以通过 Array.isArray 方法 来检测 对象是否为数组类型

```js
console.log ( Array.isArray ( arr ) );//true
console.log ( Array.isArray ( obj ) );//false
```



### 9.3 "万能数据监测法"

```js
console.log ( Object.prototype.toString.call ( str ) );//[object String]
console.log ( Object.prototype.toString.call ( nul ) );//[object Null]
console.log ( Object.prototype.toString.call ( und ) );//[object Undefined]
console.log ( Object.prototype.toString.call ( arr ) );;//[object Array]
console.log ( Object.prototype.toString.call ( fn ) );//;//[object Function]
console.log ( Object.prototype.toString.call ( obj ) );//;//[object Object]
```



## 10. JSON格式的数据

+ 在网络通信中，数据量越小，传输速度越快
+ JS对象字面量 的格式 符合这样的需求，既 易读，冗余数据也少
+ JSON 数据格式 就产生了：

```js
var o = {
    name:'james',
    age:1
};

//json对象：属性名和属性值全部都是字符串
var person1 = {
    'name':'张三',
    'age':38
};
```



![1553876650982](assets/1553876650982.png)



> 作为一门编程语言，JS 提供了一些系统对象和函数，帮助提高开发人员工作效率。系统对象封装了一些最常用的功能代码，方便程序员直接使用。如：Array，Date，Math，Object 等 下面补充3种

## 11. 常见系统对象

+ Array 数组对象：前面已经详细学过，用来顺序存储一组相关数据的数据类型

```` js
var arrObj = new Array(2,3,6,'小爱',true);
````

+ Date 日期对象：获取系统日期和时间数据

```` js
var dateObj = new Date(); // 创建一个日期对象 的实例
var dateStr = dateObj.getFullYear() + '年';
dateStr += (dateObj.getMonth()+1) + '月'; // 注：getMonth() 返回 0-11 代表 1-12月
dateStr += dateObj.getDate() + '日';
alert(dateStr); // 2218年3月1日
````

> Date 对象 常见方法，见 扩展内容 【1.Date对象常见方法】


+ Object 对象：最常见的对象类型，常用来存数据


```` js
var obj = new Object();
obj.usrName = '小白';
alert(obj.usrName); // 小白
````

> 扩展一句：JS中所有对象都继承自 Object 对象，后面课程会详细讲解

### 11.1 Date对象API

#### 11.1.1 创建日期对象

```js
var myDate = new Date();
console.log ( myDate );
```

#### 11.1.2 转换格式

```js
console.log ( myDate.toLocaleDateString () ); // 2019/3/30
console.log ( myDate.toLocaleTimeString () ); // 上午12:33:39
console.log ( myDate.toLocaleString () ); //2019/1/13 下午5:08:45
```

#### 11.1.3 获得年月日 时分秒

```js
/*获取当前年份*/
console.log ( myDate.getFullYear () );//2019
/*月份范围 0-11  对应1 -12  */
console.log ( myDate.getMonth() );//0  0表示1月
/*获取日期*/
console.log ( myDate.getDate () );//13
/* 星期范围 0-6  日-六 */
console.log ( myDate.getDay () );// 4
console.log ( myDate.getHours () );//17
console.log ( myDate.getMinutes () );//11
console.log ( myDate.getSeconds () );//2
console.log ( myDate.getMilliseconds () );//ms  552  = 0.5s
```

#### 11.1.4 自定义时间

```js
//4.1 参数格式： 年月日时间秒
var date1 = new Date(2017,11,20,8,30,0);
console.log ( date1 );

//4.2 参数格式字符串： ‘yyyy-mm-dd HH:mm:ss’
var date2 = new  Date('2018-10-25 23:00:00');
console.log ( date2 );

```



### 11.2 Array对象API

```js
var arr = [10,20,30] //new Array(10,20,30);
```

#### 11.2.1 连接两个数组

```js
// concat():连接两个数组
var arr1 = arr.concat([100,200,300]);
console.log ( arr1 );
```

#### 11.2.2 拼接数组元素

```js
//join:将数组所有元素拼接成一个字符串
var arr = ['中国','我','爱','你'];
var str = arr.join('|');//参数就是分隔符，默认,
console.log ( str );
```

#### 11.2.3 从尾取元素

```js
/* pop:删除数组最后一个元素  */
var arr = [10,20,30,40,50];
// arr.length--;//作用一致
console.log ( arr.pop () );//返回删除的哪个元素
console.log ( arr );
```

#### 11.2.4 追加元素

```js
/* push：往数组后面添加元素 */
var arr = [10,20,30,40];
// arr[arr.length] = 88;//作用一样
console.log ( arr.push ( 88 ) );//5 返回新数组长度
console.log ( arr );
```

#### 11.2.5 翻转数组

```js
/* reverse：翻转数组 */
var arr = [88,20,100,66,90];//[90,66,100,20,88]
console.log ( arr.reverse () );
```

#### 11.2.6 查询元素

```js
// slice:查询数组指定元素
var arr = [10,20,30,40,50,60,70,80];
//arr.slice(start,end)  返回数组 范围   start <= 范围 < end
console.log ( arr.slice ( 2, 4 ) );//[30, 40]
```

#### 11.2.7 从头取元素

```js
/* 删除第一个元素  */
var arr = [88,20,100,90];
console.log ( arr.shift () );//88
console.log ( arr );//[20, 100, 90]
```

#### 11.2.8 排序

```js
/* 数组排序sort */

var arr = [100,20,88,66,99];
/*参数是一个函数（回调函数）：指定排序方式
        从小到大：function (a, b) {
            return a-b;
        }
        从大到小：function (a, b) {
            return b-a;
        }
     */
arr.sort(function (a, b) {
    return a-b;
});
console.log ( arr );
```

### 11.3 String对象API

```js
var str = '学习大前端，变身高富帅，爱你么么哒';
//字符串类似于数组，相当于是多个字符的组合

//1.length：长度
console.log ( str.length );

//2.获取某个下标字符
// console.log ( str.charAt ( 6 ) );//不常用
console.log ( str[ 6 ] );//变  常用

//3.拼接字符串
// console.log ( str.concat ( "一万年" ) );
console.log ( str + "一万年" );//常用

/* 4.判断字符串种是否包含某些字符串  indexOf
    存在：返回第一个字符的下标
    不存在：返回固定值 -1
    */
if(str.indexOf('大前端') != -1){
    console.log ( "存在" );
}else{
    console.log ( "不在" );
};

/* 5.substr():截取字符串  */
//str.substr(form:从哪个下标开始截取,length：截取几个字符)

console.log ( str.substr ( 6, 5 ) );//从第6个小标开始往后面截取5个字符

/* 6.replace(): 替换字符串  */
//str.replace(要修改的字符串,修改后的字符串)
console.log ( str.replace ( "高富帅", "富富富" ) );
/*删除字符串： 替换成空字符串*/
console.log ( str.replace ( "么么哒", "" ) );

/*7. split:指定分隔符分隔字符串  */

var str = '我&爱&你|么么哒|老铁';
/*返回值一定是数组：以指定分隔符将字符串分割成若干个元素存入数组种*/
console.log ( str.split ( "&" ) );//["我", "爱", "你|么么哒|老铁"]
console.log ( str.split ( "|" ) );//["我&爱&你", "么么哒", "老铁"]
console.log ( str.split ( "#" ) );//["我&爱&你|么么哒|老铁"]

//8：大小写转换
//中文没有大小写

var str = 'jshafgvjSKVHGKDSsdkjvhgkSKVGHKS';
//转化大写
console.log ( str.toLocaleUpperCase () );//JSHAFGVJSKVHGKDSSDKJVHGKSKVGHKS
console.log ( str.toLocaleLowerCase () );//jshafgvjskvhgkdssdkjvhgkskvghks

/* 思考题  写一个函数（1）将字符串  var str = 'get$element$by$class$name'
    （2）转成驼峰命名：  'getElementByClassName' */

var str = 'get$element$by$class$name';
//1.先使用 $ 将字符串分隔成一个数组
var arr = str.split('$');
console.log ( arr );

var str = '';
//2.遍历数组
for(var i = 0;i<arr.length;i++){
    var s = arr[i];
    // console.log ( s );

    /*a。先取出首字母
        b.将首字母转大写
        c。再把首字母替换
        字符串恒定性：字符串本身无法修改，任何的api都不会修改原字符串，而是返回一个新的字符串
        解决方案：调用任何字符串方法使用变量接收
         */
    // var shou = s[0];
    // var big = shou.toLocaleUpperCase();
    // s = s.replace ( s[ 0 ], big ) ;
    // console.log ( s );

    if(i != 0 ){//只要不是第一个字符串，就首字母转成大写
        s  = s.replace(s[0],s[0].toLocaleUpperCase() );
    }
    str += s;
};

console.log ( str );
```





## 二. 扩展内容@

## 1. Date对象常见方法


| 方法名        | 说明                   | 代码               |
| ------------- | ---------------------- | ------------------ |
| getFullYear() | 获取当年               | dObj.getFullYear() |
| getMonth()    | 获取当月（0-11）       | dObj.getMonth()    |
| getDate()     | 获取当天日期           | dObj.getDate()     |
| getDay()      | 获取当天的天（星期几） | dObj.getDay()      |
| getHours()    | 获取当前小时           | dObj.getHours()    |
| getMinutes()  | 获取当前分钟           | dObj.getMinutes()  |
| getSeconds()  | 获取当前秒钟           | dObj.getSeconds()  |

## 2. 对象的静态成员和动态成员

+ 动态成员：需要通过 new 出对象实例，然后通过 对象实例.成员 来调用

```` js
var dObj = new Date();
var hStr = dObj.getHours(); // 此处通过 对象实例.成员方法() 调用
````

+ 静态成员：直接通过 对象.成员 来调用

```` js
var strPi = Math.PI; // 此处通过 对象.成员方法() 调用
var numRandom = Math.random(); // 获取 0-1 之间的 随机小数
````



+ 形参实参不需要匹配也可以使用

## 三. 课后综合练习（作业）

>  **课堂案例**
>  要求：简版计算器，提供 加减乘除 功能





> **2.简易 仓储管理系统 **



## 四. 深度阅读@

[《详解 ECMAScript 数据类型》](http://www.cnblogs.com/onepixel/p/5140944.html)

[《浏览器内核、渲染引擎、JS引擎》](http://www.cnblogs.com/jameszou/p/8524501.html)

[《浏览器内核与js引擎》](http://www.cnblogs.com/xiyangbaixue/p/4042548.html)



## 五. 作业参考答案



