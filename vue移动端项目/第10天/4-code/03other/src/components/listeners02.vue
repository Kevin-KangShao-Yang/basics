<template>
  <div>
      <input v-on="$listeners" type="text">
      <button @click="$emit('abc')">触发 abc</button>
      <button @click="$emit('input')">触发 input</button>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
