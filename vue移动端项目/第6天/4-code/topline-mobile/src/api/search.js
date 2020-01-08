// 封装搜索的接口

// 联想接口
function apiThinkSearch (axios, q) {
  return axios({
    url: `/v1_0/suggestion?q=${q}`,
    method: 'GET'
  })
}

// 暴露 API
export { apiThinkSearch }
