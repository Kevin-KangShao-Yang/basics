(function ($) {
    $.prototype.w = function (width) {
        //this : 调用这个方法的每一个jq对象
        this.css('width', width + 'px');
        //返回自身：可以链式调用
        return this;
    };

    $.prototype.h = function (height) {
        //this : 调用这个方法的每一个jq对象
        this.css('height', height + 'px');
        //返回自身：可以链式调用
        return this;
    };

    $.prototype.bgc = function (bgc) {
        //this : 调用这个方法的每一个jq对象
        this.css('backgroundColor', bgc);
        //返回自身：可以链式调用
        return this;
    };
})(jQuery);