describe('base tests', function() {
  it('should automatically redirect to /invoices when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/invoices");
  });
  describe("add customer",function(){
    beforeEach(function(){
      browser.get('index.html');
      browser.controlFlow().execute(function() {
        var target;
        element.all(by.css('.sidebar a')).each(function(elem){
          return elem.getAttribute('ui-sref').then(function(uiSref){
            if(uiSref === 'customers/create'){
              target = elem;
            }
          });
        }).then(function(){
          target.click();
        });
      });
    });
    it('should render form', function(){
      expect(element(by.name('customerForm')).isPresent()).toBe(true);
      expect(element(by.model('customer.firmname_1')).isPresent()).toBe(true);
      expect(element(by.model('customer.firmname_2')).isPresent()).toBe(true);
      expect(element(by.model('customer.firmname_3')).isPresent()).toBe(true);
      expect(element(by.model('customer.address_1')).isPresent()).toBe(true);
      expect(element(by.model('customer.address_2')).isPresent()).toBe(true);
      expect(element(by.model('customer.address_3')).isPresent()).toBe(true);
      expect(element(by.model('customer.nip')).isPresent()).toBe(true);
      expect(element(by.buttonText('Zapisz')).isPresent()).toBe(true);
    });
    it('should invalidate form if customer.firmname_1,customer.address_1,customer.nip is empty, and that fields', function(){
      element(by.buttonText('Zapisz')).click();
      element(by.name('customerForm')).getAttribute('class').then(function (classes) {
        var classList=classes.split(' ');
        expect(classList.indexOf('ng-invalid')).not.toEqual(-1);
        expect(classList.indexOf('ng-submitted')).not.toEqual(-1);
      });
      element(by.model('customer.firmname_1')).getAttribute('class').then(function (classes) {
        var classList=classes.split(' ');
        expect(classList.indexOf('ng-invalid')).not.toEqual(-1);
        expect(classList.indexOf('ng-invalid-required')).not.toEqual(-1);
      });
      element(by.model('customer.firmname_2')).getAttribute('class').then(function (classes) {
        var classList=classes.split(' ');
        expect(classList.indexOf('ng-invalid')).toEqual(-1);
        expect(classList.indexOf('ng-invalid-required')).toEqual(-1);
      });
      element(by.model('customer.firmname_3')).getAttribute('class').then(function (classes) {
        var classList=classes.split(' ');
        expect(classList.indexOf('ng-invalid')).toEqual(-1);
        expect(classList.indexOf('ng-invalid-required')).toEqual(-1);
      });
      element(by.model('customer.address_1')).getAttribute('class').then(function (classes) {
        var classList=classes.split(' ');
        expect(classList.indexOf('ng-invalid')).not.toEqual(-1);
        expect(classList.indexOf('ng-invalid-required')).not.toEqual(-1);
      });
      element(by.model('customer.address_2')).getAttribute('class').then(function (classes) {
        var classList=classes.split(' ');
        expect(classList.indexOf('ng-invalid')).toEqual(-1);
        expect(classList.indexOf('ng-invalid-required')).toEqual(-1);
      });
      element(by.model('customer.address_3')).getAttribute('class').then(function (classes) {
        var classList=classes.split(' ');
        expect(classList.indexOf('ng-invalid')).toEqual(-1);
        expect(classList.indexOf('ng-invalid-required')).toEqual(-1);
      });
      element(by.model('customer.nip')).getAttribute('class').then(function (classes) {
        var classList=classes.split(' ');
        expect(classList.indexOf('ng-invalid')).not.toEqual(-1);
        expect(classList.indexOf('ng-invalid-required')).not.toEqual(-1);
      });
    });
    it('should send fields and redirect to customers/', function(){
      browser.ignoreSynchronization = true;
      var firmname =  element(by.model('customer.firmname_1'));
      var address = element(by.model('customer.address_1'));
      var nip = element(by.model('customer.nip'));
      firmname.sendKeys('sometext');
      nip.sendKeys('12345678');
      address.sendKeys('someaddress');
      element(by.buttonText('Zapisz')).click();
      expect(browser.getLocationAbsUrl()).toMatch("/customers");
      protractor.promise.controlFlow().execute(function () {});
    });
  });
  describe("check links from customer list", function(){
    beforeEach(function(){
      browser.ignoreSynchronization = false;
      browser.get('index.html');
      browser.controlFlow().execute(function() {
        var target;
        element.all(by.css('.sidebar a')).each(function(elem){
          return elem.getAttribute('ui-sref').then(function(uiSref){
            if(uiSref === 'customers/list'){
              target = elem;
            }
          });
        }).then(function(){
          target.click();
        });
      });
    });
    it('should move to customer details', function(){
      element.all(by.linkText('Szczegóły')).first().click();
      browser.waitForAngular();
      expect(element(by.binding('panelTitle')).getText()).toMatch('Szczegóły kontrahenta NIP:');
    });
    it('should move to customer duplicate', function(){
      element.all(by.linkText('Powiel')).first().click();
      browser.waitForAngular();
      expect(element(by.binding('panelTitle')).getText()).toMatch('Powiel kontrahenta NIP:');
    });
    it('should move to customer details', function(){
      element.all(by.linkText('Edycja')).first().click();
      browser.waitForAngular();
      expect(element(by.binding('panelTitle')).getText()).toMatch('Edycja kontrahenta NIP:');
    });
  });
});