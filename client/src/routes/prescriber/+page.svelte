<script lang="ts">
	import Prescribe from "$lib/components/modal/Prescribe.svelte";
	import MedicationTable from "$lib/components/medication-table/MedicationTable.svelte";
	import { enhance } from "$app/forms";
	import { loadUtil } from "$lib/store-utils.svelte.js";
	import Error from "$lib/components/error/Error.svelte";

	type MedicationSearchResult = {
		id: number;
		productName: string;
		manufacturer: string;
		activeIngredient: string;
		effective: number;
		createdAt: number;
		updatedAt: number;
	};

	let { data, form } = $props();
    let errored = $derived(form?.error);

	let selected: Partial<MedicationSearchResult> | null = $state(null);
	let searchResults: MedicationSearchResult[] | null = $derived.by(() => {
		if (form) {
			return form as MedicationSearchResult[];
		}

		return null;
	});

	function handleSelect(item: MedicationSearchResult) {
		selected = {
			id: item.id,
			manufacturer: item.manufacturer,
			productName: item.productName,
			activeIngredient: item.activeIngredient,
			effective: item.effective,
		};
	}

	function handleDismiss() {
		selected = null;
	}

    
</script>

<div>
	<div
		class="mt-8 mb-18 flex flex-col items-center text-6xl font-bold tracking-tighter"
	>
		Prescribe
	</div>
</div>

{#if selected != null}
	<Prescribe
		id={selected.id}
		productName={selected.productName}
		manufacturer={selected.manufacturer}
		activeIngredient={selected.activeIngredient}
		patients={data.patients}
		{handleDismiss}
	/>
{/if}

<div class="flex w-full flex-col">
	<Error {errored} {form} />
	<form
		action="?/search"
		method="post"
		class="flex w-[350px] flex-col items-center justify-center self-center"
		use:enhance={() => {
			loadUtil.wait();

			return async ({ update }) => {
				await update();
				loadUtil.unwait();
			};
		}}
	>
		<input
			id="search-query"
			name="search-query"
			type="text"
			class="w-full border border-muted-foreground/50 px-2 py-1
            placeholder:text-sm focus:border-foreground focus:ring-0
            focus-visible:outline-0"
			placeholder="search for a medication..."
		/>

		<button
			type="submit"
			class="mt-8 self-end border border-muted-foreground px-2.5 py-px text-sm
            opacity-50 hover:opacity-100">search</button
		>
	</form>
</div>

<MedicationTable medications={searchResults} onSelect={handleSelect} />
