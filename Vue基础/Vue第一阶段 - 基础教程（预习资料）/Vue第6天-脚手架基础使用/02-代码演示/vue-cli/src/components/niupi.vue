<template>
  <div class="niupi">
    <input type="button" @click="changeColor" value="点击变色" />
    <div class="color" :style="{backgroundColor:colorArr[randomIndex]}">
      <rap></rap>
    </div>
    
  </div>
</template>

<script>
// 导入组件
import rap from "./rap.vue";
export default {
  // 局部注册
  components: {
    rap // rap:rap
  },
  data() {
    return {
      colorArr: [
        "red",
        "hotpink",
        "yellow",
        "green",
        "blue",
        "purple",
        "skyblue",
        "yellowgreen",
        "gold",
        "orange",
        "tomato"
      ],
      // 随机的索引
      randomIndex: 0
    };
  },
  // 方法
  methods: {
    changeColor() {
      this.randomIndex = Math.floor(Math.random() * this.colorArr.length);

      console.log(this.randomIndex);
    }
  }
};
</script>

<style>
.color {
  width: 200px;
  height: 200px;
}
</style>
