<template>
    <div>
        <myhead />
        <nuxt />
        <myfoot />
    </div>
</template>

<script>
// 导入组件
import myhead from '../components/myheade'
import myfoot from '../components/myfoot'

export default {
    components: {
        myhead,
        myfoot
    }
}
</script>

<style>

</style>
