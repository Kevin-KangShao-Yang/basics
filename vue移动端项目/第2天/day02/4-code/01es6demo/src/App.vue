<template>
  <div id="app">
    <h1>我是 App.vue:复习 ES6的模块化规范</h1>
  </div>
</template>

<script>
// 1.0 默认导入
import sayHi from './assets/mytool'
// 2.0 按需导入
import { name, age, sayHi } from './assets/mytool'
// 2.0 如果要将所有按需导出的属性全部导入
import * as myobj from './assets/mytool'
//导导入default默认内容  和  按需导入
import sayHi, { name } from './assets/mytool'

export default {
  // 打开页面时调用
  created() {
    sayHi()
    // console.log(name)
    console.log(myobj.name)
    console.log(myobj.age)
    myobj.sayHi2()
  }
}
</script>

<style>

</style>
