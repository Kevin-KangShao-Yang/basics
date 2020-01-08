<template>
  <div class="app">
    <div class="tab-nav">
      <img src="./assets/tl.png" alt />
      <router-link to="/rap">rap</router-link>
      <router-link to="/dance">dance</router-link>
      <router-link to="/dance">朋友</router-link>
      <router-link to="/dance">商城</router-link>
      <router-link to="/dance">歌单</router-link>
      <router-link to="/dance">下载</router-link>
      <img src="./assets/tr.png" alt />
    </div>
    <!-- 内容 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
.tab-nav {
  height: 70px;
  background-color: #242424;
  display: flex;
  justify-content: space-between;
}
.tab-nav a {
  line-height: 70px;
  text-decoration: none;
  background: #242424;
  color: #fff;
}
.tab-nav a:hover {
  background-color: black;
}

</style>
