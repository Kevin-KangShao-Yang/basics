// 管理所有与用户相关的网络请求

// 用来进行用户的登录
//  axios: 发起网站请求的对象
//  options: 发起网络请求的参数
//      url:
//      method:
//      data
// function userLogin (axios, options) {
function userLogin (axios, { url, method, data }) {
  // 发送网络请求
  return axios({
    url: url,
    method: method,
    data: data
  })
  // return 返回了一个 promise 对象
}
// 将来调用 userLogin 时，得到的是一个 promise 对象，所以可以直接通过 userLogin.then().catch

function apiBalckList (axios, autid) {
  return axios({
    url: '/v1_0/user/blacklists',
    method: 'POST',
    data: {
      target: autid
    }
  })
}

// 取消关注用户
function apiUnFollow (axios, userId) {
  return axios({
    url: `/v1_0/user/followings/${userId}`,
    method: 'DELETE'
  })
}

// 关注用户
function apiFollow (axios, userId) {
  return axios({
    url: `/v1_0/user/followings`,
    method: 'post',
    data: {
      target: userId
    }
  })
}

// 暴露给外界：按需导出
export {
  userLogin,
  apiBalckList,
  apiUnFollow,
  apiFollow
}
