const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKTaxonomy_Misc', function () {

	const item = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	before(function () {
		browser.fill(OLSKTaxonomyField, item);
	});

	before(function () {
		browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
	});

});
