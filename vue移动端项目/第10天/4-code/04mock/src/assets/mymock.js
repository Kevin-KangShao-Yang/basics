// 使用 mock 来拦截 ajax 请求

// 导入 Mock
import Mock from 'mockjs'
// 拦截 ajax
Mock.mock('localhost:3000/getdata', 'get', function() {
    return Mock.mock({
        // 属性为 list：list 是一个数组，对象的长度为 1 ~ 10 个
        'list|1-10':[{
            'id|+1': 1, // id 自增 起始值 1
            title: "@ctitle(10,30)", // title： 生成一个 10 ~ 30个长度的中文标题
            image: "@image('250x250','@color','@name')", // image ： 生成一张图片 250X250 随机颜色 随机名称
            content: "@cparagraph(3,5)", // content: 内容 生成3~5个段落
            time:"@natural(0, 1000)",
            stars:'@datetime',
            name: '@name'
        }]
    })
})