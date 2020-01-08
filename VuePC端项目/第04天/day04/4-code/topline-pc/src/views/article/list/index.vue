<template>
    <div>
        <!-- 顶部搜索选项区域 -->
        <!-- el-card: 卡片 -->
        <el-card class="box-card">
            <!-- 表示的是卡片的头部 -->
            <div slot="header" class="clearfix">
                <span>全部图文</span>
            </div>
            <!-- 添加一些 form 表单 -->
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="文章状态">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="全部"></el-radio>
                        <el-radio label="草稿"></el-radio>
                        <el-radio label="待审核"></el-radio>
                        <el-radio label="审核通过"></el-radio>
                        <el-radio label="审核失败"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="频道列表">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间选择">
                    <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </el-card>
        <!-- 文章显示区域 -->
        <el-card class="box-card mycard">
            <div slot="header" class="clearfix">
                <span>共找到56947条符合条件的内容</span>
            </div>
            <!-- 表格区域 -->
            <!-- el-table: 表格组件 data：指定表格的数据源 -->
            <el-table :stripe="true" :border="true" :data="dataList" style="width: 100%">
                <!-- el-table-column：表格组件中的每一列 label：当前列的标题 prop: 当前行显示的数据的属性 -->
                <el-table-column align="center" label="图片" width="180">
                    <!-- 表单将来当前行不是显示 prop 属性对应的数据，而是显示 tempalte 中的内容 -->
                    <!-- 给 template 设置属性： slot-scope -->
                    <!-- 如果在 template 中需要使用到数据的话，必须通过 scope.row 属性来使用-->
                    <!-- scope.row 是当前行的数据源 -->
                    <template slot-scope="scope">
                        <!-- {{ scope.row }} -->
                        <img class="myimg" :src="scope.row.cover.images[0]" />
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="title" label="标题" width="180">
                </el-table-column>
                <el-table-column align="center" prop="status" label="状态" width="180">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status === 0">草稿</span>
                        <span v-if="scope.row.status === 1">待审核</span>
                        <span v-if="scope.row.status === 2">审核通过</span>
                        <span v-if="scope.row.status === 3">审核失败</span>
                        <span v-if="scope.row.status === 4">已删除</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="pubdate" label="发布日期" width="180">
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" round><i class="el-icon-edit"></i>修改</el-button>
                        <el-button size="mini" round><i class="el-icon-delete"></i>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination background layout="prev, pager, next" :total="1000">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
// 得到 token
let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
export default {
    data() {
        return {
            form: {
                region: '',
                resource: ''
            },
            value1: '',
            // 保存文章列表数据
            dataList: [],
            // 文章的总条数
            total_count: 0
        }
    },
    methods: {
        // 打开页面时，需要去请求文章列表的数据
        getArticleList() {
            // 这个请求如果不带 token 返回 401
            // 携带 token
            this.$http({
                url: '/articles',
                method: 'GET'
                // headers: {
                //     Authorization: `Bearer ${userInfo.token}`
                // }
            }).then(res => {
                // 将数据源保存到 dataList 中
                this.dataList = res.results
                // 数据的总条数进行保存
                this.total_count = res.total_count
            })
        }
    },
    created() {
        this.getArticleList()
    }
}
</script>

<style lang="less">
.mycard {
    margin-top: 20px;
}

.myimg {
    width: 150px;
    height: 100px;
}
</style>
