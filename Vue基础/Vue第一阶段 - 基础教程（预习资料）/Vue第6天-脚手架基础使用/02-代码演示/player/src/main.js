import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入路由
import VueRouter from 'vue-router'
// use一下
Vue.use(VueRouter)

// 导入组件
import results from './components/results.vue'
import player from './components/player.vue'
import video from './components/video.vue'
import comment from './components/comment.vue'

// 写规则
const routes = [
  {
    path:"/results",
    component:results
  },
  {
    path:"/player",
    component:player
  },
  {
    path:"/video",
    component:video
  },
  {
    path:"/comment",
    component:comment
  }
]
// 创建路由对象
const router = new VueRouter({
  routes
})

// 设置给vue实例
new Vue({
  render: h => h(App),
  // 把路由设置上来(挂载)
  router
}).$mount('#app')
