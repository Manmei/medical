$(document).ready(function(){
	$(".return_top").click(function(){
		$("html,body").animate({"scrollTop":0},1000);
	});
	$(window).scroll(function(){
		var Sctop = $(window).scrollTop();
		Sctop>600?$(".rr_nav").stop().animate({"height":271},300) && $(".return_top").show():$(".rr_nav").stop().animate({"height":0},300)&&$(".return_top").hide();
	});
	function toDou(n){
		if(n<10){
		return '0'+n;
		}else{
			return ''+n;
			}
	}
})