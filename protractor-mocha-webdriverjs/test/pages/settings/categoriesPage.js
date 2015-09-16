'use strict';


var CategoriesPage = function() {

	this.url = '/settings/categories';
	this.categoriesAddForm = element(by.className('categoryAddForm'));
	this.categoriesName = element(by.model('vm.addCategoryName'));

}

CategoriesPage.prototype.go = function() {
	return browser
		.get(this.url);
}

CategoriesPage.prototype.createCategory = function(categoriesName) {
		
		this.categoriesName.clear();
		
		this.categoriesName.sendKeys(categoriesName);

		this.categoriesAddForm.submit();

};

CategoriesPage.prototype.changeCategoryName = function(currentName, newName) {

	var categoryRow = element(by.cssContainingText('.categoryView', currentName));

	categoryRow.click();

	var categoryForm = categoryRow.element(by.xpath('following-sibling::form'));

	categoryForm.click();
	
	var nameField = categoryForm.element(by.model('vm.editedCategory.name'));
	
	nameField.clear();
	
	nameField.sendKeys(newName);

	categoryForm.submit();

};

CategoriesPage.prototype.doesCategoryExist = function(categoryName) {
	 
 	return element.all(by.cssContainingText('.categoryView', categoryName)).then(function(name) {
		
		if(name.length != 0) {
			return true;
		} else {
			return false;
		}

	});

};

module.exports = CategoriesPage;
