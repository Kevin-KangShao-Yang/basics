<template>
    <div class="son">
        <h3>我是子组件</h3>
        <div>num: {{ num }}</div>
        <button @click="fn">点我给 num ++</button>
        <div>obj.name: {{ obj.name }}</div>
        <button @click="foo">点我修改 name</button>
    </div>
</template>

<script>
export default {
    props: ['num', 'obj'],
    methods: {
        fn () {
            this.num  = this.num + 1
        },
        foo () {
            this.obj.name = 'gyy'
        }
    }
}
</script>

<style>
.son {
    border: 10px solid #ccc;
}
</style>
