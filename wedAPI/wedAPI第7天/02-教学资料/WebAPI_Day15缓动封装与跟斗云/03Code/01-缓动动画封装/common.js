 /**
     * @description: 1.获取元素的样式属性 浏览器兼容性封装
     * @param {type} 
     * @return: 
     */
    function getStyle(ele,attribute){
        //能力检测
        //  window.getComputedStyle : 判断window对象有没有这个方法
        //  window.getComputedStyle() : 调用window对象的getComputedStyle，看它有没有返回值
        if( window.getComputedStyle ){//如果getComputedStyle可以获取，谷歌火狐
            // var style =  window.getComputedStyle(ele,null);//对象
            // console.log(style.attribute);
            // console.log(style[attribute]);
            // return style[attribute];
            return window.getComputedStyle(ele,null)[attribute];
        }else{//IE8
            return ele.currentStyle[attribute]
        };
    };