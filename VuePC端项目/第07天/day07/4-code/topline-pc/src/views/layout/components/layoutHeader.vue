<template>
    <div class="appheader">
        <!-- 一行 -->
        <el-row>
            <!-- 列 -->
            <el-col :span="14">
                江苏传智播客教育科技股份有限公司
            </el-col>
            <el-col :offset="7" :span="3">
                <!-- <div class="userinfo">
                        <img class="icon" src="http://toutiao.meiduo.site/FooXtzfvHZvDCyh1CwhsoMsSH_Op" alt="">
                        <span class="name">群姐</span>
                    </div> -->
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link userinfo">
                        <img class="icon" :src="userInfo.photo" alt="">
                        <span class="name">{{ userInfo.name }}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人信息</el-dropdown-item>
                        <el-dropdown-item>git地址</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    // 从 localstorage 中取出 userInfo
    this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  }
}
</script>

<style lang="less" scoped>
.userinfo {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .icon {
        width: 35px;
        height: 35px;
        border-radius: 50%;
    }
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}
</style>
