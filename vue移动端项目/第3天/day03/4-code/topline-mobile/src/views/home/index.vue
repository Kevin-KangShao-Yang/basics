<template>
  <div class="home">
    <!-- navBar -->
    <van-nav-bar title="首页" fixed />
    <div class="mytabs">
      <!-- tab栏 -->
      <van-tabs>
        <van-tab v-for="(item, index) in channelsList" :key="index" :title="item.name">
          <!-- v-model：pull 的加载状态 true 正在加载 false 加载完毕 -->
          <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                            <van-cell v-for="item in list" :key="item" :title="item" />
                        </van-list>
          </van-pull-refresh>-->
        </van-tab>
      </van-tabs>
      <!-- 添加一个小图标 -->
      <div class="tab-icon">
        <van-icon name="wap-nav" />
      </div>
    </div>
  </div>
</template>

<script>
// 导入请求频道的方法
import { apiGetChannelList } from '@/api/channle'

export default {
  data () {
    return {
      // list --> v-model
      loading: false,
      // list --> finished
      finished: false,
      // list 中渲染的数据
      channelsList: [],
      // 下拉刷新组件的状态
      isLoading: false
    }
  },
  methods: {
    // list --> load
    onLoad () {
      // 向 list 中添加内容
      // 让 list 在原有数据的基本上再添加 1 ~ 15
      this.list = [...this.list, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
      // 判断：如果 list 的长度超过了 100, 我们让为数据已经加载完毕
      if (this.list.length >= 100) {
        //  加载完成，finished为true，此时不会触发load事件
        this.finished = true
      }
      console.log('onload')
      //   非加载中，loading为false，此时会根据列表滚动位置判断是否触发load事件（列表内容不足一屏幕时，会直接触发）
      //   加载中，loading为true，表示正在发送异步请求，此时不会触发load事件
      // 重新将 v-model 中对应的值设置为 false
    //   在每次请求完毕后，需要手动将loading设置为false，表示加载结束
      this.loading = false
    },
    // 当下拉时触发
    onRefresh () {
      console.log('onRefresh')
      // 重置 list 中的数据
      this.list = []
      this.onLoad()
      this.isLoading = false
    },
    // 得到频道的数据
    async getChannelList () {
      try {
        let res = await apiGetChannelList(this.$http, {
          url: '/user/channels',
          method: 'GET'
        })
        // 将数据保存到 channelsList
        this.channelsList = res.channels
      } catch {
        this.$toast.fail('获取信息失败')
      }
    }
  },
  // 打开页面时会触发
  created () {
    // 加载频道数据
    this.getChannelList()
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

.mytabs {
  position: relative;
  .tab-icon {
    position: fixed;
    top: 50px;
    right: 0;
    width: 10%;
    height: 44px;
    text-align: center;
    line-height: 44px;
    font-size: 26px;
  }
}
.home {
  margin-top: 100px;
  margin-bottom: 50px;
}
// 在组件之外修改组件内部的样式：起不到作用的
.home /deep/ .van-tabs__wrap {
  width: 90% !important;
  position: fixed;
  top: 50px;
  left: 0;
  z-index: 1000;
}
</style>
