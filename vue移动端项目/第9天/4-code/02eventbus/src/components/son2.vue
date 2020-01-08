<template>
    <div class="son2">
        <h3>我是 son2</h3>
        <div>num: {{ num }}</div>
    </div>
</template>

<script>
// 导入公用的 bus
import bus from '../assets/bus'
export default {
    data() {
        return {
            num: ''
        }
    },
    created() {
        bus.$on('passnum', (value) => {
            this.num = value
        })
    }
}
</script>

<style>
.son2 {
    border: 10px solid pink;
}
</style>
