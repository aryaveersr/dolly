<script lang="ts">
	import type { Merge } from '$lib/utils/types';
	import { setTreeContext } from './context';
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	interface Props {
		children: Snippet;
	}

	const { children, ...props }: Merge<Props, SvelteHTMLElements['ul']> = $props();

	setTreeContext({ unselectCurrent: null });
</script>

<ul role="tree" {...props}>
	{@render children()}
</ul>

<style>
	ul {
		/* Reset list styles */
		list-style: none;
		padding: 0;
	}

	/* The tab is selected but not focused */
	ul :global(li[aria-selected='true'] > button) {
		background-color: var(--gray-100);
	}

	ul :global(button) {
		/* Reset styles */
		background: none;
		border: none;

		/* Spacing */
		padding: 0.5rem 0.8rem;

		/* Styles */
		border-radius: 4px;

		/* Icon styles */
		display: flex;
		align-items: center;
		gap: 0.5rem;

		& :global(.lucide) {
			width: 1.25rem;
			stroke-width: 1.25;
		}

		&:hover {
			background-color: var(--gray-100);
			cursor: pointer;
		}

		&:focus {
			background-color: var(--gray-200);
		}
	}
</style>
