'use strict';

var expect = require('../chai-helpers').expect;
var SettingsPage = require('../../pages/settings/settings.page');


// Account Creation
describe('Settings Page', function() {

    var settingsPage;

    beforeEach(function() {
        
        settingsPage = new SettingsPage();
        settingsPage.go();
    
    })

    it('should be on the settings page', function() {

        browser.getCurrentUrl().then(function(currentUrl) {
            
            expect(currentUrl).to.equal('http://localhost:3000/settings');
        
        })

    })

    it('Should have a list of accounts', function() {

        settingsPage.getAccountsTab();

        element(by.className('accountAddForm')).isDisplayed().then(function(isPresent) {
        
            expect(isPresent).to.be.true;

        });
            

    })

    it('Should have a list of categories', function() {

        settingsPage.getCategoriesTab();

        element(by.className('categoryAddForm')).isDisplayed().then(function(isPresent) {
        
            expect(isPresent).to.be.true;

        });
    })

});
