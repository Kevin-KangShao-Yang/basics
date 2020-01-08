<template>
  <div class="login">
    <!-- 页面顶部 -->
    <van-nav-bar title="登录" />
    <!-- 输入框 -->
    <van-cell-group>
      <van-field v-model="user.mobile" clearable placeholder="请输入手机号" :error-message="errmsg.mobile">
        <template slot="left-icon">
          <i class="iconfont icon-icon207 login-phone"></i>
        </template>
      </van-field>
      <van-field v-model="user.code" clearable placeholder="请输入验证码" :error-message="errmsg.code">
        <template slot="left-icon">
          <i class="iconfont icon-lock login-lock"></i>
        </template>
        <van-button class="mycode" slot="button" size="small" round>发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login-btn">
      <van-button class="l-btn" type="info" size="large" @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
// 导入 userLogin
import { userLogin } from '@/api/user.js'

export default {
  data () {
    return {
      // 登录的数据
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      // 验证的错误信息
      errmsg: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async login () {
      // 参数的验证
      if (!this.validData()) {
        return
      }
      // 完成登录逻辑
      try {
        // 发送请求到服务器
        let res = await userLogin(this.$http, {
          url: '/authorizations',
          method: 'POST',
          data: this.user
        })
        // 将用户信息保存到 vuex 中
        this.$store.commit('setUser', res)
        // 跳转到 home
        this.$router.push('/home')
      } catch (err) {
        console.log(err)
        console.log('哎呀，出错啦！')
      }
    },
    validData () {
      // 验证 user 中的参数是否为空
      if (this.user.mobile.trim().length === 0) {
        this.errmsg.mobile = '手机号不能为空'
        return false
      }
      if (this.user.mobile.trim().length !== 11) {
        this.errmsg.mobile = '手机号必须是 11 位'
        return false
      }
      // 将错误信息重置为空
      this.errmsg.mobile = ''
      if (this.user.code.trim().length === 0) {
        this.errmsg.code = '验证码不能为空'
        return false
      }
      this.errmsg.code = ''
      return true
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar.van-hairline--bottom {
  background: #3296fa;
  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }
}

.login-phone {
  font-size: 24px;
}

.login-lock {
  font-size: 20px;
}

.mycode {
  background-color: #eee;
  color: #aaa;
}

.login-btn {
  margin: 15px;
  .l-btn {
    border-radius: 5px;
  }
}
</style>
