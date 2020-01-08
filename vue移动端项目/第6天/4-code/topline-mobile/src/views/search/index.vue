<template>
  <div>
    <!-- 我是 搜索页面 -->
    <!-- 搜索区域 -->
    <!-- @search：当点击完成按钮时间触发 cancel：点击取消按钮时触发 -->
    <van-search class="topsearch" @input="thinksearch" v-model="search" show-action placeholder="请输入搜索关键词" @search="onSearch">
      <template slot="action">
        <van-button @click="onCancel" type="info">取消</van-button>
      </template>
    </van-search>
    <!-- 联想区域 -->
    <van-cell-group class="thinkplace">
      <van-cell @click="onSearch(item.item)" icon="search" class="tpcell" v-for="(item, index) in thinkList" :key="index">
        <template slot="title">
          <div v-html="item.colorItem"></div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 搜索历史 -->
  </div>
</template>

<script>
// 导入搜索的接口
import { apiThinkSearch } from '@/api/search'

export default {
  data () {
    return {
      search: '',
      // 联想的结果
      thinkList: []
    }
  },
  methods: {
    // 点击完成按钮时触发
    onSearch (item) {
      // 判断：没有内容时不应该跳转
      if (this.search.trim().length === 0) {
        this.$toast('搜索的内容必须存在')
        return
      }
      // 得到输入框中的内容:加入输入的内容
      this.$router.push(`/searchList/${item}`)
    },
    onCancel () {
      this.search = ''
    },
    // 联想操作
    async thinksearch () {
      // 判断内容是否为空，如果为空不联想
      if (this.search.trim().length === 0) {
        return
      }
      let res = await apiThinkSearch(this.$http, this.search)
      // 改造 res
      this.thinkList = res.options.map(item => {
        // 将元素以关键字进行分隔
        return {
          colorItem: item.split(this.search).join(`<span style="color:red">${this.search}</span>`), // 带有颜色的内容
          item: item // 默认文本
        }
      })
    }
  },
  watch: {
    // 监听 search:当它为空时，联想列表也应该为空
    search: function () {
      if (this.search.trim().length === 0) {
        this.thinkList = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.topsearch {
  background-color: #3296fa !important;
  .colorW {
    color: white
  }
  /deep/ .van-search__action:active {
    background-color: #3296fa !important;
  }
}
.thinkplace {
  .tpcell {
    background-color: #f5f7f9;
  }
}
</style>
