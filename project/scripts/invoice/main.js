/*jslint node: true */
"use strict";
require("./controllers");
require("./services");
module.exports = angular.module('InvoiceResource',['InvoiceResource.Services', 'InvoiceResource.Controllers']);
angular.module('InvoiceResource').config(["$stateProvider", function($stateProvider){
  $stateProvider
  .state("invoices/list", {
    url: "/invoices/",
    templateUrl: "js/views/invoices/list.html",
    controller : 'ListInvoiceController',
    resolve : {
      list: ['Invoice', function(Invoice) {
        return Invoice.query().$promise;
      }],
    }
  })
  .state("invoices/show", {
    url : "/invoices/:id/show",
    templateUrl: "js/views/invoices/show.html",
    controller : "ShowInvoiceController",
    resolve: {
      detail: ['$stateParams','Invoice', function($stateParams, Invoice){
        return Invoice.get({ id: $stateParams.id }).$promise;
      }]
    }
  })
  .state("invoices/create", {
    url : "/invoices/new",
    templateUrl: "js/views/invoices/create.html",
    controller : "CreateInvoiceController",
    resolve: {
      customers: ['Customer', function(Customer){
        return Customer.query().$promise;
      }],
      detail : function(){
        return null;
      }
    }
  })
  .state("invoices/pdf", {
    url : "/invoices/:id/pdf",
    controller : "PdfInvoiceController"
  })
  .state("invoices/duplicate", {
    url : "/invoices/:id/duplicate",
    templateUrl: "js/views/invoices/create.html",
    controller : "CreateInvoiceController",
    resolve: {
      customers: ['Customer', function(Customer){
        return Customer.query().$promise;
      }],
      detail: ['$stateParams','Invoice', function($stateParams, Invoice){
        return Invoice.get({ id: $stateParams.id }).$promise;
      }]
    }
  })
  ;
}]);