<template>
  <div>
      <!-- <h4>3.1 基本用法</h4>
      <div>头部</div>
      <div>
          <slot>内容</slot>
      </div>
      <div>底部</div> -->
      <!-- <h4>3.2 具名插槽 & 3.3 默认插槽</h4>
      <div>
          <slot>头部</slot>
      </div>
      <div>
          <slot name="content">内容</slot>
      </div>
      <div>
          <slot name="foot">底部</slot>
      </div> -->
      <h4>3.4 作用域插槽</h4>
      <div>
          <div>姓名：{{ name }}</div>
          <div>年龄：{{ age }}</div>
          <div>
              爱好：
              <!-- 遍历工作不能由当前组件来完成，应该由使用这个组件中的位置来完成 -->
              <!-- 占据内容的需要：遍历boddy -->
              <!-- 1.0 将 hobby 传入到插槽中 -->
              <!-- 2.0 使用这个组件在在插槽中进行遍历 -->
              <slot v-bind:myname="name" v-bind:hobby="hobby"></slot>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'xjj',
      age: 19,
      hobby: ['睡觉', '吃饭', '陪女朋友']
    }
  }
}
</script>

<style>

</style>
