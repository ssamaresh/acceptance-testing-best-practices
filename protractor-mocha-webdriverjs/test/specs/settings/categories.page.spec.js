/* jshint node: true */
/*jshint -W030 */

'use strict';

var expect = require('../chai-helpers').expect;
var CategoriesPage = require('../../pages/settings/categories.page');


// Account Creation
describe('Categories Page', function() {

    var categoriesPage;

    beforeEach(function() {
        
        this.timeout(50000);

        categoriesPage = new CategoriesPage();
        categoriesPage.go();
    
    });

    it('Should go to the categories page', function() {

        this.timeout(50000);

        browser.getCurrentUrl().then(function(currentUrl) {
            
            expect(currentUrl).to.equal('http://localhost:3000/settings/categories');
        
        });

    });

    it('Should allow the creation of an category', function() {

        this.timeout(50000);
        
        browser.waitForAngular();
    
        // Given a category called "Shopping"
        categoriesPage.createCategory('Shopping');

        // Then the categories page should show an account called "Shopping"
        categoriesPage.doesCategoryExist('Shopping').then(function(exists) {
            
            expect(exists).to.be.true;

        });

    });

    it('should allow changing the name of an category', function () {

        this.timeout(50000);

        browser.waitForAngular();

        // Given a category called "Shopping"
        categoriesPage.createCategory('Shopping');

        // When I change the category name to "General Shopping"
        categoriesPage.changeCategoryName('Shopping', 'General Shopping');

        browser.waitForAngular();
        
        // Then the categories page should show an account called "General Shopping"
        categoriesPage.doesCategoryExist('General Shopping').then(function(exists) {
            
            expect(exists).to.be.true;

        });

    });


});
