<template>
  <div class="player">
    <div class="left">
      <img class="disc" src="../assets/img/disc.png" alt="">
      <img class="cover" src="../assets/img/cover.png" alt="">
    </div>
    <div class="right">
      <div class="title"><img src="../assets/img/tag.png" alt=""><span>放个大招给你看</span> </div>
      <div class="singer">歌手: <span>尼古拉斯赵四</span></div>
      <div class="album">所属专辑: <span>我就是我</span></div>
      <audio class="audio" controls="" src=""></audio>
      <ul class="lyric-container">
        <li class="lyric">难以忘记</li>
        <li class="lyric">初次见你</li>
        <li class="lyric">那双迷人的小眼睛</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:"player"
}
</script>

<style>
/* 导入样式 */
@import url('../assets/css/player.css');
</style>
