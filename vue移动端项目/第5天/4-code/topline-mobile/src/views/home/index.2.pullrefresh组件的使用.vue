<template>
    <div class="home">
        <!-- navBar -->
        <van-nav-bar title="首页" fixed />
        <div class="mytabs">
            <!-- tab栏 -->
            <van-tabs>
                <van-tab v-for="index in 8" :key="index" :title="'标签 ' + index">
                    <!-- v-model：pull 的加载状态 true 正在加载 false 加载完毕 -->
                    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                            <van-cell v-for="item in list" :key="item" :title="item" />
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
export default {
  data () {
    return {
      // list --> v-model
      loading: false,
      // list --> finished
      finished: false,
      // list 中渲染的数据
      list: [],
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
        // 已经加载完毕
        this.finished = true
      }
      console.log('onload')
      // 重新将 v-model 中对应的值设置为 false
      this.loading = false
    },
    // 当下拉时触发
    onRefresh () {
      console.log('onRefresh')
      // 重置 list 中的数据
      this.list = []
      this.onLoad()
      this.isLoading = false
    }
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
