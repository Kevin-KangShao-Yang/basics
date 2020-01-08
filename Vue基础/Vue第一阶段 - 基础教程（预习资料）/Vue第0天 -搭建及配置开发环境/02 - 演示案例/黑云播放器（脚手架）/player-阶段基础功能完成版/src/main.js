import Vue from 'vue'
import App from './App.vue'

// 全局导入样式
import './assets/css/index.css'
import './assets/css/iconfont.css'

// 饿了吗ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 注册插件
Vue.use(ElementUI);

// 导入axios
import axios from 'axios'
// 设置axios的基础地址
// axios设置到原型上
axios.defaults.baseURL = 'https://autumnfish.cn/';
Vue.prototype.$axios = axios

// 路由相关
import VueRouter from 'vue-router'

// 注册插件
Vue.use(VueRouter)

// 导入组件
import slider from './components/slider.vue'
import results from './components/results.vue'
import player from './components/player.vue'
import mv from './components/mv.vue'
import comment from './components/comment.vue'

// 路由规则
const routes = [
  // 重定向
  {
    path:'/',
    redirect:'/slider'
  },
  {
    path:'/slider',
    component:slider
  },
  {
    path:'/results/:search',
    component:results
  },
  {
    path:'/player/:id',
    component:player
  },
  {
    path:'/mv/:id',
    component:mv
  },
  {
    path:'/comment/:id',
    component:comment
  }
]
const router = new VueRouter({
  routes
})




Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载到Vue实例上
  router,
  // 每次刷新都先去首页
  created() {
    router.push('/')
  },
}).$mount('#app')
