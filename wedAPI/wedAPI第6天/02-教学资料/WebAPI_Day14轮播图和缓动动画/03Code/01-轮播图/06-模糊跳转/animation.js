/**
   * @description: 匀速动画 函数
   * @param {string}  eleId - 要移动的目标元素 id
   * @param {number}  targetPosition - 目标位置
   */
  function move(eleId, targetPosition) {
    // 1. 获取 元素 节点 对象
    var boxNode = document.getElementById(eleId);
  
    // 1.1 如果 节点中保存了计时器，就立即 清空，重新启动一个新的计时器
    clearInterval(boxNode.timer);
  
    // 2. 开启计时器
    boxNode.timer = setInterval(function () {
      // 2.1 确定方向 -- true 往右   false 往左
      var curPos = boxNode.offsetLeft // ->　实际位置　：不带单位　　是　数值类型
      var isToRight = curPos <= targetPosition;
  
      // 2.2 根据方向位移
      isToRight ? curPos += 5 : curPos -= 5;
      boxNode.style.left = curPos + 'px';
  
      // 2.3 判断是否 到达 目标位置 -- 判断边界
      if (isToRight ? curPos >= targetPosition : curPos <= targetPosition) {
        // a. 停止计时器
        clearInterval(boxNode.timer);
        console.log('动画计时器停止：' + boxNode.timer);
        // b. 复位
        boxNode.style.left = targetPosition + 'px';
      }
    }, 7);
  }