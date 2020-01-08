// 处理所有与文章相关的网络请求

// 得到频道下面的文章数据
function apiGetChannleArticle (axios, { url, method, query }) {
  return axios({
    url: url,
    method: method,
    params: query
  })
}

// 暴露给外界
export { apiGetChannleArticle }
