<template>
  <div id="app">
    <div class="nav">
      <ul>
        <li>
          <router-link to="/news">新闻</router-link>
        </li>
        <li>
          <router-link to="/img">图片</router-link>
        </li>
        <li>
          <router-link to="/music">音乐</router-link>
        </li>
      </ul>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="less">
#app {
  width: 800px;
  height: 600px;
  border: 10px solid #ccc;
  margin: 0 auto;
  display: flex;
  .nav {
    width: 200px;
    height: 600px;
    background: pink;
  }
  .main {
    width: 600px;
    height: 600px;
    background: skyblue;
  }
}
</style>
