<template>
  <div id="player">
    <h2 class="title">黑云音乐</h2>
    <div class="search">
      <input type="text" />
      <button>
        <span class="iconfont icon-search"></span>
      </button>
    </div>
    <div class="tab-wrapper">
      <!-- tab栏 -->
      <div class="tab-bar">
        <router-link to="/results"  active-class='active' class="bar-item">搜索结果</router-link>
        <router-link to="/player"  active-class='active' class="bar-item">歌曲播放</router-link>
        <router-link to="/video"  active-class='active' class="bar-item">mv</router-link>
        <router-link to="/comment"  active-class='active' class="bar-item">歌曲评论</router-link>
      </div>
      <!-- 对应的内容区域 -->
      <div class="tab-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
/* 导入样式 */
@import url("./assets/css/index.css");
@import url("./assets/css/iconfont.css");
</style>
