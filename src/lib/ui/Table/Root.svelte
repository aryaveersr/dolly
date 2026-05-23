<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

<table>
	{@render children()}
</table>

<style>
	table {
		/* Use fixed layout and fill available space */
		table-layout: fixed;
		width: 100%;

		/* Border */
		border-collapse: collapse;
		border: 2px solid var(--gray-200);
	}
</style>
