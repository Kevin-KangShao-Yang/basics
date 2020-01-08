<template>
  <div class="count" @click="addone">
      <h4>我是coutn.vue</h4>
      <div>num: {{ value }}</div>
  </div>
</template>

<script>
export default {
  props: ['value'], // 单向数据流
  methods: {
    addone() {
      this.$emit('input', this.value + 1)
    }
  }
}
</script>

<style>
.count {
    border: 10px solid red;
}
</style>
