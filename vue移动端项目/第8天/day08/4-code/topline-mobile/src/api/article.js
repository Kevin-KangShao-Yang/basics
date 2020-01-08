// 封装所有与文章相关的网络请求

function apiGetChannelArticle (axios, { url, method, query }) {
  return axios({
    url,
    method,
    params: query
  })
}

// 对文章不喜欢
function apiNotLikeArticle (axios, { url, method }) {
  return axios({
    url,
    method
  })
}

// 举报文章
function apiReportArticle (axios, { target, type }) {
  return axios({
    url: '/v1_0/article/reports',
    method: 'POST',
    data: {
      target: target,
      type: type,
      remark: ''
    }
  })
}

// 得到文章详情
function apiGetArticlList (axios, articleid) {
  return axios({
    url: `/v1_0/articles/${articleid}`,
    method: 'GET'
  })
}

// 给文章添加留言
function apiSetCommetForArticle (axios, { target, content }) {
  return axios({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content
    }
  })
}

// 导出
export { apiGetChannelArticle, apiNotLikeArticle, apiReportArticle, apiGetArticlList, apiSetCommetForArticle }
