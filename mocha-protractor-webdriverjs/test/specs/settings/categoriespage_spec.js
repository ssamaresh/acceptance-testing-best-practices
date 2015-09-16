
'use strict';

var expect = require('../chai-helpers').expect;
var CategoriesPage = require('../../pages/settings/categoriesPage');


// Account Creation
describe('Categories Page', function() {

    var categoriesPage;

    beforeEach(function() {
        
        categoriesPage = new CategoriesPage();
        categoriesPage.go();
    
    })

    it('Should allow the creation of an category', function() {
        
        browser.waitForAngular();
        
        browser.getCurrentUrl().then(function(currentUrl) {

            expect(currentUrl).to.equal('http://localhost:3000/settings/categories');
            
            categoriesPage.createCategory('Shopping');

        });

        // Check if account exists after creation
        categoriesPage.doesCategoryExist('Shopping').then(function(exists) {
            
            expect(exists).to.be.true;

        });

    });

    it('should allow changing the name of an category', function () {

        browser.waitForAngular();

        // Given an account called "BofA Checking"
        categoriesPage.createCategory('Shopping');

        // When I change the account name to "Bank of America Checking"
        categoriesPage.changeCategoryName('Shopping', 'General Shopping');

        browser.waitForAngular();
        
        // Then the accounts page should show an account called "Bank of America Checking"
        categoriesPage.doesCategoryExist('General Shopping').then(function(exists) {
            
            expect(exists).to.be.true;

        });

    });


});
