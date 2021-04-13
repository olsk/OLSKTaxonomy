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

});
