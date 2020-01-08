<template>
  <div>
    hello nuxt
    <!-- 打开页面时动态请求频道数据 -->
    <ul>
      <li v-for="(item, index) in channels" :key="index"> {{ item.name }} </li>
    </ul>
  </div>
</template>

<script>
// 导入 axios
import axios from 'axios'

export default {
  data () {
    return {
      channels: []
    }
  },
  methods: {
    async getChannleList() {
      let res = await axios({
        url: 'http://ttapi.research.itcast.cn/app/v1_0/user/channels',
        method: 'GET'
      })
      this.channels = res.data.data.channels
    }
  },
  mounted () {
    this.getChannleList()
  }
}
</script>

<style>

</style>

