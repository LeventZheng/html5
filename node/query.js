var data = {"mobResponse":{"code":"100","desc":"参团成功","result":{"orderCodes":["1914520736873112224"],"payArgs":"sign=\"LF96dlf1dy99T52gQKZIB4vOo54d%2F1SUlqLPmoP4JSl4G%2FxoQl42EcNRaE3Edk%2FA5e0qcra60LgviQrRo8VkY3Y3v9pCpnpql%2BluI1xg2z4vAFGdYy6w4dnZvNJ4uu1hhxWY0JKDSRfL5Ridj2T684XSuTRUaN010F9yMD49cMc%3D\"&sign_type=\"RSA\"&_input_charset=\"UTF-8\"&subject=\"2015年12月9日--1 褐色 2\"&it_b_pay=\"28m\"&notify_url=\"http://113.108.232.136/alipay/notify/mobile/securitypay/pay\"&body=\"2015年12月9日--1 褐色 2\"&payment_type=\"1\"&out_trade_no=\"M1714520736874246226\"&partner=\"2088711437104563\"&service=\"mobile.securitypay.pay\"&total_fee=\"0.01\"&seller_id=\"zhifubao2@biostime.com.cn\"","payUrl":"http://192.168.115.3:43080/alipay/wappay/pay/M1714520736874246226?a=1&order_code=M1714520736874246226&signature=072ea9623aeffc66fdb607a39826adfa742a9c9f&from_system=Merchant","paymentCode":"1714520736874246226","tradeCode":"1214520736873063955","validateResult":{"actCode":"0114515428955485847","deliveryId":"107707","invoiceBean":null,"payType":"alipay","skus":[{"count":1,"resultCode":"","resultDesc":"","sku":127,"spu":181,"validateFlag":true}],"validateResult":true}},"tsno":""}};
var result = data.mobResponse.result;
//console.log('result:'+result);
var payUrl = result.payUrl;
//console.log('payUrl:'+payUrl);

function queryString(target, name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        //var reg = new RegExp("^|/?|&"+name + "=([^&]*)(&|$)", "i");
        var r = target.match(reg);
		console.log(r);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    }
	
	var orderCode = queryString(payUrl, 'order_code');
	console.log(orderCode);