<template>
  <div class="app">
    <h2>我是组件！！！</h2>
    <input type="button" value="你好吗" @click="sayHi" />
    <p v-for="item in arr">{{item}}</p>
    <input type="text" v-model="message" />
    <h3>{{message}}</h3>
    <img src="./assets/logo.png" alt />
    <img src="./assets/d01d405a2ee6f05fcf5b8012afd694d9.gif" alt />
    <!-- 使用全局注册的组件 -->
    <niupi></niupi>
    <niupi></niupi>
    <niupi></niupi>
    <niupi></niupi>

    <!-- 尝试用局部注册组件 -->
    <rap></rap>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: ["西兰花", "剁辣椒", "秋刀鱼"],
      message: "xinxi "
    };
  },
  methods: {
    sayHi() {
      alert("吃了没~！！！");
    }
  }
};
</script>

<style>
.app {
  background-color: yellowgreen;
}
/* 使用css支持的语法导入 */
/* @import url('./assets/base.css'); */
</style>
