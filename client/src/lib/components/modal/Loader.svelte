<script>
	import { Loader, Loader2, LoaderCircle } from "@lucide/svelte";
	import { fade } from "svelte/transition";

	let { waiting = true } = $props();
</script>

{#if waiting}
	<div
		transition:fade={{ duration: 100 }}
		class="absolute top-0 left-0 flex h-screen w-screen flex-row items-center justify-center 
        bg-background/80 z-50"
	>
		<LoaderCircle size={40} class="animate-spin" />
	</div>
{/if}
