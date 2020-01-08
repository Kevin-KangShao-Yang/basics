<template>
    <div>
        <!-- 频道管理组件 -->
        <van-popup
            :value="value"
            @input="$emit('input', false)"
            position="bottom"
            :style="{ height: '80%' }">
            <div>
                <!-- 标题 -->
                <van-cell title-class="mytitle" title="我的频道">
                    <template slot="default">
                        <van-button v-if="iconshow===false" @click="iconshow=true" class="fonts" plain type="warning" size="small" round>编辑</van-button>
                        <van-button v-if="iconshow===true" @click="iconshow=false" class="fonts" plain type="warning" size="small" round>完成</van-button>
                    </template>
                </van-cell>
                <!-- 频道内容 -->
                <van-grid>
                    <van-grid-item class="channelitem" v-for="(item, index) in channelsList" :key="index">
                        <template slot="text">
                            <div @click="changeActive(index)">
                                <div :class="{active: index === activeTab}" class="channeltext">{{ item.name }}</div>
                                <van-icon @click.stop="delChannel(index)" v-show="iconshow && index !== 0" class="channelicon" name="clear" />
                            </div>
                        </template>
                    </van-grid-item>
                </van-grid>
            </div>
            <div>
                <!-- 标题 -->
                <van-cell title-class="mytitle" title="频道推荐">
                </van-cell>
                <!-- 频道内容 -->
                <van-grid>
                    <van-grid-item class="channelitem" v-for="(item, index) in otherChannel" :key="index">
                        <template slot="text">
                            <div @click="addChannel(item)" class="channeltext">{{ item.name }}</div>
                        </template>
                    </van-grid-item>
                </van-grid>
            </div>
        </van-popup>
    </div>
</template>

<script>
// 导入得到所有频道数据的 API
import { apiGetAllChannels, apiSetUserChannels } from '@/api/channle'

export default {
  props: ['value', 'channelsList', 'activeTab'],
  data () {
    return {
      iconshow: false,
      // 所有的频道数据
      allChannels: []
    }
  },
  methods: {
    // 得到所有的频道数据
    async getAllChannels () {
      let res = await apiGetAllChannels(this.$http, {
        url: '/v1_0/channels',
        method: 'GET'
      })
      // 赋值给所有频道数据
      this.allChannels = res.channels
    },
    // 当点击频道管理元素时触发
    changeActive (index) {
      this.$emit('update:activeTab', index)
    },
    // 添加频道
    addChannel (item) {
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
      this.channelsList.push(item)
      // 是否登录
      let user = this.$store.state.user
      // 没有登录
      if (!user) {
        // 保存到本地
        window.localStorage.setItem('channles', JSON.stringify(this.channelsList))
      } else {
        // 根据用户频道数据生成 channels
        let newArr = this.channelsList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        // 登录过
        let res = apiSetUserChannels(this.$http, {
          url: '/v1_0/user/channels',
          method: 'PUT',
          data: {
            channels: newArr
          }
        })
        console.log(res)
      }
    },
    // 删除频道
    delChannel (index) {
      this.channelsList.splice(index, 1)
      // 登录判断
      let user = this.$store.state.user
      // 判断
      if (!user) {
        // 保存到本地
        window.localStorage.setItem('channles', JSON.stringify(this.channelsList))
      } else {
        // 根据用户频道数据生成 channels
        let newArr = this.channelsList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        // 登录过
        let res = apiSetUserChannels(this.$http, {
          url: '/v1_0/user/channels',
          method: 'PUT',
          data: {
            channels: newArr
          }
        })
        console.log(res)
      }
    }
  },
  computed: {
    // 根据用户频道得到其它剩余频道
    otherChannel: function () {
      // 得到所有用户频道的 id 集合
      let ids = this.channelsList.map(item => {
        return item.id
      })
      // 根据用户频道 id 集合得到剩余频道
      let newArr = this.allChannels.filter(item => {
        return !ids.includes(item.id)
      })
      return newArr
    }
  },
  created () {
    // 得到所有的频道数据
    this.getAllChannels()
  }
}
</script>

<style lang="less" scoped>
.fonts {
    font-size: 16px;
}
.mytitle {
    font-size: 18px;
}
.channelitem {
    position: relative;
    .channeltext {
        color: #999;
        font-size: 14px;
    }
    .channelicon {
        position: absolute;
        top: 0;
        right: 0;
        color: #ccc;
    }
    .active {
        color: red;
    }
}
</style>
