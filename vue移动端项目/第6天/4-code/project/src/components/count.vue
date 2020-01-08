<template>
  <div @click="addone" class="count">
      <h3>我是 子组件</h3>
      <div>num: {{ value }}</div>
  </div>
</template>

<script>
export default {
  props: ['value'],
  methods: {
      addone() {
          this.$emit('input', this.value + 1)
      }
  }
}
</script>

<style>
.count {
    border: 10px solid pink;
}
</style>
