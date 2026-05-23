<script lang="ts">
	import { fade } from "svelte/transition";
	import { enhance } from "$app/forms";

	let {
		id,
		productName,
		manufacturer,
		activeIngredient,
		patients,
		handleDismiss,
	} = $props();

	function handleBgClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			handleDismiss();
		}
	}

	let selectedPatient = $derived(patients[0]);
</script>

<div
	transition:fade={{ duration: 100 }}
	onkeydown={() => {}}
	tabindex="0"
	role="button"
	class="fixed top-0 left-0 z-10 h-screen w-screen content-center bg-background/90
    backdrop-blur"
	onclick={handleBgClick}
>
	<div
		class="z-20 flex h-3/4 w-2/3 flex-row self-center justify-self-center
        rounded-md bg-card p-10 text-card-foreground"
	>
		<form method="post" action="?/mint" class="h-full w-full" use:enhance>
			<div class="flex w-full flex-row justify-between">
				<div class="flex flex-col">
					<label
						for="patient"
						class="my-0 self-start px-1.5 text-muted-foreground"
						>patient email</label
					>
					<select
						class="mb-2 w-[250px] border border-muted-foreground/50 bg-background px-2 py-1 text-muted-foreground
                            ring-0 outline-0 duration-0 selection:bg-foreground focus:border-foreground focus:ring-0
                            focus-visible:outline-0"
						id="patient-select"
						name="patient-select"
						bind:value={selectedPatient}
					>
						{#each patients as pt}
							<option value={pt}>{pt.email}</option>
						{/each}
					</select>
				</div>

				<div class="flex flex-col">
					<label
						for="patient"
						class="my-0 self-start px-1.5 text-muted-foreground"
					>
						patient wallet address
					</label>
					<div
						class="w-[500px] rounded-md bg-muted px-2 py-1 text-center font-mono"
					>
						{selectedPatient.address}
					</div>
					<input
						name="patient"
						id="patient"
						class="pointer-events-none rounded-md bg-muted px-2 py-1 text-center font-mono select-none"
						type="hidden"
						value={selectedPatient.address}
					/>
				</div>
			</div>

			<div class="mt-8 flex flex-col">
				<label for="dosage" class="my-0 self-start px-1.5 text-muted-foreground"
					>dosage (mg)</label
				>
				<input
					id="dosage"
					name="dosage"
					type="number"
					placeholder="100"
					class="mb-2 border border-muted-foreground/50 px-2 py-1 font-mono ring-0 outline-0 transition-all
                        duration-200 ease-in placeholder:font-mono placeholder:text-sm placeholder:text-muted-foreground/75
                        focus:border-foreground focus:ring-0 focus-visible:outline-0"
				/>
			</div>
			<div class="flex flex-col">
				<label
					for="repeats"
					class="my-0 self-start px-1.5 text-muted-foreground"
					>repeats (including initial dispense)</label
				>
				<input
					id="repeats"
					name="repeats"
					type="number"
					placeholder="2"
					class="mb-2 border border-muted-foreground/50 px-2 py-1 font-mono ring-0 outline-0 transition-all
                        duration-200 ease-in placeholder:font-mono placeholder:text-sm placeholder:text-muted-foreground/75
                        focus:border-foreground focus:ring-0 focus-visible:outline-0"
				/>
			</div>
			<div class="flex flex-col">
				<label
					for="repeats"
					class="my-0 self-start px-1.5 text-muted-foreground"
					>expiry (days)</label
				>
				<input
					id="expiry-days"
					name="expiry-days"
					type="number"
					placeholder="30"
					class="mb-2 border border-muted-foreground/50 px-2 py-1 font-mono ring-0 outline-0 transition-all
                        duration-200 ease-in placeholder:font-mono placeholder:text-sm placeholder:text-muted-foreground/75
                        focus:border-foreground focus:ring-0 focus-visible:outline-0"
				/>
				<input type="hidden" name="tga-id" value={id} id="tga-id" />
			</div>
			<div class="mt-8 border-b border-foreground"></div>
			<div class="mt-8 w-full justify-self-center">
				<div class="my-0 self-start text-xl font-medium tracking-tight">
					medication info
				</div>
				<div class="mx-4 my-8 flex flex-col justify-between">
					<div class="flex flex-row items-center justify-between">
						<span class="font-semibold">TGA ID:</span>
						<span class="font-mono">{id}</span>
					</div>
					<div class="flex flex-row items-center justify-between">
						<span class="font-semibold">Name:</span>
						<span class="font-mono">{productName}</span>
					</div>
					<div class="flex flex-row items-center justify-between">
						<span class="font-semibold">Manufacturer:</span>
						<span class="font-mono">{manufacturer}</span>
					</div>
					<div class="flex flex-row items-center justify-between">
						<span class="font-semibold">Active Ingredient:</span>
						<span class="font-mono">{activeIngredient}</span>
					</div>
				</div>
			</div>
			<div class="flex h-full w-full flex-col">
				<button
					type="submit"
					class="mx-10 mt-8 w-max content-end self-end border border-muted-foreground px-2.5 py-px
                    text-sm opacity-50 transition-opacity duration-200 ease-out hover:opacity-100"
				>
					confirm prescription
				</button>
			</div>
		</form>
	</div>
</div>
