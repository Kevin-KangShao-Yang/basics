import Vue from "vue";
import Router from "vue-router";
// 导入组件
import News from "@/components/news.vue";
import Img from "@/components/img.vue";
import Music from "@/components/muisc.vue";
import Wang from "@/components/wang.vue";
import Jia from "@/components/jia.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/news",
      component: News,
      children: [
        { path: "/wang", component: Wang },
        { path: "/jia", component: Jia }
      ]
    },
    { path: "/img", component: Img },
    { path: "/music", component: Music }
  ]
});

// 一级路由的匹配过程：
//  /img
//  1.0 在 router.js 中去寻找 /img 路由
//  2.0 将 /img 路由对应的组件获取 Img
//  3.0 将 Img 组件渲染到 App.vue 中的 router-views 下

// 二级路由的匹配过程：
//  /wang
//  1.0 在 router.js 中去寻找 /wang 路由
//  2.0 找到 /wang 之后，发生当前路由为一个嵌套路由
//  3.0 优先加载 /wang 所在的一级路由 ----》 /news
//    3.1 找到 /news 对应的组件 News
//    3.2 将 news 渲染到 App.vue 中的 router-views 下
//  4.0 再渲染 news 的过程中发生 news 也有一个 router-views
//  5.0 再将二级路由 /wang 对应的组件渲染到 news 下的 router-views 中
//  6.0 最终得到的结果是 news 组件中 嵌套了 wang 组件