<template>
    <div>
        <router-view />
        <!-- 添加四个 tabBar -->
        <van-tabbar route>
            <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
            <van-tabbar-item to="/search" icon="chat-o">搜索</van-tabbar-item>
            <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
            <van-tabbar-item to="/my" icon="manager-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
}
</script>

<style>

</style>
