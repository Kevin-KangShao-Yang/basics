<template>
    <div class="result-wrapper">
    <div class="song" v-for="music in musicList">
      <div class="name">
        <span class="iconfont icon-play" @click="playMusic(music.id)"></span>
        {{music.name}}
        <span class="iconfont icon-editmedia" n v-if="music.mvid != 0" @click="playMV(music.mvid)"></span>
        <span style="color:blue;" @click="showComment(music.id)">评论</span>
      </div>
      <div class="singer">{{music.artists | getNames}}</div>
      <div class="album">《{{music.album.name}}》</div>
      <div class="time">{{music.duration | getTime}}</div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        musicList: []
      }
    },
    filters: {
      //定义个获取多个名字的过滤器
      getNames(val) {
        let names = "";
        for (let i = 0; i < val.length; i++) {
          names += val[i].name + " | "
        }
        return names.slice(0, -2);
      },
      //定义过滤器获取歌曲长度时间
      getTime(val) {
        return ~~(~~(val / 1000) / 60) + "分" + ~~(val / 1000) % 60 + "秒"
      }
    },
    // 一般我们在初始化页面的时候，需要异步请求数据的时候，都建议使用created，这样效率更高
    created() {
      console.log(this.$route.params.keyword)
      axios.get("https://autumnfish.cn/search?keywords=" + this.$route.params.keyword)
        .then(data => {
          console.log(data.data.result.songs)
          this.musicList = data.data.result.songs
        })
        .catch(err => {

        })
    },
    // 我们获取页面上的DOM元素，使用ref属性来获取，至少要放在这个生命周期钩子里，因为，只有在这个时候页面的内容才真正的被渲染完成得到真实的节点
    mounted() {

    },
    // 数据更新了，并且数据也渲染上页面上了，咱们还有逻辑要执行的话就写在这个逻辑里面
    updated() {

    },
    methods: {
      // 点击按钮播放音乐
      playMusic(id) {
        router.push({
          path: '/player/' + id
        });
      },
      // 点击播放mv
      playMV(mvid) {
        router.push({
          path: '/video/' + mvid
        });
      },
      // 点击查看评论
      showComment(id) {
        router.push({
          path: '/comment/' + id
        });
      }
    }
}
</script>

<style>
  
</style>