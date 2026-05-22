<script lang="ts">
	import type { FullAutoFill } from "svelte/elements";
	import { enhance } from "$app/forms";
	import { UserKeyIcon } from "@lucide/svelte";
	import { slide } from "svelte/transition";
	let { form } = $props();

	let role = $state("patient");
	let errored = $derived(form?.error);
</script>

{#snippet InputWithLabel(
	inputName: string,
	autocomplete?: FullAutoFill,
	inputType = "text",
	placeholder = ""
)}
	<label class="my-0 self-start px-1.5 text-muted-foreground" for={inputName}
		>{inputName.replaceAll("-", " ")}</label
	>
	<input
		type={inputType}
		id={inputName}
		name={inputName}
		{placeholder}
		{autocomplete}
		class="mb-2 w-full border border-muted-foreground/50 px-2 py-1 ring-0 outline-0 transition-all
        duration-200 ease-in placeholder:font-mono placeholder:text-xs placeholder:text-muted-foreground/75
        focus:border-foreground focus:ring-0 focus-visible:outline-0"
	/>
{/snippet}

<div class="flex w-full flex-col">
	<div
		class="mt-8 mb-18 flex flex-col items-center text-4xl font-bold tracking-tighter"
	>
		Create an account
	</div>

	<form
		use:enhance
		method="post"
		class="flex w-[350px] flex-col items-center space-y-2 self-center"
	>
		{@render InputWithLabel("email", "email")}
		{@render InputWithLabel("password", "new-password", "password")}
		{@render InputWithLabel("confirm-password", "new-password", "password")}

		<label for="role" class="my-0 self-start px-1.5 text-muted-foreground"
			>role</label
		>
		<select
			class="mb-2 w-full border border-muted-foreground/50 bg-background px-2 py-1 text-muted-foreground
            ring-0 outline-0 duration-0 selection:bg-foreground focus:border-foreground focus:ring-0 focus-visible:outline-0"
			id="role"
			name="role"
			bind:value={role}
		>
			<option value="patient">patient</option>
			<option value="prescriber">prescriber</option>
			<option value="pharmacy">pharmacy</option>
		</select>

		<div class="w-full">
			{#if role === "prescriber"}
				<div
					class="w-full"
					in:slide={{ delay: 50, duration: 150, axis: "y" }}
					out:slide={{ duration: 100, axis: "y" }}
				>
					{@render InputWithLabel("ahpra-id", "", "text", "MED0123456789")}
				</div>
			{:else if role === "pharmacy"}
				<div
					class="w-full"
					in:slide={{ delay: 50, duration: 150, axis: "y" }}
					out:slide={{ duration: 100, axis: "y" }}
				>
					{@render InputWithLabel("tga-id", "", "text", "PHA0123456789")}
				</div>
			{/if}
		</div>

		<div class="mt-8 flex w-full flex-row items-center justify-between">
			<a
				href="/login"
				class="inline-flex items-center space-x-3 px-4 leading-4 text-muted-foreground
                opacity-50 transition-opacity duration-200 ease-out hover:opacity-100"
			>
				<UserKeyIcon size={22} strokeWidth={1} />
				<div class="flex flex-col items-start">
					<span>already registered?</span>
					<span>sign in here</span>
				</div>
			</a>

			<button
				type="submit"
				class="mx-4 border border-muted-foreground px-4 py-0.5 text-lg opacity-50 transition-opacity duration-200 ease-out hover:opacity-100"
			>
				create</button
			>
		</div>
	</form>
	{#if errored}
		<div
			class="mt-12 flex w-[300px] flex-col items-start justify-start space-y-1 self-center rounded border border-destructive px-4 py-2 text-destructive"
		>
			<div class="w-full text-center text-xl font-bold tracking-tight">
				an error occurred:
			</div>

			<div class="w-full text-center">{form?.error}.</div>
		</div>
	{/if}
</div>
