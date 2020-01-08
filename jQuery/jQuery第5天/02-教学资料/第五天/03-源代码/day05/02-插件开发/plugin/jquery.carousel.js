(function ($) {
    /*旋转木马*/
    $.fn.carousel = function () {
        /*大容器*/
        var $carousel = this;
        /*里面的旋转容器*/
        var $items = $carousel.find('li');
        /*确定图片的大小*/
        var width = 800;
        var height = 500;
        /*距离顶部的位置*/
        var top = 150;
        /*大容器宽度*/
        var cWidth = $carousel.width();
        /*1.初始化图片位置*/
        var initData = [
            {
                width: width,
                height: height,
                top: top,
                left: (cWidth - width) / 2,
                opacity: 1,
                zIndex: 10
            },
            {
                width: 600,
                height: 600 / width * height,
                top: top - 30,
                left: cWidth - 600 - 80,
                opacity: 0.6,
                zIndex: 9
            },
            {
                width: 400,
                height: 400 / width * height,
                top: top - 90,
                left: cWidth - 400 - 120,
                opacity: 0.2,
                zIndex: 8
            },
            {
                width: 400,
                height: 400 / width * height,
                top: top - 90,
                left: 120,
                opacity: 0.2,
                zIndex: 8
            },
            {
                width: 600,
                height: 600 / width * height,
                top: top - 30,
                left: 80,
                opacity: 0.6,
                zIndex: 9
            }
        ];

        /*初始 第一张图在最前面*/
        $items.each(function (i,item) {
            $(item).show().css(initData[i]);
        });

        /*节流阀*/
        var flag = true;
        /*2.左右按键切图片位置*/
        $(document).on('keyup',function (e) {
            var keyCode = e.keyCode;
            /*定制程序*/
            if(!flag) return false;
            /*右键*/
            if(keyCode == 37){
                flag = false;
                var first = initData.shift();
                initData.push(first);
            }
            /*左键*/
            else if(keyCode == 39){
                flag = false;
                var last = initData.pop();
                initData.unshift(last);
            }
            /*做动画旋转*/
            $items.each(function (i, item) {
                /*jquery  动画速度只有  swing linear */
                /*1.如果想使用更多的动画 jquery.easing.js */
                $(item).animate(initData[i],1000,'easeOutBounce',function () {
                    /*说明动画执行完成*/
                    flag = true;
                });
            })

        })
    }
})(jQuery);