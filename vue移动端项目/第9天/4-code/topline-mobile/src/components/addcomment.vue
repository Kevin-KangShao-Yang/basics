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
import { apiSetCommetForArticle, apiSetRepalyForComment } from '@/api/article'

export default {
  //     文章的详情    文章的评论/评论的回复列表    添加的是文章评论还是评论回复
  props: ['detailObj', 'commentList', 'isa', 'artid'], // artid 是评论所属文章的 id
  data () {
    return {
      // 留言框中的数据
      value: ''
    }
  },
  methods: {
    // 发布留言
    async onSearch () {
      let res
      if (this.isa === true) { // 添加到文章中去
        res = await apiSetCommetForArticle(this.$http, {
          target: this.detailObj.art_id,
          content: this.value
        })
      } else { // 添加到评论的回复中去
        res = await apiSetRepalyForComment(this.$http, {
          target: this.detailObj.com_id, // 当前评论的 id
          content: this.value,
          artid: this.artid // 当前评论所属文章的 id
        })
      }
      // 将成功后的留言添加到 commnetList 中
      this.commentList.push(res.new_obj)
      this.value = ''
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
