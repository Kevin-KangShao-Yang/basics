<template>
  <div>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>发表文章</span>
      </div>
      <!-- 内容区域 -->
      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题">
          <el-input v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <!-- <el-input v-model="ruleForm.content" autocomplete="off"></el-input> -->
          <quill-editor v-model="ruleForm.content"></quill-editor>
        </el-form-item>
        <el-form-item label="封面">
          <label>封面暂无</label>
        </el-form-item>
        <el-form-item label="频道">
          {{ ruleForm.channel_id }}
          <channleList @tofather="getValue" :mychannel="ruleForm.channel_id" />
          <!-- <el-select v-model="ruleForm.channel_id">
                              <el-option v-for="(item, index) in channleList" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="publish('false')">发表</el-button>
          <el-button @click="publish('true')">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入频道组件
import channleList from '@/components/channles'

export default {
  data() {
    return {
      ruleForm: {
        title: '',
        content: '',
        channel_id: 2
      },
      // 要修改数据的 id
      editId: 0
    }
  },
  methods: {
    // 进行组件之间的传参
    getValue(value) {
      this.ruleForm.channel_id = value
    },
    // 实现发表方法
    publish(draft) {
      if (this.$route.path.indexOf('edit') !== -1) {
        // 修改文章
        this.editArticle(draft)
      } else {
        // 发布文章
        this.publistArticle(draft)
      }
    },
    // 发表文章的逻辑
    publistArticle(draft) {
      // 请求服务器的接口提交数据
      this.$http({
        url: `/articles?draft=${draft}`, // 请求的路径
        method: 'POST',
        data: {
          channel_id: this.ruleForm.channel_id, // 频道 id
          content: this.ruleForm.content, // 文章的内容
          cover: { // 图片：写死的
            type: 1,
            images: ['http://toutiao.meiduo.site/Fhp5OXHbYJzUdd8pCJGjX4i9K_7y']
          },
          title: this.ruleForm.title // 标题
        }
      }).then(res => {
        if (res) {
          // 提示成功
          this.$message({
            message: draft === 'true' ? '成功存入草稿' : '发表成功',
            type: 'success'
          })
          // 跳转到内容页
          this.$router.push('/article/list')
        }
      })
    },
    // 修改文章的逻辑
    editArticle(draft) {
      this.$http({
        url: `/articles/${this.editId}?draft=${draft}`,
        method: 'PUT',
        data: this.ruleForm
      }).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        // 跳转到 list
        this.$router.push('/article/list')
      })
    },
    // 得到要修改数据 id
    getEditId() {
      this.editId = this.$route.params.id
    },
    // 要根据 id 去服务器中得到 id 对象的数据
    getEditObjById() {
      this.$http({
        url: `/articles/${this.editId}`,
        method: 'GET'
      }).then(res => {
        // 将返回的数据赋值给 ruleForm
        this.ruleForm = res
      })
    }
  },
  created() {
    // 判断是否是编辑页面
    if (this.$route.path.indexOf('edit') !== -1) { // 是编辑页面
      this.getEditId()
      // 根据 id 得到数据
      this.getEditObjById()
    }
    // this.getEditId()
  },
  components: {
    channleList // 频道组件
  },
  // 侦听器
  watch: {
    // 路由信息对象
    $route: function() {
      console.log('哎呀，路由对象变化啦')
      if (this.$route.path.indexOf('publish') !== -1) {
        // 清除数据
        this.ruleForm = {
          title: '',
          content: '',
          channel_id: ''
        }
      }
    }
  }
}
</script>

<style>
.ql-container.ql-snow {
  height: 400px;
}
</style>
