
/***
 * 根据id获取页面元素
 * @param string  id id名
 * @returns {Element} 返回的元素
 */
function id(id){
  return document.getElementById(id);
}


/**
 * 获取元素的文本
 * @param ele 要获取文本的那个元素
 * @returns {*} 返回的文本值
 */
function  getText(ele){
  //能力检测，判断执行当前这个代码的浏览器是否能使用textContent
  if(typeof ele.textContent == "string"){
    return ele.textContent;
  }else {
    //如果不支持textContent，就是ie8及他之前的浏览器，那肯定是支持innerText。
    return ele.innerText;
  }
}



/**
 * 封装一个函数，用来设置元素的文本
 * @param ele 就是要设置文本的元素
 * @param text 就是要设置的文本
 */
function setText(ele,text){
  //能力检测
  if(typeof ele.textContent == "string"){
    ele.textContent = text;
  }else {
    ele.innerText = text;
  }
}



/**
 * 获取下一个元素节点，
 * @param ele 元素
 * @returns {*} 返回值， 元素的下一个元素节点
 */
function getNextElement(ele){
  //能力检测-去判断执行当前这个代码的浏览器是否支持这个东西
  if(ele.nextElementSibling){
    return ele.nextElementSibling;
  }else{
    //如果不支持nextElementSibling，那就是ie8及以前的浏览器。
    var node = ele.nextSibling;
    while(node.nodeType != 1){
      node = node.nextSibling;
    }
    return node;
  }
}

//3.要获取上一个元素节点， 做兼容
function getPreviousElement(ele){
  //能力检测
  if(ele.previousElementSibling){
    return ele.previousElementSibling;
  }else {
    //ie8及以前不支持previousElementSibling。 支持previousSibling
    var node = ele.previousSibling;
    while(node.nodeType != 1){
      node = node.previousSibling;
    }
    return node;
  }
}


//3.获取元素的第一个子元素节点 ,  做兼容处理
function getFirstElementChild(ele){
  //能力检测
  if(ele.firstElementChild){
    return ele.firstElementChild;
  }else {
    //到这里了就说明是ie8及以前的浏览器，不支持firstElementChild，但是支持firstChild。
    var node = ele.firstChild;
    while(node.nodeType != 1){
      node = node.nextSibling;
    }
    return node;
  }
}

//3.获取最后一个子元素节点  兼容处理
function getLastElementChild(ele){
  //能力检测
  if(ele.lastElementChild){
    return ele.lastElementChild;
  }else {
    //ie8及以前的浏览器不支持lastElementChild，但是他支持lastChild
    var node = ele.lastChild;
    while(node.nodeType != 1){
      node = node.previousSibling;
    }
    return node;
  }
}