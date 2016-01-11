/*******************************************************************************
 * @jsname:common.js
 * @author:LeventZheng
 * @date:2015-12-21
 * @use:商家中心APP常用方法
 ******************************************************************************/

var common = window.common = {

    //批量扩展common的方法或属性
    extend : function(){
        var options = arguments[0];
        for(var i in options){
            this[i] = options[i];
        }
    }
};

//设备类型
common.device = (function(){
    var dev = {type:"noMobile",os:"window",version:"0",platform:"window"},
        ua = navigator.userAgent,
        iPad = ua.match(/(iPad).*OS\s([\d_]+)/),
        iPod = !iPad && ua.match(/(iPod).*OS\s([\d_]+)/),
        iPhone = !iPad && !iPod && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        android = !iPad && !iPod && !iPhone && ua.match(/(Android)\s([\d\.]+)/);
    if (iPad) {
        dev.type = "iPad";
        dev.version = iPad[2].replace(/_/g, ".");
        dev.os = "iPad OS";
        dev.platform = "ios";
    }
    if (iPod) {
        dev.type = "iPod";
        dev.version = iPod[2].replace(/_/g, ".");
        dev.os = "iPod OS";
        dev.platform = "ios";
    }
    if (iPhone) {
        dev.type = "iPhone";
        dev.version = iPhone[2].replace(/_/g, ".");
        dev.os = "iPhone OS";
        dev.platform = "ios";
    }
    if (android) {
        dev.type = "android";
        dev.version = android[2];
        dev.os = "android";
        dev.platform = "android";
    }
    return dev;
})();

//支持特性检测
common.support = {
    //是否是移动设备
    isMobile : common.device.type != 'noMobile',
    //是否是微信
    isWeixin : navigator.userAgent.toLowerCase().indexOf("micromessenger") >= 0,
    //是否是调试模式
    isDebugMode : false,
    //是否运行在WiFi/3G等网络
    /*connection : function(){
        return window.navigator.connection;
    },*/
    //网络连接状态
    online : function(){
        return window.navigator.onLine;
    }
};

common.event = (function(){
    return {
        start : common.support.isMobile ? 'touchstart' : 'mousedown',
        move : common.support.isMobile ? 'touchmove' : 'mousemove',
        end : common.support.isMobile ? 'touchend' : 'mouseup',
        deviceready : common.support.isMobile ? 'deviceready' : 'DOMContentLoaded',
        viewWillAppear : common.support.isMobile ? 'viewWillAppear' : 'DOMContentLoaded'
    }
})();

common.URL = {
    IP_URL_MATCH : {
        test:"http://img.mama100.cn/hyt_h5/B2B/flash_sale/",
        formal:"http://h.mama100.com/hyt_h5/B2B/flash_sale/"
    },
    IMG_URL_MATCH : {
        test:"http://192.168.115.20:44080/mcs-web",
        formal:"http://hyt.mama100.com/mcs-web"
    },
    IMG_URL : null
};

common.URL.IMG_URL = common.URL.IMG_URL_MATCH.formal;
if(common.getCurrentUrlPath() == common.URL.IP_URL_MATCH.test){
    common.URL.IMG_URL = common.URL.IMG_URL_MATCH.test;
}

common.extend({
    getCurrentUrlPath : function() {
        var currentUrl = document.location.toString();
        var index = currentUrl.lastIndexOf("/");
        return currentUrl.substring(0, index)+"/";
    },
    /**
     * 检测对象是否是一个数组
     */
    isArrayLike : function(obj){
        if(obj instanceof Array){
            return true;
        }
        var length = obj.length;
        if ( obj.nodeType === 1 && length ) {
            return true;
        }
        return false;
    },
    /**
     * 检测对象是否是空对象(不包含任何可读属性)。
     * 方法既检测对象本身的属性，也检测从原型继承的属性(因此没有使hasOwnProperty)。
     */
    isEmptyObject : function (obj){
        for(var n in obj){
            return false;
        }
        return true;
    },
    /**
     * 检测对象是否是空对象(不包含任何可读属性)。 //如你上面的那个对象就是不含任何可读属性
     * 方法只检测对象本身的属性，不检测从原型继承的属性。
     */
    isOwnEmpty : function (obj){
        for(var name in obj){
            if(obj.hasOwnProperty(name)){
                return false;
            }
        }
        return true;
    },
    /**
     * 获取时间
     * 在angularjs中有过滤器
     * 格式:yyyy-mm-dd hh:min:sec
     * @returns {string}
     */
    getFormatDate : function(date){
        if( date instanceof Date ){
            var formatDate = date.getFullYear() + "-";
            var Month = date.getMonth()+1;
            var Day = date.getDate();
            var Hour = date.getHours();
            var Minutes = date.getMinutes();
            var Seconds = date.getSeconds();
            if (Month >= 10 ){ formatDate += Month + "-"; }else{ formatDate += "0" + Month + "-"; }
            if (Day >= 10 ){ formatDate += Day + " "; }else{ formatDate += "0" + Day + " "; }
            if (Hour >= 10){ formatDate += Hour + ":"; }else{ formatDate += "0" + Hour + ":"; }
            if (Minutes >= 10){ formatDate += Minutes + ":"; }else{ formatDate += "0" + Minutes + ":"; }
            if (Seconds >= 10){ formatDate += Seconds; }else{ formatDate += "0" + Seconds; }
            return formatDate;
        }
        return date;
    }
});