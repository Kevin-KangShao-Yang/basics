<template>
  <div class="home">
    <!-- navBar -->
    <van-nav-bar title="首页" fixed />
    <div class="mytabs">
      <!-- tab栏 -->
      <van-tabs v-model="activeTab">
        <van-tab v-for="(item, index) in channelsList" :key="index" :title="item.name">
          {{ activeTab }}
          <!-- v-model：pull 的加载状态 true 正在加载 false 加载完毕 -->
          <van-pull-refresh v-model="item.pull" @refresh="onRefresh">
            <van-list v-model="item.up" :finished="item.finished" finished-text="没有更多了" @load="onLoad">
              <van-cell v-for="(subitem, subindex) in item.articleList" :key="subindex" :title="subitem.name" />
            </van-list>
          </van-pull-refresh>
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
// 导入请求文章的方法
import { apiGetChannleArticle } from '@/api/article'

export default {
  data () {
    return {
      // list --> v-model
      loading: false,
      // list --> finished
      finished: false,
      // list 中渲染的数据
      channelsList: [],
      // 设置激活的 tab
      activeTab: 0
    }
  },
  methods: {
    // list --> load
    async onLoad () {
      // 得到当前选中的频道
      let channle = this.channelsList[this.activeTab]
      // 得到当前频道的 id
      let channleid = channle.id
      // 根据 id 去请求文章数据
      let res = await apiGetChannleArticle(this.$http2, {
        url: '/articles',
        method: 'GET',
        query: {
          channel_id: channleid, // 需要的频道 id
          timestamp: Date.now(), // 当前时间戳
          with_top: 0 // 不置顶
        }
      })
      console.log(res)
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
        // 判断用户是否登录：
        //  如果登录 ---> 直接请求用户频道数据
        //  如果没有登录
        //      localostroage 中是否存储数据
        //          如果存在直接获取
        //          如果不存在再去服务器中得到
        // 得到用户信息
        let user = this.$store.state.user
        // 判断
        // 没有登录
        if (!user) {
          // 得到 localstorage 中的频道数据
          let channles = JSON.parse(window.localStorage.getItem('channles'))
          if (channles) {
            // 将数据直接赋值给
            this.channelsList = channles
          } else {
            let res = await apiGetChannelList(this.$http, {
              url: '/user/channels',
              method: 'GET'
            })
            // 将服务器返回的数据设置给 channelsList
            this.channelsList = res.channels
          }
        } else {
          // 已经登录
          let res = await apiGetChannelList(this.$http, {
            url: '/user/channels',
            method: 'GET'
          })
          // 将服务器返回的数据设置给 channelsList
          this.channelsList = res.channels
        }
        this.addProtoToChannlesList()
      } catch {
        this.$toast.fail('获取信息失败')
      }
    },
    // 向数据源 channlesList 中添加额外属性（必须是响应式的）：
    addProtoToChannlesList () {
      // 给 channelsList 中的数据添加额外属性
      this.channelsList.forEach(item => {
        this.$set(item, 'up', false)
        this.$set(item, 'finished', false)
        this.$set(item, 'articleList', [])
        this.$set(item, 'pull', false)
      })
      // for (var i = 0; i < this.channelsList.length; i++) {
      //   // 添加额外属性
      //   // 添加 up：上拉状态
      //   this.$set(this.channelsList[i], 'up', false)
      //   // 添加 finished：上拉是否完结
      //   this.$set(this.channelsList[i], 'finished', false)
      //   // 添加 list 的数据源： articleList
      //   this.$set(this.channelsList[i], 'articleList', [])
      //   // 添加下拉状态 pull
      //   this.$set(this.channelsList[i], 'pull', false)
      // }
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
