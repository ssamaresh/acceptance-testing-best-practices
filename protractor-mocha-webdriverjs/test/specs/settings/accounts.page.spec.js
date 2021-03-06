/* jshint node: true */
/*jshint -W030 */

'use strict';

var expect = require('../chai-helpers').expect;
var AccountsPage = require('../../pages/settings/accounts.page');


// Account Creation
describe('Accounts Page', function() {

    var accountsPage;

    beforeEach(function() {
            
        this.timeout(50000);
        
        accountsPage = new AccountsPage();
        accountsPage.go();
    
    });

    it('Should go to the accounts page', function() {

        this.timeout(50000);

        browser.getCurrentUrl().then(function(currentUrl) {
            
            expect(currentUrl).to.equal('http://localhost:3000/settings/accounts');
        
        });

    });

    it('Should allow the creation of an account', function() {

        this.timeout(50000);
        
        browser.waitForAngular();
                    
        // Given an account called "cash"
        accountsPage.createAccount('cash');

        // Then the accounts page should show an account called "cash"
        accountsPage.doesAccountExist('cash').then(function(exists) {
            
            expect(exists).to.be.true;

        });

    });

    it('should allow changing the name of an account', function () {

        this.timeout(50000);

        browser.waitForAngular();

        // Given an account called "BofA Checking"
        accountsPage.createAccount('BofA Checking');

        // When I change the account name to "Bank of America Checking"
        accountsPage.changeAccountName('BofA Checking', 'Bank of America Checking');

        browser.waitForAngular();
        
        // Then the accounts page should show an account called "Bank of America Checking"
        accountsPage.doesAccountExist('Bank of America Checking').then(function(exists) {
            
            expect(exists).to.be.true;

        });

    });


});
