/**
    * @description: 1.获取元素的样式属性 浏览器兼容性封装
    * @param {type} 
    * @return: 
    */
function getStyle(ele, attribute) {
    //能力检测
    //  window.getComputedStyle : 判断window对象有没有这个方法
    //  window.getComputedStyle() : 调用window对象的getComputedStyle，看它有没有返回值
    if (window.getComputedStyle) {//如果getComputedStyle可以获取，谷歌火狐
        // var style =  window.getComputedStyle(ele,null);//对象
        // console.log(style.attribute);
        // console.log(style[attribute]);
        // return style[attribute];
        return window.getComputedStyle(ele, null)[attribute];
    } else {//IE8
        return ele.currentStyle[attribute]
    };
};

//2.浏览器兼容封装
function getPageScroll() {

    //逻辑或 || 短路运算规则
    /*口诀：一真则真
      找真： 如果左边能转成true，无条件返回左边式子的值。反之无条件返回右边式子的值 
     */
    var x = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    var y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    return {
        scrollLeft: x,
        scrollTop: y
    };
};