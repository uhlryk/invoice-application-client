/*jslint node: true */
'use strict';
(function(){
	require('angular');
	require('angular-ui-router');
	require('angular-ui-bootstrap');
	require('angular-resource');
	require('angular-dynamic-number');
	require('./config');
	require('./controllers');
	require('./services');
	require('./invoice/main');
	require('./customer/main');
	require('angular-animate');
	require('angular-moment');
	var app = angular.module('InvoiceApp', ['ngAnimate', 'ui.bootstrap', 'angularMoment', 'ui.router','dynamicNumber','ngResource', 'Config', 'InvoiceApp.Services', 'InvoiceApp.Controllers', 'InvoiceResource', 'CustomerResource']);
	app.config(['$locationProvider', function($locationProvider){
		$locationProvider.html5Mode(true);
	}]);
	angular.module('InvoiceApp').run(['$state', '$stateParams', function($state, $stateParams) {
		$state.go('invoices/list');
	}]);
})();