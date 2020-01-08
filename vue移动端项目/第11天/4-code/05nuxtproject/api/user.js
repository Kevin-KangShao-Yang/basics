// 处理所有与用户相关的网络请求
import myaxios from "../utils/request";

// 添加一个登录接口
function apiLogin(user) {
  return myaxios({
    url: "/users/login",
    method: "POST",
    data: {
      user: user
    }
  });
}

export { apiLogin };
