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

jQuery.validator.addMethod("brandChineseName", function(value, element) {
	var tel = /^[\u4E00-\u9FA50-9-_()（）]+$/;
	return this.optional(element) || (tel.test(value));
}, "*品牌名只能由中文或数字或“_”、“-”、()、（）组成");
jQuery.validator.addMethod("brandEnglishName", function(value, element) {
	var tel = /^[\sa-zA-Z0-9-_()（）]+$/;
	return this.optional(element) || (tel.test(value));
}, "*品牌名只能由英文或数字或“_”、“-”、()、（）组成");


jQuery.validator.addMethod("afterToday",function (value, element) {
	return new Date() >= new Date(Date.parse(value.replace("-", "/")));
},"到期日不能小于当前日期");

/*普遍使用的正则是[\u4e00-\u9fa5]，但这个范围并不完整*/
jQuery.validator.addMethod("Chinese",function() {
	return /[\u4e00-\u9fa5]/;
});

/*http://nuysoft.iteye.com/blog/1217898*/
/**
 * 根据Unicode 5.0版编码，要准确的判断一个中文字符要包括：
 * 范围  含义  范围  含义
 * 2E80-2EFF   CJK 部首补充    2F00-2FDF   康熙字典部首
 * 3000-303F   CJK 符号和标点   31C0-31EF   CJK 笔画
 * 3200-32FF   封闭式 CJK 文字和月份   3300-33FF   CJK 兼容
 * 3400-4DBF   CJK 统一表意符号扩展 A  4DC0-4DFF   易经六十四卦符号
 * 4E00-9FBF   CJK 统一表意符号  F900-FAFF   CJK 兼容象形文字
 * FE30-FE4F   CJK 兼容形式    FF00-FFEF   全角ASCII、全角标点
 * 因此，正确的匹配中文字符正则表达式为：
 * var rcjk = /[\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]+/g;
 * 如果不希望匹配标点、符号，在正则中去掉对应的范围即可：
 * 3000-303F   CJK 符号和标点   FF00-FFEF   全角ASCII、全角标点
 */
jQuery.validator.addMethod("ChineseAll",function() {
	return /[\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]+/g;
});

/*
	匹配双字节字符(包括汉字在内)
	[^\x00-\xff]，可以用来计算字符串的长度（一个双字节字符长度计2，ASCII字符计1），代码示例如下：
	console.info( "abc".replace( /[^\x00-\xff]/g,"aa" ).length ) // 3
	console.info( "汉字".replace( /[^\x00-\xff]/g,"aa" ).length ) // 4
	console.info( "abc汉字".replace( /[^\x00-\xff]/g,"aa").length ) // 7
*/
