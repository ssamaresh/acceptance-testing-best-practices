'use strict';


var AccountsPage = function() {

	this.url = '/settings/accounts';
	this.accountAddForm = element(by.className('accountAddForm'));
	this.accountName = element(by.model('vm.addAccountName'));

}

AccountsPage.prototype.go = function() {
	return browser
		.get(this.url, 20000);
};

AccountsPage.prototype.createAccount = function(accountName) {
		
		this.go();
		
		this.accountName.clear();
		
		this.accountName.sendKeys(accountName);

		this.accountAddForm.submit();

};

AccountsPage.prototype.changeAccountName = function(currentName, newName) {

	this.go();

	var accountRow = element(by.cssContainingText('.accountView', currentName));

	accountRow.click();

	var accountForm = accountRow.element(by.xpath('following-sibling::form'));

	accountForm.click();
	
	var nameField = accountForm.element(by.model('vm.editedAccount.name'));
	
	nameField.clear();
	
	nameField.sendKeys(newName);

	accountForm.submit();

};

AccountsPage.prototype.doesAccountExist = function(accountName) {

	this.go();
	 
 	return element.all(by.cssContainingText('.accountView', accountName)).then(function(name) {
		
		return name.length > 0;

	});

};

module.exports = AccountsPage;
