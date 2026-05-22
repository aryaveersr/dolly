<script lang="ts">
	import '$lib/styles/index.css';
	import Navigation from '$lib/ui/Navigation';

	let { children } = $props();
</script>

<header>
	<Navigation>
		<Navigation.Link href="/">Dashboard</Navigation.Link>
		<Navigation.Link href="/sitemap">Sitemap</Navigation.Link>
	</Navigation>
</header>
{@render children()}
