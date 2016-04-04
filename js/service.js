/*
* @Author: CC
* @Date:   2016-04-04 15:08:46
* @Last Modified by:   CC
* @Last Modified time: 2016-04-04 17:57:57
*/

'use strict';
(function(angular){
  //获取主模块
   var todoApp = angular.module('TodoApp');
   //注册服务
   //1、首先注册一个服务，注册方式就是借助于模块的service方法，service的参数主要是一个构造函数
   //2、使用这个服务时会自动构造一个对应的对象供使用
   //3、在需要使用该服务的控制器上注册该服务
todoApp.service('Storage',['$window',function($window){
	  function getId(){
			var id = Math.random();
			if(todos){
				for(var i = 0;i<todos.length;i++){
					if(todos[i].id === id){
						id = getId();
						break;
					}
				}
			}
				return id;
		};

 this.add = function(input){
 	 todos.push({
 	 	id: getId(),
 	 	text:input,
 	 	completed: false
 	 });

 	 this.saveTostorage();
 };
 this.change = function(){
    this.saveTostorage();
 };
 //编辑后回车键，离开编辑状态，currentEditingId=0；即可
 this.save = function(){
    currentEditingId = 0;
    this.saveTostorage();
 };
 //删除任务
 this.remove = function(current){
 	 var index = todos.indexOf(current);
 	 todos.splice(index,1);
 	 this.saveTostorage();
 };
 //全选：全部完成；点击全选按钮，为全部完成状态
 //遍历todos项，使completed：false；
 this.allCompleted = function(checkedAll){
   todos.forEach(todo => {todo.completed = checkedAll;});
 };
 //当有已完成项时显示clear completed ，没有则隐藏
//遍历todos，找到completed：true，就停止，返回true
//every（）；有一个不满足条件就跳出循环，返回false；some（）遇到满足条件的就返回true；
this.hasCompleted = function(){
  return todos.some(todo => todo.completed );
};
//点击clear completed 删除选中的完成项
this.clearCompleted = function(){
	//不能在循环中移除或新增数组元素
	//先找到所有未完成项，放到新数组中
	  var unCompleted = [];
    todos.forEach(todo => {
		if(!todo.completed){
			unCompleted.push(todo);
		}
	});
	console.log(unCompleted);
	  todos = unCompleted;
	//console.log($scope.todos);
	this.saveTostorage();
	return todos;
};

// 保存数据
// 保存在localStorage中，需要借助window对象，注入window对象
var storage = $window.localStorage;

var todos = JSON.parse(storage.getItem('my_todos') || '[]'); // x00001
 console.log(todos);
this.saveTostorage = function(){
	storage.setItem('my_todos',JSON.stringify(todos));
};
this.get=function(){
    return todos;
};
//将添加的数据记录到localStorage之后，要将记录在localStorage中的的值返回给原来的todos，绑定在主页面
 }]);
})(angular);
