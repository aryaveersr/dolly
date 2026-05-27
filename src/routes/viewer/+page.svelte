<script lang="ts">
	import { getViewerContext } from '$lib/contexts/viewer.svelte';

	const viewer = getViewerContext();
</script>

<div>
	<header class="info">
		<code>
			{#if viewer.activeEntry}
				{viewer.activeEntry.request.method}
				{viewer.activeEntry.request.url.pathname}
			{:else}
				No entry open in viewer.
			{/if}
		</code>
		<code>
			{#if viewer.activeEntry}
				{#if viewer.activeEntry.status == 'pending'}
					Pending
				{:else}
					Success - {viewer.activeEntry.response.status}
				{/if}
			{/if}
		</code>
	</header>
	<section>
		<h3>Request</h3>
	</section>
	<section>
		<h3>Response</h3>
	</section>
</div>

<style>
	div {
		/* Grid layout */
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto minmax(0, 1fr);

		/* Spacing */
		padding: 1rem;
		column-gap: 1rem;
	}

	header {
		/* Header spans both columns */
		grid-column: 1 / -1;

		/* Flex layout for header content */
		display: flex;
		justify-content: space-between;
		align-items: center;

		/* Styling */
		padding-bottom: 0.5rem;
		border-bottom: 1px solid #ccc;
	}
</style>
