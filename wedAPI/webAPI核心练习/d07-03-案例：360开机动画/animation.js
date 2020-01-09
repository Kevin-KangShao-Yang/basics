
/**
* @description: moveSlowly - 缓动函数
* @param {Node} eleDom - 要进行动画操作的 元素对象 
* @param {Object} cssProObj - 要进行 缓动 的 元素 属性名 和 属性值 对象  { width: 500, height: 500 }
* @param {Function} func - 回调函数：当 本次计时器 结束后，执行 此回调函数
* @return: 
*/
function moveSlowly(eleDom, cssProObj, func) {
    // 立即 清空 上一次的 计时器
    clearInterval(eleDom.timerId); // timerId 如果有 值，则 关闭 对应的 计时器，否则 什么都不做
    
    eleDom.timerId = setInterval(function () {

        // 1.提出假设（a）：假设 本次 循环 ，所有的 属性 都到达了 目标值
        var isAllOk = true; // 假设 本次循环 所有的 属性 都达到了目标值！！！

        for (var cssProName in cssProObj) {

            // 1.1 获取 要修改的 样式属性的目标值 ------ 由于 每个属性 都需要 获取 目标值，所以 可以 将 此段代码 拿出 if else
            var target = cssProObj[cssProName]; // opacity - > 1

            // 如果要修改的 属性是层，则直接 将目标值 设置给 属性
            if (cssProName == 'zIndex') {
                eleDom.style.zIndex = target; // 设置 zIndex 目标值
            }
            // 如果要修改的 属性是透明度，则 使用 单独的业务处理
            else if (cssProName == 'opacity') {

                // 2. 获取 目标元素 要修改 的 样式 的 当前属性值
                var current = parseFloat(getComputed(eleDom, cssProName)); //  parseFloat('0.5') -> 0.5

                // 3. 计算 缓动的 步长：计算每次要修改 多少值
                // 问题： 计算 透明度的步长，都是小数， 如果使用 ceil 或 floor 方法，会 得到 整数 要么 0，要么 1
                // 解决方式： 先 将 目标值 和 当前值 都 * 100
                target = target * 100;   // 目标值： 1 * 100 = 100
                current = current * 100; // 当前值：0.5 * 100 = 50

                var step = target > current ? Math.ceil((target - current) / 10) : Math.floor((target - current) / 10);

                // 4. 计算和移动元素
                current += step;
                // 5. 通过 对象 中括号 访问法 重新设置 样式属性的值
                // eleDom.style.opacity = current;
                // eleDom.style['opacity'] = current;
                eleDom.style[cssProName] = (current / 100);

                // 6. 验证假设(b) -- 边界检测：检查 是否 有 元素 的 属性值 未到达目标值
                if (current != target) {
                    isAllOk = false; // 如果 有 一个 属性值 为达到 它的 目标值，则 打破假设（假设不成立）
                }
            } else {

                // 2. 获取 目标元素 要修改 的 样式 的 当前属性值
                var current = parseInt(getComputed(eleDom, cssProName)); //  parseInt('100px') -> 100

                // 3. 计算 缓动的 步长：计算每次要修改 多少值
                var step = target > current ? Math.ceil((target - current) / 10) : Math.floor((target - current) / 10);

                // 4. 计算和移动元素
                current += step;
                // 5. 通过 对象 中括号 访问法 重新设置 样式属性的值
                // eleDom.style.width = current + 'px';
                // eleDom.style['width'] = current + 'px';
                eleDom.style[cssProName] = current + 'px';

                // 6. 验证假设(b) -- 边界检测：检查 是否 有 元素 的 属性值 未到达目标值
                if (current != target) {
                    isAllOk = false; // 如果 有 一个 属性值 为达到 它的 目标值，则 打破假设（假设不成立）
                }
            }
        }

        //7.根据假设做业务处理(c) -- 当循环结束后，根据 标志位 判断 假设是否成立（判断 是否所有的 属性 到大 目标值）
        if (isAllOk) {
            //如果 假设成立：所有的 属性 都到达目标值，则 关闭计时器
            clearInterval(eleDom.timerId);

            // 调用 回调函数
            // 检查 回调函数 是否存在
            if (func instanceof Function) {
                func();
            }
        }

    }, 20);
}


/**
* @description:  getComputed - 获取 指定元素的 某个属性值
* @param {Node} eleObj - 元素节点对象 
* @param {String} proName - 要获取的 样式属性名称 
* @return: {String} - 样式属性值
*/
function getComputed(eleObj, proName) {
    // eleObj.currentStyle // IE8 的拿法

    // 1. 获取 元素对象的 合编样式表对象
    var styleObj = window.getComputedStyle(eleObj);
    // 2. 获取 对应的属性值
    // return styleObj.width;
    // return styleObj['width'];
    return styleObj[proName]
}