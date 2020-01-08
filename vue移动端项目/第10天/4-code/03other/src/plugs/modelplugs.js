// 将组件以 vue 的插件的形式添加到 vue 中
// 1.0 导入自己的组件: 以对象的方式进行的导入
import mymodel from "../modelcomponent/mymodel.vue";

// 2.0 以插件的方式添加到 Vue 中
export default {
  install: function(Vue) {
    // extend: 可以在 vue 中以某个组件对象为模板返回一个构造器
    let mymodelCon = Vue.extend(mymodel)
    // 在使用模式组件时，我希望通过调用 this.$mymodel 来显示
    Vue.prototype.$mymodel = () => {
      // 让 mymodel 在页面上进行显示
      // 创建一个新的 mymodel 对象
      let newModel = new mymodelCon()
      // 将 newModel 的 showmodel 属性设置为 true
      newModel.showmodel = true
      // 将 newModel 进行渲染渲染为虚拟 dom
      let mymodelel = newModel.$mount().$el
      // 将这个虚拟 dom 渲染到页面上
      document.body.appendChild(mymodelel)
    }
  }
};
