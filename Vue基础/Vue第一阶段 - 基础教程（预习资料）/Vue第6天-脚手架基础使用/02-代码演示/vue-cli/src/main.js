// 导包的语法 可以等同于 const Vue = require('vue')
// import 是es6中新的模块化语法 导包
import Vue from 'vue'
// 导包的语法 可以等同于 const App = require('./App.vue')
// 单文件  组件
import App from './App.vue'

// 导入 样式
import './assets/base.css'

// 导入组件
import niupi from './components/niupi.vue'
// 注册组件
Vue.component('niupi', niupi)

// 是否打印 终端信息
// 默认值是 true
// Vue.config.productionTip = false
// Vue.config.productionTip = true

// 创建Vue实例
new Vue({
  // 对应的是`public/index.html`
  el: '#appniupi',
  // 把App这个组件，渲染到Vue实例中
  render: h => h(App)
})
// .$mount('#app')
