module.exports = angular.module('CustomerResource.Services', [])
.factory('Customer', ['$resource','API_URL',function($resource, API_URL){
  return $resource(API_URL + '/customer/:id', {id: '@id'}, {
    update: {
      method: 'PUT'
    }
  });
}]);