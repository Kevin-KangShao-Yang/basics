// 封装所有与 axios 相关的逻辑
// 改造为一个插件

// 导入 axios
import axios from 'axios'
// 导入 store
import store from '@/store'

// 创建一个 axios 实例
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/' // 请求基准地址
})

// 设置拦截器
// 设置过请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 设置请求的 token
    // config 所有的请求信息
    // 判断用户是否登录：判断 store 中的 state 中的 user 是否存在
    let user = store.state.user
    if (user) {
      // 向请求头中添加 token
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
    // 错误处理
    return Promise.reject(error)
  }
)

// 设置过响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应的数据进行处理
    // response 服务器响应回来的数据
    return response.data.data
  },
  function (error) {
    // 错误处理
    return Promise.reject(error)
  }
)

// 创建一个插件对象
const Myplugs = {}
// 添加一个 Install 方法
// Vue：构造器
Myplugs.install = function (Vue) {
  // 添加逻辑
  // 将 axios 实例挂载到 Vue 的元素中
  Vue.prototype.$http = instance
}

// 暴露插件对象
export default Myplugs
