<script lang="ts">
	import '$lib/styles/index.css';
	import Navigation from '$lib/ui/Navigation';
	import { setTrafficContext, TrafficState } from '$lib/contexts/traffic.svelte';
	import { setSitemapContext, SitemapState } from '$lib/contexts/sitemap.svelte';
	import { setViewerContext, ViewerState } from '$lib/contexts/viewer.svelte';

	setTrafficContext(new TrafficState());
	setSitemapContext(new SitemapState());
	setViewerContext(new ViewerState());

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
