###一、NodeJS基础开发环境准备

> 1. 前往[Node.js官网](https://nodejs.org/)下载对应平台的安装程序，NodeJS默认安装包管理工具npm，目前Node.js的最新版本是**10.16.3**，目前npm最新版本是 **6.9.0**![](.\images\1.png)

```js
//查看ndoe版本
node -v
//查看npm版本
npm -v
```


> 2. 通过命令配置npm国内镜像环境

   ```js
//配置命令
npm config set registry https://registry.npm.taobao.org
//验证命令
npm config get registry
//如果返回 https://registry.npm.taobao.org，说明镜像配置成功
   ```

>  3. 直接使用cnpm安装

   ```js
//安装cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org
//使用cnpm
cnpm install xxx
   ```



###二、下载安装并配置 Visual Studio Code 开发环境

> 1. 前往Visual Studio Code（简称 VS Code）[官网地址](https://code.visualstudio.com/Download) 下载对应软件包并安装![](.\images\2.png)

> 2. 安装配置VS Code中文环境
>    1. 点击左侧工具栏的extensions或者使用快捷键【Ctrl+Shift+X】，输入chinese，点击Install安装中文简体
>    2. 使用快捷键【Ctrl+Shift+P】弹出查找命令框，输入language, 找到Configure Display Language，点击，选择locale属性为"zh-CN"
>    3. 重启VS Code 新的环境已经是安装好的中文环境了

> 3. 安装常见的VS Code插件提高开发效率
>    1. Vetur，Vue多功能集成插件，包括：语法高亮，智能提示，emmet，错误提示，格式化，自动补全，debugger。vscode官方钦定Vue插件，Vue开发者必备。![img](https://images2018.cnblogs.com/blog/1309897/201803/1309897-20180318233925285-1751693960.png)
>    2. Beautify 格式化代码![img](https://images2018.cnblogs.com/blog/1309897/201803/1309897-20180318230807375-510987879.png)
>    3. HTML Snippets，智能提示HTML标签，以及标签含义![img](https://images2018.cnblogs.com/blog/1309897/201803/1309897-20180318232224131-1393255925.png)
>    4. Auto Close Tag自动闭合HTML/XML标签
>       ![img](https://images2018.cnblogs.com/blog/1309897/201803/1309897-20180315233242378-425886131.png)
>    5. Auto Rename Tag 自动完成另一侧标签的同步修改![img](https://images2018.cnblogs.com/blog/1309897/201803/1309897-20180318230449283-2053190061.png)
>    6. Bracket Pair Colorizer 给括号加上不同的颜色，便于区分不同的区块，使用者可以定义不同括号类型和不同颜色![img](https://images2018.cnblogs.com/blog/1309897/201803/1309897-20180318231212426-92998243.png)
>    7. Debugger for Chrome 映射vscode上的断点到chrome上，方便调试![img](https://images2018.cnblogs.com/blog/1309897/201803/1309897-20180318231423931-1454749354.png)
>    8. ESLint，js语法纠错，可以自定义配置，不过配置较为复杂，建议使用网上一些广泛使用的eslint配置，日后我也会专门针对eslint配置写一篇文章。![img](https://images2018.cnblogs.com/blog/1309897/201803/1309897-20180318231700136-1143427708.png)
>    9.  GitLens 方便查看git日志，git重度使用者必备![img](https://images2018.cnblogs.com/blog/1309897/201803/1309897-20180318231927219-244121407.png)
>    10. HTML CSS Support，智能提示CSS类名以及id ![img](https://images2018.cnblogs.com/blog/1309897/201803/1309897-20180318232053284-106568123.png)
>    11. JavaScript(ES6) code snippets，ES6语法智能提示，以及快速输入，不仅仅支持.js，还支持.ts，.jsx，.tsx，.html，.vue，省去了配置其支持各种包含js代码文件的时间![img](https://images2018.cnblogs.com/blog/1309897/201803/1309897-20180318232417436-37242668.png)
>    12. jQuery Code Snippets，jQuery代码智能提示![img](https://images2018.cnblogs.com/blog/1309897/201803/1309897-20180318232725358-1845362787.png)
>    13. Markdown Preview Enhanced，实时预览markdown，markdown使用者必备![img](https://images2018.cnblogs.com/blog/1309897/201803/1309897-20180318232839825-1852656760.png)
>    14. markdownlint，markdown语法纠错![img](https://images2018.cnblogs.com/blog/1309897/201803/1309897-20180318232941526-1059482055.png)
>    15. Material Icon Theme，个人认为最好的vscode图标主题，支持更换不同色系的图标，值得点出的是，该插件更新极其频繁，基本和vscode更新频率保持一致![img](https://images2018.cnblogs.com/blog/1309897/201803/1309897-20180318233107474-2018331117.png)
>    16. open in browser，vscode不像IDE一样能够直接在浏览器中打开html，而该插件支持快捷键与鼠标右键快速在浏览器中打开html文件，支持自定义打开指定的浏览器，包括：Firefox，Chrome，Opera，IE以及Safari![img](https://images2018.cnblogs.com/blog/1309897/201803/1309897-20180318233312507-264268918.png)
>    17. Path Intellisense，自动提示文件路径，支持各种快速引入文件![img](https://images2018.cnblogs.com/blog/1309897/201803/1309897-20180318233536209-794358319.png)
>    18. React/Redux/react-router Snippets，React/Redux/react-router语法智能提示![img](https://images2018.cnblogs.com/blog/1309897/201803/1309897-20180318233828469-593046554.png)





### 三、vue-cli 3 脚手架安装和基础使用

> 1. vue-cli 脚手架安装，在任意的路径打开 cmd 窗口

```js
//安装vue-cli
npm install -g @vue/cli
//查看是否安装成功
vue -V
```

> 2. 使用 vue-cli 脚手架创建项目并运行

```js
//使用脚手架在指定的目录下，创建一个项目，项目名不要有中文，不要有大写字母，尽可能有意义
vue create 项目名
//进入项目文件夹
cd 项目名
//运行项目成功后默认为vue初始化的页面
npm run serve
```

> 3. vue-cli 脚手架创建项目结构简介![](.\images\6.png)





### 四、使用 vue-cli 全家桶构建SPA单页面应用

1. 单文件组件创建
2. 前端路由router引入
3. axios数据请求与渲染
4. 按需引入Element UI 仓库相关插件





###五、下载安装并使用 GitHub Desktop 托管代码

> 1. [Git 下载](https://git-scm.com/)![](.\images\3.png)

> 2. [Github Desktop下载](https://desktop.github.com/)![](.\images\4.png)

> 3. GitHub Desktop基础使用![](.\images\5.png)
>    1. 项目创建
>    2. 代码本地提交
>    3. 代码远程推送
>    4. 代码远程拉取
>    5. 提交记录操作
