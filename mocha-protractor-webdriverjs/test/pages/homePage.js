var expect = require('../support/chai-helpers').expect;

var config = require('./config.js');

var HomePage = function(options) {

	var currentUrl = config.config.baseUrl;
	var dashboardTab = element(by.css('[ui-sref="dashboard"]'));
	var accountsTab = element(by.css('[ui-sref="accounts"]'));
	var settingsTab = element(by.css('[ui-sref="settings"]'));

}

HomePage.prototype.url = function() {
	return browser.get(currentUrl);	
};

HomePage.prototype.getDashboard = function() {
	return dashboardTab.click();
};

HomePage.prototype.getAccounts = function() {
	return accountsTab.click();
};

HomePage.prototype.getSettings = function() {
	return settingsTab.click();
};
