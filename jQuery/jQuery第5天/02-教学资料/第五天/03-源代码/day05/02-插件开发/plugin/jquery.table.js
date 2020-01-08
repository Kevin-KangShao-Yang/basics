(function ($, window) {
    /*1.防止变量污染*/
    /*2.把全局变量当作局部变量*/
    $.fn.table = function (th, tb) {
        /*1.生成表格的对象*/
        var $box = this;

        var htmlTable = '<table>';


        /*2.表格需要 表头*/
        htmlTable += '<thead><tr>';
        $.each(th, function (i, item) {
            htmlTable += '<th>' + item + '</th>';
        });
        htmlTable += '</tr></thead>';

        /*3.表格需要 表体*/
        htmlTable += '<tbody>';

        $.each(tb, function (i, item) {
            htmlTable += '<tr>';
            /*item 数组*/
            $.each(item, function (i, item) {
                htmlTable += '<td>' + item + '</td>';
            });
            htmlTable += '</tr>';
        })

        htmlTable += '</tbody>';

        htmlTable += '</table>';

        /*追加到元素内*/
        $box.html(htmlTable);
    }
})(jQuery, window);
