<script lang="ts">
	let {
		id,
		productName,
		manufacturer,
		activeIngredient,
		effective,
		handleDismiss,
	} = $props();
</script>

<div
	onkeydown={() => {}}
	tabindex="0"
	role="button"
	class="fixed top-0 left-0 h-screen w-screen bg-foreground/70"
	onclick={handleDismiss}
>
	...
</div>
