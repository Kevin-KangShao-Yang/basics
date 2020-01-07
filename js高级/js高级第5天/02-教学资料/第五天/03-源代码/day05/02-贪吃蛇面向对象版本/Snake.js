//闭包实现沙箱模式
(function (w) {
    //1. 构造函数
    function Snake(width, height, direction) {
        this.width = width || 20;//每一节身体的宽度
        this.height = height || 20;//每一节身体的高度
        this.direction = direction || 'right';//蛇头默认方向
        this.body = [
            { x: 3, y: 2, bgc: 'red' },
            { x: 2, y: 2, bgc: getRandomColor() },
            { x: 1, y: 2, bgc: getRandomColor() }
        ];
    };


    //2. render :显示到页面
    Snake.prototype.render = function (map) {
        //this : 调用这个函数的蛇对象

        //给snake添加bodyElements数组来存储 每一节身体：用于移除刷新
        this.bodyElements = [];

        for (var i = 0; i < this.body.length; i++) {
            var section = this.body[i];

            //1.内存创建空元素
            var div = document.createElement('div');
            //2.设置样式
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.position = 'absolute';
            div.style.left = section.x * this.width + 'px';
            div.style.top = section.y * this.height + 'px';
            div.style.backgroundColor = section.bgc;
            //3.添加到页面
            map.appendChild(div);
            //添加到数组
            this.bodyElements.push(div);
        };
    };

    //3. move : 蛇移动
    Snake.prototype.move = function (map) {
        // this : 调用这个方法的蛇对象

        //1.倒着遍历身体，每一节都是前一节位置
        for (var i = this.body.length - 1; i > 0; i--) {// i > 0,蛇头不遍历
            console.log(this.body[i]);
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        };
        //2.蛇头位置取决于移动方向
        switch (this.direction) {
            case 'left':
                this.body[0].x--;
                break;
            case 'top':
                this.body[0].y--;
                break;
            case 'right':
                this.body[0].x++
                break;
            case 'bottom':
                this.body[0].y++;
                break;
        };
        //3.移除旧蛇
        this.remove();
        //4.显示新蛇
        this.render(map);

        console.log(this.body);

    };
    //4. remove:移除蛇
    Snake.prototype.remove = function () {
        //this : 调用这个方法的蛇对象
        //移除蛇的bodyElements中的每一个div
        for (var i = 0; i < this.bodyElements.length; i++) {
            this.bodyElements[i].parentNode.removeChild(this.bodyElements[i]);
        };
    };

    //5. eat: 蛇吃食物
    Snake.prototype.eat = function (map, food) {
        // this : 调用这个方法的蛇对象

        //1.记录当前蛇尾巴位置
        var lastX = this.body[this.body.length - 1].x;
        var lastY = this.body[this.body.length - 1].y;
        //2.食物添加到body最后面
        this.body.push({
            x: lastX,
            y: lastY,
            bgc: food.bgc
        });
        //3.移除旧蛇
        this.remove();
        //4.显示新蛇
        this.render(map);
    };

    //6.暴露接口 
    w.Snake = Snake;


    function getRandomColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);

        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

})(window);