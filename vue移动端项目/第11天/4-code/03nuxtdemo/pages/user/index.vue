<template>
  <div>
    <h3>使用 asyncData 来使用服务器渲染方式来获取数据</h3>
    <ul>
      <li v-for="(item, index) in channels" :key="index">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
// 导入 axios
import axios from 'axios'

export default {
  // nuxt 中提供的服务器渲染方式获取数据的方法
  async asyncData(params) {
    // console.log(params)
    let res = await axios({
      url: 'http://ttapi.research.itcast.cn/app/v1_0/user/channels',
      method: 'GET'
    })
    // 1.0 在 asyncData 不能使用 this ---> undefined
    // 2.0 在 asyncData 如果在给 data 中添加数据直接 return
    // 3.0 在 asyncData 返回的数据的使用方式与 data 中的数据一样
    console.log('-----------------------asyncData------------------------------')
    return {
      channels: res.data.data.channels
    }
  },
  beforeCreate() {
    console.log('---------------------------beforeCreate-----------------------------')
  },
  created() {
    console.log('---------------------------created-----------------------------')
  },
  beforeMount() {
    console.log('---------------------------beforeMount-----------------------------')
  },
  mounted() {
    console.log('---------------------------mounted-----------------------------')
  },
  beforeUpdate() {
    console.log('---------------------------beforeUpdate-----------------------------')
  },
  updated() {
    console.log('---------------------------updated-----------------------------')
  },
  beforeDestroy() {
    console.log('---------------------------beforeDestroy-----------------------------')
  },
  destroyed() {
    console.log('---------------------------destroyed-----------------------------')
  },
}
</script>

<style>

</style>
