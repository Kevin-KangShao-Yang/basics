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
          {{ ruleForm.cover.type }}
          <el-radio-group v-model="ruleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 添加一个图片选择器 -->
          <div class="imgSelectBox" v-if="ruleForm.cover.type > 0">
            <div @click="selectImg(index)" class="imgItem" v-for="(item, index) in ruleForm.cover.type" :key="index">
              <span>点击改变图片</span>
              <img class="myAdd" :src="ruleForm.cover.images[index] ? ruleForm.cover.images[index] :'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3281196885,1779237671&fm=26&gp=0.jpg'" alt="">
            </div>
          </div>
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

      <!-- 选择图片的弹框 -->
      <el-dialog title="选择封面图片" :visible.sync="imgVisible">
        <!-- el-tabs: tab 选择 tab-click: 点击 tab 选项的事件 -->
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="素材库" name="first">
            <el-radio-group v-model="collectItem" @change="changeCollect">
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button label="收藏"></el-radio-button>
            </el-radio-group>
            <!-- 遍历素材的数据源 -->
            <el-row>
              <el-col :span="8" v-for="(item, index) in collectList" :key="index">
                <img :class="{active: activeIndex === index}" @click="chooseImg(index, item.url)" class="myimg" :src="item.url" alt="">
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="上传图片" name="second">
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              :headers="{Authorization: `Bearer ${$store.state.userInfo.token}`}"
              name="image"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button @click="imgVisible = false">取 消</el-button>
          <el-button type="primary" @click="confrimImg">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// 导入频道组件
import channleList from '@/components/channles'

export default {
  data () {
    return {
      ruleForm: {
        title: '',
        content: '',
        channel_id: 2,
        cover: {
          type: 1,
          images: []
        }
      },
      // 要修改数据的 id
      editId: 0,
      // 控制弹框的显示和隐藏
      imgVisible: false,
      // 设置选中的 tab
      activeName: 'first',
      // 选择的是全部&收藏
      collectItem: '全部',
      // 素材资源的数据源
      collectList: [],
      // 选中的图片的下标
      activeIndex: -1,
      // 图片选择器的下标
      selectedImgIndex: 0,
      // 图片选择器中选中的图片
      selectedImgUrl: '',
      // 上传成功后显示的图片地址
      imageUrl: ''
    }
  },
  methods: {
    // 进行组件之间的传参
    getValue (value) {
      this.ruleForm.channel_id = value
    },
    // 实现发表方法
    publish (draft) {
      if (this.$route.path.indexOf('edit') !== -1) {
        // 修改文章
        this.editArticle(draft)
      } else {
        // 发布文章
        this.publistArticle(draft)
      }
    },
    // 发表文章的逻辑
    publistArticle (draft) {
      // 请求服务器的接口提交数据
      this.$http({
        url: `/articles?draft=${draft}`, // 请求的路径
        method: 'POST',
        data: {
          channel_id: this.ruleForm.channel_id, // 频道 id
          content: this.ruleForm.content, // 文章的内容
          // cover: { // 图片：写死的
          //   type: 1,
          //   images: ['http://toutiao.meiduo.site/Fhp5OXHbYJzUdd8pCJGjX4i9K_7y']
          // },
          cover: this.ruleForm.cover,
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
    editArticle (draft) {
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
    getEditId () {
      this.editId = this.$route.params.id
    },
    // 要根据 id 去服务器中得到 id 对象的数据
    getEditObjById () {
      this.$http({
        url: `/articles/${this.editId}`,
        method: 'GET'
      }).then(res => {
        // 将返回的数据赋值给 ruleForm
        this.ruleForm = res
      })
    },
    // 打开一个弹框
    selectImg (index) {
      this.imgVisible = true
      // 这里的 index 表示的当前点击的图片选择器的下标
      this.selectedImgIndex = index
    },
    // 加载素材资源
    // collect: true 说明是收藏的数据 false 全部数据
    getCollectList (collect) {
      this.$http({
        url: '/user/images',
        method: 'GET',
        params: {
          collect: collect
        }
      }).then(res => {
        this.collectList = res.results
      })
    },
    // 切换全部&收藏
    changeCollect () {
      if (this.collectItem === '全部') {
        // 加载全部数据
        this.getCollectList(false)
      } else {
        // 加载收藏数据
        this.getCollectList(true)
      }
    },
    // 点击素材时的事件
    chooseImg (index, url) {
      this.activeIndex = index
      this.selectedImgUrl = url
    },
    // 当点击确定按钮：1.0 关闭面板 2.0 将选中的图片保存到 cover 中的 Images 中
    confrimImg () {
      this.imgVisible = false
      // 设置属性
      this.ruleForm.cover.images[this.selectedImgIndex] = this.selectedImgUrl
      console.log(this.ruleForm)
    },
    // 上传图片成功后的回调
    handleAvatarSuccess (response, file, fileList) {
      console.log(response)
      this.imageUrl = response.data.url
      this.selectedImgUrl = response.data.url
    }
  },
  created () {
    // 判断是否是编辑页面
    if (this.$route.path.indexOf('edit') !== -1) { // 是编辑页面
      this.getEditId()
      // 根据 id 得到数据
      this.getEditObjById()
    }
    // 调用得到素材资源的方法
    this.getCollectList()
    console.log(this.ruleForm.cover.images[1])
  },
  components: {
    channleList // 频道组件
  },
  // 侦听器
  watch: {
    // 路由信息对象
    $route: function () {
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

<style lang="less" scoped>
.ql-container.ql-snow {
  height: 400px;
}

.imgSelectBox {
  display: flex;
  .imgItem {
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    text-align: center;
    .myAdd {
      // display: block;
      width: 150px;
      height: 150px;
    }
  }
}

.myimg {
  width: 150px;
  height: 150px;
  margin: 20px;
}

.active {
  border: 10px solid red;
  box-sizing: border-box;
}
</style>
