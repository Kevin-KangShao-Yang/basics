<template>
  <div>
      <button @click="showmodel">Show Modal</button>
  </div>
</template>

<script>
export default {
    methods: {
        showmodel() {
            // 以 js 的方式显示 Model
            this.$mymodel()
        }
    }
}
</script>

<style>

</style>
