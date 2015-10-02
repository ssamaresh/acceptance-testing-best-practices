/* jshint node: true */
/*jshint -W030 */

'use strict';

var expect = require('../chai-helpers').expect;
var AccountsPage = require('../../pages/settings/accounts.page');
var CategoriesPage = require('../../pages/settings/categories.page');
var TransactionsPage = require('../../pages/transactions/transactions.page');


describe('Transactions Page', function() {

	var transactionsPage;

	beforeEach(function() {

        this.timeout(50000);
        
        transactionsPage = new TransactionsPage();

        /* ----- Background ----- */
        
        // Given an account called "Amazon VISA"
        var accountsPage = new AccountsPage();
        accountsPage.createAccount('Amazon VISA');

        // Given a category called "Auto & Transport"
        var categoriesPage = new CategoriesPage();
        categoriesPage.createCategory('Auto & Transport');

        transactionsPage.go();

	});

    
	it('Should allow the creation of a transaction', function() {

        this.timeout(50000);

   	    browser.waitForAngular();

		// Given a transaction with the following properties
        var transaction = {
            account: 'Amazon VISA',
            date: '02/01/2015',
            payee: 'Chevron Gas Station',
            memo: 'Gas',
            category: 'Auto & Transport',
            payment: '30.00',
            deposit: ''
        };

        transactionsPage.createTransaction(transaction);

        // Then the transactions page should show the transaction
        transactionsPage.getTransactionForPayee(transaction.account, transaction.payee).then(function(result) {
        
            expect(result).to.deep.equal(transaction);
        
        });

    });

    it('should allow changing the payment amount of a transaction', function() {

        this.timeout(50000);

        browser.waitForAngular();
        
        // Given a transaction with the following properties
        var transaction = {
            account: 'Amazon VISA',
            date: '02/01/2015',
            payee: 'Chevron Gas Station',
            memo: 'Gas',
            category: 'Auto & Transport',
            payment: '30.00',
            deposit: ''
        };
        
        transactionsPage.createTransaction(transaction);

        // When I change the payment amount to 50.00
        transaction.payment = '50.00';
        
        transactionsPage.changePaymentAmount(transaction.account, transaction.payee, transaction.payment);

        // Then the transactions page should show the modified transaction
        transactionsPage.getTransactionForPayee(transaction.account, transaction.payee).then(function(result) {

            expect(result).to.deep.equal(transaction);

        });
        
    });

    it('should allow the deletion of a transaction', function () {

        this.timeout(50000);

        browser.waitForAngular();

        // Given a transaction with the following properties
        var transaction = {
            account: 'Amazon VISA',
            date: '02/01/2015',
            payee: 'Chevron Gas Station',
            memo: 'Gas',
            category: 'Auto & Transport',
            payment: '30.00',
            deposit: ''
        };

        transactionsPage.createTransaction(transaction);

        // When I delete the transaction
        transactionsPage.deleteTransaction(transaction.account, transaction.payee);

        // Then the transaction should not exist
        
        transactionsPage.doesTransactionExist(transaction.account, transaction.payee).then(function(exists) {
            
            expect(exists).to.be.false;

        });

    });

});