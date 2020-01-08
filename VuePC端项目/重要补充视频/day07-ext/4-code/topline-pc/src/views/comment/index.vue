<template>
    <el-card>
        <!-- 评论表格 -->
        <el-table v-loading="loading" :data="commentList" style="width: 100%">
            <el-table-column prop="title" label="标题" width="180">
            </el-table-column>
            <el-table-column label="评论状态" width="180">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.comment_status === false" type="danger">禁用</el-tag>
                    <el-tag v-if="scope.row.comment_status === true" type="success">启用</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="total_comment_count" label="总评论数">
            </el-table-column>
            <el-table-column prop="fans_comment_count" label="粉丝评论数据">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="closeComment(scope.row)" type="text">
                        {{ scope.row.comment_status ? '关闭评论': '开启评论' }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            // 评论的列表
            commentList: [],
            // 加载状态
            loading: false
        }
    },
    methods: {
        //得到评论数据
        getCommentList() {
            this.loading = true
            this.$http({
                url: '/articles',
                method: 'GET',
                params: {
                    response_type: 'comment'
                }
            }).then(res => {
                this.loading = false
                // 得到评论的列表
                this.commentList = res.results
            })
        },
        // 关闭/开启评论
        closeComment(row) {
            this.$http({
                url: `/comments/status?article_id=${row.id}`,
                method: 'PUT',
                data: {
                    // 将状态取反：如果状态为开启，就关闭。反之则开启
                    allow_comment: !row.comment_status 
                }
            }).then(res => {
                // 重新请求评论数据
                this.getCommentList()
                // 显示提示信息
                this.$message({
                    message: res.allow_comment ? '开启评论成功': '关闭评论成功',
                    type: 'success'
                })
            })
        }
    },
    created() {
        // 获取评论数据
        this.getCommentList()
    }
}
</script>

<style>
.el-pagination.is-background {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
</style>
