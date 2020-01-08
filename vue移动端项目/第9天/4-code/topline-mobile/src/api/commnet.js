// 负责处理所有与评论相关的网络请求

// 得到文章评论数据
function apiGetPageComment (axios, { source, offset, limit }) {
  return axios({
    url: '/v1_0/comments',
    method: 'GET',
    params: {
      type: 'a',
      source: source,
      offset: offset,
      limit: limit
    }
  })
}

// 得到评论的回复
function apiGetPageCommentReplay (axios, { source, offset, limit }) {
  return axios({
    url: '/v1_0/comments',
    method: 'GET',
    params: {
      type: 'c',
      source: source,
      offset: offset,
      limit: limit
    }
  })
}

export { apiGetPageComment, apiGetPageCommentReplay }
