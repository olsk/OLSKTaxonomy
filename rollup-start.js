import RollupStart from './main.svelte';

const OLSKTaxonomy = new RollupStart({
	target: document.querySelector('body'),
	props: Object.assign({
		OLSKTaxonomyItems: [],
		OLSKTaxonomyDispatchUpdate: (function  (inputData) {
			window.TestOLSKTaxonomyDispatchUpdate.innerHTML = parseInt(window.TestOLSKTaxonomyDispatchUpdate.innerHTML) + 1;
			window.TestOLSKTaxonomyDispatchUpdateData.innerHTML = inputData.length;
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['OLSKTaxonomyItems'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default OLSKTaxonomy;
