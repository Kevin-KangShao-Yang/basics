// 封装所有与文章相关的网络请求

// 导入 axios
import myaxios from "../utils/request";

// 创建一个请求 tag 数据的方法
function apiGetTag() {
  return myaxios({
    url: "/tags",
    method: "GET"
  });
}

// 创建一个请求文章列表的方法
function apiGetArticles() {
  return myaxios({
    url: "/articles?limit=10",
    method: "GET"
  });
}

// 暴露
export { apiGetTag, apiGetArticles };
