<script>
export let OLSKTaxonomyItems;
export let OLSKTaxonomySuggestionItems = [];
export let OLSKTaxonomyDispatchUpdate;

import { OLSKLocalized } from 'OLSKInternational';
import { OLSKFormatted } from 'OLSKString';

import Choices from 'choices.js';

const mod = {

	// VALUE

	_ValueSuggestions: OLSKTaxonomySuggestionItems,

	// CONTROL

	ControlTagSuggestion (inputData) {
		mod._ValueSuggestions = mod._ValueSuggestions.filter(function (e) {
			return e !== inputData;
		});

		mod._ChoicesInstance.setValue([inputData]);

		mod.ReactItems();
	},

	// REACT

	ReactItems () {
		OLSKTaxonomyDispatchUpdate(mod._ChoicesInstance.getValue(true));
	},

	// SETUP

	SetupEverything() {
		mod._ChoicesInstance = new Choices(mod._ChoicesElement, {
			items: OLSKTaxonomyItems,
			
			placeholder: true,
			placeholderValue: OLSKLocalized('OLSKTaxonomyFieldText'),

			addItemText (inputData) {
				return OLSKFormatted(OLSKLocalized('OLSKTaxonomyHintTemplate'), inputData);
			},

			removeItems: true,
			removeItemButton: true,
		});

		mod._ChoicesInstance.passedElement.element.addEventListener('change', mod.ReactItems, false);

		mod._ChoicesInstance.passedElement.element.addEventListener('removeItem', function (event) {
			mod._ValueSuggestions = OLSKTaxonomySuggestionItems.filter(function (e) {
				return e === event.detail.value || mod._ValueSuggestions.includes(e);
			})
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

<input type="text" bind:this={ mod._ChoicesElement } />

{#if mod._ValueSuggestions.length }
<p>
{#each mod._ValueSuggestions as item }
	<button class="OLSKTaxonomySuggestion" on:click={ () => mod.ControlTagSuggestion(item) }>{ item }</button>
{/each}
</p>
{/if}
	
</div>

<style>
.OLSKTaxonomy :global(.choices) {
	margin: 0;
}

.OLSKTaxonomy :global(.choices__inner, .choices__list--dropdown) {
	background: var(--OLSKDecorFormBlendBackground) !important;
	border-color: var(--OLSKDecorForegroundLight) !important;
	width: 90% !important;
	min-height: unset !important;
	padding: var(--OLSKCommonInputPadding) !important;
}

.OLSKTaxonomy :global(.choices__input) {
	border: none;
	padding: var(--OLSKCommonInputPadding);
	margin: 0;
}

.OLSKTaxonomy :global(.choices__list--dropdown .choices__item) {
	padding: 0 10px;
}

.OLSKTaxonomy :global(.choices__list--multiple .choices__item) {
	background: none;
	border-color: var(--OLSKCommonForeground);
	color: var(--OLSKCommonForeground);
}

.OLSKTaxonomy :global(.choices__button) {
	margin: 0 !important;
	padding: 0;
	background: unset;
	background-repeat: no-repeat;
	background-position: center;
	border: none !important;
}

.OLSKTaxonomySuggestion {
	margin-right: 4px;
}
</style>
