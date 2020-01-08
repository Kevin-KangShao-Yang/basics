<template>
  <div id="app">
    <!-- 传参 -->
    <h1>父传子</h1>
    <h2>父组件</h2>
    fmsg: {{ fmsg }}
    <ftos :abc="fmsg" />

    <h1>子传父</h1>
    <h2>父组件</h2>
    spassf: {{ spassf }}
    <stof @abcfn="getmsg" />
  </div>
</template>

<script>
import ftos from '@/components/01ftos'
import stof from '@/components/02stof'

export default {
  name: 'App',
  data() {
    return {
      fmsg: '父组件中的数据',
      spassf: ''
    }
  },
  components: {
    ftos,
    stof
  },
  methods: {
    getmsg (value) {
      this.spassf = value
    }
  }
}
</script>

<style>
#app {
  border: 10px solid #ccc;
}
</style>
