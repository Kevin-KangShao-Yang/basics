<template>
  <div class="app">
    <!-- 顶部的搜索 -->
    <searchBar></searchBar>
    <!-- 路由的出口-tab-content -->
    <div class="tab-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// 导入组件
import searchBar from "./components/searchBar.vue";
export default {
  // 注册组件
  components: {
    searchBar
  }
};
</script>

<style>
.tab-content {
  width: 1080px;
  margin: 10px auto;
}
.my-carousel {
  height: 400px;
}
</style>
