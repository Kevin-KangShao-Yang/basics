> 第02阶段.前端基本功.前端基础.WebAPI - from：JamesZou

+ 昨天问题：
  + btnDom.style.width  和 btnDom.width
  + 

## 今日学习目标





## 一.核心内容

### 1.DOM事件02

#### 1.1 焦点事件

+ onfocus 成为焦点 事件

  + 当 输入框 获取光标，此时可以输入文字

  ![1564153996692](assets/1564153996692.png)

+ onblur 失去焦点 事件

  + 当 输入框 光标消失，此时不可以输入文字

![1564154082692](assets/1564154082692.png)

+ 代码示例：

```js
var txtName = document.getElementById('txtName');
txtName.onfocus = function(){
    // 当 文本框 获取焦点时 触发执行
}

txtName.onblur = function(){
    // 当 文本框 失去焦点时 触发执行
}
```

#### 1.2 鼠标移入移出事件

+ onmouseover 鼠标移入事件
  + 当鼠标 移入目标盒子 边界时 
+ onmouseout  鼠标移出事件
  + 当鼠标 移出目标盒子 边界时

### 2.innerText 和 innerHTML

#### 2.1 innerText

+ 获取：元素的文本 （包含子元素的文本）
+ 设置：无法解析字符串中的标签，会把所有的内容都当成文本

#### 2.2 innerHTML

+ 获取：元素的内容 （包含文本和标签）
+ 设置：可以解析字符串中的标签

