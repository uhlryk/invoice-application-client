/*jslint node: true */
"use strict";
module.exports = angular.module('InvoiceApp.Controllers',[])
.controller("TopMenuController", ['$scope', function($scope){
}])
.controller("SideMenuController", ['$scope', function($scope){
	$scope.menu =[];
	$scope.menu.push({
		title : "Faktury",
		group : [
			{name : "Lista", state : "invoices/list"},
			{name : "Dodaj", state : "invoices/create"}
		]
	});
	$scope.menu.push({
		title : "Kontrahenci",
		group : [
			{name : "Lista", state : "customers/list"},
			{name : "Dodaj", state : "customers/create"}
		]
	});
}])
.controller("MainController", ['$scope', '$timeout', '$state', function($scope, $timeout, $state){
	$scope.$on('changePanelTitle', function(event, title){
		$scope.panelTitle = title;
	});
	$scope.successMessage = "";
	$scope.errorMessage = "";
	var successTimeout, errorTimeout;
	$scope.$on('changeSuccessMessage', function(event, message){
		$scope.successMessage = message;
		$timeout.cancel(successTimeout);
		successTimeout = $timeout(function(){
			$scope.successMessage = "";
		}, 35000);
	});
	$scope.$on('changeErrorMessage', function(event, message){
		$scope.errorMessage = message;
		$timeout.cancel(errorTimeout);
		errorTimeout = $timeout(function(){
			$scope.errorMessage = "";
		}, 35000);
	});
	$scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		$timeout.cancel(successTimeout);
		$timeout.cancel(errorTimeout);
		$scope.successMessage = "";
		$scope.errorMessage = "";
	});
}])


;
