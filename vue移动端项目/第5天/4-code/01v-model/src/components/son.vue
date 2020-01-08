<template>
  <div class="son">
      <h4>我是子组件</h4>
      <div>接收父组件中的 num： {{ fnum }}</div>
      <button @click="changenum">点我改变 num 的值</button>
  </div>
</template>

<script>
export default {
    props: ['fnum'],
    data() {
        return {
            mynum: ''
        }
    },
    methods: {
        changenum() {
            this.mynum++
            // 将 this.mynum 的值传给父组 件
            this.$emit('changeappnum', this.mynum)
        }
    },
    created() {
        this.mynum = this.fnum
    }
}
</script>

<style>
.son {
    border: 10px solid pink
}
</style>
