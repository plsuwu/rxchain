<script lang="ts">
	import { page } from "$app/state";
	import { Moon, Sun } from "@lucide/svelte";
	import { mode, setMode } from "mode-watcher";

	const routes = [
		{ title: "patients", href: "/patient" },
		{ title: "prescribers", href: "/prescriber" },
		{ title: "pharmacies", href: "/pharmacy" },
	];

	function toggleMode() {
		mode.current === "dark" ? setMode("light") : setMode("dark");
	}
</script>

<nav
	class="flex w-full flex-row items-center justify-between space-x-1 border-b border-b-foreground/15 p-6"
>
	<div class="flex flex-row items-center">
		<a
			href="/"
			class="cursor-pointer px-4 mx-8 text-2xl font-bold
            transition-opacity duration-250 ease-out hover:opacity-25"
			>RxChain</a
		>
		<div class="inline-flex flex-row space-x-6">
			{#each routes as route, idx}
				<a
					href={route.href}
					class="transition-opacity duration-150 ease-out hover:opacity-65 underline-offset-4"
					class:underline={page.route.id?.startsWith(`${route.href}`)}
					id={idx.toString()}
				>
					{route.title}
				</a>
			{/each}
		</div>
	</div>
	<div class="flex flex-row items-center">
		<button
			onclick={toggleMode}
			class="cursor-pointer px-2 mx-2 transition-opacity duration-150 ease-out hover:opacity-65"
		>
			{#if mode.current === "dark"}
				<Sun size={16} />
			{:else}
				<Moon size={16} />
			{/if}
		</button>
	</div>
</nav>
