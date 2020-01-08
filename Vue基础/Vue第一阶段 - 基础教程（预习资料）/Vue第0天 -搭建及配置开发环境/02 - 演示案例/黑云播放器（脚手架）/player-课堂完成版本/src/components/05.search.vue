<template>
  <div id="player">
      <h2 class="title">黑云音乐</h2>
      <div class="search">
        <input type="text" v-model.trim="searchKey" @keyup.enter="searchMusic"/>
        <button>
          <span class="iconfont icon-search" @click="searchMusic"></span>
        </button>
      </div>
      <el-alert v-if="alertTag"
          title="亲，写点东西吧？你不写点啥，我咋知道你想听啥呢？"
          type="error">
      </el-alert>
      <div class="tab-wrapper">
        <!-- tab栏 
        <div class="tab-bar">
          <router-link to="/results" active-class="active" class="bar-item">搜索结果</router-link>
          <router-link to="/player" active-class="active" class="bar-item">歌曲播放</router-link>
          <router-link to="/hvideo" active-class="active" class="bar-item">MV</router-link>
          <router-link to="/comment" active-class="active" class="bar-item">歌曲评论</router-link>
        </div>
        -->
        <!-- 对应的内容区域 -->
        <div class="tab-content">
          <router-view></router-view>
        </div>  
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return {
      searchKey:"",
      alertTag:false
    }
  },
  methods:{
    searchMusic(){
      if(this.searchKey==""){
        //alert("亲，写点东西吧？你不写点啥，我咋知道你想听啥呢？")
        //this.alertTag = true;
        this.$message({
          message: '亲，写点东西吧？你不写点啥，我咋知道你想听啥呢？',
          type: 'warning'
        });
        return ;
      }
      this.$router.push("/results/"+this.searchKey)
      //window.location.reload();
    }
  }
}
</script>

<style>

</style>
<style scoped src="../assets/css/index.css"></style>