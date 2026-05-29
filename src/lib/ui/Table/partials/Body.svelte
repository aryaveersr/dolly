<script lang="ts">
	import { type Snippet } from 'svelte';
	import { setTableContext } from '../context';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();

	let ctx = $state({ selected: 0, counter: 0 });
	setTableContext(ctx);
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
