import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入路由
import VueRouter from 'vue-router'

// 脚手架中 必须通过Vue.use 把路由设置上去
Vue.use(VueRouter)

// 导入组件
import rap from './components/rap.vue'
import dance from './components/dance.vue'

// 路由规则
const routes = [
  {
    path: '/rap',
    component: rap
  },
  {
    path: '/dance',
    component: dance
  }
]

// 创建路由对象
const router = new VueRouter({
  routes
})

// 设置到vue实例上
new Vue({
  render: h => h(App),
  // 设置路由
  router
}).$mount('#app')
