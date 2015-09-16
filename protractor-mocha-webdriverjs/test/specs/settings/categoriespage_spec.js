
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
            
            // Given a category called "Shopping"
            categoriesPage.createCategory('Shopping');

        });

        // Then the categories page should show an account called "Shopping"
        categoriesPage.doesCategoryExist('Shopping').then(function(exists) {
            
            expect(exists).to.be.true;

        });

    });

    it('should allow changing the name of an category', function () {

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
