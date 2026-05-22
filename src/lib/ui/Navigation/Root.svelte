<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

<nav>
	{@render children()}
</nav>

<style>
	nav {
		/* Horizontal Layout */
		display: flex;
		align-items: center;

		/* Spacing */
		padding-inline: 1rem;
		gap: 1rem;
	}
</style>
