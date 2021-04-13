const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	OLSKTaxonomy: '.OLSKTaxonomy',
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

});
