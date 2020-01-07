# 今日学习任务



* [ ] 贪吃蛇游戏
  * [ ] 学习目的：了解面向对象的本质是对面向过程的封装



# 00-贪吃蛇游戏案例介绍

![](day05.assets/0101.gif)



## 1.1-游戏功能介绍

* 1.界面介绍
  * 地图（800*800）
  * 蛇
    * 由多节身体组成，每一节身体（20*20）
    * 蛇头颜色固定为红色，身体颜色随机
  * 食物（20*20）
    * 食物颜色随机
* 2.游戏功能流程
  * a.蛇移动：按住键盘上下左右键，蛇开始移动
    * 细节：蛇不能倒着移动，假如蛇头朝右，只能上右下移动，不能往左移动
  * b.边界检测：如果蛇的身体超出地图边界，游戏结束
  * c.吃食物：如果蛇头位置与食物位置重合，则蛇的身体变长一节
  * d.食物刷新：如果蛇吃到食物，则在地图上随机刷新食物
* 3.知识点及难点逻辑梳理
  * a.封装函数生成随机颜色
  * b.注册键盘按键及获取上下左右按键
  * c.蛇应该如何移动？
    * 根据现实世界中蛇的移动规律：蛇从最尾部开始前移，蛇头决定移动方向
      * 倒着遍历蛇的身体数组，让每一个身体元素的位置变成前一个身体元素位置，蛇头的位置取决于移动方向
  * d.蛇如何吃食物？（不慌，会有详细图形）
    * 条件：蛇头位置与食物位置重合
    * 移动规律：将食物添加到蛇尾即可
      * （1）此时新吃食物与蛇尾位置重合
      * （2）下一次蛇移动时，根据蛇的身体元素位置变成前一个身体元素位置的规则，此时新食物不会发生移动，而前面的身体会往前移动,所以新吃食物自然就变成蛇的最后一节身体



## 1.3-学习目标确定

* 1.面向过程与面向对象的优缺点？
  * 面向过程
    * 唯一优点：代码比面向对象要少，性能略高（可以忽略）
    * 缺点：
      * **代码维护性低，拓展性低，复用性低**
      * 复杂功能几乎无从下手
  * 面向对象
    * 唯一缺点：代码比面向过程多
    * 优点：维护性高，拓展性高，复用性高
* 2.面向对象编程的思路？
  * a.找对象
    * 蛇对象snake
    * 食物对象food
    * 游戏对象game
  * b.找对象的属性和方法（确定对象职责）
    * food对象
      * 属性
        * width：宽度
        * height：高度
        * bgColor：颜色
        * x：水平位置
        * y：垂直位置
        * ele：页面div，用于刷新页面食物
      * 方法
        * 构造函数Food
        * render：显示在地图上
    * snake对象
      * 属性
        * 1.body：数组 记录每一节身体对象
          * 身体对象：x:水平位置 y:垂直位置 bgColor：背景颜色
        * 2.width：每一节身体宽度
        * 3.height：每一节身体高度
        * 4.direction：移动方向
        * 5.snakeElements：数组 记录每一节身体对象的页面div元素
      * 方法
        * 1.构造函数Snake实例化对象
        * 2.render显示到地图
        * 3.move移动
        * 4.remove移除
        * 5.eat吃食物
    * game对象
      * 属性
        * snake对象
        * map对象
        * food对象
      * 方法
        * Game构造函数
        * start开始游戏
        * end结束游戏
  * c.面向过程来实现具体功能
    * 调用各种对象的方法或属性即可（一个功能一行代码）

## 1.3-授课思路介绍

* 1.先以面向过程的方式来实现整个功能
  * 在这个过程中，会详细介绍每一个小功能的实现思路，锻炼逻辑思维
* 2.再以面向对象的方式来重构项目
  * 在这个过程中，重点突出面向对象分析问题的思维方式，具体小功能不再讲解，直接复制粘贴之前写好的

# 01-贪吃蛇面向过程版本



## 1.1-面向过程开发思路分析



```javascript
/*整体思路
    1.创建元素：
        1.1 地图（大小位置固定）
        1.2 食物（位置随机）
        1.3 蛇（蛇有很多节，如何在内存中使用一个变量来存储一条蛇）
    2.注册事件： 键盘上下左右按键
    3.事件处理
        3.1 蛇移动
        3.2 边界检测
        3.3 吃食物（蛇长度变化）
        3.4 产生一个新的食物
     */
```

![](day05.assets/0201.jpg)



* 完整代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        #map {
            width: 800px;
            height: 600px;
            background: #cccccc;
            position: relative;
            top: 0px;
            left: 0px;
        }
    </style>
</head>
<body>

<div id="map"></div>
<script>
    /*整体思路
    1.创建元素：
        1.1 地图（大小位置固定）
        1.2 食物（位置随机）
        1.3 蛇（蛇有很多节，如何在内存中使用一个变量来存储一条蛇）
    2.注册事件： 键盘上下左右按键
    3.事件处理
        3.1 蛇移动
        3.2 边界检测
        3.3 吃食物（蛇长度变化）
        3.4 产生一个新的食物
     */

    //1.创建元素

    //1.1 地图
    var map = document.getElementById('map');
    //1.2 食物对象
    function Food (width,height,x,y,bgColor  ) {
        this.width = width || 20;
        this.height = height || 20;
        this.bgColor = bgColor || getRandomColor();
        this.x = x || 0;
        this.y = y || 0;
    };
    //食物显示在页面上，是每一个实例化对象共有的方法，应该放入原型中
    Food.prototype.render = function ( map ) {
        //this:指向调用这个方法的食物对象
        //(1) 随机一个xy坐标.
        this.x = Math.floor(Math.random() * map.offsetWidth / this.width) * this.width;
        this.y = Math.floor(Math.random() * map.offsetHeight / this.height) * this.height;
        //(2) 创建一个div,设置样式属性
        var div1 = document.createElement("div");
        div1.style.position = "absolute";
        div1.style.left = this.x +"px";
        div1.style.top = this.y + "px";
        div1.style.width = this.width + "px";
        div1.style.height = this.height + "px";
        div1.style.backgroundColor = this.bgColor;
        this.ele = div1;//将食物div存起来，用于刷新食物的时候先移除旧的食物
        //(3) 将食物添加到形参map中
        map.appendChild(div1);
    }

    var food = new Food();//调用构造函数生成一个食物
    food.render(map);//将食物显示到map地图上
    //1.3 蛇对象

    /**
     * 
     * @param width 每一节宽度
     * @param height 每一节高度
     * @param direction 蛇头方向(left right top bottton)
     * @constructor 
     */
    function Snake (width,height,direction  ) {
        this.width = width || 20;
        this.height = height || 20;
        this.direction = direction || 'right';
        //默认起始三节身体（每一节身体又是一个对象，  x：水平方向位置  y:垂直方向位置 color：颜色）
        //第一个元素为蛇头位置
        this.body = [
            {x:3,y:2,color:'red'},
            {x:2,y:2,color:getRandomColor()},
            {x:1,y:2,color:getRandomColor()}
            ];
        this.snakeElements = [];//声明一个数组存储蛇的身体div
    };
    //显示到地图上的方法应该是每一个实例化对象都共有的，所以应该放到原型中

    Snake.prototype.render = function ( map ) {
        //把蛇的每一节身体变成div添加到形参map中
        for(var i = 0;i<this.body.length;i++){
            var section = this.body[i];//获取每一节身体对象
            var div = document.createElement('div');
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.left = this.width * section.x + 'px';
            div.style.top = this.height * section.y + 'px';
            div.style.position ='absolute';
            div.style.backgroundColor = section.color;
            map.appendChild(div);
            this.snakeElements.push(div);
        }
    }

    /**
     * 生成十六进制随机颜色
     */
    function getRandomColor (  ) {
        var arr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];  //下标0-15
        var str = "#";
        //随机生成六个0-15的数字，取数组对应下标的字符拼接
        for(var i = 0 ; i < 6; i++){
            var num = Math.floor(Math.random()*16);
            str += arr[num];
        };console.log ( str );
        return str;
    }

    var snake = new Snake();//调用构造函数生成一条蛇
    snake.render(map);//将蛇显示到map地图上



    //思考：每一条蛇都应该有移动的方法，我们是直接写一个全局函数还是给Snake构造函数添加原型？
    /*蛇移动：move方法*/
    Snake.prototype.move = function ( map ) {
        //this:指向调用这个方法的蛇对象
        //1.开始移动
        //1.1 蛇的每一小节位置前移：倒着遍历蛇的身体，修改每一节身体的位置是前一节的位置
        for(var i = this.body.length-1;i>0;i--){
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        };
        //1.2 蛇头的位置取决于移动方向
        switch (this.direction){
            case 'left':
                this.body[0].x -= 1;
                break;
            case 'right':
                this.body[0].x += 1;
                break;
            case 'top':
                this.body[0].y -= 1;
                break;
            case 'bottom':
                this.body[0].y += 1;
                break;
        };
        //1.3 先把以前的旧蛇移除
        this.remove();
        //1.4 根据新的body显示新蛇
        this.render(map);
    };

    /*蛇remove方法：移除旧蛇*/
    Snake.prototype.remove = function (  ) {
        ////this:指向调用这个方法的蛇对象
        for(var i = 0;i<this.snakeElements.length;){
            this.snakeElements[i].parentNode.removeChild(this.snakeElements[i]);//页面移除
            this.snakeElements.shift();//内存移除
        };
    }

    /*蛇eat方法：吃食物*/
    Snake.prototype.eat = function (food,map  ) {
        //this:指向调用这个方法的蛇对象
        //1 先记录当前蛇尾的位置
        var snakeLastX = this.body[this.body.length-1].x;
        var snakeLastY = this.body[this.body.length-1].y;
        //3.2 将食物放到蛇尾中
        this.body.push( {x:snakeLastX,y:snakeLastY,color:food.bgColor});
        //3.3 重新显示蛇的身体
        //(1)先移除旧蛇
        this.remove();
        //(2)重新显示新蛇
        this.render(map);
    }

    //2.注册键盘事件
    //键盘事件
    window.onkeydown = function ( e ) {
        e = e || window.event;
        //获取键盘按键
        /*细节：蛇不能倒着移动*/
        switch (e.keyCode){
            case 37:
                //left
                if (snake.direction != 'right'){
                    snake.direction = 'left';
                }

                break;
            case 38:
                //top
                if(snake.direction != 'bottom'){
                    snake.direction = 'top';
                }
                break;
            case 39:
                //right
                if (snake.direction != 'left'){
                    snake.direction = 'right';
                }
                break;
            case 40:
                //bottom
                if (snake.direction != 'top'){
                    snake.direction = 'bottom';
                }
                break;
        };

        //1.蛇开始移动
        snake.move(map);
        //2 边界检测
        if (snake.body[0].x < 0 || snake.body[0].x > map.offsetWidth/snake.width){
            alert('Game Over');
            //游戏重新开始：刷新当前页面
            window.location.reload();
        };

        if (snake.body[0].y < 0 || snake.body[0].y > map.offsetHeight/snake.height){
            alert('Game Over');
            //游戏重新开始：刷新当前页面
            window.location.reload();
        };
        //3.吃食物：只要蛇头位置与食物位置重合，说明吃到了食物
        var snakeHeadX = snake.body[0].x*snake.width;
        var snakeHeadY = snake.body[0].y*snake.height;
        if (snakeHeadX == food.x && snakeHeadY == food.y){
            snake.eat(food,map);
            //4.生成新的食物：只有蛇迟到了食物，才需要生成新的食物
            //4.1 先移除旧食物
            food.ele.parentNode.removeChild(food.ele);
            //4.2 生成新食物并且添加到页面
            food = new Food();//新建一个食物
            food.render(map);//显示到地图上
        }
    }
</script>
</body>
</html>
```



## 1.2-创建元素

```javascript
//1.创建元素

    //1.1 地图
    var map = document.getElementById('map');
    //1.2 食物对象
    function Food (width,height,x,y,bgColor  ) {
        this.width = width || 20;
        this.height = height || 20;
        this.bgColor = bgColor || getRandomColor();
        this.x = x || 0;
        this.y = y || 0;
    };
    //食物显示在页面上，是每一个实例化对象共有的方法，应该放入原型中
    Food.prototype.render = function ( map ) {
        //(1) 随机一个xy坐标.
        this.x = Math.floor(Math.random() * map.offsetWidth / this.width) * this.width;
        this.y = Math.floor(Math.random() * map.offsetHeight / this.height) * this.height;
        //(2) 创建一个div,设置样式属性
        var div1 = document.createElement("div");
        div1.style.position = "absolute";
        div1.style.left = this.x +"px";
        div1.style.top = this.y + "px";
        div1.style.width = this.width + "px";
        div1.style.height = this.height + "px";
        div1.style.backgroundColor = this.bgColor;
        this.ele = div1;//将食物div存起来，用于刷新食物的时候先移除旧的食物
        //(3) 将食物添加到形参map中
        map.appendChild(div1);
    }

    var food = new Food();//调用构造函数生成一个食物
    food.render(map);//将食物显示到map地图上
    //1.3 蛇对象

    /**
     * 
     * @param width 每一节宽度
     * @param height 每一节高度
     * @param direction 蛇头方向(left right top bottton)
     * @constructor 
     */
    function Snake (width,height,direction  ) {
        this.width = width || 20;
        this.height = height || 20;
        this.direction = direction || 'right';
        //默认起始三节身体（每一节身体又是一个对象，  x：水平方向位置  y:垂直方向位置 color：颜色）
        //第一个元素为蛇头位置
        this.body = [
            {x:3,y:2,color:'red'},
            {x:2,y:2,color:getRandomColor()},
            {x:1,y:2,color:getRandomColor()}
            ];
        this.snakeElements = [];//声明一个数组存储蛇的身体div
    };
    //显示到地图上的方法应该是每一个实例化对象都共有的，所以应该放到原型中

    Snake.prototype.render = function ( map ) {
        //把蛇的每一节身体变成div添加到形参map中
        for(var i = 0;i<this.body.length;i++){
            var section = this.body[i];//获取每一节身体对象
            var div = document.createElement('div');
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.left = this.width * section.x + 'px';
            div.style.top = this.height * section.y + 'px';
            div.style.position ='absolute';
            div.style.backgroundColor = section.color;
            map.appendChild(div);
            this.snakeElements.push(div);
        }
    }

    /**
     * 生成十六进制随机颜色
     */
    function getRandomColor (  ) {
        var arr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];  //下标0-15
        var str = "#";
        //随机生成六个0-15的数字，取数组对应下标的字符拼接
        for(var i = 0 ; i < 6; i++){
            var num = Math.floor(Math.random()*16);
            str += arr[num];
        };console.log ( str );
        return str;
    }

    var snake = new Snake();//调用构造函数生成一条蛇
    snake.render(map);//将蛇显示到map地图上
```



## 1.3-注册事件



```javascript
//2.注册键盘事件

 window.onkeydown = function ( e ) {
        e = e || window.event;
        //获取键盘按键
        /*细节：蛇不能倒着移动*/
        switch (e.keyCode){
            case 37:
                //left
                if (snake.direction != 'right'){
                    snake.direction = 'left';
                }

                break;
            case 38:
                //top
                if(snake.direction != 'bottom'){
                    snake.direction = 'top';
                }
                break;
            case 39:
                //right
                if (snake.direction != 'left'){
                    snake.direction = 'right';
                }
                break;
            case 40:
                //bottom
                if (snake.direction != 'top'){
                    snake.direction = 'bottom';
                }
                break;
        };

        //1.
        snake.move();
        //2.边界检测
        //3.吃食物
        //4.产生新的食物


    }
```



## 1.4-事件处理（底部有动图展示蛇移动、吃食物原理图）

```javascript
//思考：每一条蛇都应该有移动的方法，我们是直接写一个全局函数还是给Snake构造函数添加原型？
    /*蛇移动：move方法*/
    Snake.prototype.move = function ( map ) {
        //this:指向调用这个方法的蛇对象
        //1.开始移动
        //1.1 蛇的每一小节位置前移：倒着遍历蛇的身体，修改每一节身体的位置是前一节的位置
        for(var i = this.body.length-1;i>0;i--){
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        };
        //1.2 蛇头的位置取决于移动方向
        switch (this.direction){
            case 'left':
                this.body[0].x -= 1;
                break;
            case 'right':
                this.body[0].x += 1;
                break;
            case 'top':
                this.body[0].y -= 1;
                break;
            case 'bottom':
                this.body[0].y += 1;
                break;
        };
        //1.3 先把以前的旧蛇移除
        this.remove();
        //1.4 根据新的body显示新蛇
        this.render(map);
    };

    /*蛇remove方法：移除旧蛇*/
    Snake.prototype.remove = function (  ) {
        ////this:指向调用这个方法的蛇对象
        for(var i = 0;i<this.snakeElements.length;){
            this.snakeElements[i].parentNode.removeChild(this.snakeElements[i]);//页面移除
            this.snakeElements.shift();//内存移除
        };
    }

    /*蛇eat方法：吃食物*/
    Snake.prototype.eat = function (food,map  ) {
        //this:指向调用这个方法的蛇对象
        //1 先记录当前蛇尾的位置
        var snakeLastX = this.body[this.body.length-1].x;
        var snakeLastY = this.body[this.body.length- 1].y;
        //3.2 将食物放到蛇尾中
        this.body.push( {x:snakeLastX,y:snakeLastY,color:food.bgColor});
        //3.3 重新显示蛇的身体
        //(1)先移除旧蛇
        this.remove();
        //(2)重新显示新蛇
        this.render(map);
    }

    //2.注册键盘事件
    //键盘事件
    window.onkeydown = function ( e ) {
        e = e || window.event;
        //获取键盘按键
        /*细节：蛇不能倒着移动*/
        switch (e.keyCode){
            case 37:
                //left
                if (snake.direction != 'right'){
                    snake.direction = 'left';
                }

                break;
            case 38:
                //top
                if(snake.direction != 'bottom'){
                    snake.direction = 'top';
                }
                break;
            case 39:
                //right
                if (snake.direction != 'left'){
                    snake.direction = 'right';
                }
                break;
            case 40:
                //bottom
                if (snake.direction != 'top'){
                    snake.direction = 'bottom';
                }
                break;
        };

        //1.蛇开始移动
        snake.move(map);
        //2 边界检测
        if (snake.body[0].x < 0 || snake.body[0].x > map.offsetWidth/snake.width){
            alert('Game Over');
            //游戏重新开始：刷新当前页面
            window.location.reload();
        };

        if (snake.body[0].y < 0 || snake.body[0].y > map.offsetHeight/snake.height){
            alert('Game Over');
            //游戏重新开始：刷新当前页面
            window.location.reload();
        };
        //3.吃食物：只要蛇头位置与食物位置重合，说明吃到了食物
        var snakeHeadX = snake.body[0].x*snake.width;
        var snakeHeadY = snake.body[0].y*snake.height;
        if (snakeHeadX == food.x && snakeHeadY == food.y){
            snake.eat(food,map);
            //4.生成新的食物：只有蛇迟到了食物，才需要生成新的食物
            //4.1 先移除旧食物
            food.ele.parentNode.removeChild(food.ele);
            //4.2 生成新食物并且添加到页面
            food = new Food();//新建一个食物
            food.render(map);//显示到地图上
        }
    }
```

* 蛇移动原理

![蛇移动原理](day05.assets/0501.gif)

* 蛇吃食物原理

![](day05.assets/0502.gif)

# 02-贪吃蛇面向对象版本



## 1.1-面向对象开发思路分析



![](day05.assets/0701.jpg)

![](day05.assets/0702.jpg)

![](day05.assets/0703.jpg)

![](day05.assets/0704.jpg)



## 1.2-index.html文件



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        #map {
            width: 800px;
            height: 600px;
            background: #cccccc;
            position: relative;
            top: 0px;
            left: 0px;
        }
    </style>
</head>
<body>

<div id="map"></div>


<script src="Game.js"></script>
<script src="Food.js"></script>
<script src="Snake.js"></script>
<script src="Tools.js"></script>
<script>
    var map = document.getElementById('map');
    var game = new Game(map);//创建游戏对象
    game.start();//开始游戏
</script>
</body>
</html>
```



## 1.3-Game.js文件



```javascript
/*
** Create by 张晓坤 on 2018/10/31
*/
/*面向对象：把食物作为一个对象，所有与食物相关的一切属性与方法都写在这个文件中
面向对象编程好处
    * 维护性高
    * 复用性高
    * 拓展性高
 */
/*Game游戏对象
    方法：
        1.构造函数Game实例化对象
        2.start：开始游戏
        3.end：结束游戏
 */

/*沙箱模式
1.开辟局部作用域，避免全局变量污染
2.模块化开发
 */
//形参也叫window的好处就是在局部变量中访问全局变量，可以直接省略前面的window，如果不叫window则不能省略
(function ( window  ) {

    //1.构造函数
    function Game(map){
        //创建对象
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        //显示对象
        this.food.render(this.map);
        this.snake.render(this.map);
    }

    //2.开始游戏
    Game.prototype.start = function (  ) {
        //1.给页面注册键盘按下事件
        window.onkeydown = function ( e ) {
            e = e || window.event;
            //2.获取键盘按键
            /*细节：蛇不能倒着移动*/
            switch ( e.keyCode ) {
                case 37:
                    //left
                    if ( this.snake.direction != 'right' ) {
                        this.snake.direction = 'left';
                    }
                    break;
                case 38:
                    //top
                    if ( this.snake.direction != 'bottom' ) {
                        this.snake.direction = 'top';
                    }
                    break;
                case 39:
                    //right
                    if ( this.snake.direction != 'left' ) {
                        this.snake.direction = 'right';
                    }
                    break;
                case 40:
                    //bottom
                    if ( this.snake.direction != 'top' ) {
                        this.snake.direction = 'bottom';
                    }
                    break;
            }
            ;
            //3.开始移动
            //3.1先清除之前的定时器，以本次为准
            clearInterval(this.timeID);
            //3.2 开启本次定时器
            this.timeID = setInterval(function (  ) {
                //1.蛇开始移动
                this.snake.move (map);
                //2 边界检测
                if ( this.snake.body[ 0 ].x < 0 || this.snake.body[ 0 ].x > this.map.offsetWidth / this.snake.width ) {
                    this.end();
                };
                if ( this.snake.body[ 0 ].y < 0 || this.snake.body[ 0 ].y > this.map.offsetHeight / this.snake.height ) {
                    this.end();
                };
                //3.吃食物
                var snakeHeadX = this.snake.body[ 0 ].x * this.snake.width;
                var snakeHeadY = this.snake.body[ 0 ].y * this.snake.height;
                if ( snakeHeadX == this.food.x && snakeHeadY == this.food.y ) {
                    this.snake.eat ( this.food,this.map );
                    //4.产生新的食物
                    //4.1 先移除旧食物
                    this.food.ele.parentNode.removeChild ( this.food.ele );
                    //4.2 生成新食物并且添加到页面
                    this.food = new Food ();//新建一个食物
                    this.food.render ( this.map );//显示到地图上
                }
            }.bind(this),100)
        }.bind(this);//在这个事件处理函数中，this默认指向window，这里需要动态修改this指向为game对象自身
    }

    //3.end:游戏结束
    Game.prototype.end = function (  ) {
        alert('Game Over');
        clearInterval(this.timeID);
        window.location.reload();
    }

    //4.暴露接口
    window.Game = Game;

})(window);
```



## 1.4-Food.js



```javascript
/*
** Create by 张晓坤 on 2018/10/31
*/
/*面向对象：把食物作为一个对象，所有与食物相关的一切属性与方法都写在这个文件中

1.面向对象编程好处
    * 维护性高
    * 复用性高
    * 拓展性高

2.食物对象属性和方法
    方法
        * 1.构造函数Food实例化对象
        * 2.render：显示在地图上
    属性：
        * width：宽度
        * height：高度
        * bgColor：颜色
        * x：水平位置
        * y：垂直位置
        * ele: 页面div，用于刷新页面食物

 */

/*沙箱模式
1.开辟局部作用域，避免全局变量污染
2.模块化开发
 */
(function  ( window ) {

    //1.构造函数Food
    function Food (width,height,x,y,bgColor  ) {
        this.width = width || 20;
        this.height = height || 20;
        this.bgColor = bgColor || getRandomColor();
        this.x = x || 0;
        this.y = y || 0;
    };

    //2.render显示到地图中
    Food.prototype.render = function ( map ) {
        //(1) 随机一个xy坐标.
        this.x = Math.floor(Math.random() * map.offsetWidth / this.width) * this.width;
        this.y = Math.floor(Math.random() * map.offsetHeight / this.height) * this.height;
        //(2) 创建一个div,设置样式属性
        var div1 = document.createElement("div");
        div1.style.position = "absolute";
        div1.style.left = this.x +"px";
        div1.style.top = this.y + "px";
        div1.style.width = this.width + "px";
        div1.style.height = this.height + "px";
        div1.style.backgroundColor = this.bgColor;
        this.ele = div1;//将食物div存起来，用于刷新食物的时候先移除旧的食物
        //(3) 将食物添加到形参map中
        map.appendChild(div1);
    };

    //3.将对象的接口暴露到外部全局作用域
    window.Food = Food;

    //不要直接在沙箱内部访问外部全局变量，而应该作为参数传递
    //原因：（1）破坏模块化的封装性  （2）后期文件压缩会导致未知bug
    // window.Food = Food;
})(window);
```





## 1.5-Snake.js



```javascript
/*
** Create by 张晓坤 on 2018/10/31
*/

/*Snake对象
    方法：
        1.构造函数Snake实例化对象
        2.render显示到地图
        3.move移动
        4.remove移除
        5.eat吃食物
   属性：
        1.body：数组  记录每一节身体对象
            身体对象：x:水平位置  y:垂直位置  bgColor：背景颜色
        2.width：每一节身体宽度
        3.height：每一节身体高度
        4.direction：移动方向
        5.snakeElements：数组  记录每一节身体对象的页面div元素

 */
( function ( window ) {

    /**
     * 1.构造函数Snake
     * @param width 每一节宽度
     * @param height 每一节高度
     * @param direction 蛇头方向(left right top bottton)
     * @constructor
     */
    function Snake ( width, height, direction ) {
        this.width = width || 20
        this.height = height || 20
        this.direction = direction || "right"
        this.snakeElements = []
        //默认起始三节身体（每一节身体又是一个对象，  x：水平方向位置  y:垂直方向位置 color：颜色）
        //第一个元素为蛇头位置
        this.body = [ { x : 3, y : 2, color : "red" }, { x : 2, y : 2, color : getRandomColor () }, {
            x : 1,
            y : 2,
            color : getRandomColor ()
        } ]
    }

    //2.render显示到地图
    Snake.prototype.render = function ( map ) {
        //把蛇的每一节身体变成div添加到形参map中
        for ( var i = 0 ; i < this.body.length ; i ++ ) {
            var section = this.body[ i ]//获取每一节身体对象
            var div = document.createElement ( "div" )
            div.style.width = this.width + "px"
            div.style.height = this.height + "px"
            div.style.left = this.width * section.x + "px"
            div.style.top = this.height * section.y + "px"
            div.style.position = "absolute"
            div.style.backgroundColor = section.color
            this.snakeElements.push ( div )
            map.appendChild ( div )
        }
    }

    //思考：每一条蛇都应该有移动的方法，我们是直接写一个全局函数还是给Snake构造函数添加原型？
    /*3.蛇移动：move方法*/
    Snake.prototype.move = function ( map ) {
        //this:指向调用这个方法的蛇对象
        //1.开始移动
        //1.1 蛇的每一小节位置前移：倒着遍历蛇的身体，修改每一节身体的位置是前一节的位置
        for(var i = this.body.length-1;i>0;i--){
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        };
        //1.2 蛇头的位置取决于移动方向
        switch (this.direction){
            case 'left':
                this.body[0].x -= 1;
                break;
            case 'right':
                this.body[0].x += 1;
                break;
            case 'top':
                this.body[0].y -= 1;
                break;
            case 'bottom':
                this.body[0].y += 1;
                break;
        };
        //1.3 先把以前的旧蛇移除
        this.remove();
        //1.4 根据新的body显示新蛇
        this.render(map);
    };

    /*4.蛇remove方法：移除旧蛇*/
    Snake.prototype.remove = function (  ) {
        ////this:指向调用这个方法的蛇对象
        for(var i = 0;i<this.snakeElements.length;){
            this.snakeElements[i].parentNode.removeChild(this.snakeElements[i]);//页面移除
            this.snakeElements.shift();//内存移除
        };
    }

    /*5.蛇eat方法：吃食物*/
    Snake.prototype.eat = function (food,map  ) {
        //this:指向调用这个方法的蛇对象
        //1 先记录当前蛇尾的位置
        var snakeLastX = this.body[this.body.length-1].x;
        var snakeLastY = this.body[this.body.length-1].y;
        //3.2 将食物放到蛇尾中
        this.body.push( {x:snakeLastX,y:snakeLastY,color:food.bgColor});
        //3.3 重新显示蛇的身体
        //(1)先移除旧蛇
        this.remove();
        //(2)重新显示新蛇
        this.render(map);
    }

    //6.暴露接口
    window.Snake = Snake
} ) ( window )
```



## 1.6-Tools.js



```javascript
/*
** Create by 张晓坤 on 2018/11/1
*/

/**将不属于任何对象的方法放入工具文件中，这样所有的对象都可以调用，既没有破坏封装性也实现了代码的复用
 *
 * 生成十六进制随机颜色
 */
function getRandomColor (  ) {
    var arr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];  //下标0-15
    var str = "#";
    //随机生成六个0-15的数字，取数组对应下标的字符拼接
    for(var i = 0 ; i < 6; i++){
        var num = Math.floor(Math.random()*16);
        str += arr[num];
    };console.log ( str );
    return str;
}
```

