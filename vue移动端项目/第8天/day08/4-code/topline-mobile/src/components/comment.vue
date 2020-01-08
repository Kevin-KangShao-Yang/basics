<template>
  <div>
      <!-- 显示评论 -->
      <van-cell>
          <template slot="title">
              <div class="comment">
                <div class="t-img">
                    <img src="https://ss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=1892386803,2458423094&fm=74&app=80&f=JPEG&size=f121,140?sec=1880279984&t=6c48015983ef2fc38b44bbdef93e7b50" alt="">
                </div>
                <div class="t-msg">
                    <div class="nname">
                        <div class="nickname">晚风吻尽南瓜叶</div>
                        <div class="icon"><van-icon name="good-job-o" />26</div>
                    </div>
                    <div class="content">
                        我出去跟别人说我的是 IPoneXS 就完事了呗
                    </div>
                    <div class="time">
                        <span>09-13 15:51</span> <van-button type="default" size="small"> 18回复 </van-button>
                    </div>
                </div>
              </div>
          </template>
      </van-cell>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.comment {
    display: flex;
    .t-img {
        margin-right: 10px;
        img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
        }
    }
    .t-msg {
        .nname {
            display: flex;
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
