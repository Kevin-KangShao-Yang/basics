(function ($) {
     /*1. tab 切换*/
     /*2. 点击页签 内容对应改变 */
     /*3. 确定参数 找到页签  页签的选中类  找到内容  内容显示对应的类  */
     /*4. options = {key:value} 进行传参*/
     /**
      * @param options.tabHead 页签的选择器
      * @param options.tabHeadClass 页签的选中类名
      * @param options.tabBody 内容的选择器
      * @param options.tabBodyClass 内容的选中类名
      * */
     $.fn.tabs = function (options) {
         /* 谁调用指向谁 而且jquery对象*/
         /* 确定初始化的时候  需要找到父容器来调用插件方法 */
         var $tab = this;
         /*获取页签*/
         var $tabHead = $tab.find(options.tabHead);
         var $tabBody = $tab.find(options.tabBody);
         $tabHead.on('click',function () {
             /*1.改变自己*/
             if($(this).hasClass(options.tabHeadClass)) return false;
             $(this).addClass(options.tabHeadClass).siblings().removeClass(options.tabHeadClass);
             /*2.改变内容  根据索引*/
             var index = $(this).index();
             $tabBody.eq(index).addClass(options.tabBodyClass).siblings().removeClass(options.tabBodyClass);
         })
     }
})(jQuery);