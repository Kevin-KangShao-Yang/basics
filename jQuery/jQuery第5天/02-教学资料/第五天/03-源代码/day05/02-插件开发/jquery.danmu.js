(function ($) {
    /* 
        插件本质 ： 给jq原型添加方法
        */
    $.prototype.fashe = function (text) {
        //this : 调用这个方法的父元素
        /* 
        1.创建span标签 ： 文本就是形参
        2.设置样式 
        3.添加到页面
        */
        $('<span>' + text + '</span>')
            .css({
                position: 'absolute',
                right: -200,
                top: getRandomTop(),
                width: '200px',
                fontSize: '20px',
                color: getRandomColor()
            })
            .animate({ right: this.width() + 200 }, 10000, function () {
                //动画结束之后移除span，提高代码性能
                //this : 调用这个方法的span标签
                this.remove();
            })
            .appendTo(this);
    };

    function getRandomTop() {
        return Math.floor(Math.random() * 100);
    };

    function getRandomColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);

        return 'rgb(' + r + ',' + g + ',' + b + ')';
    };
})(jQuery)