// 封装搜索的接口

// 联想接口
function apiThinkSearch (axios, q) {
  return axios({
    url: `/v1_0/suggestion?q=${q}`,
    method: 'GET'
  })
}

// 搜索的结果
function apiGetSearchList (axios, { page, perpage, q }) {
  return axios({
    url: '/v1_0/search',
    method: 'GET',
    params: {
      page: page,
      per_page: perpage,
      q: q
    }
  })
}

// 暴露 API
export { apiThinkSearch, apiGetSearchList }
