<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/state";
	import { loadUtil } from "$lib/store-utils.svelte";
	import { CircleUserIcon, LogOut, Moon, Sun } from "@lucide/svelte";
	import { mode, setMode } from "mode-watcher";

	let { user }: { user: App.Locals["user"] } = $props();

	const NOT_AUTHED = [
		{ title: "sign in", href: "/login" },
		{ title: "register", href: "/register" },
	];

	const AUTHED = $derived([{ title: user!.role, href: `/${user!.role}` }]);

	function toggleMode() {
		mode.current === "dark" ? setMode("light") : setMode("dark");
	}
</script>

{#snippet RouteDisplay(routes: { title: string; href: string }[])}
	{#each routes as route, idx}
		<a
			href={route.href}
			class="underline-offset-4 transition-opacity duration-150 ease-out hover:opacity-65"
			class:underline={page.route.id?.startsWith(`${route.href}`)}
			id={idx.toString()}
		>
			{route.title}
		</a>
	{/each}
{/snippet}

<nav
	class="flex w-full flex-row items-center justify-between space-x-1 border-b border-b-foreground/15 px-6 py-4"
>
	<div class="flex flex-row items-center">
		<a
			href="/"
			class="mx-8 cursor-pointer px-4 text-2xl font-bold
            transition-opacity duration-250 ease-out hover:opacity-25"
			>RxChain</a
		>
		<div class="inline-flex flex-row space-x-6">
			{@render RouteDisplay(user === null ? NOT_AUTHED : AUTHED)}
		</div>
	</div>
	<div class="flex flex-row items-center">
		{#if user}
			<div>
				<span class="text-muted-foreground">logged in as:</span>
				<span class="font-medium">{user.email}</span>
			</div>
			<form
				action="/logout"
				method="POST"
				use:enhance={() => {
					loadUtil.wait();

					return async ({ update }) => {
						await update();
						loadUtil.unwait();
					};
				}}
			>
				<button
					type="submit"
					class="ml-4 flex cursor-pointer flex-row items-center self-end py-0
                    transition-opacity duration-200 ease-out hover:opacity-50"
				>
					<LogOut size={18} />
				</button>
			</form>
		{/if}
		<button
			onclick={toggleMode}
			class="mx-2 cursor-pointer px-2 transition-opacity duration-150 ease-out hover:opacity-65"
		>
			{#if mode.current === "dark"}
				<Sun size={16} />
			{:else}
				<Moon size={16} />
			{/if}
		</button>
	</div>
</nav>
