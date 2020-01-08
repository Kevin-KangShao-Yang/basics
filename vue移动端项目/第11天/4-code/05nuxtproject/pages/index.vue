<template>
  <div>
    <!-- 功能：1）显示 tag 标签 2）显示文章列表 -->
    <div class="home-page">

      <div class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div class="container page">
        <div class="row">

          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <a class="nav-link disabled" href="">Your Feed</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" href="">Global Feed</a>
                </li>
              </ul>
            </div>

            <div class="article-preview" v-for="(item, index) in articles" :key="index">
              <div class="article-meta">
                <a href="profile.html"><img :src="item.author.image" /></a>
                <div class="info">
                  <a href="" class="author">{{ item.author.username }}</a>
                  <span class="date">{{ item.updatedAt }}</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right">
                  <i class="ion-heart"></i> {{ item.favoritesCount }}
                </button>
              </div>
              <a href="" class="preview-link">
                <h1>{{ item.title }}</h1>
                <p>{{ item.body }}</p>
                <span>Read more...</span>
              </a>
            </div>

          </div>
          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>
              <div class="tag-list">
                <a href="" class="tag-pill tag-default" v-for="(item, index) in tags" :key="index">{{ item }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入接口
import { apiGetTag, apiGetArticles } from '../api/article'

export default {
  // 服务器渲染
  async asyncData() {
    // 得到所有的 tag 数据
    let tagRes = await apiGetTag()
    // 得到文章数据
    let articleRes = await apiGetArticles()
    console.log(articleRes.data.articles[0].author)
    // 返回数据
    return {
      tags: tagRes.data.tags,
      articles: articleRes.data.articles
    }
  }
}
</script>

<style>

</style>
