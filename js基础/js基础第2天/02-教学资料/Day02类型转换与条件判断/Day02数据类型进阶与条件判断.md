> 第02阶段.前端基本功.前端基础.入门语法 - from：JamesZou

# 基础语法

## 今日学习目标

![1559921825353](assets/1559921825353.png)

## 一、核心内容

## 1.数据类型进阶

### 1.1 数值类型 进阶

#### 1.1.1 NaN '非数值'

> 数值类型的3个特殊值：Infinity , -Infinity , NaN

+ `NaN` （Not a number），也是一个特殊值，代表一个 **非数值**

  用来表示错误数学计算的结果。

  ```js
  console.log(NaN); // NaN
  ```

+ 特点：

  + 当数学计算出现错误时，就会得到 NaN
  + NaN与任何数字计算 都会得到 NaN
  + NaN与任何数字都不等，包含它本身

  ```js
  console.log ( "Linda" - 7 ); // NaN
  console.log ( typeof ( "Linda" - 7 ) );// number -> 注意： NaN 是 Number 类型
  
  console.log ( NaN + 7 ); // NaN
  
  console.log ( NaN == 0 ); // false
  console.log ( NaN == 123 ); // false
  console.log ( NaN == ‘abc’ ); // false
  console.log ( NaN == NaN ); // false
  ```

> 思考：既然 NaN 不等于 NaN，那该如何检测 变量值 是否为 NaN呢？

#### 1.1.2 isNaN() 函数

+ 用来判断一个变量是否为`非数值` 的类型

![1519904281289](assets/1519904281289.png)

> **课堂练习：** 5分钟
> 要求：编写如下代码并运行，注意 isNaN() 返回的值

```js
var usrAge = 21;
var isNum = isNaN(usrAge);
console.log(isNum); // false ，21 不是一个 非数值

var isOk = isNaN(NaN);
console.log(isOk);//true ，NaN 是一个 非数值

var usrName = "James";
var isOk = isNaN(usrName);
console.log(isOk);//true ，"James"是一个 非数值
```

#### 1.1.3  数值类型小结

![1555398786924](assets/1555398786924.png)

### 1.2 字符串类型 进阶

#### 1.2.1 字符串转义符

> **思考：**如何 保存 包含 引号的字符串呢？

+ 不能在字符串中包含相同的引号
  下面将会出现错误，因为它会混淆 **内容里的引号** 和 **字符串引号** 的结束位置：

```js
// 请注意 i'm 中的 单引号
var badQuotes02 = 'I'm the GOD of my world ~!'; // 报错！
```

示例详解：

![52214708096](assets/1522147080962.png)

+ **转义符：** 就是用来起到特殊作用的文本的符号

在JavaScript中，我们通过在 `字符之前` 放一个 `反斜杠` 来实现这一点。看看这个：

```js
var strMsg = 'I\'m the GOD of my world ~!'; //输出：I'm the GOD of my world ~!
var strMsg2 = "I\"m the GOD of my world ~!"; //输出：I"m the GOD of my world ~!
var strMsg3 = '反斜杠是这个 \\，神奇！';  //输出：反斜杠是这个 \，神奇！
```

> **课堂练习**  用时：5分钟
>
> 要求：1.用字符串变量 var strMsg 保存 这句话： I'm Rookie，我爱锻炼，因为不想"猝死"~！
> ​           2.使用 alert 显示，如下图：

![52213894423](assets/1522139542643.png)

你可以用别的方式来达到一样的目的， 例如. `\",` 除此之外有一些特殊的代码 ，常见如下表：

| 字面量 | 含义              |
| ------ | ----------------- |
| \n     | 换行符（重要）    |
| \r     | 回车符            |
| \'     | 单引号 ' （重要） |
| \"     | 双引号 "（重要）  |
| \ \    | 斜杠 \            |
| \t     | Tab               |

**注意：** `\n` 和 `\r` 都起到换行的作用，但平时用 `\n` 比较合适。因为 `\n` 是 windows/mac/ninux 都支持，`\r` 只有 windows 支持。

> **课堂练习** 
> 要求：编写一个字符串变量，用 alert 方法 显示如下图：

![52213894423](assets/1522138944230.png)

#### 1.2.2 字符串的长度

字符串是若干 `字符` 组成的 `串`，这些 *字符的数量*  就是 *字符串的长度*。 `我` `是`  `字` `符` `组` `合` ` 而` ` 成` `的 ` `！` 

字符串的 `length` 属性可以获取 ` 整个字符串` 的长度

```js
var strMsg = "我是帅气多金的程序猿！--- 恩，我看出了你的自信。";
alert(strMsg.length); // 26
```

### 1.3 复杂数据类型

> 学习提醒：复杂数据类型在此节只做了解，后期有课详细讲解

| 复杂数据类型 | 说明                                               |
| ------------ | -------------------------------------------------- |
| Object       | 对象类型，var obj = new Object();                  |
| Array        | 数组类型，用来存放一组数据，var arr = new Array(); |
| Function     | 函数类型，用来封装代码                             |

- 复杂数据类型的创建方式

```js
var obj = new Object();
var arr = new Array();
var func = new Function();
```



## 2.数据类型转换

通俗：就是把一种数据类型的变量转换成另外一种数据类型

通过调用系统函数进行类型转换，主要分3类：转 `字符串`、转 `数值`、转 `布尔值`

### 2.1 转换为字符串

| 方式           | 说明                         | 案例                                |
| -------------- | ---------------------------- | ----------------------------------- |
| toString()     | 把变量转成字符串             | var num= 1;  alert(num.toString()); |
| String()       | 把特殊值转成字符串           | String(undefined);                  |
| 加号拼接字符串 | 和字符串拼接的结果都是字符串 | var str = 215 + "我是字符串";       |

#### 2.1.1 toString() 方法

- 简单数据类型 中的 number、bool 类型 都有 toString 方法

  a.布尔类型的 toString() 只会输出 "true" 和 "false"

```javascript
var isFound = false;
console.log(typeof(isFound)); // boolean
console.log(isFound.toString()); // 输出"false"

var isFoundType = typeof(isFound.toString()); // 获取 bool值.toString() 的结果的类型
console.log(isFoundType); // string
```

​	    b.数值类型的 toString() 方法，分 *默认模式* 和 *基模式*  ，在此讲前者，后者参考 *扩展内容10. 数值toString() 基模式*

```javascript
var num01 = 27.toString(); // alert(num01)输出"27"
var num02 = 27.37.toString(); // alert(num02)输出"27.37"
var num03 = 2737e5.toString(); // alert(num03)输出"273700000"
```

#### 2.1.2 String() 方法

String()函数存在的意义：有些值没有toString()，这个时候可以使用String()。
比如：undefined 和 null

#### 2.1.3 加号拼接字符串

- 是 一种 隐式类型转换：就是没有通过调用方法，自动进行的转换

当 + 两边 一个是 `字符串类型`，另一个是 `其它类型` 的时候，会先把 `其它类型` 转换成 `字符串` 再进行**字符串拼接**，最后返回字符串

注意：当我们 没有 通过 显示的 调用 toString 或者 String 方法 对变量类型 进行转换，而是 在运算中 自动转换了类型，那么，这个过程 就叫做 **隐式类型转换**

```javascript
alert(21 + "小白"); // 输出 "21小白"
alert(false + "小白"); // 输出"false小白"
```

> **提问：** alert(167 +  "90") 输出的是什么呢？

- 小结：+ ， 变量.toString()，String()

### 2.2 转换为数值

| 方式                    | 说明                       | 案例                          |
| ----------------------- | -------------------------- | ----------------------------- |
| parseInt(string) 函数   | 将string类型参数转成整数   | parseInt('78')                |
| parseFloat(string) 函数 | 将string类型参数转成浮点数 | parseFloat('78.21')           |
| Number(string) 函数     | 将string类型参数转成数值   | Number('12')   Number('12.1') |

#### 2.2.1 parseInt(string) 

**概念：** 将 数值字符串 转成 整数数值

```javascript
var numAge = parseInt("912"); // 912
```

**执行规则：**

```javascript
//规则1.忽略数值字符串【前面】的空格
var numLove = parseInt("  520"); // 520

//规则2.遇到数值字符串【后面】的空格会停止
var numLove = parseInt("520 121"); // 520

//规则3.如果第一个字符不是 数字符号 或者 单独的负号，返回NaN
var numLove = parseInt("aboard211"); // NaN

//规则4.如果第一个字符是数字，则继续解析直至字符串解析完毕 或者 遇到一个非数字符号为止
var numLove = parseInt("520little222cat"); // 520
var numLove = parseInt("520.22"); // 520
```

> **提问：**
>
> 1. var numLove = parseInt("   520  1314")  执行后 numLove 的值是什么？
> 2. var num = parseInt("12.3abc")  执行后 num 的值是什么？

#### 2.2.2 parseFloat(string)

**概念：** 将 浮点数值字符串 转成 浮点数值

```javascript
var num = parseFloat("12.3abc"); // 12.3
var num = parseFloat("77.777"); // 77.777
var num = parseFloat(" 77.777"); // 77.777
var num = parseFloat("7 7.777"); // 7
var num = parseFloat("77.7 77"); // 77.7
var num = parseFloat("aa77.777"); // NaN
```

注意：parseFloat函数如果用来转换 整型数值字符串，则也是返回 整型数值

```javascript
var num = parseFloat("12"); // 12，而不是 12.0
```

#### 2.2.3 Number(string)

**概念：**可以把任意值转换成数值，如果要转换的字符串中有一个不是数值的字符，返回NaN

```js
var num = Number("12"); // 12
var num = Number("77.777"); // 77.777
var num = Number("7a7.777"); // NaN
```

- 可以将特殊值转成数值

```js
var num = Number(true); // 1
var num = Number(false); // 0
var num = Number(null); // 0
var num = Number(undefined); // NaN
```

#### 2.2.4 使用加减号 转换数值

```javascript
var numStr = '777';
console.log(+numStr);  // 777
console.log(-numStr);  // -777
```



### 2.3 转换为Boolean值

| 方式          | 说明                   | 案例             |
| ------------- | ---------------------- | ---------------- |
| Boolean()函数 | 将布尔字符串转成布尔值 | Boolean('true'); |

- 代表 空、否定的值 会被转换为 false，如：
      0、-0、NaN、''、null、undefined、document.all
- 其余任何值都会被转换为 true

```js
var res = Boolean(''); // false
res = Boolean(0); // false
res = Boolean(NaN); // false
res = Boolean(null); // false
res = Boolean(undefined); // false

res = Boolean(-0); // false
res = Boolean(document.all); // false

var res2 = Boolean('小白'); // true
var res2 = Boolean(12); // true
```

> 学习提醒：请同学们不要去背上面的代码，大概有个印象就行

  

## 3.运算符（下）

> 运算符（上）：算数运算符 、 复合算数赋值运算符

### 3.1 算数运算符-自增自减

> `++` 和 `--` 运算符可以简化代码的编写，让变量的值 `+ 1` 或者 `- 1`；

#### 3.1.1 自增 运算符 `++`

**概念：**让变量自己 **+ 1** 的运算符，相当于 `变量 = 变量 + 1`

```js
var num = 17;
num++; // 18 // num+=1 -> num = num + 1
++num; // 19 // num+=1 -> num = num + 1
```

#### 3.1.2 自减 运算符 `--`

**概念：**让变量自己 **- 1** 的运算符，相当于 `变量 = 变量 - 1`

```js
var num = 17;
num--; // 16 // num = num - 1
--num; // 15 // num = num - 1
```

- **注意：**
  - `++` 和 `--` 只能和 `变量` 连用，不能和 `数字` 连用，如：`11++`
  - 开发时，大多使用后置自增/减，并且代码独占一行，例如：`num++;` 或者 `num--;`。

#### 3.1.3 自增自减运算符 小结

1. `++` 和 `--` 运算符可以简化代码的编写，让变量的值 `+ 1` 或者 `- 1`；

2. 开发时，大多使用后置自增/减，并且代码独占一行，例如：`num++;` 或者 `num--;`

   

### 3.2 关系运算

> 引入：当我们需要 比较 两个人的 身高 、年龄 或 成绩时，就需要使用 大于号 、小于号 来比较。

#### 3.2.1 关系运算符

**概念：** 关系运算符 ( 比较运算符 )，用来对 两个数据 进行比较 的运算符，返回  布尔值（`true / false`），作为比较运算的结果。

| 运算符名称 | 说明                          | 案例       | 结果  |
| ---------- | ----------------------------- | ---------- | ----- |
| <          | 小于号                        | 1  <  2    | true  |
| >          | 大于号                        | 1 > 2      | false |
| >=         | 大于等于号 (大于**或者**等于) | 2 >= 2     | true  |
| <=         | 小于等于号 (小于**或者**等于) | 3 <= 2     | false |
| ==         | 判等号（会转型）              | 37 == 37   | true  |
| !=         | 不等号                        | 37 != 37   | false |
| ===        | 全等号                        | 37 ==="37" | false |
| !==        | 不全等号                      | 37!=="37"  | true  |

#### 3.2.2 关系表达式

**概念：** 运算符 单独使用没有意义，一般需要和 数据一起 组成 **关系表达式** 进行运算，结果是 `true / false`

+ **基本使用**

```js
var res = 1 > 2;  // var res = false;
console.log(res); // false
```

+ **判等**  -> 只比较数据的值，不比较数据的类型

`注意：一个 = 号表示赋值运算符  两个 == 是比较运算符，它们作用不一样，不要搞混淆了`

```js
console.log ( 7 == 7 );   // true   常用
console.log ( "7" == 7 ); // true   值一样，只是数据类型不一样
```

+ **全等全不等** -> 先比较数据的值，再比较数据的类型

```js
console.log ( "1" === 1 );//false  两者的值虽然相等都是1，但是他们数据类型不一样，所以不成立
```



> **课堂提问：**下面代码中 三个 res 结果为？

```` js
var num1 = 10;
var num2 = 100;
var res1 = 10 > 100;   // false
var res2 = num1 == 11;   //  false
var res3 = num1 != num2; // true
````



### 3.2 逻辑运算符 

> 思考：“ 谁既温柔又可爱的女生，我就娶了谁 ” 
>
> 类似这个多条件的比较，最终结果 要如何获取呢？

**概念：** 逻辑运算符，用来进行 **多个布尔值** 进行 逻辑运算，返回值也是布尔值。

| 逻辑运算符 | 说明                | 案例           |
| ---------- | ------------------- | -------------- |
| &&         | 逻辑与，简称 "与"   | exp1 && exp2   |
| \|\|       | "逻辑或"，简称 "或" | exp1 \|\| exp2 |
| ！         | "逻辑非"，简称 "非" | ! exp1         |

#### 3.2.1 逻辑与 &&

+  **一错都错：**

  **(1.一边为 `true `&& 一边为 `false `**

```` js
var res = 2 > 1 && 3 < 1; // 读作： 2 > 1 且 3 < 1
console.log(res); // false
````

 	图解：

 ![1521098021882](assets/1521098021882.png)


​    
+ **(2.两边都为  `true`**

```` js
var res = 2 > 1 && 3 > 1; // 读作：2 > 1 且 3 > 1
console.log(res); // true
````

图解：
 ![1521098231500](assets/1521098231500.png)



#### 3.2.2 逻辑或 ||

+ **一对都对：**

  **(1.只要有一边为 `true`，就返回 `true`**

```` js
var res = 2 > 3 || 1 < 2; // 读作：2 > 3 或 1 < 2
console.log(res); // true
````

   图解：

   ![1521098785003](assets/1521098785003.png)



   	**(2.两边都为 `false`，才返回 `false`**

```` js
var res = 2 > 3 || 1 > 2; // 读作： 2 > 3 或 1 > 2
console.log(res); // false
````

   图解：

   ![1521099064588](assets/1521099064588.png)

  

#### 3.2.3 逻辑非 ! 


+ 也叫 `取反运算符`。用来取一个布尔值相反的值，如 true 的相反是 false

```` js
var isOk = !true;
console.log(isOk); // false
````

> **课堂提问：**下面代码中  res 结果为？

```` js
var num1 = 7;
var str = "我爱你~中国~";
var res1 = num1 > 5 && str.length >= num1; // true
var res2 = num1 < 5 && str.length >= num1; // false
var res3 = !(num1 < 10);  // false
var res4 = !(num1 < 10 && str.length == num1);  // false
````



## 4.条件分支语句

> 什么是流程控制？

**概念：** 流程控制 分 顺序结构、分支结构、循环结构三种，代表三种代码执行的顺序。

![1521106082845](assets/1521106082845.png)

### 4.1 if 语句

**概念：** 由上到下执行代码的过程中，根据不同的条件，执行不同的代码。

​              共有两种分支结构：`if...else...` 和  `switch case`

#### 4.1.1 if else 结构

常见三种语法结构

+ **(1. if 结构 语法：** 

```js
// 条件成立执行代码，否则什么也不做。
if(条件表达式){
    // [如果] 条件成立执行的代码
}
```

+ 条件表达式内容：
  + 常用：关系表达式 -> 运行结果一定是布尔值
  + 布尔值类型的值：true / false
  + 其它的值：JS引擎帮我们转换成布尔值 （隐式转换）
    + **转换为true**   非空字符串  非0数字  true 任何对象
    + **转换成false**   空字符串  0  false  null  undefined

> **课堂案例 1：**如果年龄大于等于 18 岁，允许进网吧。

````js
var usrAge = parseInt(prompt('请输入您的年龄：'));
if(usrAge >= 18){
    alert('您的年龄合法，欢迎来天际网吧享受学习的乐趣！');
}
alert('判断结束！');
````



+ **(2. if-else 语法：** 

```js
// 条件成立执行代码，否则执行另外的代码。
if (条件表达式) {
    // [如果] 条件成立执行的代码
} else {
    // [否则] 执行的代码
}
```

+ 好处：两个互斥条件只需要判断一次，不需要写两个 if 判断

> **课堂案例 2：**接收用户输入的年龄，如果年龄大于等于 18 岁，允许进网吧，否则回家写作业。

````js
var usrAge = parseInt( prompt('请输入您的年龄：') ); // 接收输入的数值字符串并转成 数值类型存入变量
var sysMsg =''; // 用来保存系统信息的字符串变量
//判断 用户输入的年龄 是否大于等于 18
if(usrAge >= 18){
    alert('您的年龄合法，欢迎来天际网吧享受学习的乐趣！');
}else{ // 相当于 if (usrAge < 18)
    alert('您的年龄太小了，还是回家用功写作业吧~~！');
}
alert('判断结束！');
````

> **课堂案例 3：**接收并判断一个整数是偶数还是奇数，并输出：'您输入的数字 num，是一个偶数/奇数！'
> 提示：`num % 2 === 0` 是偶数，`num % 2 === 1` 是奇数。

````js
var num = parseInt( prompt('请输入一个整数：') );  //接收输入的数值字符串并转成 数值类型存入变量
if(num % 2 === 0){
    alert('您输入的数字：' + num + '，是一个偶数！');
}else{
    alert('您输入的数字：' + num + '，是一个奇数！');
}
alert('判断结束！');
````



+ **(3. if-else-if 语法** 

```js
//适合于检查多重条件。
if (条件1表达式) {
    // [如果] 条件1 成立执行的代码
} else if (条件2表达式)  {
    // [否则] [如果] 条件2 成立执行的代码
    // 注释：条件1 不成立，但是条件2 成立
} else {
    // 上述条件都不成立执行的代码
}
```

> **课堂案例 4：**接收并判断 num1 和 num2 中哪个数最大，或者相等。

```` js
var num1 = parseInt( prompt('请输入第一个数字：') );
var num2 = parseInt( prompt('请输入第二个数字：') );
if(num1 > num2){
    alert('第一个数字【' + num1 + '】比第二个数字【'+ num2 +'】大 !!!');
}else if(num1 < num2){
    alert('第一个数字【' + num1 + '】比第二个数字【'+ num2 +'】小 ...');
}else{
    alert('第一个数字【' + num1 + '】和 第二个数字【'+ num2 +'】相等  ：）');
}
alert('判断结束！');
````

#### 4.1.2 if else 小结

+ 根据 **条件不同**，**有选择地执行** 不同的代码；
+ 分支结构结束后，会继续执行后续的代码。



> **课堂练习（10分钟）**
> 要求：接收用户输入的分数，根据分数输出对应的等级字母 A、B、C、D、E。其中：
>
> 1. 90分(含)以上 ，输出：A；
> 2. 80分(含)~ 90 分(不含)，输出：B；
> 3. 70分(含)~ 80 分(不含)，输出：C；
> 4. 60分(含)~ 70 分(不含)，输出：D；
> 5. 60分(不含) 以下，输出 E。

### 4.2 switch 结构

当要针对变量多种不同值执行不同的代码时，就可以使用 switch。

- **语法：** 使用结果表达式 的值 和 各个 case 中的值 进行相等比较

```js
switch(变量){ // 注： 结果表达式 通常就是 一个 变量
    case value1:
        //表达式结果 等于 value1 时 要执行的代码
        break;
    case value2:
        //表达式结果 等于 value2 时 要执行的代码
        break;
    [default:]
        //表达式结果 不等于任何一个 value 时 要执行的代码
}
```

- **执行顺序：** 
  1.先执行 `结果表达式` 获取一个 `值`，随后 `表达式的值` 会与结构中的每个 `case 的值` 做比较。

  2.如果存在匹配 **全等(===)**，则与该 case 关联的 `代码块` 会被执行，

     并在遇到 `break ` 时停止，整个 switch 代码执行结束。

  3.如果所有的 `case 的值` 都和 `表达式值` 不匹配，则 执行 `default `里的代码。

> **课堂案例** 
> 根据用户输入的数值（数字1 到 数字 7），返回星期几。
> 如：1 返回 星期一，2 返回 星期二

```js
var strResult = '';
var usrNum = prompt('请输入一个 1- 7 之间的数字：'); // 接收用户输入的一个数字字符串
usrNum = parseInt(usrNum); // 将数字字符串 转成 整数数值
switch(usrNum){
    case 1:
        strResult = '星期一';
        break;
    case 2:
        strResult = '星期二';
        break;
    default:
        strResult = '星期天';
}
alert('您输入的数字对应的是' + strResult);
```

**课堂案例小扩展：** 可以 使用 `var day=new Date().getDay();`  获取系统星期数（0-6）

> **代码分析：**

 ![1521165630685](../../../../../../../01%E6%B7%B1%E5%9C%B3/08.%E8%AF%BE%E7%A8%8B%E7%A0%94%E5%8F%91/06.%E8%AE%B2%E4%B9%89%E6%96%87%E6%A1%A3V5.0/%E9%98%B6%E6%AE%B502.%E5%89%8D%E7%AB%AF%E5%9F%BA%E6%9C%AC%E5%8A%9FV2.0/02_%E6%B5%81%E7%A8%8B%E6%8E%A7%E5%88%B6/assets/1521165630685.png)

> 课堂案例：让屌丝输入女神刚刚说了什么
> 	                  根据女神说的内容，来判断，打印出它对应的意思
>
> 【女神聊天翻译器】
> 	呵呵                 你说的内容我不感兴趣
> 	嗯                   你说的内容还可以，继续吧
> 	哦                   无所谓
>     我要去洗澡了         结束聊天
> 	其他内容：太高级了，我翻译不出来了

### 4.3 switch 与 if 对比

- 下图可以看出，当进行 **全等** 比较时，`switch ` 和 `if ` 可以实现一样的效果。
- 但 if 语法可以进行区间判断，如 `if (num1 > 5)`，这个 `switch ` 就不可了。

![1521165919596](../../../../../../../01%E6%B7%B1%E5%9C%B3/08.%E8%AF%BE%E7%A8%8B%E7%A0%94%E5%8F%91/06.%E8%AE%B2%E4%B9%89%E6%96%87%E6%A1%A3V5.0/%E9%98%B6%E6%AE%B502.%E5%89%8D%E7%AB%AF%E5%9F%BA%E6%9C%AC%E5%8A%9FV2.0/02_%E6%B5%81%E7%A8%8B%E6%8E%A7%E5%88%B6/assets/1521165919596.png)

### 4.4 合理使用switch穿透

- 合理穿透：当存在多种值需要执行相同代码时使用穿透可以节省代码

> **课堂练习：**用户输入某一个月份，告诉用户这个月份属于什么季节
> 12，1，2 冬季
> 3，4，5 春季
> 6，7，8 夏季
> 9，10，11 秋季

```js
var month = parseInt(prompt("请输入月份"));
switch (month){
    case 12:
    case 1:
    case 2:
        alert("冬季");
        break;
    case 3:
    case 4:
    case 5:
        alert("春季");
        break;
    case 6:
    case 7:
    case 8:
        alert("夏季");
        break;
    case 9:
    case 10:
    case 11:
        alert("秋季");
        break;
    default:
        alert("你来自火星吧？");
        break;
}
```



### 4.5 小结

![1554380330979](assets/1554380330979.png)



## 5.补充：前自增和后自增

在 JavaScript 中，`++` 和 `--` 既可以放在变量前面，也可以放在变量后面。以自增举例：\

### 5.1 前置自增

- `++num` ：先运算，再返回

```javascript
var num = 7;
alert(++num); // 8
alert(num);   // 8
```

图解：

![52215783223](assets/1522157832237.png)

### 5.2 后置自增

- `num++`：先返回，再运算

```javascript
var num = 7;
alert(num++); // 7
alert(num);   // 8
```

图解：

![52215801568](assets/1522158015680.png)

- **前置/后置 自减 同理**

```js
var num = 7;
alert(--num); // 6 -> num = num -1 ; alert(num);
alert(num); // 6

var num2 = 7;
alert(num2--); // 7 -> alert(num2); num2 = num2 -1;
alert(num2); // 6
```

### 5.3 不易读的代码示例：

```js
var a = 1;
var b = ++a + ++a; // 此处 和 +号 同时使用，会影响 到 后面 ++a 的执行过程
alert(b); // 5
```

+ 因为 运算中 使用到 了 + 号，所以影响到了 整个算是的 执行顺序

图解：

![52215919350](assets/1522159193507.png)

拆分图解：

当 两个 自增 运算  结合 着 普通运算 时，先会 把 两个自增运算完成，再 执行 普通运算

![52215922922](assets/1522159229224.png)

### 5.4 前置和后置的对比小结

1. **单独使用时**，运行结果相同；
2. **与其他代码联用时，执行结果会不同**：
   - **后置**：先返回，**后自增/减**；
   - **前置**：**先自增/减**，后返回。

