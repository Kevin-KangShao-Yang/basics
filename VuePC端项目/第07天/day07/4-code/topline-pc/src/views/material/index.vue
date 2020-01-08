<template>
    <!-- 卡片容器 -->
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>图片管理</span>
        </div>
        <div class="itemBtn">
            <div class="items">
                <el-radio-group v-model="myradio" size="mini" @change="changeAll">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="收藏"></el-radio-button>
                </el-radio-group>
            </div>
            <div class="upload">
                <el-button @click="uploadMat" type="primary">上传素材</el-button>
            </div>
        </div>
        <!-- 放置素材 -->
        <el-row :gutter="40">
            <!-- 一行 -->
            <el-col :span="6" v-for="(item, index) in matericalList" :key="index">
                <!-- 一列 -->
                <el-card class="mycard">
                    <!-- 图片 -->
                    <img class="myimg" :src="item.url" alt="">
                    <div class="mybtns">
                        <el-button @click="collect(true, item.id)" v-if="item.is_collected === false" type="text">
                            <i class="el-icon-star-off"></i>
                            <!-- 空心：未收藏 -->
                        </el-button>
                        <el-button @click="collect(false, item.id)" v-if="item.is_collected === true" type="text">
                            <i class="el-icon-star-on"></i>
                            <!-- 实心：已收藏 -->
                        </el-button>
                        <el-button @click="delMat(item.id)" type="text">
                            <i class="el-icon-delete"></i>
                        </el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <!-- 分布组件 -->
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>

        <!-- 弹出的面板 -->
        <!-- el-dialog：面板 title 面板标题 ：visible.sync这个属性用来控制当前面板的显示和隐藏-->
        <el-dialog title="上传图片" :visible.sync="dialogFormVisible">
            <!-- el-upload: 上传的组件 action： 接收图片的服务器地址 show-file-list：不以列表的方式显示图片 -->
            <!-- on-success：成功时的钩子：上传图片成功后会执行的回调 -->
            <!-- before-upload:上传图片之前执行的回调函数 -->
            <el-upload 
                class="avatar-uploader" 
                action="http://ttapi.research.itcast.cn/mp/v1_0/user/images" 
                :headers="headers"
                name="image"
                :show-file-list="false" 
                :on-success="uploadsuccess">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closePanle">关闭</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
export default {
    data() {
        return {
            myradio: '全部',
            matericalList: [],
            // 控制面板的显示和隐藏
            dialogFormVisible: false,
            // 上传组件中的图片地址
            imageUrl: '',
            // 上传的请求头
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
    },
    methods: {
        // 得到素材
        // collect: true 收藏的数据 false 全部的数据
        getMatericalList(collect) {
            this.$http({
                url: '/user/images',
                method: 'GET',
                params: {
                    collect: collect
                }
            }).then(res => {
                console.log(res)
                // 保存素材数据
                this.matericalList = res.results
            })
        },
        changeAll(params) {
            // 给全部绑定事件
            if (params === '全部') {
                // 加载全部数据
                this.getMatericalList(false)
            } else {
                this.getMatericalList(true)
            }
        },
        // 收藏素材&取消收藏
        // bool:
        //      true: 添加收藏
        //      false：取消收藏
        // id:
        //      要收藏&取消收藏的素材 id
        collect(bool, id) {
            // 取消&添加收藏
            this.$http({
                url: `/user/images/${id}`,
                method: 'PUT',
                data: {
                    collect: bool
                }
            }).then(res => {
                this.$message({
                    message: res.collect ? '收藏成功' : '取消收藏成功',
                    type: 'success'
                })
                // 重新加载数据
                console.log(this.myradio)
                // 根据 myradio 中的值来渲染数据
                if (this.myradio === '全部') {
                    this.getMatericalList(false)
                } else {
                    this.getMatericalList(true)
                }
            })
        },
        // 删除素材
        //  id：要删除的素材 id
        delMat(id) {
            this.$http({
                url: `/user/images/${id}`,
                method: 'DELETE'
            }).then(res => {
                // 提示用户删除成功
                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
                // 更新数据
                if (this.myradio === '全部') {
                    this.getMatericalList(false)
                } else {
                    this.getMatericalList(true)
                }
            })
        },
        // 点击上传素材触发
        uploadMat() {
            // 打开一个面板
            this.dialogFormVisible = true
        },
        // 当上传图片成功后触发
        uploadsuccess (response, file, fileList) {
            // response: 上传成功后返回的数据
            this.imageUrl = response.data.url
        },
        // 关闭面板时触发
        closePanle() {
            // 先关闭
            this.dialogFormVisible = false
            // 再刷新数据
            this.getMatericalList(false)
        }
    },
    created() {
        // 加载素材数据
        this.getMatericalList()
    }
}
</script>

<style lang="less" scoped>
.itemBtn {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.mycard {
    .myimg {
        width: 100%;
        height: 200px;
    }
    .mybtns {
        display: flex;
        justify-content: space-around;
        i {
            font-size: 20px;
        }
    }
}

.el-pagination.is-background {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
.avatar-uploader {
    text-align: center;
}
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
  .el-upload.el-upload--text {
    border: 1px dashed #ccc;
}
</style>
