/**获取网页滚动出去的距离  
@return : {scrollLeft:x,scrollTop:y}
*/

function getPagePoint() {
    //1.能力检测
    //逻辑或短路：找真
    //最后的0，提高代码易读性。某些极少浏览器三者都不支持，返回undefined语义不明确
    var x = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    var y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    return {
        scrollLeft: x,
        scrollTop: y
    };
};
