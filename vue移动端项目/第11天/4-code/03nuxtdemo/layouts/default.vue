<template>
    <div>
        <div>
            <myheader />
        </div>
        <div>
            <nuxt />
        </div>
        <div>
            <myfoot />
        </div>   
    </div>
</template>

<script>
// 导入头部&底部组件
import myheader from '../components/myheader'
import myfoot from '../components/myfoot'
export default {
    components: {
        myheader,
        myfoot
    }
}
</script>

<style>

</style>
