/* 闭包实现沙箱模式 */
(function (w) {
    /**
     * @description: 1.get请求
     * @param {type} url ：请求地址
     * @param {type} data ：请求参数
     * @param {type} success ：请求回调   function(data){ data:服务器返回的数据 }
     * @return: 
     */
    function get(url, data, success) {
        //(1).实例化ajax对象
        var xhr = new XMLHttpRequest();
        //(2).设置请求方法和地址
        //get请求的数据直接添加在url的后面 格式是 url?key=value
        xhr.open('get', url + '?' + data);
        //(3).发送请求
        xhr.send();
        //(4).注册回调函数
        xhr.onload = function () {
            //获取到数据之后，执行回调函数,将获取的数据通过参数传递给这个回调函数
            success(xhr.responseText);
        };
    };

    /**
     * @description: 2.post请求
     * @param {type} url ：请求地址
     * @param {type} data ：请求参数
     * @param {type} success ：请求回调   function(data){ data:服务器返回的数据 }
     * @return: 
     */
    function post(url, data, success) {
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
            //获取到数据之后，执行回调函数,将获取的数据通过参数传递给这个回调函数
            success(xhr.responseText);
        };
    };

    /**
     * @description: 3.ajax请求
     * @param {type} 对象的方式传参
        {
            url:请求地址
            method:请求方法
            data:请求参数
            success：请求回调  function(data){ data:服务器返回的数据 }
        }
     */
    function ajax(obj) {
        //(1).实例化ajax对象
        var xhr = new XMLHttpRequest();
        if (obj.method == 'get') {
            //(2).设置请求方法和地址
            xhr.open(obj.method,obj.url + '?' + obj.data);
            //(3).发送请求
            xhr.send();
        } else {
            //(2).设置请求方法和地址
            xhr.open(obj.method,obj.url);
            //(3).设置请求头（post请求才需要设置）
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            //(4).发送请求 ： 参数格式  'key=value' 
            xhr.send(obj.data);
        };
        //(5).注册回调函数
        xhr.onload = function () {
            //获取到数据之后，执行回调函数,将获取的数据通过参数传递给这个回调函数
            obj.success(xhr.responseText);
        };
    };

    //暴露接口
    w.hm = {
        get: get, //左边属性名，右边属性值
        post: post,
        ajax: ajax
    };
})(window);