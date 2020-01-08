<template>
    <div>
        <h1>我是 news</h1>
        <!-- 有两个链接 -->
        <div class="content">
            <div class="left">
                <ul>
                    <li>
                        <router-link to="/wang">王宝强</router-link>
                    </li>
                    <li>
                        <router-link to="/jia">贾乃亮</router-link>
                    </li>
                </ul>
            </div>
            <div class="right">
                <!-- 添加一个被替换的容器 -->
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
h1 {
    height: 40px;
    line-height: 40px;
}
.content {
    width: 600px;
    height: 600px;
    display: flex;
    .left {
        width: 150px;
        height: 538px;
        border: 10px solid #ddd;
        box-sizing: border-box;
    }
    .right {
        width: 450px;
        height: 538px;
        border: 10px solid #999;
        box-sizing: border-box;
    }
}
</style>
