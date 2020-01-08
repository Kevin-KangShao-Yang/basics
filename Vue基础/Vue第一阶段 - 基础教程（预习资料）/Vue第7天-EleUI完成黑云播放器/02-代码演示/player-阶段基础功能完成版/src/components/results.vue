<template>
  <div class="result-wrapper">
    <div class="song" v-for="item in songs">
      <div class="name">
        <span class="iconfont icon-play" @click="toPlay(item.id)"></span>
        <span @click="toComments(item.id)">{{item.name}}</span>
        <span v-if="item.mvid!=0" class="iconfont icon-editmedia" @click='toMv(item.mvid)'></span>
      </div>
      <div class="singer">{{item.artists | formatSinger}}</div>
      <div class="album">《{{item.album.name}}》</div>
      <div class="time">{{item.duration | formatTime}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songs: []
    };
  },
  // 获取数据
  created() {
    // 调用搜索音乐的方法
    this.searchMusic()
  },
  methods: {
    // 搜索歌曲
    searchMusic() {
      this.$axios
        .get(`/search?keywords=${this.$route.params.search}`)
        .then(backData => {
          // console.log(backData)
          this.songs = backData.data.result.songs;
        });
    },
    // 去歌曲播放页
    toPlay(id){
      // 路由跳转
      this.$router.push(`/player/${id}`)
    },
    // 去mv页面
    toMv(id){
      // 路由跳转
      this.$router.push(`/mv/${id}`)
    },
    // 去评论页
    toComments(id){
      this.$router.push(`/comment/${id}`)      
    }
  },
  // 侦听器
  watch:{
    [`$route.params.search`](v,v2){
      // console.log(v,v2);
      this.searchMusic()
    }
  },
  // 过滤器
  filters: {
    formatSinger(value) {
      let temStr = "";
      for (let i = 0; i < value.length; i++) {
        temStr += value[i].name;
        if (i < value.length - 1) {
          temStr += "/";
        }
      }
      return temStr;
    },
    // 处理时间
    formatTime(time) {
      const totalSec = Math.floor(time / 1000);
      const minute = Math.floor(totalSec / 60);
      let sec = totalSec % 60;
      sec = sec < 10 ? "0" + sec : sec;
      return minute + ":" + sec;
    }
  }
};
</script>

<style>
</style>
