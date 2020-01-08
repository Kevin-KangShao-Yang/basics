<template>
    <div>
        <!-- 封装一个自己的模式组件 -->
        <button @click="showModal=true">Show Modal</button>
        <mymodel v-model="showModal" />
    </div>
</template>

<script>
import mymodel from './modelcomponent/mymodel'
export default {
    data () {
        return {
            showModal: false
        }
    },
    methods: {
        fn() {
            this.$toast.success()
        }
    },
    components: {
        mymodel
    }
}
</script>

<style>

</style>
