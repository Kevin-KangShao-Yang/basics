// 封装所有与频道相关的网络请求

// 得到频道的数据
function apiGetChannelList (axios, { url, method }) {
  return axios({
    url: url,
    method: method
  })
}

// 得到所有的频道数据
function apiGetAllChannels (axios, { url, method }) {
  return axios({
    url,
    method
  })
}

// 设置频道数据
function apiSetUserChannels (axios, { url, method, data }) {
  return axios({
    url,
    method,
    data
  })
}

// 按需导出
export { apiGetChannelList, apiGetAllChannels, apiSetUserChannels }
