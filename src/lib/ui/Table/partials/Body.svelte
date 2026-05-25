<script lang="ts">
	import { type Snippet } from 'svelte';
	import { setTableContext } from '../context';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();

	setTableContext({ unselectCurrent: null });
</script>

<tbody>
	{@render children()}
</tbody>

<style>
	tbody :global(td) {
		/* Spacing */
		padding: 0.4rem 0.8rem;

		/* Text styles */
		color: var(--gray-800);
	}
</style>
