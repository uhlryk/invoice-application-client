module.exports = angular.module('InvoiceResource.Controllers', [])
.controller('ListInvoiceController',['$scope', '$stateParams', 'list',function($scope, $stateParams, list){
  $scope.$emit("changePanelTitle","Lista faktur");
  $scope.invoices = list;
}])
.controller('ShowInvoiceController',['$scope','$state', '$stateParams','$modal','detail',
  function($scope, $state, $stateParams, $modal, detail)
{
  $scope.$emit("changePanelTitle","Szczegóły Faktury : " + detail.invoice_number);
  $scope.invoice = detail;
}])
.controller('PdfInvoiceController',['$scope','$state', '$stateParams','$modal','$window','API_URL',
  function($scope, $state, $stateParams, $modal, $window,API_URL)
{
  $window.open(API_URL+'/invoice/'+$stateParams.id+'/pdf', "windowName");
  $state.go('invoices/list');
}])
.controller('CreateInvoiceController',['$scope','$state', '$parse', 'Invoice', 'detail','customers', 'CURRENCY',
  function($scope, $state, $parse, Invoice, detail, customers, CURRENCY)
{
  $scope.customers = customers;
  $scope.items = [];
  $scope.vatRateItems = [];
  $scope.sum = {value_net:0, value_vat:0, value_gross:0};
  if(detail){
    delete detail.id;
    $scope.invoice = detail;
    $scope.items = detail.InvoiceItems;
    $scope.vatRateItems = detail.ValueTaxRates;
    $scope.sum.value_net = detail.value_net;
    $scope.sum.value_vat = detail.value_vat;
    $scope.sum.value_gross = detail.value_gross;
    $scope.invoice.invoice_date = new Date($scope.invoice.invoice_date);
    $scope.invoice.sale_date = new Date($scope.invoice.sale_date);
    $scope.invoice.customer_id = detail.CustomerDetailId;
  } else{
    $scope.invoice = new Invoice();
    $scope.invoice.currency = CURRENCY;
    $scope.invoice.actual_payment = 0;
    $scope.invoice.payment_method = 'przelew';
    $scope.invoice.invoice_date = new Date();
    $scope.invoice.sale_date = new Date();
    $scope.invoice.invoice_number = "";
  }
  $scope.$emit("changePanelTitle","Nowa faktura");
  $scope.invoice.invoiceItemList = $scope.items;
  $scope.createInvoice = function() {
    $scope.isSubmit = true;
    if($scope.invoiceForm.$valid) {
      $scope.invoice.$save(function(invoice) {
        invoice.invoice_date = new Date(invoice.invoice_date);
        invoice.sale_date = new Date(invoice.sale_date);
        $state.go('invoices/list');
        $scope.$emit("changeSuccessMessage", "Utworzono fakturę");
      }, function(response){
        if(response && response.data && response.data.error && response.data.error.details ) {
          var errors = response.data.error.details;
          errors.forEach(function(val){
            var serverMessage = $parse('invoiceForm.'+val.path+'.$error.serverMessage');
            $scope.invoiceForm.$setValidity(val.path, false, $scope.invoiceForm);
            serverMessage.assign($scope, val.message);
          });
        } else if(response.status === 500){
          $scope.$emit("changeErrorMessage", "Wystąpił problem");
        }
      });
    }
  };
  $scope.addInvoiceItem =function() {
    $scope.items.push({
      name:"",quantity:1,unit:"szt.",price_net:0,vat_rate:23,value_net:0,value_vat:0,value_gross:0
    });
  };
  if(!detail){
    $scope.addInvoiceItem();
  }
  $scope.removeInvoiceItem = function(index){
    $scope.items.splice(index, 1);
  };
  $scope.$watch('invoice.actual_payment',function(){
    $scope.value_balance = $scope.sum.value_gross - $scope.invoice.actual_payment;
  }, true);
  $scope.$watch('items' , function(){
    $scope.vatRateItems = [];
    $scope.sum = {value_net:0, value_vat:0, value_gross:0};
    $scope.items.forEach(function(item){
      var vat_rate = item.vat_rate || 0;
      item.value_net = item.quantity * item.price_net;
      item.value_vat = item.value_net * vat_rate / 100;
      item.value_gross = item.value_net + item.value_vat;

      $scope.sum.value_net += item.value_net;
      $scope.sum.value_vat += item.value_vat;
      $scope.sum.value_gross += item.value_gross;

      var isFindVatRateItem = false;
      for(var i =0; i< $scope.vatRateItems.length; i++){
        var vatRateItem = $scope.vatRateItems[i];
        if(vatRateItem.vat_rate === String(vat_rate)){
          isFindVatRateItem = true;
          vatRateItem.value_net += item.value_net;
          vatRateItem.value_vat += item.value_vat;
          vatRateItem.value_gross += item.value_gross;
          break;
        }
      }
      if(isFindVatRateItem === false) {
        $scope.vatRateItems.push({vat_rate:String(vat_rate), value_net:item.value_net, value_vat:item.value_vat, value_gross:item.value_gross});
      }
    });
    $scope.value_balance = $scope.sum.value_gross - $scope.invoice.actual_payment;
  }, true);
  $scope.$watch('vatRateItems' , function(){},true);
  $scope.$watch('sum' , function(){},true);
}]);