function gundong(box1,box2,box,but1,but2,wid,ite){  
 /* 国家滚动*/  
  var num = $(box1).find(ite).length;
  var lll = 0;
  $(box).css("width",$(box).width()*2+"px")   
  $(box2).html($(box1).html());
  $(but2).click(function(){	
   		if(lll < num){
			lll = lll+1;   
			res_w = "-"+(lll*wid)+"px";
			$(box).animate({left:res_w},1000);
		}else{
			lll = 1;   
			res_w = "-"+(lll*wid)+"px";
			$(box).css({left:res_w},1000);	
		}
   });
   $(but1).click(function(){	
        if(lll >0){
			lll = lll-1;    
			res_w = "-"+(lll*wid)+"px";
			$(box).animate({left:res_w},1000);
		}else{
			lll = num-1;   
			res_w = "-"+(lll*wid)+"px";
			$(box).css({left:res_w},1000);	
		}
   });
}


$(function(){	 
    /* 切换标签*/  
		qiehuan("#qie_t01","#qie_c01",0);
		qiehuan("#qie_t02","#qie_c02",2);
		qiehuan("#qie_t03","#qie_c03",2);
		qiehuan("#qie_t04","#qie_c04",2);
		qiehuan("#qie_t05","#qie_c05",1);
		qiehuan("#lx01_t","#lx01_c",0);
		qiehuan("#lx02_t","#lx02_c",0);
		qiehuan("#lx03_t","#lx03_c",0);
		qiehuan("#lx04_t","#lx04_c",0);
		qiehuan("#lx05_t","#lx05_c",0);
		qiehuan("#lx06_t","#lx06_c",0);
		qiehuan("#lxyk_tit","#lxyk_cont",0);
		qiehuan("#cont_qie1","#cont_c1",0);
		qiehuan("#zyzt_tit","#zyzt_cont",0);
		qiehuan("#no_tit","#no_cont",0);
		
		qiehuan("#gj_ntit1","#gj_ncont1",0);
		qiehuan("#gj_ntit2","#gj_ncont2",0);
		qiehuan("#gj_ntit3","#gj_ncont3",0);
		qiehuan("#gj_ntit4","#gj_ncont4",0);
		
		qiehuan("#xm_tit","#xm_cont",0);
		qiehuan("#ks_tit","#ks_cont",0);
		
		
		
		
		
		
		gundong("#jc01","#jc02","#jczt_w",".jt_l",".jt_r",180,"li");
	
 });

//切换函数
 function qiehuan(span_c,cont_c,c_num) {
		$(span_c).find("span").removeClass();
		$(span_c).find("span").eq(c_num).addClass("ed");
		$(cont_c).find("ul").hide();
		$(cont_c).find("ul").eq(c_num).show();
	 	$(span_c).find("span").mouseover(function(){	
			 var index = $(span_c).find("span").index(this);
			 $(span_c).find("span").removeClass();
			 $(this).addClass("ed");
			 $(cont_c).find("ul").hide();
			 $(cont_c).find("ul").eq(index).show();
		});
 }
 //加入收藏
 function AddFavorite(sURL, sTitle) {
        sURL = encodeURI(sURL);
        try{ 
            window.external.addFavorite(sURL, sTitle); 
        }catch(e) { 
            try{ 
                window.sidebar.addPanel(sTitle, sURL, ""); 
            }catch (e) { 
                alert("请使用Ctrl+D进行添加,或手动在浏览器里进行设置.");
            } 
        }
 }
    //设为首页
function SetHome(url){
        if (document.all) {
            document.body.style.behavior='url(#default#homepage)';
               document.body.setHomePage(url);
        }else{
            alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");
        }
}