<template>
  <div>
    <h3>1.0 生成假数据</h3>
    <button @click="getMockData">点我使用 mock 生成假数据</button>
    <h3>2.0 拦截ajax请求</h3>
    <button @click="getAjaxData">点我使用 ajax 来获取数据</button>
    <h3>3.0 生成随机姓名</h3>
    <button @click="getname">点我生成随机姓名</button>
  </div>
</template>

<script>
// 导入
import Mock from 'mockjs'
import axios from 'axios'

export default {
  methods: {
    getMockData () {
      // 使用 mock 生成假数据
      var data =  Mock.mock({
        'list|1-10': [{
          'id|+1': 1
        }]
      })
      console.log(data)
    },
    getAjaxData () {
      axios.get('localhost:3000/getdata')
        .then(res => {
          console.log(res.data)
        }).catch(err => {
          console.log('出错啦')
        })
    },
    getname () {
      var data =  Mock.mock({
        'list|1-10': [{
          'id|+1': 1,
          'name': '@cname'
        }]
      })
      console.log(data)
    }
  }
}
</script>

<style>

</style>
