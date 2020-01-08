<template>
  <div class="result-wrapper">
    <div class="song" v-for="(song,index) in songList" :key="index">
      <div class="name">
        <span class="iconfont icon-play" @click="gotoPlayer(song.id)"></span>
        {{song.name}}
        <span class="iconfont icon-editmedia" @click="gotoMv(song.mvid)"></span>
      </div>
      <div class="singer">{{ song.artists | formateArtists }}</div>
      <div class="album">《{{ song.album.name }}》</div>
      <div class="time">{{song.duration | formateTime}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songList: []
    };
  },
  //定义过滤器解决数据格式问题
  filters: {
    formateArtists(val) {
      let as = [];
      for (let i = 0; i < val.length; i++) {
        as += val[i].name + "|";
      }
      console.log(as);
      return as.slice(0, -3);

    },
    formateTime(val) {
      return ~~(~~(val / 1000) / 60) + "分" + (~~(val / 1000) % 60) + "秒";
    }
  },
  created() {
    this.getData();
  },
  updated(){

  },
  watch: {
    songList: function(newVal, oldVal) {
      // console.log("oldVal" + oldVal);
      // console.log("newVal" + newVal);
    },
    "$route.params.keyword": function(newVal, oldVal) {
      // console.log("oldVal" + oldVal);
      // console.log("newVal" + newVal);
      this.getData();
    }
  },
  methods: {
    getData() {
      this.$axios
        .get("/search?keywords=" + this.$route.params.keyword)
        .then(data => {
          this.songList = data.data.result.songs;
        })
        .catch(err => {});
    },
    //点击跳转到player路由
    gotoPlayer(id){
      this.$router.push("/player/"+id);
    },
    //点击跳转到mv路由
    gotoMv(mvid){
      this.$router.push("/hvideo/"+mvid);
    }
  }
};
</script>

<style src="../assets/css/results.css"></style>