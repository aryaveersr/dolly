<script lang="ts">
	import HeaderView from '$lib/components/HeaderView.svelte';
	import { getViewerContext } from '$lib/contexts/viewer.svelte';

	const viewer = getViewerContext();
</script>

<div class="container">
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
	{#if viewer.activeEntry}
		<section>
			<h3>Request</h3>
			<div class="header-container">
				<HeaderView headers={viewer.activeEntry!.request.headers} />
				<pre>{JSON.stringify(viewer.activeEntry!.request.body, null, 2)}</pre>
			</div>
		</section>
		<section>
			<h3>Response</h3>
			{#if viewer.activeEntry!.status == 'success'}
				<div class="header-container">
					<HeaderView headers={viewer.activeEntry!.response.headers} />
					<pre>{JSON.stringify(viewer.activeEntry!.response.body, null, 2)}</pre>
				</div>
			{/if}
		</section>
	{/if}
</div>

<style>
	div.container {
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

	div.header-container {
		/* Limit height to 50% */
		height: 50%;

		/* Allow scrolling */
		overflow: auto;
		min-height: 0;
	}
</style>
