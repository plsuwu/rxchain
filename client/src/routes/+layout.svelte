<script lang="ts">
	import "./layout.css";
	import type { LayoutServerData } from "./$types";
	import type { Snippet } from "svelte";
	import Navigation from "$lib/components/navigation/Navigation.svelte";
	import { ModeWatcher } from "mode-watcher";

	let { data, children }: { data: LayoutServerData; children: Snippet } =
		$props();
</script>

<ModeWatcher disableTransitions={false} />

<Navigation user={data.user} />
<div class="my-12"></div>
{@render children()}
