// 从模块化的角度来说它的职责只有一个：
//  创建一个 Vue 实例，并挂载对应的属性

// 导入了 vue ：导入了 vue 的构造器
import Vue from 'vue'
// 导入 App.vue（根组件）
import App from './App.vue'
// 导入了 router
import router from './router'
// 导入了 vuex
import store from './store'
// 导入 vant
import Vant, { Lazyload } from 'vant'
// 导入自己封装的插件
import AxiosPlugs from '@/utils/request.js'

// 导入 vant 的样式
import 'vant/lib/index.css'
// 导入字体图标
import '@/styles/index.css'

// 在 vue 中使用 vant
Vue.use(Vant)

// options 为可选参数，无则不传
Vue.use(Lazyload)

// 在 vue 中使用插件
//  use 本质其实是调用 AxiosPlugs 的 install 方法
Vue.use(AxiosPlugs)

Vue.config.productionTip = false

// 创建一个了 vue 实例
new Vue({
  router, // 加载 router
  store, // 加载 vuex
  render: h => h(App) // 将 App.vue 渲染到 index.html 中的 id 为 app 的元素上
}).$mount('#app')
// $mount() 与 属性 el 是一样的，都是用来让内容挂载到 index.html 中的 id 为 App 的元素上
