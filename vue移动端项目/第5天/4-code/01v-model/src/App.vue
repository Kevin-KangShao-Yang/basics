<template>
  <div class="app">
    <h1>我是 App.vue</h1>
    <!-- <h3>1.0 v-model 的基本用法</h3>
      {{ msg }}
      <div>
        <input type="text" v-model="msg">
      </div> -->
    <h3>2.0 父传入子传父的案例</h3>
    <div> 父组件中的 Num： {{ num }} </div>
    <!-- 需求：在父组件中有一个数据： num ，要传入给子组件， 子组件将来得到 num 之后需要渲染到页面上，并且点击一个按钮之后要修改这个 num 的值 -->
    <son @changeappnum="getnum" :fnum="num" />
    <hr>
    <hr>
    <hr>
    <h3>3.0 v-model 在组件中的使用</h3>
    <div> 父组件中的 modelNum {{ modelnum }} </div>
    <modelson v-model="modelnum" />
  </div>
</template>

<script>
import son from './components/son'
import modelson from './components/modelson'

export default {
  data() {
    return {
      msg: 'abc',
      num: 0,
      modelnum: 0
    }
  },
  methods: {
      getnum(value) {
        this.num = value
      }
  },
  components: {
    son,
    modelson
  }
}
</script>

<style>
.app {
  border: 10px solid #ccc;
  width: 800px;
  height: 600px;
  margin: 0 auto;
}
</style>
