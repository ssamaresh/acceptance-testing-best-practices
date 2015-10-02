/* jshint node: true */

'use strict';

var SettingsPage = function() {

	this.url = '/settings';
	this.accountsTab = element(by.css('[ui-sref="settings.accounts"]'));
	this.categoriesTab = element(by.css('[ui-sref="settings.categories"]'));

};

SettingsPage.prototype.go = function() {
	return browser
		.get(this.url);	
};

SettingsPage.prototype.getAccountsTab = function() {

	browser.get(this.url, 5000);
	return this.accountsTab.click();

};

SettingsPage.prototype.getCategoriesTab = function() {

	browser.get(this.url, 5000);
	return this.categoriesTab.click();

};




module.exports = SettingsPage;
