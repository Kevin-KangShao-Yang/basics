<template>
    <div class="mycount">
        <h3>我是mycount</h3>
        <div>mycount: num => {{ value }}</div>
        <!-- <count v-model="value" /> -->
        <count :value="value" @input="$emit('input', $event)" />
    </div>
</template>

<script>
import count from './count'
export default {
    props: ['value'],
    data() {
        return {
        }
    },
    components: {
        count
    }
}
</script>

<style>
.mycount {
    border: 10px solid green;
}
</style>
