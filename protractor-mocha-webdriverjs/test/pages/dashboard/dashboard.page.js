
'use strict';

var DashboardPage = function(options) {

	this.url = '/';
	this.accountsTab = element(by.css('[ui-sref="accounts"]'));
	this.settingsTab = element(by.css('[ui-sref="settings"]'));
	this.periodSelect = element(by.model('vm.period'));

}

DashboardPage.prototype.go = function() {
	return browser
		.get(this.url);	
};

DashboardPage.prototype.getAccounts = function() {
	return this.accountsTab.click();
};

DashboardPage.prototype.getSettings = function() {
	return this.settingsTab.click();
};

DashboardPage.prototype.getNumberOfCategories = function() {
	
	browser.get(this.url, 5000);

	this.periodSelect.element(by.cssContainingText('option', 'All time')).click();

	return element.all(by.css('.chart .plot .bar')).then(function(elems) {
		
		return elems.length
	
	})

};

module.exports = DashboardPage;
