'use strict';

var expect = require('../chai-helpers').expect;
var AccountsPage = require('../../pages/settings/accounts.page');
var CategoriesPage = require('../../pages/settings/categories.page');
var TransactionsPage = require('../../pages/transactions/transactions.page');
var DashboardPage = require('../../pages/dashboard/dashboard.page');

describe('Dashboard Page', function() {

	var dashboardPage;

  beforeEach(function() {

    this.timeout(50000);

    dashboardPage = new DashboardPage();

    /* ----- Background ----- */
    // Given the following accounts
    var accountsPage = new AccountsPage();
    accountsPage.createAccount('Cash');
    accountsPage.createAccount('Credit');

    // And the following categories
    var categoriesPage = new CategoriesPage();
    categoriesPage.createCategory('Auto & Transport');
    categoriesPage.createCategory('Food & Dining');

    // And the following transactions
    var transactionsPage = new TransactionsPage();
    
    transactionsPage.createTransaction(
    	{
        account: 'Cash',
        date: '01/01/2015',
        payee: 'Gas Station',
        memo: 'Gas',
        category: 'Auto & Transport',
        payment: '10.00',
        deposit: ''
    	}
  	);

    transactionsPage.createTransaction(
    	{
        account: 'Credit',
        date: '01/02/2015',
        payee: 'Grocery Store',
        memo: 'Food',
        category: 'Food & Dining',
        payment: '20.00',
        deposit: ''
    	}
  	);

    transactionsPage.createTransaction(
    	{
        account: 'Cash',
        date: '01/03/2015',
        payee: 'Gas Station',
        memo: 'Gas',
        category: 'Auto & Transport',
        payment: '30.00',
        deposit: ''
    	}
  	);

    transactionsPage.createTransaction(
    	{
        account: 'Credit',
        date: '01/04/2015',
        payee: 'Grocery Store',
        memo: 'Food',
        category: 'Food & Dining',
        payment: '40.00',
        deposit: ''
    	}
  	);

    transactionsPage.createTransaction(
    	{
        account: 'Cash',
        date: '01/05/2015',
        payee: 'Gas Station',
        memo: 'Gas',
        category: 'Auto & Transport',
        payment: '50.00',
        deposit: ''
    	}
  	);

    transactionsPage.createTransaction(
    	{
        account: 'Credit',
        date: '01/06/2015',
        payee: 'Grocery Store',
        memo: 'Food',
        category: 'Food & Dining',
        payment: '60.00',
        deposit: ''
    	}
  	);

	});

	it('should show a summary of transactions by category', function() {
		
      // Expected category totals
      // | category         | payment |
      // | Auto & Transport |  90.00  |
      // | Food & Dining    | 120.00  |

      // We will simply check for the number of horizontal bars
      dashboardPage.getNumberOfCategories().then(function(numberOfCategories) {
	
	      expect(numberOfCategories).to.equal(2);

      })
  
  });

})