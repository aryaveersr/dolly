<script lang="ts">
	import '$lib/styles/index.css';
	import Navigation from '$lib/ui/Navigation';

	// eslint-disable-next-line
	import traffic from '$lib/traffic.svelte';
	// eslint-disable-next-line
	import sitemap from '$lib/sitemap.svelte';
	// eslint-disable-next-line
	import viewer from '$lib/viewer.svelte';

	let { children } = $props();
</script>

<div>
	<header>
		<Navigation>
			<Navigation.Link href="/">Dashboard</Navigation.Link>
			<Navigation.Link href="/sitemap">Sitemap</Navigation.Link>
			<Navigation.Link href="/viewer">Viewer</Navigation.Link>
		</Navigation>
	</header>
	<main>
		{@render children()}
	</main>
</div>

<style>
	div {
		/* Take all available height */
		height: 100%;

		/* Layout using grid */
		display: grid;
		grid-template-rows: auto minmax(0, 1fr);
	}

	header {
		border-bottom: 1px solid var(--gray-200);
	}
</style>
