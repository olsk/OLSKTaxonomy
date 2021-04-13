const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	OLSKTaxonomy: '.OLSKTaxonomy',
	
	OLSKTaxonomyItem: '.choices__item',
	OLSKTaxonomyField: '.choices__input--cloned',
	OLSKTaxonomyHint: '.choices__item--choice',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('OLSKTaxonomy_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows OLSKTaxonomy', function () {
		browser.assert.elements(OLSKTaxonomy, 1);
	});

	it('shows choices', function () {
		browser.assert.elements('.choices', 1);
	});

	it('hides OLSKTaxonomyItem', function () {
		browser.assert.elements(OLSKTaxonomyItem, 0);
	});

	it('shows OLSKTaxonomyField', function () {
		browser.assert.elements(OLSKTaxonomyField, 1);
	});

	it('hides OLSKTaxonomyHint', function () {
		browser.assert.elements(OLSKTaxonomyHint, 0);
	});

	context('type', function () {

		before(function () {
			browser.fill(OLSKTaxonomyField, Math.random().toString());
		});

		it.skip('shows OLSKTaxonomyHint', function () {
			browser.assert.elements(OLSKTaxonomyHint, 1);
		});
	
	});

	context('create', function () {

		before(function () {
			return browser.fire(OLSKTaxonomyField, 'submit');
		});

		it.skip('shows OLSKTaxonomyItem', function () {
			browser.assert.elements(OLSKTaxonomyItem, 1);
		});
	
	});

	context('delete', function () {

		before(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
		});

		it('hides OLSKTaxonomyItem', function () {
			browser.assert.elements(OLSKTaxonomyItem, 0);
		});
	
	});

});
