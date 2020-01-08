<template>
  <div class="mymy">
      <h2>mymycount</h2>
      <div>mymycount=num: {{ value }} </div>
      <mycount :value="value" @input="$emit('input', $event)" />
  </div>
</template>

<script>
import mycount from './mycount'
export default {
  props: ['value'],
  components: {
      mycount
  }
}
</script>

<style>
.mymy {
    border: 10px solid blue;
}
</style>
