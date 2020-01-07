(function (w) {
    //1.构造函数
    function Game() {
        this.map = document.getElementById('map');
        this.food = new Food();
        this.snake = new Snake();

        this.food.render(this.map);
        this.snake.render(this.map);
    };

    //2.开始游戏
    Game.prototype.start = function () {
        //1级链中 ： this : game游戏对象
        console.log(this);
        

        window.onkeydown = function (e) {
            //2.级链 ： this : window
            console.log(this);
            
            //逻辑或实现浏览器兼容性 
            var code = e.keyCode || e.which || e.charCode;//ASCII码
            console.log(code);
            //通过按键设置蛇头的方向
            switch (code) {//细节： 蛇不能掉头
                case 37:
                    if (this.snake.direction != 'right') {
                        this.snake.direction = 'left';
                    };
                    break;
                case 38:
                    if (this.snake.direction != 'bottom') {
                        this.snake.direction = 'top';
                    }

                    break;
                case 39:
                    if (this.snake.direction != 'left') {
                        this.snake.direction = 'right';
                    }

                    break;
                case 40:
                    if (this.snake.direction != 'top') {
                        this.snake.direction = 'bottom';
                    }
                    break;
                default:
                    return;
                    break;
            };
            console.log('开始事件处理');
            //3.事件处理函数
            //3.1 蛇移动
            this.snake.move(map);
            //3.2 边界检测
            if (this.snake.body[0].x < 0 || this.snake.body[0].x > map.offsetWidth / this.snake.width - 1) {
                this.end();
            };

            if (this.snake.body[0].y < 0 || this.snake.body[0].y > map.offsetHeight / this.snake.height - 1) {
                this.end();
            };

            //3.3 吃食物
            //蛇头位置和食物位置重叠：吃到食物
            if (this.snake.body[0].x * this.snake.width == this.food.ele.offsetLeft && this.snake.body[0].y * this.snake.height == this.food.ele.offsetTop) {
                // alert('吃到食物');
                this.snake.eat(map, this.food);
                //3.4 刷新食物
                map.removeChild(this.food.ele);
                this.food = new Food();
                this.food.render(map);
            };


        }.bind(this);//将二级链中的this（window），修改为1级链的this(game)
    };

    
    //3.结束游戏
    Game.prototype.end = function(){
        alert('Game Over');
        window.location.reload();
    };

    //暴露接口
    w.Game = Game;
})(window);