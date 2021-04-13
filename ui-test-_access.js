const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	OLSKTaxonomy: '.OLSKTaxonomy',
	
	OLSKTaxonomyItem: '.choices__item',
	OLSKTaxonomyItemRemoveButton: '.choices__button',
	OLSKTaxonomyField: '.choices__input--cloned',
	OLSKTaxonomyHint: '.choices__item--choice',
	OLSKTaxonomySuggestion: '.OLSKTaxonomySuggestion',
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

	it('hides OLSKTaxonomySuggestion', function () {
		browser.assert.elements(OLSKTaxonomySuggestion, 0);
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

	context('OLSKTaxonomySuggestionItems', function () {

		const OLSKTaxonomySuggestionItems = Array.from(Array(Math.max(2, uRandomInt(10)))).map(function () {
			return Math.random().toString();
		});

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKTaxonomySuggestionItems: JSON.stringify(OLSKTaxonomySuggestionItems),
			});
		});

		it('shows OLSKTaxonomySuggestion', function () {
			browser.assert.elements(OLSKTaxonomySuggestion, OLSKTaxonomySuggestionItems.length);
		});

		describe('OLSKTaxonomySuggestion', function test_OLSKTaxonomySuggestion() {

			const index = uRandomInt(OLSKTaxonomySuggestionItems.length);

			before(function () {
				browser.pressButton(`${ OLSKTaxonomySuggestion }:nth-child(${ index + 1 })`);
			});
			
			it('hides OLSKTaxonomySuggestion', function () {
				browser.assert.elements(OLSKTaxonomySuggestion, OLSKTaxonomySuggestionItems.length - 1);
			});

			context('remove', function () {
				
				before(function () {
					browser.pressButton(OLSKTaxonomyItemRemoveButton);
				});

				it.skip('shows OLSKTaxonomySuggestion', function () {
					browser.assert.elements(OLSKTaxonomySuggestion, OLSKTaxonomySuggestionItems.length);
				});
			
			});
		
		});
	
	});

});
