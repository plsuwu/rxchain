<script lang="ts">
	let { errored, form } = $props();
</script>

{#if errored}
	<div
		class="mt-12 flex w-[300px] flex-col items-start justify-start space-y-1 self-center rounded border border-destructive
            px-4 py-2 text-destructive"
	>
		<div class="w-full text-center text-xl font-bold tracking-tight">
			an error occurred:
		</div>

		<div class="w-full text-center">{form?.error}.</div>
	</div>
{/if}
