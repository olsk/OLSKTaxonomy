const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKTaxonomy_Misc', function () {

	const OLSKTaxonomyItems = Array.from(Array(Math.max(2, uRandomInt(10)))).map(function () {
		return Math.random().toString();
	});

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKTaxonomyItems: JSON.stringify(OLSKTaxonomyItems),
		});
	});

	it.skip('binds OLSKTaxonomyItems', function () {
		browser.assert.text(OLSKTaxonomyItem, OLSKTaxonomyItems.join(' '));
	});

	context('create', function () {

		before(function () {
			browser.assert.text('#TestOLSKTaxonomyDispatchUpdate', '0');
			browser.assert.text('#TestOLSKTaxonomyDispatchUpdateData', 'undefined');
		});

		before(function () {
			browser.fill(OLSKTaxonomyField, Math.random().toString());
		});

		before(function () {
			return browser.fire(OLSKTaxonomyField, 'submit');
		});
		
		it.skip('sends OLSKTaxonomyDispatchUpdate', function () {
			browser.assert.text('#TestOLSKTaxonomyDispatchUpdate', '1');
			browser.assert.text('#TestOLSKTaxonomyDispatchUpdateData', OLSKTaxonomyItems.length + 1);
		});
	
	});

	context('delete', function () {

		before(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
		});
		
		it.skip('sends OLSKTaxonomyDispatchUpdate', function () {
			browser.assert.text('#TestOLSKTaxonomyDispatchUpdate', '1');
			browser.assert.text('#TestOLSKTaxonomyDispatchUpdateData', OLSKTaxonomyItems.length);
		});
	
	});

});
