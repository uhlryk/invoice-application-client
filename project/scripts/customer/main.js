/*jslint node: true */
"use strict";
require("./controllers");
require("./services");
module.exports = angular.module('CustomerResource',['CustomerResource.Services', 'CustomerResource.Controllers']);
angular.module('CustomerResource').config(["$stateProvider", function($stateProvider){
  $stateProvider
  .state("customers/list", {
    url: "/customers/",
    templateUrl: "js/views/customers/list.html",
    controller : 'ListCustomerController',
    resolve : {
      list: ['Customer', function(Customer) {
        return Customer.query().$promise;
      }]
    }
  })
  .state("customers/show", {
    url : "/customers/:id/show",
    templateUrl: "js/views/customers/show.html",
    controller : "ShowCustomerController",
    resolve: {
      detail: ['$stateParams','Customer', function($stateParams, Customer){
        return Customer.get($stateParams).$promise;
      }]
    }
  })
  .state("customers/update", {
    url : "/customers/:id/update",
    templateUrl: "js/views/customers/update.html",
    controller : "UpdateCustomerController",
    resolve: {
      detail: ['$stateParams','Customer', function($stateParams, Customer){
        return Customer.get($stateParams).$promise;
      }]
    }
  })
  .state("customers/duplicate", {
    url : "/customers/:id/duplicate",
    templateUrl: "js/views/customers/update.html",
    controller : "DuplicateCustomerController",
    resolve: {
      detail: ['$stateParams','Customer', function($stateParams, Customer){
        return Customer.get($stateParams).$promise;
      }]
    }
  })
  .state("customers/create", {
    url : "/customers/new",
    templateUrl: "js/views/customers/create.html",
    controller : "CreateCustomerController"
  })
  ;
}]);