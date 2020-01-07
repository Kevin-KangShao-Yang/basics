 /* 闭包实现沙箱模式 */
 (function (w) {
    /**
    * @description:ajax发送get请求
    * @param {type} ：url:请求地址
    * @param {type} data:请求参数
    * @param {type} fn:响应回调
    * @return: 
    */
    function get(url, data, fn) {
        //(1).实例化ajax对象
        var xhr = new XMLHttpRequest();
        //(2).设置请求方法和地址
        //get请求的数据直接添加在url的后面 格式是 url?key=value
        xhr.open('get', url + '?' + data);
        //(3).发送请求
        xhr.send();
        //(4).注册回调函数
        xhr.onload = function () {
            fn(xhr.responseText);
        };
    };

    /**
    * @description:ajax发送post请求
    * @param {type} ：url:请求地址
    * @param {type} data:请求参数
    * @param {type} fn:响应回调
    * @return: 
    */
    function post(url, data, fn) {
        //(1).实例化ajax对象
        var xhr = new XMLHttpRequest();
        //(2).设置请求方法和地址
        xhr.open('post', url);
        //(3).设置请求头（post请求才需要设置）
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        //(4).发送请求 ： 参数格式  'key=value' 
        xhr.send(data);
        //(5).注册回调函数
        xhr.onload = function () {
            fn(xhr.responseText);
        };
    };

    /**
    * @description: ajax请求封装
    * @param {type} 参数对象  url:路径 data：参数 success：响应回调 method：请求方法
    * @return: 
    */
    function ajax(obj) {
        console.log(obj);
        //(1).实例化ajax对象
        var xhr = new XMLHttpRequest();
        if (obj.method == 'get') {
            //(2).设置请求方法和地址
            xhr.open('get', obj.url + '?' + obj.data);
            //(3).发送请求 ： 参数格式  'key=value' 
            xhr.send();
        } else {
            //(2).设置请求方法和地址
            xhr.open('post', obj.url);
            //(3).设置请求头（post请求才需要设置）
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            //(4).发送请求 ： 参数格式  'key=value' 
            xhr.send(obj.data);
        }
        //(5).注册回调函数
        xhr.onload = function () {
            console.log(xhr.responseText);
        };

    };

    var hm = {
        get: get,
        post: post,
        ajax: ajax
    };

    //暴露接口
    w.hm = hm;
})(window);