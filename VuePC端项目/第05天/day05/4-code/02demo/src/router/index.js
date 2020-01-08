import Vue from 'vue'
import Router from 'vue-router'
import news from '../components/new.vue'
import mus from '../components/mus.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // 给新闻添加一个动态路由
    { path: '/news/:id', component: news },
    { path: '/mus', component: mus }
  ]
})
