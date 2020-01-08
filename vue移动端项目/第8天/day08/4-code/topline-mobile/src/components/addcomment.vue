<template>
    <div class="myaddcomment">
        <!-- 留言输入框 -->
        <van-cell>
            <template slot="title">
                <van-search v-model="value" placeholder="写评论" show-action shape="round">
                    <div slot="action" @click="onSearch">发送</div>
                    <template slot="left-icon">
                        <van-icon name="edit" />
                    </template>
                </van-search>
            </template>
        </van-cell>
    </div>
</template>

<script>
// 导入添加评论的接口
import { apiSetCommetForArticle } from '@/api/article'

export default {
  props: ['detailObj'],
  data () {
    return {
      // 留言框中的数据
      value: ''
    }
  },
  methods: {
    // 发布留言
    async onSearch () {
      //   console.log(this.detailObj)
      let res = await apiSetCommetForArticle(this.$http, {
        target: this.detailObj.art_id,
        content: this.value
      })
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.myaddcomment {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}
</style>
