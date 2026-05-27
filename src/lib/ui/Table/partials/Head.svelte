<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

<thead>
	<tr>
		{@render children()}
		<th></th>
	</tr>
</thead>

<style>
	tr :global(th) {
		/* Sticky header */
		position: sticky;
		top: -4px;
		z-index: 1;
		background-color: var(--gray-200);

		/* Spacing */
		padding: 0.5rem;

		/* Font settings */
		font-size: 14px;
		font-weight: 500;
	}

	th {
		width: 2.5rem;
	}
</style>
