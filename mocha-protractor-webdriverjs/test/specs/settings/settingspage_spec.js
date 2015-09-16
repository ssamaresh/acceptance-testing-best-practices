'use strict';

var expect = require('../chai-helpers').expect;
var SettingsPage = require('../../pages/settings/settingsPage');


// Account Creation
describe('Settings Page', function() {

    var settingsPage;

    beforeEach(function() {
        
        settingsPage = new SettingsPage();
        settingsPage.go();
    
    })

    it('Should have a list of accounts', function() {

        settingsPage.getAccountsTab();

        browser.getCurrentUrl().then(function(currentUrl) {
            
            expect(currentUrl).to.equal('http://localhost:3000/settings/accounts');
        
        })
            
        element(by.className('accountAddForm')).isDisplayed().then(function(isPresent) {
        
            expect(isPresent).to.be.true;

        });
            

    })

    it('Should have a list of categories', function() {

        settingsPage.getCategoriesTab();

        browser.getCurrentUrl().then(function(currentUrl) {
            
            expect(currentUrl).to.equal('http://localhost:3000/settings/categories');
        
        })

        element(by.className('categoryAddForm')).isDisplayed().then(function(isPresent) {
        
            expect(isPresent).to.be.true;

        });
    })

});
