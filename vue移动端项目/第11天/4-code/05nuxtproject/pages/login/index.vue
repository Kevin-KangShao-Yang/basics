<template>
  <div>
    <div class="auth-page">
      <div class="container page">
        <div class="row">

          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Sign up</h1>
            <p class="text-xs-center">
              <a href="">Have an account?</a>
            </p>

            <ul class="error-messages">
              <li>That email is already taken</li>
            </ul>

            <form>
              <fieldset class="form-group">
                <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password">
              </fieldset>
              <button @click.prevent="login" class="btn btn-lg btn-primary pull-xs-right">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入登录接口
import { apiLogin } from '../../api/user'

export default {
  data() {
    return {
      user: {
        email: '913009030@qq.com',
        password: '123123123'
      }
    }
  },
  methods: {
    // 登录
    async login() {
      let res = await apiLogin(this.user)
      // console.log(res)
      // 将数据保存到 vuex
      this.$store.commit('setuser', res.data.user)
      console.log(this.$store.state.user)
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
