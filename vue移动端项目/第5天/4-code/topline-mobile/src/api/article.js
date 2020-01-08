// 封装所有与文章相关的网络请求

function apiGetChannelArticle (axios, { url, method, query }) {
  return axios({
    url,
    method,
    params: query
  })
}

// 导出
export { apiGetChannelArticle }
