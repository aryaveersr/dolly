<script lang="ts">
	import HeaderView from '$lib/components/HeaderView.svelte';
	import { getViewerContext } from '$lib/contexts/viewer.svelte';

	const viewer = getViewerContext();
</script>

<div class="container">
	<header class="info">
		<code>
			{#if viewer.entry}
				{viewer.entry.request.method}
				{viewer.entry.request.url.pathname}
			{:else}
				No entry open in viewer.
			{/if}
		</code>
		<code>
			{#if viewer.entry}
				{#if viewer.entry.status == 'pending'}
					Pending
				{:else}
					Success - {viewer.entry.response.status}
				{/if}
			{/if}
		</code>
	</header>
	{#if viewer.entry}
		<section>
			<h3>Request</h3>
			<div class="header-container">
				<HeaderView headers={viewer.entry.request.headers} />
				<pre>{JSON.stringify(viewer.entry.request.body, null, 2)}</pre>
			</div>
		</section>
		<section>
			<h3>Response</h3>
			{#if viewer.entry.status == 'success'}
				<div class="header-container">
					<HeaderView headers={viewer.entry.response.headers} />
					<pre>{JSON.stringify(viewer.entry.response.body, null, 2)}</pre>
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
