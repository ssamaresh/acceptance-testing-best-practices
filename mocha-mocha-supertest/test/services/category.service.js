'use strict';

module.exports = {
    createCategory: createCategory,
    updateCategory: updateCategory,
    getCategory: getCategory,
    deleteCategory: deleteCategory
};

var request = require('./request');

/**
 * Creates a new category.
 *
 * @param {string} name
 * @returns {Promise<Category>} A promise that returns the created category
 */
function createCategory(name) {

    return request.post('/categories')
        .send({
            name: name
        })
        .then(function(res) {
            return res.body;
        });
}

/**
 * Updates an existing category.
 *
 * @param {string} name
 * @returns {Promise<Category>} A promise that returns the created category
 */
function updateCategory(category) {

    return request.put('/categories/' + category.id)
        .send(category)
        .then(function(res) {
            return res.body;
        });
}

/**
 * Gets a category.
 *
 * @param {number} id
 * @returns {Promise<Category>} A promise that returns the desired category
 * @throws {String} "Not found" if category is not found
 */
function getCategory(id) {

    return request.get('/categories/' + id)
        .then(function(res) {
            if (res.notFound) {
                throw 'Not found';
            }

            return res.body;
        });
}

/**
 * Deletes a category.
 *
 * @param {number} id
 * @returns {Promise} A promise that returns true when the category is deleted
 */
function deleteCategory(id) {

    return request.delete('/categories/' + id)
        .then(function() {
            return true;
        });
}