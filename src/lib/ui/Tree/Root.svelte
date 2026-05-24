<script lang="ts">
	import { setTreeContext } from './context';
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = {
		children: Snippet;
	} & SvelteHTMLElements['ul'];

	const { children, ...props }: Props = $props();

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
