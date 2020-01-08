<template>
  <div class="mycount">
      <!-- 封装 "vant 给我的提供的" count 组件 -->
      <h2>我是mycount</h2>
      <count @input="$emit('input', $event)" :value="value" />
      <!-- <button @click=""></button> -->
  </div>
</template>

<script>
// 导入 vant 的组件 count
import count from './count'
export default {
  props: ['value'],
  components: {
    count
  },
  methods: {
    countinput() {
      this.$emit('input', this.value + 1)
    }
  }
}
</script>

<style>
.mycount {
    border: 10px solid red
}
</style>
