<template>
  <div id="player">
      <h2 class="title">黑云音乐</h2>
      <div class="search">
        <input type="text" v-model.trim="search" @keyup.enter="toSearch">
        <button @click="toSearch">
          <span class="iconfont icon-search"></span>
        </button>
      </div>
    </div>
</template>

<script>
export default {
  name:'search',
  data(){
    return {
      search:''
    }
  },
 
  methods:{
    toSearch(){
      if(this.search==''){
        // 提示框
        return this.$message.warning('请输入内容')
      }
      this.$router.push(`/results/${this.search}`)
    }
  }
}
</script>

<style>

</style>
