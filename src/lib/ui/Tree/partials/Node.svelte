<script lang="ts">
	import type { Merge } from '$lib/utils/types';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { getTreeContext } from '../context';
	import { onMount, type Snippet } from 'svelte';
	import { lastVisibleDescendant, lastVisibleNode } from '../utils';

	interface Props {
		children: Snippet;
		rest?: Snippet;
		onclick?: () => void;
		onmousedown?: () => void;
		handleKeydown?: (ev: KeyboardEvent, li: HTMLLIElement) => void;
	}

	const {
		children,
		rest,
		onclick,
		onmousedown,
		handleKeydown,
		...props
	}: Merge<Props, SvelteHTMLElements['li']> = $props();
	const ctx = getTreeContext();

	let li: HTMLLIElement;
	let button: HTMLButtonElement;

	function onfocus() {
		button.tabIndex = 0;
		li.ariaSelected = 'true';
		ctx.unselectCurrent?.();
		ctx.unselectCurrent = () => {
			button.tabIndex = -1;
			li.ariaSelected = 'false';
		};
	}

	function onkeydown(ev: KeyboardEvent) {
		ev.preventDefault();

		if (ev.key === 'Home') ctx.getRoot().querySelector('button')!.focus();
		else if (ev.key === 'End') lastVisibleDescendant(ctx.getRoot()).focus();
		else if (ev.key === 'ArrowUp') lastVisibleNode(li)?.focus();
		else handleKeydown?.(ev, li);
	}

	onMount(() => {
		if (ctx.unselectCurrent || li.parentElement?.role == 'group') return;
		ctx.unselectCurrent = () => (button.tabIndex = -1);
		button.tabIndex = 0;
	});
</script>

<li bind:this={li} role="treeitem" aria-selected="false" {...props}>
	<button bind:this={button} tabindex="-1" {onfocus} {onclick} {onkeydown} {onmousedown}>
		{@render children()}
	</button>
	{@render rest?.()}
</li>

<style>
	li[aria-selected='false'] > button {
		background-color: transparent;
	}

	button {
		/* Reset styles */
		background-color: var(--gray-100);
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
