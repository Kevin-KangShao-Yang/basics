<template>
  <div class="modelson">
      <h3>我是使用了 v-model 的子组件</h3>
      <div>父组件中的 modelNum ： {{ modelnum }}</div>
      <button @click="changenum">点我改变 modelNum</button>
  </div>
</template>

<script>
export default {
    model: {
        prop: 'modelnum',
        event: 'modelinput'
    },
    props: ['modelnum'],
    methods: {
        changenum() {
            this.$emit('modelinput', 100)
        }
    }
}
</script>

<style>
.modelson {
    border: 10px solid skyblue;
}
</style>
