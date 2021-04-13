<script>
import { OLSKLocalized } from 'OLSKInternational';

import Choices from 'choices.js';

const mod = {

	// SETUP

	SetupEverything() {
		new Choices(mod._Choices, {
			placeholder: true,
			placeholderValue: OLSKLocalized('OLSKTaxonomyFieldText'),
		});
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
