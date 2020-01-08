import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


//引入饿了么UI插件框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

//导入axios
import axios from 'axios'
// 设置基地址
axios.defaults.baseURL = 'https://autumnfish.cn';
// 把axios设置给Vue的原型
Vue.prototype.$axios = axios 

import vueRouter from 'vue-router'
Vue.use(vueRouter)

//导入路由需要的相关组件
import results from "./components/01.results.vue"
import player from "./components/02.player.vue"
import hvideo from "./components/03.video.vue"
import comment from "./components/04.comment.vue"
import slider from "./components/06.slider.vue"

//定义路由规则，每个路由映射一个组件
const routes = [
  {
    path:"/results/:keyword",
    component:results
  },{
    path:"/player/:id",
    component:player
  },{
    path:"/hvideo/:mvid",
    component:hvideo
  },{
    path:"/comment",
    component:comment
  },{
    path:"/",
    component:slider
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
