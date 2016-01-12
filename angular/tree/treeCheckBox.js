var app = angular.module('app', []);
app.controller('AppCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter){
	
	// $scope.role = "dd";
	// console.log("role===");	console.log(role);

	
	/*//TODO 给角色配置分组菜单问题，需要解决
	 * 方案一：从后台获取“所有的分组菜单”、“该角色下的分组菜单”，在前台通过方法B处理，让“该角色下的分组菜单”在“所有的分组菜单”中的复选框显示，
	 * 问题是方法B总是先执行，然后再从后台获取数据，
	 * 解决方法可能需要用的angular中的$q服务，但是没有实例，不会写。。。。。
	 */
	$scope.queryData = function(){
		//查询该角色下的分组菜单
/*		$http.get('Json/AllGroupMenus.json').success(function(data){
			if(data){
	    		$scope.allGroupMenus = data;
	    		console.log("该角色下的分组菜单$scope.allGroupMenus===");	console.log(data);
	    	}
		});
*/
		//查询该角色下的分组菜单
		$http.get('Json/groupMenusRole.json').success(function(data){
			if(data){
	    		$scope.groupMenusSelect = data;
	    		console.log("该角色下的分组菜单$scope.groupMenusSelect===");	console.log(data);
	    	}
		});


	};
	$scope.queryData();

	/**
	 * 遍历所有的分组菜单A--$scope.allGroupMenus，根据该角色下的分组菜单B--$scope.groupMenusSelect，给所有的分组菜单添加checked=true，注意两个数据结构的不同
	 * @param allGroupMenus 所有的分组菜单
	 * @param groupMenusSelect 该角色下的分组菜单
	 */
/*	$scope.transGroupMenus = function(allGroupMenus, groupMenusSelect){
		$scope.queryData();
		console.log("对比所有的分组菜单A--$scope.allGroupMenus、该角色下的分组菜单B--$scope.groupMenusSelect，给所有的分组菜单添加checked=true，注意两个数据结构的不同");
		console.log(allGroupMenus); console.log(groupMenusSelect); //输出是undefine  
		//TODO 我想先执行方法queryData获取数据，再执行方法transGroupMenus将数据转换，但实际情况，方法的执行顺序恰恰相反
		
		//遍历A
		_.each(allGroupMenus, function(groupMenu){
			console.log("A的分组groupMenu==");console.log(groupMenu);console.log("groupMenu.GROUP_ID="+groupMenu.GROUP_ID);
			//在B中的查找分组是否和A中的一样，确定每个分组的复选框的值
			console.log("在B中找到和A一样的分组==");
			_.each(groupMenusSelect, function(groupMenuSel){
				console.log("groupMenuSel=");console.log(groupMenuSel);
				groupMenu.checked = groupMenuSel.GROUP.GROUP_ID == groupMenu.GROUP_ID;
			});
			console.log(groupMenu);
//			groupMenu.checked = _.find($scope.groupMenusSelect, function(groupMenuSel){
//				console.log("	在B中的查找分组是否和A中的一样，确定每个分组的复选框的值");
//				console.log("		B的分组groupMenuSel==");console.log(groupMenuSel);
//				console.log("			groupMenu.GROUP_ID == groupMenuSel.GROUP.GROUP_ID=="+groupMenu.GROUP_ID == groupMenuSel.GROUP.GROUP_ID);
//				if( groupMenu.GROUP_ID == groupMenuSel.GROUP.GROUP_ID ){
//					//找到对应的分组后，遍历分组内的菜单，确定菜单复选框的值
//					_.each(groupMenu.FunMenus, function(funMenu){
//						funMenu.checked = _.find($scope.groupMenusSelect.MENUlist, function(menu){
//							return ;
//						});
//					});
//					return true;
//				}else{
//					return false;
//				}
//			});
		});
	};

	//转换数据
	$scope.transGroupMenus($scope.allGroupMenus,$scope.groupMenusSelect);
*/
	
	
	
	
	/* //TODO 给角色配置分组菜单问题，需要解决
	 * 方案二：在后台对比“所有的分组菜单”、“该角色下的分组菜单”，在前台直接获取已经添加checked=true的数据
	 * 问题：后台的数据没有问题，关键是传到前台后，只要分组添加了checked=true，其所有的子级都添加checked=true，而且，之前所做的“在某个分组下没有选择其所有菜单时，...等等效果没有了”
	 * 猜测可能是“冒泡机制”或者自己写的“监听机制”有问题，需要改进
	 */	
	//在后台处理所有的分组菜单，添加checked=true
	$http.get('Json/groupMenusChecked.json').success(function(data){
		if(data){
    		$scope.allGroupMenus = data;
    		console.log("该角色下的分组菜单$scope.allGroupMenus===");	console.log(data);
    	}
	});



	/**
	 * 全选方法 //TODO 待做
	 */	
	$scope.chkall = false; 
	console.log("全选的状态："+$scope.chkall); 
	  
	//全选框的点击事件
	$scope.checkAll = function(checked){
		console.log("全选的状态："+$scope.chkall); 
		angular.forEach(
	  			$scope.allGroupMenus,  //遍历数组
	  			function(value,key){  
	  				value.checked = checked;  //全选时，chkall=true，将 true 赋值给  数组元素的checked属性  
	  			}
	  	);
	};
	
	//脏值监控
	$scope.$watch(
	       'allGroupMenus',
	        function(nv, ov){  //新值  旧值的判断
	    	   console.log("新值==");console.log(nv);
	    	   console.log("旧值==");console.log(ov);
	            if(nv == ov){ 
	               return;
	            }
	            $scope.groupIds = [];  //存储GOURP_ID
	            $scope.menuIds = []; //存储MENU_ID
	            angular.forEach( 
	            	//TODO 能不能监听集合时，同时监听集合里的单个元素的变化
	                $filter('filter')(nv,{checked: true}),  //对于有变化的新值，将checked属性改为true
	                function(v) {  
	                	console.log("遍历"); console.log(v);
	                	console.log("遍历v.GROUP_ID"); console.log(v.GROUP_ID);
	                	console.log("遍历v.FunMenus"); console.log(v.FunMenus);
	            		_.each(v.FunMenus, function(funMenu){
	            			v.checked = true;
	            			funMenu.checked = true;
		              	    $scope.groupIds.push(v.GROUP_ID); //数组 放入元素  用 push
	            			$scope.menuIds.push(funMenu.MENU_ID); 
		        		});
	                } 
	            ); 
	            $scope.chkall = $scope.groupIds.length == $scope.allGroupMenus.length; //当没有全选时，chkall = false
	        }, 
	        true  // 格式写法。。。。
	    );
	
	
	
	//提交
/*	$scope.submit = function(groups){		
		console.log("提交groups");console.log(groups);
		//定义分组id和菜单id，接收要传递到后台的数据
		var groupIds = [];
		var menuIds = [];
		//遍历要提交的分组菜单，提取groupId menuId
		_.each(groups, function(group) {
			if( group.checked ){
				_.each(group.FunMenus, function(funMenu){
					if( funMenu.checked ){
						console.log("分组号=="+group.GROUP_ID);
						console.log("	菜单号=="+funMenu.MENU_ID);
						groupIds.push(group.GROUP_ID);
						menuIds.push(funMenu.MENU_ID);
					}
				});
			}
		});
		console.log("传递到后台的数据groupIds==");console.log(groupIds);
		console.log("传递到后台的数据menuIds==");console.log(menuIds);
		console.log("传递到后台的数据roleId==");console.log(role.ROLE_ID);
		$http({
			method:'post',
			url:'/service/menuRole!saveMenuRoles',
			data:{ROLE_ID:role.ROLE_ID,GROUP_IDS:groupIds,MENU_IDS:menuIds},
		}).success(function(data){
			if( data.success ){
				arp.alert("操作成功！");
			}else{
				arp.alert("操作失败！");
			}
		});		
	};
	*/
	

	/**
	 * 下面使用 Underscore.js，处理多选框的问题
	 * 一个JavaScript实用库，参考 http://www.css88.com/doc/underscore
	 */
	
	
	/**
	 * 当当前节点（有下级节点的）的选中状态发生变化时，其所有下级节点的选中状态也会随之变化
	 * @param group 当前节点（有下级节点的）
	 */
	$scope.groupChanged = function(group) {
		// console.log("groupChanged=="); console.log("参数当前节点group"); console.log(group);
		// console.log("当前节点的子节点group.FunMenus");	console.log(group.FunMenus);
		/**
		 * _.each(list, iteratee) 遍历集合list，对每个元素进行 iteratee 函数处理
		 */
		// 遍历当前节点的所有下级节点，将当前节点的选中状态同步到其所有的下级节点状态
		_.each(group.FunMenus, function(funMenu) {
			funMenu.checked = group.checked;
		});
	};
	

	/**
	 * 如果有任何一个子节点被选中，则其上级节点也选中
	 * @param funMenu 被选中的二级节点
	 * @param group 被选中的二级节点的上级节点
	 */
	$scope.menuChanged = function(funMenu, group) { 
		console.log("menuChanged===");
		console.log("参数  被选中的二级节点  funMenu");	console.log(funMenu);
		console.log("参数  被选中的二级节点的上级节点  group"); 	console.log(group);
		/**
		 * _.findWhere(list, properties)  遍历list，返回符合 properties参数所列出的 键-值 对的第一个值
		 */
		// 注意！checkbox的ng-model只能绑定到逻辑型值，所以不能直接把findWhere的结果赋值过去，所以用 !!进行类型转换
		console.log("找到选中的二级节点"); console.log(_.findWhere(group.FunMenus, {checked: true}));
		group.checked = !!_.findWhere(group.FunMenus, {checked: true});
	};

	
	/**
	 * 判断一级节点的下级节点，看“是否有被选中的下级节点”以及“是否有没有选中的下级节点”，
	 * 如果都有，则返回true，表示没有全选下级节点，那么当前一级节点前的复选框的透明级别应该是不透明的，执行样式 opacity: 0.3 ，
	 * 否则false，表示全选或者都不选，那么当前一级节点前的复选框的透明级别应该是不透明的，不执行样式 opacity: 0.3
	 * @param group 一级节点
	 * @returns {Boolean}
	 */
	$scope.isIntermediateGroup = function(group) {
		console.log("isIntermediateGroup=========");
		console.log("一级节点：");console.log(group);
		/**
		 * _.find(list, predicate)  遍历list，返回通过predicate真值检测的元素值，如果符合条件的返回undefined，找到后函数立即返回，不会遍历整个list
		 */
		// 是否有任何被选中的节点
		var hasChecked = _.find(group.FunMenus, function(funMenu) {
			console.log("	菜单funMenu==");console.log(funMenu);
			console.log("	菜单funMenu.checked==");console.log(funMenu.checked);
			return funMenu.checked; //true  
		});
		console.log("是否有任何被选中的节点   hasChecked==");console.log(hasChecked);
		// 是否有任何没有选中的节点
		var hasNoChecked = _.find(group.FunMenus, function(funMenu) {
			return !funMenu.checked;
		});
		console.log("是否有任何没有选中的节点   hasNoChecked==");console.log(hasNoChecked);
		// 如果同时有选中状态和非选中的节点，则为中间状态
		console.log("		复选框状态===="); console.log(hasChecked && hasNoChecked);
		return hasChecked && hasNoChecked;
	};

}]);

