<script lang="ts">
	import "./layout.css";
	import Navigation from "$lib/components/navigation/Navigation.svelte";
	import { ModeWatcher } from "mode-watcher";

	let { children } = $props();
</script>

<ModeWatcher disableTransitions={false} />

<Navigation />
<div class="my-12"></div>
{@render children()}
