(function (angular) {
	'use strict';
	//给新添加事项添加id

 //创建一个模块
 var todoApp = angular.module('TodoApp',[]);
 //定义一个主控制器
 todoApp.controller('mainController',['$scope',function($scope){
 	//初始化数据
 	$scope.input = '';
 	//定义一个变量id记录状态，如果currentEditingId == todo.id,就认为是编辑状态，添加editing类名；
 	$scope.currentEditingId = 0;

 	$scope.todos = [
	 	{id :getId(), text :'HTML',completed:true,editing:false},
	 	{id :getId()getId(), text :'CSS',completed:true,editing:false},
	 	{id :getId(), text :'JS',completed:false,editing:false}
 	];
 	//双击编辑
 	$scope.edit = function(id){
    	$scope.currentEditingId = id;
 	};
 //按回车添加事项
 //添加注意：将新内容添加到todos里面，需要一个id值，每项TODO的id值不同即可，不用按顺序排列；
 	function getId(){
		var id = Math.random();
		if($scope.todos){
			for(var i = 0;i<$scope.todos.length;i++){
				if($scope.todos[i].id === id){
					id = getId();
					break;
				}
			}
		}
			return id;
	};
 $scope.add = function(){
 	if(!$scope.input)return;
 	 $scope.todos.push({
 	 	id: getId(),
 	 	text:$scope.input,
 	 	completed: false
 	 });
 	 $scope.input = '';
 };
 //编辑后回车键，离开编辑状态，currentEditingId=0；即可
 $scope.save = function(){
    $scope.currentEditingId = 0;
 };
 //删除任务
 $scope.remove = function(current){
 	 var index = $scope.todos.indexOf(current);
 	 $scope.todos.splice(index,1);
 };
 //全选：全部完成；点击全选按钮，为全部完成状态
 //遍历todos项，使completed：false；
 $scope.checkedAll = false;
 $scope.allCompleted = function(){
   $scope.todos.forEach(todo => {todo.completed = $scope.checkedAll;});
 };
 //当有已完成项时显示clear completed ，没有则隐藏
//遍历todos，找到completed：true，就停止，返回true
//every（）；有一个不满足条件就跳出循环，返回false；some（）遇到满足条件的就返回true；
$scope.hasCompleted = function(){
  return $scope.todos.some(todo => todo.completed );
};
//点击clear completed 删除选中的完成项
$scope.clearCompleted = function(){
	//不能在循环中移除或新增数组元素
	//先找到所有未完成项，放到新数组中
	var unCompleted = [];
	$scope.todos.forEach(todo => {
		if(!todo.completed){
			unCompleted.push(todo);
		}
	});
	$scope.todos = unCompleted;
};
//点击all，active，completed，切换显示相应数据
 $scope.changeFilter = function(completed){
 	$scope.filterData = completed;
 };
//可以用锚点变化来改变数据：
//在angular中有$location变量，可以用来获取url中的锚点值
//$location.url 得到的是#后面的值
var url = $location.url();
switch(url){
	case '/active':
	  $scope.filterData = {'completed':false}};
		break;
		case '/completed':
	  $scope.filterData = {'completed':false}};
		break;

};





 }]);


})(angular);
