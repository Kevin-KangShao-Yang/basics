<template>
  <div class="searchList">
    <!-- 标题 -->
    <van-nav-bar title="搜索列表" fixed />
    <!-- 使用 vant 中的 list 组件 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 渲染的数据源 -->
      <van-cell-group>
        <van-cell @click="toDetail(item.art_id)" class="mycell" v-for="(item,index) in searchResult" :key="index" :title="item.title">
          <template slot="label">
            <!-- 图片 -->
            <van-grid :border="false" :column-num="3" v-if="item.cover.type > 0">
              <van-grid-item >
                <van-image v-for="(imgitem, imgindex) in item.cover.images" :key="imgindex" :src="imgitem" />
              </van-grid-item>
            </van-grid>
            <!-- 说明信息 -->
            <div>
              <span>{{ item.aut_name }}</span>
              <span>{{ item.pubdate | relativetime }}</span>
            </div>
            <!-- 点赞区域 -->
            <van-grid :column-num="3">
              <van-grid-item>
                <template slot="default">
                  <div @click.stop="commit" class="myitem">
                    <van-icon class="itemicon" name="smile-comment-o" />{{ item.comm_count }}评论
                  </div>
                </template>
              </van-grid-item>
              <van-grid-item>
                <template slot="default">
                  <div class="myitem" @click.stop="zan">
                    <van-icon class="itemicon" name="smile-comment-o" />{{ item.like_count }}点赞
                  </div>
                </template>
              </van-grid-item>
              <van-grid-item>
                <template slot="default">
                  <div class="myitem">
                    <van-icon class="itemicon" name="smile-comment-o" />{{ item.collect_count }}收藏
                  </div>
                </template>
              </van-grid-item>
            </van-grid>
          </template>
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
// 导入API
import { apiGetSearchList } from '@/api/search'
export default {
  data () {
    return {
      key: '', // 搜索的关键字
      page: 0, // 当前页
      perpage: 10, // 页容量
      searchResult: [], // 搜索出来的数据源
      totalCount: 0, // 数据的总条数
      loading: false, // 设置 list 的加载状态
      finished: false // 设置 list 是否加载完毕
    }
  },
  methods: {
    // list 的加载方法
    //  1) list 被加载
    //  2）下拉触底
    //  3）将 List 中的加载状态设置为 true
    onLoad () {
      // 让当前页 ++
      this.page++
      // 调用获取数据的方法
      this.getSearchList() // 异步方法
    },
    // 得到搜索的列表数据
    async getSearchList () {
      let res = await apiGetSearchList(this.$http, {
        page: this.page,
        perpage: this.perpage,
        q: this.key
      })
      // 保存数据：
      // 数据源
      this.searchResult = [...this.searchResult, ...res.results]
      // 判断：数据源是否请求结束
      if (this.searchResult.length === this.totalCount) {
        // 说明数据已经加载完毕
        this.finished = true
      }
      // 数据的总条数
      this.totalCount = res.total_count
      // 修改状态
      this.loading = false
    },
    // 模拟评论操作
    commit () {
      // 在评论之前需要判断问题是否登录
      let user = this.$store.state.user
      // 判断是否存在
      if (!user) {
        this.$toast.fail('对不起，您还没有登录，请先登录')
        setTimeout(() => {
          this.$router.push('/login')
        }, 2000)
        return
      }
      console.log('评论的操作')
    },
    // 模拟点赞
    zan () {
      // 登录验证
      let result = this.$login()
      if (!result) {
        return
      }
      console.log('模拟点赞')
    },
    // 跳转到详情页面
    toDetail (artid) {
      this.$router.push(`/detail/${artid}`)
    }
  },
  created () {
    // 得到用户传入的搜索关键字
    this.key = this.$route.params.key
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

.searchList {
  margin-top: 46px;
}

.myitem {
  font-size: 14px;
  display: flex;
  align-items: center;
  .itemicon {
    margin-right: 6px;
    font-size: 20px;
  }
}
.mycell {
  border-bottom: 10px solid #f4f5f6;
}
</style>
