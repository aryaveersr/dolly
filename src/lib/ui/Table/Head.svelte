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
	tr {
		/* Background */
		background-color: var(--gray-200);
	}

	tr :global(th) {
		/* Spacing */
		padding: 0.5rem;

		/* Font settings */
		font-size: 14px;
		font-weight: 500;
	}
</style>
