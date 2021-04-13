<script>
export let OLSKTaxonomyItems;
export let OLSKTaxonomyDispatchUpdate;

import { OLSKLocalized } from 'OLSKInternational';
import { OLSKFormatted } from 'OLSKString';

import Choices from 'choices.js';

const mod = {

	// SETUP

	SetupEverything() {
		const item = new Choices(mod._Choices, {
			items: OLSKTaxonomyItems,
			
			placeholder: true,
			placeholderValue: OLSKLocalized('OLSKTaxonomyFieldText'),

			addItemText (inputData) {
				return OLSKFormatted(OLSKLocalized('OLSKTaxonomyHintTemplate'), inputData);
			},

			removeItems: true,
			removeItemButton: true,
		});

		item.passedElement.element.addEventListener('change', function (event) {
	    OLSKTaxonomyDispatchUpdate(item.getValue(true));
	  }, false);
	},

	// LIFECYCLE

	LifecycleModuleDidLoad() {
		mod.SetupEverything();
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleDidLoad);
</script>

<div class="OLSKTaxonomy">

<input type="text" bind:this={ mod._Choices } />
	
</div>
