 var testPreventDefault = null;
    // 登录业务思路：登录按钮  点击时 获取用户名和密码，异步提前交到 服务器对应的 登录接口
    // 1.导入 jquery.js 文件
    // 2.当 页面加载完成后，为登录按钮 添加 点击事件
    $(function () {
        // dom语法 的事件参数 ： 是 浏览器 在 事件触发时，先 创建了 一个 事件参数对象，再通过 dom.onclick(事件参数对象);
        //                 e.preventDefault();
        $('#btnTest')[0].onclick = function (e) {
            console.log('dom 的事件参数：');
            console.log(e);

            // 将 dom事件的 事件参数 存入 全局变量
            testPreventDefault = e.preventDefault;
        }
        // juqery语法 的事件参数 ： 是 jquery 在 事件触发时，先 创建了 一个 jq事件参数对象，再通过 dom.trigger('click',jq事件参数对象);
        //                 e.preventDefault();
        $('.input_sub').click(function (e) {
            console.log('jquery 的事件参数：');
            console.log(e);

            // 将 dom事件的 事件参数 存入 全局变量
            if(testPreventDefault){
                // 结论： dom事件参数的 preventDefault 方法 是 浏览器 按照 w3c标准实现的 一个 函数 ，不兼容 老式 浏览器(<=IE8)
                //        jquery事件参数的 preventDefault 方法 是 jq 自己实现的         一个 函数， 兼容   老式 浏览器(IE8)
                console.log('判断 testPreventDefault == e.preventDefault:');
                console.log(testPreventDefault == e.preventDefault);
            }else{
                console.log('testPreventDefault is null');
            }
}