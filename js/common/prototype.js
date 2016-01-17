/*******************************************************************************
 * @jsname:prototype.js
 * @author:LeventZheng
 * @date:2015-12-24
 * @use:为js对象拓展原形方法
 ******************************************************************************/

/**
 * 返回对象的类型
 * 能够对Array、Date等对象进行识别
 * @param obj
 * @returns {*}
 */
function getObjType(obj){
	var class2type = {};
	var typeList = "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ");
	for(var item in typeList){
		class2type["[object "+typeList[item]+"]"] = typeList[item].toLowerCase();
	}
	if( obj === null){
		return obj+"";
	}
	if(typeof obj === "object" || typeof obj === "function"){
		return class2type[toString.call(obj)] || "object";
	}else{
		return typeof obj;
	}
};

function isArrayLike(obj){
	if(obj instanceof Array){
		return true;
	}
	var length = obj.length;
	if ( obj.nodeType === 1 && length ) {
		return true;
	}
	return false;
}

/**************************** Array prototype *********************************/
/**
 * 方法:Array.insertFirst(item) 功能:将元素插入数组首位
 * @param item
 * @returns {Array} 确保方法可链
 */
Array.prototype.insertFirst = function (item) {
	if( isArrayLike(this) ){
		if(this.length == 0){
			this.push(item);
		}else{
			this.splice(0, 0, item);
		}
	}
	return this;
};

/**
 * 方法:Array.getIndexByAttr(val,attr)
 * 功能1:对json数组操作，通过关键字查找元素在数组中的位置
 * 功能2:对非json数组操作，通过元素在数组中的位置
 * @param val,数组元素属性值(此处用元素属性值而不用元素去获取，属性值更具有通用性)
 * @param attr，obj属性
 * @returns {number}
 */
Array.prototype.getIndexByAttr = function(val, attr) {
	if( isArrayLike(this) ){
		for (var i = 0; i < this.length; i++) {
			if( typeof(this[i])  == "object" && this[i][attr] ){
				if (this[i][attr] == val)
					return i;
			}else if(val == this[i]){
				return i;
			}
		}
		return -1;
	}
	return null;
};

/**
 * 方法:Array.getByAttr(val,attr) 功能:根据指定属性获取数组中的元素
 * 功能:对json数组操作，通过关键字查找元素
 * 非json数组,返回元素本身
 * @param val,数组元素属性值
 * @param attr
 * @returns {number}
 */
Array.prototype.getByAttr = function(val, attr) {
	if( isArrayLike(this) ){
		var item = null;
		for (var i = 0; i < this.length; i++){
			if( typeof(this[i])  == "object" ){
				if(this[i][attr] == val){
					item = this[i];
					break;
				}
			}
			else if(this[i] == val){
				item = this[i];
				break;
			}
		}
		return item;
	}
	return null;
};

/**
 * 方法:Array.removeByAttr(val,attr)
 * 功能:对json数组操作，通过关键字删除数组元素.
 * @param val,数组元素属性值
 * @param attr
 * @returns {Array} 确保方法可链
 */
Array.prototype.removeByAttr = function(val, attr) {
	if( isArrayLike(this) ){
		var index = -1;
		for (var i = 0; i < this.length; i++){
			if( typeof(this[i])  == "object" ){
				if(this[i][attr] == val){
					index = i;
					break;
				}
			}else{
				if( val == this[i]){
					index = i;
					break;
				}
			}
		}
		if(index>-1){
			this.splice(i, 1);
		}
	}
	return this;
};

/**
 * 方法:Array.putFirstByAttr(id, attr) 功能:根据关键字将元素放在数组首位
 * @param val 元素属性值
 * @param attr(string)
 * @returns {Array} 确保方法可链
 */
Array.prototype.putFirstByAttr = function(val, attr){
	if( isArrayLike(this) ){
		var item = this.getByAttr(val, attr);
		var index = this.getIndexByAttr(val, attr);
		if(index > 0){
			this.removeByAttr(val, attr);
			this.insertFirst(item);
			return this.getIndexByAttr(val, attr);
		}
	}
	return this;
};

/**
 * 方法:Array.updateListByAttr(item, attr) 功能:通过元素属性更新(替换)数组中的元素
 * 如果元素在列表中已存在则更新元素信息，如果元素在列表中不存在，则添加元素至列表末尾
 * @param val 元素属性值
 * @param attr
 * @returns {Array} 确保方法可链
 */
Array.prototype.updateArrayByAttr = function(val, attr){
	if( isArrayLike(this) ){
		var item = this.getByAttr(val, attr);
		var index = this.getIndexByAttr(val, attr);
		if(index == -1){
			if( item == null ){
				this.push(val);
			}else{
				this.push(item);
			}
		}else{
			this[index] = item;
		}
	}
	return this;
};
/******************************************************************************/