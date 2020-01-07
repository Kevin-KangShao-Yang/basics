# 今日学习目标

* [ ] 1.ajax多参数传递
* [ ] 2.jQuery使用ajax
* [ ] 3.综合案例-天知道
* [ ] 4.综合案例-聊天机器人



# 01-ajax多参数传递

* 1.多参数传递格式 : `key1=valu1&key2=value2`
  * a. 多个参数之间用 `$`符号隔开
  * b.参数之间不能有空格
* 2.post多参数传递格式与get是一致的，只是参数要放到send()方法中而已



* 接口文档1
  * 请求地址:http://acg.bakayun.cn/randbg.php
  * 请求方法：get
  * 请求参数：Type,t,https
* 接口文档2
  * 请求地址：http://www.tuling123.com/openapi/api
  * 请求方法：post
  * 请求参数：key,info
    * key的备选值
      * 2162602fd87240a8b7bba7431ffd379b
      * a618e456f0744066840ceafb6a249d9d
      * 7b1cf467c0394dd5b3e49f32663f8b29
      * 9fbb98effab142c9bb324f804be542ba
      * d7c82ebd8b304abeacc73b366e42b9ed  (氪金了)

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
    <button id="get">get发送多参数</button>
    <button id="post">post发送多参数</button>

    <script src="./hm.js"></script>
    <script>
        /*接口文档1
            请求地址:http://acg.bakayun.cn/randbg.php
            请求方法：get
            请求参数：Type,t,https

          接口文档2
            请求地址：http://www.tuling123.com/openapi/api
            请求方法：post
            请求参数：key,info
                key的备选值
                    2162602fd87240a8b7bba7431ffd379b
                    a618e456f0744066840ceafb6a249d9d
                    d7c82ebd8b304abeacc73b366e42b9ed 氪金了
                    7b1cf467c0394dd5b3e49f32663f8b29
                    9fbb98effab142c9bb324f804be542ba
        */

        document.getElementById('get').onclick = function () {
            /*多参数传递格式： key1=valu1&key2=value2
            a. 多个参数之间用 $ 隔开
            b. 参数之间不能有空格
            */
            hm.ajax({
                url: 'http://acg.bakayun.cn/randbg.php',
                method: 'get',
                data: 'Type=json&t=dfproject',
                success: function (data) {
                    console.log(data);
                }
            });
        };

        document.getElementById('post').onclick = function () {
            // post多参数传递格式与get是一致的，只是参数要放到send()方法中而已
            hm.ajax({
                url: 'http://www.tuling123.com/openapi/api',
                method: 'post',
                data: 'key=2162602fd87240a8b7bba7431ffd379b&info=你吃饭了吗',
                success: function (data) {
                    console.log(data);
                }
            });
        };




    </script>
</body>

</html>
```



# ==02-jQuery使用ajax==

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/06-Ajax/课程资料/备课代码/day03/02-jQuery使用ajax/01-jq使用ajax.html)

* 1.jQuery使用ajax : <http://jquery.cuishifeng.cn/index.html>

  * 最常用的是 :`$.ajax()`这个方法

  ![1563720576822](day03.assets/1563720576822.png)



* 2.由于jquery使用ajax的语法是固定的,我们可以将代码片段设置到vscode中,以后只需要按`ajax`这段代码就会自动出来(把下面这个代码片段复制粘贴到你的vscode代码片段即可:文件->首选项->用户代码片段->javascript.json )

  ```javascript
  "jquery to ajax": {
  		"prefix": "ajax",
  		"body": [
  			"$.ajax({",
  			"url:'',",
  			"type:'get',",
  			"dataType:'json',",
  			"data:'',",
  			"success: function(data){",
  			"}",
  			"});"
  		],
  		"description": "ajax请求"
  	},
  ```

  ```html
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  
  <body>
    <input type="button" value="get方法" class="get" />
    <input type="button" value="post方法" class="post" />
    <input type="button" value="ajax方法" class="ajax" />
  </body>
  
  </html>
  <script src="./libs/jquery-1.12.4.min.js"></script>
  <script>
    $(function () {
      /*
        请求地址:http://acg.bakayun.cn/randbg.php
        请求方法：get
        请求参数：Type,t,https
      */
      $('.get').click(function () {
        $.get(
          'http://acg.bakayun.cn/randbg.php',
          'Type=json&t=dfproject',
          function (backData) {
            //json数据
            // console.log(backData)
            //转成js对象
            console.log(JSON.parse(backData));
          }
        );
        //参数也可以写到对象中，jq会自动帮我们处理
        // $.get(
        //   'http://acg.bakayun.cn/randbg.php',
        //   {
        //     Type: 'json',
        //     t: 'dfproject'
        //   },
        //   function(backData) {
        //     // console.log(backData)
        //     console.log(JSON.parse(backData))
        //   }
        // )
      })
  
      // post方法
      /*
          请求地址：http://www.tuling123.com/openapi/api
          请求方法：post
          请求参数：key,info
          key的备选值
          2162602fd87240a8b7bba7431ffd379b
          a618e456f0744066840ceafb6a249d9d
          d7c82ebd8b304abeacc73b366e42b9ed 氪金了
          7b1cf467c0394dd5b3e49f32663f8b29
          9fbb98effab142c9bb324f804be542ba
    */
      $('.post').click(function () {
        $.post(
          'http://www.tuling123.com/openapi/api',
          { key: '2162602fd87240a8b7bba7431ffd379b', info: '你今天吃饭了吗？' },
          function (backData) {
            console.log(backData)
          }
        )
      })
  
      // ajax方法 : 最常用
      $('.ajax').click(function () {
        $.ajax({
          url: 'http://acg.bakayun.cn/randbg.php',
          type: 'get',
          data: {
            Type: 'json',
            t: 'dfproject'
          },
          success: function (backData) {
            // console.log(backData)
            console.log(JSON.parse(backData))
          }
        });
  
        // Post请求
        $.ajax({
          url: 'http://www.tuling123.com/openapi/api',
          type: 'post',
          data: {
            key: '2162602fd87240a8b7bba7431ffd379b',
            info: '我还可以调用你几次？'
          },
          success: function (backData) {
            console.log(backData)
          }
        })
      });
    });
  </script>
  ```

  

# 03-案例-天知道

## 1.1-项目分析

![](day03.assets/0001.gif)

* 布局分析

  * wrap盒子模型

    * search_form上面搜索盒子

      * logo
      * 搜索框 + 搜索按钮
      * 热门城市列表

    * weather_list天气列表

      * 天气图片

      * 温度

      * 城市和日期

        

* 需求分析

  * 1.点击搜索按钮，加载用户输入的城市天气
  * 2.点击热门城市列表，加载对应列表城市的天气
  * 3.loading加载效果
  * 4.页面一加载默认请求第一个热门城市

* 接口文档

  * 获取 json 格式的天气

    ​    请求地址：http://wthrcdn.etouch.cn/weather_mini

    ​    示例：http://wthrcdn.etouch.cn/weather_mini?city=深圳

    ​    请求方法：get

    ​    请求参数：city

    ​    参数名 参数说明  备注

    ​    City  查询的城市名  不能为空，不能写错

## 1.2-搜索城市

* 思路分析
  * 搜索按钮注册点击事件
  * 1.获取输入框文本
  * 2.ajax请求数据
  * 3.响应数据之后，使用模板引擎渲染到页面

```javascript
$('.input_sub').on('click', function () {
      //1.获取输入文本
      var city = $('.input_txt').val();
      //2.ajax请求数据
      $.ajax({
        url: 'http://wthrcdn.etouch.cn/weather_mini',
        type: 'get',
        dataType: 'json',
        data: {
          city: city
        },
        success: function (data) {
          	console.log(data);
            //3.模板引擎渲染数据
            var htmlStr = template('weather', data);
            $('.weather_list').html(htmlStr);
        }
      });
    });
```



* 天气列表模板引擎

```javascript
<script type="text/html" id="weather">
      {{each data.forecast}}
      <li>
          <div class="info_type">
            <!-- 小雨 -->
            {{ if $value.type.indexOf('小雨') != -1 }}
            <span class="iconfont">&#xe932;</span>
            <!-- 雨 -->
            {{ else if $value.type.indexOf('雨') != -1 }}
            <span class="iconfont">&#xe931;</span>
            <!-- 晴 -->
            {{ else if $value.type.indexOf('晴') != -1 }}
            <span class="iconfont">&#xe933;</span>
            <!-- 雨夹雪 -->
            {{ else if $value.type.indexOf('雨夹雪') != -1 }}
            <span class="iconfont">&#xe934;</span>
            <!-- 阴 -->
            {{ else if $value.type.indexOf('阴') != -1 }}
            <span class="iconfont">&#xe92d;</span>
            <!-- 风 -->
            {{ else if $value.type.indexOf('风') != -1 }}
            <span class="iconfont">&#xeb8c;</span>
            <!-- 雪 -->
            {{ else if $value.type.indexOf('雪') != -1 }}
            <span class="iconfont">&#xeb87;</span>
            <!-- 多云 -->
            {{ else if $value.type.indexOf('多云') != -1 }}
            <span class="iconfont">&#xeb79;</span>
            <!-- 雷 -->
            {{ else if $value.type.indexOf('雷') != -1 }}
            <span class="iconfont">&#xeb77;</span>
            <!-- 冰雹 -->
            {{ else if $value.type.indexOf('冰雹') != -1 }}
            <span class="iconfont">&#xeb76;</span>
            <!-- 雾霾 -->
            {{ else if $value.type.indexOf('雾霾') != -1 }}
            <span class="iconfont">&#xeb75;</span>
            {{ /if}}
          </div>
          <div class="info_temp">高<b>{{ $value.high.split(' ')[1] }}</b><br>低 {{ $value.low.split(' ')[1] }}</div>
          <div class="info_date"><b>{{ data.city }}</b><span>{{ $value.date }}</span></div>
        </li>
      {{/each}}
      </script>
```



## 1.3-热门城市列表



* 常规思路
  * 给a标签列表注册点击事件
  * 1.设置输入框文本为当前点击的a标签文本
  * 2.ajax发送请求
  * 3.数据响应之后，使用模板引擎渲染到页面

```javascript
$('.hotkey').children().on('click', function () {
      //1.设置输入文本为当前点击的a标签文本
      var city = $(this).text();
      $('.input_txt').val(city);
      //2.ajax请求数据
      $.ajax({
        url: 'http://wthrcdn.etouch.cn/weather_mini',
        type: 'get',
        dataType: 'json',
        data: {
          city: city
        },
        success: function (data) {
          console.log(data);
          var htmlStr = template('weather', data);
          $('.weather_list').html(htmlStr);
        }
      });
    });
```



* 另一种思路
  *  1.设置输入框的文本 为 当前点击的a标签文本
  * 2.手动触发搜索按钮事件 （逻辑已经写好，就是获取输入框文本请求数据）

```javascript
/* 2.点击热门城市列表
         2.1 设置输入框的文本 为 当前点击的a标签文本
         2.2 手动触发搜索按钮事件 （逻辑已经写好，就是获取输入框文本请求数据） 
     */
    $('.hotkey').children().on('click', function () {
      //1. 设置输入框文本
      $('.input_txt').val($(this).text());
      //2. 手动触发
      $('.input_sub').trigger('click');
    });
```



## 1.4-loading加载效果

* 思路分析
  * （1） ajax发送请求之前 ： 显示loading动画（无限重复的动画，一般用css3的animation实现）
  * （2）ajax数据响应之后 ： 开启setTimeout定时器延迟1s，移除动画并渲染数据



```javascript
$('.input_sub').on('click', function () {
      //一：点击按钮：显示loading效果
      $('.input_sub').addClass('loading');
      //二：移除天气列表
      $('.weather_list>li').remove();

      //1.获取输入文本
      var city = $('.input_txt').val();
      //2.ajax请求数据
      $.ajax({
        url: 'http://wthrcdn.etouch.cn/weather_mini',
        type: 'get',
        dataType: 'json',
        data: {
          city: city
        },
        success: function (data) {
          console.log(data);
          //二：数据返回之后取消loading效果(开一个定时器让用户等一会儿)
          setTimeout(function () {
            $('.input_sub').removeClass('loading');
            //3.模板引擎渲染数据
            var htmlStr = template('weather', data);
            $('.weather_list').html(htmlStr);
          }, 1000);
        }
      });
    });
```





* 补充功能：页面一加载就默认请求第一个热门城市
  * 思路：页面一加载就`主动`触发第一个热门城市a标签的点击事件

```javascript
/*3.页面一加载就默认请求第一个热门城市 */
    $('.hotkey a:eq(0)').trigger('click');
```



* 完整代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>天知道</title>
  <link rel="stylesheet" href="css/reset.css" />
  <link rel="stylesheet" href="css/iconfont.css" />
  <link rel="stylesheet" href="css/main2.css" />
  <script type="text/javascript" src="js/jquery-1.12.4.min.js"></script>
  <style>
    .tem .iconfont {
      font-size: 50px;
    }
  </style>
</head>

<body>
  <div class="wrap">
    <div class="search_form">
      <div class="logo"><img src="img/logo.png" alt="logo" /></div>
      <div class="form_group">
        <input type="text" class="input_txt" placeholder="请输入查询的天气" />
        <button class="input_sub">搜 索</button>
      </div>
      <div class="hotkey">
        <a href="javascript:;">北京</a><a href="javascript:;">上海</a><a href="javascript:;">广州</a><a
          href="javascript:;">深圳</a>
      </div>
    </div>
    <ul class="weather_list">
      <script type="text/html" id="weather">
      {{each data.forecast}}
      <li>
          <div class="info_type">
            <!-- 小雨 -->
            {{ if $value.type.indexOf('小雨') != -1 }}
            <span class="iconfont">&#xe932;</span>
            <!-- 雨 -->
            {{ else if $value.type.indexOf('雨') != -1 }}
            <span class="iconfont">&#xe931;</span>
            <!-- 晴 -->
            {{ else if $value.type.indexOf('晴') != -1 }}
            <span class="iconfont">&#xe933;</span>
            <!-- 雨夹雪 -->
            {{ else if $value.type.indexOf('雨夹雪') != -1 }}
            <span class="iconfont">&#xe934;</span>
            <!-- 阴 -->
            {{ else if $value.type.indexOf('阴') != -1 }}
            <span class="iconfont">&#xe92d;</span>
            <!-- 风 -->
            {{ else if $value.type.indexOf('风') != -1 }}
            <span class="iconfont">&#xeb8c;</span>
            <!-- 雪 -->
            {{ else if $value.type.indexOf('雪') != -1 }}
            <span class="iconfont">&#xeb87;</span>
            <!-- 多云 -->
            {{ else if $value.type.indexOf('多云') != -1 }}
            <span class="iconfont">&#xeb79;</span>
            <!-- 雷 -->
            {{ else if $value.type.indexOf('雷') != -1 }}
            <span class="iconfont">&#xeb77;</span>
            <!-- 冰雹 -->
            {{ else if $value.type.indexOf('冰雹') != -1 }}
            <span class="iconfont">&#xeb76;</span>
            <!-- 雾霾 -->
            {{ else if $value.type.indexOf('雾霾') != -1 }}
            <span class="iconfont">&#xeb75;</span>
            {{ /if}}
          </div>
          <div class="info_temp">高<b>{{ $value.high.split(' ')[1] }}</b><br>低 {{ $value.low.split(' ')[1] }}</div>
          <div class="info_date"><b>{{ data.city }}</b><span>{{ $value.date }}</span></div>
        </li>
      {{/each}}
      </script>
    </ul>
  </div>

  <script src="./js/jquery-1.12.4.min.js"></script>
  <script src="./js/template-web.js"></script>
  <script>

    /* 
    获取 json 格式的天气
    请求地址：http://wthrcdn.etouch.cn/weather_mini
    示例：http://wthrcdn.etouch.cn/weather_mini?city=深圳
    请求方法：get
    请求参数：city
    参数名	参数说明	备注
    City	查询的城市名	不能为空，不能写错

    1.搜索按钮点击事件
      1.1 获取输入框文本
      1.2 ajax请求数据 
      1.3 响应数据之后，使用模板引擎渲染到页面
     */
    $('.input_sub').on('click', function () {
      //一：点击按钮：显示loading效果
      $('.input_sub').addClass('loading');
      //二：移除天气列表
      $('.weather_list>li').remove();

      //1.获取输入文本
      var city = $('.input_txt').val();
      //2.ajax请求数据
      $.ajax({
        url: 'http://wthrcdn.etouch.cn/weather_mini',
        type: 'get',
        dataType: 'json',
        data: {
          city: city
        },
        success: function (data) {
          console.log(data);
          //二：数据返回之后取消loading效果(开一个定时器让用户等一会儿)
          setTimeout(function () {
            $('.input_sub').removeClass('loading');
            //3.模板引擎渲染数据
            var htmlStr = template('weather', data);
            $('.weather_list').html(htmlStr);
          }, 1000);
        }
      });
    });

    /* 2.点击热门城市列表
         2.1 设置输入框的文本 为 当前点击的a标签文本
         2.2 手动触发搜索按钮事件 （逻辑已经写好，就是获取输入框文本请求数据） 
     */
    $('.hotkey').children().on('click', function () {
      //1. 设置输入框文本
      $('.input_txt').val($(this).text());
      //2. 手动触发
      $('.input_sub').trigger('click');
    });

    /*3.页面一加载就默认请求第一个热门城市 */
    $('.hotkey a:eq(0)').trigger('click');
  </script>
</body>
</html>
```



## ==1.5-项目总结==

* 1.模板引擎可以写js的方法。 `str.indexOf` `str.split()` 只要语法没有写错就可以解析
* 2.天气图标需要根据天气的type来生成。（熟悉模板引擎常用语法：数组遍历，分支结构）
* 3.当两个事件的代码冗余（重复代码很多），可以考虑如何优化
  * a. 将重复代码放到函数中
  * b. 在一个事件处理函数中主动触发另一个事件处理函数 
* 4.网络请求中的loading效果思路
  * （1） ajax发送请求之前 ： 显示loading动画（无限重复的动画，一般用css3的animation实现）
  * （2）ajax数据响应之后 ： 开启setTimeout定时器延迟1s，移除动画并渲染数据



# 04-案例-机器人

## 1.1-项目分析

![](day03.assets/0002.gif)



* 1.布局分析

  * 顶部栏
    * span+img
    * 背景渐变
  * 中间内容（盒子模型）
    * ul
      * li：用户自己的
      * li:  机器人的
  * 底部栏
    * img图片
    * input文本框
    * 发送按钮

* 2.思路分析

  * 1.点击发送按钮：生成自己的聊天框
  * 2.ajax请求数据，根据响应返回的数据生成机器人的聊天框
  * 3.项目优化：数据清空与非空判断

* 3.接口文档

  > 智能机器人接口，使用需要注册，官网地址是 <http://www.turingapi.com/>

  * 请求地址：<http://www.tuling123.com/openapi/api>
  * 请求方法：post
  * 请求参数：key,info
    * 小冰姐姐：5d1b3e9b697f49f892e846b800fe9383
    * 大猪蹄子：61b8e625aec94ef292ca009040354b32
    * 黑马保健坤：8b2116b8ddb94b6681fbbef3ee9bbbce

  | 参数名 | 参数说明           | 备注     |
  | ------ | ------------------ | -------- |
  | key    | 申请的机器人 key   | 不能为空 |
  | info   | 要跟机器人聊的内容 |          |

  * 响应内容：聊天的信息

  ```javascript
  { "code": 100000, "text": "你好吗" }
  ```

* ***完整代码***

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <link rel="stylesheet" href="css/reset.css" />
  <link rel="stylesheet" href="css/main.css" />
  <script type="text/javascript" src="js/jquery-1.12.4.min.js"></script>
  <script type="text/javascript" src="js/jquery.mousewheel.js"></script>
  <script type="text/javascript" src="js/scroll.js"></script>
  <script type="text/javascript" src="js/jquery-ui.min.js"></script>
  <!-- 导入模板引擎 -->
  <script src="./js/template-web.js"></script>

  <title>聊天机器人</title>
  <style>
    img {
      width: 40px;
      height: 40px;
    }
  </style>
</head>

<body>
  <div class="wrap">
    <div class="header">
      <h3>小冰姐姐</h3>
      <img src="img/person01.png" alt="icon" />
    </div>
    <div class="main">
      <ul class="talk_list" style="top: 0px;"></ul>
      <div class="drag_bar" style="display: none;">
        <div class="drager ui-draggable ui-draggable-handle" style="display: none; height: 412.628px;"></div>
      </div>
    </div>
    <div class="footer">
      <img src="img/person02.png" alt="icon" />
      <input type="text" placeholder="说的什么吧..." class="input_txt" />
      <input type="button" value="发 送" class="input_sub" />
    </div>
  </div>

  <!-- 定义模板 -->
  <script type="text/html" id="self">
      <li class="right_word">
        <img src="img/person02.png" alt=""><span> {{text}} </span>
      </li>
    </script>

  <script type="text/html" id="sister">
      <li class="left_word">
        <img src="img/person01.png" alt=""><span> {{text}} </span>
      </li>
    </script>



  <script>
    /* 
    * 请求地址：http://www.tuling123.com/openapi/api
    * 请求方法：post
    * 请求参数：key,info
      * 5d1b3e9b697f49f892e846b800fe9383
      * 61b8e625aec94ef292ca009040354b32
      * 8b2116b8ddb94b6681fbbef3ee9bbbce
      * d7c82ebd8b304abeacc73b366e42b9ed
    */

    /*1.点击生成自己的聊天框 
    1.1 获取输入框文字
    1.2 模板引擎渲染到页面
    1.3 调用 resetui()  滚到最底部

    2.ajax请求加载姐姐的聊天框
    */
    $('.input_sub').on('click', function () {
      //1.1 获取输入框文字
      var message = $('.input_txt').val();
      //一：非空判断 ： 事件处理开始之前
      if (message.length == 0) {
        alert('说点什么吧');
        return;
      };
      //1.2 模板引擎渲染到页面
      var htmlStr = template('self', { text: message });
      $('.talk_list').append($(htmlStr));
      //1.3 滚到最底部
      resetui();

      //2.ajax请求加载姐姐的聊天框
      $.ajax({
        url: 'http://www.tuling123.com/openapi/api',
        type: 'post',
        dataType: 'json',
        data: {
          key: '8b2116b8ddb94b6681fbbef3ee9bbbce',
          info: message
        },
        success: function (data) {
          console.log(data);
          //模板引擎渲染到页面
          var htmlStr = template('sister', data);
          $('.talk_list').append($(htmlStr));
          //滚到最底部
          resetui();
          //二。数据清空： 事件处理结束之后
          $('.input_txt').val('');
        }
      });
    });
  </script>
</body>

</html>
```



## 1.2-生成自己的聊天框

* 模板

```html
 <!-- 定义模板 -->
  <script type="text/html" id="self">
      <li class="right_word">
        <img src="img/person02.png" alt=""><span> {{text}} </span>
      </li>
    </script>
```



```javascript
/*1.点击生成自己的聊天框 
    1.1 获取输入框文字
    1.2 模板引擎渲染到页面
    1.3 调用 resetui()  滚到最底部
    */
    $('.input_sub').on('click', function () {
      //1.1 获取输入框文字
      var message = $('.input_txt').val();
      //一：非空判断 ： 事件处理开始之前
      if (message.length == 0) {
        alert('说点什么吧');
        return;
      };
      //1.2 模板引擎渲染到页面
      var htmlStr = template('self', { text: message });
      $('.talk_list').append($(htmlStr));
      //1.3 滚到最底部
      resetui();
    });
```



## 1.3-生成机器人聊天框

* 模板

```html
<script type="text/html" id="sister">
      <li class="left_word">
        <img src="img/person01.png" alt=""><span> {{text}} </span>
      </li>
    </script>
```



```javascript
/*1.点击生成自己的聊天框 
    1.1 获取输入框文字
    1.2 模板引擎渲染到页面
    1.3 调用 resetui()  滚到最底部

    2.ajax请求加载姐姐的聊天框
    */
    $('.input_sub').on('click', function () {
      //1.1 获取输入框文字
      var message = $('.input_txt').val();
      //一：非空判断 ： 事件处理开始之前
      if (message.length == 0) {
        alert('说点什么吧');
        return;
      };
      //1.2 模板引擎渲染到页面
      var htmlStr = template('self', { text: message });
      $('.talk_list').append($(htmlStr));
      //1.3 滚到最底部
      resetui();

      //2.ajax请求加载姐姐的聊天框
      $.ajax({
        url: 'http://www.tuling123.com/openapi/api',
        type: 'post',
        dataType: 'json',
        data: {
          key: '8b2116b8ddb94b6681fbbef3ee9bbbce',
          info: message
        },
        success: function (data) {
          console.log(data);
          //模板引擎渲染到页面
          var htmlStr = template('sister', data);
          $('.talk_list').append($(htmlStr));
          //滚到最底部
          resetui();
          //二。数据清空： 事件处理结束之后
          $('.input_txt').val('');
        }
      });
    });
```

## 1.4-项目优化-数据清空与非空判断

* 非空判断
  * 用户输入数据之后：如果为空，则 `return`,后面代码不执行，可以减轻服务器压力提高性能
* 数据清空
  * 事件处理之后：清空输入框文本，方便下一次输入

```javascript
 /*1.点击生成自己的聊天框 
    1.1 获取输入框文字
    1.2 模板引擎渲染到页面
    1.3 调用 resetui()  滚到最底部

    2.ajax请求加载姐姐的聊天框
    */
    $('.input_sub').on('click', function () {
      //1.1 获取输入框文字
      var message = $('.input_txt').val();
      //一：非空判断 ： 事件处理开始之前
      if (message.length == 0) {
        alert('说点什么吧');
        return;
      };
      //1.2 模板引擎渲染到页面
      var htmlStr = template('self', { text: message });
      $('.talk_list').append($(htmlStr));
      //1.3 滚到最底部
      resetui();

      //2.ajax请求加载姐姐的聊天框
      $.ajax({
        url: 'http://www.tuling123.com/openapi/api',
        type: 'post',
        dataType: 'json',
        data: {
          key: '8b2116b8ddb94b6681fbbef3ee9bbbce',
          info: message
        },
        success: function (data) {
          console.log(data);
          //模板引擎渲染到页面
          var htmlStr = template('sister', data);
          $('.talk_list').append($(htmlStr));
          //滚到最底部
          resetui();
          //二。数据清空： 事件处理结束之后
          $('.input_txt').val('');
        }
      });
    });
```



## ==1.5-项目总结==



* 1.模板引擎渲染的数据对象既可以是服务器返回，也可以自己写
  * 模板引擎的本质是字符串替换

* 2.模板引擎渲染之后，并不是所有的功能都需要替换，也可以是添加
* 3.一般输入框都需要做非空判断与数据清空