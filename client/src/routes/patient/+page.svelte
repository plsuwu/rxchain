<script lang="ts">
	import { enhance } from "$app/forms";
	import { loadUtil } from "$lib/store-utils.svelte.js";
	import { ClipboardIcon } from "@lucide/svelte";
	import type { Hex } from "viem";
	let { data, form } = $props();

	let copied = $state(false);

	function expiryLabel(unix: number) {
		const d = new Date(unix * 1000);
		const past = d.getTime() < Date.now();
		return { text: d.toLocaleDateString(), past };
	}

	async function pushToClipboard(text: Hex | null) {
		if (text != null) {
			await navigator.clipboard.writeText(text);
			copied = true;

			setTimeout(() => {
				copied = false;
			}, 5000);
		}
	}
</script>

<div class="">
	<div
		class="mt-8 mb-18 flex flex-col items-center text-6xl font-bold tracking-tighter"
	>
		Prescriptions
	</div>
	<div class="mt-10 w-full justify-self-center">
		<div class="flex flex-row items-center justify-center">
			<div class="text-2xl">wallet:</div>
			<div
				class="ml-6 rounded-l-md bg-accent px-3 py-1 pt-[8px] font-mono text-lg"
			>
				{data.address}
			</div>
			<div class="border-collapse border-r-2 border-foreground bg-accent"></div>
			<button
				onclick={() => pushToClipboard(data.address)}
				class="mr-6 rounded-r-md bg-accent py-[10px] pr-3 pl-2.5
                transition-discrete duration-200 ease-out hover:brightness-75"
			>
				<ClipboardIcon strokeWidth={1.5} size={20} />
			</button>
		</div>

		<div
			class="duruation-300 pointer-events-none py-4 text-center transition-all ease-in-out select-none"
			style:opacity={copied ? 100 : 0}
		>
			address copied
		</div>

		{#if data.prescriptions.length === 0}
			<div
				class="mt-24 text-center text-lg tracking-tighter text-muted-foreground/90"
			>
				<div>you do not have any prescriptions available.</div>
				<div>
					a verified prescriber needs to issue one to your wallet address above.
				</div>
			</div>
		{:else}
			<table class="w-max border-collapse justify-self-center border">
				<thead>
					<tr>
						<th class="bg-accent px-8 text-end">#</th>
						<th class="bg-accent px-8 text-start">Medication name</th>
						<th class="bg-accent px-8 text-start">Dosage</th>
						<th class="bg-accent px-8 text-start">Repeats</th>
						<th class="bg-accent px-8 text-start">Expiry</th>
						<th class="bg-accent px-8 text-end">Send to pharmacy</th>
					</tr>
				</thead>
				<tbody>
					{#each data.prescriptions as p}
						{@const exp = expiryLabel(p.expiry)}
						<tr>
							<td class="px-8 py-1 text-end font-mono">{p.medicationCode}</td>
							<td class="px-8">{p.medicationDetail.productName}</td>
							<td class="px-8">{p.dosage}mg</td>
							<td class="px-8">5 ({p.totalRepeats})</td>
							<td class="px-8">{exp.text}</td>
							<td class="px-8 text-end">
								{#if p.locked}
									<span class="text-muted-foreground/70">-</span>
								{:else if data.pharmacies.length === 0}
									<span class="text-muted-foreground/70"
										>no available pharmacies</span
									>
								{:else}
									<form
										method="POST"
										action="?/transfer"
										class="row"
										style="gap:.4rem"
										use:enhance={() => {
											loadUtil.wait();

											return async ({ update }) => {
												await update();
												loadUtil.unwait();
											};
										}}
									>
										<input type="hidden" name="token-id" value={p.tokenId} />
										<select
											class="mr-4 border px-4 py-0.5 font-mono text-xs"
											name="pharmacy"
											style="min-width:140px"
										>
											{#each data.pharmacies as ph}
												<option value={ph.address}
													>{ph.address.slice(0, 8)}...{ph.address.slice(
														-6
													)}</option
												>
											{/each}
										</select>
										<button
											type="submit"
											class="border px-2 py-px text-sm hover:bg-background/50"
											>send</button
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
</div>
