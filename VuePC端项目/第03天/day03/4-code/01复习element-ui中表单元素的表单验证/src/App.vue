<template>
  <div id="app">
    <h1>我是 App 根组件</h1>
    <el-form :rules="rules" ref="form" :model="form" label-width="80px">
      <el-form-item prop="name" label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// vue-cli 2.0 生成项目的规则：
//  vue init webpack project
// element-ui 在 vue-cli 中使用
//  下载
//  引入
//  使用
// 验证规则使用的步骤：
//  1.0 定义一个规则：
//      在 data中的定义一个验证规则
//  2.0 将规则设置给 el-form
//      通过 rules 属性来设置
//  3.0 将规则的具体属性设置给 el-form-item 
//      通过 prop 属性来设置
// 扩展知识点：
//  如果在导入 node_modules 中的文件：
//    直接使用相当路径
//      import '../node_modules/element-ui/lib/theme-chalk/index.css'
//    省略 node_models
//      import 'element-ui/lib/theme-chalk/index.css'
export default {
  data() {
    return {
      form: {
        name: ''
      },
      rules: {
        name: [
          // 验证规则：必填
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          // 验证规则：长度
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style>

</style>
