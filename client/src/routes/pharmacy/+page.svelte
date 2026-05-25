<script lang="ts">
	import { enhance } from "$app/forms";
	import Error from "$lib/components/error/Error.svelte";
	import { loadUtil } from "$lib/store-utils.svelte.js";
	let { data, form } = $props();

	let errored = $derived(form?.error);
</script>

<div class="w-full px-4">
	<Error {errored} {form} />
	<div class="mb-4 text-2xl font-semibold tracking-tight">
		Held prescriptions
	</div>
	{#if data.held.length === 0}
		<p class="muted" style="margin:0">
			no prescriptions are currently held by this pharmacy.
		</p>
	{:else}
		<table>
			<thead>
				<tr>
					<th class="bg-accent px-8 text-end">#</th>
					<th class="bg-accent px-8 text-start">Medication</th>
					<th class="bg-accent px-8 text-start">Dosage</th>
					<th class="bg-accent px-8 text-start">Repeats left</th>
					<th class="bg-accent px-8 text-start">Status</th>
					<th class="bg-accent px-8 text-end">Action</th>
				</tr>
			</thead>
			<tbody>
				{#each data.held as p}
					<tr>
						<td class="px-8 text-end font-mono">{p.tokenId}</td>
						<td class="px-8 text-start">{p.medicationCode}</td>
						<td class="px-8 text-start">{p.dosage}</td>
						<td class="px-8 text-start"
							>{p.repeatsRemaining} / {p.totalRepeats}</td
						>
						<td class="px-8 text-start">
							{#if p.locked}<span class="text-destructive brightness-70"
									>locked</span
								>
							{:else}<span class="text-blue-400">dispensable</span>{/if}
						</td>
						<td class="px-2 py-2 text-end">
							{#if p.locked}
								<span class="text-muted-foreground/70">fully dispensed</span>
							{:else}
								<form
									method="POST"
									action="?/dispense"
									use:enhance={() => {
										loadUtil.wait();

										return async ({ update }) => {
											await update();
											loadUtil.unwait();
										};
									}}
								>
									<input type="hidden" name="token-id" value={p.tokenId} />
									<button
										class="cursor-pointer border px-2 py-px transition-all duration-200
                                    ease-out hover:border-amber-500 hover:text-amber-400"
										type="submit">dispense</button
									>
								</form>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>
