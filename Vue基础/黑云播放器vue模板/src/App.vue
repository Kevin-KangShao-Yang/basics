<template>
   <div id="player">
      <h2 class="title">黑云音乐</h2>
      <div class="search">
        <input type="text" placeholder="请输入歌曲名"/>
        <button>
          <span class="iconfont icon-search"></span>
        </button>
      </div>
      <div class="tab-wrapper">
        <!-- tab栏 -->
        <div class="tab-bar">
          <a class="bar-item active">
            搜索结果
          </a>
          <a class="bar-item">
            歌曲播放
          </a>
          <a class="bar-item">
            mv
          </a>
          <a class="bar-item">
            歌曲评论>
          </a>
         
        </div>
        <!-- 对应的内容区域 -->
        <div class="tab-content">

        </div>
      </div>
    </div>
</template>

<script>


export default {

}
</script>

<style src="./assets/css/index.css" scoped></style>
