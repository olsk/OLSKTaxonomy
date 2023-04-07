const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('OLSKTaxonomy_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes OLSKTaxonomyField', function () {
			return browser.assert.attribute(OLSKTaxonomyField, 'placeholder', uLocalized('OLSKTaxonomyFieldText'));
		});

		context('name', function () {

			const item = Math.random().toString();
			
			before(function () {
				browser.fill(OLSKTaxonomyField, item);
			});

			it.skip('localizes OLSKTaxonomyHint', function () {
				return browser.assert.text(OLSKTaxonomyHint, 'placeholder', OLSKTestingFormatted(uLocalized('OLSKTaxonomyHintTemplate'), item));
			});
		
		});

	});

});
