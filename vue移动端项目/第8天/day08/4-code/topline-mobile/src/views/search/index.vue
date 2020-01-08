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
    <van-cell-group v-if="thinkList.length > 0" class="thinkplace">
      <van-cell @click="onSearch(item.item)" icon="search" class="tpcell" v-for="(item, index) in thinkList" :key="index">
        <template slot="title">
          <div v-html="item.colorItem"></div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 搜索历史 -->
    <van-cell-group v-else>
      <van-cell title="搜索历史">
        <template slot="right-icon">
          <div v-if="isProcess===false">
            <van-icon @click="isProcess=true" name="delete" />
          </div>
          <div v-if="isProcess===true">
            <a href="#" @click="delAll" style="margin: 0 10px">清空历史</a>
            <a href="#" @click="isProcess=false">完成</a>
          </div>
        </template>
      </van-cell>
      <van-cell @click="onSearch(item)" :title="item" v-for="(item, index) in historyList" :key="index">
        <template slot="icon">
          <van-icon style="line-height: 24px;margin: 0 10px;" name="search">
          </van-icon>
        </template>
        <template slot="right-icon">
          <van-icon @click.stop="delItem(index)" v-if="isProcess===true" name="close" />
        </template>
      </van-cell>
    </van-cell-group>
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
      thinkList: [],
      // 防抖的定时器
      timer: null,
      // 控制是否用来操作历史
      isProcess: false,
      // 定义一个数组：用来记录所有的搜索数据
      historyList: JSON.parse(window.localStorage.getItem('history')) || []
    }
  },
  methods: {
    // 点击完成按钮时触发
    onSearch (item) {
      this.search = item
      // 判断：没有内容时不应该跳转
      if (this.search.trim().length === 0) {
        this.$toast('搜索的内容必须存在')
        return
      }
      // 将搜索的内容保存到数组中
      this.historyList.unshift(item)
      // 1.0 数组的去重
      this.historyList = [...new Set(this.historyList)]
      // 2.0

      // 将数组保存到 localstorage 中
      window.localStorage.setItem('history', JSON.stringify(this.historyList))
      // 得到输入框中的内容:加入输入的内容
      this.$router.push(`/searchList/${item}`)
    },
    onCancel () {
      this.search = ''
    },
    // 联想操作
    thinksearch () {
      // 清除定时器
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
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
      }, 300)
    },
    // 删除元素
    delItem (index) {
      // 在去数据源中删除
      this.historyList.splice(index, 1)
      // 更新到本地
      window.localStorage.setItem('history', JSON.stringify(this.historyList))
    },
    // 删除所有数据
    delAll () {
      // 添加一个询问框
      this.$dialog.confirm({
        message: '您确定要删除吗'
      }).then(() => {
        this.historyList = []
        window.localStorage.removeItem('history')
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
