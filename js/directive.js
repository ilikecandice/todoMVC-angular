/*
* @Author: CC
* @Date:   2016-04-04 18:34:10
* @Last Modified by:   CC
* @Last Modified time: 2016-04-04 18:37:51
*/
(function(angular){

'use strict';
//创建一个模块
var todoApp = angular.module('TodoApp');
todoApp.directive('autoFocus',[function(){
	return {
		link: function($scope,element,attributes){
			element.on('dblclick',function(){
				angular.element(this).find('input').eq(1)[0].focus();
			});
		}
	}
}]);
})(angular);
