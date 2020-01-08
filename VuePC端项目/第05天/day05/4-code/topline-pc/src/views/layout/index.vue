<template>
    <div class="layout">
        <el-container>
            <el-aside width="200px">
                <layoutasider />
            </el-aside>
            <el-container>
                <el-header>
                    <layoutheader />
                </el-header>
                <el-main>
                    <!-- 将来请求 home, index, publish ... 路径时，优先加载 layout ，-->
                    <!-- 加载完 layout 之后再用 home, index, publish 组件替换掉 layout 中的 router-view -->
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
// 导入两个布局组件
import layoutheader from '@/views/layout/components/layoutHeader'
import layoutasider from '@/views/layout/components/layroutAsider'

export default {
  components: {
    layoutheader,
    layoutasider
  }
}
</script>

<style lang="less" scoped>
.layout {
    height: 100%;
    // & 去掉选择器后的空格
    // > 子代码选项器
    &>.el-container {
        height: 100%;
    }
}
.el-aside {
    background-color: #323745;
    color: #333;
}
.el-header {
    background-color: #fff;
    color: #333;
    line-height: 60px;
}
.el-main {
    background-color: #eee;
    color: #333;
}
</style>
