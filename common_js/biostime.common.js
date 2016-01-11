/*******************************************************************************
 * @jsname:biostime.common.js
 * @author:david.liang
 * @date:2014-5-10
 * @use:常用公共方法
 * @version 1.01 2014.12.26 增加获取路径相关方法
 ******************************************************************************/

var Biostime = {};

Biostime.common = new BiostimeCommon();
function BiostimeCommon() {

};

/**
 * 判断是否是整数
 * 
 * @param s
 * @returns {Boolean}
 */
BiostimeCommon.prototype.isInt = function(s) {
	var re = /^[0-9]*[1-9][0-9]*$/;
	if (!re.test(s))
		return false;
	return true;
};

/**
 * 判断对象是否为空
 * 
 * @param obj
 */
BiostimeCommon.prototype.isEmpty = function(obj) {
	if (obj == null || obj == undefined || obj.toString() == '') {
		return true;
	}
	return false;
};

BiostimeCommon.prototype.isDate = function(datestr) {
	var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
	var str = datestr;
	reg.exec(str);
	if (str == "")
		return true;
	if (!reg.test(str) && RegExp.$2 <= 12 && RegExp.$3 <= 31) {
		return false;
	}
	return true;
};

BiostimeCommon.prototype.formatNumber = function(pnumber, decimals) {
	if (isNaN(pnumber)) {
		return 0;
	}
	if (pnumber == '') {
		return 0;
	}

	var snum = new String(pnumber);
	var sec = snum.split('.');
	var whole = parseFloat(sec[0]);
	var result = '';

	if (sec.length > 1) {
		var dec = new String(sec[1]);
		dec = String(parseFloat(sec[1]) / Math.pow(10, (dec.length - decimals)));
		dec = String(whole + Math.round(parseFloat(dec))
				/ Math.pow(10, decimals));
		var dot = dec.indexOf('.');
		if (dot == -1) {
			dec += '.';
			dot = dec.indexOf('.');
		}
		while (dec.length <= dot + decimals) {
			dec += '0';
		}
		result = dec;
	} else {
		var dot;
		var dec = new String(whole);
		dec += '.';
		dot = dec.indexOf('.');
		while (dec.length <= dot + decimals) {
			dec += '0';
		}
		result = dec;
	}
	return result;
};

/*******************************************************************************
 * 获取参数值
 * 
 * @param name
 *            参数名称
 * @returns 参数值
 */
BiostimeCommon.prototype.getQueryString = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	var context = "";
	if (r != null)
		context = r[2];
	reg = null;
	r = null;
	return context == null || context == "" || context == "undefined" ? ""
			: context;
};

// 设置元素透明度,透明度值按IE规则计,即0~100
BiostimeCommon.prototype.setOpacity = function(ev, v) {

	ev.filters ? ev.style.filter = 'alpha(opacity=' + v + ')'
			: ev.style.opacity = v / 100;
};

var isToastMessageShowing = false;

/**
 * toast消息提示
 */
BiostimeCommon.prototype.toastMessage = function(msg) {
	var speed = 0;
	var opacity = 0;
	BiostimeCommon.prototype._checkMessageControl();
	var elem = document.getElementById("showTipControl");
	var winW = document.documentElement.clientWidth;
	var winH = document.documentElement.clientHeight;

	// 显示元素,并将元素值为0透明度(不可见)
	elem.style.display = 'block';

	var w = elem.offsetWidth;
	var h = elem.offsetHeight;
	elem.style.left = (winW / 2 - w / 2) + "px";
	elem.style.top = (winH / 2 - h / 2) + "px";

	document.getElementById("messagedivControl").innerHTML = msg;
	if (isToastMessageShowing)
		return;
	isToastMessageShowing = true;

	speed = speed || 80;
	opacity = opacity || 100;
	BiostimeCommon.prototype.setOpacity(elem, 0);
	// 初始化透明度变化值为0
	var val = 0;
	// 循环将透明值以5递增,即淡入效果
	(function() {
		BiostimeCommon.prototype.setOpacity(elem, val);
		val += 2;
		if (val <= opacity) {
			setTimeout(arguments.callee, speed);
		} else {
			BiostimeCommon.prototype.fadeOut(elem, 50);
		}
	})();
};

/*
 * 淡出效果 elem==>需要淡入的元素 speed==>淡入速度,正整数(可选) opacity==>淡入到指定的透明度,0~100(可选)
 */
BiostimeCommon.prototype.fadeOut = function(elem, speed, opacity) {

	speed = speed || 20;
	opacity = opacity || 0;
	// 初始化透明度变化值为0
	var val = 100;
	// 循环将透明值以5递减,即淡出效果
	(function() {
		BiostimeCommon.prototype.setOpacity(elem, val);
		val -= 5;
		if (val >= opacity) {
			setTimeout(arguments.callee, speed);
		} else if (val < 0) {
			// 元素透明度为0后隐藏元素
			elem.style.display = 'none';
			isToastMessageShowing = false;
		}
	})();
};
BiostimeCommon.prototype.isMessageControlCreate = false;
BiostimeCommon.prototype._checkMessageControl = function() {
	if (!BiostimeCommon.prototype.isMessageControlCreate) {
		BiostimeCommon.prototype.isMessageControlCreate = true;
		var div = document.createElement("div");
		div.innerHTML = "<div style=\"width:70%; position:fixed;z-index:9999;  background:rgb(0,0,0); border-radius:5px; padding:20px;display:none\" id=\"showTipControl\"><div style=\"color:#f1f1f1;text-align:center;\" id=\"messagedivControl\">这里面是提示语</div></div>";
		document.body.appendChild(div);
	}

};
BiostimeCommon.prototype.isLoadingControlCreate = false;
BiostimeCommon.prototype._checkLoadingControl = function() {

	var loadingStyle = ".la26{width:32px; height:32px;display:block;position: absolute; top:50%; left:50%; margin:-16px 0 0 -16px; z-index:30;}";
	loadingStyle += ".loadings{z-index:10000;background-image: url('data:image/gif;base64,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');}";
	// loadingStyle+="<style>" + loadingStyle + "</style>";

	if (!BiostimeCommon.prototype.isLoadingControlCreate) {
		BiostimeCommon.prototype.isLoadingControlCreate = true;
		var style = document.createElement("style");
		style.type = "text/css";
		if (style.styleSheet) { // ie下
			style.styleSheet.cssText = loadingStyle;
		} else {
			style.innerHTML = loadingStyle;
		}
		var div = document.createElement("div");
		div.innerHTML = "<div id='loadingControl' class=\"loadings la26\" style='display:none'></div>";
		document.body.appendChild(style);
		document.body.appendChild(div);
	}

};

// document.write("<div style=\"width:70%; position:fixed;z-index:9999;
// background:rgb(0,0,0); border-radius:5px; padding:20px;display:none\"
// id=\"showTipControl\"><div style=\"color:#f1f1f1;text-align:center;\"
// id=\"messagedivControl\">这里面是提示语</div></div>");
BiostimeCommon.prototype.showMessage = function(msg) {
	BiostimeCommon.prototype._checkMessageControl();
	isToastMessageShowing = false;
	var elem = document.getElementById("showTipControl");
	var winW = document.documentElement.clientWidth;
	var winH = document.documentElement.clientHeight;

	// 显示元素,并将元素值为0透明度(不可见)
	elem.style.display = 'block';

	var w = elem.offsetWidth;
	var h = elem.offsetHeight;
	elem.style.left = (winW / 2 - w / 2) + "px";
	elem.style.top = (winH / 2 - h / 2) + "px";

	document.getElementById("messagedivControl").innerHTML = msg;
	BiostimeCommon.prototype.setOpacity(elem, 80);
};

BiostimeCommon.prototype.hideMessage = function() {
	isToastMessageShowing = false;
	var elem = document.getElementById("showTipControl");
	elem.style.display = 'none';
};

/**
 * 显示加载进度(转圈)
 */
BiostimeCommon.prototype.showLoading = function() {
	BiostimeCommon.prototype._checkLoadingControl();
	document.getElementById("loadingControl").style.display = 'block';
};

/**
 * 隐藏加载进度(转圈)
 */
BiostimeCommon.prototype.hideLoading = function() {
	BiostimeCommon.prototype._checkLoadingControl();
	document.getElementById("loadingControl").style.display = 'none';
};

/**
 * 显示错误消息
 *
 * @param errorCode
 * @param text
 */
BiostimeCommon.prototype.showErrorMessage = function(errorCode, text) {
    var txt = text || "";
    if(errorCode == 0){
        BiostimeCommon.prototype.toastMessage("网络未连接，请检查您的网络！");
    } else if (errorCode == 404) {
        BiostimeCommon.prototype.toastMessage(txt + "您要访问的页面不存在！");
    } else if (errorCode == 400) {
        BiostimeCommon.prototype.toastMessage(txt + "请求参数错误！");
    } else if(errorCode >= 500){
        BiostimeCommon.prototype.toastMessage(txt + "服务器繁忙,请稍候重试:"+errorCode);
    } else {
        BiostimeCommon.prototype.toastMessage(txt + "错误码(" + errorCode + ")");
    }
};
/*******************************************************************************
 * 判断是否为手机号码
 * 
 * @param phoneNumber
 *            电话号码
 * @returns {Boolean}
 */
BiostimeCommon.prototype.isPhoneNumber = function(phoneNumber) {
	if (phoneNumber == undefined || phoneNumber == null
			|| phoneNumber.length != 11) {
		return false;
	} else {
		phoneNumber = phoneNumber.trim();
		for ( var i = 0; i < phoneNumber.length; i++) {
			if (isNaN(phoneNumber[i])) {
				return false;
			}
		}
		return true;
	}
};


/**
 * 获取当前路径
 * @returns
 */
BiostimeCommon.prototype.getCurrentUrlPath = function() {
	var currentUrl = document.location.toString();
	var index = currentUrl.lastIndexOf("/");
	return currentUrl.substring(0, index)+"/";
};

