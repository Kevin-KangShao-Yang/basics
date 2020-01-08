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
import Publish from '@/views/article/publish'
// 导入 list
import List from '@/views/article/list'

// 导入 nprogress
import nprogress from 'nprogress'
// 导入样式文件
import 'nprogress/nprogress.css'

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
        { path: '/article/publish', component: Publish },
        // 添加一个 list 路由
        { path: '/article/list', component: List },
        // 添加一个 修改文章 的路由
        { path: '/article/edit/:id', component: Publish} 
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
  // 开启进度条
  nprogress.start()
  // 说明请求的路由发生了改变
  // 排除跳转到登录页面
  if (to.path !== '/login') {
    // 得到 localstorage 中的 userInfo： 如果存在  userInfo 说明登录成功，如果 userInfo 不存在，说明没有登录
    let userInfo = window.localStorage.getItem('userInfo')
    // 判断用户是否登录：
    if (!userInfo) {
      // 如果不存在说明没有登录过，应该跳转到登录页面
      router.push('/login')
    } else {
      next() // 执行后续代码
    }
  } else {
    // 如果访问的是 login 说明不需要进行登录验证
    next() // 执行后续代码
  }
})

// 在全局后置钩子中关闭进度条
router.afterEach((to, from) => {
  // 关闭进度条
  nprogress.done()
})

export default router
