// 导入了 vue
import Vue from 'vue'
// 导入 App.vue（根组件）
import App from './App.vue'
// 导入了 router
import router from './router'
// 导入了 vuex
import store from './store'
// 导入 vant
import Vant from 'vant'
// 导入 vant 的样式
import 'vant/lib/index.css'

// 在 vue 中使用 vant
Vue.use(Vant)
Vue.config.productionTip = false

// 创建一个了 vue 实例
new Vue({
  router, // 加载 router
  store, // 加载 vuex
  render: h => h(App) // 将 App.vue 渲染到 index.html 中的 id 为 app 的元素上
}).$mount('#app')
// $mount() 与 属性 el 是一样的，都是用来让内容挂载到 index.html 中的 id 为 App 的元素上
