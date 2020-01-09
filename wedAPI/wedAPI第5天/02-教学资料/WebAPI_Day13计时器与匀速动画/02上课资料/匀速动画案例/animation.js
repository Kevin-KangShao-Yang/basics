/** 1.匀速动画
     * @description: 匀速动画封装
     * @param {object} ele :要移动的元素
     * @param {number} target :要移动的目标距离
     * @return: 
     */
    function animationMove(ele, target) {
        //1.清除以前的定时器,以本次为准
        clearInterval(ele.timeID);
        //2.开始本次动画
        ele.timeID = setInterval(function () {
            //2.1 获取当前位置
            var currentLeft = ele.offsetLeft;
            //2.2 开始移动 isLeft true:从左往右 false从右往左
            var isLeft = currentLeft < target ? true : false;
            isLeft ? currentLeft += 10 : currentLeft -= 10;
            ele.style.left = currentLeft + 'px';
            //2.3 边界检测
            if ( isLeft?currentLeft >= target:currentLeft <= target) {
                //清除定时器
                clearInterval(ele.timeID);
                //元素复位
                ele.style.left = target + 'px';
            };
        }, 50);
    };
