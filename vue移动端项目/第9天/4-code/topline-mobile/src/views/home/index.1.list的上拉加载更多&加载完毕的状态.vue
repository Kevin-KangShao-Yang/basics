<template>
    <div class="home">
        <!-- navBar -->
        <van-nav-bar title="首页" fixed />
        <div class="mytabs">
            <!-- tab栏 -->
            <van-tabs>
                <van-tab v-for="index in 8" :key="index" :title="'标签 ' + index">
                    <!-- 列表结构：上拉加载更多 -->
                    <!-- v-model：设置当前 list 是否处理加载状态 如果 v-model 为 true 那么不会再次执行 load 事件-->
                    <!-- finished：设置当前 List 中的数据是否加载完毕 -->
                    <!-- finished-text：设置当 list 将数据加载完成之后再次上拉时显示的文字 -->
                    <!-- load：1）当页面加载时会默认调用一次，2）当上拉触底时，会触发这个方法 -->
                    <!-- 这个方法有个坑：会自动将 list 中的 v-model 中对应属性设置 true,并且不自动设置为 false,在使用时，需要手动设置为 false -->
                    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                        <van-cell v-for="item in list" :key="item" :title="item" />
                    </van-list>
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
      list: []
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
