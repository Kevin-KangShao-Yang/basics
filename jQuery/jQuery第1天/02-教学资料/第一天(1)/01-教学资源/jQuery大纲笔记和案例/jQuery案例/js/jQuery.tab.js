(function ($) {
  // {tabMenu: '#aa'}
  $.tab = function (options) {
    // 默认参数
    var defaults = {
      tabMenu: '#tab',
      activeClass: 'active',
      tabMain: '#tab-main',
      tabMainSub: '.main',
      selectedClass: 'selected'
    }
    // 把options中的属性，把对应属性的值赋给defaults对应的属性
    // defaults.tabMenu = options.tabMenu || defaults.tabMenu;
    // for(var key in options) {
    //   defaults[key] = options[key];
    // }
    $.extend(defaults, options);



    $(defaults.tabMenu).on('click', 'li', function () {
      $(this)
        .addClass(defaults.activeClass)
        .siblings()
        .removeClass(defaults.activeClass);

      //
      var index = $(this).index();
      //
      $(defaults.tabMain + ' ' + defaults.tabMainSub)
        .eq(index)
        .addClass(defaults.selectedClass)
        .siblings()
        .removeClass(defaults.selectedClass);
    })
  }
}(window.jQuery))