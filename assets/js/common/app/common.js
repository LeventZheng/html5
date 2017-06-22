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

common.extend({
    getCurrentUrlPath : function() {
        var currentUrl = document.location.toString();
        var index = currentUrl.lastIndexOf("/");
        return currentUrl.substring(0, index)+"/";
    },
    getQueryString : function(target, name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = target.match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },
    //移除转义字符
    removeESC : function(string){
        return string.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
    },
    //移除特殊字符
    removeSpecialCharacter : function(string){
        return string.replace(/[\@\#\$\%\^\&\*\(\)\{\}\:\"\L\<\>\?\[\]]/);
    },
    removePrevPages : function(indexTitle){
        Mama100hytJSBridge.getStack(function(result){
            var arr = [];
            //保留首页与当前页
            var index = -1;//拼团首页下标
            for(var i=0; i<result.length-1; i++){
                if(result[i].name == indexTitle){
                    index = i;
                }else if(index>-1){
                    arr.push(i);
                }
            }
            Mama100hytJSBridge.closePages(function(result){}, function(code){}, arr);
        }, function(code){});
    },
    /**
     * 处理支付结果统一接口
     * @param data,支付接口返回参数data.payResult为支付返回参数(支付宝、微信各不一样)
     * @param id,在支付宝中是orderCode,在微信支付中是prepayId
     * @returns {string}
     */
    handlePayResult : function(data, id){
        var payResult = {status:'unknown', amount : null, reason: null};
        if(data.payType=='alipay'){
            if(data.payResult.resultStatus==9000){
                var success = common.getQueryString(data.payResult.result,'success');
                success = common.removeESC(success);
                var out_trade_no = common.removeESC(common.getQueryString(data.payResult.result,'out_trade_no'));
                if(success=='true' && out_trade_no==id){
                    payResult.status = 'success';
                    var amount= common.getQueryString(data.payResult.result,'total_fee');
                    amount = common.removeESC(amount);
                    payResult.amount = amount;
                }
            }else if(data.payResult.resultStatus==6001){
                payResult.status = 'fail';
                payResult.reason = encodeURI(data.payResult.memo);
            }
        }else if(data.payType=='weixin') {
            if(data.payResult.errCode==0){
                if(data.payResult.prepayId==id){
                    payResult.status = 'success';
                }
            }else if(data.payResult.errCode==-2){
                payResult.status = 'fail';
                payResult.reason = encodeURI('操作已经取消');
            }
        }
        return payResult;
    }
});

common.URL.IMG_URL = common.URL.IMG_URL_MATCH.formal;
if(common.getCurrentUrlPath() == common.URL.IP_URL_MATCH.test){
    common.URL.IMG_URL = common.URL.IMG_URL_MATCH.test;
}