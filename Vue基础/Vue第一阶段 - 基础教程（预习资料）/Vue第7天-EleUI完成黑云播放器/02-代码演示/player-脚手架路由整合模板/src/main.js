import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import vueRouter from 'vue-router'
Vue.use(vueRouter)

//导入路由需要的相关组件
import results from "./components/01.results.vue"
import player from "./components/02.player.vue"
import hvideo from "./components/03.video.vue"
import comment from "./components/04.comment.vue"

//定义路由规则，每个路由映射一个组件
const routes = [
  {
    path:"/results",
    component:results
  },{
    path:"/player",
    component:player
  },{
    path:"/hvideo",
    component:hvideo
  },{
    path:"/comment",
    component:comment
  }
]
//创建router实例
const router = new vueRouter({
  routes
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
