<template>
  <div>
      <input v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ['msg']
}
</script>

<style>

</style>
