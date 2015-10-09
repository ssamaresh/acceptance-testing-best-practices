/* jshint node: true */
/*jshint -W030 */

'use strict';

var expect = require('./support/chai-helpers').expect;
var AccountsPage = require('../pages/settings/accounts.page');

module.exports = function() {

 	this.accountsPage;
	
	this.Given(/^an account called "([^"]*)"$/, function (arg1) {
        
		this.accountsPage = new AccountsPage();

    browser.waitForAngular();

    console.log('arg1', arg1);
	  
	  this.accountsPage.createAccount(arg1);

    this.accountsPage.doesAccountExist(arg1).then(function(exists) {

    	console.log(exists);

			expect(exists).to.be.true;

    });

	});

	this.When(/^I change the account name to "([^"]*)"$/, function (arg1, callback) {

		this.accountsPage = new AccountsPage();

    browser.waitForAngular();

    console.log('arg1', arg1);


    // accountsPage.changeAccountName('BofA Checking', 'Bank of America Checking');
        
    //     // Then the accounts page should show an account called "Bank of America Checking"
    //     accountsPage.doesAccountExist('Bank of America Checking').then(function(exists) {
            
    //         expect(exists).to.be.true;

    //     });

  	
  	callback.pending();
	
	});

	this.Then(/^the account list should show an account called "([^"]*)"$/, function (arg1, callback) {
	  // Write code here that turns the phrase above into concrete actions
	  callback.pending();
	});


};