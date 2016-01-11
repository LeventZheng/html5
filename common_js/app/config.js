/*******************************************************************************
 * @jsname:config.js
 * @author:LeventZheng
 * @date:2015-12-21
 * @use:商家中心APP配置
 ******************************************************************************/
if(common.device.platform == "ios") common.device.os = "iPhone OS";//如果是ios设备后台统一认为是iPhone OS

/**
 * Debug for PC or Weixin
 **/
(function(){
    if(common.support.isMobile&&!common.support.isWeixin) return;
    common.support.isDebugMode = true;
    if(common.support.isWeixin){
        common.event.deviceready = 'DOMContentLoaded';
        common.event.viewWillAppear = 'DOMContentLoaded';
    } else {
        common.device.type = "iPhone";
        common.device.os = "iPhone OS";
        common.device.platform = "ios";
    }
    if(!navigator.exec){
        navigator.exec = function(successCallback, failCallback, pluginName, method, para){
            console.log("本功能需要客户端支持，请在客户端测试！/n 模块："+pluginName+"，方法:"+method);
        }
    }
    if(!Mama100hytJSBridge) return;
    var testConfig = {
        //版本号
        version : "5.0",

        //用户位置
        location : {
            "latitude" : 23.123873,
            "longitude" : 113.33092,
            "cityCode" : "0529"
        },

        //是否登录，OK:是,ERROR:否
        logon : "OK",

        //应用信息
        info : {
            "devid" : "A0000022DB0001",
            "accessToken" : "d79ecbb89c32f167d223749f469007a7",
            "tsno" : "201412091434401272",
            "authData" : "ATRA3FSFaDD3EdPqm8HnZDaLFXexUQuBalXqQnLO1gH+2rrVwFZKAA==",
            "versionCode" : "55"
        },

        //用户信息
        userInfo : {
            "userID" : "",
            "customerId" : "14486365",
            "userName" : "",
            "avatar" : "",
            "mobile" : ""
        },

        login : "请在客户端测试本功能！"
    };

    Mama100hytJSBridge.exec = function(successCallback, failCallback, pluginName, method, para) {
        if(typeof successCallback != "function") return;
        if("App" == pluginName){
            switch(method){
                case "version" :
                    successCallback(testConfig.version);
                    break;
                case "info" :
                    successCallback(testConfig.info);
                    break;
                default :
                    break;
            }
        } else if("Browser" == pluginName){
            if("open" == method){
                if(para[0]['target'] == "1")
                    window.location.href = para[0]['url'];
                if(para[0]['target'] == "2")
                    window.open(para[0]['url']);
            }else if("popToRoot" == method){
                window.location.href = "http://hyt.mama100.com/hyt/";
            }else if("pop" == method){
                if(para.length==0){
                    history.go(-1);
                }else{
                    history.go(-para[0].level);
                }
            }else if("loading" == method){
                Biostime.common.showLoading();
            }else if("loaded" == method){
                Biostime.common.hideLoading();
            }
        } else if("PvStat" == pluginName){
            "record"==method&&successCallback();
            console.log(para);
        } else {
            alert("本功能需要客户端支持，请在客户端测试！\n模块："+pluginName+"，方法:"+method);
        }
    };
})();