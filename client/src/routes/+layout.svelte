<script lang="ts">
	import "./layout.css";
	import type { LayoutServerData } from "./$types";
	import type { Snippet } from "svelte";
	import Navigation from "$lib/components/navigation/Navigation.svelte";
	import { loadUtil } from "$lib/store-utils.svelte";
	import { ModeWatcher } from "mode-watcher";
	import Loader from "$lib/components/modal/Loader.svelte";

	let { data, children }: { data: LayoutServerData; children: Snippet } =
		$props();
</script>

<ModeWatcher disableTransitions={false} />

<Loader waiting={loadUtil.waiting} />

<Navigation user={data.user} />
<div class="my-12"></div>
{@render children()}
