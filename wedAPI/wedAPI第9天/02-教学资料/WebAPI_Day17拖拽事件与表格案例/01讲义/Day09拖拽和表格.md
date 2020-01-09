### 1.新事件H5 拖拽

#### 1.1 被拖拽的元素事件

> 关键字： drag - 拖拽的意思

+ ondragstart - 当元素 开始被拖拽时
+ ondrag - 当元素 正在被拖拽时 -- 一直执行
+ ondragend - 当元素 停止 被 拖拽时

#### 1.2 容器的事件

> 关键字：drag , drop 扔、投掷

+ ondragenter - 有拖拽的元素 进入容器
+ ondragleave - 有拖拽的元素 离开容器
+ ondragover - 有拖拽的元素 在容器上方
+ ondrop - 有拖拽的元素 在容器上方 松开鼠标

### 2.向浏览器拖入文件

> 浏览器有安全机制，不允许 JS 代码 直接 获取 客户机上的 关键信息：文件路径、文件内容......

+ 可以通过 URL.createObjectURL( file ) 创建一个 虚拟文件路径 供程序员使用

