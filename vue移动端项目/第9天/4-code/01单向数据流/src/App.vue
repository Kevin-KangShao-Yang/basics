<template>
  <div class="app">
    <h1>我是父组件</h1>
    <div>num: {{ num }}</div>
    <button @click="fatherfn">点我 Num ++</button>
    <div> obj.name: {{ obj.name }} </div>
    <button @click="fatherfoo">点我修改 name</button>
    <son :num="num" :obj="obj" />
  </div>
</template>

<script>
import son from './components/son'
export default {
  data () {
    return {
      num: 0,
      obj: {
        name: 'xjj'
      }
    }
  },
  components: {
    son
  },
  methods: {
    fatherfn () {
      this.num ++
    },
    fatherfoo() {
      this.obj.name = 'lyf'
    }
  }
}
</script>

<style>
.app {
  border: 10px solid pink;
}
</style>
