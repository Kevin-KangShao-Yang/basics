<template>
  <div class="comment-wrapper">
    <div class="items">
      <div class="item" v-for="item in comments">
        <div class="left">
          <img :src="item.user.avatarUrl" alt="">
        </div>
        <div class="right">
          <div class="top">
            <span class="user">{{item.user.nickName}}:</span>
            <span class="content">{{item.content}}}</span>
          </div>
          <div class="bottom">
            <div class="time">{{item.time |formatTime}}</div>
            <div class="like-wrapper">
                <span>👍</span>({{item.likedCount}})
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data(){
    return {
      comments:[]
    }
  },
  created(){
    this.$axios.get(`/comment/hot?id=${this.$route.params.id}&type=0`).then(backData=>{
      // console.log(backData)
      this.comments = backData.data.hotComments
    })
  },
  // 过滤器
  filters:{
    formatTime(time){
      return moment(time).format('YYYY年MM月DD日')
    }
  }
}
</script>

<style>

</style>
