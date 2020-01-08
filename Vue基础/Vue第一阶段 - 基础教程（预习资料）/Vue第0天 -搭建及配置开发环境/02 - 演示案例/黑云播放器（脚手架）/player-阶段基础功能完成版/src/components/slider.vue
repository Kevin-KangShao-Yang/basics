<template>
  <!-- 轮播图 -->
  <el-carousel class="my-carousel">
    <el-carousel-item v-for="item in banners">
      <img class="banner-item" :src="item.imageUrl" alt />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  // 数据
  data() {
    return {
      // slider
      banners: []
    };
  },
  // 获取轮播图数据
  created() {
    this.$axios.get(`/banner`).then(backData => {
      // console.log(backData)
      // 设置上去
      this.banners = backData.data.banners;
    });
  }
};
</script>

<style>
</style>
