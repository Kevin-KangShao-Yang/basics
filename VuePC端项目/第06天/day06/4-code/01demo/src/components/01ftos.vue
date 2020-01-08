<template>
  <div class="son">
      <h2>子组件</h2>
      abc: {{ abc }}
  </div>
</template>

<script>
export default {
    props: ['abc']
}
</script>

<style scoped>
.son {
    border: 10px solid pink;
}
</style>
