// 导入了 vue
import Vue from 'vue'
// 导入了组件 App.vue (根组件)
import App from './App.vue'
// 导入了路由
import router from './router'
// 导入了 vuex
import store from './store'
// 导入 Elemnent-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局样式
import '@/styles/index.less'
// 导入 axios
import axios from 'axios'
// 导入 json-bigint
import JSONBig from 'json-bigint'
// 导入富文本编辑框的文件
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑框的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 使用
Vue.use(VueQuillEditor)

// 给 axios 设置一个基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

axios.defaults.transformResponse = [
  function (data) {
    // 将来删除时，返回的结果为 ''，不能进行 JSONBig.parse, 会报错
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }
]

// 设置 axios 的拦截器
// 请求拦截器：发送请求之前执行
axios.interceptors.request.use(
  function (config) {
    // 请求正常时执行的逻辑
    // config：axios 请求服务器的相关信息：
    //  url:  请求的接口地址
    //  method: 请求的方式
    //  baseUrl: 请求的基准地址
    //  headers: Authorization （token）
    // 在请求拦截器中执行完逻辑代码之后一定要 return config, 否则请求无法发送

    // 获取 token
    let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    // 判断只在 userInfo 存在时，才需要添加 token
    if (userInfo) {
      // 在请求头中添加 token
      config.headers.Authorization = `Bearer ${userInfo.token}`
    }
    return config
  },
  function (error) {
    // 请求异常时的逻辑
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 当服务器响应信息回来时执行
    // 响应拦截器如果要返回信息，必须 return response
    // console.log("------------------------------------我是响应拦截器------------------------------------");
    // console.log(response);
    // console.log("------------------------------------我是响应拦截器------------------------------------");
    // return response;
    return response.data.data
  },
  function (error) {
    // 当响应的状态码 >= 400 时执行   4~~ 客户端错误 5~~ 服务器错误
    return Promise.reject(error)
  }
)

// 将 axios 挂载到 Vue 的原型上
// 可通过 this.$http 来使用
// .vue 是 vue 中的组件
// 所有的组件都是 Vue 的实例
// 在所有的 Vue 实例中都可以使用 $http
// 一般将 axios 挂载为实例属性时，它有一个固定的名称 $http
// $http:
//    $ 区别组件中的属性 与 实例中的属性
// http： 致敬老一辈的框架
//   vue 的全家桶：
//       vue
//       vue-cli
//       vue-router
//       dev-tool
//       vue-resource： vue 官方提供的发送请求的第三方包
//          this.$http
//       axios： 发送异步请求
//         挂载为统一时，设置 $http
Vue.prototype.$http = axios

Vue.use(ElementUI)

// 设置当前项目的模式：当前模式为 开发模式
Vue.config.productionTip = false

var a = true
if (a) {
  console.log('aaaa')
}

function sayHi () {
  console.log('sayHi')
}
sayHi()

if (a === true) {
  console.log('111')
}

// 创建一个 vue 实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
