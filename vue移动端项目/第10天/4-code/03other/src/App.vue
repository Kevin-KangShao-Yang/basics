<template>
  <div>
    <h1>补充知识点</h1>
    <h3>1.0 $attrs</h3>
    <attrs01 :msg="msg" placeholder="请输入内容123" type="password" />
    <hr>
    <hr>
    <h3>2.0 $listeners</h3>
    <listeners02 @abc="fnabc" @input="fninput" @blur="fnblur" />
    <hr>
    <hr>
    <h3>3.0 插槽</h3>
    <!-- 
      使用具名插槽
      <myslot03>
        <template v-slot:content>
          我自己定义的定义
        </template>
        <template v-slot:foot>
          我的底部
        </template>
        <template>
          我的头部
        </template>
      </myslot03> 
    -->
    <myslot03>
      <template v-slot="scope">
        <ul>
          <li v-for="item in scope.hobby" :key="item">{{item}}</li>
        </ul>
      </template>
    </myslot03>
    <hr>
    <hr>
    <h3>4.0 动态组件</h3>
    <ul>
      <li><a href="#" @click.stop="showcomponent='login04'">登录</a></li>
      <li><a href="#" @click.stop="showcomponent='zhuce04'">注册</a></li>
    </ul>
    <component :is="showcomponent"></component>
    <!-- <login04 v-show="showcom === 'login'" />
    <zhuce04 v-show="showcom === 'zhuce'" /> -->
  </div>
</template>

<script>
// 导入 01
import attrs01 from './components/$attrs01'
import listeners02 from './components/listeners02'
import myslot03 from './components/myslot03'
import login04 from './components/login04'
import zhuce04 from './components/zhuce04'

export default {
  data () {
    return {
      msg: '我是 App',
      showcom: '',
      showcomponent: 'zhuce04'
    }
  },
  methods: {
    fnabc() {
      console.log('fnabc')
    },
    fninput() {
      console.log('fninput')
    },
    fnblur() {
      console.log('fnblur')
    }
  },
  components: {
    attrs01,
    listeners02,
    myslot03,
    login04,
    zhuce04
  }
}
</script>

<style>

</style>
