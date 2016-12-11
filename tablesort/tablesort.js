(function ($) {

    var columns = [];

    $.fn.tablesort = function (options) {
        var settings = $.extend({
            callbacks: options.callbacks
        }, options);

        var sort = function(col) {
            var column = columns[col.index];

            $.each(columns, function (index, value) {
                value.icon.removeClass("down up");
            });

            if (!column.order || column.order === "desc") {
                column.order = "asc";
                column.icon.addClass("up");
            } else {
                column.order = "desc";
                column.icon.addClass("down");
            }

            var callback = settings.callbacks[column.sort];

            if (callback) {
                callback(column.order === "asc" ? true : false);
            }
        };

        $(this).find("thead > tr > th").each(function (index, value) {
            var header = $(value),
                sortAttr = header.data("sort"),
                orderAttr = header.data("order");

            if (sort) {
                var icon = $("<i class='caret icon " + (orderAttr ? (orderAttr === "desc" ? "down" : "up") : "") + "'></i>"),
                    column  = {
                        index: index,
                        icon: icon,
                        sort: sortAttr,
                        order: orderAttr
                    };

                columns.push(column);

                header.find("a").on("click", function () {
                    sort(column);
                }).append(icon);
            }
        });
    };

})(jQuery);