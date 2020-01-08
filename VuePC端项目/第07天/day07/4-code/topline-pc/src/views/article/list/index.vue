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
                    {{ status }}
                    <el-radio v-model="status" label="">全部</el-radio>
                    <el-radio v-model="status" label="0">草稿</el-radio>
                    <el-radio v-model="status" label="1">待审核</el-radio>
                    <el-radio v-model="status" label="2">审核通过</el-radio>
                    <el-radio v-model="status" label="3">审核失败</el-radio>
                </el-form-item>
                <el-form-item label="频道列表">
                        {{ channel_id }}
                    <el-select v-model="channel_id" placeholder="请选择活动区域">
                        <!-- <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option> -->
                        <el-option v-for="(item, index) in channleList" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间选择">
                    {{ datetime }}
                    <el-date-picker value-format="yyyy-MM-dd" v-model="datetime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button @click="search">筛选</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!-- 文章显示区域 -->
        <el-card class="box-card mycard">
            <div slot="header" class="clearfix">
                <span>共找到{{ total_count }}条符合条件的内容</span>
            </div>
            <!-- 表格区域 -->
            <!-- el-table: 表格组件 data：指定表格的数据源 -->
            <el-table v-loading="tableLoading" :stripe="true" :border="true" :data="dataList" style="width: 100%">
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
                        <el-button @click="update(scope.row)" size="mini" round>
                            <i class="el-icon-edit"></i>修改</el-button>
                        <el-button @click="delArticle(scope.row)" size="mini" round>
                            <i class="el-icon-delete"></i>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination :total="total_count" @current-change="currentChange" @prev-click="prevClick" @next-click="nextClick" background layout="prev, pager, next">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        region: '',
        resource: ''
      },
      value1: '',
      // 保存文章列表数据
      dataList: [],
      // 文章的总条数
      total_count: 0,
      // 当前页
      page: 1,
      // 页容量
      per_page: 10,
      // 表格的加载效果
      tableLoading: false,
      // 文章的状态
      status: '',
      // 频道列表的数据源
      channleList: [],
      // 定义一个频道 id
      channel_id: '',
      // 起始时间
      datetime: []
    }
  },
  methods: {
    // 打开页面时，需要去请求文章列表的数据
    getArticleList () {
      // 添加一些筛选的条件： status channle_id datetime
      // 定义一个参数对象
      let paramsObj = {}
      // 判断是否需要状态
      if (this.status) {
        paramsObj.status = this.status
      }
      // 判断是否需要频道
      if (this.channel_id) {
        paramsObj.channel_id = this.channel_id
      }
      // 判断是否需要时间
      if (this.datetime !== null && this.datetime.length !== 0) {
        paramsObj.begin_pubdate = this.datetime[0]
        paramsObj.end_pubdate = this.datetime[1]
      }

      // 将加载状态改为 true
      this.tableLoading = true
      // 这个请求如果不带 token 返回 401
      // 携带 token
      this.$http({
        url: '/articles',
        method: 'GET',
        params: {
          page: this.page,
          per_page: this.per_page,
          ...paramsObj
        }
      }).then(res => {
        // 将数据源保存到 dataList 中
        this.dataList = res.results
        // 数据的总条数进行保存
        this.total_count = res.total_count
        // 将加载状态改为 false
        this.tableLoading = false
      })
    },
    // 上一页
    prevClick () {
      this.page--
      // 重新请求数据
      this.getArticleList()
    },
    // 下一页
    nextClick () {
      this.page++
      this.getArticleList()
    },
    // 具体的页码
    currentChange (page) {
      this.page = page
      this.getArticleList()
    },
    // 删除文章
    delArticle (row) {
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发送请求到服务器   :target 动态路由（标识着 target 并不是一个字符串，而是一个参数）
        this.$http({
          url: `/articles/${row.id}`,
          method: 'DELETE' // put(POST) patch(POST) delete(GET)   GET POST
        }).then(res => {
          // 重新请求数据
          this.getArticleList()
          // console.log(res)
          // 提示删除成功
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
      })
    },
    // 动态获取频道数据
    getChannle () {
      this.$http({
        url: '/channels',
        method: 'GET'
      }).then(res => {
        this.channleList = res.channels
      })
    },
    // 用来筛选数据
    search () {
      this.getArticleList()
    },
    // 进入修改文章页面
    update (row) {
      this.$router.push(`/article/edit/${row.id}`)
    }
  },
  created () {
    this.getArticleList()
    // 请求频道数据
    this.getChannle()
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
