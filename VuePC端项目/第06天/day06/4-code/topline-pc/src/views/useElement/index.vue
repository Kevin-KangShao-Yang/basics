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
    <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949">
    </el-switch>
    <h4>使用 element 中的单选框</h4>
    {{ radio }}
    <el-radio v-model="radio" label="nan">男</el-radio>
    <el-radio v-model="radio" label="nv">女</el-radio>
    <h4>使用 element 中的 select</h4>
    {{ selValue }}
    <el-select v-model="selValue" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <h4>使用 element 中的 date-picer</h4>
    {{ datetime }}
    <el-date-picker value-format="yyyy-MM-dd" v-model="datetime" type="daterange" range-separator="^.^" start-placeholder="开始日期" end-placeholder="结束日期">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: true,
      radio: 'nan',
      selValue: '',
      options: [{
        value: '1',
        label: '黄金糕'
      }, {
        value: '2',
        label: '双皮奶'
      }],
      datetime: ''
    }
  }
}
</script>

<style>

</style>
