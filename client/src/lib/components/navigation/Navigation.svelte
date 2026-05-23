<script lang="ts">
	import { page } from "$app/state";
	import { CircleUserIcon, Moon, Sun, UserCircleIcon } from "@lucide/svelte";
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
			<form action="/logout" method="POST">
				<button
					type="submit"
					class="flex flex-row items-center self-end py-0 hover:underline"
				>
					<CircleUserIcon size={20} strokeWidth={1} class="mr-2" />
					<div>{user.email}</div>
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
