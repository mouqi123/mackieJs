var client=function(){

	//浏览器的呈现引擎
	var engine={
		ie:0,
		gecko:0,
		webkit:0,
		khtml:0,
		opera:0,

		version:null
	};

	//浏览器的类型
	var browser={
		ie:0,
		firefox:0,
		safari:0,
		chrome:0,
		opera:0,
		konq:0,

		version:null
	};

	//操作系统
	var system={
		win:false,
		mac:false,
		//xll表示unix或linux系统
		xll:false,

		//移动设备
		iphone:false,
		ipod:false,
		ipad:false,
		android:false,
	}

	var ua=navigator.userAgent;
	if(window.opera){
		engine.version=browser.version=window.opera.version();
		engine.opera=browser.opera=parseFloat(engine.version);
	}else if(/AppleWebKit\/(\S+)/.test(ua)){
		engine.version=RegExp.$1;
		engine.webkit=parseFloat(engine.version);

		if(/Chrome\/(\S+)/.test(ua)){
			browser.version=RegExp.$1;
			browser.chrome=parseFloat(browser.version);
		}else if(/Version\/(\S+)/.test(ua)){
			browser.version=RegExp.$1;
			browser.safari=parseFloat(browser.version);
		}
	}else if(/KHTML\/(\S+)/.test(ua)){
		engine.version=browser.version=RegExp.$1;
		engine.khtml=browser.konq=parseFloat(engine.version);
	}else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
		engine.version=RegExp.$1;
		engine.gecko=parseFloat(engine.version);

		if(/Firefox\/(\S+)/.test(ua)){
			browser.version=RegExp.$1;
			browser.firefox=parseFloat(browser.version);
		}
	}else if(/MSIE ([^;]+)/.test(ua)){
		engine.version=browser.version=RegExp.$1;
		engine.ie=browser.ie=parseFloat(engine.version);
	}

	//检测操作系统
	var p=navigator.platform;
	system.win=p.indexOf("Win")==0;
	system.mac=p.indexOf("Mac")==0;
	system.xll=(p=="Xll") || (p.indexOf("Linux")==0);

	//检测windows版本
	if(system.win){
		//
		if(/Windows NT ([^;]+)/.test(ua)){
			switch(RegExp.$1){
				case "5.1":
					system.win="XP";
					break;
				case "6.0":
					system.win="Vista";
					break;
				case "6.1":
					system.win="7";
					break;
				case "6.2":
					system.win="8";
				case "10.0":
					system.win="10";
					break;
				default:
					system.win="NT";
					break;
			}
		}
	}

	//移动设备
	system.iphone=ua.indexOf("iPhone")>-1;
	system.ipod=ua.indexOf("iPod")>-1;
	system.ipad=ua.indexOf("iPad")>-1;
	system.android=ua.indexOf("Android");

	return {
		engine: engine,
		browser: browser,
		system: system
	};
}();
