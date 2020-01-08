console.log('导入 exteds js文件');

// 使用 extend 为 $ 对象 动态 扩展 一些 成员
$.extend($, {
  // 1. 封装一个 自己的 异步请求方法
  //    目标：一旦 服务器发送 为登录消息，就 统一 跳到指定的页面
  // url / method / cache / success  / data /contentType / processData
  ajaxWithCheck(options) {
    // 准备 参数 对象
    let optionsNew = {
      url: options.url,
      method: options.method ? options.method : 'get',
      cache: options.cache ? options.cache : true, // 如果 cache 不存在，就是 undefined
      success: function (backData) {
        if (backData.code == 777) {
          alert(backData.msg);
          window.location = backData.backurl;
        } else {
          options.success(backData);
        }
      }
    };
    
    // 如果 传入的 对象中 包含 如下 三个 参数，就添加到 新的参数对象中
    if (options.hasOwnProperty('data')) {
      optionsNew.data = options.data;
    }
    
    if (options.hasOwnProperty('contentType')) {
      optionsNew.contentType = options.contentType;
    }
    if (options.hasOwnProperty('processData')) {
      optionsNew.processData = options.processData;
    }

    // 接住 jquery的 ajax 方法 发送异步请求
    $.ajax(optionsNew);
  }
});
