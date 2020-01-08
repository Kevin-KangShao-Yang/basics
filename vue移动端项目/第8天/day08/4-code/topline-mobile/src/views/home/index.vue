<template>
    <div class="home">
        <!-- navBar -->
        <van-nav-bar title="首页" fixed />
        <div class="mytabs">
            <!-- tab栏 -->
            <van-tabs v-model="activeTab">
                <van-tab v-for="(item, index) in channelsList" :key="index" :title="item.name">
                    <!-- v-model：pull 的加载状态 true 正在加载 false 加载完毕 -->
                    <van-pull-refresh v-model="item.pull" @refresh="onRefresh">
                        <van-list v-model="item.up" :finished="item.finished" finished-text="没有更多了" @load="onLoad">
                            <van-cell class="mycell" v-for="(subitem, subindex) in item.articleList" :key="subindex" title-class="mytitle" :title="subitem.title">
                              <template slot="label">
                                <!-- 图片 -->
                                <van-grid v-if="subitem.cover.type > 0" :border="false" :column-num="3">
                                  <van-grid-item v-for="(imgitem, imgindex) in subitem.cover.images" :key="imgindex">
                                    <van-image lazy-load :src="imgitem" />
                                  </van-grid-item>
                                </van-grid>
                                <!-- 结构：作者，评论数，时间 -->
                                <div class="other">
                                  <div class="other-left">
                                      <span>{{ subitem.aut_name }}</span>
                                      <span>{{ subitem.comm_count }} 评论</span>
                                      <!-- 使用过滤器处理时间 -->
                                      <span>{{ subitem.pubdate | relativetime }}</span>
                                  </div>
                                  <div class="other-right">
                                    <van-icon @click="openmore(subitem, item.articleList)" name="cross" />
                                  </div>
                                </div>
                              </template>
                            </van-cell>
                        </van-list>
                    </van-pull-refresh>
                </van-tab>
            </van-tabs>
            <!-- 添加一个小图标 -->
            <div class="tab-icon">
                <van-icon @click="openPop" name="wap-nav" />
            </div>
        </div>
        <!-- 频道管理: 封装为一个组件 -->
        <!-- <channlepop @update:activeTab="activeTab=$event" :activeTab="activeTab" :channelsList="channelsList" v-model="show" /> -->
        <channlepop :activeTab.sync="activeTab" :channelsList="channelsList" v-model="show" />
        <!-- 弹出框 v-model：控制弹出框的显示和隐藏 -->
        <!-- 传入两个参数：1）当前文章数据 2）当前显示的文章的数据源 -->
        <moredialog :currentArticle="currentItem" :articleList="itemList"  v-model="moreshow" />
    </div>
</template>

<script>
// 导入请求频道的方法
import { apiGetChannelList } from '@/api/channle'
// 导入请求文章的方法
import { apiGetChannelArticle } from '@/api/article'
// 导入频道管理组件
import channlepop from '@/components/channlePop'
// 导入更多操作组件
import moredialog from '@/components/moredialog'

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
      isLoading: false,
      // 默认选中的频道下标
      activeTab: 0,
      // 控制弹窗的显示和隐藏
      show: false,
      // 控制更多操作弹窗的显示和隐藏
      moreshow: false,
      // 当前操作的数据对象
      currentItem: {},
      // 当前显示的数据源
      itemList: []
    }
  },
  methods: {
    // list --> load
    async onLoad () {
      // 当打开页面时会执行 list 中的 load 事件
      let channel = this.channelsList[this.activeTab]
      // 得到当前选中的频道的 id
      let channelId = channel.id
      // 定义一个 timestamp
      let timestamp
      // 判断：是否是第一次请求
      if (channel.timestamp === 0) {
        timestamp = Date.now()
      } else {
        timestamp = channel.timestamp
      }

      // 请求当前选中频道下的文章列表
      let res = await apiGetChannelArticle(this.$http, {
        url: '/v1_1/articles',
        method: 'GET',
        query: {
          channel_id: channelId, // 频道 id
          timestamp: timestamp, // 时间戳（相当于分页的标识）
          with_top: 0 // 不包含置顶
        }
      })
      // 保存到 channel 中
      channel.articleList = [...channel.articleList, ...res.results]
      // 保存timestamp
      channel.timestamp = res.pre_timestamp

      // 判断返回的数据是否为空
      if (res.pre_timestamp === null) {
        // 说明数据已经加载完成
        channel.finished = true
      }

      // 手动停止加载状态
      channel.up = false
    },
    // 当下拉时触发
    onRefresh () {
      // 得到当前选中的频道
      let channel = this.channelsList[this.activeTab]
      // 清除数据源
      channel.articleList = []
      // 将时间戳设置 0
      channel.timestamp = 0
      channel.finished = false
      channel.up = false
      // 手动获取数据
      this.onLoad()
      // 将下拉状态重置为 false
      channel.pull = false
    },
    // 得到频道的数据
    async getChannelList () {
      try {
        // 得到用户信息
        let user = this.$store.state.user
        // 判断用户是否登录：
        if (!user) {
          // 没有登录，需要判断是否在 Localstorage 中存在数据
          let channles = JSON.parse(window.localStorage.getItem('channles'))
          if (channles) {
            // 直接赋值给 channlesList
            this.channelsList = channles
          } else {
            // 没有数据：请求服务器
            let res = await apiGetChannelList(this.$http, {
              url: '/v1_0/user/channels',
              method: 'GET'
            })
            this.channelsList = res.channels
          }
        } else {
          // 没有数据：请求服务器
          let res = await apiGetChannelList(this.$http, {
            url: '/v1_0/user/channels',
            method: 'GET'
          })
          this.channelsList = res.channels
        }
        // 动态向 channlesLIst 中添加额外的属性
        this.addProtoToChannles()
      } catch {
        this.$toast.fail('获取信息失败')
      }
    },
    addProtoToChannles () {
      this.channelsList.forEach(item => {
        // 下拉状态
        this.$set(item, 'pull', false)
        // 上拉的状态
        this.$set(item, 'up', false)
        // 数据完结的状态
        this.$set(item, 'finished', false)
        // 文章数据的集合
        this.$set(item, 'articleList', [])
        // 添加一个 timestampe
        this.$set(item, 'timestamp', 0)
      })
      console.log(this.channelsList)
    },
    openPop () {
      this.show = true
    },
    // 打开更多操作
    openmore (subitem, itemList) {
      // 打开更多操作的面板
      this.moreshow = true
      // 得到当前文章
      // 得到当前显示的文章数据源
      this.currentItem = subitem
      this.itemList = itemList
    }
  },
  // 打开页面时会触发
  created () {
    // 加载频道数据
    this.getChannelList()
  },
  components: {
    channlepop,
    moredialog
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
.mytitle {
  font-size: 16px;
  font-weight: 700;
}
.other {
  display: flex;
  justify-content: space-between;
  .other-left {
    span {
      margin: 0 10px;
      font-weight: 400;
    }
  }
}

</style>
