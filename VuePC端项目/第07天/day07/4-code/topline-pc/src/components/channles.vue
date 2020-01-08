<template>
    <!-- 单独封装一个频道组件 -->
    <el-select @change="optionChane" :value="mychannel">
        <el-option
            v-for="(item, index) in channleList"
            :key="index"
            :label="item.name"
            :value="item.id">
        </el-option>
    </el-select>
</template>

<script>
export default {
  data () {
    return {
      channleList: [],
      value: ''
    }
  },
  props: ['mychannel'],
  methods: {
    // 得到所有的频道数据
    getChannlesList () {
      this.$http({
        url: 'channels',
        method: 'GET'
      }).then(res => {
        this.channleList = res.channels
      })
    },
    // value：改变后的 options 对应的 value
    optionChane (value) {
      // 将 value 交给父组件
      this.$emit('tofather', value)
    }
  },
  created () {
    this.getChannlesList()
  }
}
</script>

<style>

</style>
