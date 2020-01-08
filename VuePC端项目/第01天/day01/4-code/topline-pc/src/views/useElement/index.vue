<template>
  <!-- 使用 ElementUI -->
  <div class="useElement">
    <h3>
        这是使用 element-ui 的测试页面
    </h3>
    <h4>
        使用 element-ui 中的按钮
    </h4>
    <el-row>
        <el-button round>圆角按钮</el-button>
        <el-button type="primary" round>主要按钮</el-button>
        <el-button type="success" round>成功按钮</el-button>
        <el-button type="info" round>信息按钮</el-button>
        <el-button type="warning" round>警告按钮</el-button>
        <el-button type="danger" round>危险按钮</el-button>
    </el-row>
    <h4>使用 element-ui 中的开关</h4>
    <el-switch
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949">
    </el-switch>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: true
    }
  }
}
</script>

<style>

</style>
