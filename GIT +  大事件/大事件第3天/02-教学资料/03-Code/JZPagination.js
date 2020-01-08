//生成页码条方法（方法对象 , 页码条容器 ， 当前页码 ， 总页数 ， 页码组容量 ， 总行数）
// function makePageBar(turnPageFunc, pageContainer, pgIndex, pgCount, gpSize, roCount) {

//生成页码条方法（方法对象 , 页码条容器 ， 当前页码 ， 页容量 ， 页码组容量 ， 总行数）
function makePageBar(turnPageFunc, pageContainer, pgIndex, pgSize, gpSize, roCount) {
    //计算总页数（总行数 / 页容量）
    var pgCount = Math.ceil(roCount / pgSize);
    var groupFirstPageIndex = 0;  //当前页码组的第一个页码
    var groupCount = 0; //页码组个数
    if (typeof pageContainer == "string")
        pageContainer = document.getElementById(pageContainer);

    pageContainer.innerHTML = "";
    //获得当前页码组 的 第一个页码 ，为了 在点击 NextGroup 时
    //这样：1.加上 3 就可以获得 【下一个页码组】的 第一页
    //            2.减去1 就可以获得 【上一个页码组】的最后一页
    groupFirstPageIndex = (Math.floor(((pgIndex - 1) / gpSize)) * gpSize) + 1;
    //获得页码组总个数
    groupCount = Math.ceil(pgCount / gpSize);
    //生成统计数据
    pageContainer.innerHTML = "页码：" + pgIndex + "/" + pgCount + " │ 共" + roCount + "条";

    //生成 上一个页码组 按钮
    var pagePrevGroup = document.createElement("a");
    pagePrevGroup.href = "javascript:void(0)";
    if (groupFirstPageIndex > 1) {
        pagePrevGroup.onclick = function () {
            pgIndex = groupFirstPageIndex - 1;
            turnPageFunc(groupFirstPageIndex - 1);
        };
    }
    pagePrevGroup.innerHTML = "PrevGroup";
    pageContainer.appendChild(pagePrevGroup);

    //生成 上一页 按钮
    var pagePrev = document.createElement("a");
    pagePrev.href = "javascript:void(0)";
    pagePrev.onclick = function () {
        if (pgIndex > 1) {
            pgIndex--;
            turnPageFunc(pgIndex);
        } else {
            alert("已经是第一页咯~~！");
        }
    };
    pagePrev.innerHTML = "Prev";
    pageContainer.appendChild(pagePrev);

    //按照 页码组容量 和当前页码组 来生成 页码
    var tempI = 0;
    tempI = groupFirstPageIndex;//此时获得的是当前页码组的第一页
    do {
        //页码按钮
        var pageA;
        if (tempI == pgIndex) {//如果 当前生成页码 和 当前访问的页码 相等，则生成 文本，而不是超链接
            //   pageA = document.createTextNode(tempI);
            pageA = document.createElement("a");
            pageA.className = 'active';
            pageA.href = "javascript:void(0)";
            pageA.innerHTML = tempI;
        } else {//否则 生成超链接页码按钮
            pageA = document.createElement("a");
            pageA.href = "javascript:void(0)";
            pageA.setAttribute("pi", tempI);
            pageA.onclick = function () { turnPageFunc(this.getAttribute("pi")) };
            pageA.innerHTML = tempI;
        }
        pageContainer.appendChild(pageA);
        tempI++;
    } while (tempI < groupFirstPageIndex + gpSize && tempI <= pgCount);//1.不能超过当前页码组最后一个下标 2.不能超过总页数

    //生成下一页
    var pageNext = document.createElement("a");
    pageNext.href = "javascript:void(0)";
    pageNext.onclick = function () {
        //判断 当前页码 是否小于 总页数
        if (pgIndex < pgCount) {
            pgIndex++;
            turnPageFunc(pgIndex);
        } else {
            alert("已经是最后一页咯~~！");
        }
    };
    pageNext.innerHTML = "Next";
    pageContainer.appendChild(pageNext);

    //生成 NextGroup
    var pageNextGroup = document.createElement("a");
    pageNextGroup.href = "javascript:void(0)";
    if (groupFirstPageIndex + gpSize <= pgCount) {
        pageNextGroup.onclick = function () {
            pgIndex = groupFirstPageIndex + gpSize;
            turnPageFunc(groupFirstPageIndex + gpSize);
        };
    }
    pageNextGroup.innerHTML = "NextGroup";
    pageContainer.appendChild(pageNextGroup);

    var sel = document.createElement("select");
    sel.onchange = function () {
        var pi = this.value;
        turnPageFunc(pi);
    }
    for (var i = 0; i < pgCount; i++) {
        var opt = new Option("第" + (i + 1) + "页", i + 1);
        if (i == (pgIndex - 1))
            opt.selected = true;
        sel.options.add(opt);
    }
    pageContainer.appendChild(sel);
};