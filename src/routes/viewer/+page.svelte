<script lang="ts">
	import BodyView from '$lib/components/BodyView.svelte';
	import HeaderView from '$lib/components/HeaderView.svelte';
	import { getViewerContext } from '$lib/contexts/viewer.svelte';

	const viewer = getViewerContext();
</script>

<div class="container">
	<header>
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
			<div class="scroll">
				<HeaderView headers={viewer.entry.request.headers} />
			</div>
			<div class="scroll">
				<BodyView body={viewer.entry.request.body} />
			</div>
		</section>
		<section>
			<h3>Response</h3>
			{#if viewer.entry.status == 'success'}
				<div class="scroll">
					<HeaderView headers={viewer.entry.response.headers} />
				</div>
				<div class="scroll">
					<BodyView body={viewer.entry.response.body} />
				</div>
			{/if}
		</section>
	{/if}
</div>

<style>
	div.container {
		/* Fill available space */
		width: 100%;
		height: 100%;

		/* Grid layout */
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
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

	section {
		/* Limit height to 50% */
		height: 100%;

		/* Grid layout */
		display: grid;
		grid-template-rows:
			minmax(min-content, max-content)
			1fr 1fr;
	}

	div.scroll {
		/* Allow scrolling */
		overflow-y: auto;
	}
</style>
