<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

<div>
	<table>
		{@render children()}
	</table>
</div>

<style>
	div {
		/* Make table scrollable */
		height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
	}

	table {
		/* Use fixed layout and fill available space */
		table-layout: fixed;
		width: 100%;

		/* Border */
		border-collapse: collapse;
	}
</style>
