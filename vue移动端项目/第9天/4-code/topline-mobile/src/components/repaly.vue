<template>
    <div>
        <van-popup class="mypop" :value="value" @input="$emit('input', $event)" position="bottom" :style="{ height: '80%' }">
            <van-cell title="当前评论"></van-cell>
            <!-- 使用 comment 组件来渲染留言回复 -->
            <comment :isa="false" :itemobj="itemobj" />
            <!-- 评论的回复 -->
            <van-cell title="评论的回复"></van-cell>
            <div v-for="(item, index) in commentRepalyList" :key="index">
                <comment :isa="false" :itemobj="item" />
            </div>
            <addcomment :commentList="commentRepalyList" :detailObj="itemobj" :artid="artid" :isa="false" />
        </van-popup>
    </div>
</template>

<script>
// 导入 bus
import bus from '@/utils/bus'
// 导入 comment 组件
import comment from '@/components/comment'
// 导入 addcomment 组件
import addcomment from '@/components/addcomment'
// 导入 请求评论回复的请求
import { apiGetPageCommentReplay } from '@/api/commnet'

export default {
  props: ['value', 'artid'],
  data () {
    return {
      itemobj: {},
      // 评论的回复数组
      commentRepalyList: []
    }
  },
  methods: {
    // 得到所有评论的回复
    async getCommentList () {
      let res = await apiGetPageCommentReplay(this.$http, {
        source: this.itemobj.com_id.toString(),
        offset: undefined,
        limit: 10
      })
      this.commentRepalyList = res.results
    }
  },
  // 打开页面时
  created () {
    bus.$on('commentitem', value => {
      this.itemobj = value
      console.log(value)
    })
  },
  watch: {
    // 将来 itemObj 改变之后会触发后的函数
    itemobj: function () {
      if (this.itemobj.com_id) {
        this.getCommentList()
      }
    }
  },
  components: {
    comment,
    addcomment
  }
}
</script>

<style>
.mypop {
    margin-bottom: 70px;
}

</style>
