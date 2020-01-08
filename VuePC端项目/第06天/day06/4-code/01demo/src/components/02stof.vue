<template>
    <div class="son">
        <h2>子传组</h2>
        smsg: {{ smsg }}
        <div>
            <button @click="tof">点我将 smsg 交给父组件</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            smsg: '我是子组件中的参数'
        }
    },
    methods: {
        tof() {
            // 将参数交给父组件
            this.$emit('abcfn', this.smsg) // 调用一个方法 abcfn 将参数 smsg 传给方法
        }
    }
}
</script>

<style scoped>
.son {
    border: 10px solid skyblue;
}
</style>
