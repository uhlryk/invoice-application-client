module.exports = angular.module('CustomerResource.Controllers', [])
.controller('ListCustomerController',['$scope','$window', '$stateParams', '$modal','list', 'Customer',
  function($scope, $window, $stateParams, $modal, list, Customer)
{
  $scope.$emit("changePanelTitle","Lista kontrahentów");
  $scope.customers = list;
  $scope.open = function (customerIndex, customerNip) {
    var customerModel = $scope.customers[customerIndex];
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'deleteAskModal',
      controller: 'DeleteCustomerController',
      resolve: {
        nip: function () {
          return customerNip;
        }
      }
    });
    modalInstance.result.then(function (response) {
      return Customer.remove({id:customerModel.id}).$promise;
    }, function () {
    })
    .then(function(){
      $scope.customers.splice(customerIndex, 1);
      $scope.$emit("changeSuccessMessage", "Usunięto kontrahenta");
    });
  };
}])
.controller('DeleteCustomerController', ['$scope', '$modalInstance', 'nip', function ($scope, $modalInstance, nip) {
  $scope.nip = nip;
  $scope.ok = function () {
    $modalInstance.close();
  };
  $scope.cancel = function () {
    $modalInstance.dismiss();
  };
}])
.controller('ShowCustomerController',['$scope','$state', '$stateParams','$modal','detail', 'Customer',
  function($scope, $state, $stateParams, $modal, detail, Customer)
{
  $scope.$emit("changePanelTitle","Szczegóły kontrahenta NIP: " + detail.nip);
  $scope.customer = detail;
  $scope.open = function () {
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'deleteAskModal',
      controller: 'DeleteCustomerController',
      resolve: {
        nip: function () {
          return $scope.customer.nip;
        }
      }
    });
    modalInstance.result.then(function (response) {
      return Customer.remove({id:$scope.customer.id}).$promise;
    }, function () {
    })
    .then(function(customer){
      console.log(customer);
      if(customer){
        $state.go('customers/list');
        $scope.$emit("changeSuccessMessage", "Usunięto kontrahenta");
      }
    });
  };
}])
.controller('UpdateCustomerController',['$scope','$state', '$parse','detail',function($scope, $state, $parse, detail){
  $scope.$emit("changePanelTitle","Edycja kontrahenta NIP: " + detail.nip);
  $scope.customer = detail;
  $scope.updateCustomer = function() {
    $scope.customer.$update(function(customer) {
      $state.go('customers/list');
      $scope.$emit("changeSuccessMessage", "Edytowano kontrahenta");
    }, function(response){
      if(response && response.data && response.data.error && response.data.error.details ) {
        var errors = response.data.error.details;
        errors.forEach(function(val){
          var serverMessage = $parse('customerForm.'+val.path+'.$error.serverMessage');
          $scope.customerForm.$setValidity(val.path, false, $scope.customerForm);
          serverMessage.assign($scope, val.message);
        });
      }
    });
  };
}])
.controller('DuplicateCustomerController',['$scope','$state', '$parse','detail',function($scope, $state, $parse, detail){
  $scope.$emit("changePanelTitle","Powiel kontrahenta NIP: " + detail.nip);
  delete detail.id;
  $scope.customer = detail;
  $scope.updateCustomer = function() {
    $scope.customer.$save(function(customer) {
      $state.go('customers/list');
      $scope.$emit("changeSuccessMessage", "Duplikowano kontrahenta");
    }, function(response){
      if(response && response.data && response.data.error && response.data.error.details ) {
        var errors = response.data.error.details;
        errors.forEach(function(val){
          var serverMessage = $parse('customerForm.'+val.path+'.$error.serverMessage');
          $scope.customerForm.$setValidity(val.path, false, $scope.customerForm);
          serverMessage.assign($scope, val.message);
        });
      }
    });
  };
}])
.controller('CreateCustomerController',['$scope','$state', '$parse','Customer',function($scope, $state, $parse, Customer){
  $scope.$emit("changePanelTitle","Nowy kontrahent");
  $scope.customer = new Customer();
  $scope.addCustomer = function() {
    $scope.customer.$save(function(customer) {
      $state.go('customers/list');
      $scope.$emit("changeSuccessMessage", "Utworzono kontrahenta");
    }, function(response){
      if(response && response.data && response.data.error && response.data.error.details ) {
        var errors = response.data.error.details;
        errors.forEach(function(val){
          var serverMessage = $parse('customerForm.'+val.path+'.$error.serverMessage');
          $scope.customerForm.$setValidity(val.path, false, $scope.customerForm);
          serverMessage.assign($scope, val.message);
        });
      }
    });
  };
}]);