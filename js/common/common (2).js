(function () {
	var _NS = function () {

	}

	_NS.prototype.select = function (selector,context) {
		var context = context || document;
		return context.querySelectorAll(selector);
	}

	_NS.prototype.isArrayLike=function(obj){
		if(obj instanceof Array){
			return true;
		}

		var length=obj.length;
		if ( obj.nodeType === 1 && length ) {
			return true;
		}
		return false;
	}

	_NS.prototype.html = function (obj,value) {
		var isArray=this.isArrayLike(obj), i=0;

		if (typeof value == 'string') {
			if (!isArray) {
				obj.innerHTML = value;
			} else {
				var length = obj.length;
				while (i < length) {
					obj[i].innerHTML = value;
					i += 1;
				}
			}
		} else {
			if (!isArray) {
				return obj.innerHTML;
			} else {
				return obj[0].innerHTML;
			}
		}
	}

	window.NS = new _NS();
})();

//var ip = location.href.indexOf("http://img1.mama100.cn") >= 0 ? "http://img1.mama100.cn" : "http://192.168.115.4:9580";
//var ip = 'http://h.mama100.com';
/*
页面环境
测试  http://img.mama100.cn
预发布  http://img1.mama100.cn
生产  http://h.mama100.com
*/
/*接口环境*/
var IP_CONSTANT={
	test:"http://192.168.115.4:9580/",
	preview:"http://img1.mama100.cn/",
	formal:"http://h.mama100.com/"
};
var ip=IP_CONSTANT.test;
if(location.href.indexOf(IP_CONSTANT.formal)>=0){
	ip=IP_CONSTANT.formal;
}else if(location.href.indexOf(IP_CONSTANT.preview)>=0){
	ip=IP_CONSTANT.preview;
}

/****
 * 获取参数值
 * @param name 参数名称
 * @returns 参数值
 */
//setToken("6f21e2690f6eca3663217eb7eef7bbe3");
if(getQueryString("token")!=''){
	setToken(getQueryString("token"));
	//alert(getQueryString("token"));
}
//alert(getToken())
function getQueryString(name)
{
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	var context = "";
	if (r != null)
		context = r[2];
	reg = null;
	r = null;
	return context == null || context == "" || context == "undefined" ? "" : context;
}

function getToken(){
	var arr = document.cookie.match(new RegExp("(^| )token=([^;]*)(;|$)"));
	if(arr != null) return unescape(arr[2]); return null;
}

function setToken(token){
	var Days = 30; //此 cookie 将被保存 30 天
	var exp  = new Date();	//new Date("December 31, 9998");
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = "token="+ escape (token) + ";expires="+exp.toGMTString();
}


var isToastMessageShowing=false;
//设置元素透明度,透明度值按IE规则计,即0~100
function SetOpacity(ev, v){
	ev.filters ? ev.style.filter = 'alpha(opacity=' + v + ')' : ev.style.opacity = v / 100;
}

/*
 * 淡出效果 elem==>需要淡入的元素 speed==>淡入速度,正整数(可选)
 * opacity==>淡入到指定的透明度,0~100(可选)
 */
function fadeOut(elem, speed, opacity){

	speed = speed || 10;
	opacity = opacity || 0;
	// 初始化透明度变化值为0
	var val = 100;
	// 循环将透明值以5递减,即淡出效果
	(function(){
		SetOpacity(elem, val);
		val -= 5;
		if (val >= opacity) {
			setTimeout(arguments.callee, speed);
		}else if (val < 0) {
			// 元素透明度为0后隐藏元素
			elem.style.display = 'none';
			isToastMessageShowing=false;
		}
	})();
}

document.write("<div style=\"width:70%; position:fixed;z-index:9999;  background:rgb(0,0,0); border-radius:5px; padding:20px;display:none\" id=\"showTip_control\"><div style=\"color:#f1f1f1;text-align:center;\" id=\"messagediv_control\">这里面是提示语</div></div>");
/**
 * toast消息提示
 **/
function toastMessage(msg){
	var speed=0;
	var opacity=0;

	var elem=document.getElementById("showTip_control");
	var winW=document.documentElement.clientWidth;
	var winH=document.documentElement.clientHeight;

	// 显示元素,并将元素值为0透明度(不可见)
	elem.style.display = 'block';

	var w=elem.offsetWidth;
	var h=elem.offsetHeight;
	elem.style.left = (winW/2-w/2)+"px";
	elem.style.top = (winH/2-h/2)+"px";


	document.getElementById("messagediv_control").innerHTML=msg;
	if(isToastMessageShowing)
		return;
	isToastMessageShowing=true;

	speed = speed || 10;
	opacity = opacity || 200;
	SetOpacity(elem, 0);
	// 初始化透明度变化值为0
	var val = 0;
	// 循环将透明值以5递增,即淡入效果
	(function(){
		SetOpacity(elem, val);
		val += 1;
		if (val <= opacity) {
			setTimeout(arguments.callee, speed);
		}
		else
		{
			fadeOut(elem, 50);
		}
	})();
}

String.prototype.isTrue=function(){
	return this["0"]+this["1"]+this["2"]+this["3"]==="true";
};
/*
 * save/load data with localStorage
 * localData(key,jsonObj)==save data
 * localData(key) == load data
 * */
function localData(key,value){
	var loadData=typeof(value)=="undefined";
	var returnData;
	if(loadData){
		//load
		returnData=localStorage.getItem(key);
		if(returnData==null){return returnData;}
		returnData=(returnData.substr(0,1)=="{"&&returnData.substr(-1,1)=="}")?JSON.parse(returnData):returnData;
	}else{
		//save
		returnData=localStorage.setItem(key,typeof(value)=="object"?JSON.stringify(value):value);
	}
	return returnData;
}

/**
 * 显示错误消息
 * @param errorCode
 */
function showErrorMessage(errorCode)
{
	if(errorCode==404)
	{
		toastMessage("页面不存在或者是js跨域:"+errorCode);
	}else if(errorCode==400)
	{
		toastMessage("参数错误:"+errorCode);
	}
	else
	{
		toastMessage("服务器繁忙,请稍候重试:"+errorCode);
	}
}

document.write("<div id='loading_control' class=\"loadings\"></div>");

/**
 * 显示加载进度(转圈)
 */
function showLoading()
{
	document.getElementById("loading_control").style.display = 'block';
}

/**
 * 隐藏加载进度(转圈)
 */
function hideLoading()
{
	document.getElementById("loading_control").style.display = 'none';
}