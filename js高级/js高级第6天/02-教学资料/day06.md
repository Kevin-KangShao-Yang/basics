# 今日学习任务



* [ ] 正则表达式
  * [ ] 学习目标：了解实际开发中常用的一些正则表达式(手机号、qq邮箱等)



# 01-正则表达式语法介绍(了解)



## 1.1-正则表达式介绍



* **本小节知识点**
  * 1.什么是正则表达式
    * 正则表达式是一个用于对字符串实现逻辑匹配运算的对象
  * 2.正则表达式的作用
    * 按照某种规则来匹配字符串，而正则表达式就是制定这个规则
  * 3.如何使用正则表达式
    * (1)创建正则表达式对象
    * (2)开始匹配 `使用test()`方法
  * 4.正则表达式特点
    * 对初学者极度的不友好
    * 非常的晦涩难懂
  * 5.学习目标
    * **1.可以使用正则表达式验证常用表单文本（手机、邮箱、qq、座机、姓名）**
    * 2.了解正则表达式在开发中的一些应用场景
* **正则表达式图形化网站：https://regexper.com/**
  * 正则表达式非常的晦涩难懂，使用图形可以更好的方便理解，正所谓一图胜千言



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<script>
    //1.js内置对象： Object Array Function Math Date String Number Boolean RegExp（正则表达式）

    //2.正则表达式：Regular Expression      缩写：RegExp
    //官方介绍：正则表达式是用于匹配字符串中字符组合的模式
    /*从两个角度来理解正则表达式的作用
    a. 表达式: 用于运算的式子
            * 正则表达式：用于字符串的规则匹配运算
    b. 数据类型：正则表达式是js内置对象，存储了一些属性与方法

    总结：正则表达式是一个用于对字符串实现逻辑匹配运算的对象
     */

    //3.如何使用正则表达式

    //3.1 创建正则表达式对象

    /** （1）构造函数声明
    第一个参数： pattern：正则表达式（也就是过滤字符串的规则）
     第二个参数：modifiers：修饰符（用于修饰匹配规则，例如不区分大小写等，使用较少，一般不传）
     */
    var reg = new RegExp(/a/,'i');//这个正则用来判断字符串里有没有a这个字符，不区分大小写
    /*(2)字面量简洁方式
   语法：  /pattern/modifiers
   细节： 如果没有修饰符，后面的/也不能省略， 例如： /pattern/
     */
    var reg1 = /a/i;
    //3.2 开始匹配
    /**
     * 参数：要匹配的字符串
     * 返回值：布尔类型   true:满足匹配规则  false：不满足
     */
    var res = reg1.test('Abcdefg');
    console.log ( res );

    //补充说明：字面量方式可以直接调用test方法
    console.log ( /男/.test ( "班长的性别是男" ) );//true
    var reg1 = /[abc]/;
    var res = reg1.test('11b11');
    console.log ( res );

</script>
</body>
</html>
```



## 1.2-元字符与原义文本字符

![](day06.assets/0701.jpg)

![](day06.assets/0702.jpg)

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>


<script>
    /*一个正则表达式主要由两种基本字符组成
    1.原义文本字符： 字符本身的含义，例如`/a/`，就表示匹配a
    2.元字符： 在正则表达式中有特殊含义的非字母字符
         * + ? $ ^ . |  \ () {} []
     */

    //1.原义文本字符
    //示例:匹配字符串中有没有abc (没别的意思，就是匹配有没有abc这个字符，不要误解成同时有字母a，字母b，字母c)
    console.log ( /abc/.test ( "asdasdasbc" ) );//false
    console.log ( /abc/.test ( "asdabcas" ) );//true
    console.log ( /abc/.test ( "aaaabbbbbcccc" ) );//false
    //示例：检测字符串有没有黑马
    console.log ( /黑马/.test ( "一匹黑色的马" ) );//false
    console.log ( /黑马/.test ( "黑马程序员" ) );//true

    //2.元字符：由非字母字符组成，在正则表达式表示特殊含义
    //示例：匹配字符串中有没有a或者b
    //这里  `|` 就属于元字符，含义是或者的意思
    console.log ( /a|b/.test ( "cdefg" ) );//false
    console.log ( /a|b/.test ( "acdefg" ) );//true
    console.log ( /a|b/.test ( "bcdefg" ) );//true

</script>
</body>
</html>
```



## 1.3-字符类



![](day06.assets/0801.jpg)

![](day06.assets/0802.jpg)

```javascript
//1.一般情况下，正则表达式的一个字符就是对于字符串的一个字符，这样处理比较方便
    //例如：  /abc/  ： 含义就是匹配字符串 `abc`

    //2.有时候我们并不想只匹配一个字符，而是想要匹配符合某一类特征的字符，这时就可以使用字符类

    /*2.创建简单字符类：  []
        * 这里类指的是符合某些特征的对象，只是一个泛指，而不是指某个字符
        * 例如正则表达式：  /[abc]/ :把字符a或b或c归为一类，可以匹配这类的字符
        * /[abc]/ : 含义是，匹配字符串中只要有 a或者b或者c任何一个即可
     */
    console.log ( /[abc]/.test ( "eeeeeeeffffffffff" ) );//false
    console.log ( /[abc]/.test ( "eaeeeeeeffffffffff" ) );//true
    console.log ( /[abc]/.test ( "ebeeeeeeffffffffff" ) );//true
    console.log ( /[abc]/.test ( "eceeeeeeffffffffff" ) );//true

    /*3.反向类（负向类）： ^
        * 反向类意思是不属于某类的内容
        * 例如正则表达式： [^abc] ：含意是，不是字符a或b或c的内容
     */
    //只要有任何一个字符不是a或者b或者c，就满足条件
    console.log ( /[^abc]/.test ( "1abacbc" ) );//true
    console.log ( /[^abc]/.test ( "aaaabbbbccccc" ) );//false
    console.log ( /[^abc]/.test ( "aaaabbbbccccce" ) );//true
```



## 1.4-范围类

![](day06.assets/0901.jpg)

```javascript
//需求：使用字符类匹配数字
    // 正则表达式: [0123456789] : 含义是，有任何数字的内容
    //弊端：表达式冗余，假如我要匹配字母，那就要写 [abcdefg...........xyz],非常麻烦
    //如何解决冗余问题? ——使用范围类
    console.log ( /[0123456789]/.test ( "1avcsvs" ) );//true
    console.log ( /[0123456789]/.test ( "aaaaa" ) );//false

    /*1.范围类：   -
         [0-9] : 含义是， 0-9之间的任意字符
         [a-z]: 含义是，a-z之间的任意字符
         [A-Z]:含义是，A-Z之间的任意字符
     * 注意点
        a.范围类是一个闭区间，  [a-z]，这个范围包含字符a和z本身
        b.在[]内部是可以连写的， [0-9a-zA-Z] : 含义是，包含数字0-9，或者a-z，或者A-Z任意字符
        c. -右边一定要大于左边，例如 [5-8],这是合法的表示5-8之间的数字，不能写[8-5],程序会报错（正则语法错误）
     */

    //示例1
    console.log ( /[0-9]/.test ( "1acasdas" ) );//true  只要有数字就满足
    console.log ( /[0-9]/.test ( "acasdas" ) );//false
    //示例2
    console.log ( /[a-z]/.test ( "a6666ABC" ) );//true  只要有任何小写字母就满足
    console.log ( /[a-z]/.test ( "6666ABC" ) );//false
    //示例3
    console.log ( /[A-Z]/.test ( "Aa6666" ) );//true  只要有任何大写字母就满足
    console.log ( /[A-Z]/.test ( "a6666" ) );//false
    //示例4
    console.log ( /[0-9a-zA-Z]/.test ( "a.........[][]]" ) );//true  只要有任何字母字符或数字字符就满足
    console.log ( /[0-9a-zA-Z]/.test ( "+-*/......[]" ) );//false
    //示例5： 匹配数字 0-9 范围字符 或 - 字符
    //解决方案：在最后面写上 -
    console.log ( /[0-9-]/.test ( "-abcdefh" ) );//
```



## 1.5-预定义类



![](day06.assets/1001.jpg)

```javascript
/*预定义类： 正则表达式提供好的用来匹配常见的字符类
         预定义类           等价类                                     含义
             .                 [^\r\n]                         除了回车和换行之外的所有字符
           \d                 [0-9]                           数字字符
           \D                 [^0-9]                         非数字字符
           \s                 [\f\n\r\t\v]                    空白字符
           \S                 [^\f\n\r\t\v]                  非空白字符
           \w                 [a-zA-Z_0-9]                单词字符（字母、下划线、数字）
           \W                 [^a-zA-Z_0-9]              非单词字符
     */

    //1.  . 除了回车和换行之外的所有字符
    console.log ( /./.test ( "\r\n" ) );//false
    console.log ( /./.test ( "" ) );//false 空字符
    console.log ( /./.test ( " " ) );//true 空格字符
    console.log ( /./.test ( "\t爱你么么哒" ) );//true

    //2. \d   数字字符(只要有数字即可)
    console.log ( /\d/.test ( "123abc" ) );//true
    console.log ( /\d/.test ( "abc" ) );//false

    //3. \D  非数字字符（只要没有数字即可）
    console.log ( /\D/.test ( "123abc" ) );//true
    console.log ( /\D/.test ( "123" ) );//false

    //4.  \s   空白字符(只要有空白字符即可)
    console.log ( /\s/.test ( "\nabc" ) );//true
    console.log ( /\s/.test ( "abc" ) );//false

    //5.  \S  非空白字符（只要有非空白字符即可）
    console.log ( /\S/.test ( "\nabc" ) );//true
    console.log ( /\S/.test ( "abc" ) );//true
    console.log ( /\S/.test ( "" ) );//false
    console.log ( /\S/.test ( "\t\n" ) );//false

    //6  \w  单词字符（只要有字母、数字、下划线即可）
    console.log ( /\w/.test ( "abc123_中国" ) );//true
    console.log ( /\w/.test ( "中国" ) );//false

    //7  \W 非单词字符（只要有除字母、数字、下划线之外的任意字符即可）
    console.log ( /\W/.test ( "abc123_中国" ) );//true
    console.log ( /\W/.test ( "中国" ) );//true
    console.log ( /\W/.test ( "abc123_" ) );//false
```



## 1.6-边界

* `严格匹配:  ^字符串$`
  * 例如：  ^abc$ : 含义是，字符串必须以a开头，中间必须是b，结尾必须是c
    * 满足该条件的只有一个字符串： abc

![](day06.assets/1101.jpg)



```javascript
/*边界：正则表达式提供了几个常用的边界匹配字符
    边界字符            含义
      ^                  以xxxx开头
      $                  以xxxx结束
      \b                  单词边界
      \B                  非单词边界
     */

    //1.  ^  以xxxx开头
    /*容易混淆的知识点： 元字符的含义并不是只有一个
    [^] : 负向类，有取反的意思。 例如[^abc] : 不包含abc的任意字符
    /^/:边界，以xxxx开头。  例如/^\d/ : 以数字开头的任意字符
     */
    //1.1 /^abc/ ： 以a开头，后面是bc的字符  （不是以abc开头，虽然最终结果一样，但是含义不同）
    console.log ( /^abc/.test ( "a" ) );//false
    console.log ( /^abc/.test ( "abc" ) );//true
    console.log ( /^abc/.test ( "abc123" ) );//true

    //1.2    /^\d/ ： 以任意数字开头的任意字符
    console.log ( /^\d/.test ( "1abc" ) );//true
    console.log ( /^\d/.test ( "a1bc" ) );//false
    //1.3  /^\db/ :   以任意数字开头，后面是b的任意字符
    console.log ( /^\db/.test ( "2babc" ) );//true
    console.log ( /^\db/.test ( "2b" ) );//true
    console.log ( /^\db/.test ( "2abc" ) );//false

    //2.  $  以xxxx结束

    //2.1  /b$/   : 结尾是b的任意字符
    console.log ( /b$/.test ( "b" ) );//true
    console.log ( /b$/.test ( "abc" ) );//false
    console.log ( /b$/.test ( "acb" ) );//true

    //2.2  /^ab$/ : 以a开头 + 以b结尾的字符  （言外之意：只能是ab）
    console.log ( /^ab$/.test ( "ab" ) );//true
    console.log ( /^ab$/.test ( "acb" ) );//false

    //2.3 /^a\db$/ : 以a开头  +  任意数字 + 以b结尾的字符
    console.log ( /^a\db$/.test ( "ab" ) );//false
    console.log ( /^a\db$/.test ( "a1b" ) );//true
    console.log ( /^a\db$/.test ( "a123b" ) );//false
    console.log ( /^a\db$/.test ( "a1c23b" ) );//false

    //3.  \b  单词边界(晦涩难懂，用的不多)
    /*单词：  由\w(字母数组下划线)组成的一串字符
    边界：指的是某一个位置，而不是字符
     */
    //将单词is替换成XX
    console.log ( "this is a girl".replace ( /\bis/, "XX" ) )// this XX a girl

    //4. \B 非单词边界
    //将非单词is替换成XX
    console.log ( "this is a girl".replace ( /\Bis/, "XX" ) )// thXX is a girl
```



## 1.7-量词



![](day06.assets/1201.jpg)



```javascript
/需求：匹配一个连续出现10次数字的字符
    //正则表达式:   /\d\d\d\d\d\d\d\d\d\d/
    //弊端：表达式冗余    解决方案：使用量词
    console.log ( /\d\d\d\d\d\d\d\d\d\d/.test ( "1234567abc" ) );//false
    console.log ( /\d\d\d\d\d\d\d\d\d\d/.test ( "1234567890abc" ) );//true

    /*量词： 表示字符出现的数量

    量词                  含义
    ?                       出现零次或一次（最多出现一次）
    +                       出现一次或多次（至少出现一次）
    *                       出现零次或多次（任意次）
    {n}                     出现n次
    {n,m}                  出现n-m次
    {n,}                     出现至少n次（>=n）
     */

    //需求：匹配一个连续出现10次数字的字符
    console.log ( /\d{10}/.test ( "1234567abc" ) );//false
    console.log ( /\d{10}/.test ( "1234567890abc" ) );//true
```



## 1.8-分组



![](day06.assets/1301.jpg)



```javascript
/*1. ()   这个元字符有三个含义
            a.分组：使量词作用于分组
                * 量词只能作用于一个字符，如果想作用与多个字符，就要使用分组（将多个字符当成一组）
            b.提升优先级：通常与元字符 | 一起使用
            c.反向引用
      2. |   或
            * | 默认作用于两边的所有字符，如果只想作用与指定字符，则可以使用() 来提升优先级
     */

    //1. 需求： 匹配连续出现三次love的字符串

    //1.错误写法:  /love{3}/  , 含义： lov + e{3}
    console.log ( /love{3}/.test ( "lovelovelove" ) );//false
    console.log ( /love{3}/.test ( "loveee" ) );//true
    console.log ( /love{3}/.test ( "loveeeabc" ) );//true
    //2.正确做法：使用分组   /(love){3}/
    console.log ( /(love){3}/.test ( "lovelovelove" ) );//true
    console.log ( /(love){3}/.test ( "loveee" ) );//false

    //2. 需求：匹配 love 或者 live
    //1.错误写法:  /lo|ive/  ,含义：  lo  或者  ive

    console.log ( "I love you".replace ( /lo|ive/, "X" ) );// I Xve you
    console.log ( "I live you".replace ( /lo|ive/, "X" ) );// I lX you

    //2.正确写法： /l(o|i)ve/, 含义：匹配love 或者 live

    console.log ( "I love you".replace ( /l(o|i)ve/, "X" ) );// I X you
    console.log ( "I live you".replace ( /l(o|i)ve/, "X" ) );// I X you

    //3.需求：将  yyyy-mm-dd 格式时间替换成  dd/mm/yyyy格式
    //例如：  2018-10-25  替换成 20/10/2018

    /*
    /\d{4}-\d{2}-\d{2}/  : 含义  匹配四个数字-两个数字-两个数字  格式的字符串
    /(\d{4})-(\d{2})-(\d{2})/  : 含义  匹配四个数字-两个数字-两个数字  格式的字符串,并且按照顺序
  来捕获每一个()中匹配的内容，存入一个变量中 $1  $2  $3………………
     */
    console.log ( "2018-10-25".replace ( /\d{4}-\d{2}-\d{2}/, "$3/$2/$1" ) );//  $3/$2/$1
    console.log ( "2018-10-25".replace ( /(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1" ) );//  25/10/2018
    //分组提取：使用RegExp的静态属性也可以单独把每一个分组提取出来
    console.log ( RegExp.$1 );
    console.log ( RegExp.$2 ) ;
    console.log ( RegExp.$3 );
```



## 1.9-修饰符

```javascript
/*修饰符：影响整个正则规则的特殊符号
        书写位置：  /pattern/modifiers(修饰符)
        i (intensity)：大小写不敏感（不区分大小写）
        g (global) : 全局匹配
        m(multiple) : 检测换行符，使用较少，主要影响字符串的开始^与结束$边界
     */
    //1.   i：不区分大小写
    var str = 'ABCabcdefgaaaAAA';
    console.log ( str.replace ( /a/, "X" ) );//ABCXbcdefgaaaAAA   //默认区分大小写
    console.log ( str.replace ( /a/i, "X" ) );//XBCabcdefgaaaAAA

    //2.  g:全局匹配
    var str = 'ABCabcdefgaaaAAA';
    console.log ( str.replace ( /a/, "X" ) );//ABCXbcdefgaaaAAA   //默认匹配第一个就停止
    console.log ( str.replace ( /a/g, "X" ) );//ABCXbcdefgXXXAAA   //默认匹配第一个就停止
    //修饰符可以同时使用多个
    console.log ( str.replace ( /a/ig, "X" ) );//XBCXbcdefgXXXXXX

    //3. m:检测换行符    主要针对边界^与$
    //需求：将下列字符串中每一行开头的字符变成0
    var str = "aascdascd\nwebdfbdfbdfbfd\ngcsdfcwdfwfwe";
    console.log ( str );//虽然在控制台看到三行字符串，实际上代码中每一行只是一个换行符\n
    console.log ( str.replace ( /^\w/g, "0" ) );//错误    只能替换第一个字符
    /*注意不要漏掉了全局匹配g*/
    console.log ( str.replace ( /^\w/gm, "0" ) );//正确    能替换每一行第一个字符，m能检测换行符把\n后i面字符作为单独一行
```





## 课后了解-正则表达式test与exec方法介绍



```javascript
//正则表达式对象RegExp有两个常用方法： test    exec

    /*1.RegExp.prototype.text(str)
    作用：检测参数str是否满足正则表达式的匹配规则
    返回值：true 可以匹配   false：不能匹配
     */
    //示例：检测一个字符串中有没有单词字符
    console.log ( /\w/.test ( "a" ) );//true
    console.log ( /\w/.test ( "=" ) );//false

    /*1.RegExp.prototype.exec(str)
    作用：查看正则表达式匹配str的结果（是第几个字符满足匹配规则的，是哪个字符满足匹配规则等）
    返回值：null(无法匹配)   或者  数组（存放匹配信息）
        返回值数组
            特点：默认情况下，每一次调用exec只会返回第一个匹配的字符串信息，如果想要返回所有匹配信息
                a.需要设置正则表达式为全局匹配
                b.需要执行多次exec方法
           属性介绍
                index:匹配字符的下标
                下标：0：匹配字符
                        1-n：后面的下标只对()分组有效，没有分组则数组只有一个元素
     */

    //示例1：找出第一个匹配字符中包含  数字+单词 + 单词字符的内容
    //默认：只能找到第一个匹配的字符
    var str = "1aasjdg2bbjahsgd3cc";
    var reg = /\d\w\w/;
    var resArr = reg.exec ( str );
    console.log ( resArr );//["1aa", index: 0, input: "1aasjdg2bbjahsgd3cc", groups: undefined]

    //示例2：找出所有匹配字符中包含   数字+单词 + 单词字符的内容
    var str = "1absjdg2cdjahsgd3ef";
    var reg = /\d\w\w/g;//需要设置全局匹配

    var resArr = reg.exec ( str );
    // console.log ( resArr );//["1ab", index: 0, input: "1absjdg2cdjahsgd3ef", groups: undefined]
    // //每一次匹配之后，reg会记录当前已经匹配的字符，下一次再执行exec的时候就会往后面匹配
    // resArr = reg.exec(str);
    // console.log ( resArr );//["2cd", index: 0, input: "1absjdg2cdjahsgd3ef", groups: undefined]
    // resArr = reg.exec(str);
    // console.log ( resArr );//["3ef", index: 0, input: "1absjdg2cdjahsgd3ef", groups: undefined]

    //以上代码可以简写成
    while(resArr){//只要resArr存在，就继续执行exec
        console.log ( resArr );
        resArr = reg.exec(str);
    };

    //示例3：如果正则有分组，则数组从1下标开始获取分组对应的字符
    var reg1 = /\d(\w)(\w)/;
    console.log ( reg1.exec ( str ) );//["1ab", "a", "b", index: 0, input: "1absjdg2cdjahsgd3ef", groups: undefined]
```



## 课后了解-正则表达式贪婪模式与非贪婪模式



贪婪模式与非贪婪模式一般用于量词

* 贪婪模式：正则表达式在匹配成功的前提下，尽可能多的匹配（默认模式）
* 非贪婪模式:正则表达式匹配成功的前提下，尽可能少的匹配（在量词后面加上 ?）

![](day06.assets/1801.jpg)



```javascript
//贪婪模式与非贪婪模式一般用于量词

    //1.贪婪模式：正则表达式在匹配成功的前提下，尽可能多的匹配

    var reg = /\d{3,6}/;//匹配3-6位数字

    console.log ( "1234567890".replace ( reg, "X" ) );//X7890   (正则表达式会匹配6位数字)

    //2.非贪婪模式:正则表达式匹配成功的前提下，尽可能少的匹配
    //语法：在量词后面加上 ?

    var reg1 = /\d{3,6}?/;//匹配3-6位数字
    console.log ( "1234567890".replace ( reg1, "X" ) );//X4567890   (正则表达式会匹配3位数字)
```





# 02-正则的应用场景(掌握)



## 1.1-string对象的方法



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<script>
    /*本小节知识点：重新学习string对象的常用方法
    1.复习string对象常用方法： （1）indexOf  (2)lastIndexOf (3)replace  (4)split
    2.replace
    3.split
    4.search
    5.march
     */

    //1.复习string对象常用方法

    //1.1 indexOf:获取某一个字符第一次出现的下标（判断一个字符串在一个另一个字符串中）
    var str = 'abcdefgabcd';
    console.log ( str.indexOf ( "b" ) );//1  如果存在则返回下标
    console.log ( str.indexOf ( "z" ) );//-1  如果不存在则返回固定值-1

    //1.2 lastIndexOf：获取某一个字符最后一次出现的下标
    var str = 'abcdefgabcd';
    console.log ( str.lastIndexOf ( "b" ) );//8  如果存在则返回下标
    console.log ( str.lastIndexOf ( "z" ) );//-1  如果不存在则返回固定值-1

    //2 replace:替换字符串
    var str = 'abcdefgabcdbbbbb';
    console.log ( str.replace ( "b", "X" ) );//aXcdefgabcdbbbbb   默认只能替换第一个
    //如果想替换多个，可以使用正则
    console.log ( str.replace (/b/g, "X" ) );//aXcdefgaXcdXXXXX

    //2.1 把所有逗号,替换成.
    var str = 'abc,efg,hij,klm';
    console.log ( str.replace ( /,/g, "." ) );

    //2.2 去掉字符串中所有空格
    var str = '   safga  sdv  dsfgs    ';
    console.log ( str );
    console.log ( str.trim () );//系统自带的trim方法只能去掉左右空格,无法去掉中间
    //去掉所有空格思路：使用正则全局匹配空格`\s`,替换成空字符
    console.log ( str.replace ( /\s/g, "" ) );


    //3 split：以指定分隔符分隔字符串
    var str = '张三|李四|王五';
    console.log ( str.split ( "|" ) );//["张三", "李四", "王五"]  返回值一定数组
    //这个方法有局限性：例如将以下字符串的名字分隔出来
    var str = '张三100李四200王五';
    console.log ( str.split ( "100" ) );//["张三", "李四200王五"]   无法实现
    //使用正则表达式，可以让字符串的方法变得更加强大
    console.log ( str.split ( /\d{3}/ ) );// ["张三", "李四", "王五"]


    //4.search:返回第一次和正则匹配的索引，如果没有则返回-1
    //需求：找出字符串第一个数字出现的下标
    //indexOf方法不支持正则
    var str = 'abcdefg100xyz';
    console.log ( str.search ( /\d/g ) );//7   此方法会忽略全局匹配g

    //5.match:提取字符串中与正则表达式相匹配的文本
    var str = 'abcdefg100xyzabc';
    //返回值是数组,找不到则返回null
    console.log ( str.match ( /a/ ) );//["a", index: 0, input: "abcdefg100xyzabc", groups: undefined]
    console.log ( str.match ( /a/g ) );// ["a", "a"]    此方法支持全局匹配g

    //5.1  提取工资
    var str = '张三:1000,李四:5000,王五:8000';
    var arr = str.match(/\d+/g);
    console.log ( arr );//["1000", "5000", "8000"]

    //5.2 提取邮箱的每一个部分
     var str = "5201314@qq.com";
     var reg = /(\w+)@(\w+)\.(\w+)/g;
     var array = str.match(reg);
    console.log ( array );
    //获取分组的数据  ()是分组
     console.log(RegExp.$1);
     console.log(RegExp.$2);
     console.log(RegExp.$3);
</script>
</body>
</html>
```



## 1.2-验证汉字



```javascript
/*本小节知识点：如何验证是否包含汉字？
    1.汉字：在js中，汉字以Unicode编码表示，汉字范围 [\u4e00-\u9fa5]
    2.验证汉字正则：   /[\u4e00-\u9fa5]/
     */

    //1.示例
    console.log ( /[\u4e00-\u9fa5]/.test ( "safvsagf" ) );//false
    console.log ( /[\u4e00-\u9fa5]/.test ( "safvsagf我爱你" ) );//true

    //2.示例：验证中文姓名  （以汉字开头，2-4位）
    console.log(/^[\u4e00-\u9fa5]{2,4}$/.test('保健坤'));//true
    console.log(/^[\u4e00-\u9fa5]{2,4}$/.test('隔壁老王'));//true
    console.log(/^[\u4e00-\u9fa5]{2,4}$/.test('黑马程序员'));//false
```



## 1.3-QQ号验证

* QQ号正则: `/^[1-9]\d{4,10}$/`
  * 不能以0开头
  * 5-11位



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    
<input id="txt" type="text" placeholder="请输入qq号码">
<script>
    // qq号
    // 1.不能以0开头
    //2. 5-11位

    //1.获得要操作的对象
    var txt= document.getElementById("txt");
    //2.给事件源注册事件
    txt.onblur = function (){
        var value = txt.value;// 任何语言当中，只要是用户输入的内容，都是字符串类型
        if(/^[1-9]\d{4,10}$/.test(value)){
            alert("输入的QQ号码正确");
        }else {
            alert("输入错误");
        }
    }
</script>
</body>
</html>
```



## 1.4-手机号验证(中国)



* 手机正则: `/^(13[0-9]|14[57]|15[0-9]|17[067]|18[0-9])\d{8}$/`

![1559235688227](day06.assets/1559235688227.png)



```javascript
// 手机是11位
    // 130    012联通  3 电信 456789移动
    // 147    145 147移动的
    // 15     150移动  153电信  155 156 联通的  15789 移动的
    // 17     170  177 176
    // 18     18 0123 移动  185 186联通  187 188移动  189 电信
```



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<div class="container">
    <label>手机号</label><input type="text" id="txt"><span></span><br/>
</div>
<script>
    // 手机是11位
    // 130    012联通  3 电信 456789移动
    // 147    145 147移动的
    // 15     150移动  153电信  155 156 联通的  15789 移动的
    // 17     170  177 176
    // 18     18 0123 移动  185 186联通  187 188移动  189 电信
    
    
    //1.获得要操作的对象
    var txt= document.getElementById("txt");
    //2.给事件源注册事件
    txt.onblur = function (){
      var value = txt.value;// 任何语言当中，只要是用户输入的内容，都是字符串类型
      if(/^(13[0-9]|14[57]|15[0-9]|17[067]|18[0-9])\d{8}$/.test(value)){
            alert("输入的手机号码正确");
      }else {
        alert("输入错误");
      }
    }
</script>
</body>
</html>
```



## 1.5-座机号码(中国)



* 座机正则:`/^0\d{2,3}[-]\d{7,8}$/`
  * 前面区号(3到4位数字)
    * 010 021
    * 黄冈0713  深圳0755
  * 后面号码（7到8位数字）



```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
<div class="container">
  <label>座机</label><input type="text" id="txt"><span></span><br/>
</div>
<script>
  // 03--4   8   7
  // 010  020-63332888    021
  // 0713  大黄冈
  
  var txt = document.getElementById("txt");
  txt.onblur = function (){
    var value = txt.value;
    if(/^0\d{2,3}[-]\d{7,8}$/.test(value)){
      alert("输入正确");
    }else {
      alert("输入错误");
    }
  }
</script>
</body>
</html>
```



## 1.6-验证姓名



* 姓名要求：2-4位中文字
  * `/^[\u4e00-\u9fa5]{2,4}$/`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
<div class="container">
  <label>姓名</label><input type="text" id="txt"><span></span><br/>
</div>
<script>
  
  // 2--6
  var txt = document.getElementById("txt");
  txt.onblur = function (){
       var value = txt.value;
       if(/^[\u4e00-\u9fa5]{2,4}$/.test(value)){
         alert("输入正确");
       }else {
         alert("输入错误");
       }
  }

</script>
</body>
</html>
```



## 1.7-验证邮箱

* 邮箱正则:`/^\w+[@]\w+\.\w+(\.\w+)?$/`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
<div class="container">
  <label>邮箱</label><input type="text" id="txt"><span></span><br/>
</div>
<script>
  // qq  baidu
  // liud_20ehua@163.com   .com  .cn .gov  .edu   .net
  // *  >=0   + >=1   ? 0或1次
  //
  var txt = document.getElementById("txt");
  txt.onblur = function () {
    var value = txt.value;
    if (/^\w+[@]\w+\.\w+(\.\w+)?$/.test(value)) {
      alert("邮箱正确");
    } else {
      alert("错误");
    }
  }

</script>
</body>
</html>
```



## 常用正则表达式总结



* 传送门:<https://www.cnblogs.com/fozero/p/7868687.html>

### 比较常用



* 1.Email地址：`^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$`
* 2.手机号码：`^(13[0-9]|14[57]|15[0-9]|17[067]|18[0-9])\d{8}$`
* 3.国内电话号码(0511-4405222、021-87888822)：`^0\d{2,3}[-]\d{7,8}$`
* 4.身份证号( *位、* 位数字)：`^\d{* }|\d{* }$`
* 5.密码强度
  * 只有大小写字母:`^([a-z].*[A-Z])|([A-Z].*[a-z])$`
  * 大小写字母与数字：`^([a-z].*[0-9])|([A-Z].*[0-9])|[0-9].*[a-zA-Z]$`
  * 大小写字母+数字+下划线：`^[A-Za-z0-9]+[_][A-Za-z0-9]*`
* 6.电话号码("XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX)
  * `^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$`
* 7.域名：`[a-zA-Z0-9][-a-zA-Z0-9]{0,* }(/.[a-zA-Z0-9][-a-zA-Z0-9]{0,* })+/.?`
* 8.InternetURL：`[a-zA-z]+://[^\s]* 或 ^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$`

### 可能会用到

* 禁止输入含有~的字符：[~\x* ](#fn_~\x* )+ 三、特殊需求表达式
* Email地址：^\w+([-+.]\w+)*@\w+([-.]\w+)*.\w+([-.]\w+)*$
* 域名：[a-zA-Z0-9][-a-zA-Z0-9]{0, *}(/.[a-zA-Z0-9][-a-zA-Z0-9]{0,* })+/.?
* InternetURL：[a-zA-z]+://[\s](#fn_\s) *或 ^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$
* 手机号码：^( *[0-9]|* [5|7]| *[0|1|2|3|5|6|7|8|9]|* [0|1|2|3|5|6|7|8|9])\d{8}$
* 电话号码("XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX)：^((\d{3,4}-)|\d{3.4}-)?\d{7,8}$
* 国内电话号码( - *2、* 1- )：\d{3}-\d{8}|\d{4}-\d{7}
* 身份证号( *位、* 位数字)：^\d{ *}|\d{* }$
* 短身份证号码(数字、字母x结尾)：^([0-9]){7, *}(x|X)?$ 或 ^\d{8,* }|[0-9x]{8, *}|[0-9X]{8,* }?$
* 帐号是否合法(字母开头，允许5- *字节，允许字母数字下划线)：^[a-zA-Z][a-zA-Z0-9_]{4,* }$
* 密码(以字母开头，长度在6~ *之间，只能包含字母、数字和下划线)：^[a-zA-Z]\w{5,* }$
* 强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8- *之间)：^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,* }$
* 日期格式：^\d{4}-\d{1,2}-\d{1,2}
* 一年的 *个月(* ～ *和1～* )：^(0?[1-9]|1[0-2])$
* 一个月的 *天(* ～ *和1～* )：^((0?[1-9])|((1|2)[0-9])| *|* )$
* 钱的输入格式：
* 1.有四种钱的表示形式我们可以接受:" 0. *" 和 "* , *0.* ", 和没有 "分" 的 " 0" 和 " *,* 0"：^[1-9][0-9]*$
* 2.这表示任意一个不以0开头的数字,但是,这也意味着一个字符"0"不通过,所以我们采用下面的形式：^(0|[1-9][0-9]*)$
* 3.一个0或者一个不以0开头的数字.我们还可以允许开头有一个负号：^(0|-?[1-9][0-9]*)$
* 4.这表示一个0或者一个可能为负的开头不为0的数字.让用户以0开头好了.把负号的也去掉,因为钱总不能是负的吧.下面我们要加的是说明可能的小数部分：^[0-9]+(.[0-9]+)?$
* 5.必须说明的是,小数点后面至少应该有1位数,所以" *."是不通过的,但是 "* " 和 "* .2" 是通过的：^[0-9]+(.[0-9]{2})?$
* 6.这样我们规定小数点后面必须有两位,如果你认为太苛刻了,可以这样：^[0-9]+(.[0-9]{1,2})?$
* 7.这样就允许用户只写一位小数.下面我们该考虑数字中的逗号了,我们可以这样：^[0-9]{1,3}(,[0-9]{3})*(.[0-9]{1,2})?$
* 8.1到3个数字,后面跟着任意个 逗号+3个数字,逗号成为可选,而不是必须：^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$
* 备注：这就是最终结果了,别忘了"+"可以用"*"替代如果你觉得空字符串也可以接受的话(奇怪,为什么?)最后,别忘了在用函数时去掉去掉那个反斜杠,一般的错误都在这里
* xml文件：^([a-zA-Z]+-?)+[a-zA-Z0-9]+\.[x|X][m|M][l|L]$
* 中文字符的正则表达式：[\u4e* -\u9fa5]
* 双字节字符：[\x* -\xff](#fn_\x* -\xff) (包括汉字在内，可以用来计算字符串的长度(一个双字节字符长度计2，ASCII字符计1))
* 空白行的正则表达式：\n\s*\r (可以用来删除空白行)
* HTML标记的正则表达式：<(\S*?)>*>.*?</\1>|<.*? /> (网上流传的版本太糟糕，上面这个也仅仅能部分，对于复杂的嵌套标记依旧无能为力)
* 首尾空白字符的正则表达式：^\s*|\s*$或(^\s*)|(\s*$) (可以用来删除行首行尾的空白字符(包括空格、制表符、换页符等等)，非常有用的表达式)
* 腾讯QQ号：[1-9][0-9]{4,} (腾讯QQ号从 0开始)
* 中国邮政编码：[1-9]\d{5}(?!\d) (中国邮政编码为6位数字)
* IP地址：\d+.\d+.\d+.\d+ (提取IP地址时有用)
* 密码强度:
* 只有大小写字母
  * ^([a-z].*[A-Z])|([A-Z].*[a-z])$
* 大小写字母和数字
  * ^([a-z].*[0-9])|([A-Z].*[0-9])|[0-9].*[a-zA-Z]$
* 大小写字母、数字和下划线
  * ^[A-Za-z0-9]+[_][A-Za-z0-9]*