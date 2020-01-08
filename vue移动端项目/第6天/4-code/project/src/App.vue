<template>
  <div class="app">
    <h1>我是 父组件 </h1>
    <div>num: {{ num }}</div>
    <mycount v-model="num" />
  </div>
</template>

<script>
// 使用自己的组件
import mycount from './components/mycount'

export default {
  data() {
    return {
      num: 0
    }
  },
  components: {
    mycount
  }
}
</script>

<style>
.app {
  border: 10px solid #ccc;
}
</style>
