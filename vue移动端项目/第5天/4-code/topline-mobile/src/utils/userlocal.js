// 封装对 localstorage 中 user 的操作

// 提前定义好要操作的 key
const USER_KEY = 'user'
// 新增 user
// value: 要存储的数据对象
function setUserLocal (value) {
  window.localStorage.setItem(USER_KEY, JSON.stringify(value))
}
// 删除 user
function removeUserLocal () {
  window.localStorage.removeItem(USER_KEY)
}
// 查询
function getUserLocal () {
  return JSON.parse(window.localStorage.getItem(USER_KEY))
}

// 将方法暴露给外界
export {
  setUserLocal,
  removeUserLocal,
  getUserLocal
}
