// 封装所有与 axios 相关的逻辑
// 改造为一个插件

// 导入 axios
import axios from 'axios'
// 导入 store
import store from '@/store'
// 导入 JSON-bigint
import JSONBig from 'json-bigint'

// 创建一个 axios 实例
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/', // 请求基准地址
  transformResponse: [function (data) {
    // console.log(11111111111111111111111111111111111111111111111)
    try {
      return JSONBig.parse(data)
    } catch (err) {
      console.log(err)
      return data
    }
  }]
})

// 创建另一个 axios 实例：请求接口： /v1_0/authroizations
const refreshInstacn = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/'
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
  async function (error) {
    // 401 的错误其实已经被响应拦截器捕获到了
    // 只要状态是 401 说明用户的 token 过期了
    // 判断一下返回的状态是否是 401
    console.log('------------------------------------------------------------------------------')
    // console.log(error)
    // dir: 将对象详细信息进行打印
    if (error.response.status === 401) {
      // 得到 refresh_token token
      let user = store.state.user
      // console.log('更新token')
      // 1.0 发送请求到服务器：传入 refresh_token ，得到新的 token
      let res = await refreshInstacn({
        url: '/v1_0/authorizations',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user.refresh_token}` // refresh_token
        }
      })
      // 更新后的 token：res.data.data.token
      user.token = res.data.data.token
      store.commit('setUser', user)
      // token 已经更新了：需要重新发送请求
      return instance(error.config)
    }
    console.log('------------------------------------------------------------------------------')
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
