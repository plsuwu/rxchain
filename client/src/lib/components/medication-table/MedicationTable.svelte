<script lang="ts">
	import { PlusIcon } from "@lucide/svelte";

    let { medications, onSelect } = $props();
</script>
<div
	class="my-16 flex max-w-[1920px] border-collapse flex-col justify-self-center border-muted-foreground
    px-6 xl:w-[1920px]"
>
	{#if medications != null}
		<div class="my-4 w-[250px] items-end self-end text-end font-mono">
			[<span class="font-semibold">{medications.length}</span> results]
		</div>
	{/if}
	<div
		class="grid grid-cols-13 items-center space-x-2 overflow-hidden
                bg-foreground/35 text-sm font-bold lg:text-base"
	>
		<div class="px-3 py-1 text-end text-nowrap">TGA ID</div>
		<div class="col-span-7 px-1 py-1">Product</div>
		<div class="col-span-4 px-1 py-1">Manufacturer</div>
		<div class="col-span-1 px-3 py-1 text-end">Prescribe</div>
	</div>
	{#if medications == null}
		<div
			class="my-8 flex flex-row items-center justify-center
            text-muted-foreground/50"
		>
			no results
		</div>
	{/if}
	{#each medications as medication}
		<div
			class="grid grid-cols-13 items-center space-x-2 not-even:bg-foreground/25 even:bg-background"
		>
			<div class="px-4 py-px text-end font-mono">{medication.id}</div>
			<div class="col-span-7 grow truncate px-1 py-px text-sm">
				{medication.productName}
			</div>
			<div class="col-span-4 grow truncate px-2 py-px text-sm text-nowrap">
				{medication.manufacturer}
			</div>
			<button
				class="flex shrink flex-row items-center justify-end px-5 py-px text-sm"
				onclick={() => onSelect(medication)}
			>
				<PlusIcon size={16} />
			</button>
		</div>
	{/each}
</div>
