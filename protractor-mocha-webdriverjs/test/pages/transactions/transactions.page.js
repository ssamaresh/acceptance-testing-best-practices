
'use strict';

var TransactionsPage = function() {

	this.EC = protractor.ExpectedConditions;
	this.url = '/accounts';
	this.accountsPanel = element(by.css('.accountsPanel'));
	this.transactionPanel = element(by.css('.transactionsPanel'));
	this.addTransactionBtn = this.transactionPanel.element(by.css('.btn'));
	this.transactionForm = element(by.css('form[name=transactionForm]'));


};

TransactionsPage.prototype.go = function() {
	return browser
		.get(this.url, 20000);
};

TransactionsPage.prototype.createTransaction = function(transaction) {


	var amount = (transaction.payment.length > 0) ? transaction.payment : transaction.deposit;
	var amountElement = (transaction.payment.length > 0) ? 'payment' : 'deposit';
	var txn_date = transaction.date.replace(/\//g, '');  // remove slashes

	browser.get(this.url, 20000);
	element.all(by.cssContainingText('[ui-sref="accounts.detail({accountId: a.id})"]', transaction.account)).click();
	browser.wait(this.EC.elementToBeClickable(this.addTransactionBtn, 5000));
	this.addTransactionBtn.click();
	element(by.model('vm.txn.txn_date')).sendKeys(txn_date);
	element(by.model('vm.txn.payee')).clear().sendKeys(transaction.payee);
	element(by.model('vm.txn.memo')).clear().sendKeys(transaction.memo);
	element(by.model('vm.txn.category.id')).sendKeys(transaction.category);
	element(by.model('vm.txn.'+amountElement)).clear().sendKeys(amount);
	this.transactionForm.submit();
	
};

TransactionsPage.prototype.changePaymentAmount = function(account, payee, newAmount) {
	
	var transaction = element(by.cssContainingText('.transactions-columnPayee', payee));
	var transactionRow = transaction.element(by.xpath('ancestor::tr'));

	browser.get(this.url, 5000);
	element.all(by.cssContainingText('[ui-sref="accounts.detail({accountId: a.id})"]', account)).click();
	browser.wait(this.EC.visibilityOf(element(by.css('.transactionsPanel'))), 5000);
	transactionRow.click();
	browser.wait(this.EC.visibilityOf(this.transactionForm), 5000);
	element(by.model('vm.txn.payment')).clear().sendKeys(newAmount);
	this.transactionForm.submit();

};

TransactionsPage.prototype.getTransactionForPayee = function(account, payee) {

	var transactionRow;
	var result = {};
	var tasks = [];
	var transaction = element(by.cssContainingText('.transactions-columnPayee', payee));
	var transactionRow = transaction.element(by.xpath('ancestor::tr'));

	browser.get(this.url, 5000);
	element.all(by.cssContainingText('[ui-sref="accounts.detail({accountId: a.id})"]', account)).click();
	browser.wait(this.EC.visibilityOf(element(by.css('.transactionsPanel'))), 5000);


	tasks.push(
		element.all(by.cssContainingText('[ui-sref="accounts.detail({accountId: a.id})"]', account)).getText()
	);
	tasks.push(
		transactionRow.element(by.css('.transactions-columnDate')).getText()
	);
	tasks.push(
		transactionRow.element(by.css('.transactions-columnPayee')).getText()
	);
	tasks.push(
		transactionRow.element(by.css('.transactions-columnMemo')).getText()
	);
	tasks.push( 
		transactionRow.element(by.css('.transactions-columnCategory')).getText()
	);
	tasks.push(
		transactionRow.element(by.css('.transactions-columnPayment')).getText()
	);
	tasks.push(
		transactionRow.element(by.css('.transactions-columnDeposit')).getText()
	);

	return Promise.all(tasks)
		.then(function(values) {
     	result.account = values[0][0];
     	result.date = values[1];
     	result.payee = values[2];
     	result.memo = values[3];
     	result.category = values[4];
     	result.payment = values[5];
     	result.deposit = values[6];

  		return result;
		});

};

TransactionsPage.prototype.deleteTransaction = function(account, payee) {
	
	var transaction = element(by.cssContainingText('.transactions-columnPayee', payee));
	var transactionRow = transaction.element(by.xpath('ancestor::tr'));

	browser.get(this.url, 5000);
	element.all(by.cssContainingText('[ui-sref="accounts.detail({accountId: a.id})"]', account)).click();
	browser.wait(this.EC.visibilityOf(element(by.css('.transactionsPanel'))), 5000);
	transactionRow.click();
	browser.wait(this.EC.visibilityOf(this.transactionForm), 5000);
	this.transactionForm.element(by.cssContainingText('button', 'Delete')).click();

};

TransactionsPage.prototype.doesTransactionExist = function(account, payee) {

	browser.get(this.url, 5000);
	element.all(by.cssContainingText('[ui-sref="accounts.detail({accountId: a.id})"]', account)).click();
	browser.wait(this.EC.visibilityOf(element(by.css('.transactionsPanel'))), 5000);
	return element.all(by.cssContainingText('.transactions-columnPayee', payee)).then(function(name) {
		return name.length > 0;
	});

};

module.exports = TransactionsPage;