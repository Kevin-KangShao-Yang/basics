//闭包实现沙箱模式
(function (w) {
    //1.构造函数创建事物对象
    function Food(width, height, left, top, bgc) {
        //逻辑或短路运算实现函数默认参数
        this.width = width || 20;
        this.height = height || 20;
        this.left = left || 0;
        this.top = top || 0;
        this.bgc = bgc || getRandomColor();
    };

    //2.给原型添加render ： 渲染（显示）到页面（DOM树）
    Food.prototype.render = function (map) {
        //this : 调用这个方法的每一个事物对象

        //1.内存创建空标签
        var div = document.createElement('div');
        //2.设置样式属性
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.position = 'absolute';
        //随机位置
        //a. 求格子数量
        var geziX = map.offsetWidth / this.width;// 800 / 20 = 40
        var geziY = map.offsetHeight / this.height;
        //b. 求随机格子
        var x = Math.floor(Math.random() * geziX);
        var y = Math.floor(Math.random() * geziY);
        //c .设置位置
        div.style.left = (this.left || x * this.width) + 'px';
        div.style.top = (this.top || y * this.height) + 'px';
        div.style.backgroundColor = this.bgc;
        //3.添加到页面DOM数
        map.appendChild(div);
        this.ele = div;//使用属性存储div，用于刷新移除
    };

    //3.暴露接口
    w.Food = Food;

    function getRandomColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);

        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

})(window);