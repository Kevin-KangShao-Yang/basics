import Vue from 'vue'
import App from './App.vue'


// 全局引入的css写在main.js文件里面
import "./assets/css/iconfont.css"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
