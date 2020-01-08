<template>
  <div>
      <!-- 显示评论 -->
      <van-cell>
          <template slot="title">
              <div class="comment">
                <div class="t-img">
                    <img :src="itemobj.aut_photo" alt="">
                </div>
                <div class="t-msg">
                    <div class="nname">
                        <div class="nickname">{{ itemobj.aut_name }}</div>
                        <div class="icon"><van-icon name="good-job-o" />{{ itemobj.like_count }}</div>
                    </div>
                    <div class="content">
                        {{ itemobj.content }}
                    </div>
                    <div class="time">
                        <span> {{ itemobj.pubdate | relativetime }} </span>
                        <van-button v-if="isa === true" @click="repaly" type="default" size="small"> {{ itemobj.reply_count }}回复 </van-button>
                    </div>
                </div>
              </div>
          </template>
      </van-cell>
  </div>
</template>

<script>
// 导入 bus
import bus from '@/utils/bus'
export default {
  props: ['itemobj', 'value', 'isa'],
  methods: {
    repaly () {
      // 打开回复评论的面板
      this.$emit('input', true)
      // 将参数通过 bus 交给面板
      bus.$emit('commentitem', this.itemobj)
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
    display: flex;
    width: 100%;
    .t-img {
        margin-right: 10px;
        img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
        }
    }
    .t-msg {
        width: 100%;
        .nname {
            display: flex;
            width: 100%;
            justify-content: space-between;
        }
        .content {
            font-size: 16px;
            font-weight: 700;
            margin: 20px 0;
        }
    }
}
</style>
