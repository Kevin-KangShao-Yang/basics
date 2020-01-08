<template>
  <div class="fahter">
    <h1>我是 father</h1>
    <son1 />
    <son2 />
  </div>
</template>

<script>
import son1 from './components/son1'
import son2 from './components/son2'
export default {
  components: {
    son1, son2
  }
}
</script>

<style>
.fahter {
  border: 10px solid #ccc;
}
</style>
