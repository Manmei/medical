(function(){
	String.prototype.replaceAll = function (AFindText,ARepText){
		raRegExp = new RegExp(AFindText,"g");
		return this.replace(raRegExp,ARepText);
	};
	function replacelinkHtml(s){
		var reg = /(http:\/\/|https:\/\/|ftp:\/\/|www)((?:\&amp;|[\w\.\:\/=%_\-,~\?\&\*])*)/g;
	    s = s.replace(reg, function($0, $1, $2) {
	        $2 = $2.replace(/\&amp;/g, function(s) {
	            return '&';
	        });
	        var u = ($1 == 'www' ? 'http://www' : $1) + $2;
	        return '<a class="linkText" href="' + u + '" target="_blank">' + u + '</a>';
	    });
	    return s;
	}
	function replaceEmoticon(msg){
		var reg = /\[\d\d\]/g;
		return msg.replace(reg, function(a, b, c){
			return "<img src=\""+jesong.env.server.file+"/emoticon/"+a.substring(1, 3)+".png\"></img>";
		});
	}
	function replaceHtml(msg){
		var string = msg+"";
		string = string.replaceAll("&", "&amp;" );
		string = string.replaceAll("<", "&lt;" );
		string = string.replaceAll(">", "&gt;" );
		string = string.replaceAll("\r", "" );
		string = string.replaceAll("\n", " " );
		string = string.replaceAll("\"", "&quot;" );
		return string;
	}
	var JS = function(selector) { 
		if ( window == this ){return new JS(selector);};
		this.dom = document.getElementById(selector);
		return this;
	};
	JS.prototype = {
		exist : function(){
			if(this.dom){
				return true;
			}else{
				return false;
			}
		}, html : function(html){
			if(html){
				this.dom.innerHTML = html;
			}else{
				return this.dom.innerHTML;
			}
		}, bind : function(event, fn){
			if(this.dom){
				if(fn){
					if(this.dom.attachEvent){
						this.dom.attachEvent("on"+event, function(e){
							return fn.apply(Chat, [e]);
						});
					}else if(this.dom.addEventListener){
						this.dom.addEventListener(event, function(e){
							return fn.apply(Chat, [e]);
						});
					}
				}else{
					if(document.all){    
						this.dom.click();    
					}else{    
						var evt = document.createEvent("MouseEvents");    
						evt.initEvent(event, true, true);    
						this.dom.dispatchEvent(evt);    
					}    
				}
			}
			return this;
		}, unbind : function(event){
			if(this.dom){
				if(this.dom.attachEvent){
					this.dom.attachEvent("on"+event, null);
				}else if(this.dom.addEventListener){
					this.dom.addEventListener(event, null);
				}
			}
		}, click : function(fn){
			return this.bind("click", fn);
		}, focus : function(fn){
			if(fn){
				return this.bind("focus", fn);
			}else{
				this.dom.focus();
				return this;
			}
		}, hover : function(fn1, fn2){
			this.bind("mouseover", fn1);
			this.bind("mouseout", fn2);
			return this;
		}, blur : function(fn){
			if(fn){
				return this.bind("blur", fn);
			}else{
				this.dom.blur();
				return this;
			}
		}, keydown : function(fn){
			return this.bind("keydown", fn);
			/*this.dom.onkeydown = function(e){
				return fn.apply(Chat, [e]);
			};
			return this;*/
		}, hasClass : function (cls) { 
			if(this.dom){
				return this.dom.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')); 
			}else{
				return false;
			}
		}, addClass : function(cls) { 
			if(this.dom){
				if (!this.hasClass(cls)){
					this.dom.className += " "+cls; 
				}
				return this;
			}
		}, css : function(key, value){
			if(this.dom){
				this.dom.style[key] = value;
				return this;
			}
		}, removeClass : function(cls) { 
			if (this.hasClass(cls)) { 
				var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)'); 
				this.dom.className=this.dom.className.replace(reg,' '); 
			}
		}, scrollTop : function(top){
			if(top != undefined){
				this.dom.scrollTop = top;
			}else{
				return this.dom.scrollTop;
			}
		}, hide : function(){
			if(this.dom){
				this.dom.style.display="none";
			}
			return this;
		}, isHidden : function(){
			if(this.dom){
				return this.dom.style.display == "none";
			}
		}, show : function(){
			if(this.dom){
				this.dom.style.display="block";
			}
			return this;
		}, remove : function(){
			if(this.dom){
				this.dom.parentNode.removeChild(this.dom);
			}
		}, val : function(data){
			if(this.dom){
				if(data != undefined){
					this.dom.value = data;
				}else{
					return this.dom.value;
				}
			}
		}, attr : function(data){
			if(this.dom){
				var m = this.dom.attributes[data];
				if(m){
					return m.value;
				}
			}
		}, append : function(html){
			var div = document.createElement("div"); 
			div.innerHTML = html;
			this.dom.appendChild(div);
		}, empty : function(){
			this.dom.innerHTML = "";
			return this;
		},	ajax:function(url, data, func){	
			var parseData = function(data) {
				var ret = "";
				if(typeof data === "string") {
					ret = data;
				}
				else if(typeof data === "object") {
					for(var key in data) {
						ret += "&" + key + "=" + encodeURIComponent(data[key]);
					}
					ret = ret.substr(1);
				}
				ret += "&_t=" + new Date().getTime();
				return ret;
			};
			url = url + (url.indexOf("?") === -1 ? "?" : "&") + parseData(data);
			var callback = "jsonp_"+new Date().getTime()+"_"+Math.random().toString().substr(2);
			url = url + "&callback="+callback;
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = url;
			script.id = "id_" + callback;
			window[callback] = function(json) {
				window[callback] = undefined;
				var elem = document.getElementById("id_" + callback);
				var parent = elem.parentNode;
				if(parent && parent.nodeType != 11) {
					parent.removeChild(elem);
				}
				if(func){
					func.apply(this, [json]);
				}
				//func(json);
			};
			
			// 在head里面插入script元素
			var head = document.getElementsByTagName("head");
			if(head && head[0]) {
				head[0].appendChild(script);
			}
		}
	};
	JS.ajax = JS.prototype.ajax;
	JS.getCookie = function(name){ 
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		arr=document.cookie.match(reg);
		if(arr){
			return unescape(arr[2]);
		}else{
			return null;
		}
	};
	JS.setCookie = function(name,value,t){
		if(typeof t =='undefined' ||t==null) t =60*30*24*60*60*1000;  
		var exp  = new Date(); 
		exp.setTime(exp.getTime() + t); 
		document.cookie = name + "="+ escape (value)+ ";domain="+jesong.util.getCookieDomain()+ ";expires=" + exp.toGMTString()+";path=/";
	};
				
	var user_tpl =  "<div class=\"jesong_msg_user\">"+
						"<div class=\"jesong_time\">{nickName}&nbsp;&nbsp;{time}</div>"+
						"<div class=\"jesong_msg_text\">"+
							"{msg}"+
						"</div>"+
					"</div>";
	var system_tpl = "<div class=\"jesong_msg_system\">{msg}</div>"+
					 "</div>";
	var visitor_tpl =  "<div class=\"jesong_msg_visitor\">"+
						"<div class=\"jesong_time\">{time}</div>"+
						"<div class=\"jesong_msg_text\">"+
							"{msg}"+
						"</div>"+
					"</div>";
	var welcome_tpl = 	"<div class=\"jesong_msg_welcome\" style=\"border-left: "+((jesong.autochat.width - 100)/2)+"px solid #e0e0e0;border-right: "+((jesong.autochat.width - 100)/2)+"px solid #e0e0e0;\">{welcome}</div>" +
						"<div class=\"jesong_msg_welcome_text\">{msg}</div>";
	
	var phone_user_tpl = "<li>{msg}</li>";
	var tpl = function (s, obj, escape) {
        return s.replace(/\{([a-zA-z0-9]*)\}/ig, function ($1, $2) {
            var v = jsonValue(obj, $2);
            return v;
        });
    };
	var jsonValue = (function () {
        var existProp = function (obj, t) {
            return typeof obj[t] != 'undefined';
        };
        var ignoreCase = function (obj, t) {
            if (existProp(obj, t)) return obj[t];
            if (existProp(obj, t.toLowerCase())) return obj[t.toLowerCase()];
            return obj[t.toUpperCase()];
        };
        return function (obj, key, def) {
            var tokens = key.split(".");
            for (var i = 0; i < tokens.length; i++) {
                var t = tokens[i];
                obj = ignoreCase(obj, t);
                if (obj == undefined) break;
            }
            return obj == undefined ? def : obj;
        };
    })();
	
	var JSLang={
			en:{
				welcome : "Welcome",
				transchatTo : "Transfering the dialogue to ",
				transchatSuccess : "Transfering the dialogue successfully",
				closeChatConfirm : " Confirm to fininsh the dialogue?",
				opinionText : "Please rate our service, maximum 5 points",
				opinionLevel5 : "5&nbsp;",
				opinionLevel4 : "4&nbsp;",
				opinionLevel3 : "3&nbsp;",
				opinionLevel2 : "2&nbsp;",
				opinionLevel1 : "1&nbsp;",
				chatOpinioned : "You have rate this service, repeated ratings are not available.",
				chatOpinionedSuccess : "Thanks for your rating, if has the deficiency, we will try our best to improve it.",
				chatOpinionedDescription : "Please leave your valuable comments if has any deficiency. Thank you!",
				textareaDefault : "Please input the question you want to consult…",
				send : "Send",
				name : "Your name:",
				mobile : "Mobile phone:",
				telephone : "Landline telephone:",
				verifying : "Verifying code:",
				namePrompt : "Please input your title",
				contactsPrompt : "Please input your contact information",
				contentPrompt : "Please input the content of message",
				submit : "Submit",
				nameWarning : "Name can not be empty with no more than 20 characters",
				contractsWarning : "Please enter the correct contact information",
				contentWarning : "Please input the content of message",
				leaveMsgSuccess : "Your question has been submitted successfully, we will process it asap, please wait for our customer service reply.",
				uploadWarning : "Please select a file you want to upload!",
				screenWarning1 : "You haven’t set up the screenshot plug-in as detected, please ",
				screenWarning2 : "download",
				screenWarning3 : " the screenshot plug-in and set up now.",
				queuePrompt1 : "Sorry, the online customer service is busy now, still ",
				queuePrompt2 : " client waiting ahead of you.",
				newMessage : "You have a new message",
				sameChat : "A new dialogue is established and the current dialogue has finished",
				downloadFile1 : "The customer service representative has sent a file to you , please click to ",
				downloadFile2 : "download",
				opinion1 : "Please rate this service. ",
				opinion2 : "Rate",
				chatClosed : "Your connection with any customer service representative can not be made currently!"
			},
			sc:{
				welcome : "\u6b22\u8fce\u54a8\u8be2",
				transchatTo : "\u6b63\u5728\u8f6c\u79fb\u5bf9\u8bdd\u7ed9",
				transchatSuccess : "\u8f6c\u79fb\u5bf9\u8bdd\u6210\u529f",
				closeChatConfirm : "\u786e\u5b9a\u7ed3\u675f\u5f53\u524d\u5bf9\u8bdd\uff1f",
				opinionText : "\u8bf7\u5bf9\u6211\u4eec\u7684\u670d\u52a1\u8fdb\u884c\u8bc4\u4ef7",
				opinionLevel5 : "5\u5206&nbsp;\u975e\u5e38\u6ee1\u610f",
				opinionLevel4 : "4\u5206&nbsp;\u6ee1\u610f",
				opinionLevel3 : "3\u5206&nbsp;\u4e00\u822c\u6ee1\u610f",
				opinionLevel2 : "2\u5206&nbsp;\u4e0d\u6ee1\u610f",
				opinionLevel1 : "1\u5206&nbsp;\u975e\u5e38\u4e0d\u6ee1\u610f",
				chatOpinioned : "\u60a8\u5df2\u7ecf\u5bf9\u5ba2\u670d\u8fdb\u884c\u4e86\u8bc4\u4ef7,\u4e0d\u80fd\u518d\u8fdb\u884c\u8bc4\u4ef7",
				chatOpinionedSuccess : "\u611f\u8c22\u60a8\u5bf9\u672c\u6b21\u670d\u52a1\u505a\u51fa\u8bc4\u4ef7\uff0c\u5982\u6709\u4e0d\u8db3\uff0c\u6211\u4eec\u4f1a\u5c3d\u529b\u5b8c\u5584\u63d0\u9ad8\u3002",
				chatOpinionedDescription : "\u60A8\u8BA4\u4E3A\u6211\u4EEC\u8FD8\u6709\u54EA\u4E9B\u4E0D\u8DB3\uFF0C\u8BF7\u7559\u4E0B\u60A8\u7684\u5B9D\u8D35\u610F\u89C1\uFF0C\u8C22\u8C22\uFF01",
				textareaDefault : "\u8bf7\u8f93\u5165\u60a8\u8981\u54a8\u8be2\u7684\u5185\u5bb9...",
				send : "\u53d1\u9001",
				name : "\u60a8\u7684\u59d3\u540d\uff1a",
				mobile : "\u624b\u673a\uff1a",
				telephone : "\u56fa\u5b9a\u7535\u8bdd\uff1a",
				verifying : "\u9a8c\u8bc1\u7801\uff1a",
				namePrompt : "\u8bf7\u8f93\u5165\u60a8\u7684\u59d3\u540d",
				contactsPrompt : "\u8bf7\u8f93\u5165\u60a8\u7684\u624b\u673a\u53f7\u7801\u6216\u90ae\u4ef6\u5730\u5740",
				contentPrompt : "\u8bf7\u8f93\u5165\u60a8\u7684\u7559\u8a00\u5185\u5bb9",
				submit : "\u63d0\u4ea4",
				nameWarning : "\u59d3\u540d\u4e0d\u80fd\u4e3a\u7a7a\u4e14\u4e0d\u80fd\u8d85\u8fc720\u4e2a\u5b57\u7b26",
				contractsWarning : "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801\u6216\u5ea7\u673a\u7535\u8bdd, \u5750\u673a\u8bf7\u4f7f\u7528\u4ee5\u4e0b\u683c\u5f0f:\u533a\u53f7-\u5ea7\u673a\u53f7-\u5206\u673a\u53f7",
				contentWarning : "\u8bf7\u8f93\u5165\u7559\u8a00\u5185\u5bb9",
				leaveMsgSuccess : "\u60a8\u7684\u95ee\u9898\u5df2\u7ecf\u6210\u529f\u63d0\u4ea4\uff0c \u6211\u4eec\u5c06\u5c3d\u5feb\u5904\u7406\u5b8c\u6bd5\uff0c\u8bf7\u60a8\u7b49\u5019\u5ba2\u670d\u7684\u6d88\u606f\u901a\u77e5\u3002",
				uploadWarning : "\u8bf7\u9009\u62e9\u4e00\u4e2a\u8981\u4e0a\u4f20\u7684\u6587\u4ef6\uff01",
				screenWarning1 : "\u7cfb\u7edf\u63d0\u793a\uff1a\u7cfb\u7edf\u68c0\u6d4b\u5230\u60a8\u5c1a\u672a\u5b89\u88c5\u622a\u5c4f\u63d2\u4ef6\uff0c \u8bf7\u5148",
				screenWarning2 : "\u4e0b\u8f7d",
				screenWarning3 : "\u622a\u5c4f\u63d2\u4ef6\u5e76\u5b89\u88c5",
				queuePrompt1 : "\u5bf9\u4e0d\u8d77\uff0c\u76ee\u524d\u5728\u7ebf\u5ba2\u670d\u7e41\u5fd9\uff0c\u60a8\u524d\u9762\u6709",
				queuePrompt2 : "\u4f4d\u5ba2\u6237\u7b49\u5f85\u3002",
				newMessage : "\u60a8\u6709\u65b0\u7684\u6d88\u606f",
				sameChat : "\u60a8\u4e0e\u5ba2\u670d\u53c8\u5efa\u7acb\u4e86\u4e00\u4e2a\u5bf9\u8bdd\uff0c \u5f53\u524d\u5bf9\u8bdd\u5df2\u7ed3\u675f",
				downloadFile1 : "\u5bf9\u65b9\u7ed9\u60a8\u4f20\u9001\u4e86\u4e00\u4e2a\u6587\u4ef6\uff0c\u8bf7\u70b9\u51fb",
				downloadFile2 : "\u4e0b\u8f7d",
				opinion1 : "\u5bf9\u65b9\u8bf7\u4f60\u5bf9\u6b64\u6b21\u670d\u52a1\u8fdb\u884c",
				opinion2 : "\u8bc4\u4ef7",
				chatClosed : "\u5bf9\u8bdd\u5df2\u7ecf\u7ed3\u675f\uff01"
			}
		};
	
	var Chat = {
		url : jesong.env.server.chat+"/msg.do",
		screenUrl : jesong.env.server.chat,
		companyId : jesong.env.compId,
		uiReady : false,
		sound : true, //开启声音
		requesting : false,//正在请求对话
		//groupId : 1,
		customerId : "",
		customerNick : "",
		jsConfig : jesong.env.confId,
		style : 4,
		visitorId : jesong.env.vId,
		visitorStaticId : jesong.env.uId,
		siteId : jesong.env.sid,
		chatId : null,
		receiveMessageInterval : null,
		screenActiveX : false,
		screenActiveXTime : null,
		//接收消息数
		receivemessageNum : 0,
		receiveSelfMessageNum : 0,
		lastGetMessageTime : null,
		lastGetFocusTime : null,
		leaveMsgFlag : false,
		transHidden : false,
		words : {
			disconnect : jesong.words.disconnect,
			welcome : jesong.words.welcome,
			greeting : jesong.words.greeting,
			transchat : jesong.words.transchat, 
			transchatTo : JSLang[jesong.language].transchatTo,//正在转移对话给
			transchatSuccess : JSLang[jesong.language].transchatSuccess//转移对话成功
		},
		
		/**
		 * 0未建立对话， 1排队， 2建立对话， 3对话结束
		 */
		status : 0, 
		isOpinioned : function(){
			return  "true" == JS.getCookie("jesong_chat_opinioned_"+this.chatId);
		},
		setOpinioned : function(){
			JS.setCookie("jesong_chat_opinioned_"+this.chatId, "true", 60*60*1000);
		},
		resetOpinioned : function(){
			//JS.setCookie("jesong_chat_opinioned_"+this.companyId, "");
		},
		ajax : function(cmd, data, fun){
			if(typeof data == 'object'){
				data.force = "1";
			}else if(typeof data == "string"){
				data+="&force=1";
			}
			JS.ajax(this.url+"?cmd="+cmd, data, function(resp){
				fun.apply(Chat, [resp]);
			});
		},
		setReady : function(){
			jesong.forceReady = true;
			jesong.initUI();
		},
		init : function(){
			if(jesong.autochat.bgcolor == ""){
				var st = parseInt(jesong.config.frameChatStyle);
				if(st < 11){
					st = 14;
				}
				var colorArray = ["#000000", "#db4a36", "#eed423", "#3097ef", "#85b92c", "#5669c4"];
				jesong.autochat.bgcolor = colorArray[st-11];
			}
			var style = "4";
			var logoStyle = "";
			if(jesong.config.forceChatLogo != ""){
				logoStyle = "background:url("+jesong.config.forceChatLogo+") no-repeat";
			}
			JS("jesong_chat_layout").html("<div id=\"jesong_mask\" style=\"width:"+jesong.autochat.width+"px;height:"+jesong.autochat.height+"px;\"></div><div class=\"jesong_chat_head\"><div id=\"jesong_chat_logo\" class=\"jesong_logo\" style=\""+logoStyle+"\"></div><div id=\"jesong_chat_close\"></div><div id=\"jesong_chat_min_btn\"></div><div id=\"jesong_chat_sound\"></div></div><div id=\"jesong_chat_body\" class=\"jesong_chat_body\"></div><div style=\"display:none;\"><iframe id=\"jesong_frame\" src = \"about:blank\"></iframe></div>");
			JS("jesong_chat_min").html("<div id=\"jesong_chat_min_logo\" class=\"jesong_logo\" style=\""+logoStyle+"\"></div><div id=\"jesong_chat_min_close\"></div><div id=\"jesong_chat_min_max\"></div><div id=\"jesong_chat_min_sound\"></div>");
			JS("jesong_chat_min").css("backgroundColor",  jesong.autochat.bgcolor)
								 .css("borderColor", jesong.autochat.bgcolor)
								 .css("width", jesong.autochat.width+"px");
			JS("jesong_chat_min").hide();
			
			JS("jesong_pop_msg").css("width", jesong.autochat.width+"px")
								.css("borderColor", jesong.autochat.bgcolor)
								.html("<div class=\"jesong_pop_msg_arrow\">" +
											"<em style=\"border-color:"+jesong.autochat.bgcolor+" transparent transparent transparent;\"></em>" +
											"<span style=\"border-color:#ffffff transparent transparent; top:-3px;\"></span>" +
									   "</div>" +
									   "<div class=\"jesong_pop_msg_context\" style=\"width:"+(jesong.autochat.width-36)+"px\">" +
											"<div id=\"jesong_pop_msg_user\"></div>" +
											"<div class=\"jesong_pop_msg_user_line\"></div>" +
											"<div id=\"jesong_pop_msg_text\"></div>" +
										"</div>");
			JS("jesong_pop_msg").hide();
			
			if(jesong.autochat.closeBtn == "0"){
				JS("jesong_chat_close").hide();
				JS("jesong_chat_min_close").hide();
			}
			
			this.initChat();
			JS("jesong_chat_min_btn").click(function(){
				JS("jesong_chat_layout").hide();
				//if(this.status == 2){
				if(!(jesong.jsType == 1 && jesong.env.isPhone)){
					JS("jesong_chat_min").show();
				}else{
					JS.setCookie("jesong_rec_"+this.chatId, this.receivemessageNum, 60*60*1000);
				}
				//}
			});
			var closeFun = function(){
				if(this.status == 2){
					if(window.confirm(JSLang[jesong.language].closeChatConfirm)){//确定结束当前对话？
						this.closeChat();
						this.addMessage(this.words.disconnect, "system");
						if(this.isOpinioned()){
							JS("jesong_chat_layout").hide();
							JS("jesong_chat_min_close").hide();
						}else{
							JS("jesong_chat_min_close").hide();
							JS("jesong_chat_layout").show();
							JS("jesong_file_layout").hide();
							JS("jesong_emoticon_layout").hide();
							if(!(jesong.autochat.tools && jesong.autochat.tools.opinion == "0") && jesong.callerOpinion == "1"){
								JS("jesong_mask").show();
								JS("jesong_opinion_layout").show().css("left", (jesong.autochat.width - 220)/2+"px").css("top", (jesong.autochat.height - 330)/2+"px");
								JS("jesong_opinion_reason_layout").css("left", (jesong.autochat.width - 220)/2+"px").css("top", (jesong.autochat.height - 330)/2+"px");
							}else{
								JS("jesong_chat_layout").hide();
								JS("jesong_chat_min_close").hide();
							}
						}
					}
				}else{
					JS("jesong_chat_layout").hide();
					JS("jesong_chat_min_close").hide();
					if(this.status == 1){
						this.exitQueue();
					}
				}
				JS("jesong_panel").show();
			};
			JS("jesong_chat_close").click(closeFun);
			JS("jesong_chat_min_close").click(closeFun);
			if(!(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0")){
				JS("jesong_chat_logo").bind("mousedown", function(e){
					var e = e || window.event;
			        var disX = e.clientX;
			        var disY = e.clientY;
			        var right = JS("jesong_chat_layout").dom.style.right.replace("px", "");
			        var bottom = JS("jesong_chat_layout").dom.style.bottom.replace("px", "");
			        var left = JS("jesong_chat_layout").dom.style.left.replace("px", "");
			        if(right == ""){right = 1;}
			        if(bottom == ""){bottom = 1;}
			        if(left == ""){left = 1;}
			        document.onmousemove = function (e){
			            var e = e || window.event;
			            var r = disX - e.clientX + parseInt(right);
			            var b = disY - e.clientY + parseInt(bottom);
			            var l = -disX + e.clientX + parseInt(left);
			            if(r<0){
			            	r = 0;
			            }else if(r > jesong.util.getBody().clientWidth - jesong.autochat.width){
			            	r = jesong.util.getBody().clientWidth - jesong.autochat.width;
			            }
			            if(b < 0){
			            	b = 0;
			            }else if(b > jesong.util.getBody().clientHeight - jesong.autochat.height){
			            	b = jesong.util.getBody().clientHeight - jesong.autochat.height;
			            }
			            if(l < 0){
			            	l = 0;
			            }else if(l > jesong.util.getBody().clientWidth - jesong.autochat.width){
			            	l = jesong.util.getBody().clientWidth - jesong.autochat.width;
			            }
			            
			            if(jesong.env.pos == "2" || jesong.env.pos == "3"){
			            	JS("jesong_chat_layout").css("left", l + "px");
			            }else{
			            	JS("jesong_chat_layout").css("right", r + "px");
			            }
			            JS("jesong_chat_layout").css("bottom", b + "px")
			            					    .css("_top", "expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-"+b+"-(parseInt(this.currentStyle.marginBottom,10)||0)))");
			            return false;
			        };
			        document.onmouseup = function (){
			            document.onmousemove = null;
			            document.onmouseup = null;
			        };
			        return false;
				});
			}
			
		}, initChat : function(){
			if(this.status != 2){
				//var cId = JS.getCookie("jesong_chat_"+this.companyId+"_id");
				//var cUserId = JS.getCookie("jesong_chat_user_"+this.companyId+"_id");
				if(jesong.env.min == 1 || (jesong.jsType == 1 && jesong.env.isPhone)){//|| !jesong.env.isPhone
					this.ajax("isChatExist", {c : this.companyId, vId : this.visitorId, uId : this.visitorStaticId}, function(resp){
						if(resp.exist){
							if(resp.visitorId){
								this.visitorId = resp.visitorId;
							}
							this.connect(resp.chatId, resp.customerId);
						}else{
							this.initWaitQueue();
						}
						this.setReady();
					});
				}else{
					this.initWaitQueue();
				}
			}else{
				if(jesong.autochat.connect == "1"){
					jesong.util.openChat({});
				}
			}
		}, initWaitQueue : function(){
			var waitGroupId = JS.getCookie("jesong_queue_"+this.companyId+"_id");
			if(waitGroupId && waitGroupId > 0){
				this.groupId = waitGroupId;
				this.waitQueue(true);
			}else{
				var flag = this.initAutochat();
				if(jesong.autochat.connect == "1"){
					jesong.util.openChat({});
				}
				this.setReady();
				/*if(!flag){
					JS("jesong_chat_layout").hide();
				}else{
					JS("jesong_chat_layout").show();
				}*/
			}
		}, initAutochat : function(){
			if(!jesong.env.isPhone && jesong.env.min && jesong.autochat && jesong.autochat.use == 1 && jesong.monitor.config && jesong.monitor.config.group){
				var now = new Date();var nh=now.getHours(),nm=now.getMinutes();		
				function tonum(s){ var s1=s.replace(/:/g,'');
					while(s1.charAt(0)=='0' && s1.length>1) s1=s1.substring(1); return parseInt(s1);}
				var h1=tonum(jesong.autochat.start);var h2=tonum(jesong.autochat.end);var n=tonum(nh+":"+((nm<10)?('0'+nm):nm));
				var _flag = false;
				if(h1 > h2 && ((h1 <= n && n < 2359) || (n > 0 && n <= h2))){
					_flag = true;
				}else if(h1<=n && h2>=n){
					_flag = true;
				}
				var times = JS.getCookie("jesong_autochat_"+this.companyId+"_time");
				if((times == null || jesong.autochat.times == -1 || parseInt(times) < jesong.autochat.times) && _flag){
					//jesong.autochat.show = true;
					this.initChatUI();
					JS("jesong_panel").hide();
					this.addMessage(this.words.welcome, "welcome");
					JS.setCookie("jesong_autochat_"+this.companyId+"_time", (times == null ? "1" : parseInt(times)+1), 12*60*60*1000);
					return true;
				}else{
					return false;
				}
			}else{
				return false;
			}
		}, setFocus : function(id){
			var rel = JS(id).attr("rel");
			JS(id).focus(function(){
				if(JS(id).attr("rel") == JS(id).val()){
					JS(id).val("");
				}
				JS(id).removeClass("jesong_text_blur");
			}).blur(function(){
				if(JS(id).val() == ""){
					var _rel = JS(id).attr("rel");
					JS(id).val(_rel);
					JS(id).addClass("jesong_text_blur");
				}
			});
			JS(id).val(rel);
			JS(id).addClass("jesong_text_blur");
		}, initChatUI : function(){
			if(this.uiReady){
				return;
			}
			//初始布局
			if(jesong.jsType == 1 && jesong.env.isPhone){
				JS("jesong_chat_layout").css("left", (jesong.util.getBody().clientWidth - 256)/2 + "px").css("top", (jesong.util.getBody().clientHeight-170)/2 + "px");
				JS("jesong_chat_layout").append("<div id=\"jesong_chat_phone_bottom\"></div>");
				JS("jesong_chat_body").empty().html(
					"<div id=\"jesong_chat_record\"></div>"
				);
				JS("jesong_chat_phone_bottom").click(function(){
					jesong.icon.openChat();
				});
			}else{
				JS("jesong_chat_layout").css("backgroundColor",  jesong.autochat.bgcolor)
										.css("width", jesong.autochat.width+"px")
										.css("height", jesong.autochat.height+"px").show();
				JS("jesong_chat_body").css("width", (jesong.autochat.width-4)+"px")
									   .css("height", (jesong.autochat.height-48)+"px");
				
				JS("jesong_chat_body").empty().html(
						"<div class=\"jesong_chat_top\" style=\"height:"+(jesong.autochat.height-46-2-111)+"px;\">"+
							"<div id=\"jesong_chat_record\"></div>"+
							"<div id=\"jesong_file_layout\">"+
								"<iframe id=\"jesong_file_frame\" border=\"0\" marginwidth=\"0\" marginheight=\"0\" scrolling=\"no\" style=\"width:100%;height:28px;border:0px;overflow:hidden;\"></iframe>"+
							"</div>"+
							"<div id=\"jesong_emoticon_layout\">"+
							"</div>"+
						"</div>"+
						"<div class=\"jesong_chat_tools\">"+
							"<div id=\"jesong_tools_emoticons\" class=\"emoticons\"></div>"+
							"<div id=\"jesong_tools_screen\" class=\"screen\"></div>"+
							"<div id=\"jesong_tools_opinion\" class=\"opinion\"></div>"+
							"<div id=\"jesong_tools_file\" class=\"file\"></div>"+
						"</div>"+
						"<div class=\"jesong_chat_bottom\">"+
							"<textarea id=\"jesong_message\" rel=\""+JSLang[jesong.language].textareaDefault+"\"></textarea>"+
							//style=\"width:"+(jesong.autochat.width-4-15-58-2)+"px\"
							"<div id=\"jesong_chat_send_btn\">"+JSLang[jesong.language].send+"</div>"+
						"</div>"+
						"<div id=\"jesong_sound\" style=\"display:none;\"></div>"+
						"<div id=\"jesong_opinion_layout\" style=\"display:none;\">"+
							"<div class=\"jesong_opinion_title\">"+JSLang[jesong.language].opinionText+"</div>"+
							"<div class=\"jesong_opinion_selects\">"+
								"<div id=\"jesong_op4\" class=\"jesong_opinion_select jesong_opinion_select_yes\"><div class=\"jesong_opinion_op4\">"+JSLang[jesong.language].opinionLevel5+"</div></div>"+
								"<div id=\"jesong_op3\" class=\"jesong_opinion_select\"><div class=\"jesong_opinion_op3\">"+JSLang[jesong.language].opinionLevel4+"</div></div>"+
								"<div id=\"jesong_op2\" class=\"jesong_opinion_select\"><div class=\"jesong_opinion_op2\">"+JSLang[jesong.language].opinionLevel3+"</div></div>"+
								"<div id=\"jesong_op1\" class=\"jesong_opinion_select\"><div class=\"jesong_opinion_op1\">"+JSLang[jesong.language].opinionLevel2+"</div></div>"+
								"<div id=\"jesong_op0\" class=\"jesong_opinion_select\"><div class=\"jesong_opinion_op0\">"+JSLang[jesong.language].opinionLevel1+"</div></div>"+
							"</div>"+
							"<div id=\"jesong_opinion_commit\">"+JSLang[jesong.language].submit+"</div>"+
						"</div>"+
						"<div id=\"jesong_opinion_reason_layout\" style=\"display:none;\">"+
							"<div class=\"jesong_opinion_title\">"+JSLang[jesong.language].opinionText+"</div>"+
							"<div class=\"jesong_opinion_reason\">"+
								"<textarea id=\"jesong_opinion_reason_text\" rel=\""+JSLang[jesong.language].chatOpinionedDescription+"\"></textarea>"+
							"</div>"+
							"<div class=\"jesong_opinion_reason_buttons\">"+
								"<div id=\"jesong_opinion_reason_commit\">"+JSLang[jesong.language].submit+"</div>"+
							"</div>"+
						"</div>"
					//"<div id=\"jesong_chat_layout\">"+
						/*"<div class=\"jesong_chat_top\">"+
							"<div id=\"jesong_chat_record\"></div>"+
							"<div id=\"jesong_opinion_layout\">"+
								"<div class=\"jsong_opinion_txt\">"+
									"<div>"+JSLang[jesong.language].opinionText+"</div>"+//请对我们的服务进行评价
									"<div id=\"jesong_opinion_commit\" class=\"jesong_opinion_commit_"+jesong.language+"\"></div>"+
								"</div>"+
								"<div class=\"jesong_opinion_selects\">"+
									"<div id=\"jesong_op4\" class=\"jesong_opinion_select jesong_opinion_select_yes\"><div class=\"jesong_opinion_op4\">"+JSLang[jesong.language].opinionLevel5+"</div></div>"+
									"<div id=\"jesong_op3\" class=\"jesong_opinion_select\"><div class=\"jesong_opinion_op3\">"+JSLang[jesong.language].opinionLevel4+"</div></div>"+
									"<div id=\"jesong_op2\" class=\"jesong_opinion_select\"><div class=\"jesong_opinion_op2\">"+JSLang[jesong.language].opinionLevel3+"</div></div>"+
									"<div id=\"jesong_op1\" class=\"jesong_opinion_select\"><div class=\"jesong_opinion_op1\">"+JSLang[jesong.language].opinionLevel2+"</div></div>"+
									"<div id=\"jesong_op0\" class=\"jesong_opinion_select\"><div class=\"jesong_opinion_op0\">"+JSLang[jesong.language].opinionLevel1+"</div></div>"+
								"</div>"+
							"</div>"+
							"<div id=\"jesong_file_layout\">"+
								"<iframe id=\"jesong_file_frame\" border=\"0\" marginwidth=\"0\" marginheight=\"0\" scrolling=\"no\" style=\"width:100%;height:28px;border:0px;overflow:hidden;\"></iframe>"+
							"</div>"+
						"</div>"+
						"<div class=\"jesong_chat_tools\">"+
							"<div id=\"jesong_tools_screen\"></div>"+
							"<div id=\"jesong_tools_opinion\"></div>"+
							"<div id=\"jesong_tools_file\"></div>"+
						"</div>"+
						"<div class=\"jesong_chat_bottom\">"+
							"<textarea id=\"jesong_message\" rel=\""+JSLang[jesong.language].textareaDefault+"\"></textarea>"+
							"<div id=\"jesong_chat_send_btn\"><div>"+JSLang[jesong.language].send+"</div></div>"+
						"</div>"*/
					//"</div>"
				);
				var emoticonHTML = "";
				for(var i=1; i<16; i++){
					var e = jesong.env.server.file+"/emoticon/"+(i>9 ? i : "0"+i)+".png";
					emoticonHTML += "<div id=\"jesong_emoticon_"+i+"\"><img src=\""+e+"\"></img></div>";
				}
				JS("jesong_emoticon_layout").html(emoticonHTML);
				var setEvent = function(id, i){
					JS(id).hover(function(){
						JS(id).addClass("hover");
					}, function(){
						JS(id).removeClass("hover");
					}).click(function(){
						var message = JS("jesong_message").val();
						var rel = JS("jesong_message").attr("rel");
						if(message == rel){
							message = "";
						}
						JS("jesong_message").val(message+i);
						//JS("jesong_emoticon_layout").hide();
						JS("jesong_message").focus();
						//this.setFocus("jesong_message");
					});
				};
				for(var i=1; i<16; i++){
					setEvent("jesong_emoticon_"+i, "["+(i>9?i:"0"+i)+"]");
				}
			}
			//初始对话界面UI事件
			this.initChatEvent();
			this.setFocus("jesong_message");
			this.setFocus("jesong_opinion_reason_text");
			this.uiReady = true;
			
			if(jesong.env.pos == "2"){//居中
				var left = -jesong.autochat.width/2 +jesong.util.getBody().clientWidth/2;
				var top = -jesong.autochat.height/2+ jesong.util.getBody().clientHeight/2;
				JS("jesong_chat_layout").css("left", left+"px").css("bottom", top+"px");
				JS("jesong_chat_min").css("left", left+"px");
				JS("jesong_pop_msg").css("left", left+"px");
			}else if(jesong.env.pos == "3"){//左下角
				JS("jesong_chat_layout").css("left", "1px");
				JS("jesong_chat_min").css("left", "1px");
				JS("jesong_pop_msg").css("left", "1px");
			}else{//右下角 
				
			}
			
			//this.addMessage(this.words.welcome, "user");
			//开始创建对话
			//this.connect();
		}/*, startCall : function(){
			JS("jesong_chat_body").empty().html(
				//"<div id=\"jesong_call_layout\">"+
					"<div class=\"jesong_call_center\">"+
						"<div class=\"jesong_call_field\">"+
							"<div class=\"jesong_call_head\">"+JSLang[jesong.language].name+"</div>"+
							"<div class=\"jesong_call_context\"><input type=\"text\" id=\"jesong_call_field_name\"/></div>"+
						"</div>"+
						"<div class=\"jesong_call_field\">"+
							"<div class=\"jesong_call_head jesong_select\">"+JSLang[jesong.language].mobile+"</div>"+
							"<div class=\"jesong_call_context\"><input type=\"text\" id=\"jesong_call_field_name\"/></div>"+
						"</div>"+
						"<div class=\"jesong_call_field\">"+
							"<div class=\"jesong_call_head jesong_unselect\">"+JSLang[jesong.language].telephone+"</div>"+
							"<div class=\"jesong_call_context\"><input type=\"text\" id=\"jesong_call_field_name\"/></div>"+
						"</div>"+
						"<div class=\"jesong_call_field\">"+
							"<div class=\"jesong_call_head\">"+JSLang[jesong.language].verifying+"</div>"+
							"<div class=\"jesong_call_context\"><input type=\"text\" id=\"jesong_call_field_name\"/></div>"+
						"</div>"+
						"<div class=\"jesong_call_field\">"+
							"<div class=\"jesong_call_head\">&nbsp;</div>"+
							"<div class=\"jesong_call_context\"><div id=\"jesong_commit\"></div></div>"+
						"</div>"+
					"</div>"
				//"</div>"
			);
		}*/, initLeaveMsgUI : function(){
			var _w = jesong.autochat.width - 90;
			var _h = jesong.autochat.height - 270;
			JS("jesong_chat_layout").css("backgroundColor",  jesong.autochat.bgcolor)
									.css("width", jesong.autochat.width+"px")
									.css("height", jesong.autochat.height+"px").show();
			JS("jesong_chat_body").css("width", (jesong.autochat.width-4)+"px")
								  .css("height", (jesong.autochat.height-48)+"px");
			JS("jesong_chat_body").empty().html(
					"<div class=\"jesong_call_center\">"+
						"<div class=\"jesong_call_field\">"+
							"<div class=\"jesong_call_head jesong_name_icon\"></div>"+//您的姓名：\u60a8\u7684\u59d3\u540d\uff1a
							"<div class=\"jesong_call_context\"><input type=\"text\" id=\"jesong_lm_name\" style=\"width:"+_w+"px;\" rel=\""+JSLang[jesong.language].namePrompt+"\"/></div>"+//请输入您的姓名
						"</div>"+
						"<div class=\"jesong_call_field\">"+
							"<div class=\"jesong_call_head jesong_tel_icon\"></div>"+//联系方式：\u8054\u7cfb\u65b9\u5f0f\uff1a
							"<div class=\"jesong_call_context\"><input type=\"text\" id=\"jesong_lm_contact\" style=\"width:"+_w+"px;\" rel=\""+JSLang[jesong.language].contactsPrompt+"\"/></div>"+//请输入您的手机号码或邮件地址
						"</div>"+
						"<div class=\"jesong_call_field\">"+
							"<div class=\"jesong_call_head jesong_content_icon\"></div>"+//留言内容：\u7559\u8a00\u5185\u5bb9\uff1a
							"<div class=\"jesong_call_context\"><textarea id=\"jesong_lm_content\" style=\"width:"+_w+"px;height:"+_h+"px;\" rel=\""+JSLang[jesong.language].contentPrompt+"\"></textarea></div>"+//请输入您的留言内容
						"</div>"+
						"<div class=\"jesong_call_field\" style=\"margin-top:15px;\">"+
							"<div class=\"jesong_call_head\" style=\"height:26px;\">&nbsp;</div>"+
							"<div class=\"jesong_call_context\"><div id=\"jesong_commit\">"+JSLang[jesong.language].submit+"</div></div>"+
						"</div>"+
					"</div>"
				);
			this.setFocus("jesong_lm_name");
			this.setFocus("jesong_lm_contact");
			this.setFocus("jesong_lm_content");
			JS("jesong_commit").hover(function(){
				JS("jesong_commit").addClass("hover");
			}, function(){
				JS("jesong_commit").removeClass("hover");
			}).click(function(){
				if(this.leaveMsgFlag == false){
					this.leaveMsgFlag = true;
					function _getValue(id){
						var value = JS(id).val();
						var rel = JS(id).attr("rel");
						if(value != rel){
							return value;
						}else{
							return "";
						}
					}
					var name = _getValue("jesong_lm_name");
					var contact = _getValue("jesong_lm_contact");
					var content = _getValue("jesong_lm_content");
					if(name =="" || name.length>20){
						alert(JSLang[jesong.language].nameWarning);//姓名不能为空且不能超过20个字符
						JS("jesong_lm_name").focus();
						this.leaveMsgFlag = false;
						return false;
					}
					var category = 0;
					var email = "";
					var phone = "";
					var isPhone = /^(13|14|15|17|18)\d{9}$/i.test(contact) || /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(contact);
					var isEmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(contact);
					if(isPhone){
						phone = contact;
					}else if(isEmail){
						category = 1;
						email = contact;
					}else{
						alert(JSLang[jesong.language].contractsWarning);//请输入正确的手机号码或邮件地址
						JS("jesong_lm_contact").focus();
						this.leaveMsgFlag = false;
						return false;
					}
					if(content == ""){
						alert(JSLang[jesong.language].contentWarning);//请输入留言内容
						JS("jesong_lm_content").focus();
						this.leaveMsgFlag = false;
						return false;
					}
					this.ajax("leaveWord", {
						companyId:this.companyId,
						groupId:this.groupId,
						phone:phone,
						category:category,
						name:name,
						email:email,
						subject:"",
						message:content,
						v:this.visitorId,
						u:this.visitorStaticId,
						sid:jesong.env.sid,
						promotionId : jesong.env.promotionId,
						chatUrl:window.location.href,
						ref:jesong.env.refer?jesong.env.refer:"",
						first:jesong.env.firstPage,
						sf:jesong.env.spreadFlag ? jesong.env.spreadFlag:""
					},function(resp){
						alert(JSLang[jesong.language].leaveMsgSuccess);//您的问题已经成功提交， 我们将尽快处理完毕，请您等候客服的消息通知。
						JS("jesong_chat_layout").hide();
						this.leaveMsgFlag = false;
					});
				}
			});
		},
		/**
		 * 初始对话界面UI事件
		 */
		initChatEvent : function(){
			var setHover = function(id){
				JS(id).hover(function(){
					JS(id).addClass("hover");
				}, function(){
					JS(id).removeClass("hover");
				});
			};
			setHover("jesong_tools_emoticons");
			setHover("jesong_tools_screen");
			setHover("jesong_tools_opinion");
			setHover("jesong_tools_file");
			setHover("jesong_chat_send_btn");
			var soundFlag = JS.getCookie("jesong_chat_sound");
			if(soundFlag == null || soundFlag == "-1"){
				this.sound = false;
			}
			if(this.sound){
				JS("jesong_chat_sound").removeClass("close");
				JS("jesong_chat_min_sound").removeClass("close");
			}else{
				JS("jesong_chat_sound").addClass("close");
				JS("jesong_chat_min_sound").addClass("close");
			}
			var setSound = function(){
				if(this.sound){
					this.sound = false;
					JS.setCookie("jesong_chat_sound", "-1");
					JS("jesong_chat_sound").addClass("close");
					JS("jesong_chat_min_sound").addClass("close");
				}else{
					this.sound = true;
					JS.setCookie("jesong_chat_sound", "1");
					JS("jesong_chat_sound").removeClass("close");
					JS("jesong_chat_min_sound").removeClass("close");
				}
			};
			JS("jesong_chat_sound").click(setSound);
			JS("jesong_chat_min_sound").click(setSound);
			var maxFun = function(){
				if(jesong.config.forceChatLogo != ""){
					JS("jesong_chat_min_logo").css("backgroundImage", "url('"+jesong.config.forceChatLogo+"')");
				}else{
					if(jesong.language == "en"){
						JS("jesong_chat_min_logo").css("backgroundImage", "url('"+jesong.env.server.file+"/images/auto/logo-en.png')");
					}else{
						JS("jesong_chat_min_logo").css("backgroundImage", "url('"+jesong.env.server.file+"/images/auto/logo-cn.png')");
					}
				}
				JS("jesong_chat_min_logo").empty().removeClass("jesong_message");
				JS("jesong_chat_min").hide();
				JS("jesong_chat_layout").show();
				JS("jesong_pop_msg").hide();
				JS("jesong_chat_record").scrollTop(JS("jesong_chat_record").scrollTop()+9999);
			};
			JS("jesong_pop_msg").click(maxFun);
			JS("jesong_chat_min_max").click(maxFun);
			JS("jesong_chat_send_btn").click(function(){
				Chat.sendMessage.apply(Chat, []);
			});
			JS("jesong_message").keydown(function(e){
				if(e.keyCode == 13){
					this.sendMessage();
					var event=arguments.callee.caller.arguments[0]||e;
                    if (event && event.preventDefault) {
                            event.preventDefault();
                    } else if (window.event) {
                            window.event.cancelBubble = true;
                    }
					return false;
				}else{
					this.getfocus();
				}
				return true;
			}).focus(function(e){
				JS("jesong_opinion_layout").hide();
				JS("jesong_opinion_reason_layout").hide();
				JS("jesong_file_layout").hide();
				JS("jesong_emoticon_layout").hide();
			});
			var choose = function(id){
				JS("jesong_op4").removeClass("jesong_opinion_select_yes");
				JS("jesong_op3").removeClass("jesong_opinion_select_yes");
				JS("jesong_op2").removeClass("jesong_opinion_select_yes");
				JS("jesong_op1").removeClass("jesong_opinion_select_yes");
				JS("jesong_op0").removeClass("jesong_opinion_select_yes");
				JS(id).addClass("jesong_opinion_select_yes");
			};
			JS("jesong_op4").click(function(){
				choose("jesong_op4");
			});
			JS("jesong_op3").click(function(){
				choose("jesong_op3");
			});
			JS("jesong_op2").click(function(){
				choose("jesong_op2");
			});
			JS("jesong_op1").click(function(){
				choose("jesong_op1");
			});
			JS("jesong_op0").click(function(){
				choose("jesong_op0");
			});
			if(jesong.autochat.tools && jesong.autochat.tools.opinion == "0"){
				JS("jesong_tools_opinion").hide();
			}else{
				JS("jesong_tools_opinion").click(function(){
					if(!this.isOpinioned() && this.chatId != null && this.chatId >0){
						if(JS("jesong_opinion_layout").isHidden()){
							JS("jesong_file_layout").hide();
							JS("jesong_emoticon_layout").hide();
							JS("jesong_mask").show();
							JS("jesong_opinion_layout").show().css("left", (jesong.autochat.width - 220)/2+"px").css("top", (jesong.autochat.height - 330)/2+"px");
							JS("jesong_opinion_reason_layout").css("left", (jesong.autochat.width - 220)/2+"px").css("top", (jesong.autochat.height - 330)/2+"px");
						}else{
							JS("jesong_opinion_layout").hide();
							JS("jesong_opinion_reason_layout").hide();
						}
					}else if(this.chatId != null && this.chatId >0 && this.isOpinioned()){
						alert(JSLang[jesong.language].chatOpinioned);
					}
				});
			}
			JS("jesong_opinion_layout").hide();
			JS("jesong_opinion_reason_layout").hide();
			if(jesong.autochat.tools && jesong.autochat.tools.emoticons == "0"){
				JS("jesong_tools_emoticons").hide();
			}else{
				JS("jesong_tools_emoticons").click(function(){
					if(JS("jesong_emoticon_layout").isHidden()){
						JS("jesong_opinion_layout").hide();
						JS("jesong_opinion_reason_layout").hide();
						JS("jesong_file_layout").hide();
						JS("jesong_emoticon_layout").show();
					}else{
						JS("jesong_emoticon_layout").hide();
					}
				});
			}
			if(jesong.autochat.tools && jesong.autochat.tools.file == "0"){
				JS("jesong_tools_file").hide();
			}else{
				JS("jesong_tools_file").click(function(){
					if(this.chatId != null && this.chatId >0){
						if(JS("jesong_file_layout").isHidden()){
							JS("jesong_opinion_layout").hide();
							JS("jesong_opinion_reason_layout").hide();
							JS("jesong_emoticon_layout").hide();
							JS("jesong_file_layout").show();
							document.getElementById("jesong_file_frame").src= jesong.env.server.chat + "file.jsp?chatId="+this.chatId+"&cId="+this.companyId+"&vId="+this.visitorId+"&lang="+jesong.language;
						}else{
							JS("jesong_file_layout").hide();
						}
					}
				});
			}
			
			JS("jesong_file_layout").hide();
			JS("jesong_emoticon_layout").hide();
			
			JS("jesong_file_btn").click(function(){
				if(this.chatId != null && this.chatId >0){
					var fileFullPath = JS("jesong_file_input").val();
				    if(fileFullPath==''){
				    	alert(JSLang[jesong.language].uploadWarning);//请选择一个要上传的文件！
				    	return false;
				    }
				    var fileType = fileFullPath.substring(fileFullPath.lastIndexOf('.'));
				    var action = jesong.env.server.chat +'/receive.jsp?fileType='+fileType+'&chatId='+this.chatId+'&cId='+this.companyId;
				    var uploadForm = document.getElementById("jesong_file_form");
				    uploadForm.action=action;
				    uploadForm.submit();
				}
			});
			
			JS("jesong_opinion_commit").click(function(){
				if(!this.isOpinioned() && this.chatId != null && this.chatId > 0){
					var opinion = 4;
					if(JS("jesong_op3").hasClass("jesong_opinion_select_yes")){
						opinion = 3;
					}else if(JS("jesong_op2").hasClass("jesong_opinion_select_yes")){
						opinion = 2;
					}else if(JS("jesong_op1").hasClass("jesong_opinion_select_yes")){
						opinion = 1;
					}else if(JS("jesong_op0").hasClass("jesong_opinion_select_yes")){
						opinion = -1;
					};
					if(opinion == 1 || opinion == -1){
						this.opinionValue = opinion;
						JS("jesong_opinion_layout").hide();
						JS("jesong_opinion_reason_layout").show();
					}else{
						this.commitOpinion(opinion, "");
					}
				}
			}).hover(function(){
				JS("jesong_opinion_commit").addClass("hover");
			}, function(){
				JS("jesong_opinion_commit").removeClass("hover");
			});
			
			JS("jesong_opinion_reason_commit").click(function(){
				if(this.opinionValue != undefined){
					var desp = JS("jesong_opinion_reason_text").val();
					var rel = JS("jesong_opinion_reason_text").attr("rel");
					if(desp == rel){
						desp = "";
					}
					this.commitOpinion(this.opinionValue, desp);
				}
			}).hover(function(){
				JS("jesong_opinion_reason_commit").addClass("hover");
			}, function(){
				JS("jesong_opinion_reason_commit").removeClass("hover");
			});
			
			if(jesong.autochat.tools && jesong.autochat.tools.screen == "0"){
				JS("jesong_tools_screen").hide();
			}else{
				JS("jesong_tools_screen").click(function(){
					if(this.status == 2){
						var url = "ScreenCat://" + this.screenUrl
							+"/screenUpload.jsp?c="+this.companyId+"&cId="+this.chatId+"&v="+this.visitorId+"&n="+this.customerId;
						document.getElementById("jesong_frame").src= url;
						if(this.screenActiveX == false && this.screenActiveXTime == null){
							this.screenActiveXTime = window.setTimeout(function(){
								Chat.screenActiveXTime = null;
								//var msg="系统提示：系统检测到您尚未安装截屏插件， 请先<a href=\""+Chat.screenUrl+"/jesong-screen-1.0.rar\" target=\"jesong_frame\">下载</a>截屏插件并安装";
								var msg=JSLang[jesong.language].screenWarning1+"<a href=\""+Chat.screenUrl+"/jesong-screen-1.1.rar\" target=\"jesong_frame\">"
									+JSLang[jesong.language].screenWarning2+"</a>"+JSLang[jesong.language].screenWarning3;
								Chat.addMessage.apply(Chat, [msg, "system"]);
							}, 15000);
						}
					}
				});
			}
		}, 
		
		commitOpinion : function(op, desp){
			var data = {
				cId:this.chatId, c:this.companyId, op:op,b_op:4, desp:desp, v:this.visitorId, u:this.visitorStaticId
			};
			this.ajax("opinion", data, function(resp){
				this.ajax(
					'addEvent', 
					{c: this.companyId, cId: this.chatId, v: this.visitorId, cusId: this.customerId, msg: "finn", type:"EVENT_OPINION"}, 
					function(){
						this.addMessage(JSLang[jesong.language].chatOpinionedSuccess, "system");
					}
				);
				this.setOpinioned();
				JS("jesong_opinion_layout").hide();
				JS("jesong_opinion_reason_layout").hide();
				JS("jesong_mask").hide();
			});
			if(this.status != 2){
				JS("jesong_chat_min").hide();
				JS("jesong_chat_layout").hide();
			}
		},
		
		openchat : function(params){
			if(this.requesting == false){
				this.requesting = true;
				
				if(typeof params == "object"){
					params["_CR"] = "1";
				}else if(typeof params == "string"){
					params += "&_CR=1";
				}
				
				this.ajax("chat", params, function(rs){
					this.groupId = rs.groupId;
					if(rs.type == "WAIT_QUEUE"){
						this.initChatUI();
						this.status = 1;
						JS.setCookie("jesong_queue_"+this.companyId+"_id", this.groupId, 60*10*1000);
						this.handlerWaitQueue(rs);
					}else if(rs.type == "CHATING"){
						//对话建立成功
						if(rs.visitorId){
							visitorId = rs.visitorId;
						}
						this.initChatUI();
						this.connectSuccess(rs);
					}else{
						//if(jesong.autochat && jesong.autochat.use == 1 && jesong.autochat.show)
						//不在线， 转留言
						this.initLeaveMsgUI();
						JS("jesong_lm_content").val(jesong.autochat.waitSendMsg);
						jesong.autochat.waitSendMsg = "";
						JS("jesong_lm_content").focus();
					}
					JS("jesong_chat_layout").show();
					this.requesting = false;
				});
			}
		},
		
		waitQueue : function(first){
			this.ajax("waitQueue", {
				c : this.companyId,
				v : this.visitorId,
				u : this.visitorStaticId,
				g : this.groupId
			}, function(rs){
				if(!jesong.forceReady){
					this.setReady();
				}
				this.handlerWaitQueue(rs, first);
			});
		},
		
		/**
		 * 处理排队
		 * @param rs
		 */
		handlerWaitQueue : function(rs, first){
			if(first && (rs.type == "CHATING" || rs.type == "WAIT_QUEUE")){
				this.initChatUI();
				JS("jesong_chat_layout").show();
			}
			if(rs.type == "CHATING"){
				//JS("jesong_chat_record").empty();
				this.connectSuccess(rs);
			}else if(rs.type == "WAIT_QUEUE"){
				this.status = 1;
				var i=rs.waitIndex;
				//JS("jesong_chat_record").empty();
				//对不起，目前在线客服繁忙，您前面有 位客户等待
				if(JS("jesong_wait_text").exist()){
					JS("jesong_wait_text").html(JSLang[jesong.language].queuePrompt1+'<font id="jesong_wait_num" color="red">'+ i + '</font>'+JSLang[jesong.language].queuePrompt2);
				}else{
					this.addMessage('<span id="jesong_wait_text">'+JSLang[jesong.language].queuePrompt1+'<font id="jesong_wait_num" color="red">'+ i + '</font>'+JSLang[jesong.language].queuePrompt2+'</span>', "system");
				}
				this.waitQueueTimeout = window.setTimeout(function(){
					if(Chat.status == 1){
						JS("jesong_chat_layout").show();
						Chat.waitQueue.apply(Chat, []);
					}else{
						JS("jesong_chat_layout").hide();
					}
				}, 3000);
			}else if(rs.type == "OFFLINE"){
				//此时退出排队或者建立了对话
				JS.setCookie("jesong_queue_"+this.companyId+"_id", "", -1);
			}
		},
		exitQueue : function(){
			this.status = 0;
			window.clearTimeout(this.waitQueueTimeout);
			JS.setCookie("jesong_queue_"+this.companyId+"_id", "",  -1);
			this.ajax("exitQueue", {
				c : this.companyId,
				v : this.visitorId,
				g : this.groupId
			}, function(rs){
			});
		},
		
		/**
		 * 开始创建对话
		 */
		connect : function(chatId, customerId){
			this.initChatUI();
			if(jesong.jsType != 1 || !jesong.env.isPhone){
				JS("jesong_chat_layout").show();
			}
			if(this.requesting == true){
				return;
			}
			this.requesting = true;
			JS("jesong_chat_record").empty();
			this.visitorId = jesong.env.vId;
			this.visitorStaticId = jesong.env.uId;
			var params = {
				chatUrl : window.location.href,
				c : this.companyId,
				v : this.visitorId,
				u : this.visitorStaticId,
				sid : this.siteId,
				cId : chatId,
				n : customerId,
				promotionId : jesong.env.promotionId,
				sf : jesong.env.spreadFlag,
				_CR: "1"
			};
			
			if(jesong.env.spreadFlag){
				params["sf"] = jesong.env.spreadFlag;
			}
			if(jesong.env.firstPage){
				params["first"] = jesong.env.firstPage;
			}else{
				params["first"] = window.location.href;
			}
			if(jesong.util.getCookie('JESONG_VC')){
				params["vc"] = jesong.util.getCookie("JESONG_VC");
			}
			
			if(jesong.env.refer && jesong.env.refer !=""){
				params["ref"] = jesong.env.refer;
			}else if(document.referrer){
				try{
					var refer = document.referrer;
					if(refer){
						var referDomain = jesong.util.getDomain(refer);
						var currDomain = window.location.host;
						if(referDomain && referDomain == currDomain){
							refer = "";
						}
					}
					if(refer != ""){
						params["ref"] = refer;
					}
				}catch(e){};
			}
			var ext;
			if(JS.getCookie("JESONG_EXT_DATA")){
				ext = JS.getCookie("JESONG_EXT_DATA");
			}
			if(typeof(JESONG_EXT_DATA) != "undefined"){
				ext = JESONG_EXT_DATA;
			}
			if(ext != null && ext != ""){
				params["ext"] = ext;
			}
			this.ajax("chat", params, function(rs){
				if(rs.type == "CHATING"){
					//对话建立成功
					this.connectSuccess(rs);
				}/*else{
					JS.setCookie("jesong_chat_"+this.companyId+"_id", "", -1);
					JS.setCookie("jesong_chat_user_"+this.companyId+"_id", "", -1);
				}*/
				this.requesting = false;
			});
		},
		/**
		 * 创建对话成功
		 */
		connectSuccess : function(rs){
			this.chatId = rs.chatId;
			if(rs.groupId){
				this.groupId = rs.groupId;
			}
			this.customerId = rs.userInfo.userId;
			this.customerNick = rs.userInfo.nickName;
			JS.setCookie("jesong_queue_"+this.companyId+"_id", "", -1);
			//发送对话接通语
			this.receivemessageNum = 0;
			this.receiveSelfMessageNum = 0;
			this.status = 2;
			if(rs.visitorId){
				this.visitorId = rs.visitorId;
			}
			//JS.setCookie("jesong_chat_"+this.companyId+"_id", this.chatId);
			//JS.setCookie("jesong_chat_user_"+this.companyId+"_id", this.customerId);
			this.resetOpinioned();
			this.startReceiveMessage();
			//JS("jesong_chat_record").append("<div style=\"width:100%;height:22px;line-height:22px;text-align:center;color:#aaaaaa;clear:both;\">2015-12-15 12:22:33</div>");
			JS("jesong_chat_record").empty();
			if(jesong.jsType != 1 || !jesong.env.isPhone){
				this.addMessage(this.words.welcome, "welcome");
			}
			if(jesong.autochat.waitSendMsg != ""){
				this.sendMessage(jesong.autochat.waitSendMsg);
				jesong.autochat.waitSendMsg="";
			}
			/*if(this.words.greeting != ""){
				this.addMessage(this.words.greeting, "user");
			}*/
		},
		/**
		 * 获取聊天窗口参数
		 */
		getWinChatParam : function(){
			if(jesong.env.min != 1){
				this.hideChat();
			}
			if(this.status == 2){
				this.status = 0;
				this.stopReceiveMessage();
				return {
					chatting : true,
					customerId : this.customerId,
					chatId : this.chatId
				};
			}else{
				return {
					chatting : false
				};
			}
		},
		hideChat : function(){
			JS("jesong_chat_layout").hide();
			JS("jesong_chat_min").hide();
			//JS("jesong_chat_record").empty();
		},
		flashtitleInterval : -1,
		windowFocus : true,
		unReadMsgStep : 1,
		unReadMsgTitle : JSLang[jesong.language].newMessage,//【您有新的消息】
		commonTitle : document.title,
		flashTitle : function(){
			window.focus();
			if(this.windowFocus==false){
				this.unReadMsgStep++;
				if (this.unReadMsgStep==3) {this.unReadMsgStep=1;}   
			    if (this.unReadMsgStep==1) {document.title=this.unReadMsgTitle;}   
			    if (this.unReadMsgStep==2) {document.title=this.commonTitle;} 
			    if(this.flashtitleInterval == -1){
			      	this.flashtitleInterval=window.setInterval(function(){
			      		try{
			      		Chat.flashTitle.apply(Chat, []);
			      		}catch(e){}
			      	}, 500); 
			    }
			}
		},
		playSound : function(msg){
			if(this.sound){
				var wav = jesong.env.server.file + "wav/sound.wav";
				var borswer = window.navigator.userAgent.toLowerCase();  
				try{
					if (borswer.indexOf( "ie" ) >= 0 ){
						JS("jesong_sound").empty().html('<bgsound src="'+wav+'"/>'); 
					}else{
						JS("jesong_sound").empty().html('<audio src="'+wav+'" autoplay="autoplay"></audio>'); 
					}
				}catch(e){
				}
			}
			if(!JS("jesong_chat_min").isHidden()){
				JS("jesong_chat_min_logo").css("backgroundImage", "url('"+jesong.env.server.file+"/images/auto/icon-message-high.png')")
									      .addClass("jesong_message").html(JSLang[jesong.language].newMessage);
				
				JS("jesong_pop_msg").show();
				JS("jesong_pop_msg_user").html(this.customerNick);
				JS("jesong_pop_msg_text").html(msg);
			}
		},
		clearFlashTitle : function(){
			document.title=this.commonTitle;
			if(this.flashtitleInterval==-1){
				return;
			}
			window.clearInterval(this.flashtitleInterval);
			this.flashtitle = -1;
		},
		/**
		 * 接受消息
		 */
		startReceiveMessage : function(){
			Chat.getMessage.apply(Chat, []);
			if(!this.receiveMessageInterval){
				this.receiveMessageInterval = window.setInterval(function(){
					Chat.getMessage.apply(Chat, []);
				}, 3000);
			}
		},
		getMessage : function(){
			var now = new Date().getTime();
			//避免由于上一次请求未在本次请求前返回，而出现重复消息的问题
			if(this.lastGetMessageTime != null && now - this.lastGetMessageTime < 6000){
				return;
			}
			//窗口最大化（也有可能是因为清理了cookie）, 此时将窗口隐藏掉
			/*var chatId = JS.getCookie("jesong_chat_"+this.companyId+"_id");
			if(!chatId){
				this.hideChat();
			}*/
			var s = this.receivemessageNum;
			var s1 = this.receiveSelfMessageNum;
			this.lastGetMessageTime = now;
			var params = {
				c: this.companyId,
				v: this.visitorId,
				u: this.visitorStaticId,
				cId: this.chatId,
				start:this.receivemessageNum,
				vstart:this.receiveSelfMessageNum
			};
			this.ajax("getMessage", params, function(resp){
					if(s == this.receivemessageNum && s1 == this.receiveSelfMessageNum){
						this.lastGetMessageTime = null;
						this.processMessage(resp.msgs || []);
					}else{
						this.getMessage();
					}
				}
			);
		},
		/**
		 * 处理接收到的消息
		 */
		processMessage : function(msgs){
			for (var i=0; i<msgs.length; i++) {
				var msg = msgs[i];
				var target = "user";
				if(msg.fromUserId == this.visitorId){
					target = "visitor";
					this.receiveSelfMessageNum++;
				}else{
					this.receivemessageNum++;
				}
				try{
					if(jesong.jsType == 1 && jesong.env.isPhone){
						var lastMessage = JS.getCookie("jesong_rec_"+this.chatId);
						if(target == "visitor" || (lastMessage != null && lastMessage != "" && this.receivemessageNum <= parseInt(lastMessage))){
							continue;
						}
					}
				}catch(e){}
				
				if(msg.type == "EVENT_CLOSE" || msg.type == "EVENT_END"){
					if(this.status == 2){
						this.status = 3;
						this.addMessage(this.words.disconnect, target, msg.createTime);
						this.closeChat();
					}else{
						this.receivemessageNum--;
					}
				}else if(msg.type == "EVENT_SAMEVISITOR"){
					//this.addMessage("您与客服又建立了一个对话， 当前对话已结束", target);
					this.addMessage(JSLang[jesong.language].sameChat, target, msg.createTime);
					this.closeChat();
					this.status = 3;
				}else if (msg.type == "EVENT_TRANSCHAT") {				
					this.customerId = msg.exts.customerId;    
					this.chatId = msg.exts.chatId;  
					//transHidden
					
					JS.setCookie("jesong_chat_"+this.companyId+"_id", this.chatId);
					
					if(this.customerId.indexOf("/")>0){
						this.customerId = this.customerId.substring(0, this.customerId.indexOf("/"));
					}
					JS.setCookie("jesong_chat_"+this.companyId+"_id", this.chatId);
					JS.setCookie("jesong_chat_user_"+this.companyId+"_id", this.customerId);
					
					var hidden = msg.exts.hidden;
			        if(!hidden){
			        	this.customerNick = msg.exts.nickName;  
						if(this.words.transchat){
							this.addMessage(this.words.transchat, "system", msg.createTime);
						}
						this.addMessage(this.words.transchatTo + this.customerNick, "system", msg.createTime);
						this.transHidden = false;
			        }else{
			        	this.transHidden = true;
			        }
					this.status = 3;
					this.receivemessageNum = 0;
					this.receiveSelfMessageNum = 0;
				} else if (msg.type == "EVENT_TRANSCHAT_SUCCESS") {
					if(this.status != 2){
						if(!this.transHidden){
							this.addMessage(this.words.transchatSuccess, "system", msg.createTime);
						}
						this.status = 2;
						this.resetOpinioned();
						//Customer_getCustomer(getCustomer_do,customerId,companyId);
					}
				} else if (msg.type == "RECORD_FILE") {            
					//this.addMessage("对方给您传送了一个文件， 请点击<a href=\""+msg.message+"\" target=\"_blank\">下载</a>。", target); 
					var url = msg.message;
					if(!url.indexOf("https") == 0){
						url = url.replace("http", jesong.env.scheme);
						url = url.replace(":80", ":"+jesong.env.schemePort);
					}
					this.addMessage(JSLang[jesong.language].downloadFile1 + "<a href=\""+url+"\" target=\"_blank\">"+JSLang[jesong.language].downloadFile2+"</a>\u3002", target, msg.createTime); 
				} else if(msg.type == "RECORD_SCREENSHOTS" || msg.type == "EVENT_SCREENSHOTS_SELF"){		
					var url = msg.message;
					if(!url.indexOf("https") == 0){
						url = url.replace("http", jesong.env.scheme);
						url = url.replace(":80", ":"+jesong.env.schemePort);
					}
					var msgHtml = '<a href="'+ url + '" target="_blank"><img src="' + url + '" width="' + 100 + '" ';
					msgHtml += '  border="0"></a>';
					if(msg.type == "EVENT_SCREENSHOTS_SELF"){
						this.screenActiveX = true;
						if(this.screenActiveXTime){
							window.clearTimeout(this.screenActiveXTime);
							this.screenActiveXTime = null;
						}
						target = "visitor";
					}
					this.addMessage(msgHtml, target, msg.createTime);	
				} else if(msg.type == "EVENT_OPINION"){      				
					//this.addMessage("对方请你对此次服务进行<a href=\"javascript:void(0);\" onclick=\"document.getElementById('jesong_opinion_layout').style.display='block';\" target=\"_blank\">评价</a>。", target); 
					this.addMessage(JSLang[jesong.language].opinion1 + "<a href=\"javascript:void(0);\" onclick=\"document.getElementById('jesong_opinion_layout').style.display='block';\" target=\"_blank\">"+JSLang[jesong.language].opinion2+"</a>", target, msg.createTime); 
				} else if(msg.type == "RECORD_RECORD"){ //普通信息查收
					var m = msg.message;
					m = m.replaceAll("/live/emoticon/new/", "/emoticon/");
					this.addMessage(m, target, msg.createTime); 
				} else if(msg.type == "RECORD_RICH_TEXT"){
					var m = msg.message;
					m = m.replaceAll("/live/emoticon/new/", "/emoticon/");
					this.addMessage(m, target, msg.createTime); 
				}
			}
		},
		getfocus : function(){
			var message = JS("jesong_message").val();
			var now = new Date().getTime();
			var rel = JS("jesong_message").attr("rel");
			if(message == rel){
				message = "";
			}
			if((this.lastGetFocusTime == null || now - this.lastGetFocusTime > 2000) && this.status == 2){
				this.sendFocus(message);
			}
			if(!this.focusTimeout){
				this.focusTimeout = window.setTimeout(function(){
					Chat.getfocus.apply(Chat, []);
				}, 3000);
			}
		},
		sendFocus : function(msg){
			this.ajax(
					'addEvent', 
					{c: this.companyId, cId: this.chatId, v: this.visitorId, cusId: this.customerId, msg: msg, type:"EVENT_GETFOCUS"}, 
					function(){}
				);
			if(this.focusTimeout){
				window.clearInterval(this.focusTimeout);
				this.focusTimeout = null;
			}
			this.lastGetFocusTime = new Date().getTime();
		},
		sendMessage : function(message){
			if(!message){
				message = JS("jesong_message").val();
			}
			var rel = JS("jesong_message").attr("rel");
			if(message != "" && message != rel){
				message = replaceHtml(message);
				if(this.status == 2){
					this.ajax('addMessage', {c: this.companyId, cId: this.chatId, v: this.visitorId, msg: message}, function(){
						this.receiveSelfMessageNum++;
					});
					this.addMessage(replaceEmoticon(replacelinkHtml(message)), "visitor"); 
					this.sendFocus("");
					JS("jesong_message").val("");
					JS("jesong_message").focus();
					window.setTimeout(function(){
						JS("jesong_message").val("");
					}, 100);
					flag = true;
				}else if(this.status == 1){
					//正在排队
					alert(JSLang[jesong.language].chatClosed);
					//alert("对话已经结束！");
				}else{
					//重新创建对话
					jesong.util.openChat("g="+jesong.monitor.config.group);
					jesong.autochat.waitSendMsg = message;
					//jesong.autochat.show = false;
				}
			}
			
		},
		/**
		 * 结束对话
		 */
		closeChat : function(){
			if(this.status == 2){
				if(this.chatId != null && this.chatId!=''){
					this.ajax("endChat", {
						c : this.companyId, 
						cId : this.chatId, 
						v : this.visitorId,
						u : this.visitorStaticId,
						type : "force"
					}, function(){
					});
				}
			}
			JS.setCookie("jesong_chat_"+this.companyId+"_id", "", -1);
			JS.setCookie("jesong_chat_user_"+this.companyId+"_id", "", -1);
			this.status = 3;
			this.stopReceiveMessage();
		},
		/**
		 * 停止接受消息
		 */
		stopReceiveMessage : function(){
			if(this.receiveMessageInterval){
				window.clearInterval(this.receiveMessageInterval);
				this.receiveMessageInterval = null;
			}
		},
		date2Text : function(v, fmt) {
			var fv = function(s){
				if(s<10){
					return '0'+s;
				}else{
					return s;
				}
			};
			if(typeof v=='string'){
				return v;
			}
			if (typeof v == 'number'){
				var v1 = new Date();
				v1.setTime(v);
				v = v1;
			} 
			if(v&&typeof v == 'object'){
				var fmtItem = ['yyyy','MM','dd','hh','mm','ss'];
				if(!fmt){
					fmt = 'yyyy-MM-dd';
				}
				var exp = new RegExp('(' + fmtItem.join('|') + ')', "g");
	            var fv = function(v) {
	                return v < 10 ? ('0' + v) : v;
	            };
	            return fmt.replace(exp, function($1, $2) {
	                switch ($2) {
	                    case 'yyyy':return v.getFullYear();
	                    case 'MM':return fv(v.getMonth() + 1);
	                    case 'dd':return fv(v.getDate());
	                    case 'hh':return fv(v.getHours());
	                    case 'mm':return fv(v.getMinutes());
	                    case 'ss':return fv(v.getSeconds());
	                }
	            });
			}else{
				return '';
			}
		}, getTimestamp : function(){
			return this.date2Text(new Date(), "hh:mm");
		},
		initCallEvent : function(){	
		}, addMessage : function(msg, type, time){
			var flag = true;
			var _tpl;
			if(time){
				time = this.date2Text(time, "hh:mm");
			}else{
				time = this.getTimestamp();
			}
			var m = {msg: msg, nickName:this.customerNick, time:time};
			
			if(jesong.jsType == 1 && jesong.env.isPhone){
				JS("jesong_chat_record").empty();
				JS("jesong_chat_record").append("<div id=\"jesong_chat_record_user\"><div style=\"float:left;\">"+this.customerNick+"</div><div style=\"float:right;\">"+this.getTimestamp()+"</div></div>");
				_tpl = phone_user_tpl;
				flag = false;
			}else{
				if(type == "user"){
					_tpl = user_tpl;
				}else if(type == "system"){
					_tpl = system_tpl;
				}else if(type == "welcome"){
					_tpl = welcome_tpl;
					m["welcome"] = JSLang[jesong.language].welcome;
				} else{
					_tpl = visitor_tpl;
					flag = false;
				}
			}
			JS("jesong_chat_record").append(tpl(_tpl,m));
			if(flag){
				this.flashTitle();
				this.playSound(msg);
			}
			if(jesong.jsType == 1 && jesong.env.isPhone){
				if(type == "visitor"){
					JS("jesong_chat_layout").hide();
				}else{
					JS("jesong_chat_layout").show();
				}
			}else{
				JS("jesong_chat_min").click();
				JS("jesong_chat_record").scrollTop(JS("jesong_chat_record").scrollTop()+1000);
			}
		}
	};
	Chat.init();
	
	jesong.force = Chat;
	
	window.onblur=function(){
		Chat.windowFocus=false;
	};

	window.onfocus= function(){
		Chat.windowFocus=true;
		Chat.clearFlashTitle.apply(Chat, []);
	};
	
})();

