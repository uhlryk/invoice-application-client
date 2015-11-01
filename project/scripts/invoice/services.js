module.exports = angular.module('InvoiceResource.Services', [])
.factory('Invoice', ['$resource','API_URL',function($resource, API_URL){
  return $resource(API_URL + '/invoice/:id',{id: '@id'});
}]);