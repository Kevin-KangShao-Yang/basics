<template>
  <div>
      {{ msg }}<br/>
      <button @click="myfn">点我啊</button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            msg: '我是 App.vue'
        }
    },
    methods: {
        myfn() {
            console.log('点击了')
        }
    }
}
</script>

<style>

</style>
