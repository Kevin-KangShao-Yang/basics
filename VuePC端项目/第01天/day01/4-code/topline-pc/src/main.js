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
