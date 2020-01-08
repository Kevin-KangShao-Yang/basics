<template>
    <div>
        <h2>使用 vant</h2>
        <h3>1.0 使用 vant 中的 button</h3>
        <van-button @click="defaultClick" type="default">默认按钮</van-button>
        <van-button type="primary">主要按钮</van-button>
        <van-button type="info">信息按钮</van-button>
        <van-button type="warning">警告按钮</van-button>
        <van-button type="danger">危险按钮</van-button>
        <h3>2.0 使用 vant 中的单元格</h3>
        <van-cell class="mycell" title="单元格" is-link value-class="colorGreen" value='内容' />
        <van-cell class="mycell">
            <template slot="default">
                <van-icon name="like" />
                我是template
            </template>
            <template slot="title">
                <van-icon name="like" />
                单元格
            </template>
        </van-cell>
        <h3>3.0 使用 vant 中的字体</h3>
        <van-icon name="like" />
    </div>
</template>

<script>
export default {
  methods: {
    defaultClick () {
      console.log('你好啊，')
    }
  }
}
</script>

<style lang="less" scoped>
.mycell {
  border: 1px solid #ccc;
  color: red;
}
.colorGreen {
    color: green;
}
</style>
