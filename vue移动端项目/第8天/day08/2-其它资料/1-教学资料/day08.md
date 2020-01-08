## mobile-day08

### 1.0 完成详情页面

#### 1.1 静态页面

+ 组件&路由
+ 设置一个入口
+ 完成静态页面

#### 1.2 动态处理数据

+ 渲染文章数据
  + a. 打开页面时得到文章 id
  + b. 发送请求到服务器，根据 id 获取文章信息
    + 请求服务器接口
      + url： /v1_0/articles/:article_id 
      + method： get
      + 参数
        + article_id ：文章 id
    + 返回的数据
      + art_id: 文章 id
      + attitude：态度
        + -1 无感
        + 0 不喜欢
        + 1 点赞
      + aut_id：作者 id
      + aut_name：作者名称
      + aut_photo：作者头像
      + ch_id：不知道
      + content: 文章 的内容
      + is_collected：是否收藏
      + is_followed：是否关注
      + pubdate：发布日期
      + title：文章标题
  + c. 将信息保存起并且渲染到页面上
+ 完成关注用户功能
  + 功能：
    + 已经关注：点击会取消关注
    + 没有关注：点击会完成关注
  + 步骤：
    + a. 给按钮添加点击事件
    + b. 在事件中
      + 判断：如果当前作者处于关注状态，取消关注
        + 取消关注接口
          + url： /v1_0/user/followings/:target 
          + method： DELETE 
          + 参数：
            +  target ：当前作者的 id
      + 判断：如果当前作者处于没有关注状，完成关注
        + 关注接口
          + url： /v1_0/user/followings 
          + method： POST 
          + 参数：
            +  target ：当前作者的 id
+ 完成点赞与不喜欢功能
+ 动态添加留言
  + a. 给发送按钮添加点击事件
  + b. 在事件中
    + 得到留言框中的留言
    + 将留言数据提交到服务器
      + 请求服务器接口
        + url： /v1_0/comments 
        + method： POST 
        + 参数：
          + 给文章留言：
            + target：要留言的文章
            + content：留言的内容
          + 给留言进行回复
            + tartget：当前留言的 id
            + content：回复留言的内容
            + art_id：当前留言所属的文章
    + 给留言组件传入参数：
      + 当前文章的相关信息(包括id)
    + 更新留言数据
+ 动态渲染留言

