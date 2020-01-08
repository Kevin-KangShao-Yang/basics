<template>
  <div class="player">
    <div class="left">
      <img class="disc" src="../assets/img/disc.png" alt />
      <img class="cover" :src="coverUrl?coverUrl:'../assets/img/cover.png'" alt />
    </div>
    <div class="right">
      <div class="title">
        <img src="../assets/img/tag.png" alt />
        <span>{{songName}}</span>
      </div>
      <div class="singer">
        歌手:
        <span>{{arName}}</span>
      </div>
      <div class="album">
        所属专辑:
        <span>{{alName}}</span>
      </div>
      <audio class="audio" autoplay controls :src="musicUrl"></audio>
      <ul class="lyric-container">
        <li class="lyric" v-for="item in lyric">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      musicUrl: "",
      arName: "",
      alName: "",
      songName: "",
      coverUrl:"",
      lyric: []
    };
  },
  // 获取数据
  created() {
    // 调用方法
    this.searchMusic();
  },
  // 方法
  methods: {
    // 歌曲搜索
    searchMusic() {
      // 歌曲url
      this.$axios
        .get(`/song/url?id=${this.$route.params.id}`)
        .then(backData => {
          // console.log(backData)
          // 设置歌曲地址
          this.musicUrl = backData.data.data[0].url;
        });

      // 封面
      this.$axios
        .get(`/song/detail?ids=${this.$route.params.id}`)
        .then(backData => {
          console.log(backData);
          // 封面
          this.coverUrl = backData.data.songs[0].al.picUrl;
          // 歌名
          this.songName = backData.data.songs[0].name;
          // 歌手名
          this.arName = backData.data.songs[0].ar[0].name;
          // 专辑名
          this.alName = backData.data.songs[0].al.name;
        });
      // 歌词
      this.$axios.get(`/lyric?id=${this.$route.params.id}`).then(backData => {
        // console.log(backData)
        this.lyric = backData.data.lrc.lyric.split("\n").map(v => {
          return v.replace(/\[\d{2}\:\d{2}\.\d{2,3}\]/, "");
        });
      });
    }
  }
};
</script>

<style>
</style>
