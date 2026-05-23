<script lang="ts">
	import { enhance } from "$app/forms";
	let { data, form } = $props();
</script>

<div class="flex w-full flex-col px-8">
	<div
		class="mt-8 mb-18 flex flex-col items-center text-6xl font-bold tracking-tighter"
	>
		Verify & Revoke
	</div>

	<div class="mb-4 flex flex-col text-3xl underline underline-offset-2">
		prescribers
	</div>
	<table class="mt-8 ml-8 w-full max-w-[1250px] border-collapse border">
		<thead class="bg-accent text-left text-lg">
			<tr>
				<th class="px-3">Email</th>
				<th class="px-3">AHPRA ID</th>
				<th class="px-3">Wallet</th>
				<th class="px-3">Status</th>
				<th class="px-3">Action</th>
			</tr>
		</thead>
		<tbody>
			{#each data.prescribers as p}
				<tr>
					<td class="px-3">{p.email}</td>
					<td class="px-3 font-mono">{p.ahpraId}</td>
					<td class="px-3 font-mono"
						>{p.address.slice(0, 8)}..{p.address.slice(-4)}</td
					>
					<td class="px-3"><span class="status {p.status}">{p.status}</span></td
					>
					<td>
						{#if p.status === "active"}
							<form method="POST" action="?/revokePrescriber" use:enhance>
								<input type="hidden" name="user-id" value={p.userId} />
								<button
									type="submit"
									class="cursor-pointer px-2 text-destructive underline underline-offset-3
                                    transition-opacity duration-200 ease-out hover:opacity-50"
									>revoke</button
								>
							</form>
						{:else}
							<div class="flex flex-row self-start">
								<form method="POST" action="?/verifyPrescriber" use:enhance>
									<input type="hidden" name="user-id" value={p.userId} />
									<button
										type="submit"
										class="cursor-pointer px-3 underline underline-offset-3 transition-opacity
                                        duration-200 ease-out hover:opacity-50"
										>verify</button
									>
								</form>
								<div>/</div>
								<form method="POST" action="?/rejectPrescriber" use:enhance>
									<button
										class="cursor-pointer px-3 underline underline-offset-3 transition-opacity
                                        duration-200 ease-out not-disabled:hover:opacity-50 disabled:cursor-not-allowed
                                        disabled:text-muted-foreground/70 disabled:no-underline"
										disabled>reject</button
									>
								</form>
							</div>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<div class="mt-12 mb-4 flex flex-col text-3xl underline underline-offset-2">
		pharmacies
	</div>
	<table class="mt-8 ml-8 w-full max-w-[1250px] border-collapse border">
		<thead class="bg-accent text-left text-lg">
			<tr>
				<th class="px-3">Email</th>
				<th class="px-3">TGA ID</th>
				<th class="px-3">Wallet</th>
				<th class="px-3">Status</th>
				<th class="px-3">Action</th>
			</tr>
		</thead>
		<tbody>
			{#each data.pharmacies as p}
				<tr>
					<td class="px-3">{p.email}</td>
					<td class="px-3 font-mono">{p.tgaId}</td>
					<td class="px-3 font-mono"
						>{p.address.slice(0, 8)}..{p.address.slice(-4)}</td
					>
					<td class="px-3"><span class="status {p.status}">{p.status}</span></td
					>
					<td>
						{#if p.status === "active"}
							<form method="POST" action="?/revokePharmacy" use:enhance>
								<input type="hidden" name="user-id" value={p.userId} />
								<button
									type="submit"
									class="cursor-pointer px-2 text-destructive underline underline-offset-3
                                    transition-opacity duration-200 ease-out hover:opacity-50"
									>revoke</button
								>
							</form>
						{:else}
							<div class="flex flex-row self-start">
								<form method="POST" action="?/verifyPharmacy" use:enhance>
									<input type="hidden" name="user-id" value={p.userId} />
									<input type="hidden" name="ahpra-id" value={p.tgaId} />
									<button
										type="submit"
										class="cursor-pointer px-3 underline underline-offset-3 transition-opacity
                                        duration-200 ease-out hover:opacity-50"
										>verify</button
									>
								</form>
								<div>/</div>
								<form method="POST" action="?/rejectPharmacy" use:enhance>
									<button
										class="cursor-pointer px-3 underline underline-offset-3 transition-opacity
                                        duration-200 ease-out not-disabled:hover:opacity-50 disabled:cursor-not-allowed
                                        disabled:text-muted-foreground/70 disabled:no-underline"
										disabled>reject</button
									>
								</form>
							</div>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.status.pending {
		color: var(--color-amber-500);
	}

	.status.active {
		color: var(--color-blue-500);
	}

	.status.revoked {
		color: var(--color-red-500);
	}
</style>
