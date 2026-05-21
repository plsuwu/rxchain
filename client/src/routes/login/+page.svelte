<script lang="ts">
	import type { PageData } from "./$types";

	const USER_TYPES = ["admin", "prescriber", "patient", "pharmacy"];

	let { data }: { data: PageData } = $props();
	const { preselectUserType } = $derived(data);

	// svelte-ignore state_referenced_locally
	let currentUserType = $state(preselectUserType);
</script>

<div class="flex w-full flex-col">
	<form
		method="post"
		class="flex w-[350px] flex-col items-center justify-center space-y-2 self-center"
	>
		<div
			class="mb-8 flex w-full flex-row justify-between space-x-1 self-end px-2"
		>
			<label class="text-sm text-muted-foreground" for="user-type"
				>account type</label
			>
			<select
				id="user-type"
				name="user-type"
				class="w-[125px] self-end border border-muted-foreground/50 bg-background
                px-2 py-px text-xs text-muted-foreground/75 placeholder:text-xs
                focus:border-foreground focus:ring-0 focus-visible:outline-0"
				bind:value={currentUserType}
			>
				{#each USER_TYPES as user_type}
					<option value={user_type}>
						{user_type}
					</option>
				{/each}
			</select>
		</div>

		<div>
			<label class="text-sm text-muted-foreground" for="user-ident"
				>user identifier</label
			>
			<input
				type="text"
				id="user-ident"
				name="user-ident"
				class="w-full border border-muted-foreground/50 px-2 py-px
            placeholder:text-sm focus:border-foreground focus:ring-0
            focus-visible:outline-0"
			/>
		</div>

		<button
			type="submit"
			class="mt-8 self-end border border-muted-foreground px-2.5 py-px text-sm
            opacity-50 hover:opacity-100">login</button
		>
	</form>
</div>
