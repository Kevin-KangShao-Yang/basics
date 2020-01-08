<template>
  <div class="video">
    <div class="title-wrapper">
      <span class="tag">MV</span>
      <span class="title">{{title}}</span>
      <span class="artist">{{arName}}</span>
    </div>
    <video :src="mvUrl" autoplay  controls=""></video>
  </div>
</template>

<script>
export default {
  data(){
    return{
      title:"",
      arName:"",
      mvUrl:""
    }
  },
  // 查询mv信息
  created(){
    this.$axios.get(`/mv/detail?mvid=${this.$route.params.id}`)
    .then(backData=>{
      // console.log(backData)
      // 获取数据
      const mvData = backData.data.data
      this.title = mvData.name
      this.arName = mvData.artistName
      // 获取最高清的地址
      let maxLevel = 0
      for (const key in mvData.brs) {
        if(maxLevel<key){
          maxLevel = key
        }
      }
      
      this.mvUrl = mvData.brs[maxLevel]

    })
  }

}
</script>

<style>

</style>
