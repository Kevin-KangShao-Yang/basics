// -------------------------------------
// 第三方模块 之 crawler 蜘蛛组件 -- 用来 抓取 网站上的信息

var Crawler = require("crawler");
 
var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            // console.log($("title").text());
            // console.log($("body").text());
            // console.log($("#J_logo_extend img").attr('src'))
            console.log($('.page-title').text())
            console.log($(".keyword-desc").text())
        }
        done();
    }
});
 
// Queue just one URL, with default callback
// c.queue('http://www.amazon.com');