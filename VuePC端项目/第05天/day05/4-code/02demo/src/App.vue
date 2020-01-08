<template>
  <div id="app">
    <ul>
      <li><router-link to="/news/wbq">新闻:王宝强</router-link></li>
      <li><router-link to="/news/jnl">新闻:贾乃亮</router-link></li>
      <li><router-link to="/news/sxb">新闻:宋小宝</router-link></li>
      <li><router-link to="/mus">音乐</router-link></li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
