<script lang="ts">
	import Sitemap from './Sitemap.svelte';
	import Entries from './Entries.svelte';
</script>

<div>
	<Sitemap />
	<Entries />
</div>

<style>
	div {
		/* Fill height */
		height: 100%;

		/* Grid layout */
		display: grid;
		grid-template-columns: 18rem auto;
		grid-template-rows: minmax(0, 1fr);

		/* Spacing */
		gap: 1rem;
	}
</style>
