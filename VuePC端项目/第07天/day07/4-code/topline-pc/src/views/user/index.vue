<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>用户信息</span>
        </div>
        <el-row :gutter="40">
            <el-col :span="12">
                <el-form :model="user" status-icon label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名">
                        <el-input type="text" v-model="user.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="个性签名">
                        <el-input type="text" v-model="user.tag" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="帐号类型">
                        <el-input type="text" v-model="user.type" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="头条帐号">
                        <el-input type="text" v-model="user.number" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input type="text" v-model="user.phone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input type="text" v-model="user.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button>修改</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
            <el-col :span="12">
                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            user: {

            }
        }
    }
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
