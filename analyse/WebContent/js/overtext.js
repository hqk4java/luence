(function($) {
    $.fn.overTexts = function(options) {
        var ooText, t1;
        var dft = {
            //初始化的参数配置
            texts: "展开和收缩的类型， 0 不显示展开和收缩，仅为省略号 || 1 显示展开，不显示收缩 ||2 显示展开和收缩",
            textLength: "20",
            overText: "展开",
            openText: "收起",
            ooType: "2" //展开和收缩的类型， 0 不显示展开和收缩，仅为省略号 || 1 显示展开，不显示收缩 ||2 显示展开和收缩 || 3显示省略号
        }
        var opt = $.extend(dft, options);
        ooText = opt.texts; //临时装载 数据 用于填充到data-text内的
        if (options.ooType == '0') {
            $(this).html("<div class='moreText' data-text=" + opt.texts + ">" + opt.texts + "</div>");
        }
        if (options.ooType == '1') {
            ooText = opt.texts;
            if (opt.texts.length > opt.textLength) {
                t1 = opt.texts.substring(0, opt.textLength) + "<a class='moreoh'   >" + opt.overText + "</a>";
            } else {
                t1 = opt.texts;
            }
            $(this).html("<div class='moreText' data-text=" + ooText + ">" + t1 + "</div>");
        }
        if (options.ooType == '2') {
            if (opt.texts.length > opt.textLength) {
                t1 = opt.texts.substring(0, opt.textLength) + "<a class='moreoh' >" + opt.overText + "</a>";
            } else {
                t1 = opt.texts;
            }

        }
        if (options.ooType == '3') {
            if (opt.texts.length > opt.textLength) {
                t1 = opt.texts.substring(0, opt.textLength) + "...";
            } else {
                t1 = opt.texts;
            }

        }
        //无论何种结果，均执行此
        $(this).html("<div class='moreText' data-text=" + ooText + ">" + t1 + "</div>");
        //此处判断 就是 已经有展开或者收起了
        if ($(this).find("a").hasClass("moreoh")) {
            //事件委托，让他可以执行
            $(".moreText").on("click", "a.moreoh", function() { //更多或者收起的点击事件
                var moreoh = $(this).find("a.moreoh"); //我是更多或者收起的dom
                if (moreoh.context.innerText == opt.overText) { //如果我此时是展开
                    if (opt.ooType == 2) {
                        t1 = opt.texts + "<a class='moreoh' >" + opt.openText + "</a>";
                        moreoh.context.innerText = opt.openText;
                        $(this).parents(".moreText").html(t1);
                    } else {
                        t1 = opt.texts;
                        $(this).parents(".moreText").html(t1);
                    }

                }
                if (moreoh.context.innerText == opt.openText) { //如果我此时是收起
                    t1 = opt.texts.substring(0, opt.textLength) + "<a class='moreoh'    >" + opt.overText + "</a>";
                    moreoh.context.innerText = opt.overText;
                    $(this).parents(".moreText").html(t1);
                }
            });
        }

    }
})(jQuery);