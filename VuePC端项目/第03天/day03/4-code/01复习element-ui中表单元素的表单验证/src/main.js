// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 导入 element 的源文件
import ElementUI from 'element-ui'
// 导入 element 的样式：默认从 当前项目的根目录下的 node_module 中加载对应的文件
import 'element-ui/lib/theme-chalk/index.css'

// 使用 ElementUI
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
