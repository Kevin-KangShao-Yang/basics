<template>
  <div class="son1">
      <h3>我是 son1</h3>
      <div>num: {{ num }}</div>
      <button @click="toson2">点我向 son2 传参</button>
  </div>
</template>

<script>
// 导入 bus
import bus from '../assets/bus'
export default {
    data () {
        return {
            num: 11
        }
    },
    methods: {
        toson2 () {
            // 将参数交给 bus
            bus.$emit('passnum', this.num)
        }
    }
}
</script>

<style>
.son1 {
  border: 10px solid pink;
}
</style>
