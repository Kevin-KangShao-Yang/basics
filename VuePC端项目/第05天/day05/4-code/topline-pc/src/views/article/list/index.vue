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
                    <!-- el-select：选择器 v-model：当前选择的选项的 value 属性  -->
                    {{ form.channelid }}
                    <el-select clearable v-model="form.channelid" placeholder="请选择活动区域">
                        <!-- el-option：下拉选项 label：显示的文本 value="对应的值" -->
                        <el-option v-for="(item,index) in channelsList" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间选择">
                    <!-- v-model：绑定的数据源  range-separator：两个日期之间的分隔符  -->
                    {{ dateTime }}
                    <el-date-picker value-format="yyyy-MM-dd" v-model="dateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button @click="searchList">搜索</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!-- 文章显示区域 -->
        <el-card class="box-card mycard">
            <div slot="header" class="clearfix">
                <span>共找到{{total_count}}条符合条件的内容</span>
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
                        <el-button size="mini" round>
                            <i class="el-icon-edit"></i>修改</el-button>
                        <el-button size="mini" round @click="delArticle(scope.row)">
                            <i class="el-icon-delete"></i>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <!-- el-pagination：分页组件 layout：分页组件的布局 total -->
            <el-pagination :disabled="tableLoading" @current-change="pageChange" @next-click="nextClick" @prev-click="perClick" background layout="prev, pager, next" :total="total_count">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
// 得到 token
// let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
export default {
  data () {
    return {
      form: {
        channelid: '',
        resource: ''
      },
      // 开始&结束的时间
      dateTime: [],
      // 保存文章列表数据
      dataList: [],
      // 文章的总条数
      total_count: 0,
      // 分页的页码
      page: 1, // 默认第一页
      // 每页的条数
      per_page: 10, // 每页显示 10 条
      // 控制表格的加载效果
      tableLoading: false,
      // 得到频道的数据源
      channelsList: [],
      // 筛选的状态属性： 0 , 1, 2, 3 没有内容
      status: ''
    }
  },
  methods: {
    // 打开页面时，需要去请求文章列表的数据
    getArticleList () {
      // 开启加载动画
      this.tableLoading = true
      setTimeout(() => {
        // 这个请求如果不带 token 返回 401
        // 携带 token
        this.$http({
          url: '/articles',
          method: 'GET',
          // 如果请求方式是 POST：使用 data 来进行传参
          // 如果请求方式是 GET：使用 params 来进行传参
          params: {
            page: this.page,
            per_page: this.per_page
            // status: 0, // 草稿
            // channel_id: 3, // IOS
            // begin_pubdate: this.dateTime[0], // 开始时间
            // end_pubdate: this.dateTime[1] // 结束时间
          }
        }).then(res => {
          // 将数据源保存到 dataList 中
          this.dataList = res.results
          // 数据的总条数进行保存
          this.total_count = res.total_count
          // 关闭加载动画
          this.tableLoading = false
        })
      }, 1000)
    },
    // 点击上一次页会触发
    perClick () {
      // 先将当前页减一
      this.page = this.page - 1
      // 应该重新请求当前页的数据
      this.getArticleList()
    },
    // 点击下一页会触发
    nextClick () {
      // 先将当前页加一
      this.page = this.page + 1
      // 重新请求数据源
      this.getArticleList()
    },
    // 当点击具体页码时会触发
    pageChange (page) {
      // 将页码赋值给 this.page
      this.page = page
      // 重新请求数据
      this.getArticleList()
    },
    // 删除数据的方法
    delArticle (row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = `/articles/${row.id}`
        // 将数据进行删除
        this.$http({
          url: url,
          method: 'DELETE'
        }).then(res => {
          console.log(res) // undefined:说明删除成功了
          // 需要重新请求数据
          this.searchList()
          // 提示删除成功
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
      })
    },
    // 获取频道数据
    getChannels () {
      // 请求服务器得到数据
      this.$http({
        url: '/channels',
        method: 'GET'
      }).then(res => {
        this.channelsList = res.channels
      })
    },
    // 筛选数据
    searchList () {
      this.tableLoading = true
      // 创建一个参数对象：
      //      如果我们的参数在这里存在就直接添加到对象中，如果参数不存在，就不放到对象中
      let paramsObj = {}
      // 判断是否存在状态
      if (this.status) {
        paramsObj.status = this.status
      }
      // 判断是否存在频道数据
      if (this.form.channelid) {
        paramsObj.channel_id = this.form.channelid
      }
      // 判断是否存在时间
      if (this.dateTime != null && this.dateTime.length !== 0) {
        paramsObj.begin_pubdate = this.dateTime[0]
        paramsObj.end_pubdate = this.dateTime[1]
      }
      // 1.0 得到所有搜索相关的属性
      // 状态： status 频道 form.channelId 时间 dateTime
      // 2.0 以这些数据为参数到服务器中请求:发送请求到服务器
      this.$http({
        url: '/articles',
        method: 'GET',
        params: {
          page: this.page,
          per_page: this.per_page,
          ...paramsObj
        }
      }).then(res => {
        // 将数据保存
        this.dataList = res.results
        this.total_count = res.total_count
        this.tableLoading = false
      })
    }
  },
  created () {
    // 得到文章列表
    this.getArticleList()
    // 得到频道数据
    this.getChannels()
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
