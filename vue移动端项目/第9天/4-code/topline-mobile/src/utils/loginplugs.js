// 进行登录验证

import Vue from 'vue'
// 导入了 router
import router from '@/router'
// 导入了 vuex
import store from '@/store'
// 导入 vant
import { Toast } from 'vant'
Vue.use(Toast)

var loginPlugs = {}
// 添加一个 install 方法
loginPlugs.install = function (Vue) {
  Vue.prototype.$login = function () {
    // 得到用户的信息
    let user = store.state.user
    // 判断
    if (!user) {
      Toast.fail('对不起，您还没有登录，请先登录')
      setTimeout(() => {
        router.push('/login/nologin')
      }, 2000)
      return false
    }
    return true
  }
}

// 导入插件对象
export default loginPlugs
