/*******************************************************************************
 * @jsname: validate.expand.js
 * @author:zhenglingfeng
 * @date:2015/6/30
 * @use:表单验证中文拓展
 ******************************************************************************/
jQuery.validator.addMethod("isZipCode", function(value, element) {
	var tel = /^[0-9]{6}$/;
	return this.optional(element) || (tel.test(value));
}, "*请正确填写您的邮政编码");

jQuery.validator.addMethod("personName", function(value, element) {
	var tel = /^[(\u4E00-\u9FA5)|a-zA-Z0-9]+$/;
	return this.optional(element) || (tel.test(value));
}, "*姓名只能由中文、英文、数字组成");

jQuery.validator.addMethod("password", function(value, element) {
	var tel = /^.{6,16}$/;
	return this.optional(element) || (tel.test(value));
}, "*请输入6~16个字符密码,区分大小写");

jQuery.validator.addMethod("capital", function(value, element) {
	var tel = /^[1-9][0-9]*(\.[0-9]{1,2})?$/;
	return this.optional(element) || (tel.test(value));
}, "*请输入正确的数值");

jQuery.validator.addMethod("identityChina", function(value, element) {
	var tel = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/;
	return this.optional(element) || (tel.test(value));
}, "*请输入正确的身份证号码");
jQuery.validator.addMethod("identityForeign", function(value, element) {
	var tel = /^[0-9a-zA-Z]+$/;
	return this.optional(element) || (tel.test(value));
}, "*请输入正确的身份证号码");

jQuery.validator.addMethod("mobileNo", function(value, element) {
	var tel = /^1[0-9]{10}$/;
	return this.optional(element) || (tel.test(value));
}, "*请输入正确的手机号码");

jQuery.validator.addMethod("homePhoneNo", function(value, element) {
	var tel = /^([0-9]{3,4}-)?[0-9]{5,8}$/;
	return this.optional(element) || (tel.test(value));
}, "*请输入正确的电话号码");
jQuery.validator.addMethod("phoneNo", function(value, element) {
	var tel = /^[-0-9]{5,13}$/;
	return this.optional(element) || (tel.test(value));
}, "*请输入正确的电话号码");

jQuery.validator.addMethod("bankName", function(value, element) {
	var tel = /^[\u4E00-\u9FA5/(/)（）]+$/;
	return this.optional(element) || (tel.test(value));
}, "*请输入中文或（）");

jQuery.validator.addMethod("compareDate",function (value, element) {
	var startDate = $('#establishDate').val();
	return new Date(Date.parse(startDate.replace("-", "/"))) <= new Date(Date.parse(value.replace("-", "/")));
},"结束日期必须大于开始日期");

jQuery.validator.addMethod("compareCodeDate",function (value, element) {
	var startDate = $('#olcEfectiveDateStart').val();
	return new Date(Date.parse(startDate.replace("-", "/"))) <= new Date(Date.parse(value.replace("-", "/")));
},"结束日期必须大于开始日期");