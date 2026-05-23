<script lang="ts">
	import type { FullAutoFill } from "svelte/elements";
	import { enhance } from "$app/forms";
	import { UserPlusIcon } from "@lucide/svelte";
	let { form } = $props();

	let errored = $derived(form?.error);
</script>

{#snippet InputWithLabel(
	inputName: string,
	autocomplete?: FullAutoFill,
	inputType = "text",
	placeholder = ""
)}
	<label class="my-0 self-start px-1.5 text-muted-foreground" for={inputName}
		>{inputName}</label
	>
	<input
		type={inputType}
		id={inputName}
		name={inputName}
        {autocomplete}
		{placeholder}
		class="mb-2 w-full border border-muted-foreground/50 px-2 py-1 ring-0 outline-0 transition-all
        duration-200 ease-in placeholder:text-sm focus:border-foreground focus:ring-0 focus-visible:outline-0"
	/>
{/snippet}

<div class="flex w-full flex-col">
	<div
		class="mt-8 mb-18 flex flex-col items-center text-6xl font-bold tracking-tighter"
	>
		Sign in
	</div>
	<form
		use:enhance
		method="post"
		class="flex w-[350px] flex-col items-center space-y-2 self-center"
	>
		{@render InputWithLabel("email", "email")}
		{@render InputWithLabel("password", "current-password", "password")}

		<div class="mt-8 flex w-full flex-row items-center justify-between">
			<a
				href="/register"
				class="inline-flex items-center space-x-3 px-4 leading-4 text-muted-foreground
                opacity-50 transition-opacity duration-200 ease-out hover:opacity-100"
			>
				<UserPlusIcon size={22} strokeWidth={1} />
				<div class="flex flex-col items-start">
					<span>need an account?</span>
					<span>sign up here</span>
				</div>
			</a>

			<button
				type="submit"
				class="mx-4 border border-muted-foreground px-4 py-0.5 text-lg opacity-50 transition-opacity duration-200 ease-out hover:opacity-100"
			>
				sign in</button
			>
		</div>
	</form>
</div>
