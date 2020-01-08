<template>
  <div id="swiper">
      <el-carousel height="400px" class="my-swiper">
        <el-carousel-item v-for="(item,index) in swiperList" :key="index">
            <img :src="item.imageUrl" alt="">
        </el-carousel-item> 
      </el-carousel>
  </div>
</template>

<script>
export default {
    data(){
        return {
            swiperList:[]
        }
    },
    created(){
        this.$axios.get("/banner").then(data=>{
            console.log(data)
            this.swiperList = data.data.banners;
        }).catch(err=>{

        })
    }
}
</script>

<style scoped>
#swiper{
    width:1080px;
}
.my-swiper{
    width: 1080px;
    margin: 50px auto;
}
</style>