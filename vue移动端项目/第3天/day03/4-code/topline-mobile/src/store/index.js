// 导入了 vue
import Vue from 'vue'
// 导入了 Vuex
import Vuex from 'vuex'
// 导入 userLocal
import { setUserLocal, getUserLocal } from '@/utils/userlocal'
// 在 vue 中使用 vuex
Vue.use(Vuex)

// 创建并导出一个仓库对象
export default new Vuex.Store({
  // 统一管理项目中的公用数据
  state: {
    user: getUserLocal()
  },
  // 修改 state 中的数据
  mutations: {
    setUser: function (state, obj) {
      // 赋值给 state 中的 user
      state.user = obj
      // 存储到 localstorage 中
      setUserLocal(obj)
    }
  }
})
