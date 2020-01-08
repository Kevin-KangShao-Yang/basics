<template>
  <div class="app">
    <h1>我是 App.vue</h1>
    <div>num: {{ num }}</div>
    <mymycount v-model="num" />
  </div>
</template>

<script>
import mymycount from './components/mymycount.vue'
export default {
  data () {
    return {
      num: 0
    }
  },
  components: {
    mymycount
  }
}
</script>

<style>
.app {
  border: 10px solid #ccc;
}
</style>
