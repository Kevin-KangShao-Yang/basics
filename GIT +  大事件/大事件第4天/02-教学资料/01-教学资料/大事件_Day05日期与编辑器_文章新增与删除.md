# 大事件

## 文章列表

需求: 一进到文章列表,就要显示所有类别和所有状态的文章

一进到页面相当于点击了筛选按钮.

​	注意: 一进到页面,触发筛选按钮的点击事件,那使用的文章类别是原来写死的数据, 那个所有分类里面没有value="", 那获取到的分类就是'所有分类'四个字,这样就查不到数据了.

## 文章列表 分页功能

### a.使用 twbs-pagination

> 使用较为繁琐

使用pagination分页插件.

去github搜索pagination, 点赞最多的就是了,<https://github.com/josecebe/twbs-pagination>

在页面的上方能看到一个个人主页一样的网站,点进去,这就是他的使用文档.

使用步骤:

​	1.下载,导入

​	2.去文档中查使用方法.

​	3.调用方法.

​	      

```javascript
//分页功能
//onPageClick事件,是单击页签会执行的事件.
        $('.pagination').twbsPagination({
            totalPages: 30,
            visiblePages: 5,
            onPageClick: function (event, page) {
                //console.log(event); //代表的当前点击事件.
                //console.log(page);  //代表的是当前点击的页码  
                //在这里调用 查询数据的方法, 把当前点击的页码传过去
            }
        });
```





高级用法:

需求: 根据查询出来的数据,动态的生成页签条.

```js
//backData是ajax发送请求返回的数据,  totalPage是这个返回的数据里面的总页数
var totalPages = backData.totalPage; //获取真实的总页码数.
var currentPage = $pagination.twbsPagination('getCurrentPage');
//有一个问题,就是分页插件调用destroy方法的时候,会自动的去调用onPageClick事件.所以就无限循环了.
$pagination.twbsPagination('destroy');
$pagination.twbsPagination($.extend({}, defaultOpts, {
    startPage: currentPage,
    totalPages: totalPages
}));
```

但是这里有一个问题: 就是分页插件调用这个方法destroy的时候,会自动的去执行onPageClick事件, 但是我们在这个事件里面发送ajax请求,  那ajax请求成功了,又回去执行destroy方法, 这个方法又会自动的去执行onPageClick事件,所以就一直递归下去了....

解决问题办法:  判断当前的页数 和 ajax查询的数据得到的页数是否一样,如果不一样,才去调用destroy方法从新生成页码条. 





1. 分页插件一开始也会查询一次第一页, 所以我们可以把最开始一进到页面就查询一次数据的代码给注释掉.

2. 修改开始页为1,   就不要让开始页为当前页.

      原因就是如果当前页是很大的一个数,换了条件查询后总页数都不够这个当前页的,那就有问题了.

### b.使用 JZPagination

> 但方法JS文件，简单易用，方便自己修改扩展

#### 1.介绍

一个简单实用的页码条JS生成插件

- 可以展示 完整模式 和 简单模式

![JZPagination页码条](assets/JZPagination页码条-1567917870443.jpg)

#### 2.安装教程

1. 在需要页码条的html页面 导入 JZPagination.js文件
2. 在页面上准备一个容器
   - 组件 生成  的是 文本 和 a 标签
   - 需要自己设置 样式表

#### 3.使用说明

##### 3.1 参数说明

- makePageBar(option) 
- option

| 参数名        | 说明                           | 默认值    |
| ------------- | ------------------------------ | --------- |
| pageFunc      | 翻页方法对象                   | undefined |
| pageContainer | 页码条容器 dom 或 id           | undefined |
| pgIndex       | 当前页码                       | 1         |
| pgSize        | 页容量                         | 7         |
| gpSize        | 页码组容量                     | 6         |
| roCount       | 总行数-从服务器获取            | 100       |
| simpleModel   | 简单模式 true / 完整模式 false | false     |
| isCn          | 是否中文                       | true      |



##### 3.2 页码条模式

- 简单模式：simpleModel 设置为 true （默认 是 false）

![1567850669645](assets/1567850669645-1567917870442.png)

```html
<body>
  <script src="./JZPagination.js"></script>
  <style>
        #pageBar { font-size: 14px; }
        #pageBar a, span {
            border: 1px solid #000;
            padding: 3px 10px;
            margin: 3px 2px;
            color: #000;
            background-color: whitesmoke;
            text-decoration: none;
        }
        #pageBar a:hover {
            color: #fff;
            background-color: #0094ff;
        }
        #pageBar select {
            margin: 5px;
        }
        #pageBar a.active {
            color: #fff;
            background-color: #0094ff;
        }
  </style>
  <!-- 1.页码条 容器标签 -->
  <div id='pageBar'></div>
  <script>
    // 2.页面加载完毕后 调用组件 页码条方法
    window.onload = function () {
      makePageBar({
        pageFunc: toPage,
        pageContainer: 'pageBar',
        pgIndex: 1,
        roCount: 100,
        simpleModel:true
      });
    }

    /**
     * @description: 3. 翻页方法
     * @param {string}  pageIndex - 要前往的页码
     */
    function toPage(pageIndex) {
      makePageBar({
        pageFunc: toPage,
        pageContainer: 'pageBar',
        pgIndex: pageIndex,
        roCount: 100,
        simpleModel:true
      });
    }
  </script>
</body>
```

- 完整模式：simpleModel 设置为 false

![JZPagination页码条](assets/JZPagination页码条-1567917870443.jpg)

```js
<body>
  <script src="./JZPagination.js"></script>

  <!-- 1.页码条 容器标签 -->
  <div id='pageBar'></div>

  <script>
    // 2.页面加载完毕后 调用组件 页码条方法
    window.onload = function () {
      makePageBar({
        pageFunc: toPage,
        pageContainer: 'pageBar',
        pgIndex: 1,
        roCount: 100
      });
    }

    /**
     * @description: 3. 翻页方法
     * @param {string}  pageIndex - 要前往的页码
     */
    function toPage(pageIndex) {
      makePageBar({
        pageFunc: toPage,
        pageContainer: 'pageBar',
        pgIndex: pageIndex,
        roCount: 100
      });
    }
  </script>
</body>
```

##### 3.2 中英文切换

- 默认为中文

### 

## 文章新增(article_release.html)

## 文章新增-图片预览

1.给选择图片的按钮change事件.

2.用files[0]获取选中的图片文件.

3.用URL.createObjectURL方法创建一个url出来

4.赋值给img

## 文章新增-文章类别数据获取

1.一进来文章新增页面就发送ajax请求.获取到所有的文章类别数据

2.使用模板引擎渲染, 注意的是需要id, 就要使用value属性来放id

## jedate日期选择插件

去github中搜索jeDate,点赞最多的就是.   <https://github.com/singod/jeDate>

github中的介绍不是很多, 可以点进去他的官网看文档: <http://www.jemui.com/uidoc/jedate.html>

去官网下载插件文件,导入

写结构,调用方法

+ 使用步骤：
  + 下载 jedata js 文件
  + 导入 js文件
  + 添加文本框 作为 日期选择框
  + 编写js代码 设置 日期选择框 和 日期格式

+ 案例代码：

```html
<html>
<head>
  <title></title>
  <meta charset='UTF-8' />
  <link rel="stylesheet" href="./skin/jedate.css">
  <script src="./jedate.min.js"></script>
</head>
<body>
    <input type="text" id="test03" placeholder="YYYY-MM-DD">
    <input type="button" value="获取日期" id="btnDate">
</body>
<script>
  //1.日期控件 初始化 ：指定 日期文本框，指定 日期参数（日期格式）
  jeDate("#test03", {
    format: "YYYY-MM-DD"
  });
  //2.获取 日期文本框 的 日期值  
  document.getElementById('btnDate').onclick=function(){
    console.log(document.getElementById('test03').value);
  }
</script>
</html>
```



## momentjs插件

日期格式化的插件.

去github中搜索moment,点赞最多的就是 <https://github.com/search?q=moment>

官网文档:  http://momentjs.cn/

![1567870976465](assets/1567870976465.png)

## 富文本编辑器

 ![1567871743093](assets/1567871743093.png)

+ 使用-四步骤：

  + 下载 编辑器 js 包

  + 导入 tinyMCE js 文件

    ![1567916663920](assets/1567916663920.png)

  + 导入 tinyMCE 设置 js 文件

    ![1567916683131](assets/1567916683131.png)

  + 在页面中合适位置 添加 文本域 textarea ，注意 id 要和 设置文件中的 选择器一致

+ 案例代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <!-- 1.导入 富文本编辑器 js 包 -->
    <script src="./tinymce/tinymce.min.js"></script>
    <!-- 2.写好的 编辑器 配置 js 文件 -->
    <script src="tinymcesetup.js"></script>
</head>

<body>
    <!-- 3.设置 一个 文本框，注意 设置 id -> mytextarea -->
    <textarea id="mytextarea"></textarea>
    <input type="button" value="获取内容" id='btnGet'>
</body>
<script>
document.getElementById('btnGet').onclick=function () {
    // 获取 编辑器中的内容
    var a = tinyMCE.activeEditor.getContent();
    console.log(a);

    // 设置 编辑器中的内容
    tinyMCE.activeEditor.setContent('需要设置的编辑器内容');
}
</script>
</html>
```



```
1、如果当前页面只有一个编辑器： 
获取内容：tinyMCE.activeEditor.getContent() 
设置内容：tinyMCE.activeEditor.setContent(“需要设置的编辑器内容”)

2、如果当前页面有多个编辑器（下面的“[0]”表示第一个编辑器，以此类推）： 
获取内容：tinyMCE.editors[0].getContent() 
设置内容：tinyMCE.editors[0].setContent(“需要设置的编辑器内容”)

3、获取不带HTML标记的纯文本内容： 
var activeEditor = tinymce.activeEditor; 
var editBody = activeEditor.getBody(); 
activeEditor.selection.select(editBody); 
var text = activeEditor.selection.getContent( { ‘format’ : ‘text’ } );

```

## 文章新增-点击发布



##  前台页面 - 首页顶部  (index.html)

​	

## 前台页面 - 详情页

​	

