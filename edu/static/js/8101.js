


















var JESONG_MESSAGE_TEXT;
var jesong;
(function(){
	function isMobile(){
		if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){ 
			return true;
		}else{
			return false;
		}
	}
	if(jesong || (false && false != isMobile())){
		return;
	}
JESONG_MESSAGE_TEXT = {"inviteText":"","extCode":"","msgOfDisConnected":"感谢您的咨询，更多疑问欢迎拨打免费咨询电话400-006-8186","welcomeMsgOfConnected":"<p><span style=\"color: rgb(0, 0, 0); font-family: Arial, Verdana, sans-serif; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; text-align: start; text-indent: 0px; text-transform: none; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); display: inline !important; float: none; font-size: 11px; \">&nbsp;为保证您的合法权益，我们将全程记录留存本次聊天记录。如没异议我们开始咨询沟通。</span></p><p><span style=\"color: rgb(0, 0, 0); font-family: Arial, Verdana, sans-serif; font-size: 12px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); display: inline !important; float: none;\">您好！欢迎登陆航空院校招生办，请问您咨询什么专业？</span></p>","inviteTitle":"","replyMsgAtConnected":"","msgOfTrans":"您的对话将被转移给我的同事， 感谢您的咨询！"};
jesong={	
	lazy : false,
	version : '2018011103',
	language : 'sc',
	visitorReady : false,
	forceReady : false,
	chatRequest : false,
	jsType : 0,
	callerOpinion : "0",
	env:{
		isPhone : false,
		scheme : "http",
		schemePort : "80",
		server:{
			monitor:'http://prd5.jswebcall.com/',
			chat:'http://prd5.jswebcall.com/live/',
			file:'http://scripts.jswebcall.com/prd5/'
		},
		compId:5221,
		confId:8101,
		vId:'',
		uId:'',
		pId:0,
		sid:0,
		promotionId:0,
		mId:'',
		lang:'',
		min:0,
		pos:'1'
	},
	config:{
		firstToRebot:0,
		phoneChatPop:0,
		monitor:true,
		panel:true,
		frameChatStyle:14,
		forceChatLogo:""
	},
	monitor:{},	panel:{},win:{},icon:{},text:{}, freecall:{}, probe:{}, phone:{},
	_isBindHost:function(){
		var bindHosts = "";
		if(bindHosts != ""){
			var _hosts = bindHosts.split(",");
			var domain = window.location.host;
			var bindHostFlag = false;
			for(var i=0; i < _hosts.length; i++){
				if(domain == _hosts[i]){
					bindHostFlag = true;
					break;
				}
			}
			return bindHostFlag;
		}else{
			return true;
		}
	},
	_genId : function(){
		var random4 = function(){
			return parseInt(Math.random()*9000+1000, 10);
		}
		var cId = "5221";
		while(cId.length < 12){
			cId = "0"+cId;
		}
		var id = ""+new Date().getTime();
		id = id.substring(3);
		id += random4();
		id += random4();
		return "01"+cId+id;
	},
	_createLayout : function(id, className){
		if(!this.lazy){
			document.write('<div id="'+id+'" class="'+className+'"></div>');
		}else{
			var _div = document.createElement("div");
			_div.id = id;
			_div.className = className;
			document.body.appendChild(_div);
		}
	},
	_loadJS : function(src){
		if(!this.lazy){
			//async="async"
			document.write('<scr'+'ipt type="text/javascript" defer src="'+src+'"></scr'+'ipt>');
		}else{
		    var script = document.createElement( "script" ); 
			script.type = "text/javascript"; 
			script.charset = "utf-8";
			script.src = src; 
			document.getElementsByTagName("script")[0].parentNode.appendChild(script); 
		}
	},
	_loadCSS : function(url){ 
		if(!this.lazy){
			document.write('<link rel="stylesheet" type="text/css" href="'+url+'"></link>');
		}else{
			var link = document.createElement( "link" ); 
			link.type = "text/css"; 
			link.rel = "stylesheet"; 
			link.href = url; 
			document.getElementsByTagName( "head" )[0].appendChild( link ); 
		}
	},
	init:function(){
		if(this._isBindHost()){
			jesong.env.vId = this._genId();
			this._createLayout("jesong_panel", "");
			if(jesong.jsType == 1 && jesong.env.isPhone){
				this._createLayout("jesong_chat_layout", "jesong_phone_layout jesong_phone_layout_sc_1");
			}else{
				this._createLayout("jesong_chat_layout", "jesong_chat_layout_pc jesong_chat_layout_pc_sc");
			}
			this._createLayout("jesong_chat_min", "jesong_chat_min_sc");
			this._createLayout("jesong_pop_msg", "");
			if("https:" == document.location.protocol){
				this.env.server.monitor = this.env.server.monitor.replace("http", "https");
				this.env.server.chat = this.env.server.chat.replace("http", "https");
				this.env.server.file = this.env.server.file.replace("http", "https");
				this.env.schemePort = "443";
				this.env.scheme = "https";
				
			}
			this._loadCSS(this.env.server.file + "css/webcall.css?ver=2018011103");
			this._loadJS(this.env.server.file + "js/webcall.js?ver=2018011103");
			this._loadCSS(this.env.server.file + "css/force.css?ver=2018011103");
		}
	},
	words:{
		welcome:JESONG_MESSAGE_TEXT.welcomeMsgOfConnected,
		greeting:JESONG_MESSAGE_TEXT.replyMsgAtConnected,
		disconnect:JESONG_MESSAGE_TEXT.msgOfDisConnected
	}
};



jesong.monitor.config={
	index:11,
	type:1,
	title:JESONG_MESSAGE_TEXT.inviteTitle,
	text:JESONG_MESSAGE_TEXT.inviteText,
	pos:'3',
	auto:20,
	showInviteAgain:30,
	autoInviteTimes:-1,
	group:'8000',
	start:'00:00',
	end:'23:59',
	mask:false,
	mainBg:'url(http://www.lysdedu.com/images/leyoo/easyliaohk/newhk.gif) no-repeat',
	mainHeight:'370',
	mainWidth:'649',
	acceptStyle:'position:absolute;background:url() no-repeat;height:40px;width:315px;top:300px;left:65px;',
	refuseStyle:'position:absolute;background:url() no-repeat;height:60px;width:60px;top:0px;left:589px;',
	textStyle:'position:absolute;height:0px;width:0px;top:0px;left:0px;'
	
};


jesong.panel.config={
	category:'win',	
	position:0,
	vertical:120,
	horizon:5,
	panelWhenInvite:'1'
};

 
jesong.win.config={
	
	mode:0,
	index:1,
	width:134,
	height:200,
	title:'\u5728\u7ebf\u5ba2\u670d',
	headClr:'#FFFFFF',	
	headBgClr:'#0c73c2',
	borderClr:'#0c73c2',	
	phone:'400-602-8090',
	customers:{"showRobot":1,"groups":[{"id":8000,"count":18,"name":"\u7a7a\u4e58\u4e13\u4e1a\u54a8\u8be2","active":7,"mode":1,"online":8},{"id":8001,"count":16,"name":"\u56fd\u9645\u7a7a\u4e58\u54a8\u8be2","active":6,"mode":1,"online":7},{"id":8002,"count":16,"name":"\u77ed\u671f\u7a7a\u4e58\u57f9\u8bad","active":6,"mode":1,"online":7},{"id":8004,"count":16,"name":"\u9ad8\u94c1\u4e58\u52a1\u54a8\u8be2","active":6,"mode":1,"online":7},{"id":8014,"count":4,"name":"\u98de\u884c\u5458\u4e13\u4e1a","active":0,"mode":1,"online":1},{"id":8013,"count":12,"name":"\u6a21\u62df\u9762\u8bd5","active":4,"mode":1,"online":5},{"id":8003,"count":16,"name":"\u521d\u4e2d\u9884\u79d1\u54a8\u8be2","active":6,"mode":1,"online":7},{"id":8005,"count":16,"name":"\u5317\u4eac\u822a\u7a7a\u5b66\u6821","active":6,"mode":1,"online":7},{"id":8006,"count":16,"name":"\u82cf\u6caa\u822a\u7a7a\u5b66\u6821","active":6,"mode":1,"online":7},{"id":8007,"count":16,"name":"\u5ddd\u6e1d\u822a\u7a7a\u5b66\u6821","active":6,"mode":1,"online":7},{"id":8008,"count":16,"name":"\u8c6b\u9c81\u822a\u7a7a\u5b66\u6821","active":6,"mode":1,"online":7},{"id":8009,"count":16,"name":"\u7ca4\u6842\u822a\u7a7a\u5b66\u6821","active":6,"mode":1,"online":7},{"id":8010,"count":16,"name":"\u822a\u7a7a\u5f55\u53d6\u67e5\u8be2","active":6,"mode":1,"online":7},{"id":8011,"count":16,"name":"\u7a7a\u4e58\u843d\u699c\u8865\u5f55","active":6,"mode":1,"online":7}],"mode":"1"},
	qccode:'',
	
	winBg:'',
	winGOnlineBg:'',
	winGOfflineBg:'',
	winMTop:0,
	winMLeft:0,
	winMWidth:0,
	winMHeight:0,
	winGHeight:0,
	winGTop:0,
	winGBottom:0,
	winGOnlineFont:'',
	winGOnlineWeight:0,
	winGOnlineColor:'',
	winGOfflineFont:'',
	winGOfflineWeight:0,
	winGOfflineColor:'',
	winGTextleft:0
	
};







jesong.freecall.config = {
	groupId : 7960,
	show : false,
	panelPos : 0,
	
	panelBg : "",
	panelWidth : 0,
	panelHeight : 0,
	
	panelTop : -1,
	panelLeft : -1,
	panelRight : -1,
	panelBottom : -1,
	
	textWidth : 0,
	textHeight : 0,
	textLeft : 0,
	textTop : 0,
	
	closeWidth : 0,
	closeHeight : 0,
	closeLeft : 0,
	closeTop : 0,
	
	callWidth : 0,
	callHeight : 0,
	callLeft : 0,
	callTop : 0

};


jesong.probe = {
	texts:"", 
	groupIds:""
};
jesong.autochat={
	bgcolor:'#3097ef',
	width:320,
	height:435,
	use:0,
	start:'09:00',
	end:'18:00',
	times:-1,
	show:false,
	welcome:JESONG_MESSAGE_TEXT.welcomeMsgOfConnected,
	waitSendMsg:'',
	connect : '0',
	closeBtn : '1',
	tools:{
		emoticons : '1',
		opinion : '1',
		screen : '1',
		file : '1'
	}
};
jesong.init();

})();

		

