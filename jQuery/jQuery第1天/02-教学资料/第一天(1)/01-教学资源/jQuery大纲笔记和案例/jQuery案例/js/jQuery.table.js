
(function($) {
  // 内部的变量，外部无法访问，防止变量名冲突
  var a = 0;
  // 给$增加了一个实例方法
  $.fn.table = function (header, data) {
    var array = [];
    array.push('<table>');
    array.push('<tr>');

    // 生成表头
    $.each(header, function () {
      array.push('<th>' + this + '</th>');
    })
    array.push('</tr>');


    // 生成数据行
    $.each(data, function (index) {
      // this是当前遍历到的数组中的每一个对象
      // 拼数据行
      array.push('<tr>');
      array.push('<td>' + (index + 1) + '</td>');

      // 遍历对象，拼表格
      for (var key in this) {
        array.push('<td>' + this[key] + '</td>');
      }

      array.push('</tr>');
    })
    array.push('</table>');

    this.append(array.join(''));
  }

}(window.jQuery))

