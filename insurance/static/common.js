/**
 * Created by qqss on 2017/6/27.
 */
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=640){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
$(function () {
    //弹窗
    $('#app_list li:not(:last)').on('click',function () {
        var title =['仅限车险','仅限医疗理赔','不限险种','仅限车险','支持车险及寿险'];
        var img_url = ['pop_01','pop_02','pop_03','pop_04','pop_05'];
        var index = $(this).index();
        $('#popup .child p').text(title[index]);
        $("#i_type").attr("src","../static/img/"+img_url[index]+".jpg");
        $('#popup').fadeIn(1000);
    });
    $('#pop_close').on('click',function () {
        $('#popup').fadeOut();
    })
    //切换
    $('.m-container .nav li').on('click',function () {
        var index = $(this).index();
        var width = $(this).width()+ 32;
        $(this).addClass('active').siblings().removeClass('active');
        $('.m-container .nav p').stop(false,true).animate({'left':index*width +'px'},300)
        $('.m-container .content .con_list').eq(index).fadeIn(200).siblings().hide();
    })
});