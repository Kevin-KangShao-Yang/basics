// 导入了 vue
import Vue from 'vue'
// 导入了第三方包 vue-router
import Router from 'vue-router'
// 导入 useElement
import UseElement from './views/useElement'
// 导入 login & Home
import Login from '@/views/login'
import Home from '@/views/home'
// 导入 layout
import Layout from '@/views/layout'
// 导入 publish
import Publish from '@/views/publish'

// 使用路由
Vue.use(Router)

// 创建并且导出一个 Router 对象
let router = new Router({
  // 设置路由选项
  routes: [
    // 根据目录的重定向
    {
      path: '/',
      redirect: '/home'
    },
    // 登录路由
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // 布局路由
    {
      path: '/layout',
      name: 'layout',
      component: Layout,
      // 添加它的子路由：
      children: [
        // 将 home 作为 layout 的子路由存在
        { path: '/home', component: Home },
        // 添加一个 publish 路由
        { path: '/publish', component: Publish }
      ]
    },
    // 测试路由
    {
      path: '/useElement',
      name: 'useElement',
      component: UseElement
    }
  ]
})

// router: 路由对象
// 给路由对象添加导航守卫：全局前置导航守卫
// 当由一个路由跳转到另一个路由时执行
//  to: 要到达目标路由
//  from: 发起跳转的路由
//  next: 函数，是否执行后续代码
router.beforeEach((to, from, next) => {
  // 说明请求的路由发生了改变
  // 排除跳转到登录页面
  if (to.path !== '/login') {
    // 得到 localstorage 中的 userInfo
    let userInfo = window.localStorage.getItem('userInfo')
    // 判断用户是否登录：
    if (!userInfo) {
      // 如果不存在说明没有登录过，应该跳转到登录页面
      router.push('/login')
    } else {
      next()// 执行后续代码
    }
  } else {
    next() // 执行后续代码
  }
})

export default router
