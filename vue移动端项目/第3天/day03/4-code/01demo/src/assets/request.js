// 用来封装处理 axios 的逻辑代码：封装为 vue 的插件
// Vue 的插件：
//  1.0 可以用来给 vue 添加全局属性
//  2.0 vue 中使用插件时， Vue.use(MyPlugs)
//      Vue.use(MyPlugs) 的原理是 调用了 MyPlugs 的 install 方法
//  3.0 定义插件时，只需要给插件对象添加一个方法 install ，这个方法的第一个参数为： Vue （构造器） ‘’Vue‘’.use(MyPlugs)

import axios from 'axios'

// 创建一个 axios 的实例
let instance = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/'
})

// // 请求拦截器
// instance.interceptors.request.use()
// // 响应拦截器
// instance.interceptors.response.use()

// 以插件的方式导出
let plugs = {}
// 添加一个 install 方法
plugs.install = function(Vue) {
    Vue.prototype.$http = instance
}

// 将实例导出
export default plugs
