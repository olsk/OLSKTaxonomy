const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKTaxonomy_Misc', function () {

	const OLSKTaxonomyItems = Array.from(Array(Math.max(2, uRandomInt(10)))).map(function () {
		return Math.random().toString();
	});

	const OLSKTaxonomySuggestionItems = Array.from(Array(Math.max(2, uRandomInt(10)))).map(function () {
		return Math.random().toString();
	});

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKTaxonomyItems: JSON.stringify(OLSKTaxonomyItems),
			OLSKTaxonomySuggestionItems: JSON.stringify(OLSKTaxonomySuggestionItems),
		});
	});

	it.skip('binds OLSKTaxonomyItems', function () {
		return browser.assert.text(OLSKTaxonomyItem, OLSKTaxonomyItems.join(' '));
	});

	OLSKTaxonomySuggestionItems.forEach(function (e, i) {

		it('binds OLSKTaxonomySuggestionItems ' + (i + 1), function () {
			return browser.assert.text(OLSKTaxonomySuggestion + `:nth-child(${ (i + 1)})`, e);
		});
		
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
			browser.assert.text('#TestOLSKTaxonomyDispatchUpdate', '2');
			browser.assert.text('#TestOLSKTaxonomyDispatchUpdateData', OLSKTaxonomyItems.length);
		});
	
	});

	describe('OLSKTaxonomySuggestion', function test_OLSKTaxonomySuggestion() {

		const index = uRandomInt(OLSKTaxonomySuggestionItems.length);

		before(function () {
			browser.pressButton(`${ OLSKTaxonomySuggestion }:nth-child(${ index + 1 })`);
		});
		
		it('sends OLSKTaxonomyDispatchUpdate', function () {
			// browser.assert.text('#TestOLSKTaxonomyDispatchUpdate', '3');
			browser.assert.text('#TestOLSKTaxonomyDispatchUpdateData', OLSKTaxonomyItems.length + 1);
		});
	
	});

});
