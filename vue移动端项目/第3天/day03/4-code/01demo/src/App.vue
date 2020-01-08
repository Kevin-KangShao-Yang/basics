<template>
  <div>
    <h1>我是app.vue</h1>
    <button @click="login">点我登录</button>
  </div>
</template>

<script>
import myrequest from './assets/request'

export default {
  methods: {
    login() {
      this.$http({
        url: '/authorizations',
        method: 'POST',
        data: {
          mobile: '13911111111',
          code: '246810'
        }
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
